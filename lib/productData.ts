/**
 * Product pages for Gravity and Pulsar.
 *
 * Every capability here maps to a module that actually ships in the app —
 * taken from the Gravity and Pulsar codebases rather than from marketing copy.
 * If something isn't built, it doesn't get a page.
 */

export type AgentId = 'gravity' | 'pulsar'

export interface Step {
  title: string
  body: string
}

export interface Faq {
  q: string
  a: string
}

export interface Capability {
  slug: string
  agent: AgentId
  /** Short label for nav and cards. */
  name: string
  eyebrow: string
  headline: string
  headlineEmphasis: string
  subheadline: string
  /** One-line summary used on the agent hub. */
  summary: string
  /** How it actually works, in three steps. */
  steps: [Step, Step, Step]
  whatYouGet: string[]
  /** Optional media slot id for a product screenshot. */
  mediaSlot?: string
  faqs: Faq[]
  seoTitle: string
  seoDescription: string
}

export interface Agent {
  id: AgentId
  name: string
  tagline: string
  eyebrow: string
  headline: string
  headlineEmphasis: string
  subheadline: string
  price: string
  seoTitle: string
  seoDescription: string
}

export const agents: Record<AgentId, Agent> = {
  gravity: {
    id: 'gravity',
    name: 'Gravity',
    tagline: 'The marketing agent',
    eyebrow: 'Gravity — the marketing agent',
    headline: 'Stop planning content.',
    headlineEmphasis: 'Start approving it.',
    subheadline:
      'Gravity reads your website, builds a strategy from it, plans the month, drafts every post, carousel and reel to fill that month, and waits for you to tap approve. It also runs your campaigns, your creator collaborations, your inbox and your SEO — most of which nobody realises it does.',
    price: '₹10,000 / month',
    seoTitle: 'Gravity — AI Marketing Agent for Indian Businesses | Nebulaa',
    seoDescription:
      'Gravity builds your marketing strategy, plans the month, drafts posts, carousels and reels, tracks competitors, runs campaigns and creator collaborations, and answers your inbox.',
  },
  pulsar: {
    id: 'pulsar',
    name: 'Pulsar',
    tagline: 'The outreach agent',
    eyebrow: 'Pulsar — the outreach agent',
    headline: 'Whoever replies first',
    headlineEmphasis: 'wins the sale.',
    subheadline:
      'Pulsar answers every enquiry on WhatsApp, email and SMS within minutes, asks the questions you would have asked, scores what comes back, and hands you only the people worth your afternoon. Broadcasts, automation and voice calling run from the same place.',
    price: '₹15,000 / month',
    seoTitle: 'Pulsar — AI Outreach & Lead Qualification Agent | Nebulaa',
    seoDescription:
      'Pulsar replies to WhatsApp, email and SMS enquiries in minutes, qualifies budget, timeline and fit, scores every lead, and runs broadcasts, automation and voice calling.',
  },
}

export const capabilities: Capability[] = [
  // ───────────────────────────── Gravity ─────────────────────────────
  {
    slug: 'strategy-icp',
    agent: 'gravity',
    name: 'Strategy & ICP',
    eyebrow: 'Gravity · strategy',
    headline: 'It starts by reading',
    headlineEmphasis: 'your website.',
    subheadline:
      'Most tools ask you to fill in a brief. Gravity starts from your URL: it works out how you talk, who buys from you, which channels are worth your time, and who you are actually competing against — then writes the strategy everything else runs from.',
    summary: 'Reads your URL and builds the strategy — tone, ICP, channels, competitors.',
    steps: [
      { title: 'Give it a URL', body: 'No brief to write, no onboarding call to sit through. Your website already contains most of what a strategist would ask you for.' },
      { title: 'It reads the brand', body: 'Tone of voice, what you sell, who buys it, the language they use, and the three or four businesses competing for the same customer.' },
      { title: 'It writes the strategy', body: 'Positioning, content pillars, channel priorities and posting cadence — a document you can read, argue with and edit.' },
    ],
    whatYouGet: [
      'A written strategy document, not a settings page',
      'Your ideal customer profile, in plain language',
      'Channel recommendations based on what you sell and to whom',
      'The competitors worth watching, identified automatically',
      'Content pillars that the monthly plan is then built against',
    ],
    mediaSlot: 'gravity-strategy',
    faqs: [
      { q: 'How long does it take?', a: 'About a minute from pasting the URL to reading the strategy. There is no onboarding call unless you want one.' },
      { q: 'What if the strategy is wrong?', a: 'Edit it. It is a document, not a locked configuration — and everything downstream, including the monthly plan, rebuilds against your version.' },
      { q: 'What if my website is thin or out of date?', a: 'Then it will be working from thin information, and the strategy will show that. You can add context directly, and Gravity keeps refining as it sees what actually performs.' },
    ],
    seoTitle: 'AI Marketing Strategy from Your Website URL — Gravity | Nebulaa',
    seoDescription:
      'Gravity reads your website and writes a marketing strategy from it: tone of voice, ideal customer profile, channel plan and the competitors worth watching.',
  },
  {
    slug: 'content-planning',
    agent: 'gravity',
    name: 'Content planning',
    eyebrow: 'Gravity · planning',
    headline: 'It plans the month,',
    headlineEmphasis: 'not the post.',
    subheadline:
      'A month planned in advance is the difference between posting consistently and posting when you remember. Gravity maps the whole month against your content pillars — festivals and seasons already in place — so you are never staring at an empty day.',
    summary: 'A whole month mapped against your pillars, with festivals already in it.',
    steps: [
      { title: 'The month gets mapped', body: 'Every slot planned against your content pillars, with the format chosen per platform and per objective.' },
      { title: 'Seasons are already in there', body: 'Diwali, Pongal, Onam, Ugadi and your own buying seasons are planned ahead, not remembered on the morning.' },
      { title: 'You adjust, it rebuilds', body: 'Move something, drop something, ask for more of one pillar — the rest of the month re-plans around your change.' },
    ],
    whatYouGet: [
      'A full month of planned slots, not a queue of one-off posts',
      'Format decided per slot — post, carousel or reel',
      'Festival and seasonal campaigns planned in advance',
      'An idea inbox for anything you want worked into next month',
      'Drag-and-drop rescheduling that keeps the plan coherent',
    ],
    mediaSlot: 'gravity-calendar',
    faqs: [
      { q: 'Can I plan more than a month ahead?', a: 'Yes. The monthly plan is the working unit because that is the rhythm most businesses actually operate on, but you can generate the next month whenever you want it.' },
      { q: 'What happens if I miss approving something?', a: 'It stays in the queue rather than going out unreviewed. Nothing publishes without approval unless you deliberately switch that off.' },
      { q: 'Can I add my own ideas?', a: 'That is what the idea inbox is for — drop a thought in whenever it occurs to you and it gets worked into the plan.' },
    ],
    seoTitle: 'Monthly Content Planning & Calendar — Gravity | Nebulaa',
    seoDescription:
      'Gravity plans a full month of content against your pillars, with Indian festivals and buying seasons already mapped in, and rebuilds the plan when you change it.',
  },
  {
    slug: 'create',
    agent: 'gravity',
    name: 'Content creation',
    eyebrow: 'Gravity · creation',
    headline: 'Drafted in your voice,',
    headlineEmphasis: 'not a generic one.',
    subheadline:
      'Every slot in the plan gets written — copy, creative and hashtags — in the voice the strategy captured from your own site. You are editing a draft that already sounds like you, not starting from a blank prompt box.',
    summary: 'Posts, carousels and creative drafted in your brand voice, ready to edit.',
    steps: [
      { title: 'It writes against the plan', body: 'Each slot is drafted to its brief — the pillar, the format, the platform and the objective are already decided.' },
      { title: 'Creative is generated with it', body: 'Visuals are produced alongside the copy, using your brand assets, colours and logo rather than stock templates.' },
      { title: 'You edit what needs editing', body: 'Rewrite in place, ask for another angle, or take a draft in a direction the plan did not anticipate.' },
    ],
    whatYouGet: [
      'Copy written in your brand voice, per platform',
      'Carousels and static creative generated with the copy',
      'Hashtags and first comments where the platform rewards them',
      'A prompt studio for when you want to direct it precisely',
      'Drafts you can rewrite rather than regenerate from scratch',
    ],
    faqs: [
      { q: 'Does everything sound the same?', a: 'It writes against your pillars and voice, so there is a house style — but each post is written to its own brief, not filled into a template.' },
      { q: 'Can I write some posts myself?', a: 'Yes. Write your own into any slot and the rest of the plan carries on around it.' },
      { q: 'Which languages does it write in?', a: 'English plus the regional languages your audience actually uses — relevant for festival and local-market content in particular.' },
    ],
    seoTitle: 'AI Content Creation in Your Brand Voice — Gravity | Nebulaa',
    seoDescription:
      'Gravity drafts posts, carousels and creative in your own brand voice, generated against a planned brief rather than a blank prompt box.',
  },
  {
    slug: 'reels',
    agent: 'gravity',
    name: 'Reels & video',
    eyebrow: 'Gravity · video',
    headline: 'Reels, without',
    headlineEmphasis: 'a shoot.',
    subheadline:
      'Short-form video is where reach is, and it is the first thing a small team stops making because it is the most work. Gravity builds reels scene by scene — script, visuals, pacing and audio — from the same monthly plan.',
    summary: 'Short-form video built scene by scene, from the same plan.',
    steps: [
      { title: 'The script comes from the plan', body: 'A reel slot is briefed like any other — hook, middle, call to action — against a pillar rather than a trend you have to chase.' },
      { title: 'Scenes are generated', body: 'Each scene is produced and assembled in sequence, so the reel has structure rather than being one clip with text on it.' },
      { title: 'You review before it ships', body: 'Watch it, ask for a different scene or a different hook, then approve it into the schedule.' },
    ],
    whatYouGet: [
      'Scene-by-scene reels, not single-clip templates',
      'Scripts written to hook, value and call to action',
      'Formats sized for Instagram Reels, YouTube Shorts and Facebook',
      'Reels planned into the month alongside posts and carousels',
    ],
    mediaSlot: 'reel-sample',
    faqs: [
      { q: 'How many reels can I make?', a: 'Video is the most expensive thing the system produces, so it is metered by usage rather than unlimited. A typical managed engagement runs eight a month per platform.' },
      { q: 'Can I use my own footage?', a: 'Yes — upload your own product or store footage and Gravity builds around it rather than generating everything.' },
      { q: 'How long does a reel take?', a: 'Minutes rather than hours, though a multi-scene reel takes longer than a static post. You are not waiting on a shoot or an editor either way.' },
    ],
    seoTitle: 'AI Reel & Short-Form Video Generation — Gravity | Nebulaa',
    seoDescription:
      'Gravity builds short-form reels scene by scene — script, visuals and pacing — sized for Instagram Reels, YouTube Shorts and Facebook.',
  },
  {
    slug: 'campaigns',
    agent: 'gravity',
    name: 'Campaigns',
    eyebrow: 'Gravity · campaigns',
    headline: 'A launch is not',
    headlineEmphasis: 'a single post.',
    subheadline:
      'A new collection, a festival offer, a store opening — these need a run of content that builds, not one post that disappears. Campaigns group the whole sequence, across formats and platforms, against one objective and one date.',
    summary: 'Multi-post launches planned as one sequence against one objective.',
    steps: [
      { title: 'Set the objective and the date', body: 'What is launching, when it lands, and what the campaign is for — awareness, footfall, enquiries or sales.' },
      { title: 'The sequence gets built', body: 'A run of posts, carousels and reels that builds toward the date rather than repeating the same message.' },
      { title: 'It runs and reports', body: 'The campaign publishes on schedule and reports as a unit, so you can see what the campaign did rather than what individual posts did.' },
    ],
    whatYouGet: [
      'Campaigns as a unit of work, not a folder of posts',
      'Build-up, launch and follow-through planned as a sequence',
      'Boosting for the posts worth putting money behind',
      'Reporting per campaign, not just per post',
    ],
    mediaSlot: 'gravity-campaigns',
    faqs: [
      { q: 'How is this different from just scheduling posts?', a: 'A campaign has an objective and a date, and the content is planned to build toward it. Scheduling is a queue; a campaign is a sequence.' },
      { q: 'Can I run more than one at once?', a: 'Yes — a festival campaign and a product launch can run in parallel, and the monthly plan accounts for both so your feed does not collide with itself.' },
      { q: 'Does it handle paid as well as organic?', a: 'Organic content is planned and published; individual posts can be boosted, and full paid campaign management is part of the managed service.' },
    ],
    seoTitle: 'Marketing Campaign Planning & Execution — Gravity | Nebulaa',
    seoDescription:
      'Plan launches, festival offers and openings as a single campaign — a sequence of posts, carousels and reels building to one date, reported as a unit.',
  },
  {
    slug: 'approvals',
    agent: 'gravity',
    name: 'Approvals',
    eyebrow: 'Gravity · approvals',
    headline: 'Nothing goes live',
    headlineEmphasis: 'until you say so.',
    subheadline:
      'The fear with any automated marketing tool is waking up to something you would never have written. Gravity queues everything for review — approve, rewrite or reject, from your phone, in the time it takes to drink a coffee.',
    summary: 'Everything queues for review. Approve, rewrite or reject from your phone.',
    steps: [
      { title: 'Drafts queue for review', body: 'Everything Gravity produces lands in a queue rather than going straight out.' },
      { title: 'You review in a batch', body: 'A week of content takes a few minutes to go through, because you are reacting to finished drafts rather than writing them.' },
      { title: 'Approved work schedules itself', body: 'Once approved it publishes at the time chosen for that platform and audience. Rejected work goes back for a rewrite.' },
    ],
    whatYouGet: [
      'A single review queue across every platform',
      'Approve, rewrite or reject on each item',
      'Review from your phone — no desktop needed',
      'Optional auto-publish for the accounts where you want it',
    ],
    mediaSlot: 'gravity-approval',
    faqs: [
      { q: 'Can I let it publish without me?', a: 'Yes, you can switch a channel to auto-publish. Most people leave approval on for their main brand account and automate the quieter ones.' },
      { q: 'What if I do not review for a week?', a: 'The queue holds. Nothing publishes unreviewed, so the worst case is a quiet week rather than a post you did not want.' },
      { q: 'Can someone else approve?', a: 'Yes — that is exactly how the managed service runs, with our team preparing and you or your brand head approving.' },
    ],
    seoTitle: 'Content Approval Workflow — Gravity | Nebulaa',
    seoDescription:
      'Every draft queues for review. Approve, rewrite or reject from your phone, and nothing publishes until you say so.',
  },
  {
    slug: 'competitors',
    agent: 'gravity',
    name: 'Competitor tracking',
    eyebrow: 'Gravity · competitors',
    headline: 'It watches your rivals',
    headlineEmphasis: 'and writes the reply.',
    subheadline:
      'Knowing a competitor ran a festival offer is not useful on its own. Gravity tracks what the businesses competing for your customer are publishing, and drafts the content that answers it — so you find out by being handed a post, not a report.',
    summary: 'Tracks rival content and drafts the counter-post, not just a report.',
    steps: [
      { title: 'Competitors get identified', body: 'The strategy pass works out who is competing for your customer. You can add or remove any of them.' },
      { title: 'Their content gets tracked', body: 'What they post, how often, which formats they lean on, and what is actually landing for them.' },
      { title: 'You get the counter-content', body: 'Not an alert — a drafted post that responds to the gap or the move, ready to approve.' },
    ],
    whatYouGet: [
      'Ongoing tracking of the rivals that matter locally',
      'Counter-content drafted, not just competitor alerts',
      'Format and cadence comparison against your own output',
      'Gaps worth taking — what nobody in your market is saying',
    ],
    mediaSlot: 'gravity-competitors',
    faqs: [
      { q: 'Which competitors does it track?', a: 'The ones identified from your site and market during the strategy pass, plus any you add yourself. Local rivals matter more here than national brands.' },
      { q: 'Is this just scraping their feed?', a: 'The tracking is the input, not the output. The useful part is the content drafted in response, which is what most tools stop short of.' },
      { q: 'Will my content just copy theirs?', a: 'It is written to your pillars and voice — the point is to answer a move in your own terms, not to mirror it.' },
    ],
    seoTitle: 'Competitor Tracking & Counter-Content — Gravity | Nebulaa',
    seoDescription:
      'Gravity tracks what competing businesses publish and drafts the content that answers it — a post to approve, not a report to read.',
  },
  {
    slug: 'influencers',
    agent: 'gravity',
    name: 'Influencer marketing',
    eyebrow: 'Gravity · creators',
    headline: 'Creator collaborations,',
    headlineEmphasis: 'run properly.',
    subheadline:
      'Regional creators are the most under-used channel available to an Indian brand, and the most chaotic to manage — a spreadsheet of names, a WhatsApp group and a lot of chasing. Gravity runs the whole thing: creator list, collaboration briefs, submissions, approvals and performance.',
    summary: 'Creator lists, briefs, submissions and performance in one place.',
    steps: [
      { title: 'Build the creator list', body: 'Regional micro and nano creators whose audience actually overlaps with your buyer, with their own profiles and history.' },
      { title: 'Run collaborations', body: 'Brief them, track what was agreed, and let them submit work through their own portal instead of over WhatsApp.' },
      { title: 'Review and measure', body: 'Approve submissions before they publish, then see what each creator actually delivered.' },
    ],
    whatYouGet: [
      'A managed creator roster rather than a spreadsheet',
      'Collaboration briefs with what was agreed recorded against them',
      'A creator-facing portal for submitting work',
      'Submission review before anything goes live',
      'Per-creator performance, so you know who to work with again',
    ],
    mediaSlot: 'gravity-influencers',
    faqs: [
      { q: 'Do you find the creators for me?', a: 'Sourcing and coordination are part of the managed service. On the self-serve product you manage the roster yourself, with the tooling to do it properly.' },
      { q: 'Who pays the creators?', a: 'Creator fees are billed at actuals and are separate from the retainer — never marked up, never absorbed silently.' },
      { q: 'Can creators see my whole account?', a: 'No. Creators get a portal scoped to their own collaborations and submissions.' },
    ],
    seoTitle: 'Influencer & Creator Collaboration Management — Gravity | Nebulaa',
    seoDescription:
      'Manage regional creators end to end: roster, collaboration briefs, a creator submission portal, approvals and per-creator performance.',
  },
  {
    slug: 'unified-inbox',
    agent: 'gravity',
    name: 'Unified inbox',
    eyebrow: 'Gravity · inbox',
    headline: 'Every comment and DM,',
    headlineEmphasis: 'in one place.',
    subheadline:
      'Publishing is only half of social. The other half is the comments, DMs and questions that arrive afterwards — across every platform, at every hour. Gravity pulls them into one inbox and drafts the replies.',
    summary: 'Comments, DMs and mentions across platforms, with replies drafted.',
    steps: [
      { title: 'Everything lands in one place', body: 'Comments, direct messages and mentions from every connected platform, in a single stream.' },
      { title: 'Replies get drafted', body: 'Context-aware responses written in your voice, ready to send, edit or ignore.' },
      { title: 'Rules handle the repetitive ones', body: 'Auto-reply settings deal with the questions you answer twenty times a week, so you only see the ones that need you.' },
    ],
    whatYouGet: [
      'One inbox across every connected platform',
      'Drafted replies rather than a blank box',
      'Auto-reply rules for repetitive questions',
      'Nothing sitting unanswered for days because it was on the wrong app',
    ],
    mediaSlot: 'gravity-inbox',
    faqs: [
      { q: 'How is this different from Pulsar?', a: 'Gravity handles public social conversation — comments, mentions, DMs on your posts. Pulsar handles sales enquiries on WhatsApp, email and SMS, and qualifies them. Most businesses want both, which is why they are priced together.' },
      { q: 'Will it reply without me?', a: 'Only to what you set auto-reply rules for. Everything else is drafted and waits for you.' },
      { q: 'Does it cover reviews?', a: 'Comments, DMs and mentions on connected platforms today. Google Business reviews are part of the managed service.' },
    ],
    seoTitle: 'Unified Social Inbox with Drafted Replies — Gravity | Nebulaa',
    seoDescription:
      'Comments, DMs and mentions from every connected platform in one inbox, with context-aware replies drafted in your brand voice.',
  },
  {
    slug: 'seo-assistant',
    agent: 'gravity',
    name: 'SEO assistant',
    eyebrow: 'Gravity · SEO',
    headline: 'The searches you are',
    headlineEmphasis: 'not showing up for.',
    subheadline:
      'Social gets you known; search gets you found by someone already looking. The SEO assistant works out which terms your customers actually use, what your competitors rank for that you do not, and what to fix.',
    summary: 'Keywords, metadata, hashtags and search-side competitor gaps.',
    steps: [
      { title: 'Find the terms that matter', body: 'What your customers actually type, including the local and regional phrasing national tools miss.' },
      { title: 'See the gaps', body: 'Where competitors are visible and you are not, on the terms with real buying intent behind them.' },
      { title: 'Fix what is fixable', body: 'Metadata, descriptions and hashtag sets, generated against the terms worth winning.' },
    ],
    whatYouGet: [
      'Keyword research weighted to how Indian customers search',
      'Competitor visibility gaps on search, not just social',
      'Metadata and description generation',
      'Hashtag sets built from search behaviour rather than guesswork',
    ],
    mediaSlot: 'gravity-seo',
    faqs: [
      { q: 'Does this replace an SEO agency?', a: 'For a small business it covers the fundamentals most agencies charge a retainer for. Technical SEO on a large site is a different job.' },
      { q: 'Does it work for local search?', a: 'That is the case it is most useful for — "near me" and city-qualified searches are where a local business gets found.' },
      { q: 'Will it write blog posts too?', a: 'It handles the search side — terms, metadata, gaps. Long-form content is part of the managed service.' },
    ],
    seoTitle: 'SEO Assistant — Keywords, Metadata & Gaps | Gravity by Nebulaa',
    seoDescription:
      'Find the search terms your customers use, the gaps where competitors are visible and you are not, and generate the metadata to fix it.',
  },
  {
    slug: 'brand-assets',
    agent: 'gravity',
    name: 'Brand assets',
    eyebrow: 'Gravity · assets',
    headline: 'Your logo, colours and',
    headlineEmphasis: 'products, on file.',
    subheadline:
      'Generated creative only looks like your brand if the system knows what your brand looks like. Gravity keeps your logo, palette, product photography and store imagery on hand, and builds every visual from them.',
    summary: 'Logo, palette, product and store imagery, used in every generated visual.',
    steps: [
      { title: 'Upload once', body: 'Logo, brand colours, product shots and store or facility imagery.' },
      { title: 'Everything is built from them', body: 'Generated creative uses your actual assets rather than stock that vaguely matches.' },
      { title: 'Inventory stays current', body: 'Add products as they launch and they become available to the content plan straight away.' },
    ],
    whatYouGet: [
      'A brand asset library the content engine actually draws on',
      'Product inventory that content can be planned around',
      'Store and environment imagery for backgrounds and context',
      'Consistent use of your logo and palette across every format',
    ],
    faqs: [
      { q: 'What if I do not have good product photography?', a: 'Gravity can generate product visuals from what you have. Photography is also part of the managed service if you want the real thing.' },
      { q: 'Can I have more than one brand?', a: 'Yes — separate brands are kept separate, which matters if you run multiple businesses or manage client accounts.' },
      { q: 'Who owns the assets and the output?', a: 'You do. Accounts, content and data are in your name and leave with you if you go.' },
    ],
    seoTitle: 'Brand Asset Library & Product Inventory — Gravity | Nebulaa',
    seoDescription:
      'Keep your logo, palette, product photography and store imagery on file so every generated visual is built from your actual brand.',
  },
  {
    slug: 'ai-memory',
    agent: 'gravity',
    name: 'AI memory',
    eyebrow: 'Gravity · memory',
    headline: 'It gets better',
    headlineEmphasis: 'the longer it runs.',
    subheadline:
      'A tool that starts from zero every session never gets good at your business. Gravity remembers what it wrote, what you changed, what performed and what you rejected — and the work in month six is better than the work in month one because of it.',
    summary: 'Remembers what worked, what you changed, and what you rejected.',
    steps: [
      { title: 'It records what happened', body: 'What was published, what you edited before approving, and what you turned down outright.' },
      { title: 'Performance feeds back', body: 'What actually landed with your audience, per format and per pillar.' },
      { title: 'The next month reflects it', body: 'The plan and the drafts shift toward what works for you specifically, not what works on average.' },
    ],
    whatYouGet: [
      'Memory that persists across months, not just a session',
      'Your edits treated as signal, not discarded',
      'Format and pillar performance folded into future planning',
      'A visible history of what the system has learned about you',
    ],
    mediaSlot: 'gravity-ai-memory',
    faqs: [
      { q: 'Can I see what it has learned?', a: 'Yes, the memory is inspectable — you can read what it believes about your brand and correct it if it has drawn the wrong conclusion.' },
      { q: 'Can I reset it?', a: 'Yes. A rebrand or a change of direction is a good reason to, and you can correct individual entries without wiping everything.' },
      { q: 'Is my data used to train anything else?', a: 'Your brand memory is yours and scoped to your account.' },
    ],
    seoTitle: 'AI Brand Memory — Learns Your Business Over Time | Gravity',
    seoDescription:
      'Gravity remembers what it wrote, what you edited, what you rejected and what performed — so month six is better than month one.',
  },
  {
    slug: 'upload-schedule',
    agent: 'gravity',
    name: 'Upload & schedule',
    eyebrow: 'Gravity · publishing',
    headline: 'Published at the hour',
    headlineEmphasis: 'your audience is awake.',
    subheadline:
      'Bring your own creative when you have it, and let the scheduling be handled properly — each platform, each format, at the time your audience is actually active rather than whenever you happened to hit post.',
    summary: 'Bulk upload your own creative and schedule to peak hours per platform.',
    steps: [
      { title: 'Upload what you already have', body: 'Your own photography, video or designs, in bulk rather than one at a time.' },
      { title: 'Format per platform', body: 'The same asset sized and framed correctly for each destination, with copy adapted per platform.' },
      { title: 'Schedule to the right hour', body: 'Publishing times chosen per platform and per audience, in your timezone.' },
    ],
    whatYouGet: [
      'Bulk upload rather than one post at a time',
      'Per-platform formatting and preview before it goes',
      'Timezone-correct scheduling to peak hours',
      'Your own creative and generated creative in the same queue',
    ],
    mediaSlot: 'gravity-upload',
    faqs: [
      { q: 'Can I mix my own content with generated content?', a: 'Yes, and most people do. The plan accommodates both in the same calendar.' },
      { q: 'Which platforms can it publish to?', a: 'Instagram, Facebook, LinkedIn, X and YouTube for short-form, with Google Business as part of the managed service.' },
      { q: 'What if a platform rejects a post?', a: 'It surfaces as a failure you can see and retry rather than disappearing silently.' },
    ],
    seoTitle: 'Bulk Upload & Smart Scheduling — Gravity | Nebulaa',
    seoDescription:
      'Upload your own creative in bulk, format it per platform, and schedule to the hours your audience is actually active.',
  },
  {
    slug: 'analytics',
    agent: 'gravity',
    name: 'Analytics',
    eyebrow: 'Gravity · analytics',
    headline: 'What worked,',
    headlineEmphasis: 'and what to do next.',
    subheadline:
      'A dashboard that tells you engagement went up does not tell you what to do on Monday. Gravity reports across platforms, attributes it to pillars and formats, and turns it into the next month\'s plan.',
    summary: 'Cross-platform performance, tied back to pillars and next month\'s plan.',
    steps: [
      { title: 'Everything in one view', body: 'Performance across every connected platform, rather than five separate native dashboards.' },
      { title: 'Attributed to the work', body: 'Which pillar, which format, which campaign — not just which post.' },
      { title: 'Fed into next month', body: 'The findings shape the next plan automatically, and the monthly report says what changed and why.' },
    ],
    whatYouGet: [
      'Cross-platform reporting in one place',
      'Performance by pillar, format and campaign',
      'A monthly report written in plain language',
      'Findings that actually change the next plan',
    ],
    mediaSlot: 'gravity-analytics',
    faqs: [
      { q: 'Which metrics does it report?', a: 'Reach, engagement, follower movement and per-post performance across connected platforms, plus campaign-level totals.' },
      { q: 'Can I export it?', a: 'Yes — the monthly report is the format the managed service uses with clients.' },
      { q: 'Does it track conversions?', a: 'It tracks what the platforms expose plus enquiries handed over by Pulsar. Full revenue attribution needs your CRM in the loop.' },
    ],
    seoTitle: 'Cross-Platform Marketing Analytics — Gravity | Nebulaa',
    seoDescription:
      'Performance across every connected platform, attributed to pillars, formats and campaigns, and fed into the next month\'s plan.',
  },
]

export function getCapability(agent: AgentId, slug: string): Capability | undefined {
  return capabilities.find(c => c.agent === agent && c.slug === slug)
}

export function capabilitiesFor(agent: AgentId): Capability[] {
  return capabilities.filter(c => c.agent === agent)
}
