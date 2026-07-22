import { createIdea, listIdeas, type IdeaInputType } from "./ideas";

// Seed a handful of realistic sustainable startups so the registry is not
// empty on first launch. Runs only when the table has no rows.
const SAMPLES: IdeaInputType[] = [
  {
    startupName: "SolarLeaf",
    tagline: "Peel-and-stick perovskite solar film for any window",
    sector: "Renewable Energy",
    description:
      "SolarLeaf produces a transparent, ultra-thin perovskite film that turns ordinary windows into solar panels. Our film is printed at room temperature, cutting manufacturing energy by 80% versus silicon, and can be retrofitted onto existing glass in minutes without specialist installers.",
    impact:
      "A single mid-rise office fitted with SolarLeaf can offset an estimated 42 tonnes of CO2 per year while cutting the building's grid demand by up to a third.",
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
    sector: "Circular Economy & Waste",
    description:
      "LoopCrate replaces single-use cardboard with durable, trackable crates that circulate between merchants and customers. Our reverse-logistics network and QR tracking make returns frictionless, and each crate replaces roughly 60 cardboard boxes over its life.",
    impact:
      "Every 10,000 crates in circulation diverts around 600,000 cardboard boxes from landfill annually and saves an estimated 900 tonnes of CO2.",
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
    sector: "Water & Sanitation",
    description:
      "AquaSense builds solar-powered water-quality sensors that stream contamination alerts to a phone. At one-tenth the cost of lab testing, rural utilities and NGOs can monitor wells and rivers in real time and act before an outbreak.",
    impact:
      "Pilot deployments across 40 villages gave 68,000 people early warning of unsafe water, cutting reported waterborne illness by a third.",
    stage: "Scaling",
    fundingGoal: 2000000,
    location: "Nairobi, Kenya",
    website: "https://example.com/aquasense",
    founderName: "Amara Njoroge",
    founderEmail: "amara@example.com",
  },
  {
    startupName: "MycoBoard",
    tagline: "Carbon-negative building panels grown from mushrooms",
    sector: "Green Building & Materials",
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
    sector: "Sustainable Agriculture & Food",
    description:
      "RootRoute gives smallholder farmers a simple app that recommends regenerative rotations, cover crops and planting windows tuned to local soil and weather. Better soil health means higher yields with less fertiliser and water.",
    impact:
      "Farmers using RootRoute for a full season raised yields 18% on average while cutting synthetic fertiliser use by a quarter.",
    stage: "Early Revenue",
    fundingGoal: 900000,
    location: "Pune, India",
    website: "https://example.com/rootroute",
    founderName: "Rahul Deshmukh",
    founderEmail: "rahul@example.com",
  },
];

export function seedIfEmpty(): void {
  if (listIdeas().length > 0) return;
  for (const sample of SAMPLES) createIdea(sample);
}
