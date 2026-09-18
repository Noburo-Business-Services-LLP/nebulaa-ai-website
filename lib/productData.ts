/**
 * Product pages for Gravity and Pulsar.
 *
 * Every capability here maps to a module that actually ships in the app —
 * taken from the Gravity and Pulsar codebases rather than from marketing copy.
 * If something isn't built, it doesn't get a page.
 */

export type AgentId = 'gravity' | 'pulsar' | 'orbit'

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
  /** What sits next to the price on the hub page. Defaults to the standard trial line. */
  priceNote?: string
  /** Overrides the default "Start free trial → /pricing" CTA — for a product that isn't self-serve yet. */
  cta?: { label: string; href: string }
  seoTitle: string
  seoDescription: string
}

export const agents: Record<AgentId, Agent> = {
  gravity: {
    id: 'gravity',
    name: 'Gravity',
    tagline: 'AI content & social media engine',
    eyebrow: 'Gravity // content',
    headline: 'Stop planning content.',
    headlineEmphasis: 'Start approving it.',
    subheadline:
      'Gravity is the AI content and social media engine behind all of it: it reads your website, builds a strategy from it, plans the month, drafts every post, carousel and reel to fill that month, and waits for you to tap approve. It also runs your campaigns, your creator collaborations, your inbox and your SEO — most of which nobody realises it does.',
    price: '₹15,000 / month',
    seoTitle: 'Gravity — AI Content & Social Media Engine',
    seoDescription:
      'Gravity remembers the business, plans the work, creates content, manages approvals, publishes across channels and monitors what happens.',
  },
  pulsar: {
    id: 'pulsar',
    name: 'Pulsar',
    tagline: 'AI outreach engine',
    eyebrow: 'Pulsar // engagement',
    headline: 'Whoever replies first',
    headlineEmphasis: 'wins the sale.',
    subheadline:
      'Pulsar is the AI outreach engine that answers every enquiry on WhatsApp, email and SMS within minutes, asks the questions you would have asked, scores what comes back, and hands you only the people worth your afternoon. Broadcasts, automation and voice calling run from the same place.',
    price: '₹15,000 / month',
    seoTitle: 'Pulsar — AI Outreach Engine',
    seoDescription:
      'A lead shouldn\'t disappear because no one followed up. Pulsar responds, qualifies and routes conversations across WhatsApp, email, SMS and voice.',
  },
  orbit: {
    id: 'orbit',
    name: 'Orbit',
    tagline: 'AI lead generation engine',
    eyebrow: 'Orbit // lead generation',
    headline: 'Before there is a conversation,',
    headlineEmphasis: 'there has to be a lead worth having.',
    subheadline:
      'Orbit is the AI lead generation engine that finds real businesses matching who you sell to, keeps only the ones worth calling, finds a real contact email even when Google never gives you one, drafts the first outreach message, and puts the whole thing straight into your CRM — assigned to a rep, ready to work. Gravity and Pulsar take it from there.',
    price: '₹15,000 / month',
    seoTitle: 'Orbit — AI Lead Generation Engine',
    seoDescription:
      'Finding leads is easy. Orbit finds the right ones — turning your ICP into a prospecting engine that sources, qualifies and hands off to Pulsar.',
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
      'This is an AI marketing strategy from website URL alone, no brief required. Gravity starts from your URL: it works out how you talk, who buys from you, which channels are worth your time, and who you are actually competing against — then writes the strategy everything else runs from.',
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
    seoTitle: 'AI Marketing Strategy from Your Website — Gravity',
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
      'This is a monthly content calendar that builds itself: a month planned in advance is the difference between posting consistently and posting when you remember. Gravity maps the whole month against your content pillars — festivals and seasons already in place — so you are never staring at an empty day.',
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
    seoTitle: 'Monthly Content Planning & Calendar — Gravity',
    seoDescription:
      'Gravity plans a full month of content against your pillars, with festivals and buying seasons mapped in, and rebuilds when you change it.',
  },
  {
    slug: 'create',
    agent: 'gravity',
    name: 'Content creation',
    eyebrow: 'Gravity · creation',
    headline: 'Drafted in your voice,',
    headlineEmphasis: 'not a generic one.',
    subheadline:
      'This is AI content creation in your brand voice, not a generic one: every slot in the plan gets written — copy, creative and hashtags — in the voice the strategy captured from your own site. You are editing a draft that already sounds like you, not starting from a blank prompt box.',
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
    seoTitle: 'AI Content Creation in Your Brand Voice — Gravity',
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
      'This is AI reel generation without a shoot: short-form video is where reach is, and it is the first thing a small team stops making because it is the most work. Gravity builds reels scene by scene — script, visuals, pacing and audio — from the same monthly plan.',
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
    seoTitle: 'AI Reel & Short-Form Video Generation — Gravity',
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
      'This is marketing campaign planning for a launch, not a single post: a new collection, a festival offer, a store opening — these need a run of content that builds. Campaigns group the whole sequence, across formats and platforms, against one objective and one date.',
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
    seoTitle: 'Marketing Campaign Planning & Execution — Gravity',
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
      'This is a content approval workflow built for the fear that comes with any automated marketing tool: waking up to something you would never have written. Gravity queues everything for review — approve, rewrite or reject, from your phone, in the time it takes to drink a coffee.',
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
    seoTitle: 'Content Approval Workflow — Gravity',
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
      'This is a competitor tracking tool that hands you a post, not a report: knowing a competitor ran a festival offer is not useful on its own. Gravity tracks what the businesses competing for your customer are publishing, and drafts the content that answers it.',
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
    seoTitle: 'Competitor Tracking & Counter-Content — Gravity',
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
      'Gravity is the influencer collaboration management tool built for this: regional creators are the most under-used channel available to an Indian brand, and the most chaotic to manage — a spreadsheet of names, a WhatsApp group and a lot of chasing. Gravity runs the whole thing.',
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
    seoTitle: 'Influencer & Creator Collaboration — Gravity',
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
      'Publishing is only half of social. The other half is the comments, DMs and questions that arrive afterwards — across every platform, at every hour. Gravity\'s unified social media inbox pulls them into one place and drafts the replies.',
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
    seoTitle: 'Unified Social Inbox with Drafted Replies',
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
      'Social gets you known; search gets you found by someone already looking. The AI SEO assistant works out which terms your customers actually use, what your competitors rank for that you do not, and what to fix.',
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
    seoTitle: 'AI SEO Assistant — Keywords & Metadata',
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
      'This brand asset library is why generated creative actually looks like your brand: generated creative only looks like your brand if the system knows what your brand looks like. Gravity keeps your logo, palette, product photography and store imagery on hand, and builds every visual from them.',
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
    seoTitle: 'Brand Asset Library & Product Inventory — Gravity',
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
      'Gravity\'s AI brand memory for marketing means it never starts from zero: it remembers what it wrote, what you changed, what performed and what you rejected — and the work in month six is better than the work in month one because of it.',
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
    seoTitle: 'AI Brand Memory — Learns Your Business | Gravity',
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
      'This social media scheduling tool handles the timing properly: bring your own creative when you have it, and let it schedule each platform, each format, at the time your audience is actually active rather than whenever you happened to hit post.',
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
    seoTitle: 'Bulk Upload & Smart Scheduling — Gravity',
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
      'This cross-platform marketing analytics view does more than a dashboard that tells you engagement went up: it does not tell you what to do on Monday. Gravity reports across platforms, attributes it to pillars and formats, and turns it into the next month\'s plan.',
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
    seoTitle: 'Cross-Platform Marketing Analytics — Gravity',
    seoDescription:
      'Performance across every connected platform, attributed to pillars, formats and campaigns, and fed into the next month\'s plan.',
  },
  // ───────────────────────────── Pulsar ─────────────────────────────
  {
    slug: 'whatsapp',
    agent: 'pulsar',
    name: 'WhatsApp',
    eyebrow: 'Pulsar · WhatsApp',
    headline: 'The channel your customers',
    headlineEmphasis: 'actually use.',
    subheadline:
      'This is WhatsApp enquiry automation built for India: the enquiry does not arrive by email, it arrives on WhatsApp, often at nine on a Sunday night, and whoever replies first usually gets the sale. Pulsar answers in minutes, in your voice.',
    summary: 'Replies to WhatsApp enquiries in minutes, in your voice.',
    steps: [
      { title: 'The enquiry lands', body: 'Someone messages your business number — from an ad, a post, your Google listing or a friend passing on the number.' },
      { title: 'Pulsar replies in minutes', body: 'Not a menu tree. A reply that answers what they asked and moves the conversation toward what you need to know.' },
      { title: 'You get the ones that matter', body: 'Budget, timeline and fit established before it reaches you, with the full conversation attached.' },
    ],
    whatYouGet: [
      'Replies within minutes, day or night',
      'Conversation rather than a keyword auto-responder',
      'Questions asked in the order a good salesperson would ask them',
      'Handover with the whole thread, not just a name and number',
      'Official WhatsApp Business API, not a phone farm',
    ],
    mediaSlot: 'pulsar-whatsapp',
    faqs: [
      { q: 'Is this the official WhatsApp API?', a: 'Yes. That matters — unofficial workarounds get numbers banned, usually at the worst possible moment.' },
      { q: 'Will customers know it is not me?', a: 'It writes in your voice and it does not pretend to be a person with a name. Most enquiries are answered and handed over before that question comes up.' },
      { q: 'What happens outside business hours?', a: 'That is when it earns its keep. An enquiry at 9pm Sunday gets answered at 9pm Sunday rather than Monday morning, by which point they have messaged someone else.' },
    ],
    seoTitle: 'WhatsApp Enquiry Automation — Pulsar',
    seoDescription:
      'Pulsar answers WhatsApp enquiries in minutes on the official Business API, qualifies budget, timeline and fit, and hands over the full conversation.',
  },
  {
    slug: 'leads',
    agent: 'pulsar',
    name: 'Leads & scoring',
    eyebrow: 'Pulsar · leads',
    headline: 'Your day starts at',
    headlineEmphasis: 'the top of the list.',
    subheadline:
      'This is lead scoring and qualification built into the conversation itself: most enquiries are not ready to buy, and finding the few that are is what eats the morning. Every conversation is scored on what was actually said, so the list you open is ordered by who is worth calling first.',
    summary: 'Every conversation scored on intent, so the list is already ordered.',
    steps: [
      { title: 'Every enquiry becomes a record', body: 'Contact details, source, the full conversation and what was established during it.' },
      { title: 'It gets scored', body: 'Budget, timeline, fit and how the conversation actually went — not just whether a form was filled in.' },
      { title: 'You work the top of the list', body: 'The people ready to move are at the top. The rest stay warm rather than being lost.' },
    ],
    whatYouGet: [
      'A scored lead list rather than an inbox',
      'Full conversation history on every record',
      'Source attribution, so you know which channel produced what',
      'Unlimited contacts — no per-contact pricing',
      'CRM-ready exports when you want the data elsewhere',
    ],
    mediaSlot: 'pulsar-leads',
    faqs: [
      { q: 'How is the score calculated?', a: 'From what was established in conversation — budget, timeline, fit and buying signals — rather than a form-fill or a page view.' },
      { q: 'Can I change the criteria?', a: 'Yes. What counts as a good lead for a jewellery showroom is not what counts for a chit fund, and the scoring reflects your business.' },
      { q: 'Does it work with my CRM?', a: 'Exports are CRM-ready. Direct integrations depend on which CRM you run — worth a conversation.' },
    ],
    seoTitle: 'Lead Scoring & Qualification — Pulsar',
    seoDescription:
      'Every enquiry is scored on budget, timeline and fit from the conversation itself, so your list is ordered by who is actually worth calling.',
  },
  {
    slug: 'broadcasts',
    agent: 'pulsar',
    name: 'Broadcasts',
    eyebrow: 'Pulsar · broadcasts',
    headline: 'Reach everyone at once,',
    headlineEmphasis: 'without sounding like spam.',
    subheadline:
      'This is WhatsApp broadcast marketing done right: a new scheme, a festival offer, a new collection — sometimes you need to tell everyone. Broadcasts send to a segment of your contacts and, crucially, handle every reply as a real conversation.',
    summary: 'Segment, send, and handle every reply as a conversation.',
    steps: [
      { title: 'Pick who it goes to', body: 'Segment by source, score, past interest or how recently they were in touch — not just everyone in the list.' },
      { title: 'Send it', body: 'One message, personalised per recipient, sent within WhatsApp policy rather than around it.' },
      { title: 'Replies become conversations', body: 'The point most broadcast tools stop at. Everyone who replies gets a real answer, qualified and scored like any other enquiry.' },
    ],
    whatYouGet: [
      'Segmented sends rather than one list for everything',
      'Per-recipient personalisation',
      'Every reply handled as a conversation, not a dead end',
      'Delivery and response reporting per broadcast',
    ],
    mediaSlot: 'pulsar-broadcasts',
    faqs: [
      { q: 'Will this get my number banned?', a: 'Not if it is done inside WhatsApp policy on the official API, which is how this sends. Bulk blasting from an unofficial tool is what gets numbers banned.' },
      { q: 'What if a hundred people reply at once?', a: 'That is the case this is built for. Every reply gets answered and qualified in parallel rather than queuing behind your team.' },
      { q: 'Can I broadcast on email and SMS too?', a: 'Yes — the same segment can be reached on whichever channel that contact actually responds on.' },
    ],
    seoTitle: 'WhatsApp Broadcast Marketing — Pulsar',
    seoDescription:
      'Send segmented, personalised broadcasts on the official WhatsApp API, and have every reply handled as a qualified conversation.',
  },
  {
    slug: 'voice-calling',
    agent: 'pulsar',
    name: 'Voice calling',
    eyebrow: 'Pulsar · voice',
    headline: 'For the moments a call',
    headlineEmphasis: 'still beats a message.',
    subheadline:
      'This automated call queue handles the cases a message can\'t: most of the time a message is better — it is on the customer\'s terms and it leaves a record. But some enquiries deserve a call, and some people simply do not reply to text. It handles those without anyone dialling manually.',
    summary: 'A call queue for the enquiries where a message is not enough.',
    steps: [
      { title: 'A call gets queued', body: 'Triggered by a score threshold, an unanswered message thread, or a rule you set.' },
      { title: 'The call is made', body: 'Working through the queue in priority order rather than whenever someone gets to it.' },
      { title: 'The outcome is recorded', body: 'What happened on the call lands on the lead record alongside the message history.' },
    ],
    whatYouGet: [
      'A managed call queue rather than a manual dial list',
      'Calls triggered by score or by silence on other channels',
      'Outcomes recorded against the lead',
      'Used where it helps — messaging stays the primary channel',
    ],
    mediaSlot: 'pulsar-callqueue',
    faqs: [
      { q: 'Why is voice last on the list?', a: 'Because in this market it usually should be. WhatsApp gets answered, calls from unknown numbers often do not. Voice is there for the cases where it genuinely works better.' },
      { q: 'Does it call people who did not ask to be contacted?', a: 'It works your own enquiries and contacts. It is not a cold-calling machine.' },
      { q: 'Can my team take over a call?', a: 'Yes — the queue is a way of making sure calls happen in the right order, not of removing your team from the conversation.' },
    ],
    seoTitle: 'Automated Call Queue for Sales Follow-up — Pulsar',
    seoDescription:
      'A managed call queue that works your enquiries in priority order, triggered by lead score or silence on other channels, with outcomes recorded.',
  },
  {
    slug: 'ai-agents',
    agent: 'pulsar',
    name: 'AI agents',
    eyebrow: 'Pulsar · agents',
    headline: 'Different conversations',
    headlineEmphasis: 'need different agents.',
    subheadline:
      'These are configurable AI sales agents, not one generic responder: the way you answer a bridal jewellery enquiry is not the way you answer a dealer asking about bulk pricing. Configure separate agents with their own brief, tone and rules, and route each conversation to the right one.',
    summary: 'Separate agents per conversation type, each with its own brief and tone.',
    steps: [
      { title: 'Define the agent', body: 'What it handles, how it should sound, what it must always ask and what it must never say.' },
      { title: 'Route conversations to it', body: 'By channel, by source, by product line or by what the customer opens with.' },
      { title: 'Refine as you learn', body: 'Adjust the brief as you see real conversations, and the change applies from the next message on.' },
    ],
    whatYouGet: [
      'Multiple agents rather than one generic responder',
      'Per-agent tone, brief and guardrails',
      'Routing by channel, source or product line',
      'Explicit rules for what an agent must never claim',
    ],
    faqs: [
      { q: 'How many agents can I run?', a: 'As many as you have genuinely distinct conversation types. Most businesses need two or three, not ten.' },
      { q: 'Can I stop it saying certain things?', a: 'Yes, and you should. Pricing you do not want quoted, promises you cannot keep, claims you are not allowed to make — those are explicit guardrails.' },
      { q: 'What happens if it does not know an answer?', a: 'It says so and hands over, rather than inventing something. That behaviour is the whole point of the knowledge base.' },
    ],
    seoTitle: 'Configurable AI Sales Agents — Pulsar',
    seoDescription:
      'Run separate AI agents for different conversation types, each with its own brief, tone, routing rules and guardrails.',
  },
  {
    slug: 'automation',
    agent: 'pulsar',
    name: 'Automation',
    eyebrow: 'Pulsar · automation',
    headline: 'Follow-up that happens',
    headlineEmphasis: 'whether you remember or not.',
    subheadline:
      'This is sales follow-up automation that stays visible: most lost sales are not lost to a competitor, they are lost to nobody following up on day four. Sequences handle the chasing — and the monitor shows you exactly what is running, so it never becomes something happening behind your back.',
    summary: 'Follow-up sequences that run themselves, with a live monitor.',
    steps: [
      { title: 'Build the sequence', body: 'What happens on day one, day three, day seven — and on which channel each step goes out.' },
      { title: 'It runs on its own', body: 'Triggered by score, silence, or where the lead has reached in the conversation.' },
      { title: 'You watch it work', body: 'The monitor shows what is running, what fired, what stalled and what a person needs to pick up.' },
    ],
    whatYouGet: [
      'Multi-step follow-up across WhatsApp, email and SMS',
      'Triggers on score, silence or conversation stage',
      'A live monitor rather than a black box',
      'Sequences that stop the moment a real conversation starts',
    ],
    mediaSlot: 'pulsar-automation',
    faqs: [
      { q: 'What stops it pestering people?', a: 'A sequence stops as soon as the person replies, and stops permanently if they ask it to. Chasing someone who has answered is how you lose them.' },
      { q: 'Can I see what is running right now?', a: 'That is what the automation monitor is for — which sequences are active, what fired, what stalled.' },
      { q: 'What if something goes wrong?', a: 'Stalled runs surface rather than failing quietly, so you find out from the monitor and not from a customer.' },
    ],
    seoTitle: 'Follow-up Automation & Monitoring — Pulsar',
    seoDescription:
      'Multi-step follow-up across WhatsApp, email and SMS, triggered by score or silence, with a live monitor showing what is running.',
  },
  {
    slug: 'knowledge-base',
    agent: 'pulsar',
    name: 'Knowledge base',
    eyebrow: 'Pulsar · knowledge',
    headline: 'It only answers',
    headlineEmphasis: 'what you have told it.',
    subheadline:
      'This AI sales agent knowledge base is the boundary: your products, policies, schemes and answers, and an instruction to hand over rather than guess. An agent that invents an answer about your pricing is worse than no agent at all.',
    summary: 'Your products, policies and answers — the boundary it works inside.',
    steps: [
      { title: 'Load what it needs to know', body: 'Products, pricing rules, schemes, policies, delivery terms and the questions you answer every week.' },
      { title: 'It answers from that', body: 'Grounded in what you provided, in your own phrasing, rather than a plausible-sounding guess.' },
      { title: 'Gaps become handovers', body: 'Anything outside the boundary goes to a person, and shows up as something worth adding.' },
    ],
    whatYouGet: [
      'A single source the agents answer from',
      'Handover instead of invention when something is missing',
      'Visibility of the questions it could not answer',
      'Updates that apply from the next message onward',
    ],
    faqs: [
      { q: 'What stops it making things up?', a: 'It answers from the knowledge base and hands over when something is not in it. Getting your terms wrong in writing is a real cost, so the default is to defer.' },
      { q: 'How much do I need to load in?', a: 'Start with the twenty questions you answer every week. That covers most enquiries, and the gaps report tells you what to add next.' },
      { q: 'Can different agents know different things?', a: 'Yes — a dealer agent and a retail agent should not be working from the same pricing.' },
    ],
    seoTitle: 'AI Sales Agent Knowledge Base — Pulsar',
    seoDescription:
      'Load your products, policies and schemes so agents answer from what you actually told them, and hand over rather than guess.',
  },
  {
    slug: 'email-sms',
    agent: 'pulsar',
    name: 'Email & SMS',
    eyebrow: 'Pulsar · channels',
    headline: 'Reach people where',
    headlineEmphasis: 'they actually reply.',
    subheadline:
      'This is email and SMS outreach alongside WhatsApp, not instead of it: WhatsApp carries most of the conversation in this market, but not all of it. Some buyers want email, some only see an SMS, and a dealer network often runs on both. Pulsar works all three from one thread.',
    summary: 'Email and SMS alongside WhatsApp, in one conversation thread.',
    steps: [
      { title: 'One contact, several channels', body: 'A person is one record, whichever channel they came in on.' },
      { title: 'It replies where they wrote', body: 'And can follow up on another channel when the first goes quiet.' },
      { title: 'The thread stays whole', body: 'You read one conversation, not three fragments in three tools.' },
    ],
    whatYouGet: [
      'Email and SMS handled alongside WhatsApp',
      'A single thread per person across channels',
      'Channel fallback when one goes unanswered',
      'The same qualification and scoring on every channel',
    ],
    faqs: [
      { q: 'Which channel should I lead with?', a: 'WhatsApp, in almost every case in India. Email and SMS are for the buyers and dealers who genuinely prefer them.' },
      { q: 'Can it send bulk email?', a: 'Broadcasts work across channels. Large newsletter sends are a different job and belong in a newsletter tool.' },
      { q: 'Do I need separate numbers?', a: 'One business number for WhatsApp and SMS is normal. Email uses your own domain.' },
    ],
    seoTitle: 'Email & SMS Outreach Alongside WhatsApp — Pulsar',
    seoDescription:
      'Handle email and SMS in the same thread as WhatsApp, with channel fallback and the same qualification on every channel.',
  },
  {
    slug: 'tasks-activities',
    agent: 'pulsar',
    name: 'Tasks & activities',
    eyebrow: 'Pulsar · workflow',
    headline: 'The handover is where',
    headlineEmphasis: 'most leads die.',
    subheadline:
      'This is lead handover and task tracking for the moment qualifying a lead stops being enough: somebody then has to do something about it. Tasks put the follow-up on a named person with a date, and the activity trail shows what actually happened rather than what was meant to.',
    summary: 'Named owners, dated follow-ups, and a trail of what actually happened.',
    steps: [
      { title: 'A qualified lead becomes a task', body: 'Assigned to a person with a date, not dropped into a shared inbox to be noticed.' },
      { title: 'Activity is recorded', body: 'Calls, messages, notes and outcomes, all against the lead.' },
      { title: 'You can see the gap', body: 'What was promised versus what was done, per person and per lead.' },
    ],
    whatYouGet: [
      'Follow-up assigned to a person with a due date',
      'A full activity trail per lead',
      'Per-person performance you can actually see',
      'A calendar view of what is due',
    ],
    faqs: [
      { q: 'Is this a CRM?', a: 'It covers the conversation-to-handover part of one properly. If you already run a CRM, Pulsar feeds it rather than replacing it.' },
      { q: 'Can I see how my team is doing?', a: 'Yes — response times, follow-through and outcomes per person.' },
      { q: 'What if a task is missed?', a: 'It surfaces as overdue rather than quietly disappearing, which is the entire point.' },
    ],
    seoTitle: 'Lead Handover, Tasks & Activity Tracking — Pulsar',
    seoDescription:
      'Turn qualified leads into dated tasks with named owners, and keep a full activity trail of what actually happened.',
  },
  {
    slug: 'analytics',
    agent: 'pulsar',
    name: 'Analytics',
    eyebrow: 'Pulsar · analytics',
    headline: 'How fast you answer,',
    headlineEmphasis: 'and what it is worth.',
    subheadline:
      'This is response time and conversion analytics for the number that moves sales most in this market, and almost nobody measures it. Pulsar reports it — by channel, by agent and by person — alongside what those conversations turned into.',
    summary: 'Response time, conversion and per-person performance.',
    steps: [
      { title: 'Every conversation is timed', body: 'From enquiry to first reply, and through to handover.' },
      { title: 'Outcomes get attached', body: 'What each source and channel actually produced, not just how many messages came in.' },
      { title: 'You see who is slow', body: 'By channel, by agent and by team member — including where handovers stall.' },
    ],
    whatYouGet: [
      'Response time as a first-class metric',
      'Conversion by source and channel',
      'Per-person performance on follow-through',
      'Where in the funnel conversations stall',
    ],
    faqs: [
      { q: 'What is a good response time?', a: 'Minutes, not hours. The gap between a two-minute reply and a two-hour reply is usually larger than the gap between a good pitch and a bad one.' },
      { q: 'Does it measure my team as well as the agent?', a: 'Yes. The agent replies fast by design; the handover is usually where the delay actually is.' },
      { q: 'Can I export this?', a: 'Yes, and it is part of the monthly report on managed engagements.' },
    ],
    seoTitle: 'Response Time & Conversion Analytics — Pulsar',
    seoDescription:
      'Measure response time by channel, agent and team member, alongside what those conversations converted into.',
  },
  // ───────────────────────────── Orbit ─────────────────────────────
  {
    slug: 'lead-sourcing',
    agent: 'orbit',
    name: 'Lead sourcing',
    eyebrow: 'Orbit · sourcing',
    headline: 'Real businesses,',
    headlineEmphasis: 'not a scraped list.',
    subheadline:
      'This is AI lead sourcing from Google Maps, not a scraped list: tell Orbit what you sell and who buys it — a category, a location. It searches Google Maps and a second, independent source for the same area, so one provider going quiet does not stop the list from filling.',
    summary: 'Searches Google Maps and a second source for real businesses matching your target.',
    steps: [
      { title: 'Describe the target', body: 'A business type and a location — "gyms in Chennai," "interior designers in Coimbatore." No list to upload.' },
      { title: 'It searches two sources', body: 'Google Maps and a second maps-search provider cover the same area, so gaps in one get filled by the other.' },
      { title: 'Duplicates get merged', body: 'The same business found twice becomes one record, not two leads to work.' },
    ],
    whatYouGet: [
      'Business name, category, location and public listing details',
      'Two independent sources searched per run, not one',
      'Coverage across multiple locations in a single pass',
      'A deduplicated list, not a raw export',
    ],
    faqs: [
      { q: 'Where does the data come from?', a: 'Google Maps and Serper, a second maps-search provider. Both are queried so one running dry does not cap the list.' },
      { q: 'Can I target more than one city?', a: 'Yes — Orbit runs multiple locations in a single sourcing pass.' },
      { q: 'Does this replace a data provider like Apollo or ZoomInfo?', a: 'Different job. Those are contact databases; Orbit finds and qualifies real local businesses for outbound that starts with "we found you," not a purchased list.' },
    ],
    seoTitle: 'AI Lead Sourcing from Google Maps — Orbit',
    seoDescription:
      'Orbit searches Google Maps and a second source for real businesses matching your target category and location, then deduplicates the results.',
  },
  {
    slug: 'lead-qualification',
    agent: 'orbit',
    name: 'Lead qualification',
    eyebrow: 'Orbit · qualification',
    headline: 'Only the ones',
    headlineEmphasis: 'actually worth calling.',
    subheadline:
      'This is automated lead qualification, not just sourcing: a sourced list is not a qualified one. Orbit keeps a business only if there is a phone number to actually reach them on and a public rating that suggests they are a going concern worth pursuing — everything else is dropped before it reaches you.',
    summary: 'Keeps only businesses with a real phone number and a rating of 4.2 or above.',
    steps: [
      { title: 'Phone number required', body: 'No number, no lead. A business you cannot call is not a qualified one, whatever else is on the listing.' },
      { title: 'Rating threshold applied', body: '4.2 and above on the public listing — a working proxy for a business that is actually operating and cared about.' },
      { title: 'Everything else is dropped', body: 'Quietly, before it reaches a rep — the point is a shorter list worth working, not a bigger one.' },
    ],
    whatYouGet: [
      'A phone-reachable, minimum-4.2-rated shortlist',
      'The unqualified majority filtered out automatically',
      'The same bar applied consistently, run after run',
    ],
    faqs: [
      { q: 'Why 4.2 specifically?', a: 'It is the threshold in production today — high enough to filter out businesses that are struggling or inactive, without being so strict that a real, decent business gets excluded.' },
      { q: 'Can the bar be changed?', a: 'It is a configuration, not a fixed rule — worth a conversation about what fits your category.' },
      { q: 'What happens to the leads that get filtered out?', a: 'They are not called — that is the point of qualifying before outreach rather than after it.' },
    ],
    seoTitle: 'Automated Lead Qualification — Orbit',
    seoDescription:
      'Orbit filters sourced businesses down to a phone-reachable shortlist rated 4.2 and above, before any outreach happens.',
  },
  {
    slug: 'email-enrichment',
    agent: 'orbit',
    name: 'Email enrichment',
    eyebrow: 'Orbit · enrichment',
    headline: 'Google Maps never',
    headlineEmphasis: 'gives you an email. Orbit finds one anyway.',
    subheadline:
      'This website email enrichment step is why the address is real: for any qualified lead with a website, Orbit reads the homepage and the usual contact pages, and pulls out a real business email — filtering out the noreply addresses, the placeholder domains and the junk that scraping usually drags in.',
    summary: 'Reads a lead\'s website to find a real contact email, filtering out noreply addresses and placeholder junk.',
    steps: [
      { title: 'It visits the website', body: 'The homepage first, then the usual contact-page paths — /contact, /about and their common variants.' },
      { title: 'It filters what it finds', body: 'noreply@, webmaster@, and addresses on placeholder or template domains are discarded automatically, not left for someone to notice later.' },
      { title: 'A real email, or none', body: 'If nothing plausible turns up, the lead moves on without one rather than carrying a guessed address.' },
    ],
    whatYouGet: [
      'A real business email for leads that have one to find',
      'Automatic filtering of noreply and placeholder-domain junk',
      'No guessed or fabricated addresses — a clean miss over a bad guess',
    ],
    faqs: [
      { q: 'What if the lead has no website?', a: 'Then there is nothing to enrich, and the lead is worked on phone or the channel it does have.' },
      { q: 'Does this always find an email?', a: 'No — some sites genuinely do not publish one. Orbit returns what is really there rather than inventing something plausible-looking.' },
    ],
    seoTitle: 'Website-Based Email Enrichment — Orbit',
    seoDescription:
      'Orbit reads a qualified lead\'s website to find a real contact email, filtering out noreply addresses and placeholder-domain noise.',
  },
  {
    slug: 'personalized-outreach',
    agent: 'orbit',
    name: 'Personalized outreach',
    eyebrow: 'Orbit · outreach',
    headline: 'The first message,',
    headlineEmphasis: 'already written.',
    subheadline:
      'This is AI-personalized cold outreach, not a template with a name dropped in: every qualified lead gets an opening message drafted around what is actually true about them — whether they have a website, what the business appears to be about.',
    summary: 'Drafts an opening outreach message per lead, based on their website and business context.',
    steps: [
      { title: 'Context, not a template', body: 'Website presence and what the listing says about the business shape the message, not a fill-in-the-blank script.' },
      { title: 'One message per lead', body: 'Generated per business, not copy-pasted across the list.' },
      { title: 'Ready to send or hand off', body: 'The draft is there for a rep to review and send, or to flow straight into Pulsar for the actual conversation.' },
    ],
    whatYouGet: [
      'A drafted opening message for every qualified lead',
      'Context pulled from the lead\'s own website where one exists',
      'A starting point a rep edits rather than writes from nothing',
    ],
    faqs: [
      { q: 'Does this send the message too?', a: 'Orbit drafts it. Sending and the conversation that follows is Pulsar\'s job, or a rep\'s.' },
      { q: 'Can I set the tone?', a: 'Yes — this runs on the same brand voice the rest of the account uses.' },
    ],
    seoTitle: 'AI-Personalized Cold Outreach Messages — Orbit',
    seoDescription:
      'Orbit drafts a personalized opening outreach message for every qualified lead, based on their real website and business context.',
  },
  {
    slug: 'crm-sync',
    agent: 'orbit',
    name: 'CRM sync',
    eyebrow: 'Orbit · CRM',
    headline: 'Into the CRM,',
    headlineEmphasis: 'assigned and ready to work.',
    subheadline:
      'This is automatic CRM sync for qualified leads, not a spreadsheet handoff: Orbit pushes each lead into your CRM as a linked Company, Contact and Pipeline record, and — if you run more than one rep — assigns it to the next one in rotation, so nobody is idle and nobody is flooded.',
    summary: 'Pushes qualified leads into your CRM as linked records, round-robin assigned across reps.',
    steps: [
      { title: 'Three linked records', body: 'A Company, a Contact tied to it, and a Pipeline record tied to both — so a rep sees the full picture, not a bare contact.' },
      { title: 'Round-robin assignment', body: 'With more than one rep configured, each new lead goes to the next one in rotation automatically.' },
      { title: 'It lands ready to call', body: 'Stage, pipeline and ownership are already set — the rep opens the CRM and starts working, not sorting.' },
    ],
    whatYouGet: [
      'Company, Contact and Pipeline records created together, linked',
      'Round-robin assignment across your configured reps',
      'A consistent starting stage, so nothing sits unclassified',
    ],
    faqs: [
      { q: 'Which CRM does this work with?', a: 'Built for Zoho Bigin today. Ask if you run something else.' },
      { q: 'What if I only have one rep?', a: 'Every lead is owned by that account — round-robin only kicks in once more than one rep is configured.' },
      { q: 'Can I choose the pipeline and stage it lands in?', a: 'Yes, both are configured to match your existing CRM setup rather than assuming one.' },
    ],
    seoTitle: 'Automatic CRM Sync for Qualified Leads — Orbit',
    seoDescription:
      'Orbit pushes qualified leads into your CRM as linked Company, Contact and Pipeline records, round-robin assigned across your sales reps.',
  },
]

export function getCapability(agent: AgentId, slug: string): Capability | undefined {
  return capabilities.find(c => c.agent === agent && c.slug === slug)
}

export function capabilitiesFor(agent: AgentId): Capability[] {
  return capabilities.filter(c => c.agent === agent)
}
