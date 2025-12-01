import type { Metadata } from 'next'

// Downloads metadata
const downloadsMetadata: Record<string, { title: string; description: string }> = {
  'hybrid-work-guide-2024': {
    title: 'The Ultimate Guide to Hybrid Work in 2024',
    description: 'Download our comprehensive guide to implementing a successful hybrid work model. Learn about policy creation, technology infrastructure, and best practices.',
  },
  'coworking-checklist': {
    title: 'Coworking Space Checklist',
    description: 'Free checklist to help you evaluate and choose the right coworking space for your business needs.',
  },
  'workspace-roi-calculator': {
    title: 'Workspace ROI Calculator',
    description: 'Calculate the return on investment of flexible workspace vs traditional office lease with our free tool.',
  },
  'brand-guidelines': {
    title: 'WESPA Brand Guidelines',
    description: 'Official WESPA brand guidelines including logos, colors, typography, and usage rules for partners and media.',
  },
  'media-kit': {
    title: 'WESPA Media Kit',
    description: 'Press kit with high-resolution images, company information, and media assets for journalists and partners.',
  },
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const download = downloadsMetadata[slug]

  if (!download) {
    return {
      title: 'Download Not Found',
      description: 'The requested resource could not be found.',
    }
  }

  return {
    title: download.title,
    description: download.description,
    openGraph: {
      title: `${download.title} | WESPA Downloads`,
      description: download.description,
      url: `https://wespa.hr/downloads/${slug}`,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: download.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${download.title} | WESPA`,
      description: download.description,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `/downloads/${slug}`,
    },
  }
}

export default function DownloadDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
