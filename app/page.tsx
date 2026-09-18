import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import ClientStrip from '@/components/sections/ClientStrip'
import GenerationTicker from '@/components/ui/GenerationTicker'
import AgentEcosystem from '@/components/sections/AgentEcosystem'
import ThreeThings from '@/components/sections/ThreeThings'
import SharedMemory from '@/components/sections/SharedMemory'
import GravitySection from '@/components/sections/GravitySection'
import OrbitSection from '@/components/sections/OrbitSection'
import PulsarSection from '@/components/sections/PulsarSection'
import MadeByGravity from '@/components/sections/MadeByGravity'
import EntryFork from '@/components/sections/EntryFork'
import NarrativeDemo from '@/components/sections/NarrativeDemo'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import Newsletter from '@/components/sections/Newsletter'
import FinalCTA from '@/components/sections/FinalCTA'

const seoTitle = 'AI Marketing Platform for Indian Businesses'
const seoDescription =
  'Nebulaa is the AI marketing platform that understands your business, activates the right engines, executes the work and learns from what happens next.'

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  openGraph: { title: seoTitle, description: seoDescription },
}

/**
 * Free tools and the blog are deliberately absent — they exist to earn search
 * traffic, not homepage space. Both remain reachable from the nav and footer.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <GenerationTicker />
      <ClientStrip />
      <AgentEcosystem />
      <ThreeThings />
      <SharedMemory />
      <EntryFork />
      <NarrativeDemo />
      {/* Gravity creates, Orbit finds, Pulsar engages — the master copy's order. */}
      <GravitySection />
      <OrbitSection />
      <PulsarSection />
      <MadeByGravity />
      <Pricing />
      <FAQ />
      <Newsletter />
      <FinalCTA />
    </main>
  )
}
