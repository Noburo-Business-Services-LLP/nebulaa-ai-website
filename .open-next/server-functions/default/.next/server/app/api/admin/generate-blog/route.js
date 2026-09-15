"use strict";(()=>{var e={};e.id=5081,e.ids=[5081],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},84770:e=>{e.exports=require("crypto")},95436:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>g,patchFetch:()=>f,requestAsyncStorage:()=>p,routeModule:()=>c,serverHooks:()=>h,staticGenerationAsyncStorage:()=>m});var a={};r.r(a),r.d(a,{POST:()=>d});var n=r(49303),o=r(88716),s=r(60670),i=r(87070),l=r(3360);let u=new(r(27293)).ZP;async function d(e){if(!(0,l.G)(e))return i.NextResponse.json({error:"Unauthorized"},{status:401});let{topic:t,style:r,ideaPrompt:a}=await e.json(),n=`You are the content writer for Nebulaa.ai — an agentic AI platform for Indian founders and SMEs.
Nebulaa has two agents: Gravity (AI marketing — posts content daily) and Pulsar (AI outreach — calls and follows up with leads).
Target audience: Indian founders, early-stage startup CEOs, B2B SaaS founders, SME owners aged 25-45.
Tone: Gen Z energy — punchy, direct, real, casual. Not corporate at all.
Always write in first-person founder voice. Use Indian context (₹ not $, Indian cities, Indian startup ecosystem).`,o=`${a?`Content framework + structure to follow:
${a}

`:""}Topic/angle: ${t}
Style preference: ${r||"Gen Z — punchy, direct, casual with emojis"}

Write a complete, SEO-optimised blog post for nebulaa.ai/blog. Follow ALL these rules:

SEO RULES:
- H1 title: include the primary keyword naturally, keep under 60 chars, make it click-worthy
- First paragraph: include 2-3 target keywords naturally within the first 150 words
- H2 headers: use keyword-rich subheadings that people actually search for
- Include a TLDR section near the top (3 bullet points — perfect for featured snippets)
- Use natural keyword variations throughout (synonyms, related phrases)
- Internal structure: intro → TLDR → main sections → conclusion with CTA

WRITING RULES:
- 700-900 words total
- Short paragraphs (max 3 lines — mobile readers)
- H1 + H2 section headers (use ## for H2, ### for H3 if needed)
- Use emojis naturally (1-2 per section, not every line)
- If data/experiment post: include a realistic markdown table with 4-6 rows of data
- End with: horizontal rule (---) + one-sentence Nebulaa CTA
- Gen Z phrases where natural: "literally", "fr", "no cap", "okay but hear me out"
- Indian context: use ₹ not $, mention Indian cities/ecosystem when relevant
- NEVER use: "leverage", "utilize", "synergy", "delve", "stakeholder", "in conclusion", "to summarize"
- Start the post immediately with the H1 — no preamble

Format as plain MDX (no frontmatter, start directly with # Title):`;try{let e=(await u.messages.create({model:"claude-sonnet-4-6",max_tokens:2e3,messages:[{role:"user",content:o}],system:n})).content[0].text,r=e.match(/^#\s+(.+)$/m),a=r?r[1]:t,s=a.toLowerCase().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").trim().slice(0,60);return i.NextResponse.json({content:e,title:a,slug:s})}catch(e){return console.error(e),i.NextResponse.json({error:"Claude API error — check your ANTHROPIC_API_KEY"},{status:500})}}let c=new n.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/admin/generate-blog/route",pathname:"/api/admin/generate-blog",filename:"route",bundlePath:"app/api/admin/generate-blog/route"},resolvedPagePath:"/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/app/api/admin/generate-blog/route.ts",nextConfigOutput:"standalone",userland:a}),{requestAsyncStorage:p,staticGenerationAsyncStorage:m,serverHooks:h}=c,g="/api/admin/generate-blog/route";function f(){return(0,s.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:m})}},3360:(e,t,r)=>{r.d(t,{G:()=>n});var a=r(84770);function n(e){let t=process.env.ADMIN_SECRET?.trim();if(!t)return!1;let r=e.headers.get("x-admin-secret")?.trim();if(!r)return!1;let n=Buffer.from(r),o=Buffer.from(t);return n.length===o.length&&(0,a.timingSafeEqual)(n,o)}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[8948,5972,7293],()=>r(95436));module.exports=a})();