import Hero from '@/components/sections/Hero'
import ClientStrip from '@/components/sections/ClientStrip'
import ThreeThings from '@/components/sections/ThreeThings'
import GravitySection from '@/components/sections/GravitySection'
import PulsarSection from '@/components/sections/PulsarSection'
import MadeByGravity from '@/components/sections/MadeByGravity'
import EntryFork from '@/components/sections/EntryFork'
import ToolsTeaser from '@/components/sections/ToolsTeaser'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import BlogPreview from '@/components/sections/BlogPreview'
import Newsletter from '@/components/sections/Newsletter'
import FinalCTA from '@/components/sections/FinalCTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <ClientStrip />
      <ThreeThings />
      <GravitySection />
      <PulsarSection />
      <MadeByGravity />
      <EntryFork />
      <ToolsTeaser />
      <Pricing />
      <FAQ />
      <BlogPreview />
      <Newsletter />
      <FinalCTA />
    </main>
  )
}
