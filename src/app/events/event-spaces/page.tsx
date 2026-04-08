import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'Event Spaces',
  description: 'Premium event venues at WESPA Business & Lounge (Green Gold, up to 150 guests) and WESPA Spaces (Zavrtnica, up to 100 guests) in Zagreb.',
}

const venues = [
  {
    name: 'WESPA Business & Lounge',
    location: 'Green Gold Centre, Zagreb',
    capacity: 'Up to 150 guests',
    description: 'A sophisticated venue in the heart of Zagreb\'s Green Gold business district. Ideal for corporate receptions, gala dinners, product launches, and executive gatherings.',
    features: [
      'Premium lounge with cigar & cocktail room',
      'Multiple configurable halls',
      'In-house catering by Papel',
      'Dedicated parking for guests',
      'Professional AV equipment in every room',
      'Outdoor terrace available',
    ],
  },
  {
    name: 'WESPA Spaces',
    location: 'Zavrtnica, Zagreb',
    capacity: 'Up to 100 guests',
    description: 'A dynamic and contemporary venue at Zavrtnica. Perfect for creative events, startup launches, workshops, community meetups, and hybrid gatherings.',
    features: [
      'Open-plan layout with flexible configurations',
      'Built-in podcast and recording studio',
      'Catering by SPOT',
      'High-speed connectivity throughout',
      'Integrated live streaming infrastructure',
      'Collaborative breakout areas',
    ],
  },
]

const sharedAmenities = [
  'High-speed WiFi',
  'Professional sound systems',
  'HD projection & displays',
  'Customisable lighting',
  'Event coordination support',
  'Accessibility compliant',
  'On-site technical staff',
  'Branding & signage options',
]

export default function EventSpacesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <Image src="/images/events/spaces/venue-2.jpg" alt="WESPA event space" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="container-wespa relative z-10">
          <p className="text-wespa-red font-semibold mb-4">Events</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Event Spaces</h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
            Two distinctive venues in Zagreb, each offering a unique atmosphere and full-service event infrastructure for gatherings of every scale.
          </p>
        </div>
      </section>

      {/* Venues */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="space-y-12">
            {venues.map((venue) => (
              <div
                key={venue.name}
                className="p-8 md:p-10 bg-white border border-stone-200 rounded-2xl"
              >
                <div className="md:flex md:items-start md:justify-between md:gap-8 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-1">{venue.name}</h2>
                    <p className="text-stone-500">{venue.location}</p>
                  </div>
                  <span className="inline-block mt-3 md:mt-0 bg-stone-100 text-stone-700 font-semibold text-sm px-4 py-2 rounded-full">
                    {venue.capacity}
                  </span>
                </div>
                <p className="text-stone-600 mb-8 max-w-3xl">{venue.description}</p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {venue.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-sm text-stone-700">
                      <span className="text-wespa-red mt-0.5">&#10003;</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shared Amenities */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Standard Amenities</h2>
          <p className="text-stone-600 mb-10 max-w-2xl">
            Both venues include a comprehensive set of amenities to ensure your event runs smoothly.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {sharedAmenities.map((amenity) => (
              <div
                key={amenity}
                className="p-4 bg-white border border-stone-200 rounded-xl text-sm font-medium text-stone-700 text-center"
              >
                {amenity}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <h2 className="text-3xl font-bold text-center mb-10">Event Impressions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className={`relative overflow-hidden rounded-xl ${i === 1 ? 'col-span-2 row-span-2' : ''}`}>
                <div className={`relative ${i === 1 ? 'aspect-square' : 'aspect-[4/3]'}`}>
                  <Image src={`/images/events/spaces/venue-${i}.jpg`} alt={`Event venue ${i}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-wespa text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Book a Venue Tour</h2>
          <p className="text-stone-600 mb-8 max-w-xl mx-auto">
            Visit our spaces in person to see which venue is the perfect fit for your event. Our team will walk you through layout options and available services.
          </p>
          <Button variant="wespa" size="lg" asChild>
            <Link href="/contact">Schedule a Visit</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
