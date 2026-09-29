'use client'

import Link from 'next/link'
import { PencilRuler, X } from 'lucide-react'
import { useEditMode, setEditMode } from '@/lib/mediaEdit'

/** A small bar that appears only while edit mode is on, so it is always clear that dashed boxes are clickable. */
export default function EditBar() {
  const { editing } = useEditMode()
  if (!editing) return null
  return (
    <div className="fixed left-3 bottom-3 md:bottom-4 z-[80] flex items-center gap-3 rounded-full bg-ink text-ground pl-4 pr-2 py-2 shadow-[0_12px_32px_rgba(20,32,58,0.35)] max-w-[calc(100vw-24px)]">
      <PencilRuler size={16} className="text-sun flex-shrink-0" />
      <span className="text-[12.5px] font-semibold leading-tight">
        Edit mode: click or drop a file on any dashed box
      </span>
      <Link href="/admin/media" className="text-[12px] font-bold underline underline-offset-2 whitespace-nowrap">All slots</Link>
      <button
        type="button"
        onClick={() => setEditMode(false)}
        className="flex items-center gap-1 rounded-full bg-white/15 hover:bg-white/25 px-3 py-1.5 text-[12px] font-bold"
      >
        Done <X size={13} />
      </button>
    </div>
  )
}
