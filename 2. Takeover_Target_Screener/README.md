# Takeover Target Screener

An algorithm that identifies public companies **ripe for takeover** — the kind
of targets that acquirers, private-equity funds, and activist investors hunt
for. It scores every company in a peer universe on seven fundamentals-driven
factors, blends them into a single **Takeover Attractiveness Score (0–100)**,
and explains *why* each company scored the way it did.

It is pure Python (standard library only — no pandas/numpy), so it runs
anywhere.

> **This project is now a small suite of three screeners** sharing one scoring
> engine, because "ripe for takeover" means different things for different
> targets:
> 1. **Public companies** — `takeover_screener.py` (this page's main model).
> 2. **Startup acquisition targets** — `startup_screener.py`
>    ([jump](#startups-are-a-different-model)).
> 3. **Startup investment sourcing** ("who needs funding & is worth backing") —
>    `investment_screener.py` ([jump](#investing-in-startups-the-sourcing-screener)).

## The idea

A company becomes an attractive takeover target when it is **cheap**, **easy to
finance**, **easy to gain control of**, and has **upside a new owner could
unlock**. The screener turns that intuition into seven measurable factors:

| # | Factor | What it captures | Signal for a buyer |
|---|--------|------------------|--------------------|
| 1 | **Valuation** (25%) | EV/EBITDA, P/E, P/B, EV/Sales vs. peers | Cheap multiples = a bargain |
| 2 | **Debt capacity** (20%) | Net-debt/EBITDA, interest coverage, cash/market-cap | Low leverage + cash = room to fund an LBO |
| 3 | **Cash flow** (18%) | Free-cash-flow yield | Strong FCF services acquisition debt |
| 4 | **Operational upside** (15%) | EBITDA margin vs. peer median | Below-peer margins = fixable slack |
| 5 | **Ownership / control** (10%) | Insider ownership / free float | Low insider stake = easier to win control |
| 6 | **Price weakness** (7%) | Discount to 52-week high | A depressed price = cheap and vulnerable |
| 7 | **Size** (5%) | Market cap vs. peers | Smaller companies are easier to swallow |

Each factor is scored 0–100 and combined with the weights above. The result
maps to a verdict: **Prime target** (≥70), **Attractive** (55–69),
**Possible** (40–54), or **Unlikely** (<40).

## How the scoring works

- **Relative factors** (valuation, operational upside, size) are scored by
  **peer percentile** — a company cheaper than every peer scores ~100. This is
  why you should always screen a company against a **comparable peer set**
  (same sector / size band).
- **Absolute factors** (debt capacity, cash flow, ownership, price weakness)
  use **calibrated linear ramps** anchored to real-world thresholds (e.g. net
  cash → 100, 4× net-debt/EBITDA → 0; 12%+ FCF yield → 100).
- **Missing data is handled gracefully.** If a factor can't be computed (a field
  is blank, or earnings are negative so a multiple is meaningless), that factor
  is dropped and the remaining weights are **renormalised**. A company is never
  penalised for an unreported field.

## Usage

```bash
# Rank the bundled sample universe of 12 companies
python demo.py

# Or screen your own universe (same CSV columns)
python demo.py my_universe.csv
```

Programmatic use:

```python
from takeover_screener import Company, TakeoverScreener

universe = [
    Company(name="Meridian Foods", ticker="MERF", share_price=18.5,
            shares_outstanding=120, price_52w_high=31, revenue=3200,
            ebitda=430, ebit=300, net_income=180, interest_expense=35,
            free_cash_flow=260, total_debt=900, cash=150,
            shareholders_equity=1400, insider_ownership_pct=0.06),
    # ... more peers ...
]

screener = TakeoverScreener(universe)          # optionally pass custom weights
for r in screener.rank():                      # sorted, most attractive first
    print(f"{r.company.name:<24} {r.score:5.1f}  {r.label}")
    print("   ", r.rationale())                # top score drivers, plain English
```

Custom weights (any subset; they are renormalised):

```python
screener = TakeoverScreener(universe, weights={
    "Valuation": 0.35, "Debt capacity": 0.25, "Cash flow": 0.20,
    "Operational upside": 0.10, "Ownership / control": 0.10,
})
```

## Inputs

Provide whatever fundamentals you have on the `Company` dataclass — all fields
except `name` are optional. Values should share the same currency and unit
(e.g. millions of USD) across the universe. The screener derives the ratios it
needs (enterprise value, EV/EBITDA, net-debt/EBITDA, FCF yield, margins, …).

The CSV header must match the `Company` field names; see
[`sample_companies.csv`](sample_companies.csv) for the full column set.

## Files

| File | Purpose |
|------|---------|
| `takeover_screener.py` | Core algorithm for **public companies** (`Company`, `TakeoverScreener`) |
| `demo.py` | Loads a company CSV and prints a ranked report with factor breakdowns |
| `sample_companies.csv` | Example universe of 12 companies |
| `real_world_india_cement.csv` | Real Indian cement peer group (featured example) |
| `real_world_staples.csv` | Real US packaged-food peer group (secondary example) |
| `test_takeover_screener.py` | Unit tests for the public-company model |
| `startup_screener.py` | Model for **startup acquisition** targets (`Startup`, `StartupScreener`) |
| `startup_demo.py` | Loads a startup CSV and prints a ranked report |
| `sample_startups.csv` | Illustrative Indian startup cohort |
| `test_startup_screener.py` | Unit tests for the startup acquisition model |
| `investment_screener.py` | Model for **startup investment** sourcing (`Venture`, `InvestmentScreener`) |
| `investment_demo.py` | Prints a sourcing list; `raising` arg filters to who needs funding |
| `sample_ventures.csv` | Illustrative cohort with quality fields populated |
| `real_world_india_startups.csv` | 8 real Indian startups, public FY25 data |
| `test_investment_screener.py` | Unit tests for the investment model |

## Tests

```bash
python -m unittest -v test_takeover_screener.py
```

## Real-world example — Indian cement

[`real_world_india_cement.csv`](real_world_india_cement.csv) holds **actual TTM
fundamentals** (₹ crore, pulled mid-2026 from stockanalysis.com and screener.in)
for eight listed Indian cement companies — India's most active consolidation
sector. Run it with:

```bash
python demo.py real_world_india_cement.csv
```

Result:

| # | Company | Promoter % | Score | Verdict | Read |
|---|---------|-----------:|------:|---------|------|
| 1 | ACC | 57% | 58.3 | Attractive | Cheapest in the group (EV/EBITDA 9, P/E 12), low-margin, near-zero debt |
| 2 | JK Lakshmi Cement | 45% | 57.0 | Attractive | Small, cheap, 42% below its 52-week high, lightest promoter grip |
| 3 | Ambuja Cements | 67% | 40.9 | Possible | Net cash, but pricey and tightly Adani-held |
| 4 | Dalmia Bharat | 56% | 39.0 | Unlikely | Mid-valued, mid-leverage |
| 5 | Ramco Cements | 43% | 33.3 | Unlikely | Lowest promoter holding, but expensive on earnings |
| 6 | Shree Cement | 63% | 23.3 | Unlikely | Premium franchise, richly valued |
| 7 | JK Cement | 46% | 20.2 | Unlikely | High-growth, high-multiple |
| 8 | **UltraTech Cement** | 59% | **15.9** | **Unlikely** | The **acquirer**, not a target — most expensive, market leader |

**Why this is a good check:**

- **The expensive market leaders sink to the bottom** — UltraTech (the sector's
  *acquirer*), JK Cement and Shree Cement score lowest. Nobody takes over the
  premium consolidator; exactly right.
- **The cheap, lower-margin, lightly-held names rise** — ACC and JK Lakshmi. ACC
  is the cheapest asset in the group, which is precisely why it changed hands
  when **Adani bought Holcim's Ambuja + ACC stake in 2022**.
- **No company scores "Prime target" (≥70), and that is the point.** Indian
  promoters hold 43–67% here, so *hostile* takeovers are structurally
  near-impossible. The model's ceiling mirrors reality: control changes in Indian
  cement happen through **negotiated promoter/parent exits**, not raids — Holcim →
  Adani (Ambuja/ACC, 2022); the N. Srinivasan family → UltraTech (India Cements,
  2024); Kesoram (B.K. Birla group) → UltraTech (2024).
- One to watch that the model surfaces: **Ramco Cements** carries the lowest
  promoter holding (≈43%) and is controlled by the *same* N. Srinivasan family
  that sold India Cements to UltraTech.

**Two honest notes on this run.**
1. *No free-cash-flow field was available* from the quick data pull, so the
   cash-flow factor (18%) was dropped **uniformly** and the remaining six factor
   weights renormalised — the fair, built-in degradation behaviour.
2. *The ownership ramp is US-calibrated* (`best=5%`, `worst=50%` insider). In
   India a 45% promoter stake is already *low*, so most names saturate near 0 on
   that factor. It still ranks them correctly **relative** to each other, but for
   production use in India you'd recalibrate the ramp to the local distribution
   (e.g. anchor `best` near SEBI's 25% open-offer trigger and `worst` near the
   75% maximum promoter holding).

> An earlier US packaged-food example is also included as
> [`real_world_staples.csv`](real_world_staples.csv) — run `python demo.py
> real_world_staples.csv`. There the model correctly ranks trust-controlled
> **Hershey** dead last (it blocked Mondelez's 2016 bid) and floats cheap,
> widely-held **Conagra/Campbell's** to the top.

## Startups are a different model

The public-company model above **does not transfer to startups** — a private,
venture-backed company has no share price, no P/E or EV/EBITDA, usually negative
EBITDA, and no debt capacity to lever. So there's a separate screener,
[`startup_screener.py`](startup_screener.py), that keeps the same
missing-data-tolerant scoring engine but swaps in startup-appropriate factors:

| Factor (weight) | Signal that a startup is a ripe target |
|---|---|
| **Sale pressure** (25%) | Short runway + a down/flat + a stale last round = a motivated seller |
| **Growth** (18%) | High ARR growth = strategically attractive |
| **Unit economics** (15%) | Gross margin, burn multiple, Rule of 40 = a clean, cheap-to-integrate asset |
| **Valuation** (15%) | Low revenue multiple vs. cohort = affordable |
| **Retention** (10%) | High net revenue retention = sticky |
| **Traction** (10%) | Enough ARR to matter, not so much it's unaffordable (a sweet-spot) |
| **Investor pressure** (7%) | Low founder ownership / VC-heavy cap table wants an exit |

The blend rewards the **sweet spot** — a startup that is both a *decent asset*
and *available*. A well-funded high-flyer scores mid (desirable but not for
sale); a zombie scores mid (available but not worth buying).

```bash
python startup_demo.py                 # runs the illustrative cohort below
python startup_demo.py my_cohort.csv   # your own metrics (same columns)
```

On the illustrative Indian cohort in
[`sample_startups.csv`](sample_startups.csv):

| # | Startup | Sector | Score | Real-world analogue |
|---|---------|--------|------:|---------------------|
| 1 | QuickCart | Quick-commerce | 62.7 | Cash-burning q-commerce with real scale → **Blinkit (bought by Zomato, 2022)** / Dunzo |
| 2 | MediBridge | Healthtech | 56.9 | Deep down-round, cheap, diluted founders → **PharmEasy**-style |
| 3 | EduSpark | Edtech | 56.5 | −89% down-round, declining, ~3mo runway → **Byju's**-style asset sale |
| 4 | LogiPod | Logistics SaaS | 56.4 | Strong, efficient, mildly pressured |
| 5 | StyleStack | D2C Fashion | 56.0 | Down-round + short runway + decent scale |
| 6 | AgriLink | Agritech | 47.6 | Middling on every axis |
| 7 | LedgerCloud | B2B SaaS | 47.5 | Excellent asset but well-funded — not *available* |
| 8 | **PayWave** | Fintech | **36.1** | Well-capitalised, up-round, founder-controlled → **not for sale** |

**Why this is a good check:**

- **The distressed-but-real-asset names top the list** (QuickCart, MediBridge,
  EduSpark) — exactly the profile of startups that actually get acquired or
  acqui-hired in a downturn. The clearest confirming case is **Blinkit**: a
  cash-strapped quick-commerce startup with genuine scale, bought by Zomato.
- **The healthy, well-funded high-flyer (PayWave) ranks last** — a long runway,
  an up-round and a founder-controlled cap table mean it's *desirable but not
  available*. Correctly *not* ripe.
- **A great asset that isn't for sale scores only mid** (LedgerCloud) — strong
  economics and retention, but 40+ months of runway and an up-round remove the
  motivation. Attractiveness alone isn't enough; the model demands availability.

> **Data honesty:** unlike the public-company examples, this startup cohort is
> **illustrative** — built to mirror real Indian outcomes, not scraped from
> filings. Granular startup metrics (ARR, burn, runway, NRR, cap table) are
> private and not reliably public, so plug in your own deal-flow / data-room
> numbers (or a data provider's) for a real screen. The `sample_startups.csv`
> columns show exactly what the model needs.

## Investing in startups: the sourcing screener

"Which startups need funding, how fast are they growing, and are they worth
backing?" is a *different* question from "who's a good acquisition target" — an
investor wants a company that needs capital to **grow**, not to **survive**. So
[`investment_screener.py`](investment_screener.py) flips the logic: down-rounds
and broken unit economics count **against** the score, while growth, capital
efficiency, retention and a big market count **for** it.

| Factor (weight) | Signal |
|---|---|
| **Growth** (22%) | ARR / revenue YoY — the primary VC signal |
| **Capital efficiency** (18%) | Burn multiple, gross margin, Rule of 40 |
| **Retention** (14%) | Net revenue retention |
| **Market** (12%) | TAM size + market growth |
| **Traction** (12%) | Proven ARR scale |
| **Funding need & timing** (12%) | The "requires funding" signal — a 4–15mo runway + 12–30mo since the last raise = raising now |
| **Valuation / entry** (10%) | Cheap revenue multiple vs. cohort |

Every startup also gets a `needs_funding` flag and a plain-English
`raise_signal`, so the output reads like a sourcing list. You can list *only*
the ones that need capital:

```bash
python investment_demo.py                              # full illustrative cohort
python investment_demo.py sample_ventures.csv raising  # only those needing funding
python investment_demo.py real_world_india_startups.csv
```

On the illustrative cohort, the key behaviour is that **needing money ≠ being a
good investment**: `EdMentor` (edtech, −10% growth, 3-month runway) needs
funding the *most* but ranks **last**, while `DataForge` (AI infra, +200%
growth, 140% NRR, huge TAM) tops the list. A profitable company (`CloudLedger`)
is correctly flagged *"not raising."*

### On real Indian startups (public data)

[`real_world_india_startups.csv`](real_world_india_startups.csv) runs the screen
on eight well-known Indian startups using **actual reported FY25 figures**
(revenue, valuation, funding recency; net-loss-derived burn where a company is
growing):

| # | Startup | FY25 rev (₹cr) | Growth | Score | Verdict | Raise signal |
|---|---------|---------------:|-------:|------:|---------|--------------|
| 1 | Zepto | 11,110 | +149% | 77.1 | High conviction | Well funded (just raised $450M) |
| 2 | OfBusiness | 19,296 | +26% | 65.8 | Consider | Likely raising soon |
| 3 | Udaan | 4,561 | −19% | 58.2 | Consider | Likely raising soon |
| 4 | Cars24 | 6,233 | −10% | 55.6 | Consider | Likely raising soon |
| 5 | Rapido | 934 | +44% | 47.8 | Watch | Well funded |
| 6 | Meesho | 9,390 | +23% | 46.2 | Watch | Well funded (IPO'd Dec 2025) |
| 7 | ShareChat | 723 | +1% | 43.0 | Watch | Likely raising soon |
| 8 | Cred | 2,735 | +16% | 38.7 | Pass | Likely raising soon |

**The honest limitation this exposes.** Startup quality metrics — gross margin,
net revenue retention, burn multiple, runway, TAM — are **private**. With only
public data, the screen can rank on *growth, price and funding-timing* but is
**blind to quality**, so cheap-but-declining incumbents (Udaan −19%, Cars24
−10%) still drift up to "Consider" on a low revenue multiple and a stale round.
Those are exactly the *"other important things that make an investment decision
solid"* — and they need **primary data** (a data room, a data provider, or the
founder's deck). The illustrative `sample_ventures.csv` shows the model with
those fields populated; feed it your real deal-flow numbers for a decision-grade
screen. Reported figures were sourced mid-2026 from Entrackr, Inc42, Business
Standard and Tracxn coverage of MCA filings.

## Caveats

This is a **fundamentals-based screening heuristic**, not investment advice.
Real M&A decisions also depend on strategic fit, antitrust, control provisions
(poison pills, staggered boards, dual-class shares), management receptiveness,
and market conditions — none of which live in a spreadsheet. Use it to surface
candidates for deeper diligence, and always score against a genuinely
comparable peer group.
