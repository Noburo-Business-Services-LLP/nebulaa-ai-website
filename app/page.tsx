import Hero from '@/components/sections/Hero'
import SiteBackground from '@/components/ui/SiteBackground'
import ClientStrip from '@/components/sections/ClientStrip'
import GenerationTicker from '@/components/ui/GenerationTicker'
import ThreeThings from '@/components/sections/ThreeThings'
import SharedMemory from '@/components/sections/SharedMemory'
import GravitySection from '@/components/sections/GravitySection'
import PulsarSection from '@/components/sections/PulsarSection'
import MadeByGravity from '@/components/sections/MadeByGravity'
import EntryFork from '@/components/sections/EntryFork'
import NarrativeDemo from '@/components/sections/NarrativeDemo'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import Newsletter from '@/components/sections/Newsletter'
import FinalCTA from '@/components/sections/FinalCTA'

/**
 * Free tools and the blog are deliberately absent — they exist to earn search
 * traffic, not homepage space. Both remain reachable from the nav and footer.
 */
export default function Home() {
  return (
    <main>
      <SiteBackground />
      <Hero />
      <GenerationTicker />
      <ClientStrip />
      <ThreeThings />
      <SharedMemory />
      <EntryFork />
      <NarrativeDemo />
      <GravitySection />
      <PulsarSection />
      <MadeByGravity />
      <Pricing />
      <FAQ />
      <Newsletter />
      <FinalCTA />
    </main>
  )
}
