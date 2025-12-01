import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ideas & Insights',
  description: 'Explore ideas and insights about the future of work, productivity tips, hybrid workspace trends, and workplace innovation from WESPA Zagreb.',
  keywords: [
    'future of work',
    'workplace trends',
    'productivity tips',
    'hybrid work',
    'coworking insights',
    'workspace innovation',
    'remote work',
  ],
  openGraph: {
    title: 'Ideas & Insights | WESPA',
    description: 'Explore ideas and insights about the future of work, productivity tips, and workplace innovation.',
    url: 'https://wespa.hr/ideas',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WESPA Ideas & Insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ideas & Insights | WESPA',
    description: 'Explore ideas and insights about the future of work and workplace innovation.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/ideas',
  },
}

export default function IdeasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
