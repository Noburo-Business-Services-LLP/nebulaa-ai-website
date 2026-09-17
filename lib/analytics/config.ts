/**
 * All tag IDs come from env vars, never hardcoded, so a missing var just
 * silently disables that tag instead of shipping a broken script tag.
 */
export const analyticsConfig = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || '',
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '',
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
} as const

export const hasGTM = () => Boolean(analyticsConfig.gtmId)
export const hasGA4 = () => Boolean(analyticsConfig.ga4Id)
export const hasGoogleAds = () => Boolean(analyticsConfig.googleAdsId)
export const hasMetaPixel = () => Boolean(analyticsConfig.metaPixelId)
export const hasAnyTag = () => hasGTM() || hasGA4() || hasGoogleAds() || hasMetaPixel()
