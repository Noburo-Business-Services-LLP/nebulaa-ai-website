import Hero from '@/components/sections/Hero'
import SocialProof from '@/components/sections/SocialProof'
import HowItWorks from '@/components/sections/HowItWorks'
import GravitySection from '@/components/sections/GravitySection'
import PulsarSection from '@/components/sections/PulsarSection'
import UseCaseSimulator from '@/components/sections/UseCaseSimulator'
import TransformationTable from '@/components/sections/TransformationTable'
import Pricing from '@/components/sections/Pricing'
import BlogPreview from '@/components/sections/BlogPreview'
import FAQ from '@/components/sections/FAQ'
import Newsletter from '@/components/sections/Newsletter'
import FinalCTA from '@/components/sections/FinalCTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <HowItWorks />
      <GravitySection />
      <PulsarSection />
      <UseCaseSimulator />
      <TransformationTable />
      <Pricing />
      <BlogPreview />
      <FAQ />
      <Newsletter />
      <FinalCTA />
    </main>
  )
}
