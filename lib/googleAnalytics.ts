import { google } from 'googleapis'

/**
 * GA4, via the same service account already used for Search Console
 * (lib/googleSearchConsole.ts) — grant it Viewer access on the GA4
 * property (Admin → Property access management) and it works here too.
 * GA4 only exposes reporting through a numeric Property ID, never the
 * gtag measurement ID (G-XXXX) already wired in lib/analytics/config.ts,
 * so this needs its own env var rather than reusing NEXT_PUBLIC_GA4_ID.
 * Gated the same way every optional integration in this repo is: blank
 * env vars means the feature reports itself as not configured, nothing
 * throws.
 */

function isConfigured() {
  return Boolean(process.env.GSC_CLIENT_EMAIL && process.env.GSC_PRIVATE_KEY && process.env.GA4_PROPERTY_ID)
}

function getAuthClient() {
  const email = process.env.GSC_CLIENT_EMAIL
  const key = process.env.GSC_PRIVATE_KEY?.replace(/\\n/g, '\n')
  if (!email || !key) return null

  return new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  })
}

function propertyId() {
  return process.env.GA4_PROPERTY_ID ?? ''
}

export interface TrafficByPage {
  path: string
  sessions: number
  activeUsers: number
  conversions: number
}

export interface AnalyticsSummary {
  configured: boolean
  error: string | null
  totalSessions: number
  totalActiveUsers: number
  totalConversions: number
  organicSessions: number
  topChannels: { channel: string; sessions: number }[]
  topPages: TrafficByPage[]
}

const EMPTY: AnalyticsSummary = {
  configured: false,
  error: null,
  totalSessions: 0,
  totalActiveUsers: 0,
  totalConversions: 0,
  organicSessions: 0,
  topChannels: [],
  topPages: [],
}

/**
 * Last 28 days — sessions, users and conversions by landing page and by
 * acquisition channel, plus the organic-search slice specifically. This is
 * the piece the SEO dashboard was missing: it can say a title/meta fix
 * shipped, but not whether it moved real traffic. GSC's click/impression
 * numbers are a search-result proxy; this is what actually happened on
 * the page afterwards.
 */
export async function getTrafficSummary(): Promise<AnalyticsSummary> {
  if (!isConfigured()) return EMPTY

  const auth = getAuthClient()
  if (!auth) return EMPTY

  const analyticsdata = google.analyticsdata({ version: 'v1beta', auth })
  const property = `properties/${propertyId()}`

  try {
    const [byPage, byChannel, organic] = await Promise.all([
      analyticsdata.properties.runReport({
        property,
        requestBody: {
          dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
          dimensions: [{ name: 'landingPagePlusQueryString' }],
          metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'conversions' }],
          orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
          limit: '50',
        },
      }),
      analyticsdata.properties.runReport({
        property,
        requestBody: {
          dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
          dimensions: [{ name: 'sessionDefaultChannelGroup' }],
          metrics: [{ name: 'sessions' }],
          orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        },
      }),
      analyticsdata.properties.runReport({
        property,
        requestBody: {
          dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
          dimensionFilter: {
            filter: {
              fieldName: 'sessionDefaultChannelGroup',
              stringFilter: { value: 'Organic Search' },
            },
          },
          metrics: [{ name: 'sessions' }],
        },
      }),
    ])

    const topPages: TrafficByPage[] = (byPage.data.rows ?? []).map(r => ({
      path: (r.dimensionValues?.[0]?.value ?? '/').split('?')[0],
      sessions: Number(r.metricValues?.[0]?.value ?? 0),
      activeUsers: Number(r.metricValues?.[1]?.value ?? 0),
      conversions: Number(r.metricValues?.[2]?.value ?? 0),
    }))

    const topChannels = (byChannel.data.rows ?? []).map(r => ({
      channel: r.dimensionValues?.[0]?.value ?? 'Unassigned',
      sessions: Number(r.metricValues?.[0]?.value ?? 0),
    }))

    const organicSessions = Number(organic.data.rows?.[0]?.metricValues?.[0]?.value ?? 0)

    return {
      configured: true,
      error: null,
      totalSessions: topPages.reduce((s, p) => s + p.sessions, 0),
      totalActiveUsers: topPages.reduce((s, p) => s + p.activeUsers, 0),
      totalConversions: topPages.reduce((s, p) => s + p.conversions, 0),
      organicSessions,
      topChannels,
      topPages,
    }
  } catch (e) {
    return {
      configured: true,
      error: e instanceof Error ? e.message : 'GA4 request failed',
      totalSessions: 0,
      totalActiveUsers: 0,
      totalConversions: 0,
      organicSessions: 0,
      topChannels: [],
      topPages: [],
    }
  }
}
