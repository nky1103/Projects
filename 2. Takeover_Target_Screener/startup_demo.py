"""startup_demo.py

Run the startup acquisition-target screener on a CSV cohort and print a
ranked report.

Usage:
    python startup_demo.py                    # uses sample_startups.csv
    python startup_demo.py my_cohort.csv      # your own file (same columns)

The CSV header must match the field names of ``startup_screener.Startup``.
Any column may be left blank; the screener renormalises around missing data.
"""

import csv
import sys
from dataclasses import fields

from startup_screener import Startup, StartupScreener

_TEXT = {"name", "sector", "stage", "country"}
_NUMERIC = {f.name for f in fields(Startup) if f.name not in _TEXT}


def load_cohort(path: str) -> list[Startup]:
    cohort: list[Startup] = []
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
            cohort.append(Startup(**kwargs))
    return cohort


def main(path: str) -> None:
    cohort = load_cohort(path)
    screener = StartupScreener(cohort)
    results = screener.rank()

    print(f"\nStartup Acquisition-Target Screen  —  {len(cohort)} startups\n" + "=" * 78)
    print(f"{'#':>2}  {'Startup':<16}{'Sector':<18}{'Score':>6}  {'Verdict':<14}")
    print("-" * 78)
    for i, r in enumerate(results, 1):
        print(f"{i:>2}  {r.startup.name:<16}{r.startup.sector:<18}"
              f"{r.score:>6.1f}  {r.label:<14}")

    print("\nTop candidates — factor breakdown")
    print("=" * 78)
    for r in results[:3]:
        print(f"\n{r.startup.name} ({r.startup.sector})  —  {r.score:.1f}/100  [{r.label}]")
        print(f"  Why: {r.rationale()}")
        for f in sorted(r.factors, key=lambda x: x.score * x.weight, reverse=True):
            print(f"    - {f.name:<20} {f.score:5.0f}/100  (w={f.weight:.2f})  {f.detail}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "sample_startups.csv")
