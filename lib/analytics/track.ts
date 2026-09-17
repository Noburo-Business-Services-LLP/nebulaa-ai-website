/**
 * One call site per conversion, fanned out to every tag that's actually
 * installed. A page never calls gtag/fbq directly — if we swap or add a
 * platform, this is the only file that changes.
 */

type EventParams = Record<string, string | number | boolean | undefined>

interface AnalyticsWindow extends Window {
  dataLayer?: Record<string, unknown>[]
  fbq?: (...args: unknown[]) => void
  gtag?: (...args: unknown[]) => void
}

function pushDataLayer(event: string, params?: EventParams) {
  const w = window as AnalyticsWindow
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event, ...params })
}

function fbq(event: string, params?: EventParams, eventId?: string) {
  const w = window as AnalyticsWindow
  if (typeof w.fbq === 'function') w.fbq('track', event, params, eventId ? { eventID: eventId } : undefined)
}

function gtagEvent(event: string, params?: EventParams) {
  const w = window as AnalyticsWindow
  if (typeof w.gtag === 'function') w.gtag('event', event, params)
}

function fire(event: string, params?: EventParams, eventId?: string) {
  if (typeof window === 'undefined') return
  pushDataLayer(event, params)
  gtagEvent(event, params)
  fbq(event, params, eventId)
}

/**
 * A lead magnet or newsletter email submitted. Maps to Meta's "Lead" standard
 * event. Pass the eventId the signup API returned so Meta's Conversions API
 * ping (sent server-side from that same route) dedupes against this browser
 * pixel fire instead of double-counting the lead.
 */
export function trackLead(source: string, extra?: EventParams & { eventId?: string }) {
  const { eventId, ...rest } = extra || {}
  fire('generate_lead', { lead_source: source, ...rest })
  fire('Lead', { lead_source: source, ...rest }, eventId)
}

/** Someone clicked a way to reach a human — mailto CTA, WhatsApp link, "book a call". */
export function trackContactClick(source: string) {
  fire('contact', { contact_source: source })
  fire('Contact', { contact_source: source })
}

/** Pricing / "Start free" CTA — top-of-funnel purchase intent. */
export function trackCTAClick(ctaName: string, location: string) {
  fire('select_content', { content_type: 'cta', item_id: ctaName, cta_location: location })
  fire('ViewContent', { content_name: ctaName, cta_location: location })
}
