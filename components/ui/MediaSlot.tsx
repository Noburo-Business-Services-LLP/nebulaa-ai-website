import Image from 'next/image'
import { getSlot } from '@/lib/mediaSlots'
import { presentMedia } from '@/lib/mediaManifest.generated'

interface Props {
  /** Slot id from lib/mediaSlots.ts */
  id: string
  className?: string
  /** Rendered aspect ratio while empty, e.g. '16 / 10'. */
  ratio?: string
  priority?: boolean
}

export function isFilled(id: string): boolean {
  const slot = getSlot(id)
  return Boolean(slot && presentMedia.includes(slot.file))
}

/**
 * Renders the asset once it exists in public/media, and until then a
 * placeholder that states what belongs there. Deliberately legible rather
 * than invisible — an empty slot should look like a known gap, not a bug.
 */
export default function MediaSlot({ id, className = '', ratio = '16 / 10', priority }: Props) {
  const slot = getSlot(id)

  if (!slot) {
    return null
  }

  if (isFilled(id)) {
    if (slot.kind === 'video') {
      return (
        <video
          src={`/media/${slot.file}`}
          className={`w-full h-auto rounded-[14px] ${className}`}
          autoPlay
          muted
          loop
          playsInline
          aria-label={slot.label}
        />
      )
    }
    return (
      <Image
        src={`/media/${slot.file}`}
        alt={slot.label}
        width={1440}
        height={900}
        priority={priority}
        className={`w-full h-auto rounded-[14px] ${className}`}
      />
    )
  }

  return (
    <div
      className={`relative rounded-[14px] border border-dashed border-rule-2 bg-surface-2/60 flex items-center justify-center p-6 ${className}`}
      style={{ aspectRatio: ratio }}
      data-media-slot={slot.id}
    >
      <div className="max-w-[46ch] text-center">
        <p className="neb-label neb-label-gold mb-2.5">{slot.kind} · awaiting asset</p>
        <p className="font-heading text-[17px] text-ink mb-2">{slot.label}</p>
        <p className="font-body text-[13px] leading-[1.55] text-muted mb-3">{slot.spec}</p>
        <p className="font-body text-[11.5px] text-faint">
          Drop <code className="text-ink-2">{slot.file}</code> into <code className="text-ink-2">public/media/</code> · {slot.dimensions}
        </p>
      </div>
    </div>
  )
}
