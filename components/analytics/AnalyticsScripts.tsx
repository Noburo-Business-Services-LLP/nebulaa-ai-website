'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { analyticsConfig, hasGTM, hasGA4, hasGoogleAds, hasMetaPixel } from '@/lib/analytics/config'
import { CONSENT_EVENT, ConsentChoice, applyConsentMode, getStoredConsent } from '@/lib/analytics/consent'

/**
 * Loads every ad/analytics tag we have IDs for, gated on cookie consent.
 * Google's tags (GTM/GA4/Google Ads) always load — they run in Consent Mode
 * v2, so they collect cookieless pings until consent is granted, which is
 * the compliant default rather than not loading at all. The Meta Pixel has
 * no server-side consent-mode equivalent for the browser script, so it is
 * only injected once the visitor has explicitly accepted.
 */
export default function AnalyticsScripts() {
  const [consent, setConsent] = useState<ConsentChoice | null>(null)

  useEffect(() => {
    setConsent(getStoredConsent())
    const onUpdate = (e: Event) => {
      const choice = (e as CustomEvent<ConsentChoice>).detail
      setConsent(choice)
      applyConsentMode(choice)
    }
    window.addEventListener(CONSENT_EVENT, onUpdate)
    return () => window.removeEventListener(CONSENT_EVENT, onUpdate)
  }, [])

  const metaAllowed = consent === 'all' && hasMetaPixel()

  return (
    <>
      {/* Consent Mode v2 default — must run before any tag, hence beforeInteractive-equivalent placement in <head>. */}
      <Script id="consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>

      {hasGTM() && (
        <Script id="gtm-loader" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${analyticsConfig.gtmId}');
          `}
        </Script>
      )}

      {!hasGTM() && hasGA4() && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${analyticsConfig.ga4Id}');
              ${hasGoogleAds() ? `gtag('config', '${analyticsConfig.googleAdsId}');` : ''}
            `}
          </Script>
        </>
      )}

      {metaAllowed && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${analyticsConfig.metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  )
}
