import type { Metadata } from 'next'

// Client stories metadata
const storiesMetadata: Record<string, { title: string; description: string; company: string }> = {
  'tech-startup-growth': {
    title: 'How TechFlow Scaled from 5 to 25 Employees',
    description: 'Discover how TechFlow, a growing tech startup, used WESPA flexible workspace to scale their team by 400% while saving 35% on costs.',
    company: 'TechFlow',
  },
  'consulting-firm-efficiency': {
    title: 'Horvat Consulting Reduces Overhead by 40%',
    description: 'Learn how Horvat Consulting optimized costs with a hybrid workspace setup combining dedicated desks and on-demand meeting rooms at WESPA.',
    company: 'Horvat Consulting',
  },
  'creative-agency-culture': {
    title: 'Creative Agency Finds Its Perfect Space',
    description: 'See how a creative agency built their unique culture and collaborative environment at WESPA Zagreb coworking space.',
    company: 'Creative Agency',
  },
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const story = storiesMetadata[slug]

  if (!story) {
    return {
      title: 'Client Story Not Found',
      description: 'The requested client story could not be found.',
    }
  }

  return {
    title: story.title,
    description: story.description,
    openGraph: {
      title: `${story.title} | WESPA Client Stories`,
      description: story.description,
      url: `https://wespa.hr/client-stories/${slug}`,
      type: 'article',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${story.company} Success Story`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${story.title} | WESPA`,
      description: story.description,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `/client-stories/${slug}`,
    },
  }
}

export default function ClientStoryDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
