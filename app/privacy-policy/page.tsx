import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Nebulaa.ai',
  description: 'Privacy Policy for Nebulaa (Noburo Business Services LLP). How we collect, use, store, and protect your personal information.',
}

function Section({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-heading font-bold text-xl text-brand-text dark:text-white mb-4 flex items-center gap-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-gold/15 text-brand-gold text-sm font-bold flex items-center justify-center">
          {number}
        </span>
        {title}
      </h2>
      <div className="space-y-3 text-brand-muted dark:text-white/70 font-body text-sm leading-relaxed pl-11">
        {children}
      </div>
    </section>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-brand-gold mt-1 flex-shrink-0">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-body font-bold text-brand-text dark:text-white/90 mt-5 mb-2">{children}</h3>
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white dark:bg-[#0A0A0A] min-h-screen pt-28 pb-24 transition-colors">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="h-1 w-16 bg-gradient-to-r from-brand-gold to-brand-gold/30 rounded-full mb-6" />
          <p className="font-body text-xs font-bold tracking-widest uppercase text-brand-gold mb-3">Legal</p>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-brand-text dark:text-white tracking-tight mb-4">
            Privacy Policy
          </h1>
          <div className="flex flex-wrap gap-4 font-body text-xs text-brand-muted dark:text-white/40">
            <span>Effective Date: 10 March 2025</span>
            <span>·</span>
            <span>Version 1.0</span>
            <span>·</span>
            <span>Governing Entity: Noburo Business Services LLP, India</span>
          </div>
        </div>

        {/* Intro */}
        <div className="mb-10 p-5 bg-brand-gold/5 dark:bg-brand-gold/8 border border-brand-gold/20 rounded-2xl font-body text-sm text-brand-muted dark:text-white/60 leading-relaxed">
          At Nebulaa, we take your privacy seriously. This Privacy Policy describes how Noburo Business Services LLP collects, uses, stores, discloses, and protects your personal information when you use the Nebulaa platform. Please read this policy carefully before providing your information.
        </div>

        <div className="divide-y divide-brand-border dark:divide-white/8">

          <Section number={1} title="Identity of Data Controller">
            <P>The data controller responsible for your personal data is:</P>
            <div className="bg-brand-gold/5 dark:bg-white/5 border border-brand-gold/15 rounded-xl p-4 space-y-1">
              <p className="font-semibold text-brand-text dark:text-white">Noburo Business Services LLP</p>
              <p className="text-brand-muted dark:text-white/70">Platform: Nebulaa — www.nebulaa.ai</p>
              <p className="text-brand-muted dark:text-white/70">Registered in India under the Limited Liability Partnership Act, 2008</p>
              <p className="text-brand-muted dark:text-white/70">Email for support &amp; grievance: <a href="mailto:support@nebulaa.ai" className="text-brand-gold hover:underline">support@nebulaa.ai</a></p>
            </div>
          </Section>

          <Section number={2} title="Information We Collect">
            <SubHeading>2.1 Information You Provide Directly</SubHeading>
            <Ul items={[
              'Identity data: Full name, display name, professional title, and photograph (if uploaded)',
              'Contact data: Email address, phone number, and location (city/country)',
              'Account credentials: Password (stored in hashed form) and authentication tokens',
              'Business data: Company name, stage, sector, revenue information, team size, and any other business context you provide',
              'Decision & operational data: GTM decisions, experiments, outcomes, learnings, and action records you log on the Platform',
              'Payment data: Billing name, GST number, and invoice details. Full card or bank account numbers are processed directly by Razorpay and not stored by us',
              'Communications: Messages, feedback, support requests, or any content you send to us',
            ]} />
            <SubHeading>2.2 Information Collected Automatically</SubHeading>
            <Ul items={[
              'Usage data: Pages visited, features used, actions taken, time spent, click paths, and session duration',
              'Device & technical data: IP address, browser type and version, operating system, device identifiers, time zone, and screen resolution',
              'Log data: Server access logs, error logs, and Platform event logs',
              'Cookies and tracking technologies: As described in Section 10 below',
            ]} />
            <SubHeading>2.3 Information from Third Parties</SubHeading>
            <Ul items={[
              'If you authenticate via third-party single sign-on (e.g., Google OAuth), we may receive your name, email, and profile picture from that service',
              'Payment processors (Razorpay) may share transaction status and anonymised billing information with us',
              'Analytics and infrastructure providers may process technical usage data on our behalf',
            ]} />
          </Section>

          <Section number={3} title="Purposes & Legal Basis for Processing">
            <P>We process your personal data for the following purposes:</P>
            <Ul items={[
              'Account Creation & Authentication: To register, verify, and maintain your account on the Platform',
              'Service Delivery: To provide you with the features, tools, and AI-powered functionalities of the Platform, including decision tracking, action planning, and outcome analysis',
              'Trial Management: To manage your free trial period, track eligibility, and communicate about trial expiry and upgrade options',
              'Billing & Payments: To process your Subscription payments, generate invoices, manage renewals, and comply with GST and financial record-keeping obligations',
              'Customer Support: To respond to your queries, troubleshoot issues, and provide assistance',
              'Platform Improvement: To analyse usage patterns, identify bugs, improve AI model performance, and develop new features',
              'Communications: To send you service-related notices, product updates, security alerts, and — where you have opted in — marketing communications',
              'Legal Compliance: To comply with applicable Indian laws, regulations, and court or regulatory orders',
              'Safety & Security: To detect, prevent, and investigate fraud, abuse, security incidents, and violations of our Terms',
            ]} />
            <P>Legal bases under Indian law (Information Technology Act, 2000; IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011; and the Digital Personal Data Protection Act, 2023, upon its notification): your consent; performance of a contract with you; compliance with a legal obligation; and legitimate interests pursued by us or a third party.</P>
          </Section>

          <Section number={4} title="How We Use Your Data">
            <P>In addition to the purposes above, we use your data to:</P>
            <Ul items={[
              'Personalise your experience and surface relevant recommendations through our AI models',
              'Conduct aggregate, anonymised analysis and research to improve the Platform\'s decision feedback capabilities',
              'Train and improve AI/ML models, using anonymised and de-identified data only, unless you provide explicit consent for identifiable data use',
              'Enforce our Terms & Conditions and other policies',
              'Protect the rights, property, and safety of the Company, our users, and the public',
            ]} />
            <P>We will not sell your personal data to third parties. We will not use your personal data for advertising or marketing purposes by third parties without your explicit consent.</P>
          </Section>

          <Section number={5} title="Data Sharing & Disclosure">
            <P>We do not sell, rent, or trade your personal data. We may share your data in the following limited circumstances:</P>
            <SubHeading>5.1 Service Providers</SubHeading>
            <P>We engage trusted third-party vendors to support our operations, including cloud hosting and infrastructure providers, Razorpay (payment processing), analytics services, email and communication service providers, and AI/ML infrastructure providers. All service providers are bound by data processing agreements.</P>
            <SubHeading>5.2 Legal & Regulatory Disclosure</SubHeading>
            <P>We may disclose your data if required by applicable law, regulation, court order, or governmental authority, or to enforce our legal rights.</P>
            <SubHeading>5.3 Business Transfers</SubHeading>
            <P>In the event of a merger, acquisition, restructuring, or sale of all or part of our business, your data may be transferred to the successor entity. You will be notified of any such transfer and your rights therein.</P>
            <SubHeading>5.4 With Your Consent</SubHeading>
            <P>We may share your data with third parties when you have explicitly consented to such sharing.</P>
            <SubHeading>5.5 Aggregated & Anonymised Data</SubHeading>
            <P>We may share aggregated, anonymised, or de-identified data that cannot reasonably identify you, for research, analytics, or commercial purposes.</P>
          </Section>

          <Section number={6} title="Data Retention">
            <Ul items={[
              'Active account data: Retained for the duration of your Subscription plus 2 years post-termination for legal and audit purposes',
              'Trial data: Retained for 90 days post-trial expiry if you do not convert to a paid plan, after which it is deleted or anonymised',
              'Financial and billing records: Retained for 7 years as required under Indian tax and accounting laws',
              'Usage logs and analytics: Retained for up to 24 months, after which they are anonymised',
              'Support communications: Retained for 3 years from the date of last communication',
            ]} />
            <P>You may request deletion of your data at any time (see Section 9). We will comply subject to our legal retention obligations.</P>
          </Section>

          <Section number={7} title="Data Security">
            <P>We implement appropriate technical and organisational measures to protect your personal data. These measures include:</P>
            <Ul items={[
              'Encryption of data in transit using TLS/SSL protocols',
              'Encryption of sensitive data at rest',
              'Access controls limiting data access to authorised personnel only',
              'Regular security assessments and vulnerability testing',
              'Incident response procedures for security breaches',
            ]} />
            <P>In the event of a personal data breach that poses a risk to your rights, we will notify you and relevant authorities as required by applicable law. However, no system can guarantee absolute security.</P>
          </Section>

          <Section number={8} title="Data Transfers">
            <P>Nebulaa is primarily operated from India. Your data may be processed or stored on servers located in India or in other jurisdictions where our service providers operate. Where data is transferred outside India, we ensure appropriate safeguards are in place, consistent with applicable Indian data protection law and the requirements of the Digital Personal Data Protection Act, 2023.</P>
          </Section>

          <Section number={9} title="Your Rights">
            <P>Subject to applicable law, you have the following rights with respect to your personal data:</P>
            <Ul items={[
              'Right to Access: Request a copy of the personal data we hold about you',
              'Right to Correction: Request correction of inaccurate or incomplete personal data',
              'Right to Erasure: Request deletion of your personal data, subject to our legal retention obligations',
              'Right to Portability: Request your data in a structured, machine-readable format',
              'Right to Withdraw Consent: Withdraw consent at any time where processing is based on consent',
              'Right to Object: Object to processing based on legitimate interests, including for direct marketing',
              'Right to Restrict Processing: Request that we limit how we use your data in certain circumstances',
              'Right to Grievance Redressal: Lodge a complaint with our Grievance Officer (see Section 12)',
            ]} />
            <P>To exercise any of these rights, please contact us at <a href="mailto:privacy@nebulaa.ai" className="text-brand-gold hover:underline">privacy@nebulaa.ai</a>. We will respond within 30 days.</P>
          </Section>

          <Section number={10} title="Cookies & Tracking Technologies">
            <P>We use cookies, web beacons, local storage, and similar technologies to enhance your experience, analyse usage, and maintain your session.</P>
            <SubHeading>Types of cookies we use:</SubHeading>
            <Ul items={[
              'Essential cookies: Required for the Platform to function correctly (e.g., session management, authentication)',
              'Analytical cookies: Used to understand how users interact with the Platform and improve its features',
              'Preference cookies: Used to remember your settings and personalisation choices',
              'Marketing cookies: Used only with your prior consent to deliver relevant communications',
            ]} />
            <P>You can control cookies through your browser settings. By using the Platform, you consent to our use of cookies as described herein.</P>
          </Section>

          <Section number={11} title="Children's Privacy">
            <P>The Nebulaa Platform is intended for business users and is not directed at individuals under the age of 18. We do not knowingly collect personal data from minors. If you believe we have inadvertently collected data from a minor, please contact us immediately at <a href="mailto:privacy@nebulaa.ai" className="text-brand-gold hover:underline">privacy@nebulaa.ai</a>.</P>
          </Section>

          <Section number={12} title="Grievance Officer">
            <P>In accordance with the Information Technology Act, 2000 and applicable rules, we have appointed a Grievance Officer to address privacy-related concerns:</P>
            <div className="bg-brand-gold/5 dark:bg-white/5 border border-brand-gold/15 rounded-xl p-4 space-y-1">
              <p className="text-brand-muted dark:text-white/70"><span className="font-semibold text-brand-text dark:text-white">Grievance Officer:</span> Navaneetha Krishnan</p>
              <p className="text-brand-muted dark:text-white/70"><span className="font-semibold text-brand-text dark:text-white">Organisation:</span> Noburo Business Services LLP (Nebulaa)</p>
              <p className="text-brand-muted dark:text-white/70"><span className="font-semibold text-brand-text dark:text-white">Email:</span> <a href="mailto:support@nebulaa.ai" className="text-brand-gold hover:underline">support@nebulaa.ai</a></p>
              <p className="text-brand-muted dark:text-white/70"><span className="font-semibold text-brand-text dark:text-white">Response Time:</span> We will acknowledge your grievance within 48 hours and resolve it within 30 days.</p>
            </div>
          </Section>

          <Section number={13} title="Changes to This Privacy Policy">
            <P>We may update this Privacy Policy from time to time. We will notify you of material changes by posting a prominent notice within the Platform and/or sending an email to the address associated with your account. Your continued use of the Platform after any changes constitutes your acceptance of the updated policy.</P>
          </Section>

          <Section number={14} title="Governing Law">
            <P>This Privacy Policy is governed by the laws of India, including the Information Technology Act, 2000, the IT (SPDI) Rules, 2011, and the Digital Personal Data Protection Act, 2023. Disputes arising under this Policy shall be subject to the jurisdiction of the courts in Chennai, Tamil Nadu, India.</P>
          </Section>

          <Section number={15} title="Contact Us">
            <div className="bg-brand-gold/5 dark:bg-white/5 border border-brand-gold/15 rounded-xl p-4 space-y-1">
              <p className="font-semibold text-brand-text dark:text-white">Noburo Business Services LLP</p>
              <p className="text-brand-muted dark:text-white/70">Platform: Nebulaa — www.nebulaa.ai</p>
              <p className="text-brand-muted dark:text-white/70">Support Email: <a href="mailto:support@nebulaa.ai" className="text-brand-gold hover:underline">support@nebulaa.ai</a></p>
            </div>
          </Section>
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-brand-border dark:border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-body text-xs text-brand-muted dark:text-white/30">Last Updated: 10 March 2025 · Document Version: 1.0</p>
          <p className="font-body text-xs text-brand-muted dark:text-white/30">© 2025 Noburo Business Services LLP. All rights reserved.</p>
        </div>
      </div>
    </main>
  )
}
