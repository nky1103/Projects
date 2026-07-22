import Link from "next/link";
import { listIdeas, SECTORS, STAGES } from "@/lib/ideas";
import { seedIfEmpty } from "@/lib/seed";
import { IdeaCard } from "@/components/IdeaCard";

export const dynamic = "force-dynamic";

interface SearchParams {
  sector?: string;
  stage?: string;
  q?: string;
}

export default async function IdeasPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  seedIfEmpty();
  const params = await searchParams;
  const ideas = listIdeas({
    sector: params.sector || undefined,
    stage: params.stage || undefined,
    q: params.q || undefined,
  });

  const activeFilter = Boolean(params.sector || params.stage || params.q);

  return (
    <div className="container-page py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-900">The network</h1>
        <p className="mt-2 text-brand-700">
          Browse startups across the Ventroot network, seeking capital and
          services. Filter by sector, stage, or search by keyword.
        </p>
      </div>

      {/* Filters */}
      <form
        method="get"
        className="mb-8 grid gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="sm:col-span-2 lg:col-span-2">
          <label htmlFor="q" className="field-label">
            Search
          </label>
          <input
            id="q"
            name="q"
            defaultValue={params.q ?? ""}
            placeholder="Name, keyword, location…"
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="sector" className="field-label">
            Sector
          </label>
          <select
            id="sector"
            name="sector"
            defaultValue={params.sector ?? ""}
            className="field-input"
          >
            <option value="">All sectors</option>
            {SECTORS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="stage" className="field-label">
            Stage
          </label>
          <select
            id="stage"
            name="stage"
            defaultValue={params.stage ?? ""}
            className="field-input"
          >
            <option value="">All stages</option>
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end gap-3 sm:col-span-2 lg:col-span-4">
          <button type="submit" className="btn-primary">
            Apply filters
          </button>
          {activeFilter && (
            <Link href="/ideas" className="btn-secondary">
              Clear
            </Link>
          )}
        </div>
      </form>

      <p className="mb-6 text-sm text-brand-600">
        {ideas.length} {ideas.length === 1 ? "idea" : "ideas"} found
      </p>

      {ideas.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-brand-200 bg-white p-12 text-center">
          <p className="text-brand-700">No ideas match your filters yet.</p>
          <Link href="/register" className="btn-primary mt-5">
            Be the first to register
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      )}
    </div>
  );
}
