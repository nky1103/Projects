import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

// Resolve a writable location for the SQLite file. In most hosting
// environments the working directory is writable; DATA_DIR lets a deploy
// point this at a mounted volume for durable storage.
const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(process.cwd(), "data");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, "registry.db");

// Reuse a single connection across hot-reloads in development.
const globalForDb = globalThis as unknown as { _db?: Database.Database };

function createDb(): Database.Database {
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS ideas (
      id            TEXT PRIMARY KEY,
      startup_name  TEXT NOT NULL,
      tagline       TEXT NOT NULL,
      sector        TEXT NOT NULL,
      description   TEXT NOT NULL,
      impact        TEXT NOT NULL,
      stage         TEXT NOT NULL,
      funding_goal  INTEGER NOT NULL,
      location      TEXT NOT NULL,
      website       TEXT,
      founder_name  TEXT NOT NULL,
      founder_email TEXT NOT NULL,
      created_at    TEXT NOT NULL
    );
  `);
  return db;
}

export const db = globalForDb._db ?? createDb();
if (process.env.NODE_ENV !== "production") globalForDb._db = db;
