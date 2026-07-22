import Link from "next/link";
import { listIdeas, getStats, SECTORS } from "@/lib/ideas";
import { seedIfEmpty } from "@/lib/seed";
import { IdeaCard } from "@/components/IdeaCard";
import { formatCurrency } from "@/lib/format";

export const dynamic = "force-dynamic";

export default function HomePage() {
  seedIfEmpty();
  const stats = getStats();
  const featured = listIdeas().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-100 via-brand-50 to-brand-50" />
        <div className="container-page py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="chip mb-5">🌍 Climate &amp; sustainability founders</span>
            <h1 className="text-4xl font-extrabold tracking-tight text-brand-950 sm:text-5xl">
              Register your sustainable startup.
              <br />
              <span className="text-brand-600">Get seen by seed investors.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-700">
              SeedSprout is an open registry for early-stage startups solving
              climate and sustainability problems. Publish your idea in minutes
              and put it in front of the people who fund the future.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/register" className="btn-primary">
                Register your idea →
              </Link>
              <Link href="/ideas" className="btn-secondary">
                Browse the registry
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            <Stat label="Ideas registered" value={String(stats.total)} />
            <Stat
              label="Total funding sought"
              value={formatCurrency(stats.totalFundingSought)}
            />
            <Stat label="Sectors represented" value={String(stats.sectors)} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-16">
        <h2 className="text-center text-2xl font-bold text-brand-900">
          How it works
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Step
            n={1}
            title="Describe your idea"
            body="Tell us what you're building, the sustainability problem it solves, and how much seed funding you're seeking."
          />
          <Step
            n={2}
            title="Get listed"
            body="Your startup appears in the public registry, searchable by sector, stage and impact."
          />
          <Step
            n={3}
            title="Connect with funders"
            body="Seed investors and grant programs browse the registry to discover and reach out to promising founders."
          />
        </div>
      </section>

      {/* Featured ideas */}
      {featured.length > 0 && (
        <section className="container-page py-6">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-brand-900">
              Recently registered
            </h2>
            <Link
              href="/ideas"
              className="text-sm font-semibold text-brand-600 hover:text-brand-800"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        </section>
      )}

      {/* Sectors */}
      <section className="container-page py-16">
        <h2 className="text-center text-2xl font-bold text-brand-900">
          Sectors we champion
        </h2>
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
          {SECTORS.map((s) => (
            <span key={s} className="chip px-4 py-2 text-sm">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-8">
        <div className="rounded-3xl bg-brand-800 px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-bold">Have an idea worth funding?</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            It takes about three minutes to register. No fees, no gatekeeping —
            just a clear shot at seed capital for your sustainability venture.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-800 shadow-sm transition hover:bg-brand-50"
          >
            Register your idea →
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-brand-100 bg-white/80 p-6 text-center shadow-sm">
      <div className="text-3xl font-extrabold text-brand-700">{value}</div>
      <div className="mt-1 text-sm text-brand-600">{label}</div>
    </div>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-bold text-white">
        {n}
      </div>
      <h3 className="mt-4 text-lg font-bold text-brand-900">{title}</h3>
      <p className="mt-2 text-sm text-brand-600">{body}</p>
    </div>
  );
}
