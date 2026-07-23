"""Unit tests for the startup investment screener."""

import unittest

from investment_screener import Venture, InvestmentScreener, _reco


class TestVentureMetrics(unittest.TestCase):
    def setUp(self):
        self.v = Venture(
            name="Test", last_valuation=1000, prev_valuation=600,
            months_since_last_round=14, arr=200, arr_prev=100, gross_margin=0.75,
            net_revenue_retention=1.25, monthly_net_burn=10, cash_on_hand=100,
            tam=30000, market_growth=0.2, founder_ownership_pct=0.35,
        )

    def test_growth_and_runway(self):
        self.assertAlmostEqual(self.v.yoy_growth(), 1.0)
        self.assertEqual(self.v.runway_months(), 10)

    def test_multiples(self):
        self.assertAlmostEqual(self.v.revenue_multiple(), 5.0)
        self.assertAlmostEqual(self.v.burn_multiple(), 1.2)   # 120 burned / 100 net new
        self.assertAlmostEqual(self.v.rule_of_40(), 175.0)    # 100% + 75%

    def test_needs_funding_true_on_short_runway(self):
        self.assertTrue(self.v.needs_funding())

    def test_profitable_not_raising(self):
        prof = Venture(name="P", monthly_net_burn=0, cash_on_hand=50,
                       months_since_last_round=8)
        self.assertFalse(prof.needs_funding())
        self.assertEqual(prof.raise_signal(), "Profitable / not raising")

    def test_stale_round_needs_funding(self):
        stale = Venture(name="S", months_since_last_round=20)
        self.assertTrue(stale.needs_funding())
        self.assertIn("raising", stale.raise_signal().lower())

    def test_missing_all_funding_data_is_unknown(self):
        blank = Venture(name="B")
        self.assertIsNone(blank.needs_funding())
        self.assertEqual(blank.raise_signal(), "Unknown")


class TestScreener(unittest.TestCase):
    def _cohort(self):
        # A great, growing, capital-efficient bet that is raising.
        winner = Venture(
            name="Winner", last_valuation=2000, prev_valuation=1000,
            months_since_last_round=14, arr=300, arr_prev=120, gross_margin=0.80,
            net_revenue_retention=1.35, monthly_net_burn=12, cash_on_hand=120,
            tam=50000, market_growth=0.30, founder_ownership_pct=0.35,
        )
        # Needs funding most (short runway) but declining and weak — a poor bet.
        distressed = Venture(
            name="Distressed", last_valuation=1000, prev_valuation=6000,
            months_since_last_round=26, arr=400, arr_prev=460, gross_margin=0.30,
            net_revenue_retention=0.85, monthly_net_burn=50, cash_on_hand=100,
            tam=8000, market_growth=0.05, founder_ownership_pct=0.15,
        )
        return [winner, distressed]

    def test_quality_beats_mere_need(self):
        screener = InvestmentScreener(self._cohort())
        results = screener.rank()
        self.assertEqual(results[0].venture.name, "Winner")
        self.assertEqual(results[-1].venture.name, "Distressed")

    def test_both_flagged_as_needing_funding(self):
        # Both need funding, but ranking still separates good from bad.
        screener = InvestmentScreener(self._cohort())
        raising = screener.rank(only_raising=True)
        self.assertEqual({r.venture.name for r in raising}, {"Winner", "Distressed"})

    def test_only_raising_excludes_well_funded(self):
        well_funded = Venture(name="Flush", monthly_net_burn=5, cash_on_hand=600,
                              months_since_last_round=3, arr=100, arr_prev=60)
        cohort = self._cohort() + [well_funded]
        screener = InvestmentScreener(cohort)
        raising = screener.rank(only_raising=True)
        self.assertNotIn("Flush", {r.venture.name for r in raising})

    def test_weights_renormalise(self):
        partial = Venture(name="Partial", arr=100, arr_prev=50)  # growth + traction only
        screener = InvestmentScreener([partial])
        result = screener.score(partial)
        self.assertAlmostEqual(sum(f.weight for f in result.factors), 1.0, places=6)

    def test_reco_bands(self):
        self.assertEqual(_reco(75), "High conviction")
        self.assertEqual(_reco(60), "Consider")
        self.assertEqual(_reco(45), "Watch")
        self.assertEqual(_reco(30), "Pass")

    def test_empty_cohort_raises(self):
        with self.assertRaises(ValueError):
            InvestmentScreener([])


if __name__ == "__main__":
    unittest.main()
