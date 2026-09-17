'use client'

import { AnchorHTMLAttributes } from 'react'
import { trackContactClick } from '@/lib/analytics/track'

/**
 * A plain <a> that fires a Contact/Lead signal on click before navigating —
 * for mailto/WhatsApp CTAs on otherwise-server-rendered pages, where wrapping
 * the whole page in 'use client' would be overkill for one click handler.
 */
export default function TrackedLink({
  source,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { source: string }) {
  return <a {...props} onClick={() => trackContactClick(source)} />
}
