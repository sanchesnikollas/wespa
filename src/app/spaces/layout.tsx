import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Workspace Solutions',
  description: 'Find your perfect workspace at WESPA Zagreb. Hot desks, dedicated desks, private offices, meeting rooms and business lounges. Flexible coworking solutions for teams of all sizes.',
  keywords: [
    'coworking Zagreb',
    'office space Zagreb',
    'hot desk Zagreb',
    'dedicated desk',
    'private office',
    'meeting rooms Zagreb',
    'business lounge',
    'flexible workspace',
    'WESPA spaces',
  ],
  openGraph: {
    title: 'Workspace Solutions | WESPA Zagreb',
    description: 'Find your perfect workspace at WESPA Zagreb. Hot desks, dedicated desks, private offices, meeting rooms and business lounges.',
    url: 'https://wespa.hr/spaces',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WESPA Workspace Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workspace Solutions | WESPA Zagreb',
    description: 'Find your perfect workspace at WESPA Zagreb. Hot desks, dedicated desks, private offices, meeting rooms and business lounges.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/spaces',
  },
}

export default function SpacesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
