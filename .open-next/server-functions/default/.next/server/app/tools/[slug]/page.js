(()=>{var e={};e.id=6765,e.ids=[6765],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},55315:e=>{"use strict";e.exports=require("path")},17360:e=>{"use strict";e.exports=require("url")},32145:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>s.a,__next_app__:()=>h,originalPathname:()=>u,pages:()=>c,routeModule:()=>b,tree:()=>l}),a(31565),a(89996),a(35866);var r=a(23191),o=a(88716),n=a(37922),s=a.n(n),i=a(95231),d={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>i[e]);a.d(t,d);let l=["",{children:["tools",{children:["[slug]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,31565)),"/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/app/tools/[slug]/page.tsx"]}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(a.bind(a,89996)),"/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,35866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/app/tools/[slug]/page.tsx"],u="/tools/[slug]/page",h={require:a,loadChunk:()=>Promise.resolve()},b=new r.AppPageRouteModule({definition:{kind:o.x.APP_PAGE,page:"/tools/[slug]/page",pathname:"/tools/[slug]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},22045:(e,t,a)=>{Promise.resolve().then(a.bind(a,49576)),Promise.resolve().then(a.bind(a,95172)),Promise.resolve().then(a.bind(a,73857)),Promise.resolve().then(a.bind(a,30692)),Promise.resolve().then(a.bind(a,57138)),Promise.resolve().then(a.bind(a,50470)),Promise.resolve().then(a.bind(a,48862)),Promise.resolve().then(a.bind(a,39428)),Promise.resolve().then(a.bind(a,83924)),Promise.resolve().then(a.bind(a,525)),Promise.resolve().then(a.bind(a,1805)),Promise.resolve().then(a.bind(a,95732)),Promise.resolve().then(a.bind(a,24332)),Promise.resolve().then(a.bind(a,77401)),Promise.resolve().then(a.bind(a,969)),Promise.resolve().then(a.bind(a,69466)),Promise.resolve().then(a.bind(a,71585)),Promise.resolve().then(a.bind(a,16020)),Promise.resolve().then(a.bind(a,56410)),Promise.resolve().then(a.bind(a,46328)),Promise.resolve().then(a.bind(a,2987)),Promise.resolve().then(a.bind(a,28997)),Promise.resolve().then(a.bind(a,50611)),Promise.resolve().then(a.bind(a,40544)),Promise.resolve().then(a.bind(a,2127)),Promise.resolve().then(a.bind(a,36410)),Promise.resolve().then(a.bind(a,85653)),Promise.resolve().then(a.bind(a,86954)),Promise.resolve().then(a.bind(a,63965)),Promise.resolve().then(a.bind(a,12517)),Promise.resolve().then(a.t.bind(a,79404,23))},49576:(e,t,a)=>{"use strict";a.d(t,{default:()=>s});var r=a(10326),o=a(91598);let n=[e=>{let t=e.topic,a=e.style;return"Curiosity"===a?`Here's the thing nobody tells you about ${t}:

The conventional approach fails 80% of the time. And the worst part? You won't know it's failing until it's too late.

I've spent the last 6 months obsessing over this. Talked to 50+ founders. Ran the experiments. Made the mistakes.

What I found will change how you think about ${t} forever.

Here's what actually works (and what everyone gets wrong):`:"Data / Stat"===a?`${Math.floor(40*Math.random()+60)}% of founders struggle with ${t} — not because they lack skill, but because they're measuring the wrong things.

That number comes from our own research across 200+ early-stage startups.

The ones who cracked ${t}? They had one thing in common — and it wasn't budget, team size, or experience.

It was this:`:"Question"===a?`What if everything you know about ${t} is making things harder, not easier?

Sounds dramatic. But after working with hundreds of founders, I keep seeing the same pattern:

The people who struggle most with ${t} are the ones following the most advice.

Too many tactics. Too many "best practices." Not enough clarity on what actually matters for their specific situation.

So let's fix that. Here's how to think about ${t} differently:`:`Six months ago, I almost quit because of ${t}.

Not kidding. It was one of those nights where you're staring at the numbers, and nothing makes sense. The strategy made sense on paper. The execution was solid. But results? Zero.

Then one conversation changed everything.

A founder friend asked me one question that reframed the entire problem. And once I heard it, I couldn't unhear it.

Here's what changed — and why it matters for you:`}];function s(){return r.jsx(o.Z,{fields:[{key:"topic",label:"What's your blog post about?",type:"textarea",placeholder:"e.g. 'cold email for B2B founders' or 'how to hire your first sales rep'",rows:2},{key:"style",label:"Hook style",type:"select",options:["Storytelling","Curiosity","Data / Stat","Question"]}],templates:n,outputLabel:"Your Blog Hook",buttonLabel:"Generate Hook",tip:"Use different hooks for different audiences. Test curiosity hooks on LinkedIn, story hooks on your blog."})}},95172:(e,t,a)=>{"use strict";a.d(t,{default:()=>s});var r=a(10326),o=a(91598);let n=[e=>`BUYER PERSONA: ${e.personaName||"The "+(e.target||"Ideal Customer")}

━━━━━━━━━━━━━━━━━━━━━━━

👤 WHO THEY ARE
Role: ${e.role||"Founder / CEO"}
Company size: ${e.companySize||"5-50 employees"}
Industry: ${e.industry||"B2B SaaS / Tech startup"}
Location: ${e.location||"Metro cities — Mumbai, Bangalore, Delhi, Hyderabad"}
Age: ${e.age||"28-40"}
Experience: ${e.experience||"2-8 years in their industry"}

━━━━━━━━━━━━━━━━━━━━━━━

😤 PAIN POINTS (what keeps them up at night)
1. ${e.pain1||"Not enough time — wearing too many hats"}
2. ${e.pain2||"Inconsistent pipeline — good months, bad months"}
3. ${e.pain3||"Can't afford a big marketing or sales team yet"}
4. Pressure to grow faster without proportionally more budget
5. Constantly starting from scratch on content and outreach

━━━━━━━━━━━━━━━━━━━━━━━

🎯 GOALS (what they're trying to achieve)
1. Consistent, predictable revenue growth
2. Build a brand without spending hours on content
3. Free up time to focus on product and customers
4. Look like a much bigger company than they are
5. Find a repeatable, scalable GTM motion

━━━━━━━━━━━━━━━━━━━━━━━

🔍 HOW THEY FIND SOLUTIONS
→ LinkedIn (scroll during commute or after work)
→ Word of mouth / founder peer recommendations
→ Founder communities (Slack groups, WhatsApp groups)
→ Google search when they have a specific problem
→ YouTube for how-to content

━━━━━━━━━━━━━━━━━━━━━━━

💬 WHAT THEY SAY (voice of customer)
"I don't have time to post on LinkedIn every day"
"I know content is important but I never get around to it"
"Our outreach is inconsistent — it works when we focus on it"
"I wish I had a team to handle this"

━━━━━━━━━━━━━━━━━━━━━━━

✅ BUYING TRIGGERS
→ Just had a bad revenue month
→ Hired their first sales/marketing person and need them to succeed
→ Saw a competitor's content and felt left behind
→ Got a referral from a trusted peer
→ Free trial that showed immediate value

━━━━━━━━━━━━━━━━━━━━━━━

HOW TO REACH THEM:
Best channel: ${e.channel||"LinkedIn organic + warm outreach"}
Best time: Monday morning or end of week (Friday afternoon)
Tone that works: Direct, founder-to-founder. No corporate speak.`];function s(){return r.jsx(o.Z,{fields:[{key:"product",label:"Your product / service",type:"text",placeholder:"e.g. Nebulaa (AI GTM platform)"},{key:"target",label:"Describe your target customer in one line",type:"text",placeholder:"e.g. 'early-stage B2B SaaS founders who want to grow without a big marketing team'"},{key:"personaName",label:"Give this persona a name (optional)",type:"text",placeholder:"e.g. 'Founder Vikram' or 'The Scrappy Founder'"},{key:"pain1",label:"Top pain point (optional)",type:"text",placeholder:"e.g. 'no time to post on LinkedIn consistently'"}],templates:n,outputLabel:"Your Buyer Persona",buttonLabel:"Generate Persona",tip:"Validate this persona by interviewing 5 real customers. The details they share will be worth more than any template."})}},73857:(e,t,a)=>{"use strict";a.d(t,{default:()=>i});var r=a(10326),o=a(17577),n=a(9086),s=a(38522);function i(){let[e,t]=(0,o.useState)(""),[a,i]=(0,o.useState)(""),[d,l]=(0,o.useState)(""),[c,u]=(0,o.useState)("Monthly"),[h,b]=(0,o.useState)(!1),m=parseFloat(e.replace(/,/g,""))||0,p=parseFloat(a.replace(/,/g,""))||0,x=parseFloat(d)||0,g=m+p,y=x>0?g/x:0,f=e=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(e),w=y<5e3?{label:"✅ Below average — great efficiency",color:"text-green-500"}:y<25e3?{label:"⚠️ Average — room for improvement",color:"text-yellow-500"}:{label:"\uD83D\uDD34 High — needs optimization",color:"text-red-400"};return(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{className:"bg-brand-off-white dark:bg-[#111110] rounded-2xl p-6 border border-brand-border dark:border-white/8",children:[(0,r.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Marketing Spend (₹)"}),r.jsx("input",{type:"text",value:e,onChange:e=>t(e.target.value),placeholder:"e.g. 50000",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"}),r.jsx("p",{className:"font-body text-xs text-brand-muted dark:text-white/30 mt-1",children:"Ads, content, events, tools"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Sales Spend (₹)"}),r.jsx("input",{type:"text",value:a,onChange:e=>i(e.target.value),placeholder:"e.g. 30000",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"}),r.jsx("p",{className:"font-body text-xs text-brand-muted dark:text-white/30 mt-1",children:"Sales team salary + commissions"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"New Customers Acquired"}),r.jsx("input",{type:"number",value:d,onChange:e=>l(e.target.value),placeholder:"e.g. 8",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Period"}),(0,r.jsxs)("select",{value:c,onChange:e=>u(e.target.value),className:"w-full border border-brand-border dark:border-white/10 dark:bg-[#1A1815] dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors",children:[r.jsx("option",{children:"Monthly"}),r.jsx("option",{children:"Quarterly"}),r.jsx("option",{children:"Annually"})]})]})]}),r.jsx("button",{onClick:()=>{g>0&&x>0&&b(!0)},disabled:!d||0===g,className:"mt-4 flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-6 py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]",children:"\uD83D\uDCB0 Calculate CAC"})]}),r.jsx(n.M,{children:h&&y>0&&(0,r.jsxs)(s.E.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"space-y-4",children:[r.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 gap-4",children:[{label:"Blended CAC",value:f(y),sub:"total cost per customer",color:"text-brand-gold"},{label:"Marketing CAC",value:f(x>0?m/x:0),sub:"from marketing only",color:"text-blue-500"},{label:"Sales CAC",value:f(x>0?p/x:0),sub:"from sales only",color:"text-purple-500"}].map(e=>(0,r.jsxs)("div",{className:"bg-white dark:bg-[#1A1815] rounded-2xl p-4 border border-brand-border dark:border-white/8 text-center",children:[r.jsx("p",{className:`font-heading font-bold text-2xl ${e.color}`,children:e.value}),r.jsx("p",{className:"font-body text-xs font-semibold text-brand-text dark:text-white mt-1",children:e.label}),r.jsx("p",{className:"font-body text-xs text-brand-muted dark:text-white/40 mt-0.5",children:e.sub})]},e.label))}),(0,r.jsxs)("div",{className:"bg-white dark:bg-[#1A1815] rounded-2xl p-5 border border-brand-border dark:border-white/8",children:[r.jsx("p",{className:`font-body text-sm font-semibold mb-2 ${w.color}`,children:w.label}),(0,r.jsxs)("div",{className:"space-y-2 font-body text-sm text-brand-muted dark:text-white/60",children:[(0,r.jsxs)("p",{children:["→ Total spend: ",f(g)," ",c.toLowerCase()]}),(0,r.jsxs)("p",{children:["→ Customers acquired: ",x]}),(0,r.jsxs)("p",{children:["→ To break even, your LTV must be > ",f(3*y)," (3:1 LTV:CAC ratio)"]})]})]}),r.jsx("div",{className:"bg-brand-gold/5 dark:bg-brand-gold/10 rounded-2xl p-4 border border-brand-gold/20",children:(0,r.jsxs)("p",{className:"font-body text-xs text-brand-muted dark:text-white/50",children:["\uD83D\uDCA1 Target LTV:CAC ratio of 3:1 or higher for sustainable growth. Use our Free LTV Calculator to check your ratio."," ",r.jsx("a",{href:"/pricing",className:"text-brand-gold hover:underline",children:"Try Gravity →"})]})})]})})]})}},30692:(e,t,a)=>{"use strict";a.d(t,{default:()=>u});var r=a(10326),o=a(17577),n=a(9086),s=a(38522),i=a(24527),d=a(32933),l=a(43810);let c=[e=>({subject:`Quick question for ${e.targetName} at ${e.targetCompany}`,body:`Hi ${e.targetName},

I noticed ${e.targetCompany} is probably dealing with ${e.painPoint} — it's the #1 challenge we hear from companies like yours.

At ${e.yourCompany}, we help teams like yours ${e.valueProp} without the usual overhead.

We recently helped a similar company reduce their sales cycle by 40% in under 90 days — just by fixing how they handle this exact problem.

Would it make sense to have a 15-minute call this week to see if this is relevant for ${e.targetCompany}?

No pitch. Just a quick conversation.

${e.yourName}
${e.yourCompany}`}),e=>({subject:`${e.targetCompany} + ${e.yourCompany} — worth a chat?`,body:`Hi ${e.targetName},

I'll keep this short — I know your inbox is already full.

You're likely spending more time than you should on ${e.painPoint}. It's a problem we've solved for companies exactly like ${e.targetCompany}.

${e.yourCompany} helps you ${e.valueProp}. Most of our customers see results in the first 30 days.

Here's what I'd love to do: jump on a 15-minute call and show you one specific thing that would make the biggest difference for your team. If it's not relevant, I'll never email you again.

Worth it?

${e.yourName}
${e.yourCompany}`}),e=>({subject:`Saw ${e.targetCompany} on LinkedIn — had to reach out`,body:`Hi ${e.targetName},

I came across ${e.targetCompany} and was genuinely impressed by what you're building.

One thing I noticed: companies at your stage often struggle with ${e.painPoint}. It's not a strategy problem — it's a systems problem.

That's exactly what ${e.yourCompany} solves. We help companies like yours ${e.valueProp}, so your team can focus on what actually moves the needle.

I'd love to share a quick 2-minute example of how we've done this for others in your space.

Would a 15-minute call this Thursday or Friday work?

${e.yourName}
${e.yourCompany}`})];function u(){let[e,t]=(0,o.useState)({yourName:"",yourCompany:"",targetName:"",targetCompany:"",painPoint:"",valueProp:""}),[a,u]=(0,o.useState)(null),[h,b]=(0,o.useState)(!1),[m,p]=(0,o.useState)(!1),[x,g]=(0,o.useState)(!1),y=(e,a)=>t(t=>({...t,[e]:a})),f=Object.values(e).every(e=>e.trim().length>0);return(0,r.jsxs)("div",{className:"space-y-6",children:[r.jsx("div",{className:"bg-brand-off-white dark:bg-[#111110] rounded-2xl p-6 border border-brand-border dark:border-white/8",children:(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Your name"}),r.jsx("input",{type:"text",value:e.yourName,onChange:e=>y("yourName",e.target.value),placeholder:"e.g. Navaneeth",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Your company"}),r.jsx("input",{type:"text",value:e.yourCompany,onChange:e=>y("yourCompany",e.target.value),placeholder:"e.g. Nebulaa.ai",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Prospect name"}),r.jsx("input",{type:"text",value:e.targetName,onChange:e=>y("targetName",e.target.value),placeholder:"e.g. Rahul",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Prospect company"}),r.jsx("input",{type:"text",value:e.targetCompany,onChange:e=>y("targetCompany",e.target.value),placeholder:"e.g. TechCorp India",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Main pain point"}),r.jsx("input",{type:"text",value:e.painPoint,onChange:e=>y("painPoint",e.target.value),placeholder:"e.g. generating consistent B2B leads without a full sales team",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Your value proposition"}),r.jsx("input",{type:"text",value:e.valueProp,onChange:e=>y("valueProp",e.target.value),placeholder:"e.g. automate their outreach and book 10+ demos per month on autopilot",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]}),(0,r.jsxs)("button",{onClick:()=>{f&&(u((0,c[Math.floor(Math.random()*c.length)])(e)),g(!0))},disabled:!f,className:"flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-6 py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]",children:[r.jsx(i.Z,{size:16}),"Generate Cold Email"]})]})}),r.jsx(n.M,{children:x&&a&&(0,r.jsxs)(s.E.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"bg-white dark:bg-[#1A1815] rounded-2xl border border-brand-border dark:border-white/8 overflow-hidden",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between px-5 py-3 border-b border-brand-border dark:border-white/8",children:[r.jsx("span",{className:"font-body text-sm font-semibold text-brand-text dark:text-white",children:"Your Cold Email"}),r.jsx("button",{onClick:()=>{a&&(navigator.clipboard.writeText(`Subject: ${a.subject}

${a.body}`),p(!0),setTimeout(()=>p(!1),2e3))},className:"flex items-center gap-1.5 font-body text-xs font-semibold text-brand-gold hover:text-brand-gold-dim transition-colors",children:m?(0,r.jsxs)(r.Fragment,{children:[r.jsx(d.Z,{size:12}),"Copied!"]}):(0,r.jsxs)(r.Fragment,{children:[r.jsx(l.Z,{size:12}),"Copy all"]})})]}),r.jsx("div",{className:"px-5 py-4 border-b border-brand-border dark:border-white/8 bg-brand-gold/5 dark:bg-brand-gold/5",children:(0,r.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,r.jsxs)("div",{children:[r.jsx("p",{className:"font-body text-xs font-bold uppercase tracking-widest text-brand-muted dark:text-white/40 mb-1",children:"Subject line"}),r.jsx("p",{className:"font-body text-sm font-semibold text-brand-text dark:text-white",children:a.subject})]}),r.jsx("button",{onClick:()=>{a&&(navigator.clipboard.writeText(a.subject),b(!0),setTimeout(()=>b(!1),2e3))},className:"flex-shrink-0 flex items-center gap-1 font-body text-xs text-brand-muted dark:text-white/40 hover:text-brand-gold transition-colors",children:h?r.jsx(d.Z,{size:11}):r.jsx(l.Z,{size:11})})]})}),r.jsx("div",{className:"p-5",children:r.jsx("pre",{className:"font-body text-sm text-brand-text dark:text-white whitespace-pre-wrap leading-relaxed",children:a.body})}),r.jsx("div",{className:"px-5 py-3 bg-brand-gold/5 dark:bg-brand-gold/10 border-t border-brand-border dark:border-white/5",children:(0,r.jsxs)("p",{className:"font-body text-xs text-brand-muted dark:text-white/50",children:["\uD83D\uDCA1 Tip: Personalize the first line with something specific about their company. Response rates jump 3x with genuine personalization."," ",r.jsx("a",{href:"/pricing",className:"text-brand-gold hover:underline",children:"Automate your outreach with Pulsar →"})]})})]})})]})}},57138:(e,t,a)=>{"use strict";a.d(t,{default:()=>s});var r=a(10326),o=a(91598);let n=[e=>`COMPETITIVE POSITIONING — ${e.company} vs ${e.competitor}

━━━━━━━━━━━━━━━━━━━━━━━

📌 YOUR POSITIONING STATEMENT
"For ${e.target||"[target customer]"} who need ${e.need||"[core need]"}, ${e.company} is the ${e.category||"[category]"} that ${e.differentiator||"[key differentiator]"}. Unlike ${e.competitor}, we ${e.advantage||"[unique advantage]"}."

━━━━━━━━━━━━━━━━━━━━━━━

⚔️ FEATURE COMPARISON

| Feature | ${e.company} | ${e.competitor} |
|---------|------------|----------------|
| ${e.feature1||"Core feature"} | ✅ Yes | ❌ No / Limited |
| ${e.feature2||"Key differentiator"} | ✅ Yes | ❌ No |
| Ease of setup | ✅ Minutes | ⚠️ Days/Weeks |
| Indian market focus | ✅ Built for India | ❌ Global product |
| Pricing | ✅ Startup-friendly | ⚠️ Enterprise pricing |
| Support | ✅ Dedicated | ⚠️ Ticket-based |

━━━━━━━━━━━━━━━━━━━━━━━

🏆 WHERE YOU WIN
→ ${e.win1||"Better fit for the specific segment you serve"}
→ ${e.win2||"Faster time to value — no lengthy implementation"}
→ ${e.win3||"More cost-effective for your target company size"}
→ Purpose-built vs. generic solution
→ Local support and Indian context

━━━━━━━━━━━━━━━━━━━━━━━

⚠️ WHERE THEY WIN (be honest)
→ ${e.theyWin||"They may have more features for large enterprise use cases"}
→ Larger existing customer base and brand recognition
→ [Add your honest assessment here]

━━━━━━━━━━━━━━━━━━━━━━━

💬 BATTLE CARD: HOW TO RESPOND WHEN A PROSPECT MENTIONS ${e.competitor.toUpperCase()}

If they say: "We're already using ${e.competitor}"
→ "That's great — they're solid for [what competitor does well]. Can I ask what's not working about your current setup? Most of our customers who switched came because [specific pain point]."

If they say: "We're evaluating ${e.competitor}"
→ "Makes sense — they're a good option for [use case]. The question is [key differentiator question]. If that matters to you, that's where we're different. Want to see a quick side-by-side?"

━━━━━━━━━━━━━━━━━━━━━━━

🎯 YOUR MESSAGING FOR THIS MARKET
Headline: "${e.company}: ${e.messagingHook||"[What you do that they can't]"}"
Sub: "The ${e.category||"platform"} built specifically for ${e.target||"your audience"} — not retrofitted for it."`];function s(){return r.jsx(o.Z,{fields:[{key:"company",label:"Your company name",type:"text",placeholder:"e.g. Nebulaa"},{key:"competitor",label:"Main competitor",type:"text",placeholder:"e.g. 'HubSpot' or 'Salesforce' or 'a manual approach'"},{key:"target",label:"Target customer",type:"text",placeholder:"e.g. 'B2B SaaS founders in India with 5-50 person teams'"},{key:"differentiator",label:"Your key differentiator vs them",type:"textarea",placeholder:"e.g. 'automates the entire GTM workflow end-to-end vs just being a CRM'",rows:2}],templates:n,outputLabel:"Your Competitive Positioning",buttonLabel:"Generate Positioning",tip:"Never trash competitors. Position around a specific use case where you clearly win, and let the right customers self-select."})}},50470:(e,t,a)=>{"use strict";a.d(t,{default:()=>s});var r=a(10326),o=a(91598);let n=[e=>{let t=e.business,a=e.platform;return`30-DAY CONTENT CALENDAR FOR ${t.toUpperCase()}
Platform: ${a}

━━━━━━━━━━━━━━━━━━━━━━━

WEEK 1: ESTABLISH AUTHORITY
Theme: "What we know that others don't"

📅 Day 1 (Mon) — Educational
Post: "The 3 biggest mistakes ${t} founders make"
Format: List post / carousel
Goal: Build credibility

📅 Day 3 (Wed) — Behind the scenes
Post: How we actually [do something your audience cares about]
Format: Story / short video
Goal: Build trust

📅 Day 5 (Fri) — Engagement
Post: "Hot take: [controversial opinion in your space]"
Format: Text post
Goal: Start conversations

━━━━━━━━━━━━━━━━━━━━━━━

WEEK 2: BUILD CONNECTION
Theme: "Real stories, real results"

📅 Day 8 (Mon) — Customer story
Post: How [type of customer] achieved [result] using [your method]
Format: Case study
Goal: Social proof

📅 Day 10 (Wed) — Personal story
Post: The mistake that taught me the most about ${t}
Format: Storytelling post
Goal: Relatability

📅 Day 12 (Fri) — Practical value
Post: Free template / checklist / framework for [common problem]
Format: Resource post
Goal: Saves / shares

━━━━━━━━━━━━━━━━━━━━━━━

WEEK 3: DRIVE AWARENESS
Theme: "Why this matters now"

📅 Day 15 (Mon) — Trend post
Post: What's changing in [industry] and what it means for you
Format: Analysis post
Goal: Thought leadership

📅 Day 17 (Wed) — Comparison
Post: [Your approach] vs [old/common approach] — here's the data
Format: Before/after
Goal: Differentiation

📅 Day 19 (Fri) — Community
Post: Poll / question for your audience
Format: Engagement post
Goal: Audience insight

━━━━━━━━━━━━━━━━━━━━━━━

WEEK 4: CONVERT FOLLOWERS TO CUSTOMERS
Theme: "Here's how we can help"

📅 Day 22 (Mon) — Product/offer (soft)
Post: "We built [product] because [problem we kept seeing]"
Format: Origin story
Goal: Brand awareness

📅 Day 24 (Wed) — Testimonial
Post: "[Customer name] went from [before] to [after] in [timeframe]"
Format: Social proof
Goal: Trust + conversion

📅 Day 26 (Fri) — Direct CTA
Post: "If you're a [ICP], here's how to work with us"
Format: Clear offer post
Goal: Pipeline

━━━━━━━━━━━━━━━━━━━━━━━

CONTENT RULES FOR ${a.toUpperCase()}:
→ Post at consistent times (best: 8-9am and 12-1pm)
→ Engage with comments within the first 60 minutes
→ Never post and ghost — respond to every comment
→ Repurpose top posts after 30 days
→ Track: views, saves, follows, DMs`}];function s(){return r.jsx(o.Z,{fields:[{key:"business",label:"Your business / industry",type:"text",placeholder:"e.g. 'SaaS startup' or 'B2B consulting firm'"},{key:"platform",label:"Primary platform",type:"select",options:["LinkedIn","Instagram","Twitter/X","LinkedIn + Instagram"]}],templates:n,outputLabel:"Your 30-Day Content Calendar",buttonLabel:"Generate Calendar",tip:"Batch create content on one day each week. Consistency beats perfection every time."})}},48862:(e,t,a)=>{"use strict";a.d(t,{default:()=>s});var r=a(10326),o=a(91598);let n=[e=>`━━━ 30-SECOND PITCH ━━━

"${e.company} helps ${e.target||"B2B founders"} ${e.outcome||"scale their go-to-market"} without ${e.pain||"the usual grind"}.

Most ${e.target||"founders"} ${e.problem||"spend hours on marketing that barely moves the needle"}. We fix that with ${e.solution||"AI-powered automation that works in the background"}.

${e.traction?`So far, we've ${e.traction}.`:"We're early stage and already seeing strong early results."}

If you know anyone ${e.trigger||"building a B2B startup who wants to grow faster"}, I'd love an introduction."

━━━ INVESTOR VERSION ━━━

"We're ${e.company} — ${e.oneliner||`the AI-powered ${e.solution||"growth platform"} for ${e.target||"founders"}`}.

The problem: ${e.problem||"[State the problem clearly with a stat if possible]"}

Our solution: ${e.solution||"[How you solve it differently]"}

${e.traction?`Traction: ${e.traction}`:"Traction: [# customers, ARR, growth rate]"}

We're raising ${e.raise||"[amount]"} to ${e.useOfFunds||"accelerate growth and expand the team"}."

━━━ TIPS ━━━
→ Lead with the customer pain, not your features
→ Use one specific number to build credibility
→ End with a clear ask or next step
→ Practice out loud until it feels natural (not rehearsed)`];function s(){return r.jsx(o.Z,{fields:[{key:"company",label:"Company name",type:"text",placeholder:"e.g. Nebulaa"},{key:"target",label:"Who is your customer?",type:"text",placeholder:"e.g. 'B2B SaaS founders with 5-50 person teams'"},{key:"problem",label:"What problem do they have?",type:"textarea",placeholder:"e.g. 'They spend 10+ hours a week on LinkedIn content that barely converts'",rows:2},{key:"solution",label:"How do you solve it?",type:"text",placeholder:"e.g. 'AI agent that posts daily content and follows up with leads automatically'"},{key:"traction",label:"Any traction? (optional)",type:"text",placeholder:"e.g. '₹15L ARR, 40 paying customers, 3x growth in 6 months'"}],templates:n,outputLabel:"Your Elevator Pitch",buttonLabel:"Generate Pitch",tip:"The best pitch starts a conversation, not closes a deal. Make it intriguing, not exhaustive."})}},39428:(e,t,a)=>{"use strict";a.d(t,{default:()=>s});var r=a(10326),o=a(91598);let n=[e=>{let t=e.topic,a=e.audience||"founders";return`Here are 10 subject line variations for "${t}":

━━━ CURIOSITY ━━━
1. "The ${t} mistake everyone makes (including me)"
2. "Why most ${a} get ${t} wrong"
3. "I tested this so you don't have to [${t}]"

━━━ URGENCY / TIME-BASED ━━━
4. "Last chance: ${t} opportunity ends Friday"
5. "Before you start your week — read this about ${t}"
6. "This ${t} window closes in 48 hours"

━━━ PERSONALIZATION ━━━
7. "Quick question about your ${t} strategy"
8. "Saw you're working on ${t} — wanted to share this"
9. "[First Name], your ${t} approach might be costing you"

━━━ NUMBER-BASED ━━━
10. "5 ${t} tactics that actually work in 2025"

━━━ PRO TIPS ━━━
→ Keep subject lines under 50 characters for mobile
→ Avoid spam triggers: "FREE", "!!!", ALL CAPS
→ Test 2 variations — send to 20% each, pick the winner
→ The best subject line is the one YOUR audience opens`}];function s(){return r.jsx(o.Z,{fields:[{key:"topic",label:"What is the email about?",type:"text",placeholder:"e.g. 'your product launch' or 'content marketing tips'"},{key:"audience",label:"Target audience (optional)",type:"text",placeholder:"e.g. 'B2B founders' or 'e-commerce store owners'"}],templates:n,outputLabel:"Your Subject Line Options",buttonLabel:"Generate Subject Lines",tip:"A/B test your top 2 subject lines. Even a 5% lift in open rate compounds dramatically over time."})}},83924:(e,t,a)=>{"use strict";a.d(t,{default:()=>u});var r=a(10326),o=a(17577),n=a(9086),s=a(38522),i=a(24527),d=a(941),l=a(32933),c=a(43810);function u(){let[e,t]=(0,o.useState)({yourName:"",yourCompany:"",prospectName:"",prospectCompany:"",product:"",touchpoint:"cold_email"}),[a,u]=(0,o.useState)([]),[h,b]=(0,o.useState)(!1),[m,p]=(0,o.useState)(0),[x,g]=(0,o.useState)(null),y=(e,a)=>t(t=>({...t,[e]:a})),f=e.yourName.trim()&&e.yourCompany.trim()&&e.prospectName.trim()&&e.prospectCompany.trim()&&e.product.trim(),w=(e,t)=>{navigator.clipboard.writeText(t),g(e),setTimeout(()=>g(null),2e3)};return(0,r.jsxs)("div",{className:"space-y-6",children:[r.jsx("div",{className:"bg-brand-off-white dark:bg-[#111110] rounded-2xl p-6 border border-brand-border dark:border-white/8",children:(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Your name"}),r.jsx("input",{type:"text",value:e.yourName,onChange:e=>y("yourName",e.target.value),placeholder:"e.g. Navaneeth",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Your company"}),r.jsx("input",{type:"text",value:e.yourCompany,onChange:e=>y("yourCompany",e.target.value),placeholder:"e.g. Nebulaa.ai",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Prospect name"}),r.jsx("input",{type:"text",value:e.prospectName,onChange:e=>y("prospectName",e.target.value),placeholder:"e.g. Rahul",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Prospect company"}),r.jsx("input",{type:"text",value:e.prospectCompany,onChange:e=>y("prospectCompany",e.target.value),placeholder:"e.g. TechCorp India",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Your product / service"}),r.jsx("input",{type:"text",value:e.product,onChange:e=>y("product",e.target.value),placeholder:"e.g. AI-powered outreach automation for B2B founders",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Original touchpoint"}),(0,r.jsxs)("select",{value:e.touchpoint,onChange:e=>y("touchpoint",e.target.value),className:"w-full border border-brand-border dark:border-white/10 dark:bg-[#1A1815] dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors",children:[r.jsx("option",{value:"cold_email",children:"Cold email"}),r.jsx("option",{value:"demo_call",children:"Demo call"}),r.jsx("option",{value:"event",children:"Event / Conference"}),r.jsx("option",{value:"inbound",children:"Inbound enquiry"})]})]}),(0,r.jsxs)("button",{onClick:()=>{f&&(u(function(e){let{yourName:t,yourCompany:a,prospectName:r,prospectCompany:o,product:n}=e;return[{day:"Day 1",label:"The Gentle Nudge",emoji:"\uD83D\uDC4B",subject:`Circling back — ${n} for ${o}`,body:`Hi ${r},

Just circling back on my earlier message about ${n}.

I know your inbox is busy, so I'll keep this short: ${a} helps companies like ${o} ${n.toLowerCase()} without the usual overhead.

If timing is off, just say the word and I'll follow up in a month. If you're open to a 15-minute chat, I'd love to show you what we've built.

${t}
${a}`},{day:"Day 3",label:"Add Value",emoji:"\uD83D\uDCA1",subject:`This might be useful for ${o}`,body:`Hi ${r},

I thought of you when I read this — we worked with a company similar to ${o} recently, and the one thing that made the biggest difference was [fixing their outreach process, not their product].

It's the same problem ${n} solves. I'd be happy to share the full breakdown if that's useful.

No strings. Just thought it might be relevant.

${t}
${a}`},{day:"Day 7",label:"Social Proof",emoji:"\uD83C\uDFC6",subject:`How [Company X] solved the same problem ${o} has`,body:`Hi ${r},

Quick story — a company in your exact space came to us 3 months ago with the same challenge you're probably facing.

They were spending 15+ hours a week on manual outreach with inconsistent results. After using ${n}, they cut that to under 2 hours and doubled their response rate.

I think ${o} could see similar results, given [what I know about your business].

Worth 15 minutes to find out? I have slots Thursday and Friday this week.

${t}
${a}`},{day:"Day 14",label:"The Breakup",emoji:"\uD83D\uDCC1",subject:`Should I close your file, ${r}?`,body:`Hi ${r},

I've reached out a few times about ${n} for ${o} and haven't heard back — which usually means one of two things:

1. Bad timing — you're swamped and this isn't a priority right now
2. Not relevant — ${n} isn't a fit for where ${o} is today

Either way, totally fine. I'll close your file unless I hear otherwise.

If things change, I'm always here.

${t}
${a}`},{day:"Day 21",label:"Re-engagement",emoji:"\uD83C\uDF31",subject:`Checking in — ${o} + ${a}`,body:`Hi ${r},

It's been a few weeks. I hope things at ${o} are going well.

I'm not here to pitch — just wanted to share that we launched [a new feature / case study / resource] that directly addresses the ${n.toLowerCase()} challenge.

If you've been thinking about this problem again, now might be a good time to reconnect.

No pressure either way.

${t}
${a}`}]}(e)),b(!0),p(0))},disabled:!f,className:"flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-6 py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]",children:[r.jsx(i.Z,{size:16}),"Generate 5-Email Sequence"]})]})}),r.jsx(n.M,{children:h&&a.length>0&&(0,r.jsxs)(s.E.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"space-y-3",children:[r.jsx("div",{className:"flex items-center gap-0 overflow-x-auto pb-2",children:a.map((e,t)=>(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsxs)("button",{onClick:()=>p(m===t?null:t),className:`flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl transition-all ${m===t?"bg-brand-gold text-brand-black":"bg-brand-off-white dark:bg-white/5 text-brand-muted dark:text-white/50 hover:bg-brand-warm-gray dark:hover:bg-white/10"}`,children:[r.jsx("span",{className:"text-base",children:e.emoji}),r.jsx("span",{className:"font-body text-[10px] font-bold mt-0.5",children:e.day})]}),t<a.length-1&&r.jsx("div",{className:"w-4 h-px bg-brand-border dark:bg-white/10 flex-shrink-0"})]},t))}),a.map((e,t)=>(0,r.jsxs)("div",{className:"bg-white dark:bg-[#1A1815] rounded-2xl border border-brand-border dark:border-white/8 overflow-hidden",children:[(0,r.jsxs)("button",{onClick:()=>p(m===t?null:t),className:"w-full flex items-center justify-between px-5 py-4 hover:bg-brand-off-white dark:hover:bg-white/3 transition-colors",children:[(0,r.jsxs)("div",{className:"flex items-center gap-3",children:[r.jsx("span",{className:"text-xl",children:e.emoji}),(0,r.jsxs)("div",{className:"text-left",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[r.jsx("span",{className:"font-body text-xs font-bold text-brand-gold uppercase tracking-widest",children:e.day}),r.jsx("span",{className:"font-body text-xs text-brand-muted dark:text-white/30",children:"—"}),r.jsx("span",{className:"font-body text-xs text-brand-muted dark:text-white/50",children:e.label})]}),r.jsx("p",{className:"font-body text-sm font-semibold text-brand-text dark:text-white mt-0.5 text-left",children:e.subject})]})]}),r.jsx(d.Z,{size:16,className:`flex-shrink-0 text-brand-muted dark:text-white/30 transition-transform ${m===t?"rotate-180":""}`})]}),r.jsx(n.M,{children:m===t&&(0,r.jsxs)(s.E.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.2},className:"overflow-hidden",children:[r.jsx("div",{className:"px-5 py-3 border-t border-brand-border dark:border-white/8 bg-brand-gold/5 dark:bg-brand-gold/5",children:(0,r.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,r.jsxs)("div",{children:[r.jsx("p",{className:"font-body text-[10px] font-bold uppercase tracking-widest text-brand-muted dark:text-white/40 mb-1",children:"Subject"}),r.jsx("p",{className:"font-body text-sm text-brand-text dark:text-white",children:e.subject})]}),r.jsx("button",{onClick:()=>w(`subject-${t}`,e.subject),className:"flex-shrink-0 text-brand-muted dark:text-white/30 hover:text-brand-gold transition-colors",children:x===`subject-${t}`?r.jsx(l.Z,{size:13}):r.jsx(c.Z,{size:13})})]})}),(0,r.jsxs)("div",{className:"p-5",children:[(0,r.jsxs)("div",{className:"flex items-start justify-between gap-4 mb-3",children:[r.jsx("p",{className:"font-body text-[10px] font-bold uppercase tracking-widest text-brand-muted dark:text-white/40",children:"Body"}),r.jsx("button",{onClick:()=>w(`body-${t}`,`Subject: ${e.subject}

${e.body}`),className:"flex items-center gap-1.5 font-body text-xs font-semibold text-brand-gold hover:text-brand-gold-dim transition-colors",children:x===`body-${t}`?(0,r.jsxs)(r.Fragment,{children:[r.jsx(l.Z,{size:12}),"Copied!"]}):(0,r.jsxs)(r.Fragment,{children:[r.jsx(c.Z,{size:12}),"Copy email"]})})]}),r.jsx("pre",{className:"font-body text-sm text-brand-text dark:text-white whitespace-pre-wrap leading-relaxed",children:e.body})]})]})})]},t)),r.jsx("div",{className:"px-1",children:(0,r.jsxs)("p",{className:"font-body text-xs text-brand-muted dark:text-white/50",children:["\uD83D\uDCA1 Pulsar by Nebulaa sends this entire sequence automatically — triggered by your CRM, timed perfectly."," ",r.jsx("a",{href:"/pricing",className:"text-brand-gold hover:underline",children:"Automate your follow-ups →"})]})})]})})]})}},525:(e,t,a)=>{"use strict";a.d(t,{default:()=>l});var r=a(10326),o=a(17577),n=a(38522),s=a(31540);let i=[{name:"Positioning",emoji:"\uD83C\uDFAF",items:[{id:"icp",text:"Ideal Customer Profile (ICP) defined with demographics + psychographics"},{id:"value_prop",text:"Value proposition written and tested with 5+ potential customers"},{id:"positioning",text:"Positioning statement completed (For X, who Y, our product Z, unlike A, we B)"},{id:"competitor",text:"Competitor analysis done — top 3–5 alternatives mapped"},{id:"differentiators",text:"Unique differentiators identified and ranked by importance"},{id:"pricing",text:"Pricing decided — tiers, value metric, and competitors benchmarked"},{id:"messaging",text:"Messaging hierarchy created — headline, sub-headline, bullets"},{id:"tagline",text:"Tagline / hero headline finalized and tested on landing page"}]},{name:"Content",emoji:"✍️",items:[{id:"website_copy",text:"Website copy written for all pages (home, product, pricing, about)"},{id:"landing_page",text:"Primary landing page live with CTA and conversion tracking"},{id:"blog_posts",text:"Minimum 3 SEO blog posts published before launch"},{id:"linkedin_page",text:"LinkedIn company page set up, branded, and populated"},{id:"social_profiles",text:"All social media profiles created with consistent branding"},{id:"demo_video",text:"Product demo video recorded (2–5 minutes, screen + voiceover)"},{id:"case_studies",text:"At least 1 case study or testimonial from beta/pilot users"},{id:"email_templates",text:"Email templates written for welcome, onboarding, and follow-up"}]},{name:"Outreach",emoji:"\uD83D\uDCE4",items:[{id:"lead_list",text:"Lead list built with 100+ qualified contacts (name, email, company)"},{id:"cold_email",text:"Cold email sequence written and A/B tested (subject lines + body)"},{id:"linkedin_strategy",text:"LinkedIn connection + DM strategy defined and templated"},{id:"whatsapp_plan",text:"WhatsApp outreach plan ready (groups, broadcast lists, message templates)"},{id:"followup_sequence",text:"5-email follow-up sequence created with timing and triggers"},{id:"crm_setup",text:"CRM set up with pipeline stages, lead statuses, and automations"},{id:"pixels",text:"Tracking pixels installed (Meta, Google, LinkedIn) with events firing"},{id:"analytics",text:"Analytics configured (GA4 or equivalent) with goals and conversions set"}]},{name:"Launch",emoji:"\uD83D\uDE80",items:[{id:"launch_date",text:"Launch date set and communicated to team and stakeholders"},{id:"beta_users",text:"Beta users / design partners invited and onboarded (min 10)"},{id:"product_hunt",text:"Product Hunt listing prepared with assets, tagline, and makers added"},{id:"announcement",text:"Launch announcement email drafted for your full contact list"},{id:"social_posts",text:"Launch social posts scheduled across all platforms"},{id:"press_media",text:"Press / media list compiled with 10+ relevant journalists or newsletters"},{id:"referral",text:"Referral or affiliate program created and ready to activate"},{id:"support_docs",text:"Support documentation / FAQ published (help center or notion)"}]},{name:"Metrics",emoji:"\uD83D\uDCCA",items:[{id:"north_star",text:"North star metric defined (the one number that captures growth)"},{id:"review_cadence",text:"Weekly review cadence scheduled with team (same day, same time)"},{id:"activation",text:"Activation metric defined (what does a successful first session look like?)"},{id:"revenue_goal",text:"Revenue goal set for Month 1, Month 3, and Month 6"},{id:"pipeline_target",text:"Pipeline target set (leads needed per month to hit revenue goal)"},{id:"churn_baseline",text:"Churn baseline established and acceptable range defined"},{id:"nps_baseline",text:"NPS baseline survey sent to first 20 users"},{id:"dashboard",text:"Reporting dashboard live with real-time metrics visible to team"}]}],d=i.reduce((e,t)=>e+t.items.length,0);function l(){let[e,t]=(0,o.useState)(new Set),a=e=>{t(t=>{let a=new Set(t);return a.has(e)?a.delete(e):a.add(e),a})},l=e.size,c=Math.round(l/d*100),u=100===c?{msg:"You're launch-ready. Ship it! \uD83D\uDE80",color:"text-green-500"}:c>=75?{msg:"Almost there! Finish the last stretch.",color:"text-brand-gold"}:c>=50?{msg:"Halfway done. Great momentum.",color:"text-blue-500"}:c>=25?{msg:"Good start. Keep going.",color:"text-brand-muted dark:text-white/50"}:{msg:"Start checking off items below.",color:"text-brand-muted dark:text-white/50"};return(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{className:"bg-brand-off-white dark:bg-[#111110] rounded-2xl p-5 border border-brand-border dark:border-white/8",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-3",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("p",{className:"font-body text-sm font-semibold text-brand-text dark:text-white",children:[l," / ",d," completed"]}),r.jsx("p",{className:`font-body text-xs mt-0.5 ${u.color}`,children:u.msg})]}),r.jsx("div",{className:"text-right",children:(0,r.jsxs)("p",{className:"font-heading font-bold text-3xl text-brand-gold",children:[c,"%"]})})]}),r.jsx("div",{className:"bg-brand-warm-gray dark:bg-white/10 rounded-full h-2",children:r.jsx(n.E.div,{className:"bg-brand-gold h-2 rounded-full transition-all duration-500",style:{width:`${c}%`}})}),r.jsx("div",{className:"mt-4 flex justify-end",children:(0,r.jsxs)("button",{onClick:()=>{let t=new Blob([["GTM Launch Checklist — Nebulaa.ai",`Completed: ${l}/${d} (${c}%)`,"",...i.flatMap(t=>[`
${t.emoji} ${t.name.toUpperCase()}`,...t.items.map(t=>`${e.has(t.id)?"[x]":"[ ]"} ${t.text}`)]),"","Generated free at nebulaa.ai/tools"].join("\n")],{type:"text/plain"}),a=URL.createObjectURL(t),r=document.createElement("a");r.href=a,r.download="gtm-launch-checklist.txt",r.click(),URL.revokeObjectURL(a)},className:"flex items-center gap-1.5 font-body text-xs font-semibold text-brand-muted dark:text-white/50 hover:text-brand-gold transition-colors",children:[r.jsx(s.Z,{size:13}),"Export as .txt"]})})]}),i.map(t=>{let o=t.items.filter(t=>e.has(t.id)).length,n=Math.round(o/t.items.length*100);return(0,r.jsxs)("div",{className:"bg-white dark:bg-[#1A1815] rounded-2xl border border-brand-border dark:border-white/8 overflow-hidden",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between px-5 py-4 border-b border-brand-border dark:border-white/8 bg-brand-off-white dark:bg-[#111110]",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[r.jsx("span",{className:"text-xl",children:t.emoji}),r.jsx("span",{className:"font-heading font-bold text-sm text-brand-text dark:text-white",children:t.name})]}),(0,r.jsxs)("div",{className:"flex items-center gap-3",children:[(0,r.jsxs)("span",{className:"font-body text-xs text-brand-muted dark:text-white/40",children:[o,"/",t.items.length]}),r.jsx("div",{className:"w-16 bg-brand-warm-gray dark:bg-white/10 rounded-full h-1.5",children:r.jsx("div",{className:"bg-brand-gold h-1.5 rounded-full transition-all duration-300",style:{width:`${n}%`}})})]})]}),r.jsx("div",{className:"divide-y divide-brand-border dark:divide-white/5",children:t.items.map(t=>(0,r.jsxs)("label",{className:"flex items-start gap-3 px-5 py-3.5 cursor-pointer hover:bg-brand-off-white dark:hover:bg-white/3 transition-colors group",children:[r.jsx("div",{className:"flex-shrink-0 mt-0.5",children:r.jsx("div",{className:`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${e.has(t.id)?"bg-brand-gold border-brand-gold":"border-brand-border dark:border-white/20 group-hover:border-brand-gold"}`,children:e.has(t.id)&&r.jsx("svg",{className:"w-2.5 h-2.5 text-brand-black",fill:"currentColor",viewBox:"0 0 12 12",children:r.jsx("path",{d:"M10 3L5 8.5 2 5.5",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",fill:"none"})})})}),r.jsx("input",{type:"checkbox",checked:e.has(t.id),onChange:()=>a(t.id),className:"sr-only"}),r.jsx("span",{className:`font-body text-sm leading-relaxed transition-colors ${e.has(t.id)?"text-brand-muted dark:text-white/30 line-through":"text-brand-text dark:text-white"}`,children:t.text})]},t.id))})]},t.name)}),r.jsx("div",{className:"px-1",children:(0,r.jsxs)("p",{className:"font-body text-xs text-brand-muted dark:text-white/50",children:["\uD83D\uDCA1 Want Gravity to handle the Content and Outreach sections automatically?"," ",r.jsx("a",{href:"/pricing",className:"text-brand-gold hover:underline",children:"Try Nebulaa free →"})]})})]})}},91598:(e,t,a)=>{"use strict";a.d(t,{Z:()=>u});var r=a(10326),o=a(17577),n=a(9086),s=a(38522),i=a(24527),d=a(21405),l=a(32933),c=a(43810);function u({fields:e,templates:t,outputLabel:a,buttonLabel:u="Generate",tip:h}){let b={};for(let t of e)b[t.key]=t.options?.[0]??"";let[m,p]=(0,o.useState)(b),[x,g]=(0,o.useState)(""),[y,f]=(0,o.useState)(!1),[w,k]=(0,o.useState)(!1),[v,j]=(0,o.useState)(0),N=e.find(e=>"select"!==e.type),C=!!N&&(m[N.key]?.trim().length??0)>0,T=(e,t)=>p(a=>({...a,[e]:t}));return(0,r.jsxs)("div",{className:"space-y-6",children:[r.jsx("div",{className:"bg-brand-off-white dark:bg-[#111110] rounded-2xl p-6 border border-brand-border dark:border-white/8",children:(0,r.jsxs)("div",{className:"space-y-4",children:[e.map(e=>(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:e.label}),"textarea"===e.type?r.jsx("textarea",{value:m[e.key],onChange:t=>T(e.key,t.target.value),rows:e.rows??3,placeholder:e.placeholder,className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-3 font-body text-sm resize-none outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"}):"select"===e.type?r.jsx("select",{value:m[e.key],onChange:t=>T(e.key,t.target.value),className:"w-full border border-brand-border dark:border-white/10 dark:bg-[#1A1815] dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors",children:e.options?.map(e=>r.jsx("option",{value:e,children:e},e))}):r.jsx("input",{type:"text",value:m[e.key],onChange:t=>T(e.key,t.target.value),placeholder:e.placeholder,className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]},e.key)),(0,r.jsxs)("button",{onClick:()=>{if(!C)return;let e=Math.floor(Math.random()*t.length);j(e),g(t[e](m)),k(!0)},disabled:!C,className:"flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-6 py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]",children:[r.jsx(i.Z,{size:16}),u]})]})}),r.jsx(n.M,{children:w&&x&&(0,r.jsxs)(s.E.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"bg-white dark:bg-[#1A1815] rounded-2xl border border-brand-border dark:border-white/8 overflow-hidden",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between px-5 py-3 border-b border-brand-border dark:border-white/8",children:[r.jsx("span",{className:"font-body text-sm font-semibold text-brand-text dark:text-white",children:a}),(0,r.jsxs)("div",{className:"flex items-center gap-3",children:[t.length>1&&(0,r.jsxs)("button",{onClick:()=>{if(!C)return;let e=(v+1)%t.length;j(e),g(t[e](m))},className:"flex items-center gap-1.5 font-body text-xs font-semibold text-brand-muted dark:text-white/50 hover:text-brand-text dark:hover:text-white transition-colors",children:[r.jsx(d.Z,{size:12}),"Try another"]}),r.jsx("button",{onClick:()=>{navigator.clipboard.writeText(x),f(!0),setTimeout(()=>f(!1),2e3)},className:"flex items-center gap-1.5 font-body text-xs font-semibold text-brand-gold hover:text-brand-gold-dim transition-colors",children:y?(0,r.jsxs)(r.Fragment,{children:[r.jsx(l.Z,{size:12}),"Copied!"]}):(0,r.jsxs)(r.Fragment,{children:[r.jsx(c.Z,{size:12}),"Copy"]})})]})]}),r.jsx("div",{className:"p-5",children:r.jsx("pre",{className:"font-body text-sm text-brand-text dark:text-white whitespace-pre-wrap leading-relaxed",children:x})}),h&&r.jsx("div",{className:"px-5 py-3 bg-brand-gold/5 dark:bg-brand-gold/10 border-t border-brand-border dark:border-white/5",children:(0,r.jsxs)("p",{className:"font-body text-xs text-brand-muted dark:text-white/50",children:["\uD83D\uDCA1 ",h," ",r.jsx("a",{href:"/pricing",className:"text-brand-gold hover:underline",children:"Try Gravity →"})]})})]})})]})}},1805:(e,t,a)=>{"use strict";a.d(t,{default:()=>u});var r=a(10326),o=a(17577),n=a(9086),s=a(38522);let i=(0,a(25578).Z)("hash",[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]]);var d=a(32933),l=a(43810);let c={instagram:{business:["#entrepreneurship","#business","#startup","#founder","#entrepreneur","#businessowner","#smallbusiness","#businessgrowth","#businesstips","#ceo","#businesswoman","#businessmindset","#buildingabusiness","#businesscoach"],marketing:["#marketing","#digitalmarketing","#contentmarketing","#socialmedia","#growthhacking","#marketingstrategy","#instagrammarketing","#onlinemarketing","#emailmarketing","#brandmarketing","#contentcreator","#socialmediatips"],startup:["#startuplife","#startupindia","#saas","#b2b","#techstartup","#bootstrapped","#founderlife","#venturecapital","#startupgrowth","#indiestartup","#buildinginsocial","#saasgrowth"],lifestyle:["#productivity","#motivation","#success","#hustle","#mindset","#personaldevelopment","#selfimprovement","#dailymotivation","#goalsetting","#worklifebalance","#grindculture","#successmindset"],india:["#india","#indianstartup","#madeinindia","#indiabusiness","#mumbai","#bangalore","#delhi","#hyderabad","#chennai","#indianentrepreneur","#indiafounders","#bharatbuilds"],tech:["#technology","#ai","#artificialintelligence","#innovation","#automation","#digitaltransformation","#softwaredev","#machinelearning","#nocode","#futureofwork","#techfounder","#aitools"],content:["#contentcreation","#reels","#instagram","#linkinbio","#instagramgrowth","#creativeentrepreneur","#videocontent","#ugc","#trendingcontent","#viralcontent","#instagramstrategy","#contentplanning"],community:["#community","#collaboration","#networking","#womeninbusiness","#womenentrepreneurs","#femalebusiness","#supportsmallbusiness","#businessnetwork","#founderscommunity","#entrepreneurcommunity"]},linkedin:{business:["#entrepreneurship","#business","#leadership","#founder","#CEO","#entrepreneurmindset","#smallbusiness","#businessgrowth","#businessstrategy","#corporatelife","#management","#businessdevelopment"],marketing:["#marketing","#digitalmarketing","#contentmarketing","#B2Bmarketing","#growthhacking","#demandgeneration","#brandstrategy","#marketingleadership","#GTM","#revenuemarketing","#productmarketing","#inboundmarketing"],startup:["#startupfounder","#venturecapital","#startupecosystem","#SaaS","#B2B","#techstartup","#bootstrapped","#productledgrowth","#startuplesson","#founderlife","#startupadvice","#earlystage"],career:["#careerdevelopment","#professionalgrowth","#jobsearch","#hiring","#talentacquisition","#workculture","#remotework","#futureofwork","#leadership","#teambuilding","#mentorship","#executivecoach"],india:["#IndiaStartup","#IndianFounder","#MakeInIndia","#StartupIndia","#IndianEntrepreneur","#IndiaBusinesses","#IndianSaaS","#BharatBuilds","#TechIndia","#FoundersOfIndia"],tech:["#AI","#ArtificialIntelligence","#MachineLearning","#DataScience","#CloudComputing","#Automation","#DigitalTransformation","#Innovation","#TechLeadership","#ProductManagement","#EngineeringLeadership"]},twitter:{business:["#entrepreneurship","#business","#founder","#startup","#CEO","#businesstips","#smallbiz","#buildinginsocial","#entrepreneur","#bootstrapped","#founderlife","#buildinpublic"],marketing:["#marketing","#digitalmarketing","#contentmarketing","#SEO","#growthhacking","#emailmarketing","#socialmedia","#GTM","#B2Bmarketing","#contentcreator","#copywriting","#marketingtips"],startup:["#SaaS","#B2B","#startup","#indiehacker","#buildinpublic","#productledgrowth","#startuplife","#bootstrapped","#vc","#angelinvesting","#earlyaccess","#betalaunch"],tech:["#AI","#ML","#automation","#nocode","#webdev","#programming","#OpenAI","#ChatGPT","#devtools","#javascript","#python","#cloudnative"],india:["#IndiaStartup","#IndianFounder","#MakeInIndia","#BharatBuilds","#IndianTech","#StartupIndia","#FoundersOfIndia","#IndianSaaS"]}};function u(){let[e,t]=(0,o.useState)(""),[a,u]=(0,o.useState)("instagram"),[h,b]=(0,o.useState)(null),[m,p]=(0,o.useState)(null),[x,g]=(0,o.useState)(!1),y=()=>{e.trim()&&(b(function(e,t){let a=c[t],r=e.toLowerCase(),o=e.replace(/\s+/g,"").toLowerCase(),n="business";r.match(/marketing|content|brand|social media|seo|email/)?n="marketing":r.match(/tech|ai|software|app|code|dev|automation|machine learning/)?n="tech":r.match(/startup|saas|b2b|venture|product|launch/)?n="startup":r.match(/india|indian|desi|bharat/)?n="india":r.match(/lifestyle|wellness|fitness|health|food|travel/)?n="lifestyle":r.match(/content|creator|video|reel|post/)&&(n="content");let s=a[n]||a.business,i=a.marketing||a.business,d=a.startup||a.business,l=[`#${o}`,`#${o}tips`,`#${o}community`,`#best${o}`,`#${o}growth`],u=new Set,h=(e,t)=>{let a=[];for(let r of e){if(a.length>=t)break;u.has(r)||(u.add(r),a.push(r))}return a};return{top:h(s,10),medium:h([...i,...d],10),niche:h([...l,...a.india||[]],10)}}(e.trim(),a)),g(!0))},f=e=>{if(!h)return;let t="";t="all"===e?[...h.top,...h.medium,...h.niche].join(" "):h[e].join(" "),navigator.clipboard.writeText(t),p(e),setTimeout(()=>p(null),2e3)},w=h?[...h.top,...h.medium,...h.niche].join(" ").length:0;return(0,r.jsxs)("div",{className:"space-y-6",children:[r.jsx("div",{className:"bg-brand-off-white dark:bg-[#111110] rounded-2xl p-6 border border-brand-border dark:border-white/8",children:(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[(0,r.jsxs)("div",{className:"sm:col-span-1",children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Your topic or niche"}),r.jsx("input",{type:"text",value:e,onChange:e=>t(e.target.value),onKeyDown:e=>"Enter"===e.key&&y(),placeholder:"e.g. B2B SaaS marketing, fitness coaching, sustainable fashion",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Platform"}),(0,r.jsxs)("select",{value:a,onChange:e=>u(e.target.value),className:"w-full border border-brand-border dark:border-white/10 dark:bg-[#1A1815] dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors",children:[r.jsx("option",{value:"instagram",children:"Instagram"}),r.jsx("option",{value:"linkedin",children:"LinkedIn"}),r.jsx("option",{value:"twitter",children:"Twitter / X"})]})]})]}),(0,r.jsxs)("button",{onClick:y,disabled:!e.trim(),className:"flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-6 py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]",children:[r.jsx(i,{size:16}),"Generate 30 Hashtags"]})]})}),r.jsx(n.M,{children:x&&h&&(0,r.jsxs)(s.E.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"bg-white dark:bg-[#1A1815] rounded-2xl border border-brand-border dark:border-white/8 overflow-hidden",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between px-5 py-3 border-b border-brand-border dark:border-white/8",children:[(0,r.jsxs)("div",{className:"flex items-center gap-3",children:[(0,r.jsxs)("span",{className:"font-body text-sm font-semibold text-brand-text dark:text-white",children:["30 Hashtags for ",a]}),(0,r.jsxs)("span",{className:"font-body text-xs text-brand-muted dark:text-white/40",children:[w," chars"]})]}),r.jsx("button",{onClick:()=>f("all"),className:"flex items-center gap-1.5 font-body text-xs font-semibold text-brand-gold hover:text-brand-gold-dim transition-colors",children:"all"===m?(0,r.jsxs)(r.Fragment,{children:[r.jsx(d.Z,{size:12}),"Copied!"]}):(0,r.jsxs)(r.Fragment,{children:[r.jsx(l.Z,{size:12}),"Copy all 30"]})})]}),(0,r.jsxs)("div",{className:"p-5 space-y-6",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-3",children:[(0,r.jsxs)("div",{children:[r.jsx("p",{className:"font-body text-xs font-bold uppercase tracking-widest text-brand-muted dark:text-white/40",children:"High Reach"}),r.jsx("p",{className:"font-body text-[10px] text-brand-muted dark:text-white/30",children:"1M+ posts — broad discovery"})]}),(0,r.jsxs)("button",{onClick:()=>f("top"),className:"flex items-center gap-1 font-body text-xs text-brand-muted dark:text-white/40 hover:text-brand-gold transition-colors",children:["top"===m?r.jsx(d.Z,{size:10}):r.jsx(l.Z,{size:10}),r.jsx("span",{className:"ml-0.5",children:"Copy"})]})]}),r.jsx("div",{className:"flex flex-wrap gap-2",children:h.top.map(e=>r.jsx("span",{className:"font-body text-xs bg-brand-gold/10 dark:bg-brand-gold/15 text-brand-gold px-2.5 py-1 rounded-lg border border-brand-gold/20",children:e},e))})]}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-3",children:[(0,r.jsxs)("div",{children:[r.jsx("p",{className:"font-body text-xs font-bold uppercase tracking-widest text-brand-muted dark:text-white/40",children:"Medium Reach"}),r.jsx("p",{className:"font-body text-[10px] text-brand-muted dark:text-white/30",children:"100K–1M posts — better visibility"})]}),(0,r.jsxs)("button",{onClick:()=>f("medium"),className:"flex items-center gap-1 font-body text-xs text-brand-muted dark:text-white/40 hover:text-brand-gold transition-colors",children:["medium"===m?r.jsx(d.Z,{size:10}):r.jsx(l.Z,{size:10}),r.jsx("span",{className:"ml-0.5",children:"Copy"})]})]}),r.jsx("div",{className:"flex flex-wrap gap-2",children:h.medium.map(e=>r.jsx("span",{className:"font-body text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-lg border border-blue-500/20",children:e},e))})]}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-3",children:[(0,r.jsxs)("div",{children:[r.jsx("p",{className:"font-body text-xs font-bold uppercase tracking-widest text-brand-muted dark:text-white/40",children:"Niche"}),r.jsx("p",{className:"font-body text-[10px] text-brand-muted dark:text-white/30",children:"Under 100K — targeted, less competition"})]}),(0,r.jsxs)("button",{onClick:()=>f("niche"),className:"flex items-center gap-1 font-body text-xs text-brand-muted dark:text-white/40 hover:text-brand-gold transition-colors",children:["niche"===m?r.jsx(d.Z,{size:10}):r.jsx(l.Z,{size:10}),r.jsx("span",{className:"ml-0.5",children:"Copy"})]})]}),r.jsx("div",{className:"flex flex-wrap gap-2",children:h.niche.map(e=>r.jsx("span",{className:"font-body text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2.5 py-1 rounded-lg border border-green-500/20",children:e},e))})]})]}),r.jsx("div",{className:"px-5 py-3 bg-brand-gold/5 dark:bg-brand-gold/10 border-t border-brand-border dark:border-white/5",children:r.jsx("p",{className:"font-body text-xs text-brand-muted dark:text-white/50",children:"\uD83D\uDCA1 Best strategy: Use 3–5 high reach + 3–5 medium + 2–3 niche per post. Rotate sets weekly to avoid shadowban."})})]})})]})}},95732:(e,t,a)=>{"use strict";a.d(t,{default:()=>s});var r=a(10326),o=a(91598);let n=[e=>`IDEAL CUSTOMER PROFILE (ICP) — ${e.company||"Your Company"}

━━━━━━━━━━━━━━━━━━━━━━━

🏢 FIRMOGRAPHICS (Company Characteristics)
Industry: ${e.industry||"[Define your target industries]"}
Company size: ${e.companySize||"[Employee count range]"}
Revenue stage: ${e.revenue||"[Early stage / ₹1-10Cr ARR / Series A]"}
Geography: ${e.geo||"India — Tier 1 cities primarily"}
Business model: ${e.bizModel||"[B2B / B2C / SaaS / Services]"}

━━━━━━━━━━━━━━━━━━━━━━━

👤 BUYER CHARACTERISTICS (Decision Maker)
Title: ${e.title||"[Founder / CEO / Head of Marketing / VP Sales]"}
Has budget authority: ${e.budgetAuth||"Yes — makes final call or is key influencer"}
Technical level: ${e.techLevel||"Non-technical to moderate"}
Reports to: ${e.reportsTo||"Board / investors or is the final decision maker"}

━━━━━━━━━━━━━━━━━━━━━━━

🔥 TRIGGER EVENTS (when they start looking for you)
→ ${e.trigger1||"Just missed a growth target for the quarter"}
→ ${e.trigger2||"Brought on a new marketing/sales hire who needs tools"}
→ ${e.trigger3||"Saw a competitor getting results they want"}
→ Received funding and now need to grow faster
→ Got referral from a peer or community member

━━━━━━━━━━━━━━━━━━━━━━━

✅ GREEN FLAGS (they're a great fit if...)
→ ${e.greenFlag1||"They have product-market fit and now need to scale GTM"}
→ ${e.greenFlag2||"They've tried DIY approaches and hit a ceiling"}
→ They ask about ROI and metrics (not just features)
→ They can make a decision in 1-2 sales cycles
→ They have a specific, painful problem you solve

━━━━━━━━━━━━━━━━━━━━━━━

🚩 RED FLAGS (likely bad fit if...)
→ Still searching for product-market fit
→ Looking for cheapest option (price-sensitive above all)
→ Decision requires 5+ stakeholders and 6+ month cycle
→ Industry you don't serve well
→ Needs deep custom work / professional services

━━━━━━━━━━━━━━━━━━━━━━━

📊 QUALIFICATION QUESTIONS TO ASK
1. "How are you currently handling [your category]?"
2. "What does success look like in 90 days?"
3. "Who else is involved in this decision?"
4. "What's your timeline to get started?"
5. "What's your budget range for solving this?"

━━━━━━━━━━━━━━━━━━━━━━━

REVIEW THIS ICP MONTHLY
Your ICP evolves as you close more deals. Review after every 10 new customers.`];function s(){return r.jsx(o.Z,{fields:[{key:"company",label:"Your company name",type:"text",placeholder:"e.g. Nebulaa"},{key:"industry",label:"Your best customers' industry",type:"text",placeholder:"e.g. 'B2B SaaS, D2C brands, professional services'"},{key:"companySize",label:"Ideal company size",type:"text",placeholder:"e.g. '5-100 employees' or '₹50L-5Cr ARR'"},{key:"greenFlag1",label:"Top green flag (ideal customer characteristic)",type:"text",placeholder:"e.g. 'They already have paying customers and now want to grow faster'"}],templates:n,outputLabel:"Your ICP Document",buttonLabel:"Build My ICP",tip:"Look at your top 5 happiest customers and find what they have in common. That's your real ICP."})}},24332:(e,t,a)=>{"use strict";a.d(t,{default:()=>h});var r=a(10326),o=a(17577),n=a(9086),s=a(38522),i=a(24527),d=a(32933),l=a(43810);let c={casual:(e,t)=>`okay can we just talk about ${e} for a second? 🙌

this has honestly been such a vibe lately and I'm not even sorry about it ✨

dropping this here because you guys deserve to know 👀

${t?`— ${t}`:""}

save this for later, you'll thank me 📌`,inspirational:(e,t)=>`${e} — and it's everything. ✨

Sometimes the smallest shifts create the biggest changes. This is one of those moments.

Reminder: You're doing better than you think. Keep going. 💛

${t?`Brought to you with love by ${t} 🤍`:""}

Tag someone who needs to see this today 👇`,promotional:(e,t)=>`Introducing: ${e} 🚀

Here's everything you need to know:

✅ Built for people who want results
✅ No complicated setup
✅ Works from day one

${t?`This is what ${t} is all about.`:""}

Link in bio to grab yours. Don't sleep on this 👆`,educational:(e,t)=>`Did you know? ${e} 🧠

Most people overlook this — but once you know it, you can't unsee it.

Here's the quick breakdown:

→ Start with the basics
→ Build consistency over time
→ Measure what matters

${t?`${t} breaks it down for you every week.`:""}

Save this post for when you need a reminder 📌
Follow for more tips like this every week 👆`},u={business:["#entrepreneurship","#business","#startup","#founder","#ceo","#entrepreneur","#businessowner","#smallbusiness","#businessgrowth","#businesstips"],marketing:["#marketing","#digitalmarketing","#contentmarketing","#socialmedia","#growthhacking","#marketingstrategy","#brandmarketing","#onlinemarketing","#emailmarketing","#influencermarketing"],startup:["#startuplife","#startupindia","#saas","#b2b","#growthhack","#techstartup","#bootstrapped","#founderlife","#venturecapital","#startupgrowth"],lifestyle:["#productivity","#motivation","#success","#hustle","#mindset","#personaldevelopment","#selfimprovement","#dailymotivation","#goalsetting","#womenempowerment"],content:["#contentcreator","#contentstrategy","#blogging","#socialmediatips","#instagrammarketing","#reels","#instagram","#linkinbio","#instagramgrowth","#creativeentrepreneur"],community:["#community","#collaboration","#networking","#supportsmallbusiness","#shoplocal","#womeninbusiness","#momboss","#bossbabe","#girlboss","#femalebusiness"],india:["#india","#indianstartup","#madeinIndia","#indiabusiness","#desi","#mumbai","#bangalore","#delhi","#hyderabad","#chennai"],tech:["#technology","#ai","#artificialintelligence","#innovation","#techfounder","#automation","#future","#digitaltransformation","#softwaredev","#machinelearning"]};function h(){let[e,t]=(0,o.useState)(""),[a,h]=(0,o.useState)(""),[b,m]=(0,o.useState)("casual"),[p,x]=(0,o.useState)(""),[g,y]=(0,o.useState)(null),[f,w]=(0,o.useState)(!1),[k,v]=(0,o.useState)(!1),[j,N]=(0,o.useState)(!1),C=g?[...g.top,...g.medium,...g.niche].join(" "):"";return(0,r.jsxs)("div",{className:"space-y-6",children:[r.jsx("div",{className:"bg-brand-off-white dark:bg-[#111110] rounded-2xl p-6 border border-brand-border dark:border-white/8",children:(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Describe your post"}),r.jsx("textarea",{value:e,onChange:e=>t(e.target.value),rows:3,placeholder:"e.g. 'behind the scenes of building my SaaS in 60 days' or 'new product launch for eco water bottles'",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-3 font-body text-sm resize-none outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]}),(0,r.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:["Brand / Account name ",r.jsx("span",{className:"font-normal text-brand-muted dark:text-white/40",children:"(optional)"})]}),r.jsx("input",{type:"text",value:a,onChange:e=>h(e.target.value),placeholder:"e.g. Nebulaa.ai",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Tone"}),(0,r.jsxs)("select",{value:b,onChange:e=>m(e.target.value),className:"w-full border border-brand-border dark:border-white/10 dark:bg-[#1A1815] dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors",children:[r.jsx("option",{value:"casual",children:"Casual / Relatable"}),r.jsx("option",{value:"inspirational",children:"Inspirational"}),r.jsx("option",{value:"promotional",children:"Promotional"}),r.jsx("option",{value:"educational",children:"Educational"})]})]})]}),(0,r.jsxs)("button",{onClick:()=>{e.trim()&&(x((0,c[b])(e.trim(),a.trim())),y(function(e){let t=e.toLowerCase(),a=[],r=[],o=[];t.match(/business|startup|founder|entrepreneur/)?(a=u.business.slice(0,4),r=u.startup.slice(0,4),o=u.india.slice(0,2)):t.match(/marketing|content|brand|social/)?(a=u.marketing.slice(0,4),r=u.content.slice(0,4),o=u.startup.slice(0,2)):t.match(/tech|ai|software|app|digital/)?(a=u.tech.slice(0,4),r=u.marketing.slice(0,4),o=u.startup.slice(0,2)):t.match(/lifestyle|motivation|mindset|success/)?(a=u.lifestyle.slice(0,4),r=u.community.slice(0,4),o=u.content.slice(0,2)):(a=u.business.slice(0,4),r=u.lifestyle.slice(0,4),o=u.india.slice(0,2));let n=[...u.content,...u.community,...u.lifestyle,...u.startup].filter(e=>!a.includes(e)&&!r.includes(e)&&!o.includes(e)),s=[`#${e.replace(/\s+/g,"").toLowerCase()}`,`#${e.replace(/\s+/g,"").toLowerCase()}tips`,`#${e.replace(/\s+/g,"").toLowerCase()}life`];return a=[...a,...n.slice(0,6)].slice(0,10),r=[...r,...n.slice(6,12)].slice(0,10),o=[...s,...o,...n.slice(12,17)].slice(0,10),{top:a,medium:r,niche:o}}(e.trim())),N(!0))},disabled:!e.trim(),className:"flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-6 py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]",children:[r.jsx(i.Z,{size:16}),"Generate Caption"]})]})}),r.jsx(n.M,{children:j&&p&&(0,r.jsxs)(s.E.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"space-y-5",children:[(0,r.jsxs)("div",{className:"bg-white dark:bg-[#1A1815] rounded-2xl border border-brand-border dark:border-white/8 overflow-hidden",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between px-5 py-3 border-b border-brand-border dark:border-white/8",children:[r.jsx("span",{className:"font-body text-sm font-semibold text-brand-text dark:text-white",children:"Caption"}),r.jsx("button",{onClick:()=>{navigator.clipboard.writeText(p),w(!0),setTimeout(()=>w(!1),2e3)},className:"flex items-center gap-1.5 font-body text-xs font-semibold text-brand-gold hover:text-brand-gold-dim transition-colors",children:f?(0,r.jsxs)(r.Fragment,{children:[r.jsx(d.Z,{size:12}),"Copied!"]}):(0,r.jsxs)(r.Fragment,{children:[r.jsx(l.Z,{size:12}),"Copy"]})})]}),r.jsx("div",{className:"p-5",children:r.jsx("pre",{className:"font-body text-sm text-brand-text dark:text-white whitespace-pre-wrap leading-relaxed",children:p})})]}),g&&(0,r.jsxs)("div",{className:"bg-white dark:bg-[#1A1815] rounded-2xl border border-brand-border dark:border-white/8 overflow-hidden",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between px-5 py-3 border-b border-brand-border dark:border-white/8",children:[r.jsx("span",{className:"font-body text-sm font-semibold text-brand-text dark:text-white",children:"30 Hashtags"}),r.jsx("button",{onClick:()=>{navigator.clipboard.writeText(C),v(!0),setTimeout(()=>v(!1),2e3)},className:"flex items-center gap-1.5 font-body text-xs font-semibold text-brand-gold hover:text-brand-gold-dim transition-colors",children:k?(0,r.jsxs)(r.Fragment,{children:[r.jsx(d.Z,{size:12}),"Copied!"]}):(0,r.jsxs)(r.Fragment,{children:[r.jsx(l.Z,{size:12}),"Copy all"]})})]}),(0,r.jsxs)("div",{className:"p-5 space-y-4",children:[(0,r.jsxs)("div",{children:[r.jsx("p",{className:"font-body text-xs font-bold text-brand-muted dark:text-white/40 uppercase tracking-widest mb-2",children:"High Reach (10)"}),r.jsx("div",{className:"flex flex-wrap gap-2",children:g.top.map(e=>r.jsx("span",{className:"font-body text-xs bg-brand-gold/10 text-brand-gold px-2 py-1 rounded-lg",children:e},e))})]}),(0,r.jsxs)("div",{children:[r.jsx("p",{className:"font-body text-xs font-bold text-brand-muted dark:text-white/40 uppercase tracking-widest mb-2",children:"Medium Reach (10)"}),r.jsx("div",{className:"flex flex-wrap gap-2",children:g.medium.map(e=>r.jsx("span",{className:"font-body text-xs bg-blue-500/10 text-blue-500 dark:text-blue-400 px-2 py-1 rounded-lg",children:e},e))})]}),(0,r.jsxs)("div",{children:[r.jsx("p",{className:"font-body text-xs font-bold text-brand-muted dark:text-white/40 uppercase tracking-widest mb-2",children:"Niche (10)"}),r.jsx("div",{className:"flex flex-wrap gap-2",children:g.niche.map(e=>r.jsx("span",{className:"font-body text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-1 rounded-lg",children:e},e))})]})]})]}),r.jsx("div",{className:"px-1",children:(0,r.jsxs)("p",{className:"font-body text-xs text-brand-muted dark:text-white/50",children:["\uD83D\uDCA1 Tip: Post the hashtags in the first comment, not the caption, for a cleaner look. Want automated captions daily?"," ",r.jsx("a",{href:"/pricing",className:"text-brand-gold hover:underline",children:"Try Gravity →"})]})})]})})]})}},71585:(e,t,a)=>{"use strict";a.d(t,{default:()=>i});var r=a(10326),o=a(17577),n=a(9086),s=a(38522);function i(){let[e,t]=(0,o.useState)(""),[a,i]=(0,o.useState)(""),[d,l]=(0,o.useState)(""),[c,u]=(0,o.useState)(""),[h,b]=(0,o.useState)(!1),m=parseFloat(e.replace(/,/g,""))||0,p=parseFloat(a)||0,x=parseFloat(d)||0,g=parseFloat(c.replace(/,/g,""))||0,y=m*p*x,f=g>0?y/g:0,w=e=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(e),k=f>=5?{label:"\uD83D\uDD25 Excellent — highly profitable",color:"text-green-500"}:f>=3?{label:"✅ Healthy — sustainable growth",color:"text-green-500"}:f>=1?{label:"⚠️ Low — improve retention or reduce CAC",color:"text-yellow-500"}:{label:"❌ Unsustainable — major optimization needed",color:"text-red-400"};return(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{className:"bg-brand-off-white dark:bg-[#111110] rounded-2xl p-6 border border-brand-border dark:border-white/8",children:[(0,r.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Avg Revenue per Purchase (₹)"}),r.jsx("input",{type:"text",value:e,onChange:e=>t(e.target.value),placeholder:"e.g. 5000",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"}),r.jsx("p",{className:"font-body text-xs text-brand-muted dark:text-white/30 mt-1",children:"Average order / subscription value"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Purchase Frequency (per year)"}),r.jsx("input",{type:"number",value:a,onChange:e=>i(e.target.value),placeholder:"e.g. 12 (monthly)",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"}),r.jsx("p",{className:"font-body text-xs text-brand-muted dark:text-white/30 mt-1",children:"How many times/year do they buy?"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Avg Customer Lifespan (years)"}),r.jsx("input",{type:"number",value:d,onChange:e=>l(e.target.value),placeholder:"e.g. 2",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"}),r.jsx("p",{className:"font-body text-xs text-brand-muted dark:text-white/30 mt-1",children:"How long do customers stay on average?"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Your CAC (₹) — optional"}),r.jsx("input",{type:"text",value:c,onChange:e=>u(e.target.value),placeholder:"e.g. 8000",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"}),r.jsx("p",{className:"font-body text-xs text-brand-muted dark:text-white/30 mt-1",children:"Use our CAC calculator if unsure"})]})]}),r.jsx("button",{onClick:()=>{m>0&&p>0&&x>0&&b(!0)},disabled:!e||!a||!d,className:"mt-4 flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-6 py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]",children:"♾️ Calculate LTV"})]}),r.jsx(n.M,{children:h&&y>0&&(0,r.jsxs)(s.E.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"space-y-4",children:[r.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 gap-4",children:[{label:"Customer LTV",value:w(y),sub:"total lifetime value",color:"text-brand-gold"},{label:"Annual Revenue/Customer",value:w(m*p),sub:"per year",color:"text-blue-500"},...g>0?[{label:"LTV:CAC Ratio",value:`${f.toFixed(1)}:1`,sub:k.label.split(" — ")[0],color:k.color}]:[]].map(e=>(0,r.jsxs)("div",{className:"bg-white dark:bg-[#1A1815] rounded-2xl p-4 border border-brand-border dark:border-white/8 text-center",children:[r.jsx("p",{className:`font-heading font-bold text-2xl ${e.color}`,children:e.value}),r.jsx("p",{className:"font-body text-xs font-semibold text-brand-text dark:text-white mt-1",children:e.label}),r.jsx("p",{className:"font-body text-xs text-brand-muted dark:text-white/40 mt-0.5",children:e.sub})]},e.label))}),g>0&&(0,r.jsxs)("div",{className:"bg-white dark:bg-[#1A1815] rounded-2xl p-5 border border-brand-border dark:border-white/8",children:[r.jsx("p",{className:`font-body text-sm font-semibold mb-3 ${k.color}`,children:k.label}),(0,r.jsxs)("div",{className:"space-y-1.5 font-body text-sm text-brand-muted dark:text-white/60",children:[(0,r.jsxs)("p",{children:["→ You spend ",w(g)," to acquire a customer worth ",w(y)]}),(0,r.jsxs)("p",{children:["→ For every ₹1 spent on acquisition, you get ₹",f.toFixed(1)," back"]}),(0,r.jsxs)("p",{children:["→ Target: ",w(3*g)," LTV minimum for sustainable growth (3:1 ratio)"]})]})]}),r.jsx("div",{className:"bg-brand-gold/5 dark:bg-brand-gold/10 rounded-2xl p-4 border border-brand-gold/20",children:(0,r.jsxs)("p",{className:"font-body text-xs text-brand-muted dark:text-white/50",children:["\uD83D\uDCA1 Increasing retention by just 5% can increase LTV by 25-95%. Focus on keeping customers longer, not just acquiring new ones."," ",r.jsx("a",{href:"/pricing",className:"text-brand-gold hover:underline",children:"Try Gravity →"})]})})]})})]})}},77401:(e,t,a)=>{"use strict";a.d(t,{default:()=>d});var r=a(10326),o=a(17577),n=a(9086),s=a(38522);let i=[{id:"budget_allocated",category:"Budget",text:"Do they have budget allocated for this?",options:[{label:"Yes — confirmed budget",score:25},{label:"Maybe — exploring options",score:15},{label:"Unknown — not discussed",score:8},{label:"No — no budget right now",score:0}]},{id:"decision_maker",category:"Authority",text:"Are you talking to the decision maker?",options:[{label:"Yes — they sign the cheques",score:25},{label:"Partly — influencer, not final decision",score:15},{label:"No — need to get to the right person",score:5},{label:"Unknown — haven't asked",score:3}]},{id:"pain_strength",category:"Need",text:"How strong is their pain or need?",options:[{label:"Very strong — actively looking for solutions",score:25},{label:"Moderate — aware of the problem",score:17},{label:"Mild — nice to have, not urgent",score:8},{label:"None — can't see the need yet",score:0}]},{id:"solution_fit",category:"Need",text:"Does your solution match their problem?",options:[{label:"Strong fit — solves their #1 problem",score:25},{label:"Partial fit — solves part of the problem",score:15},{label:"Weak fit — tangentially relevant",score:5},{label:"No fit — wrong product for them",score:0}]},{id:"timeline",category:"Timeline",text:"When do they need a solution?",options:[{label:"Immediately — within 30 days",score:25},{label:"Soon — 1–3 months",score:18},{label:"Later — 3–6 months",score:10},{label:"No timeline — just exploring",score:3}]},{id:"urgency",category:"Timeline",text:"Is there a business event driving urgency?",options:[{label:"Yes — funding round, launch, quarter end",score:25},{label:"Somewhat — general growth pressure",score:15},{label:"Not really — business as usual",score:5},{label:"Unknown — haven't discussed",score:3}]},{id:"competition",category:"Competition",text:"Are they evaluating other solutions?",options:[{label:"We're the only option they're considering",score:15},{label:"Comparing 2–3 options including us",score:10},{label:"We came in late, heavy competition",score:5},{label:"Unknown — haven't asked",score:3}]},{id:"relationship",category:"Relationship",text:"How warm is the relationship?",options:[{label:"Referral or warm intro — they know us",score:15},{label:"Had a good conversation, responsive",score:10},{label:"Cold outreach, first interaction",score:5},{label:"Ghosted or unresponsive previously",score:0}]}];function d(){let[e,t]=(0,o.useState)({}),[a,d]=(0,o.useState)(!1),l=Object.keys(e).length,c=Object.values(e).reduce((e,t)=>e+t,0),u=Math.round(c/160*100),h=function(e){let t=e/160*100;return t>=75?{label:"Hot Lead",emoji:"\uD83D\uDD25",color:"text-red-500 dark:text-red-400",description:"This prospect is ready to move. High intent, right person, clear budget.",action:"Call or email within 24 hours. Offer a demo or proposal."}:t>=55?{label:"Warm Lead",emoji:"♨️",color:"text-orange-500 dark:text-orange-400",description:"Strong potential but needs nurturing. A few qualification gaps to close.",action:"Schedule a discovery call. Address the missing qualification criteria."}:t>=35?{label:"Nurturing Lead",emoji:"\uD83C\uDF31",color:"text-yellow-500 dark:text-yellow-400",description:"Early stage. Interested but not ready. Keep them warm.",action:"Add to email sequence. Share case studies and educational content monthly."}:{label:"Cold Lead",emoji:"❄️",color:"text-blue-400 dark:text-blue-400",description:"Not the right time or fit. Park this one for now.",action:"Move to long-term nurture list. Revisit in 90 days."}}(c),b=l===i.length;return(0,r.jsxs)("div",{className:"space-y-6",children:[r.jsx("div",{className:"space-y-4",children:i.map((a,o)=>(0,r.jsxs)("div",{className:"bg-brand-off-white dark:bg-[#111110] rounded-2xl p-5 border border-brand-border dark:border-white/8",children:[(0,r.jsxs)("div",{className:"flex items-start gap-3 mb-4",children:[r.jsx("span",{className:"flex-shrink-0 w-6 h-6 rounded-full bg-brand-gold/15 text-brand-gold font-body text-xs font-bold flex items-center justify-center mt-0.5",children:o+1}),(0,r.jsxs)("div",{children:[r.jsx("p",{className:"font-body text-[10px] font-bold uppercase tracking-widest text-brand-muted dark:text-white/40 mb-1",children:a.category}),r.jsx("p",{className:"font-body text-sm font-semibold text-brand-text dark:text-white",children:a.text})]})]}),r.jsx("div",{className:"space-y-2 pl-9",children:a.options.map(o=>(0,r.jsxs)("label",{className:`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${e[a.id]===o.score?"border-brand-gold bg-brand-gold/10 dark:bg-brand-gold/10":"border-transparent hover:bg-white dark:hover:bg-white/5 hover:border-brand-border"}`,children:[r.jsx("input",{type:"radio",name:a.id,value:o.score,checked:e[a.id]===o.score,onChange:()=>t(e=>({...e,[a.id]:o.score})),className:"accent-brand-gold"}),r.jsx("span",{className:"font-body text-sm text-brand-text dark:text-white",children:o.label}),(0,r.jsxs)("span",{className:"ml-auto font-body text-xs font-bold text-brand-muted dark:text-white/30",children:["+",o.score]})]},o.label))})]},a.id))}),(0,r.jsxs)("div",{className:"flex items-center gap-3",children:[r.jsx("div",{className:"flex-1 bg-brand-warm-gray dark:bg-white/10 rounded-full h-1.5",children:r.jsx("div",{className:"bg-brand-gold h-1.5 rounded-full transition-all duration-500",style:{width:`${l/i.length*100}%`}})}),(0,r.jsxs)("span",{className:"font-body text-xs text-brand-muted dark:text-white/40",children:[l,"/",i.length," answered"]})]}),r.jsx("button",{onClick:()=>d(!0),disabled:!b,className:"w-full flex items-center justify-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-6 py-3.5 hover:bg-brand-gold-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01]",children:"Calculate Lead Score"}),r.jsx(n.M,{children:a&&b&&(0,r.jsxs)(s.E.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"bg-white dark:bg-[#1A1815] rounded-2xl border border-brand-border dark:border-white/8 overflow-hidden",children:[(0,r.jsxs)("div",{className:"p-6",children:[(0,r.jsxs)("div",{className:"text-center mb-6",children:[r.jsx("div",{className:"text-5xl mb-3",children:h.emoji}),r.jsx("h3",{className:`font-heading font-bold text-2xl mb-1 ${h.color}`,children:h.label}),(0,r.jsxs)("p",{className:"font-body text-4xl font-bold text-brand-text dark:text-white",children:[u,r.jsx("span",{className:"text-lg font-normal text-brand-muted dark:text-white/40",children:"/100"})]})]}),(0,r.jsxs)("div",{className:"mb-6",children:[r.jsx("div",{className:"bg-brand-warm-gray dark:bg-white/10 rounded-full h-3",children:r.jsx(s.E.div,{initial:{width:0},animate:{width:`${u}%`},transition:{duration:.8,ease:"easeOut",delay:.2},className:"bg-brand-gold h-3 rounded-full"})}),(0,r.jsxs)("div",{className:"flex justify-between mt-1.5",children:[r.jsx("span",{className:"font-body text-[10px] text-brand-muted dark:text-white/30",children:"Cold"}),r.jsx("span",{className:"font-body text-[10px] text-brand-muted dark:text-white/30",children:"Hot"})]})]}),r.jsx("div",{className:"grid grid-cols-2 gap-3 mb-6",children:["Budget","Authority","Need","Timeline"].map(t=>{let a=i.filter(e=>e.category===t),o=a.reduce((t,a)=>t+(e[a.id]||0),0),n=a.reduce((e,t)=>e+Math.max(...t.options.map(e=>e.score)),0),s=n>0?Math.round(o/n*100):0;return(0,r.jsxs)("div",{className:"bg-brand-off-white dark:bg-white/5 rounded-xl p-3",children:[r.jsx("p",{className:"font-body text-xs font-bold text-brand-muted dark:text-white/40 uppercase tracking-widest mb-2",children:t}),r.jsx("div",{className:"bg-brand-warm-gray dark:bg-white/10 rounded-full h-1.5 mb-1.5",children:r.jsx("div",{className:"bg-brand-gold h-1.5 rounded-full",style:{width:`${s}%`}})}),(0,r.jsxs)("p",{className:"font-body text-xs font-bold text-brand-text dark:text-white",children:[s,"%"]})]},t)})}),(0,r.jsxs)("div",{className:"bg-brand-off-white dark:bg-white/5 rounded-xl p-4 mb-4",children:[r.jsx("p",{className:"font-body text-sm text-brand-text dark:text-white mb-2",children:h.description}),(0,r.jsxs)("p",{className:"font-body text-sm font-semibold text-brand-gold",children:["Next step: ",h.action]})]}),r.jsx("button",{onClick:()=>{t({}),d(!1)},className:"w-full font-body text-sm text-brand-muted dark:text-white/50 hover:text-brand-text dark:hover:text-white transition-colors py-2",children:"Score another lead →"})]}),r.jsx("div",{className:"px-5 py-3 bg-brand-gold/5 dark:bg-brand-gold/10 border-t border-brand-border dark:border-white/5",children:(0,r.jsxs)("p",{className:"font-body text-xs text-brand-muted dark:text-white/50",children:["\uD83D\uDCA1 Pulsar by Nebulaa automatically qualifies your leads and routes hot ones to you in real-time."," ",r.jsx("a",{href:"/pricing",className:"text-brand-gold hover:underline",children:"Try it free →"})]})})]})})]})}},969:(e,t,a)=>{"use strict";a.d(t,{default:()=>s});var r=a(10326),o=a(91598);let n=[e=>`Hi ${e.name?e.name.split(" ")[0]:"[Name]"},

${e.reason||`I came across your profile and was impressed by your work in ${e.industry||"your space"}`}.

${e.context||"Would love to connect and learn from your experience."}

No pitch, just genuine interest in building my network with people doing interesting work.

${e.sender?`— ${e.sender}`:""}`,e=>`Hey ${e.name?e.name.split(" ")[0]:"[Name]"} 👋

${e.reason||`Saw your ${e.industry||"recent"} post and it really resonated with me`}.

${e.context||`Would love to stay connected — always trying to surround myself with people building interesting things.`}

${e.sender?`— ${e.sender}`:""}`,e=>`Hi ${e.name?e.name.split(" ")[0]:"[Name]"},

I noticed we're both ${e.commonality||`working in ${e.industry||"the startup space"}`} and wanted to connect.

${e.context||"Would love to exchange notes sometime — always happy to share what I know and learn from others."}

${e.sender?`— ${e.sender}`:""}`];function s(){return r.jsx(o.Z,{fields:[{key:"name",label:"Prospect's full name",type:"text",placeholder:"e.g. Priya Sharma"},{key:"reason",label:"Why are you reaching out? (what caught your eye)",type:"textarea",placeholder:"e.g. 'I saw your post about scaling B2B sales without SDRs — it was spot on'",rows:2},{key:"context",label:"What do you want from this connection? (optional)",type:"text",placeholder:"e.g. 'Would love to learn how you approached your GTM strategy'"},{key:"sender",label:"Your name (optional)",type:"text",placeholder:"e.g. Arjun"}],templates:n,outputLabel:"Your Connection Message",buttonLabel:"Generate Message",tip:"Keep it under 300 characters for best acceptance rate. Be specific — generic messages get ignored."})}},69466:(e,t,a)=>{"use strict";a.d(t,{default:()=>h});var r=a(10326),o=a(17577),n=a(9086),s=a(38522),i=a(24527),d=a(21405),l=a(32933),c=a(43810);let u={storytelling:[e=>`I used to struggle with ${e}. Every day felt like I was going in circles.

Then one day, I decided to do something different.

I stopped trying to figure it out alone and started paying attention to what was actually working.

Here's what I learned:

→ Start with clarity, not complexity
→ Small daily actions compound faster than big sporadic ones
→ The people winning aren't smarter — they're more consistent

If you're still stuck on ${e}, this is your sign to change the approach.

What's one thing you've changed recently that made a difference? 👇

#Founder #Growth #${e.replace(/\s+/g,"")} #StartupLife #Entrepreneurship`,e=>`Nobody told me ${e} would be this hard.

6 months in, I almost quit.

Here's the honest story:

Month 1: I tried everything I read online. Nothing stuck.
Month 2: I doubled down on one thing. Still no results.
Month 3: I had a conversation that changed everything.

The turning point wasn't a strategy. It was a mindset shift.

I stopped asking "how do I grow?" and started asking "what does my customer actually need?"

That one reframe built everything I have today.

If you're early in your ${e} journey — hang in there. The breakthrough is closer than you think.

Drop a 🙌 if this hit home.

#Entrepreneurship #${e.replace(/\s+/g,"")} #FounderLife #Mindset #Startup`],professional:[e=>`${e} is one of the most overlooked growth levers for early-stage founders.

Here are 5 things I wish I knew earlier:

1. You don't need a big team — you need the right systems
2. Consistency beats perfection every single time
3. Your ICP matters more than your product at early stage
4. The best marketing is a product people talk about
5. Automate what drains you. Double down on what scales

The founders who crack ${e} early are the ones who hit consistent revenue without burning out.

Save this post for when you need a reminder. 🔖

#B2BSaaS #FounderLife #${e.replace(/\s+/g,"")} #GrowthHacking #Startup`,e=>`3 mistakes founders make with ${e} — and how to avoid them:

Mistake #1: Starting without a clear ICP
→ Fix: Define your top 3 customer profiles before doing anything else

Mistake #2: Trying to be everywhere at once
→ Fix: Pick ONE channel. Own it for 90 days before expanding

Mistake #3: Measuring the wrong metrics
→ Fix: Track inputs (activities) not just outputs (results)

Most ${e} problems aren't strategy problems. They're focus problems.

What would you add? 👇

#Marketing #Founder #${e.replace(/\s+/g,"")} #GTM #BusinessGrowth`],contrarian:[e=>`Hot take: Most advice about ${e} is completely wrong.

Here's what the "experts" won't tell you:

The conventional approach fails 80% of the time.

Why? Because it was designed for companies with unlimited budgets and 50-person teams.

You're a founder with 3 hats, 12-hour days, and real revenue pressure.

What actually works:
→ Ignore the playbooks. Study what YOUR competitors are doing
→ Talk to 5 customers before writing a single post
→ Distribution > content. Always.

${e} doesn't have to be complicated. It just has to be consistent.

Agree or disagree? 👇

#UnpopularOpinion #Founder #Marketing #${e.replace(/\s+/g,"")} #GrowthStrategy`,e=>`Everyone is doing ${e} wrong.

And I used to be one of them.

The lie we're sold: "Just follow the framework and it works."

The truth: frameworks are starting points, not answers.

Here's what no one talks about:

The founders crushing it with ${e} aren't following playbooks. They're obsessing over their specific customer in their specific market.

Generic advice → generic results.

Stop copying. Start studying.

Your customers will tell you exactly what works if you listen.

What's the most overrated ${e} advice you've heard? 👇

#RealTalk #Founder #${e.replace(/\s+/g,"")} #Marketing #StartupAdvice`],howto:[e=>`How to master ${e} in 30 days — even if you have zero time:

Week 1: Audit what you have
→ What's working? What isn't?
→ Where are people dropping off?
→ What does your best customer look like?

Week 2: Build the foundation
→ Pick one channel and own it
→ Create a repeatable system
→ Set a non-negotiable daily habit

Week 3: Execute and iterate
→ Ship fast, learn faster
→ Track one metric that matters
→ Say no to everything that doesn't move the needle

Week 4: Scale what works
→ Document your process
→ Delegate or automate
→ Do more of what's working

${e} isn't a sprint. It's a system.

Save this and come back in 30 days. 💪

#Productivity #Founder #${e.replace(/\s+/g,"")} #GrowthHacks #Entrepreneurship`,e=>`The exact 5-step process I use for ${e}:

Step 1: Define the outcome
→ What does success look like in 90 days?
→ Write it down. Make it specific.

Step 2: Map the constraints
→ Time, budget, team, skills
→ Work within them, not against them

Step 3: Pick the highest-leverage action
→ One thing. Not five. One.
→ Do it every day for 2 weeks before adding more.

Step 4: Track and adjust weekly
→ Same day each week. 30 minutes.
→ What worked? What didn't? What's next?

Step 5: Share what you learn
→ Teaching = the fastest way to master anything
→ LinkedIn posts count 😉

${e} becomes simple when you strip away the noise.

Save this. You'll need it. 📌

#SystemsThinking #${e.replace(/\s+/g,"")} #Founder #Productivity #Growth`]};function h(){let[e,t]=(0,o.useState)(""),[a,h]=(0,o.useState)("storytelling"),[b,m]=(0,o.useState)(""),[p,x]=(0,o.useState)(!1),[g,y]=(0,o.useState)(!1),[f,w]=(0,o.useState)(0);return(0,r.jsxs)("div",{className:"space-y-6",children:[r.jsx("div",{className:"bg-brand-off-white dark:bg-[#111110] rounded-2xl p-6 border border-brand-border dark:border-white/8",children:(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"What's your post about?"}),r.jsx("textarea",{value:e,onChange:e=>t(e.target.value),rows:3,placeholder:"e.g. 'cold outreach for B2B founders' or 'why I stopped using spreadsheets'",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-3 font-body text-sm resize-none outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]}),r.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Tone"}),(0,r.jsxs)("select",{value:a,onChange:e=>h(e.target.value),className:"w-full border border-brand-border dark:border-white/10 dark:bg-[#1A1815] dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors",children:[r.jsx("option",{value:"storytelling",children:"Storytelling"}),r.jsx("option",{value:"professional",children:"Professional / List"}),r.jsx("option",{value:"contrarian",children:"Contrarian / Hot take"}),r.jsx("option",{value:"howto",children:"How-to / Step-by-step"})]})]})}),(0,r.jsxs)("button",{onClick:()=>{if(!e.trim())return;let t=u[a],r=Math.floor(Math.random()*t.length);w(r),m(t[r](e.trim())),y(!0)},disabled:!e.trim(),className:"flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-6 py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]",children:[r.jsx(i.Z,{size:16}),"Generate Post"]})]})}),r.jsx(n.M,{children:g&&b&&(0,r.jsxs)(s.E.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"bg-white dark:bg-[#1A1815] rounded-2xl border border-brand-border dark:border-white/8 overflow-hidden",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between px-5 py-3 border-b border-brand-border dark:border-white/8",children:[r.jsx("span",{className:"font-body text-sm font-semibold text-brand-text dark:text-white",children:"Your LinkedIn Post"}),(0,r.jsxs)("div",{className:"flex items-center gap-3",children:[(0,r.jsxs)("button",{onClick:()=>{if(!e.trim())return;let t=u[a],r=(f+1)%t.length;w(r),m(t[r](e.trim()))},className:"flex items-center gap-1.5 font-body text-xs font-semibold text-brand-muted dark:text-white/50 hover:text-brand-text dark:hover:text-white transition-colors",children:[r.jsx(d.Z,{size:12}),"Try another"]}),r.jsx("button",{onClick:()=>{navigator.clipboard.writeText(b),x(!0),setTimeout(()=>x(!1),2e3)},className:"flex items-center gap-1.5 font-body text-xs font-semibold text-brand-gold hover:text-brand-gold-dim transition-colors",children:p?(0,r.jsxs)(r.Fragment,{children:[r.jsx(l.Z,{size:12}),"Copied!"]}):(0,r.jsxs)(r.Fragment,{children:[r.jsx(c.Z,{size:12}),"Copy"]})})]})]}),r.jsx("div",{className:"p-5",children:r.jsx("pre",{className:"font-body text-sm text-brand-text dark:text-white whitespace-pre-wrap leading-relaxed",children:b})}),r.jsx("div",{className:"px-5 py-3 bg-brand-gold/5 dark:bg-brand-gold/10 border-t border-brand-border dark:border-white/5",children:(0,r.jsxs)("p",{className:"font-body text-xs text-brand-muted dark:text-white/50",children:["\uD83D\uDCA1 Tip: Customize the post with your personal experience for 3x more engagement. Want this automated daily?"," ",r.jsx("a",{href:"/pricing",className:"text-brand-gold hover:underline",children:"Try Gravity →"})]})})]})})]})}},16020:(e,t,a)=>{"use strict";a.d(t,{default:()=>s});var r=a(10326),o=a(91598);let n=[e=>`Subject: Partnership idea for ${e.partner} + ${e.company}?

Hi ${e.contactName||"[Contact Name]"},

I'm ${e.yourName||"[Your Name]"} from ${e.company} — we ${e.whatYouDo||"help B2B founders grow without the usual grind"}.

I've been following what ${e.partner} is doing with ${e.partnerStrength||"your audience/product"} and I think there's a really natural fit here.

Here's the opportunity I see:

Our audience / strength: ${e.yourStrength||"[What you bring to the table]"}
Your audience / strength: ${e.partnerStrength||"[What they bring]"}
Mutual benefit: ${e.mutualBenefit||"[What both sides get]"}

I'm thinking ${e.partnershipType||"a co-marketing collaboration — a joint webinar, newsletter swap, or co-created content piece that adds value to both our audiences"}.

Not a one-sided pitch. I want this to genuinely work for ${e.partner} as much as it does for us.

Would you be open to a 20-minute call this week to explore if there's something here?

${e.yourName||"[Your Name]"}
${e.company}
${e.email||"[your email]"}`];function s(){return r.jsx(o.Z,{fields:[{key:"company",label:"Your company name",type:"text",placeholder:"e.g. Nebulaa"},{key:"partner",label:"Partner company you want to reach",type:"text",placeholder:"e.g. Zoho, Razorpay, or any company"},{key:"yourStrength",label:"What your company brings to the table",type:"text",placeholder:"e.g. '5,000 engaged B2B founder subscribers'"},{key:"mutualBenefit",label:"What does the partnership offer both sides?",type:"textarea",placeholder:"e.g. 'Co-branded webinar reaching both audiences, revenue share on joint customers'",rows:2},{key:"yourName",label:"Your name",type:"text",placeholder:"e.g. Arjun Sharma"}],templates:n,outputLabel:"Your Partnership Email",buttonLabel:"Generate Email",tip:"Lead with what THEY get, not what you want. The best partnerships are obvious wins for both sides."})}},56410:(e,t,a)=>{"use strict";a.d(t,{default:()=>s});var r=a(10326),o=a(91598);let n=[e=>`PITCH DECK OUTLINE — ${e.company||"Your Startup"}

━━━━━━━━━━━━━━━━━━━━━━━

📊 SLIDE 1: COVER
"${e.company} — ${e.tagline||"[Your one-line pitch]"}"
→ Logo, company name, tagline
→ Founding team photos (optional)
→ Contact details

━━━━━━━━━━━━━━━━━━━━━━━

😤 SLIDE 2: THE PROBLEM
"${e.problem||"[State the problem — make investors feel it]"}"
→ Who has this problem?
→ How big is it? (stats if possible)
→ Why is it painful right now?
→ Why existing solutions fail
Tip: Make this slide personal. Tell a real story.

━━━━━━━━━━━━━━━━━━━━━━━

💡 SLIDE 3: YOUR SOLUTION
"${e.solution||"[How you solve it — simply]"}"
→ What ${e.company} does in 1 sentence
→ Product screenshot / demo GIF
→ Before vs After
Tip: Less is more. One clear message beats five features.

━━━━━━━━━━━━━━━━━━━━━━━

🏆 SLIDE 4: WHY NOW
→ What's changed in the market that makes this the right time?
→ Technology / regulatory / behavioral shift?
→ Why 2025, not 2020 or 2030?

━━━━━━━━━━━━━━━━━━━━━━━

📏 SLIDE 5: MARKET SIZE
→ TAM: Total Addressable Market
→ SAM: Serviceable Addressable Market
→ SOM: Your realistic share in 3-5 years
→ Source your numbers

━━━━━━━━━━━━━━━━━━━━━━━

🛠️ SLIDE 6: PRODUCT DEEP DIVE
→ Core features (3 max)
→ How it works (step by step)
→ Screenshot / demo
→ Key differentiator from alternatives

━━━━━━━━━━━━━━━━━━━━━━━

💰 SLIDE 7: BUSINESS MODEL
→ How do you make money?
→ Pricing tiers
→ Unit economics: CAC, LTV, LTV:CAC ratio
→ Gross margins

━━━━━━━━━━━━━━━━━━━━━━━

📈 SLIDE 8: TRACTION
"${e.traction||"[Your best metrics — revenue, growth rate, customers, retention]"}"
→ Revenue / ARR
→ Growth rate MoM
→ Customer count and notable names
→ Key partnerships
Tip: Show a curve going up and to the right.

━━━━━━━━━━━━━━━━━━━━━━━

🗺️ SLIDE 9: GO-TO-MARKET
→ Acquisition channels (top 2-3)
→ How you find and close customers today
→ Scalable GTM strategy for next 18 months

━━━━━━━━━━━━━━━━━━━━━━━

🏟️ SLIDE 10: COMPETITION
→ Comparison matrix (you vs top 3 alternatives)
→ Your unique position in the market
→ Why you win (moat)
Note: Never say "no competition" — shows naivety.

━━━━━━━━━━━━━━━━━━━━━━━

👥 SLIDE 11: THE TEAM
→ Founders + key hires
→ Relevant domain expertise
→ Why this team for this problem?
→ Notable advisors / investors (if any)

━━━━━━━━━━━━━━━━━━━━━━━

🎯 SLIDE 12: THE ASK
"We're raising ${e.raise||"[amount]"} to ${e.useOfFunds||"[achieve specific milestone]"}"
→ How much you're raising
→ How you'll use it (3-4 buckets)
→ What milestone this gets you to
→ Your 18-month plan

━━━━━━━━━━━━━━━━━━━━━━━

PITCH TIPS:
→ 12 slides max. Every slide earns its place.
→ Lead with traction, not vision (if you have it)
→ Know your numbers cold — memorize them
→ End with the ask, not a "thanks"
→ Always have a 3-slide version ready for 5-minute pitches`];function s(){return r.jsx(o.Z,{fields:[{key:"company",label:"Startup name",type:"text",placeholder:"e.g. Nebulaa"},{key:"tagline",label:"One-line pitch",type:"text",placeholder:"e.g. 'AI-powered GTM automation for Indian founders'"},{key:"problem",label:"Core problem you solve",type:"textarea",placeholder:"e.g. 'Indian founders spend 15+ hours a week on sales and marketing with no system to scale it'",rows:2},{key:"traction",label:"Your best traction metrics (optional)",type:"text",placeholder:"e.g. '₹25L ARR, 60 customers, 40% MoM growth'"},{key:"raise",label:"How much are you raising?",type:"text",placeholder:"e.g. '₹2 Crore pre-seed'"}],templates:n,outputLabel:"Your Pitch Deck Outline",buttonLabel:"Generate Pitch Deck",tip:"The best pitches tell a compelling story. Problem → Why now → Why you → Why it works → What you need."})}},46328:(e,t,a)=>{"use strict";a.d(t,{default:()=>s});var r=a(10326),o=a(91598);let n=[e=>{let t=new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"});return`FOR IMMEDIATE RELEASE

${e.company} ${e.announcement}

${e.city||"Bangalore"}, India — ${t}

━━━━━━━━━━━━━━━━━━━━━━━

${e.company}, ${e.companyDesc||"a leading technology startup"}, today announced ${e.announcement.toLowerCase()}.

${e.detail||`This milestone represents a significant step forward for ${e.company} as it continues to expand its presence in the market and deliver value to its growing customer base.`}

"${e.quote||"We're incredibly excited about this development. It's a testament to the hard work of our team and the trust our customers have placed in us."}" said ${e.spokesperson||"the founding team"} of ${e.company}.

━━━━━━━━━━━━━━━━━━━━━━━

ABOUT ${e.company.toUpperCase()}

${e.about||`${e.company} is a technology company helping businesses grow faster with AI-powered tools. Founded in India, the company serves founders and SMEs across the country.`}

━━━━━━━━━━━━━━━━━━━━━━━

MEDIA CONTACT

${e.contactName||"[Contact Name]"}
${e.contactEmail||"[contact@company.com]"}
${e.contactPhone||"[+91 XXXXX XXXXX]"}

###`}];function s(){return r.jsx(o.Z,{fields:[{key:"company",label:"Company name",type:"text",placeholder:"e.g. Nebulaa"},{key:"announcement",label:"What are you announcing?",type:"textarea",placeholder:"e.g. 'raised ₹2 Crore in pre-seed funding' or 'launched AI-powered GTM platform'",rows:2},{key:"companyDesc",label:"Company description (optional)",type:"text",placeholder:"e.g. 'an AI-powered GTM automation platform for Indian founders'"},{key:"spokesperson",label:"Spokesperson name + title (optional)",type:"text",placeholder:"e.g. 'Arjun Sharma, CEO'"}],templates:n,outputLabel:"Your Press Release",buttonLabel:"Generate Press Release",tip:"Send your press release early in the week (Tuesday or Wednesday morning) for better media pickup."})}},2987:(e,t,a)=>{"use strict";a.d(t,{default:()=>s});var r=a(10326),o=a(91598);let n=[e=>`${e.product}

${e.tagline||`The smarter way to ${e.benefit||"get results"}.`}

━━━━━━━━━━━━━━━━━━━━━━━

${e.description?e.description+"\n\n":""}Here's the problem ${e.product} solves:

Most ${e.audience||"businesses"} waste hours on ${e.problem||"manual, repetitive work"} — time that should be spent on things that actually grow the business.

${e.product} changes that.

✅ ${e.feature1||"Saves hours of manual work every week"}
✅ ${e.feature2||"No technical setup required — works in minutes"}
✅ ${e.feature3||"Scales with your team as you grow"}

━━━━━━━━━━━━━━━━━━━━━━━

WHO IT'S FOR:
Perfect for ${e.audience||"founders, marketers, and growing teams"} who want ${e.benefit||"better results without burning out"}.

━━━━━━━━━━━━━━━━━━━━━━━

THE RESULT:
${e.result||"Teams using "+e.product+" save an average of 10 hours per week and see measurable improvement in their key metrics within the first month."}

━━━━━━━━━━━━━━━━━━━━━━━

[Try ${e.product} free →] [See pricing] [Book a demo]`];function s(){return r.jsx(o.Z,{fields:[{key:"product",label:"Product / service name",type:"text",placeholder:"e.g. Nebulaa Gravity"},{key:"audience",label:"Who is it for?",type:"text",placeholder:"e.g. 'B2B founders with 5-50 person teams'"},{key:"problem",label:"What problem does it solve?",type:"textarea",placeholder:"e.g. 'spending 10+ hours a week creating LinkedIn content manually'",rows:2},{key:"benefit",label:"Key benefit / outcome",type:"text",placeholder:"e.g. 'get consistent social media presence without the manual effort'"}],templates:n,outputLabel:"Your Product Description",buttonLabel:"Generate Description",tip:"Lead with the problem, not the features. Buyers buy outcomes, not functionality."})}},50611:(e,t,a)=>{"use strict";a.d(t,{default:()=>i});var r=a(10326),o=a(17577),n=a(9086),s=a(38522);function i(){let[e,t]=(0,o.useState)(""),[a,i]=(0,o.useState)(""),[d,l]=(0,o.useState)("12"),[c,u]=(0,o.useState)(!1),h=parseFloat(e.replace(/,/g,""))||0,b=parseFloat(a.replace(/,/g,""))||0,m=b-h,p=h>0?m/h*100:0,x=parseFloat(d)>0?p/parseFloat(d)*12:0,g=b>0?h/(b/parseFloat(d)):0,y=e=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(e);return(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{className:"bg-brand-off-white dark:bg-[#111110] rounded-2xl p-6 border border-brand-border dark:border-white/8",children:[(0,r.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Total Investment (₹)"}),r.jsx("input",{type:"text",value:e,onChange:e=>t(e.target.value),placeholder:"e.g. 50000",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"}),r.jsx("p",{className:"font-body text-xs text-brand-muted dark:text-white/30 mt-1",children:"All costs: tools, ads, team, time"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Total Returns / Revenue (₹)"}),r.jsx("input",{type:"text",value:a,onChange:e=>i(e.target.value),placeholder:"e.g. 200000",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"}),r.jsx("p",{className:"font-body text-xs text-brand-muted dark:text-white/30 mt-1",children:"Revenue attributable to this investment"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Time period"}),(0,r.jsxs)("select",{value:d,onChange:e=>l(e.target.value),className:"w-full border border-brand-border dark:border-white/10 dark:bg-[#1A1815] dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors",children:[r.jsx("option",{value:"1",children:"1 month"}),r.jsx("option",{value:"3",children:"3 months"}),r.jsx("option",{value:"6",children:"6 months"}),r.jsx("option",{value:"12",children:"12 months"})]})]})]}),r.jsx("button",{onClick:()=>{h>0&&b>0&&u(!0)},disabled:!e||!a,className:"mt-4 flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-6 py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]",children:"\uD83D\uDCC8 Calculate ROI"})]}),r.jsx(n.M,{children:c&&h>0&&b>0&&(0,r.jsxs)(s.E.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"space-y-4",children:[r.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-4",children:[{label:"ROI",value:`${p.toFixed(1)}%`,sub:p>=300?"\uD83D\uDD25 Exceptional":p>=100?"✅ Strong":p>=0?"⚠️ Positive":"❌ Negative",color:p>=0?"text-green-500":"text-red-400"},{label:"Net Profit",value:y(m),sub:"gain after costs",color:m>=0?"text-green-500":"text-red-400"},{label:"Annual ROI",value:`${x.toFixed(1)}%`,sub:"annualized return",color:"text-brand-gold"},{label:"Payback Period",value:`${g.toFixed(1)} mo`,sub:"to recover investment",color:"text-blue-500"}].map(e=>(0,r.jsxs)("div",{className:"bg-white dark:bg-[#1A1815] rounded-2xl p-4 border border-brand-border dark:border-white/8 text-center",children:[r.jsx("p",{className:`font-heading font-bold text-2xl ${e.color}`,children:e.value}),r.jsx("p",{className:"font-body text-xs font-semibold text-brand-text dark:text-white mt-1",children:e.label}),r.jsx("p",{className:"font-body text-xs text-brand-muted dark:text-white/40 mt-0.5",children:e.sub})]},e.label))}),(0,r.jsxs)("div",{className:"bg-white dark:bg-[#1A1815] rounded-2xl p-5 border border-brand-border dark:border-white/8",children:[r.jsx("p",{className:"font-body text-sm font-semibold text-brand-text dark:text-white mb-3",children:"Your ROI Narrative"}),(0,r.jsxs)("p",{className:"font-body text-sm text-brand-muted dark:text-white/70 leading-relaxed",children:['"',"We invested ",y(h)," over ",d," month",parseInt(d)>1?"s":""," and generated ",y(b)," in returns — a ",p.toFixed(0),"% ROI and net profit of ",y(m),". At this rate, we recover our investment in ",g.toFixed(1)," months, with an annualized return of ",x.toFixed(0),"%.",'"']})]}),r.jsx("div",{className:"bg-brand-gold/5 dark:bg-brand-gold/10 rounded-2xl p-4 border border-brand-gold/20",children:(0,r.jsxs)("p",{className:"font-body text-xs text-brand-muted dark:text-white/50",children:["\uD83D\uDCA1 Industry benchmark: B2B marketing typically targets 3-5x ROI (300-500%). Automate your highest-ROI activities to scale returns."," ",r.jsx("a",{href:"/pricing",className:"text-brand-gold hover:underline",children:"Try Gravity →"})]})})]})})]})}},28997:(e,t,a)=>{"use strict";a.d(t,{default:()=>s});var r=a(10326),o=a(91598);let n=[e=>`Subject: Know anyone who'd benefit from ${e.product||"[product]"}?

Hi ${e.customerName?e.customerName.split(" ")[0]:"[Name]"},

Hope you're doing well!

I wanted to reach out because you've been one of our best customers — and honestly, the kind of results you've seen with ${e.product||"[product]"} is exactly what we want to help more people achieve.

If you know anyone else who's dealing with ${e.pain||"the same challenges you were facing"}, I'd love an introduction. Specifically, we're great for:

→ ${e.persona1||"Founders building their first sales/marketing system"}
→ ${e.persona2||"Teams that have outgrown manual processes"}
→ ${e.persona3||"Anyone who wants to grow faster without adding headcount"}

${e.incentive?`As a thank you, we'll ${e.incentive} for every customer you refer.`:"We'll make sure any referral you send gets the same white-glove treatment you've received."}

If someone comes to mind, just forward this email or make a quick intro — I'll take it from there and make you look good 😊

Thanks so much — really appreciate being in your corner.

${e.senderName||"[Your Name]"}
${e.company||"[Your Company]"}`];function s(){return r.jsx(o.Z,{fields:[{key:"product",label:"Product / service name",type:"text",placeholder:"e.g. Nebulaa"},{key:"customerName",label:"Customer's name",type:"text",placeholder:"e.g. Priya Sharma"},{key:"pain",label:"Problem you solved for them",type:"text",placeholder:"e.g. 'inconsistent LinkedIn presence and manual outreach'"},{key:"incentive",label:"Referral incentive (optional)",type:"text",placeholder:"e.g. 'give you 1 month free for every referral who signs up'"},{key:"senderName",label:"Your name",type:"text",placeholder:"e.g. Arjun"}],templates:n,outputLabel:"Your Referral Email",buttonLabel:"Generate Email",tip:"Send referral requests when customer satisfaction is highest — after a milestone, win, or great support interaction."})}},2127:(e,t,a)=>{"use strict";a.d(t,{default:()=>s});var r=a(10326),o=a(91598);let n=[e=>{let t=e.keyword,a=e.topic,r=e.brand||"",o=[`${t?t.charAt(0).toUpperCase()+t.slice(1):"Discover"} — ${a}. ${r?r+" helps you ":""}get results faster with proven strategies, real examples, and step-by-step guidance. Free.`,`Learn ${t||a} with our comprehensive guide. Covers everything you need to know — from basics to advanced tactics. ${r?"By "+r+".":""}${a?" "+a+".":""}`,`${a}. Discover why ${t||"top founders"} ${r?"choose "+r:"use this approach"} and how you can get the same results starting today.`,`Looking for ${t||"a better approach to "+a}? Here's exactly what works in 2025 — no fluff, just actionable insights you can implement immediately.`,`${r?r+": ":""}${a}. The complete guide to ${t||a} for founders and business owners. Free tips, templates, and real-world examples.`].map((e,t)=>{let a=e.length;return`Option ${t+1} (${a} chars) ${a<=160?"✅":"⚠️"}
"${e}"`}).join("\n\n");return`5 SEO META DESCRIPTION OPTIONS FOR:
"${a}"
Target keyword: ${t||"(not specified)"}

━━━━━━━━━━━━━━━━━━━━━━━

${o}

━━━━━━━━━━━━━━━━━━━━━━━

TIPS FOR BETTER CTR:
→ Keep under 160 characters (Google truncates longer ones)
→ Include your target keyword naturally near the start
→ Use action words: "Discover", "Learn", "Get", "See"
→ Add a unique value hook — why click YOUR result?
→ Avoid clickbait — match what's actually on the page
→ Test different descriptions on your top 5 pages first`}];function s(){return r.jsx(o.Z,{fields:[{key:"topic",label:"What's the page about?",type:"text",placeholder:"e.g. 'how to write cold emails that get replies'"},{key:"keyword",label:"Target keyword",type:"text",placeholder:"e.g. 'cold email for B2B' or 'linkedin post generator'"},{key:"brand",label:"Brand name (optional)",type:"text",placeholder:"e.g. Nebulaa"}],templates:n,outputLabel:"Your Meta Description Options",buttonLabel:"Generate Meta Descriptions",tip:"Test multiple descriptions on your highest-traffic pages. Even a 1% CTR improvement compounds massively over time."})}},40544:(e,t,a)=>{"use strict";a.d(t,{default:()=>d});var r=a(10326),o=a(91598);let n={"too expensive":`OBJECTION: "It's too expensive"

━━━ ACKNOWLEDGE ━━━
"Totally fair — budget is always a real consideration. I appreciate you being upfront about that."

━━━ CLARIFY ━━━
"Can I ask — is it that the price is outside your budget entirely, or is it more that you're not sure if the ROI is there yet?"

━━━ REFRAME (if budget question) ━━━
"Here's how our customers think about it: the average customer saves [X hours / ₹Y] per month. At our price, that's typically a 3-5x return in the first 90 days. Does that change how you're thinking about it?"

━━━ OR REFRAME (if value question) ━━━
"That's actually exactly why we offer [trial / demo / pilot]. You shouldn't pay full price until you've seen the value yourself. Can we start there?"

━━━ CLOSE ━━━
"If the ROI were clear, is budget the only thing standing in the way — or are there other concerns I should know about?"`,"not the right time":`OBJECTION: "The timing isn't right"

━━━ ACKNOWLEDGE ━━━
"I hear you — and honestly, there's rarely a perfect time for anything new."

━━━ CLARIFY ━━━
"Help me understand what's happening right now. Is it a resource issue, a priority issue, or something else?"

━━━ REFRAME ━━━
"The founders I talk to who say 'not right now' often come back 3 months later saying they wish they'd started sooner. The problem you're facing today doesn't get smaller while you wait.

What would have to be true for the timing to be right?"

━━━ BRIDGE ━━━
"What if we started small — a pilot that doesn't require full commitment? That way you're not risking much, but you're also not losing 3 months of potential progress."

━━━ CLOSE ━━━
"What's the one thing that would need to change for you to feel comfortable moving forward?"`,"need to think about it":`OBJECTION: "Let me think about it / I'll get back to you"

━━━ ACKNOWLEDGE ━━━
"Of course — this is a real decision and I want you to feel good about it."

━━━ UNCOVER THE REAL OBJECTION ━━━
"Before you go, can I ask — what specifically is giving you pause? I've found 'need to think about it' usually means one of three things: price, timing, or not being sure it'll work for your situation. Which one is it for you?"

━━━ ADDRESS IT DIRECTLY ━━━
[Address whichever concern they share]

━━━ SET A SPECIFIC NEXT STEP ━━━
"I don't want to lose you to your inbox. Can we schedule a follow-up for [specific day and time]? That way you have time to think, and we have a clear next step."

━━━ CLOSE ━━━
"What would make this a no-brainer for you? Let's see if we can get there."`},s=e=>`OBJECTION: "${e}"

━━━ ACKNOWLEDGE ━━━
"That's a completely valid concern — I appreciate you sharing that with me."

━━━ CLARIFY ━━━
"Before I respond, can I ask what's behind that? I want to make sure I'm addressing what's actually on your mind, not just the surface-level concern."

━━━ REFRAME ━━━
"Here's how I'd think about it: [Restate the problem they're solving. Connect your solution directly to their specific situation. Use a specific number or customer example if you have one.]"

━━━ VALIDATE + PIVOT ━━━
"Does that address the concern, or is there something else underneath it I should know about?"

━━━ CLOSE ━━━
"What would need to be true for you to feel confident moving forward?"

━━━ UNIVERSAL TIPS ━━━
→ Never argue. Acknowledge first, always.
→ The stated objection is rarely the real one — dig for it
→ One specific customer story > ten logical arguments
→ End with a question, never a statement`,i=[e=>{let t=e.objection.toLowerCase();return t.includes("expensive")||t.includes("price")||t.includes("cost")||t.includes("budget")?n["too expensive"]:t.includes("time")||t.includes("timing")||t.includes("busy")||t.includes("later")||t.includes("quarter")?n["not the right time"]:t.includes("think")||t.includes("get back")||t.includes("consider")||t.includes("discuss")?n["need to think about it"]:s(e.objection)}];function d(){return r.jsx(o.Z,{fields:[{key:"objection",label:"What objection are you hearing?",type:"textarea",placeholder:'e.g. "It\'s too expensive" or "We already have a solution" or "Not the right time"',rows:2}],templates:i,outputLabel:"Your Objection Response Framework",buttonLabel:"Handle This Objection",tip:"The best salespeople make prospects feel heard before they respond. Always acknowledge, then clarify, then reframe."})}},36410:(e,t,a)=>{"use strict";a.d(t,{default:()=>c});var r=a(10326),o=a(17577),n=a(9086),s=a(38522),i=a(24527),d=a(32933),l=a(43810);function c(){let[e,t]=(0,o.useState)({name:"",role:"",company:"",specialty:"",cta:""}),[a,c]=(0,o.useState)(null),[u,h]=(0,o.useState)(null),[b,m]=(0,o.useState)(!1),p=(e,a)=>t(t=>({...t,[e]:a})),x=e.role.trim()&&e.company.trim()&&e.specialty.trim()&&e.cta.trim(),g=(e,t)=>{navigator.clipboard.writeText(t),h(e),setTimeout(()=>h(null),2e3)};return(0,r.jsxs)("div",{className:"space-y-6",children:[r.jsx("div",{className:"bg-brand-off-white dark:bg-[#111110] rounded-2xl p-6 border border-brand-border dark:border-white/8",children:(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:["Your name ",r.jsx("span",{className:"font-normal text-brand-muted dark:text-white/40",children:"(optional)"})]}),r.jsx("input",{type:"text",value:e.name,onChange:e=>p("name",e.target.value),placeholder:"e.g. Priya Sharma",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Role / Title"}),r.jsx("input",{type:"text",value:e.role,onChange:e=>p("role",e.target.value),placeholder:"e.g. Founder, Head of Marketing, Growth Lead",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Company / Brand"}),r.jsx("input",{type:"text",value:e.company,onChange:e=>p("company",e.target.value),placeholder:"e.g. Nebulaa.ai",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"What you help people do"}),r.jsx("input",{type:"text",value:e.specialty,onChange:e=>p("specialty",e.target.value),placeholder:"e.g. founders automate their marketing",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{className:"font-body text-sm font-semibold text-brand-text dark:text-white block mb-2",children:"Your CTA (what should they do?)"}),r.jsx("input",{type:"text",value:e.cta,onChange:e=>p("cta",e.target.value),placeholder:"e.g. DM me to book a free call, Link in bio to start free trial",className:"w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30"})]}),(0,r.jsxs)("button",{onClick:()=>{var t,a,r,o,n;x&&(c((t=e.name,a=e.role,r=e.company,o=e.specialty,n=e.cta,{linkedin:`${a} at ${r} | Helping ${o} | ${n} ↓

I work with founders and teams to build systems that scale — without the chaos.

📍 Open to: partnerships, consulting, collaborations
🔗 ${n}`.slice(0,300),twitter:`${a} @${r.replace(/\s+/g,"")} | ${o} | ${n}`.slice(0,160),instagram:`${a} @ ${r}
✦ ${o}
→ ${n}`.slice(0,150)})),m(!0))},disabled:!x,className:"flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-6 py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]",children:[r.jsx(i.Z,{size:16}),"Generate 3 Bios"]})]})}),r.jsx(n.M,{children:b&&a&&(0,r.jsxs)(s.E.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.4},className:"space-y-4",children:[[{id:"linkedin",name:"LinkedIn",icon:"\uD83D\uDCBC",maxChars:300,note:"300 chars — keyword-rich, professional"},{id:"twitter",name:"Twitter / X",icon:"\uD83D\uDC26",maxChars:160,note:"160 chars — punchy, personality-forward"},{id:"instagram",name:"Instagram",icon:"\uD83D\uDCF8",maxChars:150,note:"150 chars — line-broken, visual-friendly"}].map(e=>{let t=a[e.id],o=t.length;return(0,r.jsxs)("div",{className:"bg-white dark:bg-[#1A1815] rounded-2xl border border-brand-border dark:border-white/8 overflow-hidden",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between px-5 py-3 border-b border-brand-border dark:border-white/8",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[r.jsx("span",{children:e.icon}),r.jsx("span",{className:"font-body text-sm font-semibold text-brand-text dark:text-white",children:e.name}),r.jsx("span",{className:"font-body text-[10px] text-brand-muted dark:text-white/30",children:e.note})]}),(0,r.jsxs)("div",{className:"flex items-center gap-3",children:[(0,r.jsxs)("span",{className:`font-body text-xs font-bold ${function(e,t){let a=e/t;return a>.95?"text-red-500":a>.85?"text-orange-500":"text-brand-muted dark:text-white/40"}(o,e.maxChars)}`,children:[o,"/",e.maxChars]}),r.jsx("button",{onClick:()=>g(e.id,t),className:"flex items-center gap-1.5 font-body text-xs font-semibold text-brand-gold hover:text-brand-gold-dim transition-colors",children:u===e.id?(0,r.jsxs)(r.Fragment,{children:[r.jsx(d.Z,{size:12}),"Copied!"]}):(0,r.jsxs)(r.Fragment,{children:[r.jsx(l.Z,{size:12}),"Copy"]})})]})]}),r.jsx("div",{className:"p-5",children:r.jsx("pre",{className:"font-body text-sm text-brand-text dark:text-white whitespace-pre-wrap leading-relaxed",children:t})})]},e.id)}),r.jsx("div",{className:"px-1",children:(0,r.jsxs)("p",{className:"font-body text-xs text-brand-muted dark:text-white/50",children:["\uD83D\uDCA1 Tip: Update your bios every quarter as your focus evolves. Consistent bios across platforms build trust faster."," ",r.jsx("a",{href:"/pricing",className:"text-brand-gold hover:underline",children:"Automate your content with Gravity →"})]})})]})})]})}},85653:(e,t,a)=>{"use strict";a.d(t,{default:()=>s});var r=a(10326),o=a(91598);let n=[e=>`Subject: Quick favour — 2 minutes of your time?

Hi ${e.customerName||"[Customer Name]"},

Hope things are going well!

I wanted to reach out because you've been using ${e.product||"[your product/service]"} for a while now, and I'd love to hear how it's been going for you.

If you've had a positive experience, I'd be incredibly grateful if you could share a quick testimonial — it genuinely helps other ${e.audience||"founders"} like yourself make better decisions.

It doesn't need to be long. Even 2-3 sentences answering these questions would be amazing:

1. What were you struggling with before using ${e.product||"[product]"}?
2. What changed after you started using it?
3. What would you tell someone who's on the fence about trying it?

You can reply to this email, or if you prefer, leave a review here: [link]

Either way works! And of course, no pressure at all — I completely understand if you're busy.

Thanks so much for being a customer. It means a lot. 🙏

${e.senderName||"[Your Name]"}
${e.company||"[Your Company]"}

---
P.S. If now isn't a great time but you'd be open to sharing later, just let me know — I can follow up in a few weeks!`,e=>`Subject: ${e.customerName?e.customerName.split(" ")[0]:"Hey"}, would you be open to sharing your experience?

Hi ${e.customerName||"[Customer Name]"},

I'm building out our testimonials page and thought of you immediately.

You're exactly the kind of customer we built ${e.product||"[product]"} for — and I'd love to showcase your story (with your permission, of course).

If you've gotten value from ${e.product||"[product]"}, would you be willing to share:
→ What problem it solved for you
→ Any results you've seen (even rough numbers are great)
→ Who you'd recommend it to

A few sentences is honestly more than enough.

You can just hit reply and type it out — I'll take care of the formatting.

Really appreciate you taking the time. Your feedback means the world to us 🙏

${e.senderName||"[Your Name]"}`];function s(){return r.jsx(o.Z,{fields:[{key:"customerName",label:"Customer name",type:"text",placeholder:"e.g. Priya Sharma"},{key:"product",label:"Product / service",type:"text",placeholder:"e.g. Nebulaa Gravity"},{key:"audience",label:"Type of customer",type:"text",placeholder:"e.g. 'B2B founders' or 'SaaS startup teams'"},{key:"senderName",label:"Your name",type:"text",placeholder:"e.g. Rohan"}],templates:n,outputLabel:"Your Testimonial Request Email",buttonLabel:"Generate Email",tip:"Ask for testimonials when customers are at peak satisfaction — right after a win or milestone."})}},86954:(e,t,a)=>{"use strict";a.d(t,{default:()=>s});var r=a(10326),o=a(91598);let n=[e=>{let t=e.topic,a=e.tone;return"How-to"===a?`🧵 THREAD: How to ${t} (most founders get this wrong)

1/ I spent 90 days learning exactly how to ${t}.

Here's the complete playbook — step by step. 👇

2/ Step 1: Start with the outcome, not the action.

Most people jump straight into doing.

The ones who win? They define what success looks like first.

3/ Step 2: Audit what you already have.

You're not starting from zero. You have:
→ Existing customers (talk to them)
→ Past data (analyze it)
→ A network (use it)

4/ Step 3: Pick ONE channel and own it for 30 days.

Not LinkedIn AND Twitter AND Instagram.

One. That's it.

Consistency > everything else.

5/ Step 4: Track one metric that tells you if it's working.

Not vanity metrics. Real ones.

Revenue. Pipeline. Responses. Whatever moves the needle.

6/ Step 5: Double down on what works. Kill what doesn't.

After 30 days, you'll know exactly what's working.

Do more of that. Cut everything else.

7/ The honest truth:

${t} isn't complicated. It's just not easy.

The difference between people who figure it out and people who don't?

Execution.

8/ If this was useful, follow me for more founder playbooks.

And reply with what's blocking you — I read every response 👇

RT the first tweet if this helped 🙏`:"Hot take"===a?`🧵 Okay, controversial take about ${t}. Bear with me.

1/ Hot take: 90% of what you've been told about ${t} is either wrong or designed for someone with 10x your budget.

Let me explain. 👇

2/ The conventional wisdom says:

→ Do X
→ Then Y
→ Then Z

Sounds logical, right?

Here's why it fails for most founders.

3/ The system is designed for companies that can afford to be slow.

You don't have that luxury.

You need things that work NOW. At YOUR scale.

4/ What actually works (based on talking to 50+ founders):

→ [Tactic 1 related to ${t}]
→ [Tactic 2 related to ${t}]
→ [Tactic 3 related to ${t}]

None of them are in the playbooks.

5/ The real insight: Stop copying what big companies do.

Study what OTHER founders at your stage are doing.

That's the actual benchmark.

6/ The people crushing ${t} right now aren't smarter than you.

They just stopped following advice meant for someone else.

7/ So the next time someone tells you "the right way" to do ${t}:

Ask them: "At what stage? With what resources?"

Context matters more than tactics.

8/ If this made you think differently, follow for more contrarian founder takes.

Drop your biggest ${t} frustration below 👇`:`🧵 I was doing ${t} completely wrong for 6 months.

Then one thing changed everything. Thread 👇

1/ Six months ago, I was grinding on ${t} with zero results.

Not for lack of trying. I was trying HARD.

The problem was I was optimizing for the wrong thing.

2/ What I was doing:
❌ Following generic advice
❌ Copying what worked for others
❌ Measuring the wrong metrics

3/ What actually changed everything:

I stopped asking "how do I do this?" and started asking "what does success actually look like for me?"

That reframe was everything.

4/ Once I knew the actual destination, the path became obvious.

Three things I stopped doing:
→ Wasting time on channels that don't convert
→ Creating content nobody asked for
→ Measuring activity instead of outcomes

5/ Three things I started doing instead:
→ Talking to my best customers weekly
→ Doubling down on what was already working
→ Tracking ONE metric that matters

6/ The result? ${t} became the most predictable part of my business.

Not because I worked harder. Because I worked differently.

7/ Lesson: You're probably not failing at ${t}.

You're just optimizing for the wrong version of success.

Fix the goal. The process becomes obvious.

8/ If this resonated, follow me — I share raw founder learnings weekly.

What's YOUR biggest ${t} struggle right now? 👇`}];function s(){return r.jsx(o.Z,{fields:[{key:"topic",label:"What's your thread about?",type:"textarea",placeholder:"e.g. 'cold outreach for B2B founders' or 'how I scaled to ₹1Cr ARR'",rows:2},{key:"tone",label:"Tone",type:"select",options:["Storytelling","How-to","Hot take"]}],templates:n,outputLabel:"Your Twitter Thread",buttonLabel:"Generate Thread",tip:"Pin your best threads for 3x more profile visits. Add a follow CTA at the end for consistent growth."})}},63965:(e,t,a)=>{"use strict";a.d(t,{default:()=>s});var r=a(10326),o=a(91598);let n=[e=>`VALUE PROPOSITION OPTIONS FOR ${e.product.toUpperCase()}

━━━━━━━━━━━━━━━━━━━━━━━

🎯 FORMULA 1: Problem → Solution → Outcome
"For ${e.target} who struggle with ${e.problem}, ${e.product} is the ${e.category||"platform"} that ${e.solution}. Unlike ${e.alternative||"traditional tools"}, we ${e.differentiator||"do this automatically"}."

━━━━━━━━━━━━━━━━━━━━━━━

🎯 FORMULA 2: Jobs To Be Done
"When ${e.target} need to ${e.job||e.solution}, they choose ${e.product} because it ${e.outcome||"delivers results faster than any alternative"}."

━━━━━━━━━━━━━━━━━━━━━━━

🎯 FORMULA 3: Hero Statement (for landing pages)
"${e.product}: ${e.outcome||"The fastest way to "+e.solution+" for "+e.target}."

Subheadline: "Stop ${e.problem}. Start ${e.outcome||"growing"}. ${e.product} does the heavy lifting for you."

━━━━━━━━━━━━━━━━━━━━━━━

🎯 FORMULA 4: Outcome-first (ad copy)
"${e.target} who use ${e.product} ${e.result||"see measurable results in the first 30 days"}. Here's how it works:"

━━━━━━━━━━━━━━━━━━━━━━━

HOW TO TEST THESE:
→ Run them as LinkedIn post hooks and see which gets the most engagement
→ Use the winner as your homepage headline for 30 days
→ A/B test the top 2 on Google/Meta ads
→ The version your customers quote back to you = your real value prop`];function s(){return r.jsx(o.Z,{fields:[{key:"product",label:"Product / company name",type:"text",placeholder:"e.g. Nebulaa"},{key:"target",label:"Target customer",type:"text",placeholder:"e.g. 'B2B SaaS founders with 5-50 person teams'"},{key:"problem",label:"Core problem you solve",type:"text",placeholder:"e.g. 'spending 10+ hours a week on content that barely converts'"},{key:"solution",label:"How you solve it",type:"text",placeholder:"e.g. 'automate their entire LinkedIn presence with AI'"},{key:"differentiator",label:"What makes you different? (optional)",type:"text",placeholder:"e.g. 'it posts automatically every day, not just suggests ideas'"}],templates:n,outputLabel:"Your Value Proposition Options",buttonLabel:"Generate Value Propositions",tip:"Your real value prop is what customers say when they refer you to someone else. Ask them."})}},12517:(e,t,a)=>{"use strict";a.d(t,{default:()=>s});var r=a(10326),o=a(91598);let n=[e=>`${e.title}

${e.description?e.description+"\n\n":""}In this video, I break down everything you need to know about ${e.topic}.

Whether you're just starting out or looking to level up, this is for you.

━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 WHAT'S COVERED IN THIS VIDEO
━━━━━━━━━━━━━━━━━━━━━━━━━━

00:00 - Introduction
02:30 - The core problem most people miss
05:00 - The exact strategy that works
10:00 - Step-by-step walkthrough
15:00 - Real results and case study
18:00 - Common mistakes to avoid
20:00 - Action steps for you

━━━━━━━━━━━━━━━━━━━━━━━━━━
🔗 LINKS MENTIONED
━━━━━━━━━━━━━━━━━━━━━━━━━━

[Link 1] - [Description]
[Link 2] - [Description]

━━━━━━━━━━━━━━━━━━━━━━━━━━
👋 ABOUT THIS CHANNEL
━━━━━━━━━━━━━━━━━━━━━━━━━━

I share weekly videos on ${e.topic} for founders and entrepreneurs who want real, actionable advice — not theory.

Subscribe and hit the bell 🔔 so you never miss a video.

━━━━━━━━━━━━━━━━━━━━━━━━━━

#${e.topic.replace(/\s+/g,"")} #Founder #Entrepreneur #Startup #GrowthHacking #BusinessTips #${e.topic.replace(/\s+/g,"").slice(0,15)}Tips`];function s(){return r.jsx(o.Z,{fields:[{key:"title",label:"Video title",type:"text",placeholder:"e.g. 'How I Got My First 100 B2B Customers Without Paid Ads'"},{key:"topic",label:"Main topic / keyword",type:"text",placeholder:"e.g. 'B2B cold outreach' or 'startup growth'"},{key:"description",label:"One-line description (optional)",type:"text",placeholder:"e.g. 'In this video I share the exact outreach strategy that got us 100 customers in 90 days.'"}],templates:n,outputLabel:"Your YouTube Description",buttonLabel:"Generate Description",tip:"Put your main keyword in the first 2 lines for better SEO. Include a CTA above the fold."})}},43810:(e,t,a)=>{"use strict";a.d(t,{Z:()=>r});let r=(0,a(25578).Z)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]])},21405:(e,t,a)=>{"use strict";a.d(t,{Z:()=>r});let r=(0,a(25578).Z)("refresh-cw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]])},24527:(e,t,a)=>{"use strict";a.d(t,{Z:()=>r});let r=(0,a(25578).Z)("wand-sparkles",[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]])},31565:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>F,generateMetadata:()=>L,generateStaticParams:()=>R});var r=a(19510),o=a(57371),n=a(58585),s=a(42603),i=a(68570);let d=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/LinkedInPostGenerator.tsx#default`),l=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/InstagramCaptionGenerator.tsx#default`),c=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/ColdEmailGenerator.tsx#default`),u=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/HashtagGenerator.tsx#default`),h=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/LeadQualificationCalculator.tsx#default`),b=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/SocialMediaBioGenerator.tsx#default`),m=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/GTMLaunchChecklist.tsx#default`),p=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/FollowUpEmailGenerator.tsx#default`),x=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/TwitterThreadGenerator.tsx#default`),g=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/YoutubeDescriptionGenerator.tsx#default`),y=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/BlogHookGenerator.tsx#default`),f=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/EmailSubjectLineGenerator.tsx#default`),w=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/ProductDescriptionGenerator.tsx#default`),k=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/PressReleaseGenerator.tsx#default`),v=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/ContentCalendarGenerator.tsx#default`),j=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/TestimonialRequestGenerator.tsx#default`),N=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/LinkedInConnectionMessageGenerator.tsx#default`),C=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/ElevatorPitchGenerator.tsx#default`),T=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/PartnershipEmailGenerator.tsx#default`),$=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/SalesObjectionHandler.tsx#default`),S=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/ValuePropositionGenerator.tsx#default`),I=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/BuyerPersonaGenerator.tsx#default`),E=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/ICPBuilder.tsx#default`),A=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/PitchDeckOutlineGenerator.tsx#default`),D=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/ReferralEmailGenerator.tsx#default`),P=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/CompetitivePositioningGenerator.tsx#default`),O=(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/ROICalculator.tsx#default`);function R(){return s.r.map(e=>({slug:e.slug}))}async function L({params:e}){let t=s.r.find(t=>t.slug===e.slug);return t?{title:t.seoTitle,description:t.seoDescription,keywords:t.keywords,openGraph:{title:t.seoTitle,description:t.seoDescription,type:"website"}}:{}}let M={"linkedin-post-generator":d,"instagram-caption-generator":l,"cold-email-generator":c,"hashtag-generator":u,"lead-qualification-calculator":h,"social-media-bio-generator":b,"gtm-launch-checklist":m,"follow-up-email-sequence-generator":p,"twitter-thread-generator":x,"youtube-description-generator":g,"blog-hook-generator":y,"email-subject-line-generator":f,"product-description-generator":w,"press-release-generator":k,"content-calendar-generator":v,"testimonial-request-generator":j,"linkedin-connection-message-generator":N,"elevator-pitch-generator":C,"partnership-email-generator":T,"sales-objection-handler":$,"value-proposition-generator":S,"buyer-persona-generator":I,"icp-builder":E,"pitch-deck-outline-generator":A,"referral-email-generator":D,"competitive-positioning-generator":P,"roi-calculator":O,"cac-calculator":(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/CACCalculator.tsx#default`),"ltv-calculator":(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/LTVCalculator.tsx#default`),"seo-meta-description-generator":(0,i.createProxy)(String.raw`/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/components/tools/SEOMetaDescriptionGenerator.tsx#default`)};function F({params:e}){let t=s.r.find(t=>t.slug===e.slug);t||(0,n.notFound)();let a=M[e.slug],i=s.r.filter(t=>t.slug!==e.slug).slice(0,5);return(0,r.jsxs)("main",{className:"bg-white dark:bg-brand-black min-h-screen pt-20",children:[r.jsx("div",{className:"max-w-6xl mx-auto px-4 md:px-8 py-4",children:(0,r.jsxs)("nav",{className:"flex items-center gap-2 font-body text-xs text-brand-muted dark:text-white/40",children:[r.jsx(o.default,{href:"/",className:"hover:text-brand-gold transition-colors",children:"Home"}),r.jsx("span",{children:"/"}),r.jsx(o.default,{href:"/tools",className:"hover:text-brand-gold transition-colors",children:"Tools"}),r.jsx("span",{children:"/"}),r.jsx("span",{className:"text-brand-text dark:text-white/70",children:t.name})]})}),r.jsx("div",{className:"max-w-6xl mx-auto px-4 md:px-8 pb-20",children:(0,r.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"mb-8",children:[r.jsx("h1",{className:"font-heading font-bold text-3xl md:text-4xl text-brand-text dark:text-white mb-2",children:t.name}),r.jsx("p",{className:"font-body text-base text-brand-muted dark:text-white/60",children:t.description})]}),r.jsx(a,{})]}),(0,r.jsxs)("aside",{children:[(0,r.jsxs)("div",{className:"bg-brand-off-white dark:bg-[#111110] rounded-2xl p-5 border border-brand-border dark:border-white/8 mb-6 sticky top-24",children:[r.jsx("p",{className:"font-body text-xs font-bold uppercase tracking-widest text-brand-muted dark:text-white/40 mb-4",children:"More Free Tools"}),(0,r.jsxs)("div",{className:"space-y-2",children:[i.map(e=>r.jsx(o.default,{href:`/tools/${e.slug}`,className:"flex items-center gap-2 p-2.5 rounded-xl hover:bg-brand-warm-gray dark:hover:bg-white/5 transition-all group",children:r.jsx("span",{className:"font-body text-sm text-brand-text dark:text-white group-hover:text-brand-gold transition-colors leading-snug",children:e.name})},e.slug)),(0,r.jsxs)(o.default,{href:"/tools",className:"block mt-3 text-center font-body text-xs font-semibold text-brand-gold hover:underline",children:["View all ",s.r.length," free tools →"]})]})]}),(0,r.jsxs)("div",{className:"bg-brand-gold/10 dark:bg-brand-gold/10 rounded-2xl p-5 border border-brand-gold/20",children:[r.jsx("p",{className:"font-heading font-bold text-base text-brand-text dark:text-white mb-2",children:"Want this done for you?"}),r.jsx("p",{className:"font-body text-xs text-brand-muted dark:text-white/60 mb-4",children:"Gravity does this automatically every day. No manual input needed."}),r.jsx("a",{href:"/pricing",className:"block text-center bg-brand-gold text-brand-black font-body font-semibold text-sm rounded-full px-4 py-2.5 hover:bg-brand-gold-dim transition-all",children:"Try Nebulaa free →"})]})]})]})})]})}},58585:(e,t,a)=>{"use strict";var r=a(61085);a.o(r,"notFound")&&a.d(t,{notFound:function(){return r.notFound}})},61085:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var a in t)Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}(t,{ReadonlyURLSearchParams:function(){return s},RedirectType:function(){return r.RedirectType},notFound:function(){return o.notFound},permanentRedirect:function(){return r.permanentRedirect},redirect:function(){return r.redirect}});let r=a(83953),o=a(16399);class n extends Error{constructor(){super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams")}}class s extends URLSearchParams{append(){throw new n}delete(){throw new n}set(){throw new n}sort(){throw new n}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},16399:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var a in t)Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}(t,{isNotFoundError:function(){return o},notFound:function(){return r}});let a="NEXT_NOT_FOUND";function r(){let e=Error(a);throw e.digest=a,e}function o(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===a}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8586:(e,t)=>{"use strict";var a;Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RedirectStatusCode",{enumerable:!0,get:function(){return a}}),function(e){e[e.SeeOther=303]="SeeOther",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect"}(a||(a={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},83953:(e,t,a)=>{"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var a in t)Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}(t,{RedirectType:function(){return r},getRedirectError:function(){return d},getRedirectStatusCodeFromError:function(){return m},getRedirectTypeFromError:function(){return b},getURLFromRedirectError:function(){return h},isRedirectError:function(){return u},permanentRedirect:function(){return c},redirect:function(){return l}});let o=a(54580),n=a(72934),s=a(8586),i="NEXT_REDIRECT";function d(e,t,a){void 0===a&&(a=s.RedirectStatusCode.TemporaryRedirect);let r=Error(i);r.digest=i+";"+t+";"+e+";"+a+";";let n=o.requestAsyncStorage.getStore();return n&&(r.mutableCookies=n.mutableCookies),r}function l(e,t){void 0===t&&(t="replace");let a=n.actionAsyncStorage.getStore();throw d(e,t,(null==a?void 0:a.isAction)?s.RedirectStatusCode.SeeOther:s.RedirectStatusCode.TemporaryRedirect)}function c(e,t){void 0===t&&(t="replace");let a=n.actionAsyncStorage.getStore();throw d(e,t,(null==a?void 0:a.isAction)?s.RedirectStatusCode.SeeOther:s.RedirectStatusCode.PermanentRedirect)}function u(e){if("object"!=typeof e||null===e||!("digest"in e)||"string"!=typeof e.digest)return!1;let[t,a,r,o]=e.digest.split(";",4),n=Number(o);return t===i&&("replace"===a||"push"===a)&&"string"==typeof r&&!isNaN(n)&&n in s.RedirectStatusCode}function h(e){return u(e)?e.digest.split(";",3)[2]:null}function b(e){if(!u(e))throw Error("Not a redirect error");return e.digest.split(";",2)[1]}function m(e){if(!u(e))throw Error("Not a redirect error");return Number(e.digest.split(";",4)[3])}(function(e){e.push="push",e.replace="replace"})(r||(r={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),r=t.X(0,[8948,5544,6621,7043,6267],()=>a(32145));module.exports=r})();