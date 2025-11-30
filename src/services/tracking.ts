// ============================================
// WESPA Website - Analytics & Tracking Service
// Integration with GA4 + GTM
// ============================================

import { isClient } from '@/lib/utils'

// ============================================
// Types
// ============================================
export type TrackingEventName =
  | 'page_view'
  | 'view_section'
  | 'click_cta'
  | 'form_start'
  | 'form_submit'
  | 'form_submit_success'
  | 'form_submit_error'
  | 'filter_applied'
  | 'search_performed'
  | 'article_read'
  | 'download_started'
  | 'video_play'
  | 'external_link_click'
  | 'phone_click'
  | 'email_click'
  | 'scroll_depth'

export interface TrackingEvent {
  event: TrackingEventName
  properties?: Record<string, string | number | boolean | undefined>
}

export interface PageViewData {
  page_path: string
  page_title: string
  page_location: string
  referrer?: string
}

export interface CTAClickData {
  cta_text: string
  cta_location: string
  cta_destination?: string
  cta_type?: 'primary' | 'secondary' | 'ghost' | 'link'
}

export interface FormEventData {
  form_id: string
  form_name: string
  form_location: string
  inquiry_type?: string
  error_message?: string
}

export interface SectionViewData {
  section_id: string
  section_name: string
  section_position: number
}

// ============================================
// GTM DataLayer Interface
// ============================================
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
    gtag: (...args: unknown[]) => void
  }
}

// ============================================
// Tracking Service
// ============================================
class TrackingService {
  private isInitialized = false
  private debug = process.env.NODE_ENV === 'development'

  /**
   * Initialize tracking (call once on app load)
   */
  init(): void {
    if (!isClient() || this.isInitialized) return

    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || []

    this.isInitialized = true

    if (this.debug) {
      console.log('[Tracking] Initialized')
    }
  }

  /**
   * Push event to GTM dataLayer
   */
  private pushToDataLayer(data: Record<string, unknown>): void {
    if (!isClient()) return

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(data)

    if (this.debug) {
      console.log('[Tracking] DataLayer push:', data)
    }
  }

  /**
   * Track generic event
   */
  trackEvent(event: TrackingEventName, properties?: Record<string, unknown>): void {
    this.pushToDataLayer({
      event,
      ...properties,
      timestamp: new Date().toISOString(),
    })
  }

  /**
   * Track page view
   */
  trackPageView(data: PageViewData): void {
    this.trackEvent('page_view', {
      page_path: data.page_path,
      page_title: data.page_title,
      page_location: data.page_location,
      page_referrer: data.referrer,
    })
  }

  /**
   * Track CTA click
   */
  trackCTAClick(data: CTAClickData): void {
    this.trackEvent('click_cta', {
      cta_text: data.cta_text,
      cta_location: data.cta_location,
      cta_destination: data.cta_destination,
      cta_type: data.cta_type,
    })
  }

  /**
   * Track section view (for scroll tracking)
   */
  trackSectionView(data: SectionViewData): void {
    this.trackEvent('view_section', {
      section_id: data.section_id,
      section_name: data.section_name,
      section_position: data.section_position,
    })
  }

  /**
   * Track form events
   */
  trackFormStart(data: FormEventData): void {
    this.trackEvent('form_start', data as unknown as Record<string, unknown>)
  }

  trackFormSubmit(data: FormEventData): void {
    this.trackEvent('form_submit', data as unknown as Record<string, unknown>)
  }

  trackFormSuccess(data: FormEventData): void {
    this.trackEvent('form_submit_success', data as unknown as Record<string, unknown>)
  }

  trackFormError(data: FormEventData): void {
    this.trackEvent('form_submit_error', data as unknown as Record<string, unknown>)
  }

  /**
   * Track filter/search actions
   */
  trackFilter(filterType: string, filterValue: string, location: string): void {
    this.trackEvent('filter_applied', {
      filter_type: filterType,
      filter_value: filterValue,
      filter_location: location,
    })
  }

  trackSearch(query: string, resultsCount: number, location: string): void {
    this.trackEvent('search_performed', {
      search_query: query,
      search_results_count: resultsCount,
      search_location: location,
    })
  }

  /**
   * Track content engagement
   */
  trackArticleRead(articleId: string, articleTitle: string, readPercentage: number): void {
    this.trackEvent('article_read', {
      article_id: articleId,
      article_title: articleTitle,
      read_percentage: readPercentage,
    })
  }

  trackDownload(fileName: string, fileType: string): void {
    this.trackEvent('download_started', {
      file_name: fileName,
      file_type: fileType,
    })
  }

  /**
   * Track external link clicks
   */
  trackExternalLink(url: string, linkText: string): void {
    this.trackEvent('external_link_click', {
      link_url: url,
      link_text: linkText,
    })
  }

  /**
   * Track phone/email clicks
   */
  trackPhoneClick(phoneNumber: string, location: string): void {
    this.trackEvent('phone_click', {
      phone_number: phoneNumber,
      click_location: location,
    })
  }

  trackEmailClick(email: string, location: string): void {
    this.trackEvent('email_click', {
      email_address: email,
      click_location: location,
    })
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth(depth: 25 | 50 | 75 | 100): void {
    this.trackEvent('scroll_depth', {
      scroll_depth_percentage: depth,
    })
  }

  /**
   * Set user properties (for identified users)
   */
  setUserProperties(properties: Record<string, string | number | boolean>): void {
    this.pushToDataLayer({
      event: 'user_properties_set',
      user_properties: properties,
    })
  }
}

// Export singleton instance
export const tracking = new TrackingService()

// ============================================
// Utility Functions
// ============================================

/**
 * Generate unique event ID
 */
export function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Get current page data for tracking
 */
export function getCurrentPageData(): PageViewData | null {
  if (!isClient()) return null

  return {
    page_path: window.location.pathname,
    page_title: document.title,
    page_location: window.location.href,
    referrer: document.referrer || undefined,
  }
}
