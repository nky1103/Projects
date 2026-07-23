"""investment_screener.py

An investor's deal-sourcing screener for **startups raising capital** — built to
answer "which startups need funding, how fast are they growing, and are they
worth backing?"

This is the mirror image of ``startup_screener.py``. That model hunts for
*acquisition* targets and therefore rewards distress (down-rounds, short runway,
a motivated seller). An **investor** wants the opposite: a company that needs
capital to *grow*, not to *survive*. So here a down-round and broken unit
economics count **against** the score, while healthy growth, capital efficiency,
retention and a large market count **for** it.

The seven investment factors
----------------------------
1. Growth (22%) ............. ARR / revenue YoY growth — the primary VC signal.
2. Capital efficiency (18%) . burn multiple, gross margin, Rule of 40.
3. Retention (14%) .......... net revenue retention — durable revenue.
4. Market (12%) ............. TAM size and market growth — room to compound.
5. Traction (12%) ........... proven ARR scale — de-risked revenue.
6. Funding need & timing (12%) the "requires funding" signal: a 4-15 month
                              runway plus 12-30 months since the last round =
                              raising a round now, the window an investor enters.
7. Valuation / entry (10%) .. revenue multiple vs cohort — a disciplined entry.

Each startup also gets a ``needs_funding`` flag and a plain-English
``raise_signal`` so the output reads like a sourcing list, not just a score.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict, List, Optional

# Reuse the shared scoring engine (same project).
from takeover_screener import _linear_score, _percentile_low_better, _avg
from startup_screener import _plateau


# --------------------------------------------------------------------------- #
# Inputs
# --------------------------------------------------------------------------- #
@dataclass
class Venture:
    """A startup evaluated as a potential *investment*.

    Every field except ``name`` is optional. Keep one money unit across the
    cohort (e.g. INR crore) for ARR, burn, cash, valuation and TAM.
    Percentages are fractions (0.80 = 80%).
    """

    name: str
    sector: str = ""
    stage: str = ""
    country: str = ""

    # Funding / valuation
    last_valuation: Optional[float] = None
    prev_valuation: Optional[float] = None
    months_since_last_round: Optional[float] = None

    # Traction / growth
    arr: Optional[float] = None
    arr_prev: Optional[float] = None
    gross_margin: Optional[float] = None
    net_revenue_retention: Optional[float] = None
    customers: Optional[float] = None

    # Cash
    monthly_net_burn: Optional[float] = None
    cash_on_hand: Optional[float] = None

    # Market
    tam: Optional[float] = None            # total addressable market
    market_growth: Optional[float] = None  # fraction, annual

    # Cap table
    founder_ownership_pct: Optional[float] = None

    # ---- derived helpers ------------------------------------------------- #
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

    def revenue_multiple(self) -> Optional[float]:
        if not self.arr or self.arr <= 0 or self.last_valuation is None:
            return None
        return self.last_valuation / self.arr

    def rule_of_40(self) -> Optional[float]:
        g, m = self.yoy_growth(), self.gross_margin
        if g is None or m is None:
            return None
        return g * 100 + m * 100

    def burn_multiple(self) -> Optional[float]:
        if self.monthly_net_burn is None or self.monthly_net_burn <= 0:
            return None
        if self.arr is None or self.arr_prev is None:
            return None
        net_new = self.arr - self.arr_prev
        if net_new <= 0:
            return None
        return (self.monthly_net_burn * 12) / net_new

    # ---- funding-need read ---------------------------------------------- #
    def needs_funding(self) -> Optional[bool]:
        rw, ms = self.runway_months(), self.months_since_last_round
        if rw is None and ms is None:
            return None
        if rw is not None and rw >= 999:
            return False        # profitable / cash-generative: doesn't need funding
        if rw is not None and rw <= 15:
            return True
        if ms is not None and ms >= 15:
            return True
        return False

    def raise_signal(self) -> str:
        rw, ms = self.runway_months(), self.months_since_last_round
        if rw is not None and rw >= 999:
            return "Profitable / not raising"
        if (rw is not None and rw <= 6) or (ms is not None and ms >= 24):
            return "Raising now / overdue"
        if (rw is not None and rw <= 15) or (ms is not None and ms >= 12):
            return "Likely raising soon"
        if rw is None and ms is None:
            return "Unknown"
        return "Well funded"


# --------------------------------------------------------------------------- #
# Outputs
# --------------------------------------------------------------------------- #
@dataclass
class FactorScore:
    name: str
    score: float
    weight: float
    detail: str = ""


@dataclass
class Result:
    venture: Venture
    score: float
    recommendation: str
    factors: List[FactorScore] = field(default_factory=list)

    def rationale(self, top_n: int = 3) -> str:
        ranked = sorted(
            (f for f in self.factors if f.detail),
            key=lambda f: f.score * f.weight,
            reverse=True,
        )
        bits = [f"{f.name} ({f.score:.0f}/100)" for f in ranked[:top_n]]
        return "; ".join(bits) if bits else "insufficient data"


def _reco(score: float) -> str:
    if score >= 70:
        return "High conviction"
    if score >= 55:
        return "Consider"
    if score >= 40:
        return "Watch"
    return "Pass"


# --------------------------------------------------------------------------- #
# The screener
# --------------------------------------------------------------------------- #
DEFAULT_WEIGHTS: Dict[str, float] = {
    "Growth": 0.22,
    "Capital efficiency": 0.18,
    "Retention": 0.14,
    "Market": 0.12,
    "Traction": 0.12,
    "Funding need & timing": 0.12,
    "Valuation / entry": 0.10,
}


class InvestmentScreener:
    """Ranks a cohort of startups by investment attractiveness.

    The Valuation factor is benchmarked against the cohort, so screen
    comparable startups together (similar stage / sector) for a fair read.
    """

    def __init__(self, cohort: List[Venture],
                 weights: Optional[Dict[str, float]] = None) -> None:
        if not cohort:
            raise ValueError("cohort must contain at least one venture")
        self.cohort = cohort
        self.weights = dict(weights) if weights else dict(DEFAULT_WEIGHTS)
        self._rev_multiples = [v.revenue_multiple() for v in cohort]

    # -- factor scorers ---------------------------------------------------- #
    def _score_growth(self, v: Venture) -> Optional[FactorScore]:
        g = v.yoy_growth()
        if g is None:
            return None
        score = _linear_score(g, best=2.0, worst=0.0)  # 200%+ -> 100, flat/decline -> 0
        return FactorScore("Growth", score, 0.0, f"revenue growth {g*100:+.0f}% YoY")

    def _score_capital_efficiency(self, v: Venture) -> Optional[FactorScore]:
        parts, labels = [], []
        bm = v.burn_multiple()
        if bm is not None:
            parts.append(_linear_score(bm, best=0.5, worst=3.0))
            labels.append(f"burn multiple {bm:.1f}x")
        if v.gross_margin is not None:
            parts.append(_linear_score(v.gross_margin, best=0.80, worst=0.20))
            labels.append(f"gross margin {v.gross_margin*100:.0f}%")
        r40 = v.rule_of_40()
        if r40 is not None:
            parts.append(_linear_score(r40, best=60.0, worst=0.0))
            labels.append(f"Rule of 40 = {r40:.0f}")
        score = _avg(parts)
        if score is None:
            return None
        return FactorScore("Capital efficiency", score, 0.0, ", ".join(labels))

    def _score_retention(self, v: Venture) -> Optional[FactorScore]:
        ndr = v.net_revenue_retention
        if ndr is None:
            return None
        score = _linear_score(ndr, best=1.40, worst=0.90)
        return FactorScore("Retention", score, 0.0, f"net revenue retention {ndr*100:.0f}%")

    def _score_market(self, v: Venture) -> Optional[FactorScore]:
        parts, labels = [], []
        if v.tam is not None:
            parts.append(_linear_score(v.tam, best=50000.0, worst=1000.0))
            labels.append(f"TAM {v.tam:,.0f}")
        if v.market_growth is not None:
            parts.append(_linear_score(v.market_growth, best=0.30, worst=0.0))
            labels.append(f"market growth {v.market_growth*100:.0f}%")
        score = _avg(parts)
        if score is None:
            return None
        return FactorScore("Market", score, 0.0, ", ".join(labels))

    def _score_traction(self, v: Venture) -> Optional[FactorScore]:
        if v.arr is None:
            return None
        # Proven revenue de-risks the bet; rises to a plateau (no upper penalty).
        score = _linear_score(v.arr, best=300.0, worst=3.0)
        return FactorScore("Traction", score, 0.0, f"ARR {v.arr:,.0f}")

    def _score_funding_need(self, v: Venture) -> Optional[FactorScore]:
        parts, labels = [], []
        rw = v.runway_months()
        if rw is not None:
            # Raising window: 4-15 months of runway is the sweet spot to enter.
            parts.append(_plateau(rw, zero_lo=0, full_lo=4, full_hi=15, zero_hi=36))
            labels.append("profitable" if rw >= 999 else f"{rw:.0f}mo runway")
        ms = v.months_since_last_round
        if ms is not None:
            # Due for a round at 12-30 months since the last raise.
            parts.append(_plateau(ms, zero_lo=0, full_lo=12, full_hi=30, zero_hi=48))
            labels.append(f"{ms:.0f}mo since raise")
        score = _avg(parts)
        if score is None:
            return None
        return FactorScore("Funding need & timing", score, 0.0, ", ".join(labels))

    def _score_valuation(self, v: Venture) -> Optional[FactorScore]:
        rm = v.revenue_multiple()
        if rm is None:
            return None
        score = _percentile_low_better(rm, self._rev_multiples)
        return FactorScore("Valuation / entry", score, 0.0,
                           f"{rm:.1f}x revenue (cheaper vs cohort = higher)")

    # -- public API -------------------------------------------------------- #
    def score(self, v: Venture) -> Result:
        raw: List[FactorScore] = []
        for scorer in (
            self._score_growth,
            self._score_capital_efficiency,
            self._score_retention,
            self._score_market,
            self._score_traction,
            self._score_funding_need,
            self._score_valuation,
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

    def rank(self, ventures: Optional[List[Venture]] = None,
             only_raising: bool = False) -> List[Result]:
        """Score and rank ventures, most investable first.

        Set ``only_raising=True`` to list just the startups that need funding
        (a short runway or a stale last round)."""
        targets = ventures if ventures is not None else self.cohort
        if only_raising:
            targets = [v for v in targets if v.needs_funding()]
        results = [self.score(v) for v in targets]
        results.sort(key=lambda r: r.score, reverse=True)
        return results
