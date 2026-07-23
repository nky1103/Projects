"""startup_screener.py

A takeover / acquisition-target screener for **startups**.

The public-company model in ``takeover_screener.py`` relies on things startups
don't have: a share price, P/E and EV/EBITDA multiples, positive EBITDA, and
debt capacity for a leveraged buyout. For a private, venture-backed company,
"ripe for takeover" is driven by an entirely different set of signals — so this
module scores a different factor set while reusing the same transparent,
missing-data-tolerant scoring engine.

The seven startup factors
-------------------------
1. Sale pressure (25%) ..... short runway + down/flat + stale last round =
                             a motivated seller. The single biggest driver.
2. Growth (18%) ............ high revenue / ARR growth = strategically attractive.
3. Unit economics (15%) .... gross margin, burn multiple, Rule of 40 = a clean,
                             cheap-to-integrate asset.
4. Valuation (15%) ......... low revenue multiple vs peers = affordable to buy.
5. Retention (10%) ......... high net revenue retention = sticky, worth owning.
6. Traction (10%) .......... enough ARR to matter, not so much it's unaffordable
                             (a sweet-spot, not "bigger is always better").
7. Investor pressure (7%) .. low founder ownership / heavy VC ownership = a cap
                             table that wants an exit.

The blend deliberately rewards the *sweet spot*: a startup that is both a decent
asset (growth / economics / retention) **and** available (runway / down-round /
investor pressure). A well-funded high-flyer scores mid — desirable but not for
sale; a zombie scores mid — available but not worth buying.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict, List, Optional

# Reuse the scoring engine from the public-company screener (same project).
from takeover_screener import _linear_score, _percentile_low_better, _avg, _label


# --------------------------------------------------------------------------- #
# Inputs
# --------------------------------------------------------------------------- #
@dataclass
class Startup:
    """Metrics for a single (typically private) startup.

    Every field except ``name`` is optional. Money fields should share one unit
    across the whole cohort (e.g. INR crore); ARR and monthly burn in that same
    unit. Percentages are fractions (0.80 = 80%).
    """

    name: str
    sector: str = ""
    stage: str = ""           # Seed / A / B / C ...
    country: str = ""

    # Funding / valuation
    last_valuation: Optional[float] = None      # latest post-money
    prev_valuation: Optional[float] = None      # previous round post-money
    months_since_last_round: Optional[float] = None

    # Traction
    arr: Optional[float] = None                 # latest annual (recurring) revenue
    arr_prev: Optional[float] = None            # prior-year annual revenue
    gross_margin: Optional[float] = None        # fraction
    net_revenue_retention: Optional[float] = None  # fraction, e.g. 1.15

    # Cash
    monthly_net_burn: Optional[float] = None    # cash burned per month (>0 = burning)
    cash_on_hand: Optional[float] = None

    # Cap table
    founder_ownership_pct: Optional[float] = None  # fraction

    # ---- derived helpers ------------------------------------------------- #
    def runway_months(self) -> Optional[float]:
        if self.monthly_net_burn is None or self.cash_on_hand is None:
            return None
        if self.monthly_net_burn <= 0:      # profitable / cash-generative
            return 999.0
        return self.cash_on_hand / self.monthly_net_burn

    def yoy_growth(self) -> Optional[float]:
        if not self.arr_prev or self.arr_prev <= 0 or self.arr is None:
            return None
        return self.arr / self.arr_prev - 1.0

    def valuation_change(self) -> Optional[float]:
        if not self.prev_valuation or self.prev_valuation <= 0 or self.last_valuation is None:
            return None
        return self.last_valuation / self.prev_valuation - 1.0

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
        """Net cash burned per unit of net-new ARR added (lower = more efficient)."""
        if self.monthly_net_burn is None or self.monthly_net_burn <= 0:
            return None
        if self.arr is None or self.arr_prev is None:
            return None
        net_new = self.arr - self.arr_prev
        if net_new <= 0:
            return None
        return (self.monthly_net_burn * 12) / net_new


# --------------------------------------------------------------------------- #
# Outputs (mirror the public-company screener for a consistent interface)
# --------------------------------------------------------------------------- #
@dataclass
class FactorScore:
    name: str
    score: float
    weight: float
    detail: str = ""


@dataclass
class Result:
    startup: Startup
    score: float
    label: str
    factors: List[FactorScore] = field(default_factory=list)

    def rationale(self, top_n: int = 3) -> str:
        ranked = sorted(
            (f for f in self.factors if f.detail),
            key=lambda f: f.score * f.weight,
            reverse=True,
        )
        bits = [f"{f.name} ({f.score:.0f}/100)" for f in ranked[:top_n]]
        return "; ".join(bits) if bits else "insufficient data"


# --------------------------------------------------------------------------- #
# Extra scoring helper
# --------------------------------------------------------------------------- #
def _plateau(value: float, zero_lo: float, full_lo: float,
             full_hi: float, zero_hi: float) -> float:
    """Sweet-spot score: 0 below ``zero_lo``, ramps to 100 across
    ``[zero_lo, full_lo]``, stays 100 across ``[full_lo, full_hi]``, ramps back
    to 0 across ``[full_hi, zero_hi]``. Used for "not too small, not too big"."""
    if value <= full_lo:
        return _linear_score(value, best=full_lo, worst=zero_lo)
    if value <= full_hi:
        return 100.0
    return _linear_score(value, best=full_hi, worst=zero_hi)


# --------------------------------------------------------------------------- #
# The screener
# --------------------------------------------------------------------------- #
DEFAULT_WEIGHTS: Dict[str, float] = {
    "Sale pressure": 0.25,
    "Growth": 0.18,
    "Unit economics": 0.15,
    "Valuation": 0.15,
    "Retention": 0.10,
    "Traction": 0.10,
    "Investor pressure": 0.07,
}


class StartupScreener:
    """Scores a cohort of startups for acquisition-target attractiveness.

    The Valuation factor is benchmarked against the ``cohort`` passed in, so
    screen comparable startups together (same rough stage / sector) for it to
    be meaningful.
    """

    def __init__(self, cohort: List[Startup],
                 weights: Optional[Dict[str, float]] = None) -> None:
        if not cohort:
            raise ValueError("cohort must contain at least one startup")
        self.cohort = cohort
        self.weights = dict(weights) if weights else dict(DEFAULT_WEIGHTS)
        self._rev_multiples = [s.revenue_multiple() for s in cohort]

    # -- factor scorers ---------------------------------------------------- #
    def _score_sale_pressure(self, s: Startup) -> Optional[FactorScore]:
        parts, labels = [], []
        rw = s.runway_months()
        if rw is not None:
            parts.append(_linear_score(rw, best=3.0, worst=30.0))  # short runway = ripe
            labels.append("cash-positive" if rw >= 999 else f"{rw:.0f}mo runway")
        vc = s.valuation_change()
        if vc is not None:
            parts.append(_linear_score(vc, best=-0.5, worst=1.0))  # down round = ripe
            if abs(vc) < 0.01:
                labels.append("flat round")
            else:
                labels.append(f"{'down' if vc < 0 else 'up'} round {vc*100:+.0f}%")
        ms = s.months_since_last_round
        if ms is not None:
            parts.append(_linear_score(ms, best=30.0, worst=6.0))  # stale = ripe
            labels.append(f"{ms:.0f}mo since raise")
        score = _avg(parts)
        if score is None:
            return None
        return FactorScore("Sale pressure", score, 0.0, ", ".join(labels))

    def _score_growth(self, s: Startup) -> Optional[FactorScore]:
        g = s.yoy_growth()
        if g is None:
            return None
        score = _linear_score(g, best=1.5, worst=0.0)  # 150%+ -> 100, flat/decline -> 0
        return FactorScore("Growth", score, 0.0, f"ARR growth {g*100:+.0f}% YoY")

    def _score_unit_economics(self, s: Startup) -> Optional[FactorScore]:
        parts, labels = [], []
        if s.gross_margin is not None:
            parts.append(_linear_score(s.gross_margin, best=0.85, worst=0.20))
            labels.append(f"gross margin {s.gross_margin*100:.0f}%")
        r40 = s.rule_of_40()
        if r40 is not None:
            parts.append(_linear_score(r40, best=60.0, worst=0.0))
            labels.append(f"Rule of 40 = {r40:.0f}")
        bm = s.burn_multiple()
        if bm is not None:
            parts.append(_linear_score(bm, best=0.5, worst=3.0))  # low burn multiple = efficient
            labels.append(f"burn multiple {bm:.1f}x")
        score = _avg(parts)
        if score is None:
            return None
        return FactorScore("Unit economics", score, 0.0, ", ".join(labels))

    def _score_valuation(self, s: Startup) -> Optional[FactorScore]:
        rm = s.revenue_multiple()
        if rm is None:
            return None
        score = _percentile_low_better(rm, self._rev_multiples)  # cheaper vs peers = better
        return FactorScore("Valuation", score, 0.0, f"{rm:.1f}x revenue (cheap vs peers = higher)")

    def _score_retention(self, s: Startup) -> Optional[FactorScore]:
        ndr = s.net_revenue_retention
        if ndr is None:
            return None
        score = _linear_score(ndr, best=1.40, worst=0.90)
        return FactorScore("Retention", score, 0.0, f"net revenue retention {ndr*100:.0f}%")

    def _score_traction(self, s: Startup) -> Optional[FactorScore]:
        if s.arr is None:
            return None
        # Sweet spot: big enough to matter, not so big it's unaffordable.
        # (Units are the cohort's money unit; defaults tuned for INR crore.)
        score = _plateau(s.arr, zero_lo=10, full_lo=100, full_hi=1000, zero_hi=8000)
        return FactorScore("Traction", score, 0.0, f"ARR {s.arr:,.0f} (acquirable scale)")

    def _score_investor_pressure(self, s: Startup) -> Optional[FactorScore]:
        fo = s.founder_ownership_pct
        if fo is None:
            return None
        # Low founder ownership = VC-dominated cap table that wants an exit.
        score = _linear_score(fo, best=0.10, worst=0.60)
        return FactorScore("Investor pressure", score, 0.0,
                           f"founder ownership {fo*100:.0f}%")

    # -- public API -------------------------------------------------------- #
    def score(self, s: Startup) -> Result:
        raw: List[FactorScore] = []
        for scorer in (
            self._score_sale_pressure,
            self._score_growth,
            self._score_unit_economics,
            self._score_valuation,
            self._score_retention,
            self._score_traction,
            self._score_investor_pressure,
        ):
            fs = scorer(s)
            if fs is not None:
                raw.append(fs)

        total_w = sum(self.weights.get(f.name, 0.0) for f in raw)
        if total_w <= 0:
            return Result(s, 0.0, _label(0.0), raw)

        final = 0.0
        for fs in raw:
            fs.weight = self.weights.get(fs.name, 0.0) / total_w
            final += fs.score * fs.weight

        final = round(final, 1)
        return Result(s, final, _label(final), raw)

    def rank(self, startups: Optional[List[Startup]] = None) -> List[Result]:
        targets = startups if startups is not None else self.cohort
        results = [self.score(s) for s in targets]
        results.sort(key=lambda r: r.score, reverse=True)
        return results
