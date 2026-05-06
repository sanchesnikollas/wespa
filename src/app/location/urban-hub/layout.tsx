import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Urban Hub — Heinzelova ulica 60',
  description:
    'WESPA Urban Hub on Heinzelova ulica 60 in Zagreb. Coworking, private offices, meeting rooms, and event spaces with easy highway access and on-site parking.',
  keywords: [
    'WESPA Urban Hub',
    'Heinzelova ulica 60 Zagreb',
    'coworking Zavrtnica',
    'WESPA Spaces',
    'office Zagreb highway access',
  ],
  openGraph: {
    title: 'Urban Hub — Heinzelova ulica 60 | WESPA',
    description:
      'Coworking, private offices, and event spaces on Heinzelova ulica 60, Zagreb. On-site parking.',
    url: 'https://wespa.gigwand.com/location/urban-hub',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WESPA Urban Hub' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Urban Hub — Heinzelova ulica 60 | WESPA',
    description:
      'Coworking, private offices, and event spaces on Heinzelova ulica 60, Zagreb. On-site parking.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/location/urban-hub' },
}

export default function UrbanHubLayout({ children }: { children: React.ReactNode }) {
  return children
}
