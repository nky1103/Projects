"""Unit tests for the takeover screener."""

import unittest

from takeover_screener import (
    Company,
    TakeoverScreener,
    _linear_score,
    _percentile_low_better,
    _median,
)


class TestDerivedMetrics(unittest.TestCase):
    def setUp(self):
        self.c = Company(
            name="Test", share_price=10, shares_outstanding=100,
            price_52w_high=20, revenue=1000, ebitda=200, ebit=150,
            net_income=100, interest_expense=10, free_cash_flow=120,
            total_debt=300, cash=100, shareholders_equity=500,
            insider_ownership_pct=0.10,
        )

    def test_market_cap_derivation(self):
        self.assertEqual(self.c.get_market_cap(), 1000)

    def test_enterprise_value(self):
        # mktcap 1000 + net debt (300-100=200) = 1200
        self.assertEqual(self.c.enterprise_value(), 1200)

    def test_ratios(self):
        self.assertAlmostEqual(self.c.ev_ebitda(), 1200 / 200)
        self.assertAlmostEqual(self.c.pe_ratio(), 1000 / 100)
        self.assertAlmostEqual(self.c.pb_ratio(), 1000 / 500)
        self.assertAlmostEqual(self.c.net_debt_to_ebitda(), 200 / 200)
        self.assertAlmostEqual(self.c.interest_coverage(), 150 / 10)
        self.assertAlmostEqual(self.c.fcf_yield(), 120 / 1000)
        self.assertAlmostEqual(self.c.upside_from_high(), 0.5)

    def test_missing_inputs_return_none(self):
        empty = Company(name="Empty")
        self.assertIsNone(empty.get_market_cap())
        self.assertIsNone(empty.ev_ebitda())
        self.assertIsNone(empty.fcf_yield())

    def test_negative_earnings_skip_pe(self):
        loss = Company(name="Loss", market_cap=100, net_income=-10)
        self.assertIsNone(loss.pe_ratio())


class TestScoringHelpers(unittest.TestCase):
    def test_linear_score_bounds_and_direction(self):
        self.assertEqual(_linear_score(0, best=0, worst=4), 100)
        self.assertEqual(_linear_score(4, best=0, worst=4), 0)
        self.assertEqual(_linear_score(2, best=0, worst=4), 50)
        # clamps beyond range
        self.assertEqual(_linear_score(-5, best=0, worst=4), 100)
        self.assertEqual(_linear_score(10, best=0, worst=4), 0)

    def test_percentile_low_better(self):
        universe = [1, 2, 3, 4, 5]
        self.assertEqual(_percentile_low_better(1, universe), 100)  # cheapest
        self.assertEqual(_percentile_low_better(5, universe), 0)    # priciest
        self.assertEqual(_percentile_low_better(3, universe), 50)

    def test_median(self):
        self.assertEqual(_median([3, 1, 2]), 2)
        self.assertEqual(_median([1, 2, 3, 4]), 2.5)


class TestScreener(unittest.TestCase):
    def _universe(self):
        cheap_cashy = Company(
            name="Prime", ticker="PRM", share_price=10, shares_outstanding=100,
            price_52w_high=25, revenue=1000, ebitda=250, ebit=200, net_income=150,
            interest_expense=5, free_cash_flow=180, total_debt=100, cash=300,
            shareholders_equity=1200, insider_ownership_pct=0.04,
        )
        expensive_levered = Company(
            name="Fortress", ticker="FTR", share_price=90, shares_outstanding=100,
            price_52w_high=92, revenue=1000, ebitda=180, ebit=120, net_income=60,
            interest_expense=80, free_cash_flow=20, total_debt=3000, cash=50,
            shareholders_equity=400, insider_ownership_pct=0.55,
        )
        middling = Company(
            name="Middle", ticker="MID", share_price=40, shares_outstanding=100,
            price_52w_high=50, revenue=1000, ebitda=210, ebit=160, net_income=110,
            interest_expense=25, free_cash_flow=110, total_debt=900, cash=120,
            shareholders_equity=900, insider_ownership_pct=0.15,
        )
        return [cheap_cashy, expensive_levered, middling]

    def test_ranking_orders_prime_above_fortress(self):
        screener = TakeoverScreener(self._universe())
        results = screener.rank()
        names = [r.company.name for r in results]
        self.assertEqual(names[0], "Prime")
        self.assertEqual(names[-1], "Fortress")
        # scores are within range and descending
        for r in results:
            self.assertGreaterEqual(r.score, 0.0)
            self.assertLessEqual(r.score, 100.0)
        self.assertGreaterEqual(results[0].score, results[1].score)
        self.assertGreaterEqual(results[1].score, results[2].score)

    def test_weights_renormalise_over_available_factors(self):
        # Company with only valuation-relevant data: weights should sum to 1.
        partial = Company(name="Partial", market_cap=500, ebitda=100, revenue=800)
        screener = TakeoverScreener([partial])
        result = screener.score(partial)
        total_w = sum(f.weight for f in result.factors)
        self.assertAlmostEqual(total_w, 1.0, places=6)
        self.assertGreater(result.score, 0.0)

    def test_empty_universe_raises(self):
        with self.assertRaises(ValueError):
            TakeoverScreener([])

    def test_label_buckets(self):
        screener = TakeoverScreener(self._universe())
        for r in screener.rank():
            self.assertIn(r.label, {"Prime target", "Attractive", "Possible", "Unlikely"})


if __name__ == "__main__":
    unittest.main()
