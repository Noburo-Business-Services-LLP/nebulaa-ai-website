# Copy Rewrite Progress

Spec: `.claude/brand-voice-guidelines.md` — read that first, especially the "8 tell" list under "The full 'AI copy' tell list."

## Currently in progress

Nothing — all 10 groups done, build verified clean, pushed to origin/dev.

## Checklist

- [x] 1. `/product` hub + agent pages + capability pages
- [x] 2. `/pricing` (final check only — mostly already fixed)
- [x] 3. `/services` hub + 7 service pages
- [x] 4. `/compare` hub + 5 comparison pages
- [x] 5. `/for` hub + 9 industry pages
- [x] 6. `/channels` hub + ~11 channel pages
- [x] 7. `/work` hub + 3 engagement pages
- [x] 8. `/tools` hub (intro/card copy only, not tool UI)
- [x] 9. `/resources` hub + resource pages
- [x] 10. Footer.tsx + Navbar.tsx (tagline/description text only)

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

### 6. `/channels` (done)
Files touched: `lib/channelData.ts` (all 13 channel entries), `app/channels/[channel]/page.tsx`. `app/channels/page.tsx` reviewed, already clean, not touched.
- Same systemic "This is [channel] ...:" opener repeated across nearly all 13 subheadlines. Rewrote all of them plain, keeping every fact.
- Fixed a negation-contrast headline: "Being listed is not the same as being found" → "A listing that exists still has to be found."
- Fixed two near-duplicate headlines one click apart from other already-touched groups: the voice-calling channel page had the identical headline to the /product/pulsar/voice-calling capability page ("For the moments a call still beats a message") — reworded to "The channel we reach for last, on purpose." The Meta & Google Ads channel page nearly duplicated the /services/performance-marketing headline ("Paid pointed at where you actually sell") — reworded to "Paid media, geo-targeted to a real catchment."
- Fixed the repeated "On this channel, specifically." template heading (fragment/reveal, same family as "Concretely, this.") → "What runs on this channel."

### 7. `/work` (done)
Files touched: `lib/engagementData.ts` (all 3 entries), `app/work/[engagement]/page.tsx`. `app/work/page.tsx` reviewed, already clean, not touched.
- Same "This is [engagement] for X:" opener on 2 of 3 subheadlines. Rewrote both plain.
- Fixed one negation-contrast template heading: "Described honestly, not as a stat." → "What the engagement is actually for."

### 8. `/tools` (done — hub copy only, per scope)
Files touched: `app/tools/page.tsx`. `lib/toolsData.ts` per-tool taglines reviewed — already plain functional descriptions ("Write high-engagement LinkedIn posts in 30 seconds" etc.), no tells found, not touched. Individual tool pages/UI intentionally out of scope, not opened.
- Fixed a self-aware/winking hero paragraph joking about "what Pulsar does for a living" and "use them forever and never speak to us" — rewrote plain, keeping the real claims (no signup, no card, no follow-up).
- Fixed personification in the bridge-to-product section: "A tool forgets you the moment you close the tab. The product remembers your voice..." → plain description of session memory. Also fixed the adjacent "These make one thing. Gravity makes all of it, every morning." parallel-contrast headline.

### 9. `/resources` (done, no changes needed)
Reviewed `app/resources/page.tsx`, `app/resources/[resource]/page.tsx`, `lib/resourceData.ts` (all 6 entries) and `components/ui/DownloadGate.tsx` in full. Already clean, plain, mechanism-first copy — no tells found. No edits made.

### 10. Footer + Navbar (done)
Files touched: `components/layout/Footer.tsx`. `components/layout/Navbar.tsx` reviewed — the dropdown item descriptions are short functional nav labels, not marketing prose, no tells found, not touched (note: the actual file locations are `components/layout/`, not `components/sections/` as the brief said).
- Fixed one fragment-for-rhythm tell in the footer newsletter signup: "Real GTM experiments, every Monday." (near-identical to the guidelines' own cited example "GTM tips. Weekly. No fluff.") → "We send one real GTM experiment every Monday."

## Final verification
- `npx tsc --noEmit`: clean after every group and on final state.
- `rm -rf .next && npm run build`: clean. Caught and fixed 2 react/no-unescaped-entities lint errors from the "What's included." headings introduced during the pass.
- Pushed to `origin/dev`.

## Pass 2: repeated-device sweep

Triggered by a specific defect found on `/services` (commit `002a870`, not covered by the per-line
Pass 1 process): a page can pass the 8-tell test on every individual heading and still read as
templated if the same heading *shape* (e.g. "plain clause, then a comma or line break, then a
gold-highlighted payoff clause") repeats across 3+ headings on one page. This pass swept the
remaining page groups for that specific defect, plus any of the original 8 tells missed the first
time.

- [x] 1. `/product` — hub, `/product/core`, `/product/[agent]`, `/product/[agent]/[capability]`
- [x] 2. `/pricing`
- [x] 3. `/compare` — hub + `/compare/[competitor]` + `lib/compareData.ts`
- [x] 4. `/for` — hub + `/for/[industry]` + `lib/industryData.ts`
- [x] 5. `/channels` — hub + `/channels/[channel]` + `lib/channelData.ts`
- [x] 6. `/work` — hub + `/work/[engagement]` + `lib/engagementData.ts`
- [x] 7. `/tools` hub copy
- [x] 8. `/resources` hub copy
- [x] 9. `Footer.tsx`, `Navbar.tsx`
- [x] 10. Homepage sections (`components/sections/*`)

### Notes per group

**1. `/product` (real fixes).** `app/product/core/page.tsx` had 5 of its 6 H2/H1 headings using the
identical plain-clause + gold-trailing-clause shape ("Every action leaves a signal.", "Signals,
connected across actions and outcomes.", "The system uses what it learns to inform what happens
next.", plus the H1 and close). Rewrote 3 of them (one dropped the gold span entirely, one moved
gold to the lead word) so no more than 2 share a shape. The `[agent]/[capability]/page.tsx` template
— shared across ~26 rendered pages — had 4 of its 5 headings ("Three steps, start to finish.",
"What's included.", "The ones people actually ask.", plus both close-CTA variants) in the same
trailing-gold shape; varied "Three steps" (gold moved to lead), "What's included" (gold dropped),
and both close-CTA variants (gold moved to lead, onto the product name/URL instruction). Hub page
and `[agent]/page.tsx` template were already varied — not touched.

**2. `/pricing` (clean, no changes).** Only two headings on the page (H1, one H2), not sharing a
shape. No repeat.

**3. `/compare` (clean, no changes).** Hub and detail template use a literal table/verdict layout
with plain, ungilded headings throughout — no gold-clause device present at all, so nothing to vary.

**4. `/for` (real fix).** The industry detail template had 3 headings using the trailing-gold-clause
shape (hero, "The kind of post Gravity writes for this sector.", close). Rewrote the sample-creative
heading to lead with gold on the noun ("Gravity's output, shaped for this sector.") instead of
trailing it, leaving only 2 sharing the hero/close shape.

**5. `/channels` (real fix).** The channel detail template had all 3 of its headings (hero, "What
runs on this channel.", "About this channel, honestly.") in the trailing-gold shape. Moved gold to
the lead word in the "What runs" heading and rewrote the FAQ heading as a plain declarative with no
gold span.

**6. `/work` (real fix).** The engagement detail template had 4 of 5 headings in the trailing-gold
shape (hero, "The scope, written down.", "What the engagement is actually for.", "Before you ask on
the call."). Moved gold to the lead word in the scope heading and dropped the gold span entirely
from the "what changes" heading.

**7. `/tools` (clean, no changes).** Only 2 headings on the hub page, not sharing a shape.

**8. `/resources` (clean, no changes).** Only 1 gold heading (H1) on the hub page.

**9. Footer + Navbar (clean, no changes).** No marketing headlines in either file — footer column
labels and nav dropdown descriptions are short functional labels, not prose subject to the
rhetorical-device tell.

**10. Homepage sections (real fix).** Read all 12 sections in actual render order (Hero,
ThreeThings, SharedMemory, EntryFork, NarrativeDemo, GravitySection, OrbitSection, PulsarSection,
MadeByGravity, FAQ, Newsletter, FinalCTA — not the order listed in the brief, which was alphabetical
by file rather than page order). Found 4 headings (ThreeThings, MadeByGravity, Newsletter, FAQ) all
using the plain-clause + gold-trailing-clause shape on one page. Rewrote ThreeThings ("Three things
happen without you opening the app.") and MadeByGravity ("Every post below went out on a real
client's account.") as plain declaratives with no gold span, leaving Newsletter and FAQ as the only
two sharing that shape. Left the 3 product-intro headings (GravitySection/OrbitSection/PulsarSection,
each "**{ProductName}** does X.") alone — gold there marks the product name per guideline rule 8,
and the repetition is structural (3 parallel sections each introducing a different named product),
not a rhetorical trick. Left Hero and FinalCTA's two-sentence gold-second-line shape alone — this is
the guideline's own cited legitimate exception (both clauses carry real information, not a
setup/punchline).

### Final verification (Pass 2)
- `npx tsc --noEmit`: clean after every group and on final state.
- `rm -rf .next && npm run build`: clean, no new lint errors.
- Commits pushed to `origin/dev`.
