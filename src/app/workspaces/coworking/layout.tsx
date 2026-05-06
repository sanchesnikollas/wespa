import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coworking in Zagreb',
  description:
    'Coworking in Zagreb with fiber internet, ergonomic desks, meeting room access, and a premium lounge. Day passes from €30 and dedicated desks from €219/month at WESPA.',
  keywords: [
    'coworking Zagreb',
    'coworking u zagrebu',
    'flex desk Zagreb',
    'shared desk Zagreb',
    'daily office Zagreb',
    'WESPA coworking',
  ],
  openGraph: {
    title: 'Coworking in Zagreb | WESPA',
    description:
      'Premium coworking with day passes, dedicated desks, and private office zones in central Zagreb.',
    url: 'https://wespa.gigwand.com/workspaces/coworking',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WESPA Coworking Zagreb' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coworking in Zagreb | WESPA',
    description:
      'Premium coworking with day passes, dedicated desks, and private office zones in central Zagreb.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/workspaces/coworking' },
}

export default function CoworkingLayout({ children }: { children: React.ReactNode }) {
  return children
}
