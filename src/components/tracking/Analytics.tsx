'use client'

// ============================================
// WESPA Website - Analytics & Tracking
// GTM, Meta Pixel, LinkedIn Insight Tag
// ============================================

import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// ============================================
// Configuration — only render if a real ID is set in the env.
// Falsy / placeholder IDs are dropped at render to avoid 404-ing tag servers.
// ============================================
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID

// Beacon → gigwand portal funnel.
const GIGWAND_INGEST_URL =
  process.env.NEXT_PUBLIC_GIGWAND_INGEST_URL ||
  'https://hayjlojrcmprwmzgqlxz.supabase.co/functions/v1/ingest-event'
const GIGWAND_SITE_ID = process.env.NEXT_PUBLIC_GIGWAND_SITE_ID || 'wespa'

const isValidGtmId = (id?: string) => !!id && /^GTM-[A-Z0-9]+$/i.test(id)
const isValidNumericId = (id?: string) => !!id && /^\d{6,}$/.test(id)

// Per-tab session id (cheap, no PII).
function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  const KEY = 'wespa-sess'
  let id = sessionStorage.getItem(KEY)
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessionStorage.setItem(KEY, id)
  }
  return id
}

interface BeaconPayload {
  event_name: string
  page_path?: string
  props?: Record<string, unknown>
}

// Fire-and-forget POST to gigwand. Uses sendBeacon when available so it
// survives page unloads (link clicks, form submits navigating away).
export function gigwandBeacon({ event_name, page_path, props }: BeaconPayload) {
  if (typeof window === 'undefined') return
  try {
    const utm = (() => {
      try {
        const stored = sessionStorage.getItem('wespa_utm')
        return stored ? JSON.parse(stored) : null
      } catch {
        return null
      }
    })()
    const body = JSON.stringify({
      site_id: GIGWAND_SITE_ID,
      event_name,
      page_path: page_path ?? window.location.pathname,
      session_id: getSessionId(),
      referrer: document.referrer || undefined,
      utm: utm
        ? {
            source: utm.utm_source ?? undefined,
            medium: utm.utm_medium ?? undefined,
            campaign: utm.utm_campaign ?? undefined,
            content: utm.utm_content ?? undefined,
            term: utm.utm_term ?? undefined,
          }
        : undefined,
      props,
    })
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        GIGWAND_INGEST_URL,
        new Blob([body], { type: 'application/json' }),
      )
    } else {
      void fetch(GIGWAND_INGEST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => undefined)
    }
  } catch {
    // Beacon failures are non-fatal; never break the user flow.
  }
}

// ============================================
// Google Tag Manager
// ============================================
export function GoogleTagManager() {
  if (!isValidGtmId(GTM_ID)) return null
  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}

// ============================================
// Meta Pixel (Facebook)
// ============================================
export function MetaPixel() {
  if (!isValidNumericId(META_PIXEL_ID)) return null
  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `,
      }}
    />
  )
}

// ============================================
// LinkedIn Insight Tag
// ============================================
export function LinkedInInsightTag() {
  if (!isValidNumericId(LINKEDIN_PARTNER_ID)) return null
  return (
    <Script
      id="linkedin-insight"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          _linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l) {
          if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
          window.lintrk.q=[]}
          var s = document.getElementsByTagName("script")[0];
          var b = document.createElement("script");
          b.type = "text/javascript";b.async = true;
          b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
          s.parentNode.insertBefore(b, s);})(window.lintrk);
        `,
      }}
    />
  )
}

// ============================================
// UTM Tracker Hook
// ============================================
export function useUTMTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Extract UTM parameters
    const utmParams = {
      utm_source: searchParams.get('utm_source'),
      utm_medium: searchParams.get('utm_medium'),
      utm_campaign: searchParams.get('utm_campaign'),
      utm_content: searchParams.get('utm_content'),
      utm_term: searchParams.get('utm_term'),
      utm_adset: searchParams.get('utm_adset'),
      utm_ad: searchParams.get('utm_ad'),
    }

    // Store in sessionStorage for form submissions
    const hasUtm = Object.values(utmParams).some(v => v !== null)
    if (hasUtm) {
      sessionStorage.setItem('wespa_utm', JSON.stringify(utmParams))
    }

    // Track page view with UTM data
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'page_view',
        page_path: pathname,
        page_title: document.title,
        ...utmParams,
      })
    }

    gigwandBeacon({
      event_name: 'page_view',
      page_path: pathname,
      props: { page_title: typeof document !== 'undefined' ? document.title : undefined },
    })
  }, [pathname, searchParams])
}

// ============================================
// UTM Tracker Component (wraps useUTMTracker)
// ============================================
export function UTMTracker() {
  useUTMTracker()
  return null
}

// ============================================
// Analytics Provider
// Combines all tracking scripts
// ============================================
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleTagManager />
      <MetaPixel />
      <LinkedInInsightTag />
      {children}
    </>
  )
}

// ============================================
// Event Tracking Functions
// ============================================
export const trackEvent = {
  // Lead form submission
  leadSubmit: (formType: string, data?: Record<string, unknown>) => {
    if (typeof window !== 'undefined') {
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'lead_submit',
          form_type: formType,
          ...data,
        })
      }
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Lead', { content_name: formType })
      }
      if ((window as any).lintrk) {
        (window as any).lintrk('track', { conversion_id: formType })
      }
      gigwandBeacon({ event_name: 'lead_submit', props: { form_type: formType } })
    }
  },

  // Contact form submission
  contactSubmit: (subject?: string) => {
    if (typeof window !== 'undefined') {
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'contact_submit',
          contact_subject: subject,
        })
      }
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Contact')
      }
      gigwandBeacon({ event_name: 'contact_submit', props: { contact_subject: subject } })
    }
  },

  // Download
  download: (resourceName: string) => {
    if (typeof window !== 'undefined') {
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'download',
          resource_name: resourceName,
        })
      }
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Lead', { content_name: resourceName })
      }
      gigwandBeacon({ event_name: 'download', props: { resource_name: resourceName } })
    }
  },

  // Book visit scheduled
  bookVisit: (location?: string) => {
    if (typeof window !== 'undefined') {
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'book_visit',
          visit_location: location,
        })
      }
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Schedule')
      }
      gigwandBeacon({ event_name: 'book_visit', props: { visit_location: location } })
    }
  },

  // Space view
  spaceView: (spaceType: string, spaceName: string) => {
    if (typeof window !== 'undefined') {
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'space_view',
          space_type: spaceType,
          space_name: spaceName,
        })
      }
      gigwandBeacon({
        event_name: 'space_view',
        props: { space_type: spaceType, space_name: spaceName },
      })
    }
  },

  // Newsletter signup
  newsletterSignup: () => {
    if (typeof window !== 'undefined') {
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({ event: 'newsletter_signup' })
      }
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Subscribe')
      }
      gigwandBeacon({ event_name: 'newsletter_signup' })
    }
  },
}

// ============================================
// Get stored UTM parameters
// ============================================
export function getStoredUTM(): Record<string, string | null> | null {
  if (typeof window === 'undefined') return null
  const stored = sessionStorage.getItem('wespa_utm')
  return stored ? JSON.parse(stored) : null
}
