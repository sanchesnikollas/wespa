import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Event Venues',
  description: 'Host your next event at WESPA Stage Zagreb. Premium venues for business conferences, corporate events, product launches, and special celebrations. Capacity up to 200 guests.',
  keywords: [
    'event venue Zagreb',
    'conference room Zagreb',
    'corporate events Zagreb',
    'product launch venue',
    'business events',
    'WESPA Stage',
    'wedding venue Zagreb',
    'party venue Zagreb',
  ],
  openGraph: {
    title: 'Event Venues | WESPA Stage Zagreb',
    description: 'Host your next event at WESPA Stage Zagreb. Premium venues for business conferences, corporate events, and special celebrations.',
    url: 'https://wespa.hr/stage',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WESPA Stage Event Venues',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event Venues | WESPA Stage Zagreb',
    description: 'Host your next event at WESPA Stage Zagreb. Premium venues for conferences and special celebrations.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/stage',
  },
}

export default function StageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
