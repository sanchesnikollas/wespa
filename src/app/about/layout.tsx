import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Discover WESPA - Work. Eat. Socialize. Play. Anytime. Learn about our vision for the future of work in Zagreb and our ecosystem of workspaces, hospitality, and community.',
  keywords: [
    'about WESPA',
    'WESPA Zagreb',
    'coworking company',
    'workspace provider',
    'future of work',
    'hybrid workspace',
  ],
  openGraph: {
    title: 'About Us | WESPA Zagreb',
    description: 'Discover WESPA - Work. Eat. Socialize. Play. Anytime. Learn about our vision for the future of work.',
    url: 'https://wespa.hr/about',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About WESPA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | WESPA Zagreb',
    description: 'Discover WESPA - Work. Eat. Socialize. Play. Anytime.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
