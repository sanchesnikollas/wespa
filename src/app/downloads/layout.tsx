import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Downloads',
  description: 'Download WESPA resources including brand guidelines, media kit, brochures, and marketing materials. Access our official assets and documentation.',
  keywords: [
    'WESPA downloads',
    'brand guidelines',
    'media kit',
    'WESPA brochure',
    'marketing materials',
  ],
  openGraph: {
    title: 'Downloads | WESPA Zagreb',
    description: 'Download WESPA resources including brand guidelines, media kit, and brochures.',
    url: 'https://wespa.hr/downloads',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WESPA Downloads',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Downloads | WESPA Zagreb',
    description: 'Download WESPA resources and marketing materials.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/downloads',
  },
}

export default function DownloadsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
