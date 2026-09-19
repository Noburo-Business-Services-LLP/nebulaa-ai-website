# Copy Rewrite Progress

Spec: `.claude/brand-voice-guidelines.md` — read that first, especially the "8 tell" list under "The full 'AI copy' tell list."

## Currently in progress

Starting group 2 (`/pricing` final check).

## Checklist

- [x] 1. `/product` hub + agent pages + capability pages
- [ ] 2. `/pricing` (final check only — mostly already fixed)
- [ ] 3. `/services` hub + 7 service pages
- [ ] 4. `/compare` hub + 5 comparison pages
- [ ] 5. `/for` hub + 9 industry pages
- [ ] 6. `/channels` hub + ~11 channel pages
- [ ] 7. `/work` hub + 3 engagement pages
- [ ] 8. `/tools` hub (intro/card copy only, not tool UI)
- [ ] 9. `/resources` hub + resource pages
- [ ] 10. Footer.tsx + Navbar.tsx (tagline/description text only)

## Notes per group

### 1. `/product` (done)
Files touched: `app/product/page.tsx`, `app/product/[agent]/page.tsx`, `app/product/[agent]/[capability]/page.tsx`, `lib/productData.ts`. `app/product/core/page.tsx` reviewed, already clean, not touched.
- Main finding: `lib/productData.ts` had a systemic "This is [product], not [generic thing]: ..." opener repeated across 18 of 22 capability subheadlines — the single biggest structural tell in this group. Rewrote all of them as plain declarative openers, keeping every fact/number/mechanism intact.
- Fixed several headline-level negation/reveal tells: "It plans the month, not the post", "Drafted in your voice, not a generic one", "A launch is not a single post", "Real businesses, not a scraped list", "Google Maps never gives you an email. Orbit finds one anyway."
- Fixed personification: capability page's CTA line "See what it makes of you" (explicitly flagged in the guidelines file itself) → "See what it builds from your business."
- Fixed "leads die" (tasks-activities headline) → "leads get lost" — less anthropomorphized.
- Fixed `/product` hub intro paragraph (stakes-implying "before they go somewhere else") and agent-page "{n} things, not one." negation headline.
- Fixed repeated capability-page template heading "Concretely, this." (fragment/reveal used on every one of ~20 pages) → "What's included."
- 22 capability entries + hub + agent template + capability template = effectively touched every product page via the shared data file.
