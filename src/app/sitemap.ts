import { MetadataRoute } from 'next'

// ============================================
// WESPA Sitemap Generator
// ============================================

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wespa.hr'
  const lastModified = new Date()

  const staticPages = [
    // High priority - Main pages
    { url: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/workspaces', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/workspaces/coworking', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/workspaces/meeting-rooms', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/workspaces/offices', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/workspaces/custom-office-zones', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/workspaces/conference-rooms', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/workspaces/virtual-office', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/events', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/events/custom-special-events', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/events/custom-business-events', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/events/event-spaces', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/food', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/food/papel', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/food/spot', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/location', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/location/business-lounge', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/location/urban-hub', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/grow-your-company', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/community', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/resources', priority: 0.7, changeFrequency: 'daily' as const },
    { url: '/downloads', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/book-visit', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },

    // Secondary pages
    { url: '/about', priority: 0.6, changeFrequency: 'monthly' as const },

    // Legal pages
    { url: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/house-rules', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  return staticPages.map(page => ({
    url: `${baseUrl}${page.url}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
