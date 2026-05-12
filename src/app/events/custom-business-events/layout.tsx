import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business Events',
  description:
    'Professional infrastructure for conferences, panels, and workshops at WESPA Zagreb. 10 halls across two locations, state-of-the-art AV, business catering, support for 2 to 500+ participants.',
  keywords: [
    'business events Zagreb',
    'conference venue Zagreb',
    'corporate events Zagreb',
    'panel venue Zagreb',
    'workshop space Zagreb',
    'WESPA business events',
  ],
  openGraph: {
    title: 'Business Events | WESPA',
    description:
      'Conferences, panels, and workshops at WESPA Zagreb. 10 halls, state-of-the-art AV, business catering.',
    url: 'https://wespa.gigwand.com/events/custom-business-events',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WESPA Business Events Zagreb' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Events | WESPA',
    description:
      'Conferences, panels, and workshops at WESPA Zagreb. 10 halls, state-of-the-art AV, business catering.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/events/custom-business-events' },
}

export default function CustomBusinessEventsLayout({ children }: { children: React.ReactNode }) {
  return children
}
