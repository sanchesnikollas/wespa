import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'WESPA Zagreb terms and conditions. Read our membership agreement, usage policies, and service terms for coworking spaces and hospitality venues.',
  openGraph: {
    title: 'Terms & Conditions | WESPA Zagreb',
    description: 'WESPA Zagreb terms and conditions for membership and services.',
    url: 'https://wespa.gigwand.com/terms',
  },
  alternates: {
    canonical: '/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
