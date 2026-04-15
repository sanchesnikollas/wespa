import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business & Lounge — Radnička 52',
  description:
    'WESPA Business & Lounge on Radnička cesta 52 in Zagreb. Premium coworking, private offices, meeting rooms, and a 300m² lounge with restaurant and cocktail bar.',
  keywords: [
    'WESPA Business Lounge',
    'Radnička 52 Zagreb',
    'coworking Radnička',
    'business lounge Zagreb',
    'premium coworking Zagreb',
  ],
  openGraph: {
    title: 'Business & Lounge — Radnička 52 | WESPA',
    description:
      'Premium coworking, private offices, and a 300m² lounge on Radnička cesta 52, Zagreb.',
    url: 'https://wespa.hr/location/business-lounge',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WESPA Business & Lounge' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business & Lounge — Radnička 52 | WESPA',
    description:
      'Premium coworking, private offices, and a 300m² lounge on Radnička cesta 52, Zagreb.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/location/business-lounge' },
}

export default function BusinessLoungeLayout({ children }: { children: React.ReactNode }) {
  return children
}
