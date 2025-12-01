import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'House Rules',
  description: 'WESPA Zagreb house rules. Guidelines for using our coworking spaces, meeting rooms, and hospitality venues to ensure a great experience for all members.',
  openGraph: {
    title: 'House Rules | WESPA Zagreb',
    description: 'WESPA Zagreb house rules and community guidelines.',
    url: 'https://wespa.hr/house-rules',
  },
  alternates: {
    canonical: '/house-rules',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function HouseRulesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
