'use client'
import GenericTool from './GenericTool'

const templates = [
  (v: Record<string, string>) => {
    const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    return `FOR IMMEDIATE RELEASE

${v.company} ${v.announcement}

${v.city || 'Bangalore'}, India — ${today}

━━━━━━━━━━━━━━━━━━━━━━━

${v.company}, ${v.companyDesc || 'a leading technology startup'}, today announced ${v.announcement.toLowerCase()}.

${v.detail || `This milestone represents a significant step forward for ${v.company} as it continues to expand its presence in the market and deliver value to its growing customer base.`}

"${v.quote || `We're incredibly excited about this development. It's a testament to the hard work of our team and the trust our customers have placed in us.`}" said ${v.spokesperson || 'the founding team'} of ${v.company}.

━━━━━━━━━━━━━━━━━━━━━━━

ABOUT ${v.company.toUpperCase()}

${v.about || `${v.company} is a technology company helping businesses grow faster with AI-powered tools. Founded in India, the company serves founders and SMEs across the country.`}

━━━━━━━━━━━━━━━━━━━━━━━

MEDIA CONTACT

${v.contactName || '[Contact Name]'}
${v.contactEmail || '[contact@company.com]'}
${v.contactPhone || '[+91 XXXXX XXXXX]'}

###`
  },
]

export default function PressReleaseGenerator() {
  return (
    <GenericTool
      fields={[
        { key: 'company', label: 'Company name', type: 'text', placeholder: 'e.g. Nebulaa' },
        { key: 'announcement', label: 'What are you announcing?', type: 'textarea', placeholder: "e.g. 'raised ₹2 Crore in pre-seed funding' or 'launched AI-powered GTM platform'", rows: 2 },
        { key: 'companyDesc', label: 'Company description (optional)', type: 'text', placeholder: "e.g. 'an AI-powered GTM automation platform for Indian founders'" },
        { key: 'spokesperson', label: 'Spokesperson name + title (optional)', type: 'text', placeholder: "e.g. 'Arjun Sharma, CEO'" },
      ]}
      templates={templates}
      outputLabel="Your Press Release"
      buttonLabel="Generate Press Release"
      tip="Send your press release early in the week (Tuesday or Wednesday morning) for better media pickup."
    />
  )
}
