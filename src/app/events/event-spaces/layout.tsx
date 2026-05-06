import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Event Spaces',
  alternates: {
    canonical: '/events/event-spaces',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function EventSpacesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
