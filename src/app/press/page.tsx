'use client'

// ============================================
// WESPA Website - Press Releases Archive
// Media and press information
// ============================================

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PageHero } from '@/components/organisms/Sections'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { Tag } from '@/components/atoms/Tag'

// ============================================
// Press Release Data
// ============================================
interface PressRelease {
  id: string
  title: string
  excerpt: string
  date: string
  category: 'announcement' | 'expansion' | 'partnership' | 'award' | 'event'
  featured?: boolean
  pdfUrl?: string
}

const pressReleases: PressRelease[] = [
  {
    id: '1',
    title: 'WESPA Announces Expansion to Third Zagreb Location',
    excerpt: 'WESPA is pleased to announce the opening of our third location in Zagreb, expanding our footprint to over 5,000 square meters of premium flexible workspace.',
    date: '2024-02-15',
    category: 'expansion',
    featured: true,
    pdfUrl: '#',
  },
  {
    id: '2',
    title: 'WESPA Named Best Coworking Space in Croatia 2024',
    excerpt: 'WESPA has been recognized as the best coworking space in Croatia by Business Insider Hrvatska for the third consecutive year.',
    date: '2024-01-28',
    category: 'award',
    featured: true,
    pdfUrl: '#',
  },
  {
    id: '3',
    title: 'WESPA Partners with Microsoft for Smart Workspace Initiative',
    excerpt: 'A new partnership with Microsoft will bring cutting-edge technology solutions to all WESPA locations, enhancing the member experience.',
    date: '2024-01-15',
    category: 'partnership',
    pdfUrl: '#',
  },
  {
    id: '4',
    title: 'WESPA Stage Hosts Zagreb Tech Week 2024',
    excerpt: 'WESPA Stage will be the official venue for Zagreb Tech Week 2024, hosting over 50 events and 3,000 attendees.',
    date: '2024-01-05',
    category: 'event',
    pdfUrl: '#',
  },
  {
    id: '5',
    title: 'WESPA Launches Sustainability Initiative',
    excerpt: 'WESPA commits to carbon neutrality by 2025 with the launch of our comprehensive sustainability program.',
    date: '2023-12-10',
    category: 'announcement',
    pdfUrl: '#',
  },
  {
    id: '6',
    title: 'WESPA Business Lounge Opens at Green Gold',
    excerpt: 'The new WESPA Business Lounge offers premium amenities for executives and professionals seeking a sophisticated work environment.',
    date: '2023-11-20',
    category: 'expansion',
    pdfUrl: '#',
  },
  {
    id: '7',
    title: 'WESPA Reaches 1,000 Active Members Milestone',
    excerpt: 'WESPA celebrates reaching 1,000 active members across all locations, marking significant growth in the Croatian flexible workspace market.',
    date: '2023-10-15',
    category: 'announcement',
    pdfUrl: '#',
  },
]

const categoryLabels: Record<string, string> = {
  announcement: 'Announcement',
  expansion: 'Expansion',
  partnership: 'Partnership',
  award: 'Award',
  event: 'Event',
}

// ============================================
// Press Release Card
// ============================================
function PressReleaseCard({ release }: { release: PressRelease }) {
  const formattedDate = new Date(release.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.article
      className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-4">
        <Tag size="sm">{categoryLabels[release.category]}</Tag>
        <time className="text-sm text-stone-500">{formattedDate}</time>
      </div>

      <h3 className="text-lg font-semibold text-stone-900 mb-3 line-clamp-2">
        {release.title}
      </h3>

      <p className="text-stone-600 text-sm mb-4 line-clamp-3">
        {release.excerpt}
      </p>

      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm" asChild>
          <a href={release.pdfUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="file-text" size="sm" />
            Read Release
          </a>
        </Button>
        {release.pdfUrl && (
          <a
            href={release.pdfUrl}
            download
            className="text-sm text-stone-500 hover:text-stone-700 flex items-center gap-1"
          >
            <Icon name="download" size="sm" />
            PDF
          </a>
        )}
      </div>
    </motion.article>
  )
}

// ============================================
// Press Page
// ============================================
export default function PressPage() {
  const featuredReleases = pressReleases.filter(r => r.featured)
  const allReleases = pressReleases.filter(r => !r.featured)

  return (
    <>
      {/* Hero */}
      <PageHero
        title="Press & Media"
        subtitle="The latest news, announcements, and press releases from WESPA. For media inquiries, please contact our press team."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Press' },
        ]}
      />

      {/* Media Contact */}
      <section className="bg-stone-50 py-8">
        <div className="container-wespa">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-stone-900">Media Contact</h2>
              <p className="text-stone-600">For press inquiries and interview requests</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="mailto:press@wespa.hr"
                className="flex items-center gap-2 text-stone-700 hover:text-wespa-red"
              >
                <Icon name="mail" size="sm" />
                press@wespa.hr
              </a>
              <a
                href="tel:+38512345678"
                className="flex items-center gap-2 text-stone-700 hover:text-wespa-red"
              >
                <Icon name="phone" size="sm" />
                +385 1 234 5678
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Releases */}
      <section className="section-spacing">
        <div className="container-wespa">
          <h2 className="text-2xl font-bold text-stone-900 mb-8">Featured News</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredReleases.map((release) => (
              <motion.article
                key={release.id}
                className="bg-stone-900 text-white rounded-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Tag variant="solid" color="primary" size="sm" className="mb-4">
                  {categoryLabels[release.category]}
                </Tag>
                <h3 className="text-2xl font-bold mb-4">{release.title}</h3>
                <p className="text-stone-300 mb-6">{release.excerpt}</p>
                <div className="flex items-center justify-between">
                  <time className="text-stone-400 text-sm">
                    {new Date(release.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <Button variant="secondary" size="sm" asChild>
                    <a href={release.pdfUrl}>Read More</a>
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* All Releases */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <h2 className="text-2xl font-bold text-stone-900 mb-8">All Press Releases</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allReleases.map((release) => (
              <PressReleaseCard key={release.id} release={release} />
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="bg-white border border-stone-200 rounded-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">Media Kit</h2>
                <p className="text-stone-600 mb-6">
                  Download our media kit for logos, brand guidelines, high-resolution images,
                  and company information for press use.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="wespa" asChild>
                    <a href="#" download>
                      <Icon name="download" size="sm" />
                      Download Media Kit
                    </a>
                  </Button>
                  <Button variant="secondary" asChild>
                    <a href="#" download>
                      <Icon name="image" size="sm" />
                      Logo Package
                    </a>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-stone-50 rounded-xl p-4 text-center">
                  <Icon name="image" size="lg" className="text-stone-400 mx-auto mb-2" />
                  <p className="text-sm text-stone-600">High-res Photos</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4 text-center">
                  <Icon name="file-text" size="lg" className="text-stone-400 mx-auto mb-2" />
                  <p className="text-sm text-stone-600">Brand Guidelines</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4 text-center">
                  <Icon name="briefcase" size="lg" className="text-stone-400 mx-auto mb-2" />
                  <p className="text-sm text-stone-600">Company Info</p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4 text-center">
                  <Icon name="users" size="lg" className="text-stone-400 mx-auto mb-2" />
                  <p className="text-sm text-stone-600">Leadership Bios</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press CTA */}
      <section className="bg-stone-900 text-white py-16">
        <div className="container-wespa text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Want to feature WESPA in your publication?
          </h2>
          <p className="text-stone-300 mb-8 max-w-xl mx-auto">
            We're happy to provide interviews, tours, and additional information for journalists and media professionals.
          </p>
          <Button variant="wespa" size="lg" asChild>
            <a href="mailto:press@wespa.hr">
              <Icon name="mail" size="sm" />
              Contact Press Team
            </a>
          </Button>
        </div>
      </section>
    </>
  )
}
