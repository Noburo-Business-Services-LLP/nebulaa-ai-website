import nodemailer from 'nodemailer'

export function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: parseInt(process.env.SMTP_PORT || '587') === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export function buildNewsletterHTML(subject: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${subject}</title>
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
    <a href="https://www.nebulaa.ai" class="logo">nebulaa</a>
  </div>
  <div class="body">
    <div class="content">
      ${content}
    </div>
    <div class="cta-block">
      <p style="color:#FFFFFF;font-weight:700;font-size:18px;margin:0 0 8px;">Want all of this automated?</p>
      <p style="color:#9E9890;font-size:14px;margin:0 0 20px;">Gravity posts. Pulsar calls. You just close. 🚀</p>
      <a href="https://www.nebulaa.ai/#pricing" class="cta-btn">Start free 7-day trial →</a>
    </div>
  </div>
  <div class="footer">
    <p>You're getting this because you signed up for Nebulaa or expressed interest in our agents.</p>
    <!-- TODO: add a real contact email here once the owner confirms one -->
    <p><a href="https://www.nebulaa.ai">nebulaa.ai</a></p>
  </div>
</div>
</body>
</html>`
}
