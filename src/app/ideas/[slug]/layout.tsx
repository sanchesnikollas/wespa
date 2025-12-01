import type { Metadata } from 'next'

// Blog articles metadata
const articlesMetadata: Record<string, { title: string; description: string; image?: string }> = {
  'future-of-work-2024': {
    title: 'The Future of Work: 5 Trends Shaping 2024',
    description: 'From AI integration to the evolution of hybrid work, discover the key trends that will define how we work in the coming years.',
    image: '/images/spaces/coworking-1.jpg',
  },
  'productivity-tips-coworking': {
    title: '10 Productivity Tips for Coworking Spaces',
    description: 'Make the most of your coworking experience with these proven strategies for staying focused and productive in shared workspaces.',
    image: '/images/spaces/coworking-2.jpg',
  },
  'choosing-right-workspace': {
    title: 'How to Choose the Right Workspace for Your Business',
    description: 'A comprehensive guide to evaluating workspace options and finding the perfect fit for your team, from traditional offices to flexible coworking.',
    image: '/images/spaces/office-Copy-of-DSC_4745.jpg',
  },
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = articlesMetadata[slug]

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    }
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: `${article.title} | WESPA Ideas`,
      description: article.description,
      url: `https://wespa.hr/ideas/${slug}`,
      type: 'article',
      images: [
        {
          url: article.image || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | WESPA Ideas`,
      description: article.description,
      images: [article.image || '/og-image.jpg'],
    },
    alternates: {
      canonical: `/ideas/${slug}`,
    },
  }
}

export default function IdeaDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
