import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'Urban Hub — Zavrtnica | WESPA Locations',
  description: 'WESPA Urban Hub at Zavrtnica 17, Zagreb. Industrial charm, startup hub, coworking spaces, SPOT restaurant, and a thriving creative community.',
}

const features = [
  {
    title: 'Industrial Charm',
    description: 'Raw concrete, exposed brick, and open ceilings create an atmosphere that sparks creativity and bold thinking.',
  },
  {
    title: 'Startup Hub',
    description: 'Purpose-built for startups and scale-ups. Flexible terms, collaborative spaces, and a network of founders who get it.',
  },
  {
    title: 'Coworking Spaces',
    description: 'Flexible desks and dedicated workstations for freelancers, remote workers, and small teams who thrive in community.',
  },
  {
    title: 'SPOT Restaurant',
    description: 'On-site premium dining for tenants and visitors. Fine dining with a curated wine list, right where you work.',
  },
  {
    title: 'Creative Community',
    description: 'Designers, developers, marketers, and entrepreneurs — a diverse mix of talent that makes Zavrtnica buzz with energy.',
  },
  {
    title: 'Event & Podcast Spaces',
    description: 'Dedicated areas for workshops, meetups, podcast recordings, and community events.',
  },
]

export default function UrbanHubPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <Image src="/images/locations/urban-hub/urban-hub-1.jpg" alt="WESPA Urban Hub" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="container-wespa relative z-10">
          <p className="text-wespa-red font-medium mb-4">Home / Locations / Urban Hub</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Urban Hub</h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
            Industrial charm meets modern innovation at Zavrtnica. A startup hub, coworking space, and creative community with SPOT restaurant on-site.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
              Where Ideas Come to Life
            </h2>
            <p className="text-lg text-stone-600 mb-4">
              WESPA Urban Hub at Zavrtnica is the antidote to the corporate office. It is a space where raw creativity meets modern infrastructure — where startups launch, freelancers find their tribe, and ideas turn into ventures.
            </p>
            <p className="text-lg text-stone-600">
              The industrial character of the building is not just aesthetic — it is a mindset. Open, honest, and built for people who are making things happen.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <h2 className="text-3xl font-bold text-stone-900 mb-10">What You Will Find Here</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="p-6 bg-white border border-stone-200 rounded-2xl">
                <h3 className="text-xl font-bold text-stone-900 mb-3">{f.title}</h3>
                <p className="text-stone-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Address</h2>
            <p className="text-lg text-stone-600 mb-1">WESPA Urban Hub</p>
            <p className="text-lg text-stone-900 font-semibold">Zavrtnica 17, Zagreb</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-stone-900 text-white">
        <div className="container-wespa text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the Community
          </h2>
          <p className="text-lg text-stone-300 mb-8 max-w-xl mx-auto">
            Book a tour of WESPA Urban Hub and see why Zavrtnica is Zagreb&apos;s most exciting business address.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="wespa" size="lg" asChild>
              <Link href="/book-visit">Book a Tour</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/location">All Locations</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
