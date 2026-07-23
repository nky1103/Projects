"""takeover_screener.py

A transparent, dependency-free algorithm for identifying public companies
that are "ripe for takeover" (attractive M&A / leveraged-buyout targets).

The model scores every company in a peer universe on seven factors that
acquirers and activist investors actually look for, blends them into a single
0-100 **Takeover Attractiveness Score**, and explains *why* each company scored
the way it did.

The seven factors
-----------------
1. Valuation (undervaluation) ...... cheap multiples vs. peers are a bargain.
2. Debt capacity (LBO-ability) ..... low leverage + cash = room to load debt.
3. Cash-flow quality ............... high free-cash-flow yield services that debt.
4. Operational upside .............. margins below peers = fixable slack.
5. Ownership / control ............. low insider stake / high float = easier to win.
6. Price weakness .................. trading far below its 52-week high = vulnerable.
7. Size ............................ smaller companies are easier to acquire.

Design notes
------------
* Pure standard library (no pandas / numpy) so it runs anywhere.
* Relative factors (valuation, operational upside, size) are scored by peer
  percentile; absolute factors (leverage, cash flow, ownership, price) use
  calibrated linear ramps. Every sub-metric lands on a 0-100 scale.
* Missing data is handled gracefully: a factor with no usable inputs is dropped
  and the remaining factor weights are renormalised, so a company is never
  penalised simply for an unreported field.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict, List, Optional, Sequence


# --------------------------------------------------------------------------- #
# Inputs
# --------------------------------------------------------------------------- #
@dataclass
class Company:
    """Raw fundamentals for a single company.

    Every field except ``name`` is optional. Provide whatever you have; the
    screener derives ratios where possible and quietly skips what it can't
    compute. All monetary values should be in the same currency and unit
    (e.g. millions of USD) across the whole universe.
    """

    name: str
    ticker: str = ""
    sector: str = ""

    # Market data
    share_price: Optional[float] = None
    shares_outstanding: Optional[float] = None
    market_cap: Optional[float] = None
    price_52w_high: Optional[float] = None

    # Income statement
    revenue: Optional[float] = None
    ebitda: Optional[float] = None
    ebit: Optional[float] = None
    net_income: Optional[float] = None
    interest_expense: Optional[float] = None
    free_cash_flow: Optional[float] = None

    # Balance sheet
    total_debt: Optional[float] = None
    cash: Optional[float] = None
    shareholders_equity: Optional[float] = None

    # Ownership / governance
    insider_ownership_pct: Optional[float] = None  # fraction 0-1

    # ---- derived helpers ------------------------------------------------- #
    def get_market_cap(self) -> Optional[float]:
        if self.market_cap is not None:
            return self.market_cap
        if self.share_price is not None and self.shares_outstanding is not None:
            return self.share_price * self.shares_outstanding
        return None

    def net_debt(self) -> Optional[float]:
        if self.total_debt is None and self.cash is None:
            return None
        return (self.total_debt or 0.0) - (self.cash or 0.0)

    def enterprise_value(self) -> Optional[float]:
        mc = self.get_market_cap()
        nd = self.net_debt()
        if mc is None:
            return None
        return mc + (nd or 0.0)

    def ev_ebitda(self) -> Optional[float]:
        ev, e = self.enterprise_value(), self.ebitda
        if ev is None or not e or e <= 0:
            return None
        return ev / e

    def pe_ratio(self) -> Optional[float]:
        mc, ni = self.get_market_cap(), self.net_income
        if mc is None or not ni or ni <= 0:
            return None
        return mc / ni

    def pb_ratio(self) -> Optional[float]:
        mc, eq = self.get_market_cap(), self.shareholders_equity
        if mc is None or not eq or eq <= 0:
            return None
        return mc / eq

    def ev_sales(self) -> Optional[float]:
        ev, r = self.enterprise_value(), self.revenue
        if ev is None or not r or r <= 0:
            return None
        return ev / r

    def ebitda_margin(self) -> Optional[float]:
        if not self.revenue or self.revenue <= 0 or self.ebitda is None:
            return None
        return self.ebitda / self.revenue

    def net_debt_to_ebitda(self) -> Optional[float]:
        nd, e = self.net_debt(), self.ebitda
        if nd is None or not e or e <= 0:
            return None
        return nd / e

    def interest_coverage(self) -> Optional[float]:
        if self.ebit is None or not self.interest_expense or self.interest_expense <= 0:
            return None
        return self.ebit / self.interest_expense

    def fcf_yield(self) -> Optional[float]:
        mc, fcf = self.get_market_cap(), self.free_cash_flow
        if mc is None or mc <= 0 or fcf is None:
            return None
        return fcf / mc

    def cash_to_market_cap(self) -> Optional[float]:
        mc = self.get_market_cap()
        if mc is None or mc <= 0 or self.cash is None:
            return None
        return self.cash / mc

    def upside_from_high(self) -> Optional[float]:
        if not self.price_52w_high or self.price_52w_high <= 0 or self.share_price is None:
            return None
        return (self.price_52w_high - self.share_price) / self.price_52w_high


# --------------------------------------------------------------------------- #
# Outputs
# --------------------------------------------------------------------------- #
@dataclass
class FactorScore:
    name: str
    score: float          # 0-100 for this factor
    weight: float         # effective weight actually applied (post-renormalisation)
    detail: str = ""      # human-readable explanation


@dataclass
class Result:
    company: Company
    score: float                       # final 0-100 Takeover Attractiveness Score
    label: str                         # qualitative bucket
    factors: List[FactorScore] = field(default_factory=list)

    def rationale(self, top_n: int = 3) -> str:
        """Short plain-English summary of the biggest score drivers."""
        ranked = sorted(
            (f for f in self.factors if f.detail),
            key=lambda f: f.score * f.weight,
            reverse=True,
        )
        bits = [f"{f.name} ({f.score:.0f}/100)" for f in ranked[:top_n]]
        return "; ".join(bits) if bits else "insufficient data"


# --------------------------------------------------------------------------- #
# Scoring helpers
# --------------------------------------------------------------------------- #
def _clamp(x: float, lo: float = 0.0, hi: float = 100.0) -> float:
    return max(lo, min(hi, x))


def _linear_score(value: float, best: float, worst: float) -> float:
    """Map ``value`` onto 0-100 where ``best`` -> 100 and ``worst`` -> 0.

    Works whether ``best`` is higher or lower than ``worst``; the result is
    clamped to [0, 100].
    """
    if best == worst:
        return 50.0
    return _clamp(100.0 * (value - worst) / (best - worst))


def _percentile_low_better(value: float, universe: Sequence[float]) -> float:
    """Percentile score where the *lowest* value in the universe scores 100.

    Used for "cheaper / smaller is better" metrics. A company with a value
    below every peer scores ~100; the most expensive scores ~0.
    """
    others = [v for v in universe if v is not None]
    n = len(others)
    if n <= 1:
        return 50.0
    greater = sum(1 for v in others if v > value)
    return 100.0 * greater / (n - 1)


def _avg(scores: Sequence[Optional[float]]) -> Optional[float]:
    vals = [s for s in scores if s is not None]
    return sum(vals) / len(vals) if vals else None


# --------------------------------------------------------------------------- #
# The screener
# --------------------------------------------------------------------------- #
DEFAULT_WEIGHTS: Dict[str, float] = {
    "Valuation": 0.25,
    "Debt capacity": 0.20,
    "Cash flow": 0.18,
    "Operational upside": 0.15,
    "Ownership / control": 0.10,
    "Price weakness": 0.07,
    "Size": 0.05,
}


class TakeoverScreener:
    """Scores a peer universe of companies for takeover attractiveness.

    Relative factors are benchmarked against the ``universe`` passed to the
    constructor, so always screen companies against a comparable peer set
    (ideally same sector / size band) for the valuation, operational-upside
    and size factors to be meaningful.
    """

    def __init__(
        self,
        universe: List[Company],
        weights: Optional[Dict[str, float]] = None,
    ) -> None:
        if not universe:
            raise ValueError("universe must contain at least one company")
        self.universe = universe
        self.weights = dict(weights) if weights else dict(DEFAULT_WEIGHTS)

        # Pre-compute universe-wide distributions for the relative factors.
        self._ev_ebitda = [c.ev_ebitda() for c in universe]
        self._pe = [c.pe_ratio() for c in universe]
        self._pb = [c.pb_ratio() for c in universe]
        self._ev_sales = [c.ev_sales() for c in universe]
        self._mktcap = [c.get_market_cap() for c in universe]

        margins = [c.ebitda_margin() for c in universe if c.ebitda_margin() is not None]
        self._peer_median_margin = _median(margins) if margins else None

    # -- individual factor scorers ---------------------------------------- #
    def _score_valuation(self, c: Company) -> Optional[FactorScore]:
        parts, labels = [], []
        for value, universe, tag in (
            (c.ev_ebitda(), self._ev_ebitda, "EV/EBITDA"),
            (c.pe_ratio(), self._pe, "P/E"),
            (c.pb_ratio(), self._pb, "P/B"),
            (c.ev_sales(), self._ev_sales, "EV/Sales"),
        ):
            if value is not None:
                parts.append(_percentile_low_better(value, universe))
                labels.append(f"{tag} {value:.1f}")
        s = _avg(parts)
        if s is None:
            return None
        return FactorScore("Valuation", s, 0.0, "cheap vs peers: " + ", ".join(labels))

    def _score_debt_capacity(self, c: Company) -> Optional[FactorScore]:
        parts, labels = [], []
        nde = c.net_debt_to_ebitda()
        if nde is not None:
            # net cash (<=-1x) is ideal for a buyer; >=4x already stretched.
            parts.append(_linear_score(nde, best=-1.0, worst=4.0))
            labels.append(f"net debt/EBITDA {nde:.1f}x")
        cov = c.interest_coverage()
        if cov is not None:
            parts.append(_linear_score(cov, best=15.0, worst=2.0))
            labels.append(f"interest cover {cov:.1f}x")
        c2m = c.cash_to_market_cap()
        if c2m is not None:
            parts.append(_linear_score(c2m, best=0.40, worst=0.0))
            labels.append(f"cash {c2m*100:.0f}% of mkt cap")
        s = _avg(parts)
        if s is None:
            return None
        return FactorScore("Debt capacity", s, 0.0, ", ".join(labels))

    def _score_cash_flow(self, c: Company) -> Optional[FactorScore]:
        fy = c.fcf_yield()
        if fy is None:
            return None
        # 12%+ FCF yield is very financeable; 0% or negative is not.
        s = _linear_score(fy, best=0.12, worst=0.0)
        return FactorScore("Cash flow", s, 0.0, f"FCF yield {fy*100:.1f}%")

    def _score_operational_upside(self, c: Company) -> Optional[FactorScore]:
        m = c.ebitda_margin()
        if m is None or self._peer_median_margin is None:
            return None
        gap = self._peer_median_margin - m  # positive => below peers => fixable slack
        s = _linear_score(gap, best=0.15, worst=-0.05)
        pos = "below" if gap > 0 else "above"
        return FactorScore(
            "Operational upside", s, 0.0,
            f"EBITDA margin {m*100:.0f}% ({abs(gap)*100:.0f}pp {pos} peer median)",
        )

    def _score_ownership(self, c: Company) -> Optional[FactorScore]:
        io = c.insider_ownership_pct
        if io is None:
            return None
        # A controlling insider stake (>=50%) blocks a takeover; low = open float.
        s = _linear_score(io, best=0.05, worst=0.50)
        return FactorScore(
            "Ownership / control", s, 0.0,
            f"insider ownership {io*100:.0f}% (float {100-io*100:.0f}%)",
        )

    def _score_price_weakness(self, c: Company) -> Optional[FactorScore]:
        up = c.upside_from_high()
        if up is None:
            return None
        s = _linear_score(up, best=0.60, worst=0.0)
        return FactorScore(
            "Price weakness", s, 0.0,
            f"{up*100:.0f}% below 52-week high",
        )

    def _score_size(self, c: Company) -> Optional[FactorScore]:
        mc = c.get_market_cap()
        if mc is None:
            return None
        s = _percentile_low_better(mc, self._mktcap)
        return FactorScore("Size", s, 0.0, f"market cap {mc:,.0f} (smaller = easier)")

    # -- public API -------------------------------------------------------- #
    def score(self, c: Company) -> Result:
        raw: List[FactorScore] = []
        for scorer in (
            self._score_valuation,
            self._score_debt_capacity,
            self._score_cash_flow,
            self._score_operational_upside,
            self._score_ownership,
            self._score_price_weakness,
            self._score_size,
        ):
            fs = scorer(c)
            if fs is not None:
                raw.append(fs)

        # Renormalise the configured weights over the factors we could compute.
        total_w = sum(self.weights.get(f.name, 0.0) for f in raw)
        if total_w <= 0:
            return Result(c, 0.0, _label(0.0), raw)

        final = 0.0
        for fs in raw:
            fs.weight = self.weights.get(fs.name, 0.0) / total_w
            final += fs.score * fs.weight

        final = round(final, 1)
        return Result(c, final, _label(final), raw)

    def rank(self, companies: Optional[List[Company]] = None) -> List[Result]:
        """Score companies (defaults to the universe) and return them ranked
        from most to least attractive as a takeover target."""
        targets = companies if companies is not None else self.universe
        results = [self.score(c) for c in targets]
        results.sort(key=lambda r: r.score, reverse=True)
        return results


# --------------------------------------------------------------------------- #
# Small utilities
# --------------------------------------------------------------------------- #
def _median(values: Sequence[float]) -> float:
    s = sorted(values)
    n = len(s)
    mid = n // 2
    if n % 2:
        return s[mid]
    return (s[mid - 1] + s[mid]) / 2.0


def _label(score: float) -> str:
    if score >= 70:
        return "Prime target"
    if score >= 55:
        return "Attractive"
    if score >= 40:
        return "Possible"
    return "Unlikely"
