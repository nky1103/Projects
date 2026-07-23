"""Unit tests for the early-stage (Seed - Series B) investment screener."""

import unittest

from early_stage_screener import (
    EarlyVenture, EarlyStageScreener, _from_1to5, _from_sentiment,
)


class TestHelpers(unittest.TestCase):
    def test_from_1to5(self):
        self.assertEqual(_from_1to5(1), 0)
        self.assertEqual(_from_1to5(3), 50)
        self.assertEqual(_from_1to5(5), 100)

    def test_from_sentiment(self):
        self.assertEqual(_from_sentiment(-1), 0)
        self.assertEqual(_from_sentiment(0), 50)
        self.assertEqual(_from_sentiment(1), 100)


class TestDerived(unittest.TestCase):
    def test_metrics(self):
        v = EarlyVenture(name="T", arr=20, arr_prev=10, monthly_net_burn=2,
                         cash_on_hand=24, last_valuation=200)
        self.assertEqual(v.runway_months(), 12)
        self.assertAlmostEqual(v.yoy_growth(), 1.0)
        self.assertAlmostEqual(v.burn_multiple(), 2.4)     # 24 burned / 10 net new
        self.assertAlmostEqual(v.revenue_multiple(), 10.0)  # 200 / 20

    def test_profitable_runway(self):
        v = EarlyVenture(name="P", monthly_net_burn=0, cash_on_hand=10)
        self.assertGreaterEqual(v.runway_months(), 999)


class TestScreener(unittest.TestCase):
    def test_pre_revenue_scored_on_qualitative(self):
        # No ARR at all — should still score on team/market/momentum.
        pre = EarlyVenture(name="PreRev", team_score=5, market_score=5,
                           product_moat_score=4, hiring_growth=0.5,
                           monthly_net_burn=0.5, cash_on_hand=9,
                           last_valuation=40, months_since_last_round=6)
        screener = EarlyStageScreener([pre])
        r = screener.score(pre)
        self.assertGreater(r.score, 60)                       # strong qualitative
        self.assertAlmostEqual(sum(f.weight for f in r.factors), 1.0, places=6)
        # valuation factor is dropped (no ARR -> no revenue multiple)
        self.assertNotIn("Valuation / entry", {f.name for f in r.factors})

    def test_layers_reported(self):
        v = EarlyVenture(name="V", team_score=4, arr=10, arr_prev=5,
                         monthly_net_burn=1, cash_on_hand=12, hiring_growth=0.3,
                         last_valuation=100)
        screener = EarlyStageScreener([v])
        ls = screener.score(v).layer_scores()
        self.assertEqual(set(ls), {"Qualitative", "Financial", "Alt-data"})

    def test_strong_beats_weak(self):
        strong = EarlyVenture(name="Strong", team_score=5, market_score=5,
                              product_moat_score=5, arr=20, arr_prev=6,
                              gross_margin=0.8, monthly_net_burn=1, cash_on_hand=24,
                              hiring_growth=0.6, web_traffic_growth=1.0,
                              news_sentiment=0.5, last_valuation=200)
        weak = EarlyVenture(name="Weak", team_score=2, market_score=2,
                            product_moat_score=2, arr=10, arr_prev=12,
                            gross_margin=0.3, monthly_net_burn=5, cash_on_hand=10,
                            hiring_growth=-0.2, web_traffic_growth=-0.3,
                            news_sentiment=-0.4, last_valuation=300)
        screener = EarlyStageScreener([strong, weak])
        results = screener.rank()
        self.assertEqual(results[0].venture.name, "Strong")
        self.assertEqual(results[-1].venture.name, "Weak")

    def test_qualitative_weight_dominates(self):
        # Two identical-except-team ventures: team should move the score a lot.
        base = dict(market_score=4, product_moat_score=4, arr=10, arr_prev=5,
                    monthly_net_burn=1, cash_on_hand=12, last_valuation=100)
        good = EarlyVenture(name="GoodTeam", team_score=5, **base)
        bad = EarlyVenture(name="BadTeam", team_score=1, **base)
        screener = EarlyStageScreener([good, bad])
        gs = screener.score(good).score
        bs = screener.score(bad).score
        self.assertGreater(gs - bs, 15)   # team (22% weight) swings the result

    def test_empty_cohort_raises(self):
        with self.assertRaises(ValueError):
            EarlyStageScreener([])


if __name__ == "__main__":
    unittest.main()
