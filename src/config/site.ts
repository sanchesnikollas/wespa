// ============================================
// WESPA Website - Site Configuration
// ============================================

import { Location, CoworkingPlan, Feature, Metric, Restaurant } from '@/types'

export const siteConfig = {
  name: 'WESPA',
  tagline: 'Work. Eat. Socialize. Play. Anytime.',
  description:
    'Premium coworking, offices, restaurants, lounges and event venues in the heart of Zagreb\'s business district.',
  url: 'https://wespa.hr',
  ogImage: '/og-image.jpg',
  contact: {
    sales: {
      phone: '+385 1 234 5678',
      email: 'sales@wespa.hr',
    },
    events: {
      phone: '+385 1 234 5679',
      email: 'events@wespa.hr',
    },
    general: {
      phone: '+385 1 234 5670',
      email: 'info@wespa.hr',
    },
  },
  social: {
    linkedin: 'https://linkedin.com/company/wespa',
    instagram: 'https://instagram.com/wespa_zagreb',
    facebook: 'https://facebook.com/wespa.zagreb',
  },
}

// ============================================
// Locations Data
// ============================================
export const locations: Location[] = [
  {
    id: 'green-gold',
    name: 'Business & Lounge',
    fullName: 'WESPA Business & Lounge',
    address: 'Radnička cesta 52',
    city: 'Zagreb',
    postalCode: '10000',
    phone: '+385 1 234 5671',
    email: 'greengold@wespa.hr',
    description:
      'Premium corporate environment in Green Gold Business Centre, featuring sophisticated lounges, executive meeting rooms, and fine dining at Papel Restaurant.',
    features: [
      'Executive meeting rooms',
      'Premium lounge area',
      'Papel Restaurant on-site',
      'Cigar & Cocktail room',
      'Dedicated parking',
      'Corporate-ready infrastructure',
    ],
    vibe: 'corporate',
    coordinates: {
      lat: 45.8066,
      lng: 15.9841,
    },
  },
  {
    id: 'zavrtnica',
    name: 'Spaces',
    fullName: 'WESPA Spaces',
    address: 'Zavrtnica 17',
    city: 'Zagreb',
    postalCode: '10000',
    phone: '+385 1 234 5672',
    email: 'spaces@wespa.hr',
    description:
      'Dynamic coworking hub designed for startups, freelancers, and growing teams. Open, collaborative spaces with SPOT Restaurant and event venues.',
    features: [
      'Open coworking areas',
      'Hot desks & dedicated desks',
      'Podcast studio',
      'Event spaces',
      'SPOT Restaurant on-site',
      'Community events',
    ],
    vibe: 'startup',
    coordinates: {
      lat: 45.8012,
      lng: 15.9878,
    },
  },
]

// ============================================
// Coworking Plans
// ============================================
export const coworkingPlans: CoworkingPlan[] = [
  {
    id: 'flydesk',
    name: 'FlyDesk',
    tagline: 'Flexible access for mobile workers',
    description:
      'Perfect for freelancers and remote workers who need occasional workspace access with full amenities.',
    features: [
      'Access to any available desk',
      'High-speed WiFi',
      'Meeting room credits (2h/month)',
      'Print & scan services',
      'Community events access',
      'Lounge access',
    ],
    pricing: {
      monthly: 150,
      currency: 'EUR',
    },
  },
  {
    id: 'owndesk',
    name: 'OwnDesk',
    tagline: 'Your dedicated workspace',
    description:
      'Dedicated desk in our coworking space, personalized for your daily work routine.',
    features: [
      'Personal dedicated desk',
      'Lockable storage',
      'High-speed WiFi',
      'Meeting room credits (5h/month)',
      'Print & scan services',
      '24/7 access',
      'Mail handling',
    ],
    pricing: {
      monthly: 300,
      currency: 'EUR',
    },
    popular: true,
  },
  {
    id: 'officedesk',
    name: 'OfficeDesk',
    tagline: 'Private office experience',
    description:
      'Private office space for small teams, combining privacy with community benefits.',
    features: [
      'Private office (2-6 people)',
      'Dedicated phone line',
      'Meeting room credits (10h/month)',
      'Premium WiFi',
      '24/7 access',
      'Custom branding options',
      'Priority support',
    ],
    pricing: {
      monthly: 600,
      currency: 'EUR',
    },
  },
]

// ============================================
// Features Grid Data
// ============================================
export const wespaFeatures: Feature[] = [
  {
    id: 'all-inclusive',
    icon: 'package',
    title: 'All services, one price',
    description:
      'WiFi, utilities, cleaning, coffee, printing — everything included in your membership.',
  },
  {
    id: 'lounge',
    icon: 'coffee',
    title: 'Lounge area on 300m²',
    description:
      'Spacious lounge for informal meetings, networking, or simply unwinding between tasks.',
  },
  {
    id: 'pet-friendly',
    icon: 'heart',
    title: 'Pet friendly',
    description:
      'Bring your furry companion to work. We provide water bowls and pet-friendly zones.',
  },
  {
    id: 'conference',
    icon: 'users',
    title: 'Conference rooms up to 150 people',
    description:
      'From intimate boardrooms to large conference halls, equipped with latest AV technology.',
  },
  {
    id: 'cigar-room',
    icon: 'star',
    title: 'Premium Cigar & Cocktail Room',
    description:
      'Exclusive lounge for members seeking a sophisticated after-hours atmosphere.',
  },
  {
    id: 'ergonomic',
    icon: 'monitor',
    title: 'Modern ergonomic furniture',
    description:
      'Height-adjustable desks, premium chairs, and thoughtfully designed workstations.',
  },
]

// ============================================
// Metrics Data
// ============================================
export const wespaMetrics: Metric[] = [
  {
    id: 'sqm',
    value: '3,000',
    label: 'Square meters',
    suffix: 'm²',
  },
  {
    id: 'workstations',
    value: '320',
    label: 'Workstations',
    suffix: '+',
  },
  {
    id: 'meeting-rooms',
    value: '20',
    label: 'Meeting rooms',
    suffix: '+',
  },
  {
    id: 'events',
    value: '500',
    label: 'Events hosted',
    suffix: '+',
  },
]

// ============================================
// Restaurants Data
// ============================================
export const restaurants: Restaurant[] = [
  {
    id: 'papel',
    name: 'Papel Restaurant',
    tagline: 'Fine dining in the business district',
    description:
      'Elegant restaurant offering contemporary Mediterranean cuisine in a sophisticated setting. Perfect for business lunches and special occasions.',
    cuisine: ['Mediterranean', 'European', 'Fine Dining'],
    atmosphere: 'Elegant & Professional',
    features: [
      'Business lunch menu',
      'Private dining room',
      'Wine cellar',
      'Outdoor terrace',
      'Corporate catering',
    ],
    hours: {
      weekdays: '11:00 - 23:00',
      weekends: '12:00 - 23:00',
    },
  },
  {
    id: 'spot',
    name: 'SPOT Restaurant',
    tagline: 'Casual dining for creative minds',
    description:
      'Vibrant, casual restaurant with international comfort food. The go-to spot for coworkers, quick meetings, and community gatherings.',
    cuisine: ['International', 'Comfort Food', 'Casual'],
    atmosphere: 'Casual & Vibrant',
    features: [
      'Quick lunch options',
      'All-day breakfast',
      'Coffee & snacks',
      'Community tables',
      'Event catering',
    ],
    hours: {
      weekdays: '08:00 - 22:00',
      weekends: '09:00 - 22:00',
    },
  },
]

// ============================================
// Team Size Options (for forms)
// ============================================
export const teamSizeOptions = [
  { value: '1', label: 'Just me' },
  { value: '2-5', label: '2-5 people' },
  { value: '6-10', label: '6-10 people' },
  { value: '11-25', label: '11-25 people' },
  { value: '26-50', label: '26-50 people' },
  { value: '51+', label: '51+ people' },
]

// ============================================
// Industry Options (for forms)
// ============================================
export const industryOptions = [
  { value: 'tech', label: 'Technology' },
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'creative', label: 'Creative & Design' },
  { value: 'marketing', label: 'Marketing & Media' },
  { value: 'legal', label: 'Legal' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'other', label: 'Other' },
]
