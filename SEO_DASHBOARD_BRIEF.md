# SEO Dashboard — build brief

Handoff for continuing this project in a different session/account. Read this
whole file before writing code — several decisions below were made after
back-and-forth with the user and shouldn't be re-litigated from scratch.

## Context: what already exists

This repo (`nebulaa-ai-website`) is a Next.js 14 App Router site on AWS
(SST/OpenNext), deployed at `www.nebulaa.ai`. This session just finished
building a real CMS:

- **Media uploads** (`/admin/media`) — S3-backed, presigned browser upload,
  replaces a file-drop-and-redeploy workflow. See `lib/mediaStore.ts`.
- **Blog editor** (`/admin/blog`) — full edit of any post including the
  site's original repo `.mdx` posts (S3 overrides the repo version for a
  given slug — see the big comment in `lib/blogStore.ts`). See
  `app/admin/blog/page.tsx`.
- **Tags, not categories** — every post has `tags: string[]`
  (`lib/blogData.ts`), freeform, multiple per post, auto-suggested by Claude
  via `POST /api/admin/suggest-tags`. **Do not reintroduce a fixed
  category enum** — an earlier version of this session did (Pillar/Cluster/
  Case Study/Comparison) without verifying it against the actual content,
  the user correctly called that out, and it was reverted. If a similar
  content-architecture idea comes up again, propose it and get it confirmed
  against real posts before touching the data model.
- **Admin auth**: one shared password (`ADMIN_SECRET` env var), no per-user
  accounts. `lib/adminClient.tsx` has `useAdminAuth()`, `AuthGate`,
  `adminFetch()` — reuse these for any new admin page rather than rebuilding
  login. **No real password has ever been set in the actual AWS deployment**
  — confirm with the user whether one exists before assuming `/admin` is
  usable on the live site.

Read `lib/adminClient.tsx`, `lib/blogStore.ts`, and `lib/mediaStore.ts`
before building anything — the patterns there (S3-via-env-var with a local
filesystem fallback in dev, presigned uploads, admin auth) are what a new
admin page should follow, not something new.

## What "SEO dashboard" means here

The user wants a dashboard, reachable from `/admin`, answering:
- How many pages does the site have, and how many are indexed by Google?
- Do pages have proper titles/meta descriptions?
- Do images have alt text — how much coverage?
- Which keyword phrases are we targeting, and which pages actually contain
  them?
- Backlinks — how many, from where?
- Content performance by tag/topic — views, where traffic comes from.

This also needs to catch **E-E-A-T** as a quality checklist per page
(Experience, Expertise, Authoritativeness, Trust) — NOT as a tag or category.
It's a rubric to audit every post against: real author info, real
data/specifics vs generic claims, credible sourcing, transparency (dates,
author bio). Build this as an audit score per post, not a field on the post.

## Data sources — what's already confirmed available

| Source | Status | Notes |
|---|---|---|
| **Google Search Console** | ✅ Verified for `nebulaa.ai` | User has access, confirmed via screenshot showing Overview (2 of 10 discovered pages indexed as of last check — this is a real, current problem to surface prominently). **Still needed: a Google Cloud service account with access to this GSC property**, to call the API programmatically. Ask the user to create one and share credentials, or walk them through it (Search Console → Settings → Users and permissions → add the service account email as a user). |
| **GA4** | ✅ Property exists | Measurement ID `G-8T75LQCCRF` (see `.env.local` / `NEXT_PUBLIC_GA4_ID`), wired into the site already via GTM (`GTM-TQ66SBBJ`). For the dashboard you need the GA4 **Data API**, which needs a separate Google Cloud service account with Viewer access on the GA4 property (different from the GSC one, or the same account can be granted both). |
| **DataForSEO (backlinks)** | ✅ Approved by user | Budget approved for a paid API for backlink data (referring domains, domain authority). User has not yet created an account — ask for API credentials when you reach this phase. Don't default to Moz/Ahrefs without asking; DataForSEO was the specific one discussed as cheapest. |
| **On-page audit (page count, meta/alt-text coverage, keyword-in-page checks)** | Not started | No external dependency needed — build a crawler against the site's own sitemap.xml (`app/sitemap.ts` generates it dynamically from all the `lib/*Data.ts` files) or crawl the built Next.js output directly. |
| **Anthropic API** (for tag auto-suggestion, and could extend to E-E-A-T scoring) | ⚠️ No key configured locally | `.env.local` has `ANTHROPIC_API_KEY=` blank. The suggest-tags route (`app/api/admin/suggest-tags/route.ts`) was built but never actually tested end-to-end for this reason. Get a key before relying on any AI-based audit feature. |

## Known real problem to surface first

GSC currently shows **8 of 10 discovered pages not indexed**, against a
sitemap that lists 151 URLs. This is the single most important number to
show at the top of the dashboard once GSC is wired up — it's a genuine,
already-confirmed problem, not a hypothetical the dashboard needs to go
looking for.

Also: `nebulaa.ai` redirects to `www.nebulaa.ai` (see `sst.config.ts`'s
`redirects` config) — verify the sitemap and canonical URLs consistently use
the `www` form. This was flagged as a possible mismatch earlier in the
project but not yet confirmed fixed or broken — check it as part of the
on-page audit.

## Suggested build order

1. **On-page audit crawler** — no external dependency, immediately useful.
   Walk the sitemap, fetch each page (or read the source data directly from
   `lib/*Data.ts` + rendered `<Image>` usage for alt text), report: page
   count, title/meta-description presence and length, image alt-text
   coverage, canonical URL consistency (www vs non-www), heading structure.
2. **GSC wiring** — once the user provides service account credentials,
   pull indexed/not-indexed counts, per-page clicks/impressions/position,
   top queries. This is what turns the "8 of 10 not indexed" number into a
   live, trackable metric instead of a one-time screenshot finding.
3. **GA4 wiring** — traffic sources, sessions and conversions per page/tag,
   using the same service-account pattern as GSC.
4. **E-E-A-T audit** — per-post checklist (author bio present? real
   data/specifics vs generic claims? sources cited? dates current?),
   probably AI-assisted via the Anthropic API once a key exists, surfaced as
   a score alongside each post in the dashboard.
5. **Tag/topic performance** — cross-reference GA4 page views with each
   post's `tags[]` to show which topics are actually working, using the tag
   filter mechanism already built into `/blog?tag=X`.
6. **Backlinks (DataForSEO)** — last, since it's the one paid piece and the
   user explicitly said build the free stuff first.

## Storage note

The existing CMS data (leads, blog overrides, media) lives in a private S3
`Data` bucket via `lib/s3Store.ts`, read/written as flat JSON per key. SEO
metrics are **time-series** (clicks per page per day) — flat JSON files are
the wrong shape for that once there's real history to query. Since the app
is already on AWS via SST, add a DynamoDB table for metrics rather than
bolting time-series data onto the JSON-blob pattern. Keep S3 for what it's
already good at (content, media, one-shot lookups).

## Things not to redo

- Don't reintroduce a fixed content category enum (see above).
- Don't build a second admin login — reuse `lib/adminClient.tsx`.
- Don't touch `app/admin/page.tsx`'s legacy visual style (old `brand-gold`/
  `brand-black` tokens) — it was deliberately left alone earlier in this
  project as "internal dashboard, not brand surface." Match its existing
  style for consistency if extending it, but there's no open work item to
  restyle it.
- Don't assume the live AWS deployment reflects local commits — as of this
  handoff, everything is pushed to `origin/dev` on GitHub, but no one has
  confirmed `sst deploy` has been run recently. Verify what's actually live
  before assuming a feature works in production just because it's merged.
