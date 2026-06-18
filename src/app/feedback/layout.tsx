import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Feedback Implementation Report',
  description:
    'A transparent record of every review comment and how it was implemented on the WESPA website.',
  // Private client-facing report — keep it out of search engines.
  robots: { index: false, follow: false },
  alternates: { canonical: '/feedback' },
}

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return children
}
