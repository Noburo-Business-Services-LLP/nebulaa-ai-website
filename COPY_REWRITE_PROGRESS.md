# Copy Rewrite Progress

Spec: `.claude/brand-voice-guidelines.md` — read that first, especially the "8 tell" list under "The full 'AI copy' tell list."

## Currently in progress

Starting group 6 (`/channels` hub + ~11 channel pages).

## Checklist

- [x] 1. `/product` hub + agent pages + capability pages
- [x] 2. `/pricing` (final check only — mostly already fixed)
- [x] 3. `/services` hub + 7 service pages
- [x] 4. `/compare` hub + 5 comparison pages
- [x] 5. `/for` hub + 9 industry pages
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

### 2. `/pricing` (done)
Files touched: `app/pricing/page.tsx`. `components/sections/Pricing.tsx` and `components/sections/FAQ.tsx` are homepage components already fixed in an earlier pass — not re-touched, per instructions.
- One personification tell found and fixed: "cancel the month it stops earning its keep" (this exact phrase is cited as an example in the guidelines file itself) → "cancel any month you decide it is not worth the cost."
- Rest of the page was already clean plain-declarative copy.

### 3. `/services` (done)
Files touched: `app/services/page.tsx`, `app/services/[service]/page.tsx`, `lib/servicePageData.ts` (all 7 service entries).
- Found the exact verbatim example from the guidelines file still live in shipped copy: "Tell us what you sell. We'll tell you what we'd do." (mirrored wordplay tell #6) — present on the hub's close section AND on the per-service template close section (so all 7 service detail pages). Rewrote both to "Describe your business on a call. We'll send back a written scope."
- `lib/servicePageData.ts` had the same "This is [service] for [X]:" opener template repeated across all 7 subheadlines. Rewrote all 7 as plain declaratives, keeping every fact.
- Fixed the repeated "Concretely, this." template heading on the service detail page (same fragment/reveal tell as the product capability template) → "What's included."
- Did not touch the bracketed-placeholder "kind of shift this typically drives" section per guidelines instruction (did not find one on this page — may be elsewhere or already removed).

### 4. `/compare` (done, no changes needed)
Reviewed `app/compare/page.tsx`, `app/compare/[competitor]/page.tsx`, `lib/compareData.ts` (all 5 competitor entries) in full against the 8-pattern list. Already clean plain-declarative copy — no negation-openers, no personification, no mirrored wordplay, no repeated formulaic template opener. No edits made.

### 5. `/for` (done)
Files touched: `app/for/page.tsx`, `lib/industryData.ts` (all 9 industry entries). `app/for/[industry]/page.tsx` reviewed, already clean, not touched.
- Same systemic tell as groups 1 and 3: every one of the 9 industry subheadlines opened with "This is AI marketing for [X] where/that...". Rewrote all 9 as plain declaratives, keeping every fact and client reference intact.
- Fixed the hub intro paragraph's "This is AI marketing by industry:" opener.
- Fixed one headline-level negation echo: "Regional reach, run as one system, not six vendors" (near-duplicate of the homepage's own flagged "not five vendors pretending to talk to each other" example) → "Regional reach, run as one connected system."
- Left the repeated "Sound familiar?" section label as-is — it's a structural template header (like "How it works"), not one of the 8 named tells, and isn't a marketing punchline in itself.
