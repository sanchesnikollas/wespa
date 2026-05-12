import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Office Zones',
  description:
    'Dedicated office suites up to 150m² with fully customizable layout in Zagreb. Private zone with full access to WESPA community amenities. One contract, one invoice, no extra fees.',
  keywords: [
    'custom office Zagreb',
    'private office zone Zagreb',
    'dedicated office space Zagreb',
    'office suite Zagreb',
    'WESPA custom office',
  ],
  openGraph: {
    title: 'Custom Office Zones | WESPA',
    description:
      'Dedicated office suites up to 150m² with fully customizable layout in central Zagreb.',
    url: 'https://wespa.gigwand.com/workspaces/custom-office-zones',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WESPA Custom Office Zones Zagreb' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Office Zones | WESPA',
    description:
      'Dedicated office suites up to 150m² with fully customizable layout in central Zagreb.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/workspaces/custom-office-zones' },
}

export default function CustomOfficeZonesLayout({ children }: { children: React.ReactNode }) {
  return children
}
