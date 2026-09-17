/**
 * Consent Mode v2 state, shared between CookieConsent (the banner) and
 * AnalyticsScripts (the tag loader). Stored under one key so both read the
 * same source of truth instead of drifting.
 */
export const CONSENT_KEY = 'nebulaa_cookie_consent'
export const CONSENT_EVENT = 'nebulaa:consent-updated'

export type ConsentChoice = 'all' | 'necessary'

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    return v === 'all' || v === 'necessary' ? v : null
  } catch {
    return null
  }
}

export function setStoredConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice)
  } catch {
    /* storage unavailable — consent just won't persist across visits */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }))
}

interface DataLayerWindow extends Window {
  dataLayer?: unknown[]
}

/** Pushes the Google Consent Mode v2 signal. Safe to call before gtag exists — it queues. */
export function applyConsentMode(choice: ConsentChoice) {
  const w = window as DataLayerWindow
  w.dataLayer = w.dataLayer || []
  function gtag(...args: unknown[]) {
    w.dataLayer!.push(args)
  }
  const granted = choice === 'all'
  gtag('consent', 'update', {
    ad_storage: granted ? 'granted' : 'denied',
    ad_user_data: granted ? 'granted' : 'denied',
    ad_personalization: granted ? 'granted' : 'denied',
    analytics_storage: granted ? 'granted' : 'denied',
  })
}
