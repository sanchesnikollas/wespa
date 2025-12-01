import { MetadataRoute } from 'next'

// ============================================
// WESPA Sitemap Generator
// Generates dynamic sitemap for all pages
// ============================================

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wespa.hr'
  const lastModified = new Date()

  // Static pages with priorities
  const staticPages = [
    // High priority - Main pages
    { url: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/spaces', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/hospitality', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/stage', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/book-visit', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },

    // Medium priority - Secondary pages
    { url: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/ideas', priority: 0.7, changeFrequency: 'daily' as const },
    { url: '/client-stories', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/press', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/franchise', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/downloads', priority: 0.4, changeFrequency: 'monthly' as const },

    // Hospitality sub-pages
    { url: '/hospitality/papel', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/hospitality/spot', priority: 0.8, changeFrequency: 'weekly' as const },

    // Stage sub-pages
    { url: '/stage/business-events', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/stage/special-events', priority: 0.7, changeFrequency: 'monthly' as const },

    // Legal pages - Low priority
    { url: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/house-rules', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  // Space pages (dynamic)
  const spacePages = [
    '/spaces/flydesk',
    '/spaces/owndesk',
    '/spaces/officedesk',
    '/spaces/meeting-rooms',
  ].map(url => ({
    url,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }))

  // Blog/Ideas pages (these would ideally come from a CMS)
  const ideaPages = [
    '/ideas/future-of-work',
    '/ideas/hybrid-workspace',
    '/ideas/productivity-tips',
  ].map(url => ({
    url,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  }))

  // Client stories pages
  const clientStoryPages = [
    '/client-stories/tech-startup',
    '/client-stories/creative-agency',
    '/client-stories/consultant',
  ].map(url => ({
    url,
    priority: 0.5,
    changeFrequency: 'monthly' as const,
  }))

  // Download pages
  const downloadPages = [
    '/downloads/brand-guidelines',
    '/downloads/media-kit',
  ].map(url => ({
    url,
    priority: 0.4,
    changeFrequency: 'monthly' as const,
  }))

  // Combine all pages
  const allPages = [
    ...staticPages,
    ...spacePages,
    ...ideaPages,
    ...clientStoryPages,
    ...downloadPages,
  ]

  return allPages.map(page => ({
    url: `${baseUrl}${page.url}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
