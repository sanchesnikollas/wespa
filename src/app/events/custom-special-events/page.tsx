import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'Custom Special Events',
  description: 'Host private celebrations, weddings, concerts, and bespoke events at WESPA. Full event organisation with Papel & SPOT catering, AV production, and entertainment.',
}

const eventCategories = [
  {
    name: 'Private Celebrations',
    description: 'Birthday parties, anniversaries, milestone events, and intimate gatherings tailored to your vision.',
  },
  {
    name: 'Weddings & Receptions',
    description: 'Elegant wedding ceremonies and receptions with premium catering, custom decor, and dedicated coordination.',
  },
  {
    name: 'Concerts & Performances',
    description: 'Live music events, showcases, and performances with professional stage, sound, and lighting setups.',
  },
  {
    name: 'Full Event Organisation',
    description: 'End-to-end planning and execution for any occasion — from concept development to day-of management.',
  },
]

const services = [
  {
    title: 'Papel & SPOT Catering',
    description: 'In-house catering from our own restaurants. Papel offers refined Mediterranean cuisine while SPOT delivers contemporary casual menus. Custom menus available for any event size.',
  },
  {
    title: 'AV Production',
    description: 'Professional audio-visual equipment and technicians. High-definition projection, multi-channel sound systems, stage lighting, and custom visual setups.',
  },
  {
    title: 'Entertainment',
    description: 'Curated entertainment options including DJs, live bands, performers, and MCs. We connect you with trusted professionals who match your event style.',
  },
  {
    title: 'Live Streaming',
    description: 'Broadcast your event to remote audiences with multi-camera live streaming, professional mixing, and platform integration for hybrid events.',
  },
]

export default function CustomSpecialEventsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <Image src="/images/events/special/event-1.jpg" alt="WESPA special event" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="container-wespa relative z-10">
          <p className="text-wespa-red font-semibold mb-4">Events</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Custom Special Events</h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
            Celebrate life's greatest moments in style. From weddings and private parties to concerts and performances, we handle every detail so you can enjoy the occasion.
          </p>
        </div>
      </section>

      {/* Event Categories */}
      <section className="section-spacing">
        <div className="container-wespa">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">What We Host</h2>
          <p className="text-stone-600 mb-10 max-w-2xl">
            Every special event is unique. We work closely with you to design an experience that reflects your personality and exceeds your expectations.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {eventCategories.map((category) => (
              <div
                key={category.name}
                className="p-8 bg-white border border-stone-200 rounded-2xl"
              >
                <h3 className="text-xl font-bold text-stone-900 mb-3">{category.name}</h3>
                <p className="text-stone-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Full-Service Production</h2>
          <p className="text-stone-600 mb-10 max-w-2xl">
            We bring together catering, production, and entertainment under one roof so your event runs seamlessly from start to finish.
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
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Let's Plan Your Celebration</h2>
          <p className="text-stone-600 mb-8 max-w-xl mx-auto">
            Tell us about your event and our team will craft a tailored proposal. No commitment required.
          </p>
          <Button variant="wespa" size="lg" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
