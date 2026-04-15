import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Locations',
  description:
    'WESPA operates two premium locations in Zagreb: Business & Lounge on Radnička cesta 52 and Urban Hub on Zavrtnica 17. Parking, public transit, and direct highway access.',
  keywords: [
    'WESPA locations',
    'wespa lokacije',
    'coworking Radnička Zagreb',
    'coworking Zavrtnica Zagreb',
    'office Zagreb center',
  ],
  openGraph: {
    title: 'Locations | WESPA',
    description:
      'Two premium WESPA locations in Zagreb: Business & Lounge and Urban Hub. Easy access and parking.',
    url: 'https://wespa.hr/location',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WESPA Locations Zagreb' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Locations | WESPA',
    description:
      'Two premium WESPA locations in Zagreb: Business & Lounge and Urban Hub. Easy access and parking.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/location' },
}

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return children
}
