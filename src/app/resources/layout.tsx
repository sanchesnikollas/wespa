import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Resources, guides, and insights from WESPA: articles on coworking, hybrid work, team productivity, and running a business from Zagreb.',
  keywords: [
    'WESPA resources',
    'coworking guide',
    'remote work Zagreb',
    'business insights Zagreb',
    'hybrid work',
  ],
  openGraph: {
    title: 'Resources | WESPA',
    description:
      'Articles and guides on coworking, hybrid work, and running a business from Zagreb.',
    url: 'https://wespa.gigwand.com/resources',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WESPA Resources' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources | WESPA',
    description:
      'Articles and guides on coworking, hybrid work, and running a business from Zagreb.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/resources' },
  robots: {
    index: false,
    follow: false,
  },
}

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children
}
