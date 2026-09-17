import ParticleCanvas from '@/components/ui/ParticleCanvas'

/**
 * The persistent, ambient particle layer — "one reusable background system"
 * rather than a different backdrop per section. Fixed to the viewport so it
 * stays in place while content scrolls over it, sparser and dimmer than the
 * hero's own field so it reads as ambient rather than competing with
 * whatever the current section is actually saying.
 *
 * Scoped to the homepage for now, not the root layout — every other page's
 * <main> still paints its own opaque background, so this would be invisible
 * there anyway. Making it truly global means auditing contrast on every
 * page that background sits behind first; that's real, separate work, not
 * a drop-in.
 */
export default function SiteBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-40" aria-hidden="true">
      <ParticleCanvas spacing={48} />
    </div>
  )
}
