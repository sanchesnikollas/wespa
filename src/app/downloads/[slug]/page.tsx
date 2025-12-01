'use client'

// ============================================
// WESPA Website - Download Article Page
// Individual resource with gated download form
// ============================================

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/atoms/Button'
import { Input, Checkbox } from '@/components/atoms/Input'
import { Icon, IconName } from '@/components/atoms/Icon'
import { Tag } from '@/components/atoms/Tag'

// ============================================
// Download Form Schema
// ============================================
const downloadFormSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  companyName: z.string().optional(),
  marketingConsent: z.boolean(),
})

type DownloadFormData = z.infer<typeof downloadFormSchema>

// ============================================
// Resource Data
// ============================================
interface DownloadResource {
  slug: string
  title: string
  description: string
  longDescription: string
  category: string
  icon: IconName
  fileType: string
  fileSize: string
  downloadUrl: string
  tableOfContents: string[]
  benefits: string[]
}

const resourcesData: Record<string, DownloadResource> = {
  'hybrid-work-guide-2024': {
    slug: 'hybrid-work-guide-2024',
    title: 'The Ultimate Guide to Hybrid Work in 2024',
    description: 'Learn how to build a successful hybrid work strategy for your team.',
    longDescription: 'This comprehensive guide covers everything you need to know about implementing a successful hybrid work model. From policy creation to technology infrastructure, we cover all aspects of making hybrid work... work.',
    category: 'Guide',
    icon: 'book-open',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    downloadUrl: '/downloads/hybrid-work-guide-2024.pdf',
    tableOfContents: [
      'Understanding Hybrid Work Models',
      'Creating Your Hybrid Work Policy',
      'Technology for Hybrid Teams',
      'Managing Remote and In-Office Employees',
      'Measuring Productivity and Success',
      'Common Pitfalls and How to Avoid Them',
    ],
    benefits: [
      'Reduce office costs by up to 30%',
      'Improve employee satisfaction and retention',
      'Attract top talent regardless of location',
      'Build a more resilient organization',
    ],
  },
  'coworking-roi-calculator': {
    slug: 'coworking-roi-calculator',
    title: 'Coworking ROI Calculator',
    description: 'Calculate the real cost savings of coworking vs traditional office space.',
    longDescription: 'Our interactive ROI calculator helps you understand the true cost of your office space decisions. Compare traditional leases with flexible coworking options and see the potential savings.',
    category: 'Tool',
    icon: 'calculator',
    fileType: 'XLSX',
    fileSize: '156 KB',
    downloadUrl: '/downloads/coworking-roi-calculator.xlsx',
    tableOfContents: [
      'Traditional Office Cost Calculator',
      'Coworking Cost Comparison',
      'Hidden Costs Analysis',
      '5-Year Projection Model',
      'Break-Even Analysis',
    ],
    benefits: [
      'Make data-driven real estate decisions',
      'Understand all hidden costs',
      'Present clear ROI to stakeholders',
      'Plan for future growth scenarios',
    ],
  },
  'workspace-design-trends': {
    slug: 'workspace-design-trends',
    title: 'Workspace Design Trends Report',
    description: 'Discover the latest trends in office design and their impact on productivity.',
    longDescription: 'Based on research from over 500 companies, this report reveals the workspace design trends that are driving employee satisfaction and productivity in 2024.',
    category: 'Report',
    icon: 'trending-up',
    fileType: 'PDF',
    fileSize: '5.8 MB',
    downloadUrl: '/downloads/workspace-design-trends.pdf',
    tableOfContents: [
      'The Post-Pandemic Office',
      'Biophilic Design Principles',
      'Activity-Based Working Spaces',
      'Technology Integration',
      'Sustainability in Office Design',
      'Case Studies from Leading Companies',
    ],
    benefits: [
      'Learn from industry leaders',
      'Data-backed design recommendations',
      'Increase employee satisfaction',
      'Future-proof your workspace',
    ],
  },
}

// Default resource for unknown slugs
const defaultResource: DownloadResource = {
  slug: 'resource',
  title: 'WESPA Resource',
  description: 'Download this valuable resource from WESPA.',
  longDescription: 'This resource contains valuable information to help your business grow.',
  category: 'Resource',
  icon: 'file-text',
  fileType: 'PDF',
  fileSize: '1 MB',
  downloadUrl: '#',
  tableOfContents: ['Introduction', 'Main Content', 'Conclusion'],
  benefits: ['Valuable insights', 'Actionable advice', 'Expert knowledge'],
}

// ============================================
// Download Article Page
// ============================================
export default function DownloadArticlePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const resource = resourcesData[slug] || defaultResource
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DownloadFormData>({
    resolver: zodResolver(downloadFormSchema),
    defaultValues: {
      marketingConsent: false,
    },
  })

  const onSubmit = async (data: DownloadFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Redirect to confirmation with download info
      router.push(`/downloads/confirmation?title=${encodeURIComponent(resource.title)}&url=${encodeURIComponent(resource.downloadUrl)}`)
    } catch {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-stone-100 py-4">
        <div className="container-wespa">
          <nav className="flex items-center gap-2 text-sm text-stone-500">
            <Link href="/" className="hover:text-stone-900">Home</Link>
            <Icon name="chevron-right" size="xs" />
            <Link href="/downloads" className="hover:text-stone-900">Downloads</Link>
            <Icon name="chevron-right" size="xs" />
            <span className="text-stone-900">{resource.title}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left: Resource Info */}
            <div className="lg:col-span-3 space-y-8">
              {/* Header */}
              <div>
                <Tag className="mb-4">{resource.category}</Tag>
                <h1 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-4">
                  {resource.title}
                </h1>
                <p className="text-lg text-stone-600">
                  {resource.longDescription}
                </p>
              </div>

              {/* File Info */}
              <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl">
                <div className="w-12 h-12 bg-wespa-red/10 rounded-xl flex items-center justify-center">
                  <Icon name={resource.icon} size="lg" className="text-wespa-red" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">{resource.fileType} Download</p>
                  <p className="text-sm text-stone-500">{resource.fileSize}</p>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-xl font-semibold text-stone-900 mb-4">What you'll learn</h2>
                <ul className="space-y-3">
                  {resource.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Icon name="check" size="sm" className="text-green-600 mt-1 shrink-0" />
                      <span className="text-stone-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Table of Contents */}
              <div>
                <h2 className="text-xl font-semibold text-stone-900 mb-4">What's inside</h2>
                <ol className="space-y-2">
                  {resource.tableOfContents.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-stone-600">
                      <span className="w-6 h-6 bg-stone-100 rounded-full flex items-center justify-center text-sm font-medium text-stone-500">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right: Download Form */}
            <div className="lg:col-span-2">
              <motion.div
                className="sticky top-24 bg-white border border-stone-200 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-semibold text-stone-900 mb-2">
                  Download Free
                </h2>
                <p className="text-sm text-stone-500 mb-6">
                  Enter your details to get instant access
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="First name"
                      placeholder="John"
                      required
                      error={errors.firstName?.message}
                      {...register('firstName')}
                    />
                    <Input
                      label="Last name"
                      placeholder="Doe"
                      required
                      error={errors.lastName?.message}
                      {...register('lastName')}
                    />
                  </div>

                  <Input
                    label="Work email"
                    type="email"
                    placeholder="john@company.com"
                    required
                    error={errors.email?.message}
                    {...register('email')}
                  />

                  <Input
                    label="Company name"
                    placeholder="Your company (optional)"
                    error={errors.companyName?.message}
                    {...register('companyName')}
                  />

                  <Checkbox
                    label="I agree to receive marketing communications from WESPA"
                    {...register('marketingConsent')}
                  />

                  <Button
                    type="submit"
                    variant="wespa"
                    fullWidth
                    size="lg"
                    isLoading={isSubmitting}
                  >
                    <Icon name="download" size="sm" />
                    Get Free Download
                  </Button>

                  <p className="text-xs text-stone-400 text-center">
                    By downloading, you agree to our{' '}
                    <Link href="/privacy" className="underline hover:text-stone-600">Privacy Policy</Link>
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <h2 className="text-2xl font-bold text-stone-900 mb-8">Related Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(resourcesData)
              .filter(r => r.slug !== slug)
              .slice(0, 3)
              .map((r) => (
                <Link
                  key={r.slug}
                  href={`/downloads/${r.slug}`}
                  className="bg-white border border-stone-200 rounded-xl p-5 hover:shadow-lg transition-shadow"
                >
                  <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={r.icon} size="md" className="text-stone-600" />
                  </div>
                  <Tag size="sm" className="mb-2">{r.category}</Tag>
                  <h3 className="font-semibold text-stone-900 mb-2">{r.title}</h3>
                  <p className="text-sm text-stone-500">{r.fileType} • {r.fileSize}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
