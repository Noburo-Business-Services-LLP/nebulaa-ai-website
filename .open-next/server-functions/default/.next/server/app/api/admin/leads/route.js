"use strict";(()=>{var e={};e.id=5213,e.ids=[5213],e.modules={21841:e=>{e.exports=require("@aws-sdk/client-s3")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},59665:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>g,patchFetch:()=>v,requestAsyncStorage:()=>h,routeModule:()=>x,serverHooks:()=>m,staticGenerationAsyncStorage:()=>f});var n={};r.r(n),r.d(n,{DELETE:()=>d,GET:()=>c,POST:()=>u});var a=r(49303),o=r(88716),s=r(60670),i=r(87070),p=r(3360),l=r(6910);async function c(e){if(!(0,p.G)(e))return i.NextResponse.json({error:"Unauthorized"},{status:401});let t=await (0,l.W6)();return i.NextResponse.json(t)}async function u(e){if(!(0,p.G)(e))return i.NextResponse.json({error:"Unauthorized"},{status:401});let{name:t,email:r,source:n,tags:a}=await e.json();if(!t||!r)return i.NextResponse.json({error:"Name and email required"},{status:400});let o=await (0,l.W6)(),s={id:Date.now().toString(),name:t,email:r,source:n||"Manual",date:new Date().toISOString().split("T")[0],tags:a||[]};return(o.push(s),await (0,l.L1)(o))?i.NextResponse.json(s):i.NextResponse.json({error:"Lead store unavailable — lead not saved."},{status:503})}async function d(e){if(!(0,p.G)(e))return i.NextResponse.json({error:"Unauthorized"},{status:401});let{id:t}=await e.json(),r=(await (0,l.W6)()).filter(e=>e.id!==t);return await (0,l.L1)(r)?i.NextResponse.json({success:!0}):i.NextResponse.json({error:"Lead store unavailable — deletion not saved."},{status:503})}let x=new a.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/admin/leads/route",pathname:"/api/admin/leads",filename:"route",bundlePath:"app/api/admin/leads/route"},resolvedPagePath:"/Users/dineshkannaa/Documents/0 CONTENT/Claude Agents/nebulaa-ai-website/app/api/admin/leads/route.ts",nextConfigOutput:"standalone",userland:n}),{requestAsyncStorage:h,staticGenerationAsyncStorage:f,serverHooks:m}=x,g="/api/admin/leads/route";function v(){return(0,s.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:f})}},3360:(e,t,r)=>{r.d(t,{G:()=>a});var n=r(84770);function a(e){let t=process.env.ADMIN_SECRET?.trim();if(!t)return!1;let r=e.headers.get("x-admin-secret")?.trim();if(!r)return!1;let a=Buffer.from(r),o=Buffer.from(t);return a.length===o.length&&(0,n.timingSafeEqual)(a,o)}},6910:(e,t,r)=>{r.d(t,{L1:()=>i,W6:()=>s,p3:()=>p});var n=r(58741),a=r(31528);let o="leads.json";async function s(){return(0,n.zr)(o,[])}async function i(e){return(0,n.Nn)(o,e)}async function p(e,t){let r=process.env.LEADS_NOTIFY_TO||"hello@nebulaa.ai";if(!process.env.SMTP_USER||!process.env.SMTP_PASS)return!1;try{let o=(0,a.q)();return await o.sendMail({from:process.env.SMTP_FROM||process.env.SMTP_USER,to:r,subject:`New lead — ${e.email}`,text:[`Email:  ${e.email}`,`Name:   ${e.name}`,`Source: ${e.source}`,`Date:   ${e.date}`,"",t?`Also stored in ${(0,n.Q1)()?"S3":"data/leads.json"}.`:"NOT stored — this email is the only record. Check the lead store."].join("\n")}),!0}catch{return!1}}},31528:(e,t,r)=>{r.d(t,{q:()=>a,u:()=>o});var n=r(55245);function a(){return n.createTransport({host:process.env.SMTP_HOST||"smtp.gmail.com",port:parseInt(process.env.SMTP_PORT||"587"),secure:465===parseInt(process.env.SMTP_PORT||"587"),auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}})}function o(e,t){return`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${e}</title>
<style>
  body { margin: 0; padding: 0; background: #0A0A0A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  .wrapper { max-width: 600px; margin: 0 auto; background: #111110; }
  .header { background: #0A0A0A; padding: 24px 32px; border-bottom: 1px solid #1A1815; }
  .logo { color: #F5A623; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; text-decoration: none; }
  .body { padding: 40px 32px; }
  .content { color: #E5E3DF; font-size: 16px; line-height: 1.7; }
  .content h1 { color: #FFFFFF; font-size: 26px; font-weight: 800; margin: 0 0 20px; line-height: 1.2; }
  .content h2 { color: #F5A623; font-size: 18px; font-weight: 700; margin: 28px 0 12px; }
  .content p { margin: 0 0 16px; }
  .content strong { color: #FFFFFF; }
  .content a { color: #F5A623; }
  .content ul { padding-left: 20px; margin: 0 0 16px; }
  .content li { margin-bottom: 8px; }
  .cta-block { background: #1A1815; border: 1px solid #F5A623/20; border-radius: 16px; padding: 28px; margin: 32px 0; text-align: center; }
  .cta-btn { display: inline-block; background: #F5A623; color: #0A0A0A; font-weight: 800; font-size: 15px; padding: 14px 32px; border-radius: 100px; text-decoration: none; }
  .divider { height: 1px; background: #1A1815; margin: 32px 0; }
  .footer { padding: 24px 32px; text-align: center; color: #6B6560; font-size: 12px; border-top: 1px solid #1A1815; }
  .footer a { color: #9E9890; text-decoration: none; }
  .tag { display: inline-block; background: #F5A623/15; color: #F5A623; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 100px; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <a href="https://nebulaa.ai" class="logo">nebulaa</a>
  </div>
  <div class="body">
    <div class="content">
      ${t}
    </div>
    <div class="cta-block">
      <p style="color:#FFFFFF;font-weight:700;font-size:18px;margin:0 0 8px;">Want all of this automated?</p>
      <p style="color:#9E9890;font-size:14px;margin:0 0 20px;">Gravity posts. Pulsar calls. You just close. 🚀</p>
      <a href="https://nebulaa.ai/#pricing" class="cta-btn">Start free 7-day trial →</a>
    </div>
  </div>
  <div class="footer">
    <p>You're getting this because you signed up for Nebulaa or expressed interest in our agents.</p>
    <!-- TODO: add a real contact email here once the owner confirms one -->
    <p><a href="https://nebulaa.ai">nebulaa.ai</a></p>
  </div>
</div>
</body>
</html>`}},58741:(e,t,r)=>{r.d(t,{KD:()=>h,Nn:()=>x,Q1:()=>f,zr:()=>d});var n=r(92048),a=r.n(n),o=r(55315),s=r.n(o);let i=()=>process.env.DATA_BUCKET,p=()=>process.env.AWS_REGION||"ap-south-1",l=e=>s().join(process.cwd(),"data",e),c=null;async function u(){if(!c){let{S3Client:e}=await Promise.resolve().then(r.t.bind(r,21841,23));c=new e({region:p()})}return c}async function d(e,t){let n=i();if(!n)try{return JSON.parse(a().readFileSync(l(e),"utf8"))}catch{return t}try{let{GetObjectCommand:a}=await Promise.resolve().then(r.t.bind(r,21841,23)),o=await (await u()).send(new a({Bucket:n,Key:e})),s=await o.Body?.transformToString();return s?JSON.parse(s):t}catch{return t}}async function x(e,t){let n=i(),o=JSON.stringify(t,null,2);if(!n)try{return a().mkdirSync(s().dirname(l(e)),{recursive:!0}),a().writeFileSync(l(e),o),!0}catch{return!1}try{let{PutObjectCommand:t}=await Promise.resolve().then(r.t.bind(r,21841,23));return await (await u()).send(new t({Bucket:n,Key:e,Body:o,ContentType:"application/json"})),!0}catch{return!1}}async function h(e,t=1e3){let n=i();if(!n)try{let r=l(e);return a().readdirSync(r).map(t=>`${e}/${t}`).slice(0,t)}catch{return[]}try{let a;let{ListObjectsV2Command:o}=await Promise.resolve().then(r.t.bind(r,21841,23)),s=[];do{let t=await (await u()).send(new o({Bucket:n,Prefix:e,ContinuationToken:a}));for(let e of t.Contents||[])e.Key&&s.push(e.Key);a=t.IsTruncated?t.NextContinuationToken:void 0}while(a&&s.length<t);return s.slice(0,t)}catch{return[]}}let f=()=>!!i()}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[8948,5972,5245],()=>r(59665));module.exports=n})();