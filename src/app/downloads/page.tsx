'use client'

// ============================================
// WESPA Website - Downloads Page
// Resource library with gated content
// ============================================

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PageHero } from '@/components/organisms/Sections'
import { Button } from '@/components/atoms/Button'
import { Icon, IconName } from '@/components/atoms/Icon'
import { Tag } from '@/components/atoms/Tag'
import { TabsNav } from '@/components/molecules/Navigation'

// ============================================
// Download Resources Data
// ============================================
interface DownloadResource {
  id: string
  slug: string
  title: string
  description: string
  category: 'guide' | 'whitepaper' | 'case-study' | 'checklist' | 'report'
  icon: IconName
  fileType: 'PDF' | 'XLSX' | 'ZIP'
  fileSize: string
  featured?: boolean
}

const downloadResources: DownloadResource[] = [
  {
    id: '1',
    slug: 'hybrid-work-guide-2024',
    title: 'The Ultimate Guide to Hybrid Work in 2024',
    description: 'Learn how to build a successful hybrid work strategy for your team. Includes templates and best practices.',
    category: 'guide',
    icon: 'book-open',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    featured: true,
  },
  {
    id: '2',
    slug: 'coworking-roi-calculator',
    title: 'Coworking ROI Calculator',
    description: 'Calculate the real cost savings of coworking vs traditional office space with our interactive spreadsheet.',
    category: 'checklist',
    icon: 'calculator',
    fileType: 'XLSX',
    fileSize: '156 KB',
  },
  {
    id: '3',
    slug: 'workspace-design-trends',
    title: 'Workspace Design Trends Report',
    description: 'Discover the latest trends in office design and how they impact productivity and employee satisfaction.',
    category: 'report',
    icon: 'trending-up',
    fileType: 'PDF',
    fileSize: '5.8 MB',
    featured: true,
  },
  {
    id: '4',
    slug: 'remote-team-management',
    title: 'Remote Team Management Playbook',
    description: 'Practical strategies for managing distributed teams effectively, from onboarding to performance reviews.',
    category: 'guide',
    icon: 'users',
    fileType: 'PDF',
    fileSize: '3.1 MB',
  },
  {
    id: '5',
    slug: 'office-relocation-checklist',
    title: 'Office Relocation Checklist',
    description: 'A comprehensive checklist to ensure a smooth office move with minimal disruption to your business.',
    category: 'checklist',
    icon: 'check-square',
    fileType: 'PDF',
    fileSize: '890 KB',
  },
  {
    id: '6',
    slug: 'flexible-workspace-whitepaper',
    title: 'The Future of Flexible Workspaces',
    description: 'In-depth analysis of how flexible workspaces are reshaping the commercial real estate landscape.',
    category: 'whitepaper',
    icon: 'file-text',
    fileType: 'PDF',
    fileSize: '4.2 MB',
  },
  {
    id: '7',
    slug: 'wespa-success-stories',
    title: 'WESPA Client Success Stories',
    description: 'Case studies from businesses that transformed their operations with WESPA workspaces.',
    category: 'case-study',
    icon: 'star',
    fileType: 'PDF',
    fileSize: '6.7 MB',
  },
  {
    id: '8',
    slug: 'meeting-room-booking-guide',
    title: 'Smart Meeting Room Booking Guide',
    description: 'Optimize your meeting room usage with data-driven booking strategies and best practices.',
    category: 'guide',
    icon: 'calendar',
    fileType: 'PDF',
    fileSize: '1.8 MB',
  },
]

const categoryTabs = [
  { id: 'all', label: 'All Resources' },
  { id: 'guide', label: 'Guides' },
  { id: 'whitepaper', label: 'Whitepapers' },
  { id: 'case-study', label: 'Case Studies' },
  { id: 'checklist', label: 'Checklists' },
  { id: 'report', label: 'Reports' },
]

const categoryLabels: Record<string, string> = {
  guide: 'Guide',
  whitepaper: 'Whitepaper',
  'case-study': 'Case Study',
  checklist: 'Checklist',
  report: 'Report',
}

// ============================================
// Download Card Component
// ============================================
function DownloadCard({ resource }: { resource: DownloadResource }) {
  return (
    <motion.div
      className="bg-white border border-stone-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center">
          <Icon name={resource.icon} size="lg" className="text-stone-600" />
        </div>
        {resource.featured && (
          <Tag variant="solid" color="primary" size="sm">Featured</Tag>
        )}
      </div>

      {/* Category */}
      <Tag size="sm" className="mb-3">{categoryLabels[resource.category]}</Tag>

      {/* Title */}
      <h3 className="text-lg font-semibold text-stone-900 mb-2 line-clamp-2">
        {resource.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-stone-600 mb-4 line-clamp-2">
        {resource.description}
      </p>

      {/* File info */}
      <div className="flex items-center gap-3 text-sm text-stone-500 mb-4">
        <span className="flex items-center gap-1">
          <Icon name="file" size="sm" />
          {resource.fileType}
        </span>
        <span>{resource.fileSize}</span>
      </div>

      {/* CTA */}
      <Button variant="secondary" fullWidth asChild>
        <Link href={`/downloads/${resource.slug}`}>
          <Icon name="download" size="sm" />
          Download Free
        </Link>
      </Button>
    </motion.div>
  )
}

// ============================================
// Downloads Page Component
// ============================================
export default function DownloadsPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredResources = activeCategory === 'all'
    ? downloadResources
    : downloadResources.filter(r => r.category === activeCategory)

  const featuredResources = downloadResources.filter(r => r.featured)

  return (
    <>
      {/* Hero */}
      <PageHero
        title="Free Resources & Downloads"
        subtitle="Guides, templates, and insights to help you build a better workplace. All resources are free — just enter your email to download."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Downloads' },
        ]}
      />

      {/* Featured Resources */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <h2 className="text-2xl font-bold text-stone-900 mb-8">Featured Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredResources.map((resource) => (
              <motion.div
                key={resource.id}
                className="bg-white border border-stone-200 rounded-2xl p-8 flex flex-col md:flex-row gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-wespa-red/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Icon name={resource.icon} size="xl" className="text-wespa-red" />
                </div>
                <div className="flex-1">
                  <Tag size="sm" className="mb-2">{categoryLabels[resource.category]}</Tag>
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">{resource.title}</h3>
                  <p className="text-stone-600 mb-4">{resource.description}</p>
                  <div className="flex items-center gap-4">
                    <Button variant="wespa" asChild>
                      <Link href={`/downloads/${resource.slug}`}>
                        <Icon name="download" size="sm" />
                        Download Free
                      </Link>
                    </Button>
                    <span className="text-sm text-stone-500">{resource.fileType} • {resource.fileSize}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className="section-spacing">
        <div className="container-wespa">
          {/* Category Filter */}
          <div className="mb-8 overflow-x-auto -mx-6 px-6">
            <TabsNav
              tabs={categoryTabs}
              activeTab={activeCategory}
              onChange={setActiveCategory}
              className="min-w-max"
            />
          </div>

          {/* Results count */}
          <p className="text-stone-600 mb-6">
            {filteredResources.length} resources available
          </p>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map((resource) => (
              <DownloadCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-stone-900 text-white py-16">
        <div className="container-wespa text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Get new resources in your inbox
          </h2>
          <p className="text-stone-300 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and be the first to know when we publish new guides and reports.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-stone-800 border border-stone-700 text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-wespa-red"
            />
            <Button variant="wespa">Subscribe</Button>
          </div>
        </div>
      </section>
    </>
  )
}
