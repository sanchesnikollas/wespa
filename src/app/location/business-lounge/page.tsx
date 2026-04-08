import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'Business & Lounge — Green Gold | WESPA Locations',
  description: 'WESPA Business & Lounge at Green Gold, Radnicka cesta 52, Zagreb. Premium business center with exclusive offices, sophisticated atmosphere, and Papel restaurant.',
}

const features = [
  {
    title: 'Exclusive Offices',
    description: 'Private, fully equipped offices for teams that demand privacy, prestige, and a professional address.',
  },
  {
    title: 'Sophisticated Atmosphere',
    description: 'Elegantly designed interiors with premium finishes — a space that reflects the caliber of the businesses within it.',
  },
  {
    title: 'Papel Restaurant',
    description: 'On-site community restaurant serving premium daily specials and a la carte dining for tenants and visitors.',
  },
  {
    title: 'Executive Meeting Rooms',
    description: 'State-of-the-art meeting rooms with AV equipment, ideal for board meetings, client presentations, and negotiations.',
  },
  {
    title: 'Lounge & Networking',
    description: 'A curated lounge area designed for informal conversations, after-work relaxation, and community connection.',
  },
  {
    title: 'Premium Amenities',
    description: 'High-speed internet, concierge services, parking, and everything you need to operate at the highest level.',
  },
]

export default function BusinessLoungePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <Image src="/images/locations/business-lounge/lounge-2.jpg" alt="WESPA Business and Lounge" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="container-wespa relative z-10">
          <p className="text-wespa-red font-medium mb-4">Home / Locations / Business &amp; Lounge</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Business &amp; Lounge</h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
            A premium business center at Green Gold with exclusive offices, a sophisticated atmosphere, and Papel restaurant on-site.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
              The Premium WESPA Experience
            </h2>
            <p className="text-lg text-stone-600 mb-4">
              WESPA Business &amp; Lounge at Green Gold is where established businesses find their home. Every detail — from the refined interiors to the on-site dining — is designed to support professionals who operate at the highest level.
            </p>
            <p className="text-lg text-stone-600">
              Located at Radnicka cesta 52 in Zagreb, this flagship location brings together exclusive workspaces, premium hospitality, and a vibrant business community under one roof.
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
            <p className="text-lg text-stone-600 mb-1">WESPA Business &amp; Lounge</p>
            <p className="text-lg text-stone-600 mb-1">Green Gold Business Centre</p>
            <p className="text-lg text-stone-900 font-semibold">Radnicka cesta 52, Zagreb</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <h2 className="text-3xl font-bold text-center mb-10">Explore Business & Lounge</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={`/images/locations/business-lounge/lounge-${i}.jpg`}
                  alt={`Business & Lounge ${i}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-stone-900 text-white">
        <div className="container-wespa text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See It for Yourself
          </h2>
          <p className="text-lg text-stone-300 mb-8 max-w-xl mx-auto">
            Book a tour of WESPA Business &amp; Lounge and discover your next business address.
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
