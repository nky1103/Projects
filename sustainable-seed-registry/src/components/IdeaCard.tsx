import Link from "next/link";
import type { Idea } from "@/lib/ideas";
import { formatCurrency } from "@/lib/format";

export function IdeaCard({ idea }: { idea: Idea }) {
  return (
    <Link
      href={`/ideas/${idea.id}`}
      className="group flex h-full flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="chip">{idea.sector}</span>
        <span className="chip bg-brand-50 text-brand-600">{idea.stage}</span>
      </div>
      <h3 className="text-lg font-bold text-brand-900 group-hover:text-brand-700">
        {idea.startupName}
      </h3>
      <p className="mt-1 text-sm text-brand-700">{idea.tagline}</p>
      <p className="mt-4 line-clamp-3 flex-1 text-sm text-brand-600">
        {idea.description}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-brand-50 pt-4 text-sm">
        <span className="text-brand-500">{idea.location}</span>
        <span className="font-semibold text-brand-700">
          {formatCurrency(idea.fundingGoal)} sought
        </span>
      </div>
    </Link>
  );
}
