import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with WESPA Zagreb. Contact us for workspace inquiries, membership information, event bookings, or general questions. We respond within 24 hours.',
  keywords: [
    'contact WESPA',
    'WESPA Zagreb contact',
    'coworking inquiry',
    'office space inquiry',
    'event booking Zagreb',
    'workspace consultation',
  ],
  openGraph: {
    title: 'Contact Us | WESPA Zagreb',
    description: 'Get in touch with WESPA Zagreb for workspace inquiries, membership information, or event bookings.',
    url: 'https://wespa.hr/contact',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact WESPA Zagreb',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | WESPA Zagreb',
    description: 'Get in touch with WESPA Zagreb for workspace inquiries, membership information, or event bookings.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
