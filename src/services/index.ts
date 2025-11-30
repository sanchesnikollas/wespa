// ============================================
// WESPA Website - Services Export
// ============================================

export { tracking, generateEventId, getCurrentPageData } from './tracking'
export type {
  TrackingEventName,
  TrackingEvent,
  PageViewData,
  CTAClickData,
  FormEventData,
  SectionViewData,
} from './tracking'

export { crm, isValidEmail, isValidPhone, sanitizeInput } from './crm'
export type { LeadSource, LeadStatus, CRMLead, CRMResponse } from './crm'
