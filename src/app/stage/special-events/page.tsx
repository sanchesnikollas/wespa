'use client'

// ============================================
// WESPA Website - Special Events Page
// Custom events, celebrations, and private occasions
// ============================================

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PageHero, SectionTitle } from '@/components/organisms/Sections'
import { Button } from '@/components/atoms/Button'
import { Icon, IconName } from '@/components/atoms/Icon'
import { Tag } from '@/components/atoms/Tag'
import { LeadForm } from '@/components/molecules/Form'

// ============================================
// Event Types Data
// ============================================
interface EventType {
  name: string
  description: string
  capacity: string
  icon: IconName
  features: string[]
}

const eventTypes: EventType[] = [
  {
    name: 'Private Celebrations',
    description: 'Birthday parties, anniversaries, and milestone celebrations in an elegant setting.',
    capacity: '20-150 guests',
    icon: 'star',
    features: ['Custom decorations', 'Catering packages', 'Photography setup', 'DJ booth'],
  },
  {
    name: 'Wedding Receptions',
    description: 'Intimate wedding celebrations with sophisticated ambiance and premium service.',
    capacity: '50-200 guests',
    icon: 'heart',
    features: ['Ceremony setup', 'Reception layout', 'Bridal suite access', 'Custom catering'],
  },
  {
    name: 'Gala Dinners',
    description: 'Elegant formal dinners for charities, foundations, and exclusive gatherings.',
    capacity: '80-250 guests',
    icon: 'utensils',
    features: ['Fine dining setup', 'Live entertainment', 'Stage and AV', 'VIP areas'],
  },
  {
    name: 'Cocktail Parties',
    description: 'Sophisticated cocktail events with premium bar service and entertainment.',
    capacity: '50-300 guests',
    icon: 'wine',
    features: ['Premium bar', 'Lounge areas', 'Entertainment', 'Valet parking'],
  },
  {
    name: 'Holiday Events',
    description: 'Christmas parties, New Year celebrations, and seasonal gatherings.',
    capacity: '30-200 guests',
    icon: 'gift',
    features: ['Themed decor', 'Entertainment', 'Special menus', 'Photo areas'],
  },
  {
    name: 'Private Screenings',
    description: 'Movie premieres, sports events, and exclusive viewing parties.',
    capacity: '20-100 guests',
    icon: 'monitor',
    features: ['Large screens', 'Premium sound', 'Lounge seating', 'Catering'],
  },
]

// ============================================
// Gallery Images
// ============================================
const galleryImages = [
  '/images/spaces/lounge-1.jpg',
  '/images/spaces/lounge-2.jpg',
  '/images/spaces/urban-hub-1.jpg',
  '/images/spaces/meeting-KGD_8894-Edit.jpg',
]

// ============================================
// Special Events Page
// ============================================
export default function SpecialEventsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-stone-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/images/spaces/lounge-1.jpg"
            alt="Special Events"
            fill
            className="object-cover"
          />
        </div>
        <div className="container-wespa relative">
          <nav className="flex items-center gap-2 text-sm text-stone-400 mb-8">
            <Link href="/" className="hover:text-white">Home</Link>
            <Icon name="chevron-right" size="xs" />
            <Link href="/stage" className="hover:text-white">Stage</Link>
            <Icon name="chevron-right" size="xs" />
            <span className="text-white">Special Events</span>
          </nav>

          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Tag variant="solid" color="primary" className="mb-6">Special Events</Tag>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Celebrate Life's Moments
            </h1>
            <p className="text-xl text-stone-300 mb-8">
              From intimate gatherings to grand celebrations, WESPA Stage provides the perfect
              backdrop for your most memorable occasions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="wespa" size="lg" asChild>
                <Link href="#inquiry">Plan Your Event</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">Request Brochure</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Types */}
      <section className="section-spacing">
        <div className="container-wespa">
          <SectionTitle
            title="Types of Special Events"
            subtitle="Whatever the occasion, we'll help you create an unforgettable experience."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventTypes.map((event, i) => (
              <motion.div
                key={event.name}
                className="bg-white border border-stone-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="w-12 h-12 bg-wespa-red/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon name={event.icon} size="lg" className="text-wespa-red" />
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-2">{event.name}</h3>
                <p className="text-stone-600 text-sm mb-4">{event.description}</p>
                <p className="text-sm text-stone-500 mb-4">
                  <Icon name="users" size="sm" className="inline mr-1" />
                  {event.capacity}
                </p>
                <div className="flex flex-wrap gap-2">
                  {event.features.slice(0, 3).map((feature, j) => (
                    <Tag key={j} variant="outline" size="sm">{feature}</Tag>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <SectionTitle
            title="Event Gallery"
            subtitle="Get inspired by past celebrations at WESPA Stage."
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                className="aspect-square relative rounded-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Image src={img} alt={`Event gallery ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-spacing">
        <div className="container-wespa">
          <SectionTitle
            title="What's Included"
            subtitle="Every special event at WESPA Stage comes with comprehensive support."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'users' as IconName, title: 'Event Coordinator', desc: 'Dedicated coordinator to manage every detail' },
              { icon: 'utensils' as IconName, title: 'Catering Options', desc: 'In-house catering or work with your caterer' },
              { icon: 'music' as IconName, title: 'AV Equipment', desc: 'Professional sound, lighting, and projection' },
              { icon: 'car' as IconName, title: 'Valet Parking', desc: 'Convenient parking for all your guests' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon} size="lg" className="text-stone-600" />
                </div>
                <h3 className="font-semibold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="section-spacing bg-stone-900 text-white">
        <div className="container-wespa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Let's Plan Your Event
              </h2>
              <p className="text-stone-300 mb-8">
                Tell us about your vision and our events team will create a customized proposal
                tailored to your needs and budget.
              </p>
              <div className="space-y-4">
                {[
                  'No commitment required',
                  'Response within 24 hours',
                  'Flexible packages available',
                  'Site visits welcome',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Icon name="check" size="sm" className="text-wespa-red" />
                    <span className="text-stone-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 lg:p-8">
              <h3 className="text-xl font-semibold text-stone-900 mb-6">Event Inquiry</h3>
              <LeadForm variant="full" defaultInquiryType="event" />
            </div>
          </div>
        </div>
      </section>

      {/* Business Events Link */}
      <section className="py-12 border-t border-stone-200">
        <div className="container-wespa">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-stone-600">Looking for corporate events?</p>
              <p className="font-semibold text-stone-900">Check out our business event options</p>
            </div>
            <Button variant="secondary" asChild>
              <Link href="/stage/business-events">
                Business Events
                <Icon name="arrow-right" size="sm" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
