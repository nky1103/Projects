"""Unit tests for the startup acquisition-target screener."""

import unittest

from startup_screener import Startup, StartupScreener, _plateau


class TestDerivedMetrics(unittest.TestCase):
    def setUp(self):
        self.s = Startup(
            name="Test", last_valuation=1000, prev_valuation=2000,
            months_since_last_round=12, arr=200, arr_prev=100, gross_margin=0.7,
            net_revenue_retention=1.2, monthly_net_burn=10, cash_on_hand=120,
            founder_ownership_pct=0.3,
        )

    def test_runway(self):
        self.assertEqual(self.s.runway_months(), 12)

    def test_profitable_runway_is_large(self):
        cash_positive = Startup(name="P", monthly_net_burn=0, cash_on_hand=50)
        self.assertGreaterEqual(cash_positive.runway_months(), 999)

    def test_growth_and_valuation_change(self):
        self.assertAlmostEqual(self.s.yoy_growth(), 1.0)          # 100%
        self.assertAlmostEqual(self.s.valuation_change(), -0.5)   # down round

    def test_revenue_multiple_and_rule_of_40(self):
        self.assertAlmostEqual(self.s.revenue_multiple(), 5.0)    # 1000 / 200
        self.assertAlmostEqual(self.s.rule_of_40(), 100 + 70)     # 100% growth + 70% margin

    def test_burn_multiple(self):
        # 10/mo * 12 = 120 burned; net new ARR = 100 -> 1.2x
        self.assertAlmostEqual(self.s.burn_multiple(), 1.2)

    def test_missing_returns_none(self):
        empty = Startup(name="Empty")
        self.assertIsNone(empty.runway_months())
        self.assertIsNone(empty.yoy_growth())
        self.assertIsNone(empty.revenue_multiple())

    def test_declining_arr_no_burn_multiple(self):
        shrink = Startup(name="S", arr=80, arr_prev=100, monthly_net_burn=5)
        self.assertIsNone(shrink.burn_multiple())  # net new ARR <= 0


class TestPlateau(unittest.TestCase):
    def test_sweet_spot(self):
        # zero_lo=10, full_lo=100, full_hi=1000, zero_hi=8000
        self.assertEqual(_plateau(5, 10, 100, 1000, 8000), 0)      # too small
        self.assertEqual(_plateau(300, 10, 100, 1000, 8000), 100)  # in the band
        self.assertEqual(_plateau(8000, 10, 100, 1000, 8000), 0)   # too big
        self.assertTrue(0 < _plateau(55, 10, 100, 1000, 8000) < 100)  # ramping up


class TestScreener(unittest.TestCase):
    def _cohort(self):
        distressed = Startup(
            name="Distressed", last_valuation=500, prev_valuation=2000,
            months_since_last_round=22, arr=300, arr_prev=250, gross_margin=0.4,
            net_revenue_retention=1.0, monthly_net_burn=40, cash_on_hand=120,
            founder_ownership_pct=0.12,
        )
        healthy = Startup(
            name="Healthy", last_valuation=6000, prev_valuation=3000,
            months_since_last_round=6, arr=400, arr_prev=280, gross_margin=0.75,
            net_revenue_retention=1.25, monthly_net_burn=15, cash_on_hand=700,
            founder_ownership_pct=0.45,
        )
        return [distressed, healthy]

    def test_distressed_ranks_above_healthy(self):
        screener = StartupScreener(self._cohort())
        results = screener.rank()
        self.assertEqual(results[0].startup.name, "Distressed")
        self.assertEqual(results[-1].startup.name, "Healthy")
        for r in results:
            self.assertGreaterEqual(r.score, 0.0)
            self.assertLessEqual(r.score, 100.0)

    def test_weights_renormalise_over_available_factors(self):
        partial = Startup(name="Partial", arr=100, arr_prev=50)  # only growth + traction
        screener = StartupScreener([partial])
        result = screener.score(partial)
        self.assertAlmostEqual(sum(f.weight for f in result.factors), 1.0, places=6)
        self.assertGreater(result.score, 0.0)

    def test_empty_cohort_raises(self):
        with self.assertRaises(ValueError):
            StartupScreener([])

    def test_flat_round_label(self):
        flat = Startup(name="Flat", last_valuation=1000, prev_valuation=1000,
                       monthly_net_burn=10, cash_on_hand=50)
        screener = StartupScreener([flat])
        sp = next(f for f in screener.score(flat).factors if f.name == "Sale pressure")
        self.assertIn("flat round", sp.detail)


if __name__ == "__main__":
    unittest.main()
