# Nebulaa Marketing Site Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Nebulaa.ai marketing pages (homepage, services, tools hub, nav, footer) to match the approved design canvas, keeping all 31 free tools and the blog working untouched.

**Architecture:** Next.js 14 App Router with Tailwind. The marketing surface is composed of section components in `components/sections/`, assembled by `app/page.tsx`. We replace/rewrite those section components one at a time, each independently renderable, then recompose the homepage. Tool pages (`app/tools/[slug]`), blog (`app/blog`), admin, API routes and legal pages are **not touched**.

**Tech Stack:** Next.js 14.2, React 18, TypeScript, Tailwind CSS, framer-motion, lucide-react.

**Spec:** The approved design canvas artboards, on disk at
`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-website-design/`:
- `Main.dc.html` — homepage (nav, hero, client strip, three-things, Gravity, Pulsar, fork, tools teaser, pricing, closing, footer)
- `Services.dc.html` — services page
- `Tools.dc.html` — free-tools hub
- `MobileHome.dc.html` — homepage at 390px
- `HeroImmersive.dc.html` — alternate hero (NOT being built; reference only)

Published canvas: https://claude.ai/code/artifact/b4bc82f9-bd21-4090-b4ef-e8144ef54c33

These artboards are the authoritative source for **markup structure, exact spacing values, and final copy**. Where a task says "port section X from `Main.dc.html`", open that file and lift the values literally — do not re-derive, re-round, or re-write the copy.

---

## Global Constraints

Copy these exactly; every task inherits them.

**Design tokens** (already in `tailwind.config.ts` — use the token, never a raw hex, except inside the artboard-ported inline styles where the artboard uses one):
- Gold accent: `#F5A623` → `brand-gold`
- Page ground: `#0A0A0A` → `brand-black` / `brand-dark-bg`
- Card surface: `#151515` → `brand-dark-surface`
- Elevated surface: `#1A1A1A` → `brand-dark-surface2`
- Body text on dark: `#F5F4F1` → `brand-dark-text`
- Muted text: `rgba(255,255,255,0.55)`; dim text: `rgba(255,255,255,0.35)`
- Hairline border: `rgba(255,255,255,0.06)`; stronger: `rgba(255,255,255,0.10)`
- Success green (status dots only): `#4ADE80`

**Type:**
- Headings: `font-heading` = Playfair Display, weight 400–500, `tracking-[-0.02em]`. **Never `font-bold` on Playfair** — it reads heavy and wrong; use `font-semibold` at most.
- Body/UI: `font-body` = Inter.
- Emphasis pattern: one phrase per headline gets `italic text-brand-gold`. One per headline, never two.
- Eyebrow label: 10.5px / 600 / `0.14em` uppercase / `rgba(255,255,255,0.45)` (gold variant where the artboard shows gold).

**Content rules (non-negotiable — these are why we did the earlier cleanup):**
- No invented statistics, follower counts, user counts, or performance numbers.
- No fabricated testimonials or named quotes.
- Client names: `Gandhimathi Jewellers`, `JKR Tex`, `TNV Chits` may be shown plainly. `Bosch`, `Rajaram's`, `Nellai Kuttam Snacks` must carry an "in progress" marker. `EDII-TN` must not appear anywhere.
- Pricing is fixed: Gravity **₹10,000/mo**, Pulsar **₹15,000/mo**, Both Agents **₹15,000/mo** (bundle saves ₹10,000). Do not restate these anywhere else without matching these numbers.
- Pulsar copy leads with WhatsApp/email/SMS. Voice calling is mentioned last or not at all — never a headline or a lead visual.
- Illustrative examples on Services stay visibly bracketed placeholders (`[Copy from DK]`) until DK supplies real copy. Do not write them.
- Contact email is `[YOUR CONTACT EMAIL]` until DK confirms one. Do not invent an address.

**Do not touch:** `app/tools/[slug]/`, `components/tools/` (31 tool components), `app/blog/`, `app/admin/`, `app/api/`, `app/privacy-policy/`, `app/terms/`, `app/compare/`, `app/for/`, `lib/toolsData.ts` (except the one scrub in Task 16), `lib/blogData.ts`.

**Verification loop.** This project has no test runner configured (`package.json` scripts are dev/build/start/lint only). Do not invent one or add a test framework. Every task verifies by:
1. `npm run build` — must exit 0 with no type errors.
2. A rendered-HTML assertion via curl against the dev server (each task gives the exact command and expected match).
3. Browser check for console errors on the affected route.

Start the dev server once, on a port that won't collide with the user's other running servers:
```bash
cd "/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website" && PORT=3899 npm run dev
```

**Commit discipline:** one commit per task, on branch `dev`. End every commit message with:
```
Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
```
Before `git add`, run `git status` and confirm `data/analytics.json` is not staged — the dev server writes pageview rows into it and they must never be committed. If it is modified, `git checkout -- data/analytics.json` first.

---

### Task 1: Design-system CSS utilities

Adds the three CSS primitives every later section needs: the label recipe, the particle-field motif, and the ambient gold wash.

**Files:**
- Modify: `app/globals.css` (append a new section before the prose styles)
- Modify: `components/ui/SectionLabel.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: CSS classes `.neb-label`, `.neb-field`, `.neb-field-hot`, `.neb-halo`, `.neb-glow-wash`; `SectionLabel` component with signature `({ children, tone }: { children: string; tone?: 'gold' | 'muted' })`.

- [ ] **Step 1: Add the CSS utilities**

Append to `app/globals.css`, immediately before the `/* ─── Prose styles for MDX blog ─── */` block:

```css
/* ─── Nebulaa design-system primitives ───── */
/* Label recipe, lifted from the Gravity app's .gravity-label */
.neb-label {
  font-family: 'Inter', sans-serif;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
}
.neb-label-gold { color: #F5A623; }

/* Particle field — the dot-matrix motif the Gravity app uses while generating */
.neb-field {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.13) 1.1px, transparent 1.1px);
  background-size: 16px 16px;
}
.neb-field-hot {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,214,150,0.95) 1.4px, transparent 1.4px);
  background-size: 16px 16px;
  -webkit-mask-image: radial-gradient(closest-side, #000 0%, rgba(0,0,0,0.30) 58%, transparent 100%);
  mask-image: radial-gradient(closest-side, #000 0%, rgba(0,0,0,0.30) 58%, transparent 100%);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 62% 62%;
  mask-size: 62% 62%;
  -webkit-mask-position: 50% 50%;
  mask-position: 50% 50%;
  animation: nebDrift 14s ease-in-out infinite;
}
@keyframes nebDrift {
  0%, 100% { -webkit-mask-position: 46% 46%; mask-position: 46% 46%; -webkit-mask-size: 60% 60%; mask-size: 60% 60%; }
  50%      { -webkit-mask-position: 56% 54%; mask-position: 56% 54%; -webkit-mask-size: 70% 66%; mask-size: 70% 66%; }
}
.neb-halo {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(245,166,35,0.20) 0%, rgba(245,166,35,0) 58%);
  animation: nebBreathe 6s ease-in-out infinite;
}
@keyframes nebBreathe {
  0%, 100% { opacity: 0.55; }
  50%      { opacity: 1; }
}

/* Ambient top-right gold wash, lifted from the app shell */
.neb-glow-wash {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(60% 40% at 78% 6%, rgba(245,166,35,0.10) 0%, rgba(245,166,35,0) 60%);
}

@media (prefers-reduced-motion: reduce) {
  .neb-field-hot, .neb-halo { animation: none; }
}
```

- [ ] **Step 2: Rewrite SectionLabel to the label recipe**

Replace the entire contents of `components/ui/SectionLabel.tsx`:

```tsx
interface Props {
  children: string
  className?: string
  tone?: 'gold' | 'muted'
}

export default function SectionLabel({ children, className = '', tone = 'gold' }: Props) {
  return (
    <span className={`neb-label ${tone === 'gold' ? 'neb-label-gold' : ''} ${className}`}>
      {children}
    </span>
  )
}
```

Note: existing callers pass `className` only, so this is backwards-compatible. The old version hardcoded `text-brand-gold` and Tailwind `text-xs tracking-widest`; `tone` now defaults to gold so nothing regresses.

- [ ] **Step 3: Verify build and that the label renders**

```bash
cd "/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website" && npm run build
```
Expected: exits 0.

```bash
curl -s http://localhost:3899 | grep -o 'neb-label[^"]*' | head -3
```
Expected: at least one `neb-label neb-label-gold` match.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css components/ui/SectionLabel.tsx
git commit -m "Add Nebulaa design-system CSS primitives and label recipe

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 2: ParticleField component

The hero centrepiece. Extracted as its own component because the homepage hero and (later) the services hero both use it, and because it is the one piece of visual identity carried over from the product.

**Files:**
- Create: `components/ui/ParticleField.tsx`

**Interfaces:**
- Consumes: `.neb-field`, `.neb-field-hot`, `.neb-halo` from Task 1.
- Produces: `<ParticleField height={number} readout?: {label: string; lines: string[]; timer?: string} />` — default export.

- [ ] **Step 1: Create the component**

Create `components/ui/ParticleField.tsx`. Port the hero centrepiece markup from `Main.dc.html` (the block commented `<!-- centrepiece: one visual, not five -->`), parameterising the height and readout text:

```tsx
'use client'

interface Readout {
  label: string
  lines: string[]
  timer?: string
}

interface Props {
  height?: number
  readout?: Readout
  className?: string
}

export default function ParticleField({ height = 520, readout, className = '' }: Props) {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden bg-[#0C0C0F] border border-white/[0.06] ${className}`}
      style={{ height }}
    >
      <div className="neb-field" />
      <div className="neb-field-hot" />
      <div className="neb-halo" />

      {/* orbital rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-gold/[0.16]" style={{ width: 300, height: 300 }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-gold/[0.08]" style={{ width: 440, height: 440 }} />

      {/* core */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[54px] h-[54px] rounded-full"
        style={{
          background: 'radial-gradient(circle at 36% 32%, #FFE1AC 0%, #F5A623 52%, #8A5406 100%)',
          boxShadow: '0 0 60px 12px rgba(245,166,35,0.35)',
        }}
      />

      {readout && (
        <>
          <div className="absolute left-7 top-6 neb-label">{readout.label}</div>
          <div className="absolute left-7 bottom-6 flex flex-col gap-2.5">
            {readout.lines.map(line => (
              <div key={line} className="font-body text-[12.5px] text-white/[0.62] flex items-center gap-2.5">
                <span className="text-[#4ADE80]">✓</span>
                {line}
              </div>
            ))}
          </div>
          {readout.timer && (
            <div className="absolute right-6 top-6 font-body text-[11px] tracking-[0.08em] text-white/35 tabular-nums">
              {readout.timer}
            </div>
          )}
        </>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify it type-checks**

```bash
cd "/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website" && npx tsc --noEmit
```
Expected: no errors referencing `ParticleField.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/ui/ParticleField.tsx
git commit -m "Add ParticleField hero centrepiece component

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 3: Hero rebuild

**Files:**
- Rewrite: `components/sections/Hero.tsx`

**Interfaces:**
- Consumes: `ParticleField` (Task 2), `SectionLabel` (Task 1).
- Produces: default-export `Hero` with no props.

- [ ] **Step 1: Rewrite the component**

Replace the entire contents of `components/sections/Hero.tsx`. Port the `<!-- ─────────── HERO ─────────── -->` block from `Main.dc.html`. Delete the old `GravityCard`, `PulsarCard` and `FloatingBadge` helper functions entirely — the calm-hero decision replaces all three with one `ParticleField`.

Required exact copy:
- Eyebrow: `AI marketing & outreach agents`
- Headline line 1: `Your competitor isn't better.`
- Headline line 2 (italic gold): `They're just louder.`
- Subhead: `Give Nebulaa your website. In about a minute it knows how you talk, who actually buys from you, and what your rivals posted this week. Then it writes your posts, publishes them every morning, and answers enquiries on WhatsApp while they're still warm.`
- Primary CTA: `Start free — no card` → `href="#pricing"`
- Secondary CTA: `Have our team run it` → `href="/services/enterprise"`
- Trust line: green dot + `7-day trial` · `Set up with you in 24 hrs` · `Cancel anytime`
- ParticleField readout: label `Reading nebulaa-client.com`, timer `00:47`, lines:
  - `Brand voice — confident, warm, unhurried`
  - `Customers — retail buyers, 25–45, Tamil Nadu`
  - `3 competitors tracked`

Layout: `grid lg:grid-cols-2 gap-15 items-center`, section padding `py-32 px-6 md:px-12 lg:px-30`, headline `font-heading text-[52px] md:text-[74px] leading-[1.04] tracking-[-0.02em] font-medium`. Keep the existing framer-motion `fadeUpVariant`/`staggerContainer` entrance. Hide the ParticleField below `lg` (the mobile artboard puts it below the copy instead — see Task 12 note).

- [ ] **Step 2: Verify the hero renders with the new copy**

```bash
curl -s http://localhost:3899 | grep -c "They&#x27;re just louder\|They're just louder"
```
Expected: `1` or more.

```bash
curl -s http://localhost:3899 | grep -c "fills while you sleep"
```
Expected: `0` (old copy fully gone).

- [ ] **Step 3: Check for console errors**

Load `http://localhost:3899` in the browser pane and read console messages. Expected: no errors (an HMR websocket warning is fine and unrelated).

- [ ] **Step 4: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "Rebuild hero: single particle centrepiece, competitor-envy headline

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 4: ClientStrip component

Replaces `SocialProof` on the homepage. Honest client naming, no counters.

**Files:**
- Create: `components/sections/ClientStrip.tsx`

**Interfaces:**
- Produces: default-export `ClientStrip`, no props.

- [ ] **Step 1: Create the component**

Port the `<!-- ─────────── CLIENTS ─────────── -->` block from `Main.dc.html`. Structure: a hairline-bordered row, `py-12 px-6 md:px-12 lg:px-30`, `flex items-center gap-11`, eyebrow `Working with` then the names.

Client list — exact, with exact stage treatment:

```tsx
const clients = [
  { name: 'Gandhimathi Jewellers', inProgress: false },
  { name: 'JKR Tex', inProgress: false },
  { name: 'TNV Chits', inProgress: false },
  { name: 'Bosch', inProgress: true },
  { name: "Rajaram's", inProgress: true },
]
```

Active clients render `font-heading text-xl text-white/[0.62]`. In-progress clients render at `text-white/30` with a trailing `font-body text-[11px] tracking-[0.08em] uppercase` span reading `· in progress`.

Do NOT add `Nellai Kuttam Snacks` here (it belongs on the Services MSME card only, to keep this strip short) and do NOT add `EDII-TN`.

- [ ] **Step 2: Verify**

This component is not on the page until Task 12, so verify it in isolation:

```bash
npx tsc --noEmit && grep -c "in progress" components/sections/ClientStrip.tsx
```
Expected: no type errors; grep returns `1` (the single conditional marker, rendered for the two in-progress clients).

```bash
grep -ci "EDII" components/sections/ClientStrip.tsx
```
Expected: `0`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/ClientStrip.tsx
git commit -m "Add ClientStrip section with honest engagement staging

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 5: ThreeThings component

Replaces `HowItWorks` on the homepage.

**Files:**
- Create: `components/sections/ThreeThings.tsx`

**Interfaces:**
- Consumes: `SectionLabel`.
- Produces: default-export `ThreeThings`, no props.

- [ ] **Step 1: Create the component**

Port `<!-- ─────────── WHAT ACTUALLY HAPPENS ─────────── -->` from `Main.dc.html`.

Heading: `It does the three things you ` + italic-gold `keep meaning to do.`
Eyebrow: `What actually happens`

Cards (exact copy — do not paraphrase):

```tsx
const steps = [
  {
    n: '01',
    title: 'It learns how you talk',
    body: 'Paste your website. A minute later it knows your tone, who buys from you, and what your three closest rivals put out this week. No brief to write. No onboarding call to sit through.',
  },
  {
    n: '02',
    title: 'It shows up every morning',
    body: 'Posts in your voice, on your channels, before you’ve had your first coffee. Diwali and Pongal are already in the calendar — it plans around them, so you never wake up on the day with nothing ready.',
  },
  {
    n: '03',
    title: 'It answers before they cool',
    body: 'An enquiry at nine on a Sunday night doesn’t wait for Monday. Pulsar replies in minutes, asks what you’d have asked, and brings you in once there’s a real buyer on the other end.',
  },
]
```

Card styling: `bg-brand-dark-surface border border-white/[0.06] rounded-[18px] p-9`, numeral `font-heading text-[46px] text-brand-gold/35 leading-none mb-7`, title `font-heading text-[25px] font-medium mb-3.5`, body `font-body text-[15px] leading-[1.68] text-white/55`.

- [ ] **Step 2: Verify**

Not on the page until Task 12 — verify in isolation:

```bash
npx tsc --noEmit && grep -c "keep meaning to do" components/sections/ThreeThings.tsx
```
Expected: no type errors; grep returns `1`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/ThreeThings.tsx
git commit -m "Add ThreeThings section explaining the actual mechanic

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 6: GravitySection rebuild

**Files:**
- Rewrite: `components/sections/GravitySection.tsx`

- [ ] **Step 1: Rewrite**

Port `<!-- ─────────── GRAVITY ─────────── -->` from `Main.dc.html`. Two-column: copy left, app-flavoured panel right.

Exact copy:
- Eyebrow: `Gravity — the marketing half`
- Headline: `You meant to post something. ` + italic-gold `That was March.`
- Body: `Not laziness — there's a business to run. But the shop that shows up every day is the shop people think of first. Gravity writes in your voice, queues a week ahead, and waits for your yes before a single word goes out.`
- Bullets (em-dash prefix, gold):
  - `Daily posts for LinkedIn, Instagram and X, in your voice`
  - `Festivals planned weeks ahead, not the night before`
  - `See what rivals shipped this week, before you write`
  - `Nothing publishes until you tap approve`
- Link: `See how Gravity works →`

The right-hand panel is the mock post card: header with gold dot + `Gravity` + green `LIVE` pill + `This week` label; a `Tuesday · LinkedIn` draft card containing this exact sample post text, which is illustrative product output, not a customer quote:
`Most of our customers don't compare us to other jewellers. They compare us to the shop their mother trusted for thirty years. That's the bar.`
Then `Approve` / `Rewrite` pills, and a 3-up stat row: `Queued 18`, `Platforms 3`, `Your time 9min`.

Panel styling: `bg-[#111111] border border-white/[0.06] rounded-[20px] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.45)]`.

- [ ] **Step 2: Verify**

`GravitySection` is still rendered on the homepage, so this verifies live:

```bash
npm run build && curl -s http://localhost:3899 | grep -c "That was March"
```
Expected: build exits 0; grep returns `1`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/GravitySection.tsx
git commit -m "Rebuild Gravity section with concrete product output

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 7: PulsarSection rebuild

**Files:**
- Rewrite: `components/sections/PulsarSection.tsx`

- [ ] **Step 1: Rewrite**

Port `<!-- ─────────── PULSAR ─────────── -->` from `Main.dc.html`. Panel LEFT, copy RIGHT (mirrored from Gravity).

Exact copy:
- Eyebrow: `Pulsar — the outreach half`
- Headline: `Someone messaged you on WhatsApp. ` + italic-gold `Nobody replied.`
- Body: `It happens mid-billing, mid-invoice, mid-everything. By Tuesday they've bought from whoever answered first. Pulsar answers in minutes, asks the questions you'd ask, and hands you the ones worth your afternoon.`
- Bullets:
  - `WhatsApp, email and SMS — written the way you'd write them`
  - `Budget, timeline and fit settled before it reaches you`
  - `Every lead scored, so your day starts at the top of the list`
  - `Voice calling where it earns its place`
- Link: `See how Pulsar works →`

**Critical:** the old file contains a voice-call waveform visual. Delete it. Per the brand guardrail, voice is not the lead visual. The new panel is a WhatsApp thread: header `Pulsar` + `4 min after enquiry`; three bubbles (inbound grey `bg-brand-dark-surface2`, outbound gold-tinted `bg-brand-gold/[0.13] border-brand-gold/[0.22]`):
1. `Saw your enquiry about the Anna Nagar showroom — are you looking for bridal or daily wear?`
2. `Bridal. Wedding is in March.`
3. `Perfect — March gives us time. Would Saturday 11am suit you for a private viewing?`

Then a handover card: label `Scored & handed over`, line `Bridal · March timeline · booked Saturday`, and a gold `font-heading text-[30px]` score of `86`.

- [ ] **Step 2: Verify voice is de-emphasised and the thread renders**

`PulsarSection` is still rendered on the homepage, so this verifies live:

```bash
npm run build && curl -s http://localhost:3899 | grep -c "Nobody replied"
```
Expected: build exits 0; grep returns `1`.

```bash
curl -s http://localhost:3899 | grep -ci "waveform\|● Calling"
```
Expected: `0` — the voice waveform is gone.

- [ ] **Step 3: Commit**

```bash
git add components/sections/PulsarSection.tsx
git commit -m "Rebuild Pulsar section around WhatsApp thread, drop voice visual

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 8: EntryFork rebuild

**Files:**
- Rewrite: `components/sections/EntryFork.tsx`

- [ ] **Step 1: Rewrite**

Port `<!-- ─────────── THE FORK ─────────── -->` from `Main.dc.html`. The current file is the thin two-card placeholder from the earlier scaffolding pass; replace it wholesale.

Exact copy:
- Eyebrow: `Two ways in`
- Headline: `Run it yourself, or ` + italic-gold `hand us the keys.`
- Sub: `Same agents underneath. The only question is whose evening it takes.`

Card A — `bg-brand-dark-surface border border-white/[0.06] rounded-[20px] p-11`:
- Label: `The software`, title `I'll run it myself`
- Body: `You drive. Set up in an afternoon, approve the week's posts from your phone in about nine minutes, cancel the month it stops earning its keep.`
- Meta: `From ₹10,000/month` / `7-day trial, no card`
- CTA: `See pricing` → `#pricing`

Card B — same but `border-brand-gold/[0.18]` and `shadow-[inset_0_1px_0_0_rgba(255,214,150,0.07)]`:
- Label (gold): `The team`, title `Someone else runs it`
- Body: `We drive. Our team plans, writes, ships and chases — with the same agents carrying the volume, which is why we come in under the agency quoting you now. You approve. You never log in.`
- Meta: `Enterprise & MSME engagements` / `Scoped per business`
- CTA: `Talk to us` → `/services/enterprise`

- [ ] **Step 2: Verify**

`EntryFork` is already on the homepage from the scaffolding pass, so this verifies live:

```bash
npm run build && curl -s http://localhost:3899 | grep -c "whose evening it takes"
```
Expected: build exits 0; grep returns `1`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/EntryFork.tsx
git commit -m "Rebuild entry fork with self-serve vs managed cards

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 9: ToolsTeaser component

**Files:**
- Create: `components/sections/ToolsTeaser.tsx`

**Interfaces:**
- Consumes: `tools` from `lib/toolsData.ts` (read-only — do not modify the data here).

- [ ] **Step 1: Create**

Port `<!-- ─────────── FREE TOOLS ─────────── -->` from `Main.dc.html`.

- Eyebrow: `Free tools`
- Headline: `Take thirty tools. ` + italic-gold `Pay nothing. Ever.`
- Sub: `Every one of them runs on the same model that writes for Gravity. No signup, no card, no drip campaign afterwards. If they're all you ever need from us, that's a perfectly good outcome.`
- Right-aligned link: `Browse all 30+ →` → `/tools`

Then a 4-up grid of real tools pulled from `toolsData` so the teaser never drifts from reality:

```tsx
import { tools } from '@/lib/toolsData'

const FEATURED_SLUGS = [
  'linkedin-post-generator',
  'cold-email-generator',
  'icp-builder',
  'lead-qualification-calculator',
]

const featured = FEATURED_SLUGS
  .map(slug => tools.find(t => t.slug === slug))
  .filter((t): t is NonNullable<typeof t> => Boolean(t))
```

Each card links to `/tools/${tool.slug}`, showing `tool.name` and `tool.tagline`. If a slug is missing from `toolsData`, it is silently skipped by the filter — verify in Step 2 that four cards actually render.

- [ ] **Step 2: Verify all four featured tools resolve**

```bash
curl -s http://localhost:3899 | grep -o 'href="/tools/[a-z-]*"' | sort -u | wc -l
```
Expected: `5` (four featured tools + the `/tools` browse link). If fewer, a slug in `FEATURED_SLUGS` does not exist — check against `lib/toolsData.ts` and correct the slug.

- [ ] **Step 3: Commit**

```bash
git add components/sections/ToolsTeaser.tsx
git commit -m "Add free-tools teaser wired to real tools data

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 10: Pricing restyle

Numbers are already correct from the earlier fix — this is purely visual, plus two copy lines.

**Files:**
- Modify: `components/sections/Pricing.tsx`

- [ ] **Step 1: Restyle**

Port `<!-- ─────────── PRICING ─────────── -->` from `Main.dc.html`. Keep the existing `plans` array's prices and feature lists; change presentation and these three description strings:

- Heading: `Cheaper than the hire. ` + italic-gold `Faster than the agency.`
- Sub: `A marketing executive costs ₹30,000–50,000 a month, plus tools, plus six weeks of interviews, plus the morning they hand in their notice. This starts working on Thursday.`
- Gravity description → `Content, out the door daily.`
- Both description → `The whole loop — content in, customers out. ₹10,000 less than buying the two separately.`
- Pulsar description → `Every enquiry, answered.`

Card styling per artboard: `bg-brand-dark-surface rounded-[20px] p-10`, highlighted card gets `border-brand-gold/[0.22]` plus the inset highlight and gold glow shadow. Price is `font-heading text-[46px]`. Remove the emoji from each card header — the artboard has none, and emoji are off-brand per the design guardrails.

**Do not change any price.** Assert in Step 2.

- [ ] **Step 2: Verify prices survived the restyle**

```bash
curl -s http://localhost:3899 | grep -o "₹10,000\|₹15,000" | sort | uniq -c
```
Expected: `₹10,000` appears at least twice (Gravity card + bundle-saving line) and `₹15,000` at least twice (Both + Pulsar).

```bash
curl -s http://localhost:3899 | grep -c "₹7,500"
```
Expected: `0`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Pricing.tsx
git commit -m "Restyle pricing to the new design system

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 11: FinalCTA rebuild

**Files:**
- Rewrite: `components/sections/FinalCTA.tsx`

- [ ] **Step 1: Rewrite**

Port `<!-- ─────────── CLOSING ─────────── -->` from `Main.dc.html`. Centred, with the bottom-anchored gold radial wash:
`background: radial-gradient(50% 70% at 50% 100%, rgba(245,166,35,0.10) 0%, rgba(245,166,35,0) 62%)`

- Headline line 1: `Start with your URL.`
- Headline line 2 (italic gold): `See what it makes of you.`
- Sub: `A minute to your first brand read. A week to decide whether any of this deserves your money. No card until you've seen it work.`
- Primary CTA: `Start free — no card` → `#pricing`
- Secondary CTA: `Book a 20-min call` → `/services/enterprise`

- [ ] **Step 2: Verify**

`FinalCTA` is still rendered on the homepage, so this verifies live:

```bash
npm run build && curl -s http://localhost:3899 | grep -c "See what it makes of you"
```
Expected: build exits 0; grep returns `1`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/FinalCTA.tsx
git commit -m "Rebuild closing CTA with risk-reversal copy

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 12: Recompose the homepage

Wires every rebuilt section together and retires the ones the design drops.

**Files:**
- Modify: `app/page.tsx`
- Delete: `components/sections/SocialProof.tsx`, `components/sections/TransformationTable.tsx`, `components/sections/UseCaseSimulator.tsx`, `components/sections/AgentGallery.tsx`, `components/sections/TargetedSolutions.tsx`, `components/sections/HowItWorks.tsx`

- [ ] **Step 1: Confirm the doomed sections are not imported anywhere else**

```bash
cd "/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website"
grep -rn "SocialProof\|TransformationTable\|UseCaseSimulator\|AgentGallery\|TargetedSolutions\|HowItWorks" --include="*.tsx" app components | grep -v "^components/sections/"
```
Expected: only matches in `app/page.tsx`. **If any other file imports one of these, stop and report it** — do not delete a section another route renders.

- [ ] **Step 2: Rewrite the page composition**

Replace `app/page.tsx` with:

```tsx
import Hero from '@/components/sections/Hero'
import ClientStrip from '@/components/sections/ClientStrip'
import ThreeThings from '@/components/sections/ThreeThings'
import GravitySection from '@/components/sections/GravitySection'
import PulsarSection from '@/components/sections/PulsarSection'
import EntryFork from '@/components/sections/EntryFork'
import ToolsTeaser from '@/components/sections/ToolsTeaser'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import BlogPreview from '@/components/sections/BlogPreview'
import Newsletter from '@/components/sections/Newsletter'
import FinalCTA from '@/components/sections/FinalCTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <ClientStrip />
      <ThreeThings />
      <GravitySection />
      <PulsarSection />
      <EntryFork />
      <ToolsTeaser />
      <Pricing />
      <FAQ />
      <BlogPreview />
      <Newsletter />
      <FinalCTA />
    </main>
  )
}
```

Note: `FAQ`, `BlogPreview` and `Newsletter` are **kept** even though the design canvas omits them — FAQ handles buyer objections, BlogPreview feeds SEO, Newsletter captures leads. They are restyled in Task 17, not deleted.

- [ ] **Step 3: Delete the retired sections**

```bash
git rm components/sections/SocialProof.tsx components/sections/TransformationTable.tsx components/sections/UseCaseSimulator.tsx components/sections/AgentGallery.tsx components/sections/TargetedSolutions.tsx components/sections/HowItWorks.tsx
```

- [ ] **Step 3b: Delete the now-orphaned 3D components**

`components/3d/` is imported only by `HowItWorks.tsx`, which just went. Confirm, then delete:

```bash
grep -rln "HeroScene\|GravityOrb\|PulsarWave" --include="*.tsx" app components | grep -v "^components/3d/"
```
Expected: no output (nothing outside `components/3d/` references them). **If anything is listed, stop** — do not delete a component still in use.

```bash
git rm -r components/3d/
```

This also removes the last `Arjun M.` mockup label and the only consumers of `@react-three/fiber`, `@react-three/drei` and `three`. Leave those packages in `package.json` for now — removing dependencies is a separate change with its own risk, and it is not what this task is for.

- [ ] **Step 4: Verify the build and the whole page**

```bash
npm run build
```
Expected: exits 0.

```bash
curl -s http://localhost:3899 | grep -c "They're just louder\|They&#x27;re just louder"   # 1+
curl -s http://localhost:3899 | grep -c "keep meaning to do"                              # 1
curl -s http://localhost:3899 | grep -c "That was March"                                  # 1
curl -s http://localhost:3899 | grep -c "Nobody replied"                                  # 1
curl -s http://localhost:3899 | grep -c "whose evening it takes"                          # 1
curl -s http://localhost:3899 | grep -c "Pay nothing. Ever"                               # 1
curl -s http://localhost:3899 | grep -c "See what it makes of you"                        # 1
```

- [ ] **Step 5: Browser check**

Load `http://localhost:3899`, confirm no console errors, and screenshot the full page.

- [ ] **Step 6: Commit**

```bash
git status   # confirm data/analytics.json is NOT staged
git add app/page.tsx components/sections/
git commit -m "Recompose homepage from rebuilt sections; retire superseded ones

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 13: Navbar rebuild

**Files:**
- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: Rewrite**

Port the `<!-- ─────────── NAV ─────────── -->` block from `Main.dc.html`. Keep the existing scroll-state, mobile-overlay and `ThemeToggle` behaviour; change the presentation and the link set.

- Logo: keep the existing `next/image` logo.
- Links: `Product` (dropdown → Gravity `#gravity`, Pulsar `#pulsar`), `Services` (dropdown → Enterprise `/services/enterprise`, MSME `/services/msme`), then plain links `Free tools` `/tools`, `Pricing` `#pricing`, `Journal` `/blog`.
- Right: `Sign in` (text) + `Start free` (gold pill, `href="#pricing"`).
- Nav row: `py-7 px-6 md:px-12 lg:px-30`, hairline bottom border `border-white/[0.06]`, links `font-body text-sm text-white/55`.
- Replace the dropdown emoji (`🌀`, `📞`, `🏢`, `🏪`) with the small gold gradient dot used in the artboard — no emoji in nav.

Keep both dropdown state hooks (`productDropdownOpen`, `servicesDropdownOpen`) already present.

- [ ] **Step 2: Verify**

```bash
curl -s http://localhost:3899 | grep -o ">Free tools<\|>Journal<\|>Start free<" | sort -u
```
Expected: all three present.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "Rebuild navbar to the new design system

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 14: Footer rebuild

**Files:**
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Rewrite**

Port `<!-- ─────────── FOOTER ─────────── -->` from `Main.dc.html`. Keep the existing `FooterNewsletter` form component and its POST to `/api/newsletter-signup` — only restyle it.

Columns: `Product` (Gravity, Pulsar, Pricing) · `Services` (Enterprise, MSME) · `Free` (30+ tools, Journal).
Left block: gold dot + `Nebulaa` wordmark, then `Chennai, India` and `[YOUR CONTACT EMAIL]` on the next line.

**Do not invent a contact email.** The bracketed placeholder ships until DK supplies one.

- [ ] **Step 2: Verify the newsletter endpoint still wired**

```bash
grep -c "api/newsletter-signup" components/layout/Footer.tsx
```
Expected: `1`.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "Rebuild footer to the new design system

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 15: Services pages rebuild

**Files:**
- Modify: `lib/servicesData.ts`
- Modify: `app/services/[tier]/page.tsx`

- [ ] **Step 1: Update the data copy**

In `lib/servicesData.ts`, replace the placeholder copy written during scaffolding with the approved copy from `Services.dc.html`:

Enterprise:
- `headline`: `You don't want software. You want it handled.` (the page renders `You want it handled.` italic gold)
- `subheadline`: `We plan it, write it, ship it and chase it — with the same agents doing the heavy lifting behind our team. That's why we come in under the agency quoting you now, and move while they're still building the deck. You approve. You never log in.`
- Engagement blurb: `Distribution is the hard part, not the deck. We build the go-to-market, the content engine behind it, and the material your dealers will actually use — then report against numbers you agreed to, every month.`

MSME:
- Engagement blurb: `The same work, cut to a smaller shape. Priced like a retainer, delivered faster because the agents carry the volume. One call a month, in plain language, no jargon tax.`

Shared three-up differentiators (add to the data model as `differentiators: {title, body}[]`, identical on both tiers):
1. `One team, one number` — `Not a rotating cast of account managers, and not a junior learning your business on your retainer. Whoever learns it, keeps it.`
2. `The machines do the volume` — `Drafting, scheduling, follow-up, reporting — all agent work. Our people spend their hours on the judgement calls, which is the part you're actually paying for.`
3. `You keep everything` — `Accounts, content and lead data, all in your name. Take it in-house whenever you like and the whole system walks with you. No hostages.`

Client lists stay exactly as they are (Enterprise: Gandhimathi Jewellers, JKR Tex, TNV Chits active; Bosch proposal. MSME: Rajaram's, Nellai Kuttam Snacks both proposal). `EDII-TN` stays absent.

`illustrativeExamples[].copy` stays `null` — the page renders the bracketed placeholder. **Do not write this copy.**

- [ ] **Step 2: Rebuild the page**

Rewrite `app/services/[tier]/page.tsx` to the `Services.dc.html` layout: hero, three differentiator cards, the two engagement cards side by side (each with its client chips — active as solid-border chips, in-progress as dashed-border chips reading `· in progress`), the dashed illustrative-example placeholders, and the closing CTA (`Tell us what you sell. We'll tell you what we'd do.` / `Twenty minutes, no deck, no pitch. If we're the wrong fit we'll say so on the call and point you somewhere better.`).

Note the structural change: the artboard shows **both** tiers on one page. Keep the two routes (`/services/enterprise`, `/services/msme`) for SEO and direct linking, with each route emphasising its own tier first — do not collapse to one route.

- [ ] **Step 3: Verify both routes**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3899/services/enterprise   # 200
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3899/services/msme         # 200
curl -s http://localhost:3899/services/enterprise | grep -c "No hostages"            # 1
curl -s http://localhost:3899/services/enterprise | grep -ci "EDII"                  # 0
curl -s http://localhost:3899/services/msme | grep -c "Copy from DK"                 # 2 or more
```

- [ ] **Step 4: Commit**

```bash
git add lib/servicesData.ts "app/services/[tier]/page.tsx"
git commit -m "Rebuild services pages with approved copy and design

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 16: Tools hub restyle and claim scrub

Keeps all 31 tools working; restyles the index and removes the last unverified numbers on the site.

**Files:**
- Modify: `app/tools/page.tsx`
- Modify: `lib/toolsData.ts` (one string only)
- Modify: `components/ui/BlogEmailCapture.tsx`

- [ ] **Step 1: Scrub the unverified founder counts**

Three places still claim follower/user counts we cannot verify:

```bash
cd "/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website"
grep -rn "1,000+ founders\|2,000+ founders\|500+ founders" app components lib
```

Fix each by deleting the claim clause, not by inventing a smaller number:
- `app/tools/page.tsx` metadata description → `Free tools for founders and SME owners. Generate posts, emails, hashtags, and qualify leads instantly.`
- `app/tools/page.tsx` hero sub → `No login. No credit card. Just the tools.`
- `lib/toolsData.ts` (the one `seoDescription` containing `Used by 1,000+ founders.`) → delete that sentence, keep the rest of the description.
- `components/ui/BlogEmailCapture.tsx` → remove the count clause from its copy.

Re-run the grep; expect zero matches.

- [ ] **Step 2: Restyle the hub**

Port `Tools.dc.html`. Structure: hero, a search affordance (visual only — wiring search is out of scope), then tools grouped by `tool.category` with a `font-heading text-[28px]` group heading and a `neb-label` count beside it, then the bridge card at the bottom.

Group dynamically so the page cannot drift from the data:

```tsx
import { tools } from '@/lib/toolsData'

const grouped = tools.reduce<Record<string, typeof tools>>((acc, tool) => {
  ;(acc[tool.category] ||= []).push(tool)
  return acc
}, {})
```

Hero copy:
- Eyebrow: `Free tools · no signup`
- Headline: `Take the tools. ` + italic-gold `Keep them. Pay nothing.`
- Sub: `Each one runs on the same model that writes for Gravity. No signup, no card, no follow-up sequence afterwards — given what Pulsar does for a living, that would be a bit much. Use them forever and never speak to us. But if you're opening four of them every Monday, you already know what the product is for.`

Bridge card at the bottom (gold-bordered):
- Headline: `These make one thing. ` + italic-gold `Gravity makes all of it, every morning.`
- Body: `A tool forgets you the moment you close the tab. The product remembers your voice, your customers and your calendar — and it doesn't wait to be asked.`
- CTAs: `Start free — no card` → `#pricing` on `/`; `See what Gravity does` → `/#gravity`

Keep every existing `Link href={/tools/${tool.slug}}` card — all 31 must still be reachable.

- [ ] **Step 3: Verify all 31 tools still link and still render**

```bash
curl -s http://localhost:3899/tools | grep -o 'href="/tools/[a-z0-9-]*"' | sort -u | wc -l
```
Expected: `31`.

Spot-check three tool pages still work:
```bash
for s in linkedin-post-generator cold-email-generator icp-builder; do
  curl -s -o /dev/null -w "$s: %{http_code}\n" "http://localhost:3899/tools/$s"
done
```
Expected: all `200`.

```bash
grep -rn "1,000+ founders\|2,000+ founders\|500+ founders" app components lib | wc -l
```
Expected: `0`.

- [ ] **Step 4: Commit**

```bash
git add app/tools/page.tsx lib/toolsData.ts components/ui/BlogEmailCapture.tsx
git commit -m "Restyle tools hub; remove last unverified founder-count claims

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 17: Restyle retained sections (FAQ, BlogPreview, Newsletter)

These three stay on the homepage but still carry the old visual language.

**Files:**
- Modify: `components/sections/FAQ.tsx`
- Modify: `components/sections/BlogPreview.tsx`
- Modify: `components/sections/Newsletter.tsx`

- [ ] **Step 1: FAQ**

Restyle to the artboard's card language (`bg-brand-dark-surface`, hairline borders, `font-heading` questions at `text-[19px]`, `neb-label` eyebrow). Keep the existing accordion behaviour and all six Q&As — their pricing answers were corrected earlier and must not change. Update the section heading to:
`The questions you're ` + italic-gold `actually asking.`

- [ ] **Step 2: BlogPreview**

Restyle cards to `bg-brand-dark-surface border-white/[0.06] rounded-[18px]`, `font-heading` post titles, `neb-label` category tags. Keep all data wiring to `lib/blogData.ts` untouched. Heading:
`Notes from ` + italic-gold `the work.`

- [ ] **Step 3: Newsletter**

Restyle to match the closing-CTA treatment (centred, bottom gold wash). Keep the form and its `/api/newsletter-signup` POST. Its unverified "500+ founders" line was already removed — confirm it has not returned:

```bash
grep -c "500+" components/sections/Newsletter.tsx
```
Expected: `0`.

- [ ] **Step 4: Verify build and homepage**

```bash
npm run build
curl -s http://localhost:3899 | grep -c "actually asking"   # 1
```

- [ ] **Step 5: Commit**

```bash
git add components/sections/FAQ.tsx components/sections/BlogPreview.tsx components/sections/Newsletter.tsx
git commit -m "Restyle FAQ, blog preview and newsletter to the new system

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 18: Responsive, light-mode and final audit

The design canvas is dark-only and desktop-first. The site ships a light mode and real phone traffic, so both need a pass.

**Files:**
- Modify: whichever section files the audit finds broken.

- [ ] **Step 1: Phone-width audit**

Resize the browser pane to 390×844 and load `/`, `/services/enterprise`, `/tools`. Check against `MobileHome.dc.html`:
- Headlines wrap without orphans; hero headline drops to `text-[40px]`.
- The `ParticleField` is hidden or moved below the copy — never squeezed beside it.
- Two-column grids collapse to one column.
- No horizontal scroll at any point.
- Tap targets ≥44px (CTA pills use `py-4` at mobile).

Fix what breaks, in the section file responsible.

- [ ] **Step 2: Light-mode audit**

The site's `ThemeProvider` still offers a light toggle. Toggle to light on `/` and confirm nothing is unreadable — in particular any element where the rebuild hardcoded `text-white/55` or `bg-[#111111]` without a light counterpart. For each, add the light-mode class (`text-brand-muted dark:text-white/55`, `bg-white dark:bg-[#111111]`).

If light mode proves to be a large amount of extra work, **stop and report** rather than guessing — dropping light mode entirely is a product decision for DK, not one to make mid-task.

- [ ] **Step 3: Full-site route check**

```bash
for r in / /services/enterprise /services/msme /tools /blog /privacy-policy /terms; do
  curl -s -o /dev/null -w "$r: %{http_code}\n" "http://localhost:3899$r"
done
```
Expected: all `200`.

- [ ] **Step 4: Production build**

```bash
npm run build
```
Expected: exits 0, no type errors, no missing-module warnings.

- [ ] **Step 5: Confirm no stale claims survived anywhere**

```bash
grep -rn "Sneha R\.\|Karan V\.\|40+ founders\|₹7,500\|1,000+ founders\|2,000+ founders\|500+ founders" --include="*.tsx" --include="*.ts" app components lib
```
Expected: `0` matches.

Then separately, for the one name that may legitimately survive:

```bash
grep -rn "Arjun M\." --include="*.tsx" app components
```
`Arjun M.` is acceptable **only** as a fake lead name inside a product mockup (e.g. a demo lead row). It is NOT acceptable as an attributed testimonial. Inspect each hit and confirm which it is; delete any that reads as a real customer quote. Note `components/3d/HeroScene.tsx` carries one such mockup label — check whether that component is still rendered anywhere after the rebuild, and if it is orphaned, delete the file.

- [ ] **Step 6: Commit**

```bash
git status   # confirm data/analytics.json is NOT staged
git add -A
git commit -m "Responsive and light-mode fixes across rebuilt marketing pages

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Out of scope (explicitly deferred)

- Improving the 31 tools themselves — DK said these stay as-is for now.
- Real product screenshots — DK is supplying assets later; the mock panels stand in.
- Real illustrative-example copy on Services — DK is writing it.
- A real contact email — placeholder until confirmed.
- Search wiring on the tools hub (visual affordance only in Task 16).
- The alternate immersive hero (`HeroImmersive.dc.html`) — reference only, not built.
- The objection-handling block offered during design review — FAQ covers this ground for now; revisit if DK wants a dedicated section.
