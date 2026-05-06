import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events in Zagreb',
  description:
    'Host business events, workshops, launches, and celebrations at WESPA Zagreb. Flexible venues for up to 150 people with full event production, catering, and technical support.',
  keywords: [
    'event space Zagreb',
    'event venue Zagreb',
    'corporate events Zagreb',
    'business events Zagreb',
    'special events Zagreb',
    'WESPA events',
  ],
  openGraph: {
    title: 'Events in Zagreb | WESPA',
    description:
      'Business events, workshops, launches, and celebrations in central Zagreb. Up to 150 people.',
    url: 'https://wespa.gigwand.com/events',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WESPA Events Zagreb' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events in Zagreb | WESPA',
    description:
      'Business events, workshops, launches, and celebrations in central Zagreb. Up to 150 people.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/events' },
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children
}
