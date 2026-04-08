import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'Custom Business Events',
  description: 'Host conferences, panels, workshops, and corporate events at WESPA. 10 halls across 2 Zagreb locations with capacity for 2 to 500+ attendees.',
}

const eventFormats = [
  { name: 'Conferences', description: 'Large-scale gatherings with keynote stages, breakout sessions, and networking areas for up to 500+ attendees.' },
  { name: 'Panels & Talks', description: 'Moderated discussions and speaker sessions with professional staging, AV, and live streaming capabilities.' },
  { name: 'Workshops & Training', description: 'Interactive sessions in focused environments with flexible seating, whiteboards, and collaboration tools.' },
  { name: 'Corporate Gatherings', description: 'Company meetings, team events, product launches, and celebrations in a professional setting.' },
]

const stats = [
  { value: '10', label: 'Event halls' },
  { value: '2', label: 'Locations' },
  { value: '2-500+', label: 'Capacity range' },
  { value: '100%', label: 'Customisable' },
]

const services = [
  {
    title: 'Business Catering',
    description: 'Professional catering packages from Papel and SPOT. Coffee breaks, working lunches, seated dinners, and cocktail receptions designed for corporate events.',
  },
  {
    title: 'AV Equipment',
    description: 'State-of-the-art audio-visual systems in every hall. HD projectors, wireless presentation, multi-zone sound, stage lighting, and video conferencing integration.',
  },
  {
    title: 'Event Management',
    description: 'Dedicated event coordinators handle logistics, vendor management, guest registration, signage, and on-site support from setup to teardown.',
  },
  {
    title: 'Live Streaming',
    description: 'Reach remote audiences with multi-camera live streaming, screen sharing, and audience interaction tools for hybrid conferences and webinars.',
  },
]

export default function CustomBusinessEventsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <Image src="/images/events/business/business-event-1.jpg" alt="WESPA business event" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="container-wespa relative z-10">
          <p className="text-wespa-red font-semibold mb-4">Events</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Custom Business Events</h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
            Professional event infrastructure for conferences, panels, workshops, and corporate gatherings. 10 halls across 2 locations with capacity from 2 to 500+ people.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-stone-200">
        <div className="container-wespa py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-stone-900">{stat.value}</div>
                <div className="text-sm text-stone-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Formats */}
      <section className="section-spacing">
        <div className="container-wespa">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Event Formats</h2>
          <p className="text-stone-600 mb-10 max-w-2xl">
            Whether you need a boardroom for 4 or a conference hall for 500, we configure the space and services to match your format.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {eventFormats.map((format) => (
              <div
                key={format.name}
                className="p-8 bg-white border border-stone-200 rounded-2xl"
              >
                <h3 className="text-xl font-bold text-stone-900 mb-3">{format.name}</h3>
                <p className="text-stone-600">{format.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Included Services</h2>
          <p className="text-stone-600 mb-10 max-w-2xl">
            Every business event at WESPA comes with professional support. Mix and match services to build the package your event needs.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <div key={service.title} className="flex gap-4">
                <div className="w-1 bg-wespa-red rounded-full shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">{service.title}</h3>
                  <p className="text-stone-600 text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-wespa text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Plan Your Business Event</h2>
          <p className="text-stone-600 mb-8 max-w-xl mx-auto">
            Share your event requirements and our team will prepare a detailed proposal with venue options, services, and pricing.
          </p>
          <Button variant="wespa" size="lg" asChild>
            <Link href="/contact">Request a Proposal</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
