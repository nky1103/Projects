export function Footer() {
  return (
    <footer className="mt-24 border-t border-brand-100 bg-white/60">
      <div className="container-page flex flex-col items-center justify-between gap-3 py-8 text-sm text-brand-700 sm:flex-row">
        <p className="flex items-center gap-2">
          <span aria-hidden>🌱</span>
          <span>SeedSprout — where sustainable ideas find their first funding.</span>
        </p>
        <p className="text-brand-500">
          Built for founders in the climate &amp; sustainability space.
        </p>
      </div>
    </footer>
  );
}
