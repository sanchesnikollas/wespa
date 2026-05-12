import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Special Events',
  description:
    'From intimate dinners to large private celebrations at WESPA Zagreb. Full organizational support, top-tier production, custom catering, and an ambiance to remember.',
  keywords: [
    'special events Zagreb',
    'private events Zagreb',
    'wedding venue Zagreb',
    'private dinner Zagreb',
    'celebration venue Zagreb',
    'WESPA special events',
  ],
  openGraph: {
    title: 'Special Events | WESPA',
    description:
      'Intimate dinners to large private celebrations at WESPA Zagreb. Full production support included.',
    url: 'https://wespa.gigwand.com/events/custom-special-events',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WESPA Special Events Zagreb' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Special Events | WESPA',
    description:
      'Intimate dinners to large private celebrations at WESPA Zagreb. Full production support included.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/events/custom-special-events' },
}

export default function CustomSpecialEventsLayout({ children }: { children: React.ReactNode }) {
  return children
}
