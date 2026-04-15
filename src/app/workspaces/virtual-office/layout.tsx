import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Virtual Office Zagreb',
  description:
    'Register your company at a prestigious Zagreb address. WESPA Virtual Office provides mail handling, business registration, call answering, and on-demand meeting rooms — without the cost of a physical office.',
  keywords: [
    'virtual office Zagreb',
    'virtual company Zagreb',
    'virtual address Croatia',
    'virtualna adresa Zagreb',
    'virtualna tvrtka',
    'business address Zagreb',
    'company registration Zagreb',
    'mail handling Zagreb',
  ],
  openGraph: {
    title: 'Virtual Office Zagreb | WESPA',
    description:
      'Register your company at a prestigious Zagreb address with mail handling, call answering, and on-demand meeting rooms.',
    url: 'https://wespa.hr/workspaces/virtual-office',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WESPA Virtual Office Zagreb',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Office Zagreb | WESPA',
    description:
      'Register your company at a prestigious Zagreb address with mail handling, call answering, and on-demand meeting rooms.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/workspaces/virtual-office',
  },
}

export default function VirtualOfficeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
