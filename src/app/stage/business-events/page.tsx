'use client'

// ============================================
// WESPA Website - Business Events Page
// Corporate events, conferences, and professional gatherings
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
// Business Event Types
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
    name: 'Conferences',
    description: 'Multi-day conferences with keynotes, breakout sessions, and networking.',
    capacity: '100-500 attendees',
    icon: 'users',
    features: ['Main stage', 'Breakout rooms', 'Exhibition area', 'Catering'],
  },
  {
    name: 'Corporate Meetings',
    description: 'Board meetings, strategy sessions, and executive retreats.',
    capacity: '10-50 attendees',
    icon: 'briefcase',
    features: ['Private rooms', 'Video conferencing', 'Presentation tech', 'Refreshments'],
  },
  {
    name: 'Product Launches',
    description: 'Impactful product reveals with media, influencers, and key stakeholders.',
    capacity: '50-300 attendees',
    icon: 'rocket',
    features: ['Stage setup', 'Press area', 'Demo stations', 'AV production'],
  },
  {
    name: 'Networking Events',
    description: 'Industry meetups, mixer events, and professional networking nights.',
    capacity: '50-200 attendees',
    icon: 'link',
    features: ['Open layout', 'Bar service', 'Registration', 'Name badges'],
  },
  {
    name: 'Training & Workshops',
    description: 'Team training, skill workshops, and professional development sessions.',
    capacity: '20-100 attendees',
    icon: 'book-open',
    features: ['Classroom setup', 'Whiteboards', 'Materials handling', 'Lunch service'],
  },
  {
    name: 'Award Ceremonies',
    description: 'Recognition events, award galas, and achievement celebrations.',
    capacity: '100-400 attendees',
    icon: 'award',
    features: ['Stage & podium', 'Red carpet', 'Photography', 'Formal dining'],
  },
]

// ============================================
// Testimonials
// ============================================
const testimonials = [
  {
    quote: 'WESPA Stage exceeded our expectations for our annual conference. The team handled everything flawlessly.',
    author: 'Ana M.',
    company: 'TechCorp',
    event: 'Annual Conference',
  },
  {
    quote: 'The venue was perfect for our product launch. Professional, modern, and memorable.',
    author: 'Ivan K.',
    company: 'StartupHR',
    event: 'Product Launch',
  },
]

// ============================================
// Business Events Page
// ============================================
export default function BusinessEventsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-stone-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/images/spaces/meeting-KGD_8894-Edit.jpg"
            alt="Business Events"
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
            <span className="text-white">Business Events</span>
          </nav>

          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Tag variant="solid" color="primary" className="mb-6">Business Events</Tag>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Elevate Your Corporate Events
            </h1>
            <p className="text-xl text-stone-300 mb-8">
              From intimate board meetings to large-scale conferences, WESPA Stage
              provides the professional setting and support your business deserves.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="wespa" size="lg" asChild>
                <Link href="#inquiry">Request Proposal</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/book-visit">Schedule Site Visit</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b border-stone-200">
        <div className="container-wespa">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Events Hosted' },
              { value: '50K+', label: 'Attendees' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '5', label: 'Event Spaces' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl lg:text-4xl font-bold text-stone-900">{stat.value}</div>
                <div className="text-stone-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="section-spacing">
        <div className="container-wespa">
          <SectionTitle
            title="Business Event Solutions"
            subtitle="Tailored spaces and services for every type of corporate event."
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
                <div className="w-12 h-12 bg-stone-900 rounded-xl flex items-center justify-center mb-4">
                  <Icon name={event.icon} size="lg" className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-2">{event.name}</h3>
                <p className="text-stone-600 text-sm mb-4">{event.description}</p>
                <p className="text-sm text-stone-500 mb-4">
                  <Icon name="users" size="sm" className="inline mr-1" />
                  {event.capacity}
                </p>
                <div className="flex flex-wrap gap-2">
                  {event.features.map((feature, j) => (
                    <Tag key={j} variant="outline" size="sm">{feature}</Tag>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Venues */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <SectionTitle
            title="Our Event Spaces"
            subtitle="Multiple venues to match your event size and style."
          />

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: 'Main Stage',
                capacity: 'Up to 500 guests',
                description: 'Our flagship venue with full production capabilities.',
                features: ['Main auditorium', 'Green room', 'Reception area', 'Technical booth'],
                image: '/images/spaces/meeting-KGZ_1671-HDR.jpg',
              },
              {
                name: 'Conference Hall',
                capacity: 'Up to 200 guests',
                description: 'Versatile space for conferences and larger meetings.',
                features: ['Modular layout', 'Multiple screens', 'Recording setup', 'Catering area'],
                image: '/images/spaces/meeting-KGD_8894-Edit.jpg',
              },
              {
                name: 'Executive Boardroom',
                capacity: 'Up to 30 guests',
                description: 'Premium space for high-level meetings.',
                features: ['Video conferencing', 'Private terrace', 'Executive catering', 'Soundproofing'],
                image: '/images/spaces/office-Copy-of-DSC_4745.jpg',
              },
              {
                name: 'Workshop Rooms',
                capacity: 'Up to 50 guests',
                description: 'Flexible spaces for training and workshops.',
                features: ['Classroom setup', 'Breakout areas', 'Writable walls', 'Natural light'],
                image: '/images/spaces/meeting-Copy-of-Conference-4.jpg',
              },
            ].map((venue, i) => (
              <motion.div
                key={venue.name}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="aspect-video relative">
                  <Image src={venue.image} alt={venue.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-stone-900">{venue.name}</h3>
                    <span className="text-sm text-stone-500">{venue.capacity}</span>
                  </div>
                  <p className="text-stone-600 text-sm mb-4">{venue.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {venue.features.map((feature, j) => (
                      <Tag key={j} variant="outline" size="sm">{feature}</Tag>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-spacing">
        <div className="container-wespa">
          <SectionTitle
            title="What Clients Say"
            subtitle="Trusted by leading companies for their corporate events."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="bg-stone-50 rounded-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <blockquote className="text-lg text-stone-700 mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center text-stone-600 font-semibold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900">{testimonial.author}</div>
                    <div className="text-sm text-stone-500">{testimonial.company} • {testimonial.event}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-spacing bg-stone-900 text-white">
        <div className="container-wespa">
          <SectionTitle
            title="Full-Service Event Support"
            subtitle="Everything you need for a successful corporate event."
            light
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'clipboard-list' as IconName, title: 'Event Planning', desc: 'End-to-end coordination and logistics' },
              { icon: 'utensils' as IconName, title: 'Catering', desc: 'In-house kitchen with custom menus' },
              { icon: 'monitor' as IconName, title: 'AV & Tech', desc: 'Professional equipment and technicians' },
              { icon: 'camera' as IconName, title: 'Documentation', desc: 'Photography and videography services' },
            ].map((service, i) => (
              <motion.div
                key={i}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={service.icon} size="lg" className="text-white" />
                </div>
                <h3 className="font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-stone-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="section-spacing">
        <div className="container-wespa">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-6">
                Request a Proposal
              </h2>
              <p className="text-stone-600 mb-8">
                Tell us about your event and our team will prepare a customized proposal
                with venue options, pricing, and services tailored to your requirements.
              </p>
              <div className="space-y-4">
                {[
                  'Free consultation and site visits',
                  'Customized packages for any budget',
                  'Dedicated event coordinator',
                  'Flexible cancellation policies',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Icon name="check" size="sm" className="text-green-600" />
                    <span className="text-stone-600">{item}</span>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="mt-8 p-6 bg-stone-50 rounded-xl">
                <p className="text-sm text-stone-500 mb-3">Prefer to talk directly?</p>
                <div className="flex flex-col gap-2">
                  <a href="tel:+38512345678" className="flex items-center gap-2 text-stone-900 hover:text-wespa-red">
                    <Icon name="phone" size="sm" />
                    +385 1 234 5678
                  </a>
                  <a href="mailto:events@wespa.hr" className="flex items-center gap-2 text-stone-900 hover:text-wespa-red">
                    <Icon name="mail" size="sm" />
                    events@wespa.hr
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-6 lg:p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-stone-900 mb-6">Event Details</h3>
              <LeadForm variant="full" defaultInquiryType="event" />
            </div>
          </div>
        </div>
      </section>

      {/* Special Events Link */}
      <section className="py-12 bg-stone-50 border-t border-stone-200">
        <div className="container-wespa">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-stone-600">Planning a celebration or private event?</p>
              <p className="font-semibold text-stone-900">Explore our special events options</p>
            </div>
            <Button variant="secondary" asChild>
              <Link href="/stage/special-events">
                Special Events
                <Icon name="arrow-right" size="sm" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
