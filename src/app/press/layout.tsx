import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Press & Media',
  description: 'WESPA Zagreb press center. Find press releases, media coverage, news, and contact information for journalists and media inquiries.',
  keywords: [
    'WESPA press',
    'WESPA news',
    'media coverage',
    'press releases',
    'WESPA Zagreb media',
  ],
  openGraph: {
    title: 'Press & Media | WESPA Zagreb',
    description: 'WESPA Zagreb press center. Find press releases, media coverage, and news.',
    url: 'https://wespa.hr/press',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WESPA Press & Media',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Press & Media | WESPA Zagreb',
    description: 'WESPA Zagreb press center and media resources.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/press',
  },
}

export default function PressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
