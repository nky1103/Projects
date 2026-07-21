# StartupSutra — Forward Templates

Start every **new** episode from these files. The owl mascot mark and the
`@statupsutra` handle are already baked in, so future posts stay on-brand
without re-deriving anything.

- `carousel.template.html` — 7-slide carousel (red / Startup Failure structure).
- `reel.template.html` — silent trailer reel (25s, kinetic text).

## How to use
1. Copy the template into the new episode's `source/`.
2. Swap the copy (hook, slides, CTA) per the STYLE-GUIDE structure.
3. Swap the **series color tokens** — `#ef4444`/`#b91c1c` → the target series
   accent (amber `#f59e0b`, blue `#3b82f6`, green `#22c55e`). The owl tile and
   the "Sutra" wordmark stay amber on every series.
4. Render via Playwright (fonts live in the scratchpad render dir).

## Brand invariants
- Brand **name** = "StartupSutra" (with the "r"). Used in headers/logos.
- **Handle** = `@statupsutra` (no "r") — the real IG login. Used in footers,
  follow cards, and captions so tags/links resolve.
- Mascot = the owl (see `../brand-assets/`). Never recolor the owl per series.

> The two live episodes (Instagram, BlackBerry) were published under the earlier
> "S" mark / `@StartupSutra` handle and are intentionally left as-posted. This
> template is for episode #003 onward.
