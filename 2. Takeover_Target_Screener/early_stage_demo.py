"""early_stage_demo.py

Run the early-stage (Seed - Series B) screener on a CSV cohort and print a
ranked report with the three-layer breakdown (Qualitative / Financial /
Alt-data) plus the top factor detail.

Usage:
    python early_stage_demo.py                       # sample_early_startups.csv
    python early_stage_demo.py my_cohort.csv         # your own cohort

The CSV header must match the field names of ``early_stage_screener.EarlyVenture``.
Any column may be left blank; the screener renormalises around missing data.
"""

import csv
import sys
from dataclasses import fields

from early_stage_screener import EarlyVenture, EarlyStageScreener

_TEXT = {"name", "sector", "stage", "country"}
_NUMERIC = {f.name for f in fields(EarlyVenture) if f.name not in _TEXT}


def load_cohort(path: str) -> list[EarlyVenture]:
    cohort: list[EarlyVenture] = []
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
            cohort.append(EarlyVenture(**kwargs))
    return cohort


def main(path: str) -> None:
    cohort = load_cohort(path)
    screener = EarlyStageScreener(cohort)
    results = screener.rank()

    print(f"\nEarly-stage (Seed-Series B) investment screen  —  {len(cohort)} startups\n"
          + "=" * 90)
    print(f"{'#':>2}  {'Startup':<14}{'Sector':<16}{'Stage':<10}"
          f"{'Qual':>5}{'Fin':>5}{'Alt':>5}{'Overall':>8}  {'Verdict':<15}")
    print("-" * 90)
    for i, r in enumerate(results, 1):
        ls = r.layer_scores()
        q = f"{ls.get('Qualitative', 0):.0f}" if 'Qualitative' in ls else "-"
        f = f"{ls.get('Financial', 0):.0f}" if 'Financial' in ls else "-"
        a = f"{ls.get('Alt-data', 0):.0f}" if 'Alt-data' in ls else "-"
        v = r.venture
        print(f"{i:>2}  {v.name:<14}{v.sector:<16}{v.stage:<10}"
              f"{q:>5}{f:>5}{a:>5}{r.score:>8.1f}  {r.recommendation:<15}")

    print("\nTop opportunities — factor breakdown")
    print("=" * 90)
    for r in results[:3]:
        v = r.venture
        print(f"\n{v.name} ({v.sector}, {v.stage})  —  {r.score:.1f}/100  [{r.recommendation}]")
        print(f"  Why: {r.rationale()}")
        for f in sorted(r.factors, key=lambda x: x.score * x.weight, reverse=True):
            print(f"    - [{f.layer:<10}] {f.name:<28} {f.score:5.0f}/100  "
                  f"(w={f.weight:.2f})  {f.detail}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "sample_early_startups.csv")
