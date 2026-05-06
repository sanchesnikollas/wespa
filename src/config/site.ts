// ============================================
// WESPA Website - Site Configuration
// ============================================

import { Location, CoworkingPlan, Feature, Metric, Restaurant } from '@/types'

export const siteConfig = {
  name: 'WESPA',
  tagline: 'Work. Eat. Socialize. Play. Anytime.',
  description:
    'Premium coworking, offices, restaurants, lounges and event venues in the heart of Zagreb\'s business district.',
  url: 'https://wespa.gigwand.com',
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
    address: 'Radnička cesta 50',
    city: 'Zagreb',
    postalCode: '10000',
    country: 'Croatia',
    phone: '+385 1 234 5671',
    email: 'greengold@wespa.hr',
    description:
      'Premium business hub at Green Gold. Ideal for established firms.',
    features: [
      'Executive meeting rooms',
      'Premium lounge area',
      'Papel Restaurant on-site',
      'Cigar & Cocktail room',
      'Dedicated parking',
      'Corporate-ready infrastructure',
    ],
    vibe: 'corporate',
    image: '/images/spaces/lounge-1.jpg',
    coordinates: {
      lat: 45.8066,
      lng: 15.9841,
    },
  },
  {
    id: 'zavrtnica',
    name: 'Spaces',
    fullName: 'WESPA Spaces',
    address: 'Heinzelova ulica 60',
    city: 'Zagreb',
    postalCode: '10000',
    country: 'Croatia',
    phone: '+385 1 234 5672',
    email: 'spaces@wespa.hr',
    description:
      'Industrial charm at Zavrtnica. Ideal for creatives and startups.',
    features: [
      'Open coworking areas',
      'Hot desks & dedicated desks',
      'Podcast studio',
      'Event spaces',
      'SPOT Restaurant on-site',
      'Community events',
    ],
    vibe: 'startup',
    image: '/images/spaces/coworking-1.jpg',
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
    tagline: 'Flexible daily access',
    description:
      'Perfect for freelancers and remote workers who need occasional workspace access with full amenities.',
    features: [
      'Access to any available desk',
      'High-speed WiFi',
      'Meeting room access',
      'Print & scan services',
      'Community events access',
      'Lounge access',
    ],
    pricing: {
      daily: 30,
      currency: 'EUR',
    },
    image: {
      src: '/images/workspaces/coworking/coworking-1.jpg',
      alt: 'FlyDesk flexible coworking at WESPA',
    },
  },
  {
    id: 'flydesk-lunch',
    name: 'FlyDesk + Lunch',
    tagline: 'Work & dine package',
    description:
      'Everything in FlyDesk plus a daily lunch included at our on-site restaurants.',
    features: [
      'Access to any available desk',
      'High-speed WiFi',
      'Daily lunch included',
      'Meeting room access',
      'Print & scan services',
      'Community events access',
    ],
    pricing: {
      daily: 35,
      currency: 'EUR',
    },
    image: {
      src: '/images/workspaces/coworking/coworking-4.jpg',
      alt: 'FlyDesk with lunch included at WESPA',
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
      'Meeting room credits',
      'Print & scan services',
      '24/7 access',
      'Mail handling',
    ],
    pricing: {
      monthly: 219,
      currency: 'EUR',
    },
    popular: true,
    image: {
      src: '/images/workspaces/coworking/coworking-7.jpg',
      alt: 'OwnDesk dedicated workstation at WESPA',
    },
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
      'Meeting room credits',
      'Premium WiFi',
      '24/7 access',
      'Custom branding options',
      'Priority support',
    ],
    pricing: {
      monthly: 226,
      currency: 'EUR',
    },
    image: {
      src: '/images/workspaces/offices/office-2.jpg',
      alt: 'OfficeDesk private office at WESPA',
    },
  },
]

// ============================================
// Meeting Room Pricing
// ============================================
export const meetingRoomPricing = {
  rooms: [
    { id: 'small', name: 'Meeting Room S', capacity: 4, pricePerHour: 22, currency: 'EUR' },
    { id: 'large', name: 'Meeting Room L', capacity: 10, pricePerHour: 32, currency: 'EUR' },
  ],
  packages: [
    { id: 'package-s', name: 'Package S', hours: 20, price: 350, validity: '6 months', currency: 'EUR' },
    { id: 'package-m', name: 'Package M', hours: 40, price: 750, validity: '6 months', currency: 'EUR' },
    { id: 'package-l', name: 'Package L', hours: 70, price: 850, validity: '6 months', currency: 'EUR' },
  ],
}

// ============================================
// Conference Rooms Data
// ============================================
export const conferenceRooms = [
  // Zavrtnica location
  { id: 'indigo', name: 'INDIGO', location: 'zavrtnica', area: 130, pricePerHour: 90, currency: 'EUR' },
  { id: 'incubator', name: 'INCUBATOR', location: 'zavrtnica', area: 70, pricePerHour: 67, currency: 'EUR' },
  { id: 'bond', name: 'BOND', location: 'zavrtnica', area: 63, pricePerHour: 65, currency: 'EUR' },
  { id: 'brain-gym', name: 'BRAIN GYM', location: 'zavrtnica', area: 38, pricePerHour: 47, currency: 'EUR' },
  // Green Gold location
  { id: 'enter', name: 'ENTER', location: 'green-gold', area: 170, pricePerHour: 113, maxPrice: 180, currency: 'EUR', divisible: true },
  { id: 'shift', name: 'SHIFT', location: 'green-gold', area: 110, pricePerHour: 120, currency: 'EUR' },
  { id: 'escape', name: 'ESCAPE', location: 'green-gold', area: 43, pricePerHour: 57, currency: 'EUR' },
  { id: 'connect', name: 'CONNECT', location: 'green-gold', area: 26, pricePerHour: 49, currency: 'EUR' },
]

// ============================================
// Features Grid Data
// ============================================
export const wespaFeatures: Feature[] = [
  {
    id: 'events',
    icon: 'calendar',
    title: 'Events & Conferences',
    description:
      'Host events for up to 500+ people across 10 halls with full AV production and catering.',
  },
  {
    id: 'lounge',
    icon: 'coffee',
    title: 'Lounge & Relax Zones',
    description:
      'Spacious lounge for informal meetings, networking, or simply unwinding between tasks.',
  },
  {
    id: 'gastro',
    icon: 'utensils',
    title: 'Gastro Experience',
    description:
      'Two on-site restaurants — Papel for fine dining and SPOT for casual business meals.',
  },
  {
    id: 'podcast',
    icon: 'mic',
    title: 'Podcast Room',
    description:
      'Professional recording studio for podcasts, interviews, and content creation.',
  },
  {
    id: 'focus-zones',
    icon: 'target',
    title: 'Focus Zones',
    description:
      'Quiet, distraction-free areas designed for deep work and concentration.',
  },
  {
    id: 'relax-zones',
    icon: 'sofa',
    title: 'Relax Zones',
    description:
      'Comfortable areas to recharge, socialize, or take a break from your workday.',
  },
  {
    id: 'pet-friendly',
    icon: 'heart',
    title: 'Pet Friendly',
    description:
      'Bring your furry companion to work. We provide water bowls and pet-friendly zones.',
  },
  {
    id: 'parking',
    icon: 'car',
    title: 'Dedicated Parking',
    description:
      'Convenient parking available at both locations for members and visitors.',
  },
]

// ============================================
// Metrics Data
// ============================================
export const wespaMetrics: Metric[] = [
  {
    id: 'sqm',
    value: '6,000',
    label: 'Square meters of space',
    suffix: 'm²',
  },
  {
    id: 'workstations',
    value: '500',
    label: 'Workstations',
    suffix: '+',
  },
  {
    id: 'events',
    value: '1,000',
    label: 'Hosted events',
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
