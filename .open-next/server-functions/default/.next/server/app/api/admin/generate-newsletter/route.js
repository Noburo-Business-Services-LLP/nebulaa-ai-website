"use strict";(()=>{var e={};e.id=2921,e.ids=[2921],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},84770:e=>{e.exports=require("crypto")},43014:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>f,patchFetch:()=>g,requestAsyncStorage:()=>c,routeModule:()=>d,serverHooks:()=>h,staticGenerationAsyncStorage:()=>m});var n={};r.r(n),r.d(n,{POST:()=>p});var a=r(49303),s=r(88716),o=r(60670),i=r(87070),l=r(3360);let u=new(r(27293)).ZP;async function p(e){if(!(0,l.G)(e))return i.NextResponse.json({error:"Unauthorized"},{status:401});let{topic:t,ideaPrompt:r}=await e.json(),n=`You are the newsletter writer for Nebulaa.ai — an agentic AI platform for Indian founders and SMEs.
Nebulaa has two agents: Gravity (posts daily social content) and Pulsar (calls and qualifies leads automatically).
Writing style: Gen Z energy — like a text from your smartest founder friend, not a company email.
Use emojis naturally. Keep paragraphs short. Use Indian context.`,a=`${r?`Content framework: ${r}

`:""}Newsletter topic: ${t}

Write a newsletter email. Output TWO things, clearly separated:

1. SUBJECT LINE (make it irresistible — curiosity gap, emoji, specific number, or meme energy)
2. HTML BODY CONTENT (just the inner content, no full HTML wrapper — I'll wrap it)

For the HTML body:
- Use <h1> for the main hook/title
- Use <p> for paragraphs (short, 2-3 lines)
- Use <h2> for section breaks
- Use <ul><li> for bullet points
- Add emoji naturally in text
- Max 300-400 words total
- Gen Z phrases where natural ("okay but", "fr fr", "not gonna lie", "real talk", "no cap")
- Include ONE meme reference (describe the meme in text like "you know the 'this is fine' dog energy?")
- End with a punchy 1-line closing (NOT "Best regards" — something like "go get it 🔥" or "your pipeline won't fill itself 👀")
- DO NOT include the CTA block (I add that separately)

Format your response EXACTLY like this:
SUBJECT: [subject line here]
---
BODY:
[HTML content here]`;try{let e=(await u.messages.create({model:"claude-sonnet-4-6",max_tokens:1500,messages:[{role:"user",content:a}],system:n})).content[0].text,r=e.match(/SUBJECT:\s*(.+)/i),s=e.match(/BODY:\s*([\s\S]+)/i),o=r?r[1].trim():t,l=s?s[1].trim():e;return i.NextResponse.json({subject:o,body:l})}catch(e){return console.error(e),i.NextResponse.json({error:"Claude API error — check your ANTHROPIC_API_KEY"},{status:500})}}let d=new a.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/admin/generate-newsletter/route",pathname:"/api/admin/generate-newsletter",filename:"route",bundlePath:"app/api/admin/generate-newsletter/route"},resolvedPagePath:"/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/app/api/admin/generate-newsletter/route.ts",nextConfigOutput:"standalone",userland:n}),{requestAsyncStorage:c,staticGenerationAsyncStorage:m,serverHooks:h}=d,f="/api/admin/generate-newsletter/route";function g(){return(0,o.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:m})}},3360:(e,t,r)=>{r.d(t,{G:()=>a});var n=r(84770);function a(e){let t=process.env.ADMIN_SECRET?.trim();if(!t)return!1;let r=e.headers.get("x-admin-secret")?.trim();if(!r)return!1;let a=Buffer.from(r),s=Buffer.from(t);return a.length===s.length&&(0,n.timingSafeEqual)(a,s)}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[8948,5972,7293],()=>r(43014));module.exports=n})();