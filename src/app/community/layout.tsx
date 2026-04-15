import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community',
  description:
    'Join the WESPA community: 300+ founders, freelancers, and teams sharing workspace, events, and ideas in Zagreb. Weekly networking, talks, and member perks.',
  keywords: [
    'WESPA community',
    'coworking community Zagreb',
    'founder community Zagreb',
    'networking Zagreb',
    'business community Zagreb',
  ],
  openGraph: {
    title: 'Community | WESPA',
    description:
      'Join 300+ founders, freelancers, and teams in the WESPA Zagreb community.',
    url: 'https://wespa.hr/community',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WESPA Community' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Community | WESPA',
    description:
      'Join 300+ founders, freelancers, and teams in the WESPA Zagreb community.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/community' },
}

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return children
}
