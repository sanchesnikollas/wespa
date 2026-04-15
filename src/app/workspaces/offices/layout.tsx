import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Private Offices for Rent in Zagreb',
  description:
    'Move-in-ready private offices for rent in Zagreb. Fully managed with utilities, cleaning, reception, and meeting room access included. Offices for teams of 2 to 30 at WESPA.',
  keywords: [
    'office for rent Zagreb',
    'private office Zagreb',
    'ured za najam Zagreb',
    'serviced office Zagreb',
    'managed office Zagreb',
    'WESPA offices',
  ],
  openGraph: {
    title: 'Private Offices for Rent in Zagreb | WESPA',
    description:
      'Fully managed, move-in-ready offices in central Zagreb. Utilities, cleaning, reception included.',
    url: 'https://wespa.hr/workspaces/offices',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WESPA Private Offices Zagreb' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Offices for Rent in Zagreb | WESPA',
    description:
      'Fully managed, move-in-ready offices in central Zagreb. Utilities, cleaning, reception included.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/workspaces/offices' },
}

export default function OfficesLayout({ children }: { children: React.ReactNode }) {
  return children
}
