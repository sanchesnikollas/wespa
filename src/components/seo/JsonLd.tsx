// ============================================
// JSON-LD Structured Data Components for SEO
// ============================================

import { siteConfig, locations } from '@/config/site'

// Organization Schema
export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WESPA',
    alternateName: 'WESPA Zagreb',
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo/logo-dark.png`,
    description: siteConfig.description,
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.instagram,
      siteConfig.social.facebook,
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.sales.phone,
        contactType: 'sales',
        email: siteConfig.contact.sales.email,
        availableLanguage: ['English', 'Croatian'],
      },
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.events.phone,
        contactType: 'reservations',
        email: siteConfig.contact.events.email,
        availableLanguage: ['English', 'Croatian'],
      },
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.general.phone,
        contactType: 'customer service',
        email: siteConfig.contact.general.email,
        availableLanguage: ['English', 'Croatian'],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// LocalBusiness Schema for each location
export function LocalBusinessJsonLd() {
  const businesses = locations.map((location) => {
    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'CoworkingSpace',
      '@id': `${siteConfig.url}/locations/${location.id}`,
      name: location.fullName,
      description: location.description,
      url: siteConfig.url,
      telephone: location.phone,
      email: location.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: location.address,
        addressLocality: location.city,
        postalCode: location.postalCode,
        addressCountry: 'HR',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00',
        },
      ],
      amenityFeature: location.features.map((feature) => ({
        '@type': 'LocationFeatureSpecification',
        name: feature,
        value: true,
      })),
      image: `${siteConfig.url}${location.image}`,
      priceRange: '€€',
      paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
      currenciesAccepted: 'EUR',
    }

    // Add geo coordinates if available
    if (location.coordinates) {
      schema.geo = {
        '@type': 'GeoCoordinates',
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng,
      }
    }

    return schema
  })

  return (
    <>
      {businesses.map((business, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
        />
      ))}
    </>
  )
}

// WebSite Schema for search box
export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WESPA',
    alternateName: 'WESPA Zagreb Coworking',
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      name: 'WESPA',
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo/logo-dark.png`,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// BreadcrumbList Schema
interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Combined component for homepage
export function HomePageJsonLd() {
  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <WebSiteJsonLd />
    </>
  )
}
