// ============================================
// WESPA Website - Type Definitions
// ============================================

// ============================================
// Navigation Types
// ============================================
export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
  isExternal?: boolean
  icon?: string
}

export interface NavDropdown {
  label: string
  items: NavItem[]
}

// ============================================
// Space & Location Types
// ============================================
export type SpaceType =
  | 'coworking'
  | 'meeting'
  | 'office'
  | 'working-space'
  | 'urban-hub'
  | 'business-lounge'

export type LocationId = 'green-gold' | 'zavrtnica'

export interface Location {
  id: LocationId
  name: string
  fullName: string
  address: string
  city: string
  postalCode: string
  phone: string
  email: string
  description: string
  features: string[]
  vibe: 'corporate' | 'startup' | 'mixed'
  image: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface Space {
  id: string
  slug: string
  name: string
  type: SpaceType
  locationId: LocationId
  description: string
  shortDescription: string
  capacity: {
    min: number
    max: number
  }
  amenities: string[]
  images: string[]
  pricing?: {
    type: 'hourly' | 'daily' | 'monthly'
    from: number
    currency: string
  }
  availability: 'available' | 'limited' | 'unavailable'
}

// ============================================
// Coworking Plan Types
// ============================================
export type PlanType = 'flydesk' | 'owndesk' | 'officedesk'

export interface CoworkingPlan {
  id: PlanType
  name: string
  tagline: string
  description: string
  features: string[]
  pricing: {
    monthly: number
    currency: string
  }
  popular?: boolean
}

// ============================================
// Event Types
// ============================================
export type EventCategory = 'corporate' | 'social' | 'workshop' | 'podcast'

export interface EventType {
  id: string
  category: EventCategory
  name: string
  description: string
  capacity: {
    min: number
    max: number
  }
  features: string[]
  image?: string
}

// ============================================
// Hospitality Types
// ============================================
export interface Restaurant {
  id: 'papel' | 'spot'
  name: string
  tagline: string
  description: string
  cuisine: string[]
  atmosphere: string
  features: string[]
  hours: {
    weekdays: string
    weekends: string
  }
  menuUrl?: string
  reservationUrl?: string
}

// ============================================
// Content Types
// ============================================
export type ArticleCategory = 'trends' | 'research' | 'case-study' | 'flexible-products'

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: ArticleCategory
  author?: {
    name: string
    role?: string
    avatar?: string
  }
  publishedAt: string
  readingTime: number
  tags: string[]
  featured?: boolean
  image?: string
}

export interface ClientStory {
  id: string
  slug: string
  clientName: string
  clientRole?: string
  companyName: string
  companyLogo?: string
  testimonial: string
  fullStory?: string
  image?: string
  spaceType?: SpaceType
  locationId?: LocationId
}

// ============================================
// Form Types
// ============================================
export type InquiryType = 'workspace' | 'event' | 'tour' | 'general'

export interface LeadFormData {
  fullName: string
  email: string
  companyName?: string
  phone?: string
  inquiryType: InquiryType
  spaceType?: SpaceType
  teamSize?: string
  numberOfPeople?: number
  eventDate?: string
  message?: string
  preferredLocation?: LocationId
  marketingConsent: boolean
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

export interface ContactFormData {
  fullName: string
  email: string
  phone?: string
  subject: string
  message: string
  department?: 'sales' | 'events' | 'support' | 'general'
}

export interface NewsletterFormData {
  name: string
  email: string
}

export interface FranchiseFormData {
  fullName: string
  email: string
  phone: string
  companyName?: string
  country: string
  city: string
  investmentRange?: string
  message?: string
}

// ============================================
// UI State Types
// ============================================
export type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export interface FormState<T> {
  data: T | null
  status: FormStatus
  error?: string
}

// ============================================
// Feature Types (for grid sections)
// ============================================
export interface Feature {
  id: string
  icon: string
  title: string
  description: string
}

// ============================================
// Metrics Types
// ============================================
export interface Metric {
  id: string
  value: string
  label: string
  suffix?: string
}

// ============================================
// SEO Types
// ============================================
export interface PageMeta {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  noIndex?: boolean
}
