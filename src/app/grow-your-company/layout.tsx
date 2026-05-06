import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grow Your Company',
  description:
    'Scale your business with WESPA: private offices, meeting rooms, event venues, and a premium business community in central Zagreb. Built for teams ready to grow.',
  keywords: [
    'grow business Zagreb',
    'scale company Zagreb',
    'business growth Zagreb',
    'team office Zagreb',
    'enterprise coworking Zagreb',
  ],
  openGraph: {
    title: 'Grow Your Company | WESPA',
    description:
      'Scale your business with private offices, meeting rooms, and a premium business community in Zagreb.',
    url: 'https://wespa.gigwand.com/grow-your-company',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WESPA Grow Your Company' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grow Your Company | WESPA',
    description:
      'Scale your business with private offices, meeting rooms, and a premium business community in Zagreb.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/grow-your-company' },
}

export default function GrowYourCompanyLayout({ children }: { children: React.ReactNode }) {
  return children
}
