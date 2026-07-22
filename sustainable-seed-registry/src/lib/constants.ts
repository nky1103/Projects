// Shared, dependency-free constants safe to import from client components.
// Sustainability & Climate remains the flagship vertical Ventroot launched
// with; the network is sector-agnostic by design.
export const SECTORS = [
  "Sustainability & Climate",
  "Fintech",
  "Healthtech",
  "Enterprise SaaS",
  "Consumer",
  "Deep Tech",
  "Agritech",
  "Mobility",
  "Other",
] as const;

export const STAGES = [
  "Idea / Concept",
  "Prototype",
  "Early Revenue",
  "Growth / Scaling",
] as const;

export const FLAGSHIP_SECTOR: Sector = "Sustainability & Climate";

export type Sector = (typeof SECTORS)[number];
export type Stage = (typeof STAGES)[number];
