'use client'

// ============================================
// WESPA Website - Stage (Events) Page
// Frame: 03_Stage_Desktop
// ============================================

import { motion } from 'framer-motion'
import { PageHero, SectionTitle } from '@/components/organisms/Sections'
import { CardEventType, CardBase } from '@/components/molecules/Card'
import { LeadForm } from '@/components/molecules/Form'
import { Button } from '@/components/atoms/Button'
import { Icon, FeatureIcon, IconName } from '@/components/atoms/Icon'
import { Tag } from '@/components/atoms/Tag'

// ============================================
// Event Types Data
// ============================================
const eventTypes = [
  {
    id: 'corporate',
    name: 'Corporate Events',
    description: 'Professional gatherings, conferences, and company celebrations in sophisticated venues.',
    capacity: { min: 20, max: 150 },
    icon: 'briefcase' as IconName,
    features: ['AV Equipment', 'Catering Options', 'Breakout Rooms', 'Dedicated Support'],
  },
  {
    id: 'social',
    name: 'Social Events',
    description: 'Private celebrations, networking events, and community gatherings in versatile spaces.',
    capacity: { min: 10, max: 100 },
    icon: 'users' as IconName,
    features: ['Flexible Layouts', 'Bar Service', 'Music System', 'Outdoor Access'],
  },
  {
    id: 'workshop',
    name: 'Workshops & Training',
    description: 'Interactive learning sessions and team training in focused, well-equipped environments.',
    capacity: { min: 8, max: 40 },
    icon: 'monitor' as IconName,
    features: ['Presentation Setup', 'Whiteboard Walls', 'Recording Capable', 'Refreshments'],
  },
  {
    id: 'podcast',
    name: 'Podcasts & Recording',
    description: 'Professional recording studio space for podcasts, video content, and interviews.',
    capacity: { min: 2, max: 6 },
    icon: 'mic' as IconName,
    features: ['Soundproofed', 'Recording Equipment', 'Green Room', 'Editing Suite'],
  },
]

// ============================================
// Past Events (Proof section)
// ============================================
const pastEvents = [
  { name: 'Tech Meetup Zagreb', attendees: 120, type: 'Corporate' },
  { name: 'Startup Demo Day', attendees: 85, type: 'Corporate' },
  { name: 'Annual Company Gala', attendees: 150, type: 'Social' },
  { name: 'Design Thinking Workshop', attendees: 25, type: 'Workshop' },
  { name: 'Business Leaders Podcast', attendees: 4, type: 'Podcast' },
  { name: 'Product Launch Party', attendees: 90, type: 'Social' },
]

// ============================================
// Stage Page Component
// ============================================
export default function StagePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-wire-900 text-wire-white py-16 lg:py-24">
        <div className="container-wespa">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Tag variant="outline" size="md" className="border-wire-500 text-wire-300 mb-6">
                WESPA Stage
              </Tag>
              <h1 className="text-display-md lg:text-display-lg font-bold mb-6 text-balance">
                Your Idea, Our Stage
              </h1>
              <p className="text-body-lg text-wire-300 mb-8">
                From intimate workshops to grand celebrations, our versatile event spaces
                adapt to your vision. Professional support, premium amenities, and unforgettable
                experiences — all under one roof.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-wire-white text-wire-900 hover:bg-wire-100"
                >
                  Request Event Space
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-wire-white hover:bg-wire-800"
                  rightIcon={<Icon name="play" size="sm" />}
                >
                  View past events
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Types Grid */}
      <section className="section-spacing">
        <div className="container-wespa">
          <SectionTitle
            title="Event Types We Host"
            subtitle="Whatever your occasion, we have the perfect space and support to make it memorable."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventTypes.map((eventType, index) => (
              <motion.div
                key={eventType.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CardEventType eventType={eventType} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Venues Section */}
      <section className="section-spacing bg-wire-50">
        <div className="container-wespa">
          <SectionTitle
            title="Our Event Venues"
            subtitle="Two distinct locations offering unique atmospheres for every type of event."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {/* Green Gold Venue */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <CardBase className="overflow-hidden h-full">
                <div className="aspect-video bg-wire-200 flex items-center justify-center">
                  <Icon name="building" size="xl" className="text-wire-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-heading-lg font-semibold text-wire-900 mb-2">
                    WESPA Business & Lounge
                  </h3>
                  <p className="text-body-sm text-wire-500 mb-4">
                    Green Gold Business Centre
                  </p>
                  <p className="text-body-md text-wire-600 mb-4">
                    Sophisticated venue for corporate events, elegant receptions,
                    and executive gatherings. Features our premium cigar & cocktail room.
                  </p>
                  <ul className="space-y-2 mb-6">
                    {['Up to 150 guests', 'Premium catering by Papel', 'Executive boardrooms', 'Parking available'].map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-body-sm text-wire-700">
                        <Icon name="check" size="sm" className="text-wire-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="secondary" fullWidth>
                    Explore venue
                  </Button>
                </div>
              </CardBase>
            </motion.div>

            {/* Zavrtnica Venue */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <CardBase className="overflow-hidden h-full">
                <div className="aspect-video bg-wire-200 flex items-center justify-center">
                  <Icon name="building" size="xl" className="text-wire-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-heading-lg font-semibold text-wire-900 mb-2">
                    WESPA Spaces
                  </h3>
                  <p className="text-body-sm text-wire-500 mb-4">
                    Zavrtnica
                  </p>
                  <p className="text-body-md text-wire-600 mb-4">
                    Dynamic venue for creative events, startup launches, workshops,
                    and community gatherings. Features podcast studio and open spaces.
                  </p>
                  <ul className="space-y-2 mb-6">
                    {['Up to 100 guests', 'Flexible layouts', 'Podcast studio', 'Catering by SPOT'].map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-body-sm text-wire-700">
                        <Icon name="check" size="sm" className="text-wire-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="secondary" fullWidth>
                    Explore venue
                  </Button>
                </div>
              </CardBase>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Past Events / Proof Section */}
      <section className="section-spacing">
        <div className="container-wespa">
          <SectionTitle
            title="Events We've Hosted"
            subtitle="Join the growing list of successful events at WESPA."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {pastEvents.map((event, index) => (
              <motion.div
                key={index}
                className="bg-wire-50 rounded-lg p-4 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Tag size="sm" className="mb-2">{event.type}</Tag>
                <p className="text-body-sm font-medium text-wire-900 mb-1">{event.name}</p>
                <p className="text-caption text-wire-500">{event.attendees} attendees</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {[
              { value: '500+', label: 'Events hosted' },
              { value: '15,000+', label: 'Total attendees' },
              { value: '4.9', label: 'Average rating' },
              { value: '98%', label: 'Would recommend' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-wire-100 rounded-xl">
                <div className="text-display-sm font-bold text-wire-900">{stat.value}</div>
                <div className="text-body-sm text-wire-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form Section */}
      <section className="section-spacing bg-wire-900 text-wire-white">
        <div className="container-wespa">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: Content */}
            <div>
              <h2 className="text-display-sm lg:text-display-md font-bold mb-6">
                Ready to plan your event?
              </h2>
              <p className="text-body-lg text-wire-300 mb-8">
                Tell us about your vision and our events team will craft a
                tailored proposal for your needs.
              </p>

              {/* Process steps */}
              <div className="space-y-6">
                {[
                  { step: '01', title: 'Share your vision', desc: 'Tell us about your event' },
                  { step: '02', title: 'Get a proposal', desc: 'We\'ll craft a tailored plan' },
                  { step: '03', title: 'Plan together', desc: 'Refine every detail' },
                  { step: '04', title: 'Host your event', desc: 'We handle the rest' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="text-display-sm font-bold text-wire-500">{item.step}</div>
                    <div>
                      <h4 className="text-heading-sm font-semibold">{item.title}</h4>
                      <p className="text-body-sm text-wire-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-wire-white p-6 lg:p-8 rounded-xl">
              <LeadForm
                variant="full"
                defaultInquiryType="event"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
