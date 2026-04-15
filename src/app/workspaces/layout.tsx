import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Workspaces in Zagreb',
  description:
    'Explore WESPA workspaces in Zagreb: coworking desks, private offices, meeting rooms, conference halls, and virtual office services. Premium infrastructure, flexible plans, two central locations.',
  keywords: [
    'coworking Zagreb',
    'office for rent Zagreb',
    'workspace Zagreb',
    'shared office Zagreb',
    'business space Zagreb',
    'WESPA workspaces',
  ],
  openGraph: {
    title: 'Workspaces in Zagreb | WESPA',
    description:
      'Coworking, private offices, meeting rooms, and virtual office services in two premium Zagreb locations.',
    url: 'https://wespa.hr/workspaces',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WESPA Workspaces Zagreb' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workspaces in Zagreb | WESPA',
    description:
      'Coworking, private offices, meeting rooms, and virtual office services in two premium Zagreb locations.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/workspaces' },
}

export default function WorkspacesLayout({ children }: { children: React.ReactNode }) {
  return children
}
