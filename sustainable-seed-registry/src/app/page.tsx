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
            <span className="chip mb-5">🌳 Founder launchpad &amp; capital network</span>
            <h1 className="text-4xl font-extrabold tracking-tight text-brand-950 sm:text-5xl">
              Where founders
              <br />
              <span className="text-brand-600">put down roots.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-700">
              Ventroot connects ambitious founders — across sectors — with growth
              capital and a bench of vetted operators in finance, law, marketing
              and leadership. Anchored by an investor writing $10M+ growth
              cheques, backed by a wider partner network for every stage.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/register" className="btn-primary">
                Register your startup →
              </Link>
              <Link href="/ideas" className="btn-secondary">
                Browse the network
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Startups registered" value={String(stats.total)} />
            <Stat
              label="Capital sought"
              value={formatCurrency(stats.totalFundingSought)}
            />
            <Stat label="Sectors on the network" value={String(stats.sectors)} />
            <Stat label="Anchor cheque size" value="$10M+" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-16">
        <h2 className="text-center text-2xl font-bold text-brand-900">
          How the network works
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Step
            n={1}
            title="Register & get vetted"
            body="Submit your venture from any sector. We screen for founder quality and real traction — not just an idea — before anything moves forward."
          />
          <Step
            n={2}
            title="Get raise-ready"
            body="Our services bouquet — finance, legal, marketing, a fractional COO — preps your financials, cap table and story so you can credibly absorb a large cheque."
          />
          <Step
            n={3}
            title="Matched to capital"
            body="Routed to the right relationship: our anchor investor for growth-ready or traction-backed deals ≥$10M, or a partner investor for earlier stage."
          />
        </div>
      </section>

      {/* Featured startups */}
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
          Every sector but one
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-brand-600">
          Sustainability &amp; Climate is where Ventroot started, and remains
          our flagship vertical. The network is open to every sector except
          hospitality on the anchor investor's track.
        </p>
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
          {SECTORS.map((s) => (
            <span key={s} className="chip px-4 py-2 text-sm">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Services teaser */}
      <section className="container-page py-6">
        <div className="rounded-3xl border border-brand-100 bg-white p-8 sm:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <span className="chip mb-4">Services bouquet</span>
              <h2 className="text-2xl font-bold text-brand-900">
                Raise-ready, not just registered.
              </h2>
              <p className="mt-3 text-brand-700">
                A monthly-retainer bench of vetted operators — CA-led finance,
                legal, marketing, and a fractional COO — to get your startup
                into shape for serious capital.
              </p>
              <Link
                href="/services"
                className="btn-secondary mt-6 inline-flex"
              >
                Explore services →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <MiniService label="Finance & Compliance" />
              <MiniService label="Legal" />
              <MiniService label="Marketing & Growth" />
              <MiniService label="Fractional COO" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-8 pt-10">
        <div className="rounded-3xl bg-brand-800 px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-bold">Ready to put down roots?</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            Registering is always free. We earn a 5% commission only when you
            raise — no equity taken, no fees upfront.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-800 shadow-sm transition hover:bg-brand-50"
          >
            Register your startup →
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-brand-100 bg-white/80 p-5 text-center shadow-sm">
      <div className="text-2xl font-extrabold text-brand-700 sm:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-xs text-brand-600 sm:text-sm">{label}</div>
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

function MiniService({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-5 text-center text-sm font-semibold text-brand-800">
      {label}
    </div>
  );
}
