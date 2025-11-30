'use client'

// ============================================
// WESPA Website - Ideas by WESPA (Blog) Page
// Frame: 07_Blog_Archive_Desktop
// ============================================

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHero, EmptyState } from '@/components/organisms/Sections'
import { CardArticle, CardBase } from '@/components/molecules/Card'
import { TabsNav, Pagination } from '@/components/molecules/Navigation'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { Tag } from '@/components/atoms/Tag'
import { Input } from '@/components/atoms/Input'

// ============================================
// Sample Articles Data
// ============================================
const sampleArticles = [
  {
    id: '1',
    slug: 'importance-flexible-office-spaces-2024',
    title: 'The Importance of Flexible Office Spaces in 2024',
    excerpt: 'Research shows that flexible workspaces increase employee satisfaction and productivity. Our comprehensive study reveals key insights for modern businesses.',
    category: 'Research',
    publishedAt: '2024-01-15',
    readingTime: 8,
    featured: true,
  },
  {
    id: '2',
    slug: 'hybrid-work-trends',
    title: 'Hybrid Work Trends: What Companies Need to Know',
    excerpt: 'How leading companies are adapting their workspace strategies for the hybrid era. Key trends and actionable insights.',
    category: 'Trends',
    publishedAt: '2024-01-10',
    readingTime: 5,
    featured: false,
  },
  {
    id: '3',
    slug: 'startup-office-guide',
    title: "A Startup's Guide to Choosing Office Space",
    excerpt: 'Key considerations for early-stage companies looking for their first professional workspace.',
    category: 'Flexible Products',
    publishedAt: '2024-01-05',
    readingTime: 6,
    featured: false,
  },
  {
    id: '4',
    slug: 'remote-work-productivity',
    title: 'Remote Work vs. Office: The Productivity Debate',
    excerpt: 'Analyzing productivity data from thousands of workers to understand the real impact of work location.',
    category: 'Research',
    publishedAt: '2024-01-02',
    readingTime: 7,
    featured: false,
  },
  {
    id: '5',
    slug: 'tech-company-case-study',
    title: 'How TechCo Grew from 5 to 50 with WESPA',
    excerpt: 'A deep dive into how one startup scaled their workspace needs seamlessly.',
    category: 'Case Study',
    publishedAt: '2023-12-28',
    readingTime: 4,
    featured: false,
  },
  {
    id: '6',
    slug: 'workspace-design-trends',
    title: 'Workspace Design Trends for the Future',
    excerpt: 'From biophilic design to activity-based working, explore the trends shaping modern offices.',
    category: 'Trends',
    publishedAt: '2023-12-20',
    readingTime: 5,
    featured: false,
  },
]

// ============================================
// Categories
// ============================================
const categories = [
  { id: 'all', label: 'All' },
  { id: 'research', label: 'Research' },
  { id: 'trends', label: 'Trends' },
  { id: 'case-study', label: 'Case Studies' },
  { id: 'flexible-products', label: 'Flexible Products' },
]

// ============================================
// Ideas Page Component
// ============================================
export default function IdeasPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter articles
  const filteredArticles = sampleArticles.filter((article) => {
    const matchesCategory =
      activeCategory === 'all' ||
      article.category.toLowerCase().replace(' ', '-') === activeCategory
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Get featured article
  const featuredArticle = sampleArticles.find((a) => a.featured)
  const regularArticles = filteredArticles.filter((a) => !a.featured)

  return (
    <>
      {/* Hero */}
      <PageHero
        title="Ideas by WESPA"
        subtitle="Insights, research, and trends shaping the future of work. Stay informed with our latest articles and case studies."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Ideas' },
        ]}
      />

      {/* Featured Article */}
      {featuredArticle && activeCategory === 'all' && searchQuery === '' && (
        <section className="container-wespa -mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CardBase className="overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="aspect-video md:aspect-auto bg-wire-200 flex items-center justify-center min-h-[300px]">
                  <div className="text-center text-wire-400">
                    <Icon name="briefcase" size="xl" className="mx-auto mb-2" />
                    <span className="text-body-sm">Featured Image</span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Tag size="sm" variant="solid" color="primary">Featured</Tag>
                    <Tag size="sm">{featuredArticle.category}</Tag>
                  </div>
                  <h2 className="text-heading-xl lg:text-display-sm font-bold text-wire-900 mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-body-md text-wire-600 mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm text-wire-500">
                      {featuredArticle.readingTime} min read
                    </span>
                    <Button
                      variant="secondary"
                      rightIcon={<Icon name="arrow-right" size="sm" />}
                    >
                      Read article
                    </Button>
                  </div>
                </div>
              </div>
            </CardBase>
          </motion.div>
        </section>
      )}

      {/* Filters */}
      <section className="sticky top-16 lg:top-20 z-20 bg-wire-white border-b border-wire-200 py-4 mt-8">
        <div className="container-wespa">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Category tabs */}
            <div className="overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0">
              <TabsNav
                tabs={categories}
                activeTab={activeCategory}
                onChange={setActiveCategory}
                className="min-w-max"
              />
            </div>

            {/* Search */}
            <div className="lg:ml-auto lg:w-64">
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftAddon={<Icon name="search" size="sm" />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-spacing">
        <div className="container-wespa">
          {filteredArticles.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CardArticle article={article} />
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={3}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          ) : (
            <EmptyState
              icon="search"
              title="No articles found"
              description="Try adjusting your search or filter to find what you're looking for."
              action={{
                label: 'Clear filters',
                href: '/ideas',
              }}
            />
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-wire-100 py-12">
        <div className="container-wespa">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="text-heading-lg font-semibold text-wire-900 mb-2">
                Stay Updated
              </h2>
              <p className="text-body-md text-wire-600">
                Get the latest insights delivered to your inbox.
              </p>
            </div>
            <Button size="lg">
              Subscribe to Newsletter
            </Button>
          </div>
        </div>
      </section>

      {/* Cross-linking Note */}
      <div className="container-wespa py-4">
        <p className="text-center text-caption text-wire-400 bg-wire-50 py-2 px-4 rounded-full inline-block mx-auto">
          Note: Each article should link to related spaces/event CTAs for conversion
        </p>
      </div>
    </>
  )
}
