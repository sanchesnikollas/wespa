import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hospitality',
  description: 'Experience WESPA hospitality in Zagreb. Premium restaurants, cafes, and lounges. PAPEL restaurant and SPOT cafe - where business meets pleasure.',
  keywords: [
    'WESPA restaurant',
    'PAPEL Zagreb',
    'SPOT cafe',
    'business lunch Zagreb',
    'premium dining Zagreb',
    'restaurant Green Gold',
    'business lounge',
  ],
  openGraph: {
    title: 'Hospitality | WESPA Zagreb',
    description: 'Experience WESPA hospitality in Zagreb. Premium restaurants, cafes, and lounges.',
    url: 'https://wespa.hr/hospitality',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WESPA Hospitality',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hospitality | WESPA Zagreb',
    description: 'Experience WESPA hospitality in Zagreb. Premium restaurants, cafes, and lounges.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/hospitality',
  },
}

export default function HospitalityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
