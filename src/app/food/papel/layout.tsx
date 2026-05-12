import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Papel Restaurant',
  description:
    'Papel: the gastro hub for your workday at WESPA Zagreb. Premium daily specials and a la carte menu with nutrient-rich ingredients. Open to members and the public.',
  keywords: [
    'Papel restaurant Zagreb',
    'business lunch Zagreb',
    'restaurant WESPA',
    'specialty coffee Zagreb',
    'daily menu Zagreb',
  ],
  openGraph: {
    title: 'Papel Restaurant | WESPA',
    description:
      'The gastro hub for your workday at WESPA Zagreb. Daily specials and a la carte menu.',
    url: 'https://wespa.gigwand.com/food/papel',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Papel Restaurant WESPA Zagreb' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Papel Restaurant | WESPA',
    description:
      'The gastro hub for your workday at WESPA Zagreb. Daily specials and a la carte menu.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/food/papel' },
}

export default function PapelLayout({ children }: { children: React.ReactNode }) {
  return children
}
