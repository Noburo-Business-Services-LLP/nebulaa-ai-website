import { createHash } from 'crypto'

/**
 * Server-side mirror of the browser Pixel "Lead" event, sent via Meta's
 * Conversions API. This is what keeps lead attribution working under Safari
 * ITP and iOS 14.5+ where the browser pixel alone under-counts badly.
 *
 * No-ops silently until NEXT_PUBLIC_META_PIXEL_ID and META_CAPI_ACCESS_TOKEN
 * are both set — safe to call unconditionally from any lead-capture route.
 */
function sha256(value: string) {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

export async function sendLeadEvent(opts: {
  email: string
  eventId: string
  sourceUrl: string
  eventSourceUrl?: string
}) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN
  if (!pixelId || !accessToken) return

  const payload = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: opts.eventId, // must match the browser pixel's event_id for Meta to dedupe the two
        event_source_url: opts.eventSourceUrl || opts.sourceUrl,
        action_source: 'website',
        user_data: {
          em: [sha256(opts.email)],
        },
      },
    ],
  }

  try {
    await fetch(`https://graph.facebook.com/v20.0/${pixelId}/events?access_token=${accessToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    /* best-effort — a failed server-side ping should never break the signup */
  }
}
