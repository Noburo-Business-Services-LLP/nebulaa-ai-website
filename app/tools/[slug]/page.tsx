import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { tools } from '@/lib/toolsData'
import LinkedInPostGenerator from '@/components/tools/LinkedInPostGenerator'
import InstagramCaptionGenerator from '@/components/tools/InstagramCaptionGenerator'
import ColdEmailGenerator from '@/components/tools/ColdEmailGenerator'
import HashtagGenerator from '@/components/tools/HashtagGenerator'
import LeadQualificationCalculator from '@/components/tools/LeadQualificationCalculator'
import SocialMediaBioGenerator from '@/components/tools/SocialMediaBioGenerator'
import GTMLaunchChecklist from '@/components/tools/GTMLaunchChecklist'
import FollowUpEmailGenerator from '@/components/tools/FollowUpEmailGenerator'
import TwitterThreadGenerator from '@/components/tools/TwitterThreadGenerator'
import YoutubeDescriptionGenerator from '@/components/tools/YoutubeDescriptionGenerator'
import BlogHookGenerator from '@/components/tools/BlogHookGenerator'
import EmailSubjectLineGenerator from '@/components/tools/EmailSubjectLineGenerator'
import ProductDescriptionGenerator from '@/components/tools/ProductDescriptionGenerator'
import PressReleaseGenerator from '@/components/tools/PressReleaseGenerator'
import ContentCalendarGenerator from '@/components/tools/ContentCalendarGenerator'
import TestimonialRequestGenerator from '@/components/tools/TestimonialRequestGenerator'
import LinkedInConnectionMessageGenerator from '@/components/tools/LinkedInConnectionMessageGenerator'
import ElevatorPitchGenerator from '@/components/tools/ElevatorPitchGenerator'
import PartnershipEmailGenerator from '@/components/tools/PartnershipEmailGenerator'
import SalesObjectionHandler from '@/components/tools/SalesObjectionHandler'
import ValuePropositionGenerator from '@/components/tools/ValuePropositionGenerator'
import BuyerPersonaGenerator from '@/components/tools/BuyerPersonaGenerator'
import ICPBuilder from '@/components/tools/ICPBuilder'
import PitchDeckOutlineGenerator from '@/components/tools/PitchDeckOutlineGenerator'
import ReferralEmailGenerator from '@/components/tools/ReferralEmailGenerator'
import CompetitivePositioningGenerator from '@/components/tools/CompetitivePositioningGenerator'
import ROICalculator from '@/components/tools/ROICalculator'
import CACCalculator from '@/components/tools/CACCalculator'
import LTVCalculator from '@/components/tools/LTVCalculator'
import SEOMetaDescriptionGenerator from '@/components/tools/SEOMetaDescriptionGenerator'

export function generateStaticParams() {
  return tools.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tool = tools.find(t => t.slug === params.slug)
  if (!tool) return {}
  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    keywords: tool.keywords,
    openGraph: { title: tool.seoTitle, description: tool.seoDescription, type: 'website' },
  }
}

const toolComponents: Record<string, React.ComponentType> = {
  'linkedin-post-generator': LinkedInPostGenerator,
  'instagram-caption-generator': InstagramCaptionGenerator,
  'cold-email-generator': ColdEmailGenerator,
  'hashtag-generator': HashtagGenerator,
  'lead-qualification-calculator': LeadQualificationCalculator,
  'social-media-bio-generator': SocialMediaBioGenerator,
  'gtm-launch-checklist': GTMLaunchChecklist,
  'follow-up-email-sequence-generator': FollowUpEmailGenerator,
  'twitter-thread-generator': TwitterThreadGenerator,
  'youtube-description-generator': YoutubeDescriptionGenerator,
  'blog-hook-generator': BlogHookGenerator,
  'email-subject-line-generator': EmailSubjectLineGenerator,
  'product-description-generator': ProductDescriptionGenerator,
  'press-release-generator': PressReleaseGenerator,
  'content-calendar-generator': ContentCalendarGenerator,
  'testimonial-request-generator': TestimonialRequestGenerator,
  'linkedin-connection-message-generator': LinkedInConnectionMessageGenerator,
  'elevator-pitch-generator': ElevatorPitchGenerator,
  'partnership-email-generator': PartnershipEmailGenerator,
  'sales-objection-handler': SalesObjectionHandler,
  'value-proposition-generator': ValuePropositionGenerator,
  'buyer-persona-generator': BuyerPersonaGenerator,
  'icp-builder': ICPBuilder,
  'pitch-deck-outline-generator': PitchDeckOutlineGenerator,
  'referral-email-generator': ReferralEmailGenerator,
  'competitive-positioning-generator': CompetitivePositioningGenerator,
  'roi-calculator': ROICalculator,
  'cac-calculator': CACCalculator,
  'ltv-calculator': LTVCalculator,
  'seo-meta-description-generator': SEOMetaDescriptionGenerator,
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = tools.find(t => t.slug === params.slug)
  if (!tool) notFound()

  const ToolComponent = toolComponents[params.slug]
  const otherTools = tools.filter(t => t.slug !== params.slug).slice(0, 5)

  return (
    <main className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4">
        <nav className="flex items-center gap-2 font-body text-xs text-muted">
          <Link href="/" className="hover:text-gold-text transition-colors">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-gold-text transition-colors">Tools</Link>
          <span>/</span>
          <span className="text-ink-2">{tool.name}</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          {/* Main tool */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <h1 className="font-heading font-bold text-3xl md:text-4xl text-ink mb-2">
                {tool.name}
              </h1>
              <p className="font-body text-base text-ink-2">{tool.description}</p>
            </div>
            {/* Tool component */}
            <ToolComponent />
          </div>

          {/* Sidebar */}
          <aside>
            {/* Other tools */}
            <div className="bg-surface-2 rounded-2xl p-5 border border-rule mb-6 sticky top-24">
              <p className="font-body text-xs font-bold uppercase tracking-widest text-muted mb-4">
                More Free Tools
              </p>
              <div className="space-y-2">
                {otherTools.map(t => (
                  <Link
                    key={t.slug}
                    href={`/tools/${t.slug}`}
                    className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-surface-2 transition-all group"
                  >
                    <span className="font-body text-sm text-ink group-hover:text-gold-text transition-colors leading-snug">
                      {t.name}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/tools"
                  className="block mt-3 text-center font-body text-xs font-semibold text-gold-text hover:underline"
                >
                  View all {tools.length} free tools →
                </Link>
              </div>
            </div>

            {/* Nebulaa CTA */}
            <div className="bg-gold/10 rounded-2xl p-5 border border-gold/20">
              <p className="font-heading font-bold text-base text-ink mb-2">
                Want this done for you?
              </p>
              <p className="font-body text-xs text-ink-2 mb-4">
                Gravity does this automatically every day. No manual input needed.
              </p>
              <a
                href="/pricing"
                className="block text-center bg-gold text-[#1A1208] font-body font-semibold text-sm rounded-full px-4 py-2.5 hover:brightness-110 transition-all"
              >
                Try Nebulaa free →
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
