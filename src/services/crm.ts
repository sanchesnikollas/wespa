// ============================================
// WESPA Website - CRM Integration Service
// Lead management and form submission handling
// ============================================

import { getUtmParams, isClient } from '@/lib/utils'
import { tracking } from './tracking'
import type { LeadFormData, ContactFormData, FranchiseFormData, NewsletterFormData } from '@/types'

// ============================================
// Types
// ============================================
export type LeadSource = 'website' | 'ads' | 'referral' | 'organic' | 'social' | 'direct'
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'

export interface CRMLead {
  // Contact info
  fullName: string
  email: string
  phone?: string
  companyName?: string

  // Lead classification
  source: LeadSource
  status: LeadStatus
  inquiryType: string
  productInterest?: string

  // Additional data
  teamSize?: string
  numberOfPeople?: number
  preferredLocation?: string
  message?: string

  // Tracking
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
  landingPage?: string
  referrer?: string

  // System
  language: string
  submittedAt: string
  ipCountry?: string
}

export interface CRMResponse {
  success: boolean
  leadId?: string
  message?: string
  error?: string
}

// ============================================
// CRM Service Configuration
// ============================================
const CRM_CONFIG = {
  // API endpoint - replace with actual CRM API
  apiEndpoint: process.env.NEXT_PUBLIC_CRM_API_ENDPOINT || '/api/leads',

  // Default values
  defaultSource: 'website' as LeadSource,
  defaultStatus: 'new' as LeadStatus,
  defaultLanguage: 'en',

  // Retry configuration
  maxRetries: 3,
  retryDelay: 1000,
}

// ============================================
// CRM Service
// ============================================
class CRMService {
  private debug = process.env.NODE_ENV === 'development'

  /**
   * Submit lead to CRM
   */
  async submitLead(data: LeadFormData, formId: string): Promise<CRMResponse> {
    const lead = this.buildLeadPayload(data)

    // Track form submission
    tracking.trackFormSubmit({
      form_id: formId,
      form_name: 'lead_form',
      form_location: isClient() ? window.location.pathname : '',
      inquiry_type: data.inquiryType,
    })

    try {
      const response = await this.sendToCRM(lead)

      if (response.success) {
        tracking.trackFormSuccess({
          form_id: formId,
          form_name: 'lead_form',
          form_location: isClient() ? window.location.pathname : '',
          inquiry_type: data.inquiryType,
        })
      }

      return response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'

      tracking.trackFormError({
        form_id: formId,
        form_name: 'lead_form',
        form_location: isClient() ? window.location.pathname : '',
        inquiry_type: data.inquiryType,
        error_message: errorMessage,
      })

      return {
        success: false,
        error: errorMessage,
      }
    }
  }

  /**
   * Submit contact form
   */
  async submitContact(data: ContactFormData, formId: string): Promise<CRMResponse> {
    const lead = this.buildContactPayload(data)

    tracking.trackFormSubmit({
      form_id: formId,
      form_name: 'contact_form',
      form_location: isClient() ? window.location.pathname : '',
    })

    try {
      const response = await this.sendToCRM(lead)

      if (response.success) {
        tracking.trackFormSuccess({
          form_id: formId,
          form_name: 'contact_form',
          form_location: isClient() ? window.location.pathname : '',
        })
      }

      return response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'

      tracking.trackFormError({
        form_id: formId,
        form_name: 'contact_form',
        form_location: isClient() ? window.location.pathname : '',
        error_message: errorMessage,
      })

      return {
        success: false,
        error: errorMessage,
      }
    }
  }

  /**
   * Submit newsletter subscription
   */
  async submitNewsletter(data: NewsletterFormData): Promise<CRMResponse> {
    const payload = {
      fullName: data.name,
      email: data.email,
      source: CRM_CONFIG.defaultSource,
      status: CRM_CONFIG.defaultStatus,
      inquiryType: 'newsletter',
      language: CRM_CONFIG.defaultLanguage,
      submittedAt: new Date().toISOString(),
      ...this.getTrackingData(),
    }

    try {
      return await this.sendToCRM(payload)
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Submit franchise inquiry
   */
  async submitFranchise(data: FranchiseFormData, formId: string): Promise<CRMResponse> {
    const payload = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      companyName: data.companyName,
      source: CRM_CONFIG.defaultSource,
      status: CRM_CONFIG.defaultStatus,
      inquiryType: 'franchise',
      productInterest: 'franchise',
      message: `Country: ${data.country}, City: ${data.city}, Investment: ${data.investmentRange}. ${data.message || ''}`,
      language: CRM_CONFIG.defaultLanguage,
      submittedAt: new Date().toISOString(),
      ...this.getTrackingData(),
    }

    tracking.trackFormSubmit({
      form_id: formId,
      form_name: 'franchise_form',
      form_location: isClient() ? window.location.pathname : '',
      inquiry_type: 'franchise',
    })

    try {
      const response = await this.sendToCRM(payload)

      if (response.success) {
        tracking.trackFormSuccess({
          form_id: formId,
          form_name: 'franchise_form',
          form_location: isClient() ? window.location.pathname : '',
          inquiry_type: 'franchise',
        })
      }

      return response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'

      tracking.trackFormError({
        form_id: formId,
        form_name: 'franchise_form',
        form_location: isClient() ? window.location.pathname : '',
        inquiry_type: 'franchise',
        error_message: errorMessage,
      })

      return {
        success: false,
        error: errorMessage,
      }
    }
  }

  /**
   * Build lead payload from form data
   */
  private buildLeadPayload(data: LeadFormData): CRMLead {
    const utmParams = getUtmParams()

    return {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      companyName: data.companyName,
      source: this.determineSource(utmParams),
      status: CRM_CONFIG.defaultStatus,
      inquiryType: data.inquiryType,
      productInterest: data.spaceType,
      teamSize: data.teamSize,
      numberOfPeople: data.numberOfPeople,
      preferredLocation: data.preferredLocation,
      message: data.message,
      utmSource: utmParams.utm_source,
      utmMedium: utmParams.utm_medium,
      utmCampaign: utmParams.utm_campaign,
      utmTerm: utmParams.utm_term,
      utmContent: utmParams.utm_content,
      landingPage: isClient() ? window.location.pathname : undefined,
      referrer: isClient() ? document.referrer : undefined,
      language: CRM_CONFIG.defaultLanguage,
      submittedAt: new Date().toISOString(),
    }
  }

  /**
   * Build contact payload
   */
  private buildContactPayload(data: ContactFormData): Partial<CRMLead> {
    return {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      source: CRM_CONFIG.defaultSource,
      status: CRM_CONFIG.defaultStatus,
      inquiryType: 'contact',
      message: `Subject: ${data.subject}\n\n${data.message}`,
      language: CRM_CONFIG.defaultLanguage,
      submittedAt: new Date().toISOString(),
      ...this.getTrackingData(),
    }
  }

  /**
   * Get common tracking data
   */
  private getTrackingData(): Partial<CRMLead> {
    if (!isClient()) return {}

    const utmParams = getUtmParams()

    return {
      utmSource: utmParams.utm_source,
      utmMedium: utmParams.utm_medium,
      utmCampaign: utmParams.utm_campaign,
      utmTerm: utmParams.utm_term,
      utmContent: utmParams.utm_content,
      landingPage: window.location.pathname,
      referrer: document.referrer || undefined,
    }
  }

  /**
   * Determine lead source from UTM params
   */
  private determineSource(utmParams: Record<string, string>): LeadSource {
    const { utm_source, utm_medium } = utmParams

    if (utm_source) {
      if (utm_medium === 'cpc' || utm_medium === 'paid') return 'ads'
      if (['facebook', 'instagram', 'linkedin', 'twitter'].includes(utm_source.toLowerCase())) {
        return 'social'
      }
      return 'referral'
    }

    if (isClient() && document.referrer) {
      const referrerHost = new URL(document.referrer).hostname
      if (referrerHost.includes('google') || referrerHost.includes('bing')) {
        return 'organic'
      }
      return 'referral'
    }

    return 'direct'
  }

  /**
   * Send data to CRM API
   */
  private async sendToCRM(data: Partial<CRMLead>): Promise<CRMResponse> {
    if (this.debug) {
      console.log('[CRM] Sending lead:', data)
      // In development, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return {
        success: true,
        leadId: `lead_${Date.now()}`,
        message: 'Lead submitted successfully (dev mode)',
      }
    }

    let lastError: Error | null = null

    for (let attempt = 1; attempt <= CRM_CONFIG.maxRetries; attempt++) {
      try {
        const response = await fetch(CRM_CONFIG.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const result = await response.json()
        return {
          success: true,
          leadId: result.id || result.leadId,
          message: result.message,
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error')

        if (attempt < CRM_CONFIG.maxRetries) {
          await new Promise((resolve) =>
            setTimeout(resolve, CRM_CONFIG.retryDelay * attempt)
          )
        }
      }
    }

    throw lastError || new Error('Failed to submit lead after retries')
  }
}

// Export singleton instance
export const crm = new CRMService()

// ============================================
// Lead Validation Utilities
// ============================================

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone format (basic)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/
  return phone.length >= 5 && phoneRegex.test(phone)
}

/**
 * Sanitize form input
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}
