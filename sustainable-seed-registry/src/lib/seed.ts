import { createIdea, listIdeas, type IdeaInputType } from "./ideas";

// Seed a handful of realistic startups so the registry is not empty on
// first launch. Sustainability & Climate is the flagship vertical, so it
// leads the list, but the network is sector-agnostic by design — a couple
// of samples from other sectors show that in practice. Runs only when the
// table has no rows.
const SAMPLES: IdeaInputType[] = [
  {
    startupName: "SolarLeaf",
    tagline: "Peel-and-stick perovskite solar film for any window",
    sector: "Sustainability & Climate",
    description:
      "SolarLeaf produces a transparent, ultra-thin perovskite film that turns ordinary windows into solar panels. Our film is printed at room temperature, cutting manufacturing energy by 80% versus silicon, and can be retrofitted onto existing glass in minutes without specialist installers.",
    impact:
      "A single mid-rise office fitted with SolarLeaf can offset an estimated 42 tonnes of CO2 per year while cutting the building's grid demand by up to a third.",
    traction:
      "Two pilot installs live in Austin office buildings; LOI in place with a regional property manager covering 40 buildings.",
    stage: "Prototype",
    fundingGoal: 750000,
    location: "Austin, USA",
    website: "https://example.com/solarleaf",
    founderName: "Maya Okafor",
    founderEmail: "maya@example.com",
  },
  {
    startupName: "LoopCrate",
    tagline: "Reusable shipping packaging as a service",
    sector: "Sustainability & Climate",
    description:
      "LoopCrate replaces single-use cardboard with durable, trackable crates that circulate between merchants and customers. Our reverse-logistics network and QR tracking make returns frictionless, and each crate replaces roughly 60 cardboard boxes over its life.",
    impact:
      "Every 10,000 crates in circulation diverts around 600,000 cardboard boxes from landfill annually and saves an estimated 900 tonnes of CO2.",
    traction:
      "18 enterprise merchants live, ~40,000 crates in circulation, $1.1M ARR growing 12% month over month.",
    stage: "Early Revenue",
    fundingGoal: 1200000,
    location: "Rotterdam, Netherlands",
    website: "https://example.com/loopcrate",
    founderName: "Tomas Vidal",
    founderEmail: "tomas@example.com",
  },
  {
    startupName: "AquaSense",
    tagline: "Low-cost IoT sensors for community water safety",
    sector: "Sustainability & Climate",
    description:
      "AquaSense builds solar-powered water-quality sensors that stream contamination alerts to a phone. At one-tenth the cost of lab testing, rural utilities and NGOs can monitor wells and rivers in real time and act before an outbreak.",
    impact:
      "Pilot deployments across 40 villages gave 68,000 people early warning of unsafe water, cutting reported waterborne illness by a third.",
    traction:
      "Contracted with 3 regional water utilities; $2.4M in signed multi-year deployment agreements.",
    stage: "Growth / Scaling",
    fundingGoal: 10000000,
    location: "Nairobi, Kenya",
    website: "https://example.com/aquasense",
    founderName: "Amara Njoroge",
    founderEmail: "amara@example.com",
  },
  {
    startupName: "MycoBoard",
    tagline: "Carbon-negative building panels grown from mushrooms",
    sector: "Sustainability & Climate",
    description:
      "MycoBoard grows structural insulation panels from mycelium and agricultural waste. The panels are fire-resistant, compostable at end of life, and lock away carbon captured by the feedstock — a drop-in replacement for foam and particleboard.",
    impact:
      "Each cubic metre of MycoBoard stores about 120 kg of carbon and avoids the petrochemical emissions of the foam it replaces.",
    stage: "Idea / Concept",
    fundingGoal: 500000,
    location: "Lisbon, Portugal",
    founderName: "Ines Carvalho",
    founderEmail: "ines@example.com",
  },
  {
    startupName: "RootRoute",
    tagline: "AI crop planning for regenerative smallholder farms",
    sector: "Sustainability & Climate",
    description:
      "RootRoute gives smallholder farmers a simple app that recommends regenerative rotations, cover crops and planting windows tuned to local soil and weather. Better soil health means higher yields with less fertiliser and water.",
    impact:
      "Farmers using RootRoute for a full season raised yields 18% on average while cutting synthetic fertiliser use by a quarter.",
    traction: "12,000 monthly active farmers across 3 states; $340K ARR from a co-op licensing model.",
    stage: "Early Revenue",
    fundingGoal: 900000,
    location: "Pune, India",
    website: "https://example.com/rootroute",
    founderName: "Rahul Deshmukh",
    founderEmail: "rahul@example.com",
  },
  {
    startupName: "Ledgerly",
    tagline: "Embedded lending infrastructure for vertical SaaS platforms",
    sector: "Fintech",
    description:
      "Ledgerly lets vertical SaaS companies offer working-capital loans to their own merchants without becoming a lender themselves. We handle underwriting, capital, and compliance behind a simple API, so platforms can launch a lending product in weeks.",
    impact:
      "Partner platforms report a 22% increase in customer retention once lending is live, and merchants access capital at roughly half the cost of typical merchant cash advances.",
    traction: "$680K ARR across 6 platform partners; underwritten $14M in loans cumulatively with sub-2% default rate.",
    stage: "Growth / Scaling",
    fundingGoal: 12000000,
    location: "New York, USA",
    website: "https://example.com/ledgerly",
    founderName: "Priya Subramaniam",
    founderEmail: "priya@example.com",
  },
  {
    startupName: "Carewell Diagnostics",
    tagline: "Point-of-care blood diagnostics for rural clinics",
    sector: "Healthtech",
    description:
      "Carewell builds a handheld diagnostic device that runs a full metabolic panel from a finger-prick sample in under ten minutes, designed for clinics without lab infrastructure. Results sync to a clinician dashboard for remote review.",
    impact:
      "Pilot clinics cut diagnosis-to-treatment time from 9 days to same-day for common conditions, reducing preventable complications.",
    traction: "Deployed in 27 clinics across two states; regulatory clearance filed and expected within two quarters.",
    stage: "Early Revenue",
    fundingGoal: 3000000,
    location: "Bengaluru, India",
    founderName: "Arjun Mehta",
    founderEmail: "arjun@example.com",
  },
];

export function seedIfEmpty(): void {
  if (listIdeas().length > 0) return;
  for (const sample of SAMPLES) createIdea(sample);
}
