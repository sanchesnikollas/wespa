import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SPOT Restaurant',
  description:
    'SPOT: business-class dining in Green Gold center, Zagreb. Premium daily menu, a la carte service and curated wine list. Top-tier business lunch with flawless service.',
  keywords: [
    'SPOT restaurant Zagreb',
    'business restaurant Zagreb',
    'Green Gold Zagreb',
    'fine dining Zagreb',
    'business lunch Zagreb',
  ],
  openGraph: {
    title: 'SPOT Restaurant | WESPA',
    description:
      'Business-class dining at SPOT, Green Gold Zagreb. Premium daily menu and curated wine list.',
    url: 'https://wespa.gigwand.com/food/spot',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'SPOT Restaurant WESPA Zagreb' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SPOT Restaurant | WESPA',
    description:
      'Business-class dining at SPOT, Green Gold Zagreb. Premium daily menu and curated wine list.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/food/spot' },
}

export default function SpotLayout({ children }: { children: React.ReactNode }) {
  return children
}
