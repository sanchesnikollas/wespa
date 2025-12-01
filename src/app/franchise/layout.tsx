import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Franchise Opportunities',
  description: 'Join the WESPA franchise network. Bring the future of work to your city with our proven coworking and hospitality concept. Investment opportunities available.',
  keywords: [
    'WESPA franchise',
    'coworking franchise',
    'workspace franchise',
    'business opportunity',
    'franchise investment',
    'coworking business',
  ],
  openGraph: {
    title: 'Franchise Opportunities | WESPA',
    description: 'Join the WESPA franchise network. Bring the future of work to your city with our proven concept.',
    url: 'https://wespa.hr/franchise',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WESPA Franchise Opportunities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Franchise Opportunities | WESPA',
    description: 'Join the WESPA franchise network. Bring the future of work to your city.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/franchise',
  },
}

export default function FranchiseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
