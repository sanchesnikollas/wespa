'use client'

// ============================================
// WESPA Website - Analytics & Tracking
// GTM, Meta Pixel, LinkedIn Insight Tag
// ============================================

import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// ============================================
// Configuration (replace with actual IDs)
// ============================================
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || 'XXXXXXXXXXXXXXXXX'
const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || 'XXXXXXX'

// ============================================
// Google Tag Manager
// ============================================
export function GoogleTagManager() {
  return (
    <>
      {/* GTM Script */}
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
      {/* GTM NoScript (for body) */}
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
      // GTM
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'lead_submit',
          form_type: formType,
          ...data,
        })
      }

      // Meta Pixel
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Lead', { content_name: formType })
      }

      // LinkedIn
      if ((window as any).lintrk) {
        (window as any).lintrk('track', { conversion_id: formType })
      }
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
    }
  },

  // Newsletter signup
  newsletterSignup: () => {
    if (typeof window !== 'undefined') {
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'newsletter_signup',
        })
      }

      if ((window as any).fbq) {
        (window as any).fbq('track', 'Subscribe')
      }
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
