import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conference Rooms in Zagreb',
  description:
    'Host conferences, workshops, and corporate events in Zagreb with capacity for up to 150 people. WESPA conference rooms include AV equipment, catering, and dedicated event support.',
  keywords: [
    'conference room Zagreb',
    'event venue Zagreb',
    'workshop space Zagreb',
    'corporate event Zagreb',
    'seminar room Zagreb',
    'WESPA conference',
  ],
  openGraph: {
    title: 'Conference Rooms in Zagreb | WESPA',
    description:
      'Premium conference rooms for up to 150 people with AV, catering, and dedicated event support.',
    url: 'https://wespa.gigwand.com/workspaces/conference-rooms',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WESPA Conference Rooms Zagreb' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conference Rooms in Zagreb | WESPA',
    description:
      'Premium conference rooms for up to 150 people with AV, catering, and dedicated event support.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/workspaces/conference-rooms' },
}

export default function ConferenceRoomsLayout({ children }: { children: React.ReactNode }) {
  return children
}
