'use client'

import { UploadCloud, Loader2, Check } from 'lucide-react'
import { getSlot } from '@/lib/mediaSlots'
import { useEditMode } from '@/lib/mediaEdit'
import { useSlotFilled, useSlotUpload } from '@/components/ui/MediaSlot'

/**
 * A floating "upload here" pill for slots that sit behind other content
 * (hero video, closing photo, industry hero photos), where there is no box on
 * the page to click. Only appears in edit mode.
 */
export default function SlotEditChip({ id, className = '' }: { id: string; className?: string }) {
  const slot = getSlot(id)
  const { editing, secret } = useEditMode()
  const filled = useSlotFilled(slot?.file)
  const up = useSlotUpload(slot?.file ?? '', secret)
  if (!slot || !editing) return null

  return (
    <div className={`z-40 ${className}`}>
      <input ref={up.inputRef} type="file" accept={slot.kind === 'video' ? 'video/*' : 'image/*'} className="hidden" onChange={e => up.send(e.target.files?.[0])} />
      <button
        type="button"
        onClick={up.open}
        {...up.dropProps}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-bold shadow-[0_8px_24px_rgba(20,32,58,0.2)] transition-colors ${
          up.dragOver ? 'bg-ink text-ground' : filled ? 'bg-surface text-ink border border-rule-2' : 'bg-coral text-white'
        }`}
      >
        {up.busy ? <Loader2 size={15} className="animate-spin" /> : filled ? <Check size={15} className="text-wa" /> : <UploadCloud size={15} />}
        {up.busy ? 'Uploading…' : filled ? `${slot.label}: replace` : `${slot.label}: click or drop a ${slot.kind}`}
      </button>
      {up.error && <p className="mt-1.5 rounded-lg bg-white px-2.5 py-1 text-[11.5px] font-semibold text-red-700">{up.error}</p>}
    </div>
  )
}
