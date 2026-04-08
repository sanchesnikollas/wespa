import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'SPOT Restaurant | WESPA Food',
  description: 'SPOT is WESPA\'s premium business dining destination — fine dining, curated wine list, and flawless service at corporate standards in Zagreb.',
}

const features = [
  {
    title: 'Fine Dining Experience',
    description: 'Meticulously crafted dishes that blend global culinary traditions with local excellence. Every plate is a statement.',
  },
  {
    title: 'Curated Wine List',
    description: 'An expertly assembled selection of wines from renowned vineyards — chosen to complement every course and occasion.',
  },
  {
    title: 'Corporate Standards',
    description: 'From executive lunches to client dinners, SPOT meets the expectations of the most discerning business professionals.',
  },
  {
    title: 'Flawless Service',
    description: 'Attentive, discreet, and impeccable. Our team ensures every detail is handled so you can focus on what matters.',
  },
]

export default function SpotPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <Image src="/images/food/spot/spot-1.jpg" alt="SPOT restaurant" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="container-wespa relative z-10">
          <p className="text-wespa-red font-medium mb-4">Home / Food / SPOT</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">SPOT</h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
            Premium business dining with fine dining standards, a curated wine list, and flawless service tailored to corporate expectations.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
              Where Business Meets Culinary Art
            </h2>
            <p className="text-lg text-stone-600 mb-4">
              SPOT redefines business dining in Zagreb. This is not just a restaurant — it is a venue where important conversations happen, partnerships are forged, and milestones are celebrated over exceptional food.
            </p>
            <p className="text-lg text-stone-600">
              With a kitchen driven by precision and creativity, SPOT delivers an experience that meets and exceeds the standards expected by corporate leaders and discerning diners alike.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <h2 className="text-3xl font-bold text-center mb-10">The SPOT Experience</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
            {[1, 3, 4, 5, 9, 10, 11, 12].map((i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={`/images/food/spot/spot-${i}.jpg`}
                  alt={`SPOT restaurant ${i}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <h2 className="text-3xl font-bold text-stone-900 mb-10">The SPOT Standard</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="p-6 bg-white border border-stone-200 rounded-2xl">
                <h3 className="text-xl font-bold text-stone-900 mb-3">{f.title}</h3>
                <p className="text-stone-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Find Us</h2>
            <p className="text-lg text-stone-600 mb-2">
              WESPA Urban Hub, Green Gold
            </p>
            <p className="text-stone-500">Radnicka cesta 52, Zagreb</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-stone-900 text-white">
        <div className="container-wespa text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience SPOT
          </h2>
          <p className="text-lg text-stone-300 mb-8 max-w-xl mx-auto">
            Reserve your table and discover premium business dining at its finest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="wespa" size="lg">
              Reserve a Table
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/food">Back to Food</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
