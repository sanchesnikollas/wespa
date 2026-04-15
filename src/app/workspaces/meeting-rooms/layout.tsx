import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meeting Rooms in Zagreb',
  description:
    'Book meeting rooms in Zagreb by the hour or day. WESPA offers private, soundproof rooms with video conferencing, whiteboards, catering, and on-demand support for teams of 2 to 20.',
  keywords: [
    'meeting rooms Zagreb',
    'sobe za sastanke Zagreb',
    'boardroom Zagreb',
    'private meeting space Zagreb',
    'video conference room Zagreb',
    'WESPA meeting rooms',
  ],
  openGraph: {
    title: 'Meeting Rooms in Zagreb | WESPA',
    description:
      'Book private meeting rooms in central Zagreb by the hour. Video conferencing, whiteboards, catering.',
    url: 'https://wespa.hr/workspaces/meeting-rooms',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WESPA Meeting Rooms Zagreb' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meeting Rooms in Zagreb | WESPA',
    description:
      'Book private meeting rooms in central Zagreb by the hour. Video conferencing, whiteboards, catering.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/workspaces/meeting-rooms' },
}

export default function MeetingRoomsLayout({ children }: { children: React.ReactNode }) {
  return children
}
