"""demo.py

Run the takeover screener on a CSV of companies and print a ranked report.

Usage:
    python demo.py                       # uses sample_companies.csv
    python demo.py my_universe.csv       # uses your own file (same columns)

The CSV header must match the field names of ``takeover_screener.Company``.
Any column may be left blank; the screener renormalises around missing data.
"""

import csv
import sys
from dataclasses import fields

from takeover_screener import Company, TakeoverScreener

# Which Company fields are numeric (so we can parse blanks -> None).
_NUMERIC = {
    f.name for f in fields(Company)
    if f.name not in {"name", "ticker", "sector"}
}


def load_universe(path: str) -> list[Company]:
    companies: list[Company] = []
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
            companies.append(Company(**kwargs))
    return companies


def main(path: str) -> None:
    universe = load_universe(path)
    screener = TakeoverScreener(universe)
    results = screener.rank()

    print(f"\nTakeover Target Screen  —  {len(universe)} companies\n" + "=" * 78)
    print(f"{'#':>2}  {'Company':<24}{'Ticker':<8}{'Score':>6}  {'Verdict':<14}")
    print("-" * 78)
    for i, r in enumerate(results, 1):
        print(f"{i:>2}  {r.company.name:<24}{r.company.ticker:<8}"
              f"{r.score:>6.1f}  {r.label:<14}")

    print("\nTop candidates — factor breakdown")
    print("=" * 78)
    for r in results[:3]:
        print(f"\n{r.company.name} ({r.company.ticker})  —  {r.score:.1f}/100  [{r.label}]")
        print(f"  Why: {r.rationale()}")
        for f in sorted(r.factors, key=lambda x: x.score * x.weight, reverse=True):
            print(f"    - {f.name:<20} {f.score:5.0f}/100  (w={f.weight:.2f})  {f.detail}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "sample_companies.csv")
