'use client'
import GenericTool from './GenericTool'

const templates = [
  (v: Record<string, string>) => `Hi ${v.name ? v.name.split(' ')[0] : '[Name]'},

${v.reason || `I came across your profile and was impressed by your work in ${v.industry || 'your space'}`}.

${v.context || 'Would love to connect and learn from your experience.'}

No pitch, just genuine interest in building my network with people doing interesting work.

${v.sender ? `— ${v.sender}` : ''}`,

  (v: Record<string, string>) => `Hey ${v.name ? v.name.split(' ')[0] : '[Name]'} 👋

${v.reason || `Saw your ${v.industry || 'recent'} post and it really resonated with me`}.

${v.context || `Would love to stay connected — always trying to surround myself with people building interesting things.`}

${v.sender ? `— ${v.sender}` : ''}`,

  (v: Record<string, string>) => `Hi ${v.name ? v.name.split(' ')[0] : '[Name]'},

I noticed we're both ${v.commonality || `working in ${v.industry || 'the startup space'}`} and wanted to connect.

${v.context || 'Would love to exchange notes sometime — always happy to share what I know and learn from others.'}

${v.sender ? `— ${v.sender}` : ''}`,
]

export default function LinkedInConnectionMessageGenerator() {
  return (
    <GenericTool
      fields={[
        { key: 'name', label: "Prospect's full name", type: 'text', placeholder: 'e.g. Priya Sharma' },
        { key: 'reason', label: 'Why are you reaching out? (what caught your eye)', type: 'textarea', placeholder: "e.g. 'I saw your post about scaling B2B sales without SDRs — it was spot on'", rows: 2 },
        { key: 'context', label: 'What do you want from this connection? (optional)', type: 'text', placeholder: "e.g. 'Would love to learn how you approached your GTM strategy'" },
        { key: 'sender', label: 'Your name (optional)', type: 'text', placeholder: 'e.g. Arjun' },
      ]}
      templates={templates}
      outputLabel="Your Connection Message"
      buttonLabel="Generate Message"
      tip="Keep it under 300 characters for best acceptance rate. Be specific — generic messages get ignored."
    />
  )
}
