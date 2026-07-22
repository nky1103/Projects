import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db } from "./db";
import { SECTORS, STAGES } from "./constants";

export { SECTORS, STAGES } from "./constants";

// Validation schema shared by the API route and (loosely) the client form.
export const IdeaInput = z.object({
  startupName: z.string().trim().min(2).max(100),
  tagline: z.string().trim().min(5).max(140),
  sector: z.enum(SECTORS),
  description: z.string().trim().min(40).max(4000),
  impact: z.string().trim().min(20).max(2000),
  stage: z.enum(STAGES),
  fundingGoal: z.coerce.number().int().min(1000).max(100_000_000),
  location: z.string().trim().min(2).max(120),
  website: z
    .string()
    .trim()
    .url()
    .max(200)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  founderName: z.string().trim().min(2).max(100),
  founderEmail: z.string().trim().email().max(200),
});

export type IdeaInputType = z.infer<typeof IdeaInput>;

export interface Idea {
  id: string;
  startupName: string;
  tagline: string;
  sector: string;
  description: string;
  impact: string;
  stage: string;
  fundingGoal: number;
  location: string;
  website: string | null;
  founderName: string;
  founderEmail: string;
  createdAt: string;
}

interface IdeaRow {
  id: string;
  startup_name: string;
  tagline: string;
  sector: string;
  description: string;
  impact: string;
  stage: string;
  funding_goal: number;
  location: string;
  website: string | null;
  founder_name: string;
  founder_email: string;
  created_at: string;
}

function rowToIdea(row: IdeaRow): Idea {
  return {
    id: row.id,
    startupName: row.startup_name,
    tagline: row.tagline,
    sector: row.sector,
    description: row.description,
    impact: row.impact,
    stage: row.stage,
    fundingGoal: row.funding_goal,
    location: row.location,
    website: row.website,
    founderName: row.founder_name,
    founderEmail: row.founder_email,
    createdAt: row.created_at,
  };
}

export function createIdea(input: IdeaInputType): Idea {
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  db.prepare(
    `INSERT INTO ideas (
       id, startup_name, tagline, sector, description, impact, stage,
       funding_goal, location, website, founder_name, founder_email, created_at
     ) VALUES (
       @id, @startupName, @tagline, @sector, @description, @impact, @stage,
       @fundingGoal, @location, @website, @founderName, @founderEmail, @createdAt
     )`,
  ).run({
    id,
    ...input,
    website: input.website ?? null,
    createdAt,
  });
  return getIdea(id)!;
}

export function getIdea(id: string): Idea | null {
  const row = db.prepare("SELECT * FROM ideas WHERE id = ?").get(id) as
    | IdeaRow
    | undefined;
  return row ? rowToIdea(row) : null;
}

export interface ListOptions {
  sector?: string;
  stage?: string;
  q?: string;
}

export function listIdeas(opts: ListOptions = {}): Idea[] {
  const clauses: string[] = [];
  const params: Record<string, string> = {};

  if (opts.sector) {
    clauses.push("sector = @sector");
    params.sector = opts.sector;
  }
  if (opts.stage) {
    clauses.push("stage = @stage");
    params.stage = opts.stage;
  }
  if (opts.q) {
    clauses.push(
      "(startup_name LIKE @q OR tagline LIKE @q OR description LIKE @q OR location LIKE @q)",
    );
    params.q = `%${opts.q}%`;
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const rows = db
    .prepare(`SELECT * FROM ideas ${where} ORDER BY created_at DESC`)
    .all(params) as IdeaRow[];
  return rows.map(rowToIdea);
}

export interface Stats {
  total: number;
  totalFundingSought: number;
  sectors: number;
}

export function getStats(): Stats {
  const row = db
    .prepare(
      `SELECT COUNT(*) AS total,
              COALESCE(SUM(funding_goal), 0) AS funding,
              COUNT(DISTINCT sector) AS sectors
         FROM ideas`,
    )
    .get() as { total: number; funding: number; sectors: number };
  return {
    total: row.total,
    totalFundingSought: row.funding,
    sectors: row.sectors,
  };
}
