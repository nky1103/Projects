import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-brand-100 bg-brand-50/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-brand-800">
          <span aria-hidden className="text-xl">🌱</span>
          <span className="text-lg">SeedSprout</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-3">
          <Link
            href="/ideas"
            className="rounded-full px-3 py-2 text-sm font-medium text-brand-800 transition hover:bg-brand-100"
          >
            Browse ideas
          </Link>
          <Link href="/register" className="btn-primary px-4 py-2">
            Register your idea
          </Link>
        </nav>
      </div>
    </header>
  );
}
