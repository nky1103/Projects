import Link from "next/link";

export const metadata = {
  title: "Services — Ventroot",
  description:
    "A monthly-retainer bench of vetted operators — finance, legal, marketing, and a fractional COO — to get your startup raise-ready.",
};

interface Service {
  name: string;
  eyebrow: string;
  description: string;
  includes: string[];
}

const SERVICES: Service[] = [
  {
    name: "Finance & Compliance",
    eyebrow: "CA-led",
    description:
      "A chartered accountant-led team handles the books so your fundraise story is backed by numbers that hold up to diligence.",
    includes: [
      "Bookkeeping, accounting & tax filings",
      "Cap table management",
      "Monthly MIS & investor-ready reporting",
      "Fundraise financial readiness review",
    ],
  },
  {
    name: "Legal",
    eyebrow: "Startup counsel",
    description:
      "Practical legal support for the decisions that actually come up between incorporation and a term sheet.",
    includes: [
      "Incorporation & founder agreements",
      "Contracts, NDAs & vendor agreements",
      "IP protection basics",
      "Term sheet & round documentation review",
    ],
  },
  {
    name: "Marketing & Growth",
    eyebrow: "In-house team",
    description:
      "Brand and growth support from a team that's built go-to-market motions before, not a one-off freelancer.",
    includes: [
      "Brand & positioning",
      "Go-to-market strategy",
      "Performance marketing & content",
      "Launch & PR support",
    ],
  },
  {
    name: "Fractional COO",
    eyebrow: "Experienced operator",
    description:
      "A seasoned operator embedded part-time to run operations, hiring, and execution while founders focus on product and fundraising.",
    includes: [
      "Ops & process setup",
      "Hiring plan & early key hires",
      "Execution cadence & OKRs",
      "Board & investor reporting support",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-2xl text-center">
        <span className="chip mb-4">Services bouquet</span>
        <h1 className="text-3xl font-bold text-brand-900 sm:text-4xl">
          Raise-ready, not just registered.
        </h1>
        <p className="mt-4 text-brand-700">
          Getting matched to capital is only half the job. Our monthly-retainer
          bench of vetted operators gets your finances, legal, story and
          operations into shape — so when you're introduced to an investor,
          you're ready for the diligence that follows.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {SERVICES.map((service) => (
          <div
            key={service.name}
            className="flex flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm"
          >
            <span className="label mb-2 text-xs font-semibold uppercase tracking-wide text-brand-500">
              {service.eyebrow}
            </span>
            <h2 className="text-xl font-bold text-brand-900">{service.name}</h2>
            <p className="mt-2 text-sm text-brand-600">{service.description}</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-brand-700">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="mt-0.5 text-brand-500">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-brand-50 pt-4">
              <span className="text-sm font-semibold text-brand-700">
                Monthly retainer
              </span>
              <span className="ml-2 text-xs text-brand-500">
                — pricing scoped to your stage and needs
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-2xl rounded-3xl bg-brand-800 px-8 py-12 text-center text-white">
        <h2 className="text-2xl font-bold">Already registered?</h2>
        <p className="mx-auto mt-2 max-w-md text-brand-100">
          Reach out and we'll scope a services package around where you are
          today — raise prep, ongoing ops, or both.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="mailto:hello@ventroot.com?subject=Services%20inquiry"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-800 shadow-sm transition hover:bg-brand-50"
          >
            Get in touch →
          </a>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Register your startup
          </Link>
        </div>
      </div>
    </div>
  );
}
