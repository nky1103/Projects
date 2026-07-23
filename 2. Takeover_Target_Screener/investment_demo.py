"""investment_demo.py

Run the startup investment screener on a CSV cohort and print a sourcing list:
who's raising, how fast they're growing, and how investable they look.

Usage:
    python investment_demo.py                     # sample_ventures.csv, all
    python investment_demo.py my_cohort.csv       # your own cohort
    python investment_demo.py my_cohort.csv raising   # only those needing funding

The CSV header must match the field names of ``investment_screener.Venture``.
Any column may be left blank; the screener renormalises around missing data.
"""

import csv
import sys
from dataclasses import fields

from investment_screener import Venture, InvestmentScreener

_TEXT = {"name", "sector", "stage", "country"}
_NUMERIC = {f.name for f in fields(Venture) if f.name not in _TEXT}


def load_cohort(path: str) -> list[Venture]:
    cohort: list[Venture] = []
    with open(path, newline="", encoding="utf-8") as fh:
        for row in csv.DictReader(fh):
            kwargs = {}
            for key, val in row.items():
                key = key.strip()
                val = (val or "").strip()
                if key in _NUMERIC:
                    kwargs[key] = float(val) if val else None
                else:
                    kwargs[key] = val
            cohort.append(Venture(**kwargs))
    return cohort


def _fmt_growth(v: Venture) -> str:
    g = v.yoy_growth()
    return f"{g*100:+.0f}%" if g is not None else "n/a"


def _fmt_runway(v: Venture) -> str:
    rw = v.runway_months()
    if rw is None:
        return "n/a"
    return "prof." if rw >= 999 else f"{rw:.0f}mo"


def main(path: str, only_raising: bool) -> None:
    cohort = load_cohort(path)
    screener = InvestmentScreener(cohort)
    results = screener.rank(only_raising=only_raising)

    title = "Startups that need funding" if only_raising else "Startup investment screen"
    print(f"\n{title}  —  {len(results)} of {len(cohort)} startups\n" + "=" * 92)
    print(f"{'#':>2}  {'Startup':<14}{'Sector':<16}{'Growth':>7}  {'Runway':>7}  "
          f"{'ARR':>7}  {'Score':>6}  {'Verdict':<15}{'Raise signal':<22}")
    print("-" * 92)
    for i, r in enumerate(results, 1):
        v = r.venture
        arr = f"{v.arr:,.0f}" if v.arr is not None else "n/a"
        print(f"{i:>2}  {v.name:<14}{v.sector:<16}{_fmt_growth(v):>7}  "
              f"{_fmt_runway(v):>7}  {arr:>7}  {r.score:>6.1f}  "
              f"{r.recommendation:<15}{v.raise_signal():<22}")

    print("\nTop opportunities — factor breakdown")
    print("=" * 92)
    for r in results[:3]:
        v = r.venture
        print(f"\n{v.name} ({v.sector}, {v.stage})  —  {r.score:.1f}/100  "
              f"[{r.recommendation}]  ·  {v.raise_signal()}")
        print(f"  Why: {r.rationale()}")
        for f in sorted(r.factors, key=lambda x: x.score * x.weight, reverse=True):
            print(f"    - {f.name:<24} {f.score:5.0f}/100  (w={f.weight:.2f})  {f.detail}")


if __name__ == "__main__":
    args = sys.argv[1:]
    path = "sample_ventures.csv"
    only_raising = False
    for a in args:
        if a.lower() in ("raising", "--raising", "only-raising"):
            only_raising = True
        else:
            path = a
    main(path, only_raising)
