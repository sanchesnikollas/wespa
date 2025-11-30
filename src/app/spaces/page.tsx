'use client'

// ============================================
// WESPA Website - Spaces Page
// Frame: 02_Spaces_Desktop / 02_Spaces_Mobile
// ============================================

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHero } from '@/components/organisms/Sections'
import { CardSpace } from '@/components/molecules/Card'
import { TabsNav } from '@/components/molecules/Navigation'
import { Select } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import type { Space, SpaceType } from '@/types'

// ============================================
// Sample Space Data (for wireframe)
// ============================================
const sampleSpaces: Space[] = [
  {
    id: '1',
    slug: 'flydesk-access',
    name: 'FlyDesk Access',
    type: 'coworking',
    locationId: 'green-gold',
    description: 'Flexible hot desk access in our premium coworking space.',
    shortDescription: 'Hot desk access with full amenities',
    capacity: { min: 1, max: 1 },
    amenities: ['WiFi', 'Coffee', 'Print/Scan', 'Lounge Access'],
    images: [],
    pricing: { type: 'monthly', from: 150, currency: 'EUR' },
    availability: 'available',
  },
  {
    id: '2',
    slug: 'dedicated-desk',
    name: 'Dedicated Desk',
    type: 'coworking',
    locationId: 'zavrtnica',
    description: 'Your personal dedicated workspace with storage.',
    shortDescription: 'Personal desk with lockable storage',
    capacity: { min: 1, max: 1 },
    amenities: ['WiFi', 'Storage', 'Mail Handling', '24/7 Access'],
    images: [],
    pricing: { type: 'monthly', from: 300, currency: 'EUR' },
    availability: 'available',
  },
  {
    id: '3',
    slug: 'meeting-room-small',
    name: 'Meeting Room S',
    type: 'meeting',
    locationId: 'green-gold',
    description: 'Intimate meeting room for focused discussions.',
    shortDescription: 'Perfect for small team meetings',
    capacity: { min: 2, max: 6 },
    amenities: ['Display Screen', 'Whiteboard', 'Video Conferencing'],
    images: [],
    pricing: { type: 'hourly', from: 25, currency: 'EUR' },
    availability: 'available',
  },
  {
    id: '4',
    slug: 'meeting-room-large',
    name: 'Meeting Room L',
    type: 'meeting',
    locationId: 'green-gold',
    description: 'Spacious meeting room for larger team gatherings.',
    shortDescription: 'Ideal for team meetings and workshops',
    capacity: { min: 6, max: 14 },
    amenities: ['Display Screen', 'Whiteboard', 'Video Conferencing', 'Catering Available'],
    images: [],
    pricing: { type: 'hourly', from: 45, currency: 'EUR' },
    availability: 'limited',
  },
  {
    id: '5',
    slug: 'private-office-small',
    name: 'Private Office (2-4)',
    type: 'office',
    locationId: 'zavrtnica',
    description: 'Private office for small teams.',
    shortDescription: 'Enclosed office for focused teamwork',
    capacity: { min: 2, max: 4 },
    amenities: ['Dedicated Space', 'Lockable', 'Custom Branding', '24/7 Access'],
    images: [],
    pricing: { type: 'monthly', from: 800, currency: 'EUR' },
    availability: 'available',
  },
  {
    id: '6',
    slug: 'private-office-medium',
    name: 'Private Office (5-10)',
    type: 'office',
    locationId: 'green-gold',
    description: 'Medium-sized private office for growing teams.',
    shortDescription: 'Room to grow with your team',
    capacity: { min: 5, max: 10 },
    amenities: ['Dedicated Space', 'Lockable', 'Custom Branding', '24/7 Access', 'Meeting Room Credits'],
    images: [],
    pricing: { type: 'monthly', from: 1500, currency: 'EUR' },
    availability: 'limited',
  },
  {
    id: '7',
    slug: 'urban-hub-day-pass',
    name: 'Urban Hub Day Pass',
    type: 'urban-hub',
    locationId: 'green-gold',
    description: 'Full-day access to our premium urban hub.',
    shortDescription: 'Premium day access with all amenities',
    capacity: { min: 1, max: 1 },
    amenities: ['Lounge Access', 'Coffee & Refreshments', 'WiFi', 'Networking Events'],
    images: [],
    pricing: { type: 'daily', from: 35, currency: 'EUR' },
    availability: 'available',
  },
  {
    id: '8',
    slug: 'business-lounge',
    name: 'Business Lounge Membership',
    type: 'business-lounge',
    locationId: 'green-gold',
    description: 'Exclusive access to our sophisticated business lounge.',
    shortDescription: 'Premium lounge with cigar & cocktail room',
    capacity: { min: 1, max: 1 },
    amenities: ['Premium Lounge', 'Cigar Room', 'Cocktail Bar', 'Concierge Service'],
    images: [],
    pricing: { type: 'monthly', from: 500, currency: 'EUR' },
    availability: 'available',
  },
]

// ============================================
// Space Type Tabs
// ============================================
const spaceTypeTabs = [
  { id: 'all', label: 'All Spaces' },
  { id: 'coworking', label: 'Co-working' },
  { id: 'meeting', label: 'Meetings' },
  { id: 'office', label: 'Offices' },
  { id: 'urban-hub', label: 'Urban Hub' },
  { id: 'business-lounge', label: 'Business Lounge' },
]

// ============================================
// Spaces Page Component
// ============================================
export default function SpacesPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedTeamSize, setSelectedTeamSize] = useState('')

  // Filter spaces based on selected filters
  const filteredSpaces = sampleSpaces.filter((space) => {
    if (activeTab !== 'all' && space.type !== activeTab) return false
    if (selectedLocation && space.locationId !== selectedLocation) return false
    return true
  })

  return (
    <>
      {/* Page Hero */}
      <PageHero
        title="Find Your Perfect Workspace"
        subtitle="From hot desks to private offices, meeting rooms to event spaces — discover the space that fits your work style."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Spaces' },
        ]}
      />

      {/* Filters Section */}
      <section className="border-b border-wire-200 bg-wire-white sticky top-16 lg:top-20 z-20">
        <div className="container-wespa py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Type tabs */}
            <div className="overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0">
              <TabsNav
                tabs={spaceTypeTabs}
                activeTab={activeTab}
                onChange={setActiveTab}
                className="min-w-max"
              />
            </div>

            {/* Additional filters */}
            <div className="flex gap-3 lg:ml-auto">
              <Select
                options={[
                  { value: 'green-gold', label: 'Green Gold' },
                  { value: 'zavrtnica', label: 'Zavrtnica' },
                ]}
                placeholder="Location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-40"
              />
              <Select
                options={[
                  { value: '1', label: '1 person' },
                  { value: '2-5', label: '2-5 people' },
                  { value: '6-10', label: '6-10 people' },
                  { value: '11+', label: '11+ people' },
                ]}
                placeholder="Team size"
                value={selectedTeamSize}
                onChange={(e) => setSelectedTeamSize(e.target.value)}
                className="w-40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Spaces Grid */}
      <section className="section-spacing">
        <div className="container-wespa">
          {/* Results count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-body-md text-wire-600">
              {filteredSpaces.length} spaces available
            </p>
            <Button variant="ghost" size="sm">
              <Icon name="map-pin" size="sm" />
              View on map
            </Button>
          </div>

          {/* Grid */}
          {filteredSpaces.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSpaces.map((space, index) => (
                <motion.div
                  key={space.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CardSpace space={space} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Icon name="search" size="xl" className="text-wire-300 mx-auto mb-4" />
              <h3 className="text-heading-md font-semibold text-wire-900 mb-2">
                No spaces found
              </h3>
              <p className="text-body-md text-wire-600 mb-6">
                Try adjusting your filters to find available spaces.
              </p>
              <Button
                variant="secondary"
                onClick={() => {
                  setActiveTab('all')
                  setSelectedLocation('')
                  setSelectedTeamSize('')
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-wire-900 text-wire-white py-12 lg:py-16">
        <div className="container-wespa text-center">
          <h2 className="text-display-sm font-bold mb-4">
            Not sure which space is right for you?
          </h2>
          <p className="text-body-lg text-wire-300 mb-8 max-w-xl mx-auto">
            Book a tour and let our team help you find the perfect workspace for your needs.
          </p>
          <Button
            size="lg"
            className="bg-wire-white text-wire-900 hover:bg-wire-100"
          >
            Book a Visit
          </Button>
        </div>
      </section>
    </>
  )
}
