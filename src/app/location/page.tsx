import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'Locations | WESPA',
  description: 'WESPA operates from two Zagreb locations — Business & Lounge at Green Gold (Radnicka cesta 52) and Urban Hub at Zavrtnica 17.',
}

const locations = [
  {
    title: 'Business & Lounge',
    subtitle: 'Green Gold',
    address: 'Radnicka cesta 52, Zagreb',
    description:
      'A premium business center with exclusive offices and a sophisticated atmosphere. Home to Papel restaurant and the WESPA lounge experience. Designed for established businesses and professionals who demand excellence.',
    highlights: ['Premium Offices', 'Papel Restaurant', 'Executive Lounge', 'Meeting Rooms'],
    href: '/location/business-lounge',
  },
  {
    title: 'Urban Hub',
    subtitle: 'Zavrtnica',
    address: 'Zavrtnica 17, Zagreb',
    description:
      'Industrial charm meets modern innovation. A startup hub and coworking space with SPOT restaurant on-site. Built for creative teams, entrepreneurs, and the WESPA community at large.',
    highlights: ['Coworking Spaces', 'SPOT Restaurant', 'Startup Hub', 'Creative Community'],
    href: '/location/urban-hub',
  },
]

export default function LocationPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <Image src="/images/locations/business-lounge/lounge-1.jpg" alt="WESPA locations" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="container-wespa relative z-10">
          <p className="text-wespa-red font-medium mb-4">Home / Locations</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Locations</h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
            Two distinct locations in Zagreb, each with its own character and purpose. Find the WESPA space that fits your work style.
          </p>
        </div>
      </section>

      {/* Location Cards */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="grid gap-10 md:grid-cols-2">
            {locations.map((loc) => (
              <Link
                key={loc.href}
                href={loc.href}
                className="group block p-8 bg-white border border-stone-200 rounded-2xl hover:shadow-lg hover:border-stone-300 transition-all"
              >
                <p className="text-sm font-medium text-wespa-red uppercase tracking-wider mb-2">
                  {loc.subtitle}
                </p>
                <h2 className="text-3xl font-bold text-stone-900 mb-2 group-hover:text-wespa-red transition-colors">
                  {loc.title}
                </h2>
                <p className="text-sm text-stone-500 mb-4">{loc.address}</p>
                <p className="text-stone-600 mb-6">{loc.description}</p>

                <ul className="grid grid-cols-2 gap-3 mb-6">
                  {loc.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-wespa-red shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Visit Us In Person
          </h2>
          <p className="text-lg text-stone-600 mb-8 max-w-xl mx-auto">
            See the spaces for yourself. Book a guided tour of either location and find your perfect workspace.
          </p>
          <Button variant="wespa" size="lg" asChild>
            <Link href="/book-visit">Book a Tour</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
