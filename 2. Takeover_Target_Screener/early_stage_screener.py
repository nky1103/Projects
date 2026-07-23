"""early_stage_screener.py

An investment screener for **early-growth, unlisted startups** (Seed – Series B).

At this stage financials are thin — many companies are pre-revenue or sub-scale,
with no meaningful multiples, margins or retention history — so a financials-only
model is nearly blind. Real early-stage investing bets on **team, market,
product and momentum**. This screener therefore blends three layers, weighted
the way seed / Series-A investors actually weight them:

    Qualitative scorecard  (~50%)  team, market, product / moat   [analyst 1-5]
    Financial / traction   (~30%)  early growth, burn efficiency, runway, entry
    Alt-data momentum      (~20%)  hiring, app / web traction, sentiment [public]

Everything is optional and missing-data-tolerant: a factor with no inputs is
dropped and the remaining weights renormalise, so a pre-revenue startup is scored
on what it *does* have (team, market, hiring signal) instead of being punished
for an empty ARR cell.

Inputs come from three places, by design:
  * analyst judgement  -> the 1-5 scorecard fields (team_score, market_score...)
  * the data room/deck  -> the financial fields (arr, burn, runway, valuation)
  * public alt-data     -> hiring_growth, app_rating, web_traffic_growth, ...
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict, List, Optional

from takeover_screener import _linear_score, _percentile_low_better, _avg
from investment_screener import _reco


# --------------------------------------------------------------------------- #
# Inputs
# --------------------------------------------------------------------------- #
@dataclass
class EarlyVenture:
    """An early-growth (Seed - Series B), unlisted startup.

    Money fields share one unit across the cohort (e.g. INR crore). Fractions
    are decimals (0.20 = 20%). Analyst scorecard fields are on a 1-5 scale.
    """

    name: str
    sector: str = ""
    stage: str = ""          # Seed / Pre-A / Series A / Series B
    country: str = ""

    # --- Financial / traction (often sparse at this stage) ---------------- #
    arr: Optional[float] = None
    arr_prev: Optional[float] = None
    mom_growth: Optional[float] = None            # month-on-month growth (fraction)
    gross_margin: Optional[float] = None
    net_revenue_retention: Optional[float] = None
    monthly_net_burn: Optional[float] = None
    cash_on_hand: Optional[float] = None
    last_valuation: Optional[float] = None
    prev_valuation: Optional[float] = None
    months_since_last_round: Optional[float] = None

    # --- Analyst scorecard (1 = weak, 5 = exceptional) -------------------- #
    team_score: Optional[float] = None             # founder-market fit, track record
    market_score: Optional[float] = None           # TAM, timing, tailwinds
    product_moat_score: Optional[float] = None      # differentiation, defensibility
    traction_quality_score: Optional[float] = None  # design partners, marquee logos
    customer_diversification_score: Optional[float] = None  # 5 = diversified, 1 = concentrated

    # --- Alt-data proxies (from public sources) --------------------------- #
    hiring_growth: Optional[float] = None          # headcount growth (fraction, ~6-12mo)
    app_rating: Optional[float] = None             # 1-5 stars
    app_downloads_growth: Optional[float] = None   # fraction
    web_traffic_growth: Optional[float] = None     # fraction
    news_sentiment: Optional[float] = None         # -1 .. +1
    employer_rating: Optional[float] = None        # 1-5 (e.g. Glassdoor)

    # ---- derived --------------------------------------------------------- #
    def runway_months(self) -> Optional[float]:
        if self.monthly_net_burn is None or self.cash_on_hand is None:
            return None
        if self.monthly_net_burn <= 0:
            return 999.0
        return self.cash_on_hand / self.monthly_net_burn

    def yoy_growth(self) -> Optional[float]:
        if not self.arr_prev or self.arr_prev <= 0 or self.arr is None:
            return None
        return self.arr / self.arr_prev - 1.0

    def burn_multiple(self) -> Optional[float]:
        if self.monthly_net_burn is None or self.monthly_net_burn <= 0:
            return None
        if self.arr is None or self.arr_prev is None:
            return None
        net_new = self.arr - self.arr_prev
        if net_new <= 0:
            return None
        return (self.monthly_net_burn * 12) / net_new

    def revenue_multiple(self) -> Optional[float]:
        if not self.arr or self.arr <= 0 or self.last_valuation is None:
            return None
        return self.last_valuation / self.arr


# --------------------------------------------------------------------------- #
# Outputs
# --------------------------------------------------------------------------- #
@dataclass
class FactorScore:
    name: str
    layer: str
    score: float
    weight: float
    detail: str = ""


@dataclass
class Result:
    venture: EarlyVenture
    score: float
    recommendation: str
    factors: List[FactorScore] = field(default_factory=list)

    def layer_scores(self) -> Dict[str, float]:
        """Weighted sub-score (0-100) for each layer, over its available factors."""
        out: Dict[str, float] = {}
        for layer in ("Qualitative", "Financial", "Alt-data"):
            fs = [f for f in self.factors if f.layer == layer]
            wsum = sum(f.weight for f in fs)
            if wsum > 0:
                out[layer] = round(sum(f.score * f.weight for f in fs) / wsum, 1)
        return out

    def rationale(self, top_n: int = 3) -> str:
        ranked = sorted((f for f in self.factors if f.detail),
                        key=lambda f: f.score * f.weight, reverse=True)
        return "; ".join(f"{f.name} ({f.score:.0f})" for f in ranked[:top_n]) or "n/a"


# --------------------------------------------------------------------------- #
# Scoring helpers
# --------------------------------------------------------------------------- #
def _from_1to5(x: float) -> float:
    """Map a 1-5 analyst rating to 0-100 (1 -> 0, 3 -> 50, 5 -> 100)."""
    return max(0.0, min(100.0, (x - 1.0) / 4.0 * 100.0))


def _from_sentiment(x: float) -> float:
    """Map a -1..+1 sentiment to 0-100."""
    return max(0.0, min(100.0, (x + 1.0) / 2.0 * 100.0))


# --------------------------------------------------------------------------- #
# The screener
# --------------------------------------------------------------------------- #
# Weights tuned for Seed - Series B: qualitative ~50%, financial ~30%, alt ~20%.
DEFAULT_WEIGHTS: Dict[str, float] = {
    "Team & founders": 0.22,
    "Market": 0.15,
    "Product & moat": 0.13,
    "Traction & growth": 0.15,
    "Capital efficiency & runway": 0.10,
    "Valuation / entry": 0.05,
    "Hiring momentum": 0.08,
    "Digital momentum": 0.07,
    "Sentiment": 0.05,
}

_LAYER: Dict[str, str] = {
    "Team & founders": "Qualitative",
    "Market": "Qualitative",
    "Product & moat": "Qualitative",
    "Traction & growth": "Financial",
    "Capital efficiency & runway": "Financial",
    "Valuation / entry": "Financial",
    "Hiring momentum": "Alt-data",
    "Digital momentum": "Alt-data",
    "Sentiment": "Alt-data",
}


class EarlyStageScreener:
    """Ranks a cohort of early-growth unlisted startups for investability.

    The Valuation factor is benchmarked against the cohort, so screen roughly
    comparable startups (similar stage / sector) together.
    """

    def __init__(self, cohort: List[EarlyVenture],
                 weights: Optional[Dict[str, float]] = None) -> None:
        if not cohort:
            raise ValueError("cohort must contain at least one venture")
        self.cohort = cohort
        self.weights = dict(weights) if weights else dict(DEFAULT_WEIGHTS)
        self._rev_multiples = [v.revenue_multiple() for v in cohort]

    # -- Qualitative layer ------------------------------------------------- #
    def _score_team(self, v: EarlyVenture) -> Optional[FactorScore]:
        if v.team_score is None:
            return None
        return FactorScore("Team & founders", "Qualitative", _from_1to5(v.team_score),
                           0.0, f"team {v.team_score:.0f}/5")

    def _score_market(self, v: EarlyVenture) -> Optional[FactorScore]:
        if v.market_score is None:
            return None
        return FactorScore("Market", "Qualitative", _from_1to5(v.market_score),
                           0.0, f"market {v.market_score:.0f}/5")

    def _score_product_moat(self, v: EarlyVenture) -> Optional[FactorScore]:
        if v.product_moat_score is None:
            return None
        return FactorScore("Product & moat", "Qualitative", _from_1to5(v.product_moat_score),
                           0.0, f"product/moat {v.product_moat_score:.0f}/5")

    # -- Financial layer --------------------------------------------------- #
    def _score_traction(self, v: EarlyVenture) -> Optional[FactorScore]:
        parts, labels = [], []
        if v.mom_growth is not None:
            parts.append(_linear_score(v.mom_growth, best=0.20, worst=0.0))  # 20% MoM -> 100
            labels.append(f"{v.mom_growth*100:.0f}% MoM")
        else:
            g = v.yoy_growth()
            if g is not None:
                parts.append(_linear_score(g, best=3.0, worst=0.0))          # 300% YoY -> 100
                labels.append(f"{g*100:+.0f}% YoY")
        if v.traction_quality_score is not None:
            parts.append(_from_1to5(v.traction_quality_score))
            labels.append(f"quality {v.traction_quality_score:.0f}/5")
        if v.net_revenue_retention is not None:
            parts.append(_linear_score(v.net_revenue_retention, best=1.30, worst=0.90))
            labels.append(f"NRR {v.net_revenue_retention*100:.0f}%")
        if v.customer_diversification_score is not None:
            parts.append(_from_1to5(v.customer_diversification_score))
            labels.append(f"diversification {v.customer_diversification_score:.0f}/5")
        score = _avg(parts)
        if score is None:
            return None
        return FactorScore("Traction & growth", "Financial", score, 0.0, ", ".join(labels))

    def _score_capital(self, v: EarlyVenture) -> Optional[FactorScore]:
        parts, labels = [], []
        bm = v.burn_multiple()
        if bm is not None:
            parts.append(_linear_score(bm, best=0.5, worst=3.0))
            labels.append(f"burn multiple {bm:.1f}x")
        if v.gross_margin is not None:
            parts.append(_linear_score(v.gross_margin, best=0.80, worst=0.20))
            labels.append(f"gross margin {v.gross_margin*100:.0f}%")
        rw = v.runway_months()
        if rw is not None:
            parts.append(_linear_score(rw, best=18.0, worst=3.0))  # longer runway = lower risk
            labels.append("profitable" if rw >= 999 else f"{rw:.0f}mo runway")
        score = _avg(parts)
        if score is None:
            return None
        return FactorScore("Capital efficiency & runway", "Financial", score, 0.0, ", ".join(labels))

    def _score_valuation(self, v: EarlyVenture) -> Optional[FactorScore]:
        rm = v.revenue_multiple()
        if rm is None:
            return None
        score = _percentile_low_better(rm, self._rev_multiples)
        return FactorScore("Valuation / entry", "Financial", score, 0.0,
                           f"{rm:.1f}x revenue (cheaper vs cohort = higher)")

    # -- Alt-data layer ---------------------------------------------------- #
    def _score_hiring(self, v: EarlyVenture) -> Optional[FactorScore]:
        if v.hiring_growth is None:
            return None
        score = _linear_score(v.hiring_growth, best=0.60, worst=-0.10)
        return FactorScore("Hiring momentum", "Alt-data", score, 0.0,
                           f"headcount {v.hiring_growth*100:+.0f}%")

    def _score_digital(self, v: EarlyVenture) -> Optional[FactorScore]:
        parts, labels = [], []
        if v.app_rating is not None:
            parts.append(_linear_score(v.app_rating, best=4.7, worst=3.5))
            labels.append(f"app {v.app_rating:.1f}★")
        if v.app_downloads_growth is not None:
            parts.append(_linear_score(v.app_downloads_growth, best=1.0, worst=0.0))
            labels.append(f"downloads {v.app_downloads_growth*100:+.0f}%")
        if v.web_traffic_growth is not None:
            parts.append(_linear_score(v.web_traffic_growth, best=1.0, worst=-0.10))
            labels.append(f"web {v.web_traffic_growth*100:+.0f}%")
        score = _avg(parts)
        if score is None:
            return None
        return FactorScore("Digital momentum", "Alt-data", score, 0.0, ", ".join(labels))

    def _score_sentiment(self, v: EarlyVenture) -> Optional[FactorScore]:
        parts, labels = [], []
        if v.news_sentiment is not None:
            parts.append(_from_sentiment(v.news_sentiment))
            labels.append(f"news {v.news_sentiment:+.2f}")
        if v.employer_rating is not None:
            parts.append(_from_1to5(v.employer_rating))
            labels.append(f"employer {v.employer_rating:.1f}/5")
        score = _avg(parts)
        if score is None:
            return None
        return FactorScore("Sentiment", "Alt-data", score, 0.0, ", ".join(labels))

    # -- public API -------------------------------------------------------- #
    def score(self, v: EarlyVenture) -> Result:
        raw: List[FactorScore] = []
        for scorer in (
            self._score_team, self._score_market, self._score_product_moat,
            self._score_traction, self._score_capital, self._score_valuation,
            self._score_hiring, self._score_digital, self._score_sentiment,
        ):
            fs = scorer(v)
            if fs is not None:
                raw.append(fs)

        total_w = sum(self.weights.get(f.name, 0.0) for f in raw)
        if total_w <= 0:
            return Result(v, 0.0, _reco(0.0), raw)

        final = 0.0
        for fs in raw:
            fs.weight = self.weights.get(fs.name, 0.0) / total_w
            final += fs.score * fs.weight
        final = round(final, 1)
        return Result(v, final, _reco(final), raw)

    def rank(self, ventures: Optional[List[EarlyVenture]] = None) -> List[Result]:
        targets = ventures if ventures is not None else self.cohort
        results = [self.score(v) for v in targets]
        results.sort(key=lambda r: r.score, reverse=True)
        return results
