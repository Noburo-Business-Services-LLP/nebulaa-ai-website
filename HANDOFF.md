# Session Handoff — 2026-09-18 → 2026-09-19

Written because the current session is approaching its usage limit. Read this before doing anything — it's the fastest way to get full context on a very long session's worth of work.

## ⚠️ Most important thing: production is behind `dev`

Everything below is **committed and pushed to `origin/dev`**, but the last `sst deploy --stage production` only covered up through commit `1a093b5`. Commits `1b19749` through `9500acd` (the full sitewide copy rewrite — `/product`, `/services`, `/compare`, `/for`, `/channels`, `/work`, `/tools`, `/resources`, `Footer.tsx`) are **pushed but not live** on www.nebulaa.ai yet.

**To deploy:** `.env.local` has a multi-line `GSC_PRIVATE_KEY` that breaks a plain `source .env.local`. Use this pattern (used all session):

```bash
cd "/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website"
python3 -c "
import re, subprocess, os
env = os.environ.copy()
with open('.env.local') as f:
    content = f.read()
for match in re.finditer(r'^([A-Za-z_][A-Za-z0-9_]*)=(.*)\$', content, re.MULTILINE):
    key, val = match.group(1), match.group(2)
    val = val.strip()
    if val.startswith('\"') and val.endswith('\"'):
        val = val[1:-1]
    env[key] = val
subprocess.run(['npx', 'sst', 'deploy', '--stage', 'production'], env=env, check=True)
"
```

Run `npx tsc --noEmit` and `rm -rf .next && npm run build` first to confirm clean, same as every deploy this session. **Get explicit user confirmation before deploying** — the user has required a spoken "deploy" before every production push this entire session; don't assume it's wanted just because it's pending.

## What this session did, roughly chronological

### 1. SEO dashboard (built from scratch per a handoff brief)
- On-page audit crawler (`lib/seoAudit.ts`), actionable fix items (`lib/seoActions.ts`), broken-link/structured-data checks, target-keyword tracking (`lib/targetKeywords.ts`, S3-backed with local fallback), audit history over time (`lib/auditHistory.ts`, DynamoDB via `METRICS_TABLE`)
- Google Search Console integration (`lib/googleSearchConsole.ts`) — indexing status + query performance, service-account auth
- Google Analytics 4 integration (`lib/googleAnalytics.ts`) — sessions/users/conversions by channel and landing page. **`GA4_PROPERTY_ID=554691348`** is in `.env.local`, service account `nebulaa-seo-dashboard@nebulaa-seo-dashboard.iam.gserviceaccount.com` has Viewer access on the GA4 property
- Dashboard UI at `/admin/seo`, admin-gated via `lib/adminAuth.ts`

### 2. Root-caused and fixed real SEO bugs
- Canonical URL bug: 7 files hardcoded `https://nebulaa.ai` instead of `https://www.nebulaa.ai`
- `/blog` was invisible to non-JS crawlers (`useSearchParams()` forcing client-only render) — fixed by reading `?tag=` from `window.location.search` instead
- 13 blog posts shared one meta description (missing `generateMetadata`) — fixed
- Markdown heading levels were misassigned in blog rendering — fixed

### 3. Sitewide keyword placement — 133/133 pages now have a target keyword
Assigned via the 5-step method in the (now superseded, see below) implementation guide. Stored in S3 via `/api/admin/target-keywords`; local fallback file `data/seo/target-keywords.json` is gitignored so it won't show as a diff.

### 4. Google Search Console sitemap — was never submitted
Root cause of "Google only knows 10 pages": no sitemap had ever been submitted in GSC. User submitted `sitemap.xml` directly in the GSC UI; live URL Inspection test confirmed the sitemap is fetchable and pages are indexable. This should self-resolve over the following days/weeks as Google crawls — not something further code work fixes.

### 5. Pricing correction (real business data, not code but noted since it touched many files)
Corrected from the earlier wrong figures (₹10k/₹12k/₹15k per agent, ₹28k bundle, 15% annual discount) to the actual pricing: **₹15,000/month per agent (Gravity/Orbit/Pulsar), ₹30,000/month for all three, 10% off if billed annually** (flat 10% off the 12-month total, i.e. `monthly × 12 × 0.9`). Canonical source: `lib/orgFacts.ts`. Also redesigned the cost-comparison section on `/pricing` as side-by-side cards with the bundle price as the fair comparison point (was comparing a full 3-agent DIY stack against a single agent's price — inflated the "X× cheaper" claim).

### 6. Visual/brand fixes
- Price font `Orbitron` → `Rajdhani` (Orbitron's digit shapes read as "broken"; user chose Rajdhani from 3 options shown)
- Official brand logo swapped in for the custom-drawn SVG wordmark (`components/ui/Wordmark.tsx`) — yellow variant for dark mode (site is dark-only right now via forced `dark` class in `app/layout.tsx`), black variant wired in via `dark:` for whenever light mode exists
- `ADMIN_SECRET` rotated off the placeholder `nebulaa-local-test-2026`; admin login (`lib/adminClient.tsx`) now has an email field paired with the password so password managers will actually offer to save it (there's still only one shared secret — email isn't checked against anything)

### 7. Blog admin fixes
- Publishing a post now calls `revalidatePath` — previously an edit saved correctly to S3 but the live page kept serving a stale render for up to 5 minutes with no way to force it
- Pasting a flattened AI-chat answer (no line breaks — happens when you drag-select instead of using the chat's own Copy button) into the blog editor now auto-detects and reflows paragraph/heading/list breaks
- Blog listing cards (`/blog`) now show a post's hero image if it has one — they never did, only the post's own page did

### 8. Homepage/agent-panel redesign
- `GravitySection.tsx`, `OrbitSection.tsx`, `PulsarSection.tsx` rebuilt as live-running animated sequences (tick-driven state machine, same pattern as the hero's `CoreConsole.tsx`) instead of static screenshots, using the shared `HudCard` component instead of ad-hoc styling
- Gravity and Pulsar got multi-screen capability tours (Gravity: calendar / content studio / unified inbox; Pulsar: conversation / voice call / parallel outreach) since one static screen undersold what each agent actually does
- `NarrativeDemo.tsx` (the "one run, start to finish" sector walkthrough) rebuilt with the same `HudCard` treatment — was still on old flat `#101018` panels and a broken-looking empty calendar grid

### 9. Sitewide copy rewrite — the brand-voice pass
**Read `.claude/brand-voice-guidelines.md` in full before touching any more copy anywhere on this site.** It documents 8 specific "AI-generated copy" tells (em-dash reveals, negation-openers, fragment cadence, repeated verb-lists, personification, mirrored wordplay, slang filler, clever parallel-contrast) with a test for judging a rewrite ("would this sound like a voiceover if read aloud?"). This file is gitignored (`.claude/`) so it lives only on this machine — if a new developer is working from a fresh clone, this file won't be there; recreate it from this handoff's context or ask the user.

The homepage and now `/product`, `/services`, `/compare` (reviewed, already clean), `/for`, `/channels`, `/work`, `/tools` (hub copy only), `/resources` (reviewed, already clean), and `Footer.tsx` have all been audited against this spec. **See `COPY_REWRITE_PROGRESS.md` at the repo root for the detailed per-group breakdown** — it's the working checklist, keep it updated if more pages get done later.

**Not yet audited against the brand-voice spec:** blog posts (deliberately skipped — separate content type, some posts' real-vs-illustrative status is an open question, see guidelines file), any admin/internal pages (not marketing copy), legal pages (different register on purpose).

## Open items nobody has acted on yet

1. **Deploy the pending copy-rewrite commits** (see top of this doc)
2. Blog posts haven't been audited against the brand-voice spec — the guidelines file flags several "GTM Experiment" posts as having an unresolved real-vs-illustrative status from the original brief; don't touch their numbers without asking
3. The stray `"SEO Dashboard Brief.docx"` in the repo root is a harmless duplicate the @-mention system drops in — not tracked, can be ignored or deleted
4. No light mode exists yet despite the logo/token infrastructure being ready for one — not asked for, just noting the `dark:` wiring is inert until someone builds a theme toggle

## Where things are configured

- `.env.local` (gitignored): `ADMIN_SECRET`, `GSC_CLIENT_EMAIL`/`GSC_PRIVATE_KEY`/`GSC_PROPERTY`, `GA4_PROPERTY_ID`, `NEXT_PUBLIC_GTM_ID`/`GA4_ID`/`META_PIXEL_ID`
- `sst.config.ts`: passes all the above through to the Lambda's env at deploy time — a blank `.env.local` value means that integration reports itself "not configured" rather than throwing, by design, across every integration in this repo
- Production admin panel: `/admin/seo` (SEO dashboard), `/admin/blog` (CMS), `/admin` (overview) — all gated by `ADMIN_SECRET`
