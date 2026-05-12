import type { Metadata } from 'next'

const roomNames: Record<string, string> = {
  indigo: 'INDIGO',
  incubator: 'INCUBATOR',
  bond: 'BOND',
  'brain-gym': 'BRAIN GYM',
  enter: 'ENTER',
  shift: 'SHIFT',
  escape: 'ESCAPE',
  connect: 'CONNECT',
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const name = roomNames[params.slug] ?? params.slug.replace(/-/g, ' ').toUpperCase()
  const title = `${name} Conference Room`
  return {
    title,
    description: `Book the ${name} conference room at WESPA Zagreb. Premium AV equipment, modular seating, catering, and dedicated support for events of all sizes.`,
    openGraph: {
      title: `${title} | WESPA`,
      description: `Book the ${name} conference room at WESPA Zagreb. Premium AV equipment and dedicated support.`,
      url: `https://wespa.gigwand.com/workspaces/conference-rooms/${params.slug}`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `WESPA ${name} Conference Room` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | WESPA`,
      description: `Book the ${name} conference room at WESPA Zagreb. Premium AV equipment and dedicated support.`,
      images: ['/og-image.jpg'],
    },
    alternates: { canonical: `/workspaces/conference-rooms/${params.slug}` },
  }
}

export default function ConferenceRoomSlugLayout({ children }: { children: React.ReactNode }) {
  return children
}
