// Shared, dependency-free constants safe to import from client components.
export const SECTORS = [
  "Renewable Energy",
  "Clean Transportation",
  "Circular Economy & Waste",
  "Sustainable Agriculture & Food",
  "Water & Sanitation",
  "Green Building & Materials",
  "Carbon Capture & Climate Tech",
  "Biodiversity & Conservation",
] as const;

export const STAGES = [
  "Idea / Concept",
  "Prototype",
  "Early Revenue",
  "Scaling",
] as const;

export type Sector = (typeof SECTORS)[number];
export type Stage = (typeof STAGES)[number];
