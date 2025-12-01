import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Stories',
  description: 'Discover how businesses thrive at WESPA Zagreb. Read success stories from startups, agencies, and enterprises who found their perfect workspace with us.',
  keywords: [
    'WESPA reviews',
    'coworking testimonials',
    'client success stories',
    'workspace reviews Zagreb',
    'coworking experience',
  ],
  openGraph: {
    title: 'Client Stories | WESPA Zagreb',
    description: 'Discover how businesses thrive at WESPA Zagreb. Read success stories from our members.',
    url: 'https://wespa.hr/client-stories',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WESPA Client Stories',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Stories | WESPA Zagreb',
    description: 'Discover how businesses thrive at WESPA Zagreb.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/client-stories',
  },
}

export default function ClientStoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
