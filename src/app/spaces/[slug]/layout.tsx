import type { Metadata } from 'next'

// Space data for metadata generation
const spacesMetadata: Record<string, { title: string; description: string }> = {
  'flydesk-access': {
    title: 'FlyDesk Access - Flexible Hot Desk',
    description: 'Flexible hot desk access at WESPA Zagreb. Work from any available desk with full amenities, high-speed WiFi, and lounge access. Starting from €150/month.',
  },
  'dedicated-desk': {
    title: 'Dedicated Desk - Personal Workspace',
    description: 'Your dedicated desk at WESPA Zagreb. Personal workspace with lockable storage, 24/7 access, and all premium amenities. Starting from €300/month.',
  },
  'private-office-small': {
    title: 'Private Office (2-4 people)',
    description: 'Private office for small teams at WESPA Zagreb. Enclosed workspace with custom branding, 24/7 access, and meeting room credits. Starting from €800/month.',
  },
  'private-office-medium': {
    title: 'Private Office (5-10 people)',
    description: 'Private office for growing teams at WESPA Zagreb. Spacious enclosed workspace with reception services and enterprise infrastructure. Starting from €1500/month.',
  },
  'meeting-room-small': {
    title: 'Meeting Room S (2-6 people)',
    description: 'Small meeting room at WESPA Zagreb. Perfect for quick syncs and focused discussions with display screen and video conferencing. From €25/hour.',
  },
  'meeting-room-large': {
    title: 'Meeting Room L (6-14 people)',
    description: 'Large meeting room at WESPA Zagreb. Ideal for workshops and presentations with full AV equipment and catering options. From €45/hour.',
  },
  'urban-hub-day-pass': {
    title: 'Urban Hub Day Pass',
    description: 'Full-day access to WESPA Zagreb urban hub. Flexible workspace with lounge access, refreshments, and networking opportunities. €35/day.',
  },
  'business-lounge': {
    title: 'Business Lounge Membership',
    description: 'Premium business lounge membership at WESPA Zagreb. Exclusive access to cigar room, cocktail bar, and concierge service. From €500/month.',
  },
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const space = spacesMetadata[slug]

  if (!space) {
    return {
      title: 'Space Not Found',
      description: 'The requested workspace could not be found.',
    }
  }

  return {
    title: space.title,
    description: space.description,
    openGraph: {
      title: `${space.title} | WESPA Zagreb`,
      description: space.description,
      url: `https://wespa.hr/spaces/${slug}`,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: space.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${space.title} | WESPA Zagreb`,
      description: space.description,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `/spaces/${slug}`,
    },
  }
}

export default function SpaceDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
