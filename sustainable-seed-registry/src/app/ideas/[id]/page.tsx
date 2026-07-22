import Link from "next/link";
import { notFound } from "next/navigation";
import { getIdea } from "@/lib/ideas";
import { formatCurrency, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function IdeaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idea = getIdea(id);
  if (!idea) notFound();

  return (
    <div className="container-page py-12">
      <Link
        href="/ideas"
        className="text-sm font-semibold text-brand-600 hover:text-brand-800"
      >
        ← Back to registry
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        {/* Main */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="chip">{idea.sector}</span>
            <span className="chip bg-brand-50 text-brand-600">{idea.stage}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-brand-950">
            {idea.startupName}
          </h1>
          <p className="mt-2 text-lg text-brand-700">{idea.tagline}</p>

          <section className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-wide text-brand-500">
              About the venture
            </h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-brand-800">
              {idea.description}
            </p>
          </section>

          <section className="mt-8 rounded-2xl border border-brand-100 bg-white p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-brand-500">
              Impact &amp; edge
            </h2>
            <p className="mt-3 leading-relaxed text-brand-800">{idea.impact}</p>
          </section>

          {idea.traction && (
            <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-amber-700">
                Traction
              </h2>
              <p className="mt-3 leading-relaxed text-amber-900">{idea.traction}</p>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
              <div className="text-sm text-brand-500">Funding sought</div>
              <div className="mt-1 text-3xl font-extrabold text-brand-700">
                {formatCurrency(idea.fundingGoal)}
              </div>
              <dl className="mt-6 space-y-4 text-sm">
                <Row label="Stage" value={idea.stage} />
                <Row label="Sector" value={idea.sector} />
                <Row label="Location" value={idea.location} />
                <Row label="Registered" value={formatDate(idea.createdAt)} />
              </dl>
            </div>

            <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
              <div className="text-sm font-bold uppercase tracking-wide text-brand-500">
                Founder
              </div>
              <div className="mt-3 font-semibold text-brand-900">
                {idea.founderName}
              </div>
              <a
                href={`mailto:${idea.founderEmail}?subject=Interested in ${encodeURIComponent(
                  idea.startupName,
                )}`}
                className="btn-primary mt-4 w-full"
              >
                Contact founder
              </a>
              {idea.website && (
                <a
                  href={idea.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary mt-3 w-full"
                >
                  Visit website
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-brand-500">{label}</dt>
      <dd className="text-right font-medium text-brand-900">{value}</dd>
    </div>
  );
}
