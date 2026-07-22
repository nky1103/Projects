# 🌱 SeedSprout — Sustainable Startup Registry

An open registry where **early-stage startups solving climate and
sustainability problems** register their ideas and get discovered by seed
investors and grant programs.

Founders publish their venture in a few minutes; investors browse and filter a
searchable directory and reach out directly.

![Home page](docs/home.png)

## Features

- **Landing page** with live registry stats (ideas registered, total funding
  sought, sectors represented).
- **Idea registration form** with full server-side validation (name, tagline,
  sector, description, sustainability impact, stage, funding goal, location,
  website, founder contact).
- **Searchable registry** — filter ideas by sector, stage, or keyword.
- **Idea detail pages** with the pitch, sustainability impact, funding ask, and
  a "Contact founder" action.
- **JSON REST API** (`/api/ideas`) backed by SQLite.
- Sensible **sample data** seeded automatically on first run.

## Tech stack

| Layer     | Choice                                            |
| --------- | ------------------------------------------------- |
| Framework | Next.js 15 (App Router) + React 19 + TypeScript   |
| Styling   | Tailwind CSS                                       |
| Data      | SQLite via `better-sqlite3`                        |
| Validation| Zod                                                |
| Runtime   | Node.js 22, packaged as a standalone Docker image |

## Getting started (local)

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

The SQLite database is created automatically under `./data/registry.db`
(override the directory with the `DATA_DIR` environment variable).

## API

| Method | Path              | Description                                   |
| ------ | ----------------- | --------------------------------------------- |
| `GET`  | `/api/ideas`      | List ideas. Query: `sector`, `stage`, `q`.    |
| `POST` | `/api/ideas`      | Register an idea (JSON body, validated).      |
| `GET`  | `/api/ideas/:id`  | Fetch a single idea.                          |

Example:

```bash
curl -X POST http://localhost:3000/api/ideas \
  -H 'Content-Type: application/json' \
  -d '{
    "startupName": "WindWeave",
    "tagline": "Community-owned micro wind turbines",
    "sector": "Renewable Energy",
    "description": "Small modular rooftop wind turbines that neighbourhoods co-own to generate clean local power.",
    "impact": "Each cluster offsets ~15 tonnes of CO2 a year.",
    "stage": "Prototype",
    "fundingGoal": 600000,
    "location": "Copenhagen, Denmark",
    "founderName": "Freya Larsen",
    "founderEmail": "freya@example.com"
  }'
```

## Deployment

The app produces a **standalone** build and ships with a production
`Dockerfile`, so it runs anywhere that can run a container.

### Docker

```bash
docker build -t seedsprout .
docker run -p 3000:3000 -v seedsprout-data:/app/data seedsprout
```

The named volume keeps the SQLite database across restarts.

### Render (one click)

A `render.yaml` blueprint is included with a persistent disk mounted at
`/var/data`. In the Render dashboard choose **New → Blueprint** and point it at
this repository.

### Other platforms

Any host that runs a Docker image or a Node.js standalone server works
(Fly.io, Railway, a VPS, etc.). Point `DATA_DIR` at a persistent volume so
registered ideas survive redeploys. For a purely serverless host (e.g. Vercel),
swap the SQLite store in `src/lib/db.ts` for a hosted database — the data-access
layer in `src/lib/ideas.ts` is isolated for exactly this reason.

## Project structure

```
src/
  app/
    page.tsx              # Landing page
    register/             # Registration form (client) + page
    ideas/                # Registry list + [id] detail page
    api/ideas/            # REST API routes
  components/             # Nav, Footer, IdeaCard
  lib/
    db.ts                 # SQLite connection + schema
    ideas.ts              # Data access + Zod validation
    constants.ts          # Sectors & stages (client-safe)
    seed.ts               # Sample data
    format.ts             # Currency/date helpers
```
