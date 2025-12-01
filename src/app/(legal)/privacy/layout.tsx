import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'WESPA Zagreb privacy policy. Learn how we collect, use, and protect your personal data in compliance with GDPR and Croatian data protection laws.',
  openGraph: {
    title: 'Privacy Policy | WESPA Zagreb',
    description: 'WESPA Zagreb privacy policy and data protection information.',
    url: 'https://wespa.hr/privacy',
  },
  alternates: {
    canonical: '/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
