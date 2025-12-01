import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Visit',
  description: 'Schedule a tour of WESPA Zagreb. Visit our coworking spaces, private offices, meeting rooms and hospitality venues. Experience the future of work firsthand.',
  keywords: [
    'book tour WESPA',
    'visit coworking Zagreb',
    'office tour Zagreb',
    'workspace tour',
    'WESPA tour',
    'schedule visit',
  ],
  openGraph: {
    title: 'Book a Visit | WESPA Zagreb',
    description: 'Schedule a tour of WESPA Zagreb. Visit our coworking spaces, private offices, meeting rooms and hospitality venues.',
    url: 'https://wespa.hr/book-visit',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Book a Visit at WESPA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Visit | WESPA Zagreb',
    description: 'Schedule a tour of WESPA Zagreb. Visit our coworking spaces, private offices, and hospitality venues.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/book-visit',
  },
}

export default function BookVisitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
