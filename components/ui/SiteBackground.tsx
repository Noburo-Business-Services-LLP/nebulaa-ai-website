import ParticleCanvas from '@/components/ui/ParticleCanvas'

/**
 * The one environment the whole site sits inside — not a different backdrop
 * per section. Fixed to the viewport so it holds still while content scrolls
 * over it, which is what makes the page read as a single running system
 * rather than a stack of separately-decorated bands.
 *
 * Four layers, back to front:
 *   1. the near-black ground (painted by <body>, not repeated here)
 *   2. a fine technical grid — structure, deliberately near-invisible
 *   3. a sparse particle field — the constant visual language
 *   4. ambient amber pools — energy, never evenly lit
 *
 * Section-specific interface activity is layer 5 and belongs to each section,
 * not here.
 */
export default function SiteBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div className="neb-grid" />
      <div className="absolute inset-0 opacity-40">
        <ParticleCanvas spacing={48} />
      </div>
      <div className="neb-ambient" />
    </div>
  )
}
