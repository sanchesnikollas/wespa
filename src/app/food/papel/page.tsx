import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'Papel Restaurant | WESPA Food',
  description: 'Papel is WESPA\'s community restaurant at Green Gold — premium daily specials, a la carte dining, and nutritious ingredients crafted for the modern business pace.',
}

const features = [
  {
    title: 'Daily Specials',
    description: 'A rotating menu of freshly prepared dishes using seasonal, locally sourced ingredients. New flavors every day.',
  },
  {
    title: 'A La Carte Menu',
    description: 'A carefully curated selection of dishes for when you want to choose exactly what you crave.',
  },
  {
    title: 'Nutritious Ingredients',
    description: 'Every dish is designed to fuel your productivity — balanced, wholesome, and delicious.',
  },
  {
    title: 'Business-Friendly Atmosphere',
    description: 'Ideal for informal meetings, business lunches, or a quick recharge between sessions.',
  },
]

export default function PapelPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <Image src="/images/food/papel/papel-2.jpg" alt="Papel restaurant" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="container-wespa relative z-10">
          <p className="text-wespa-red font-medium mb-4">Home / Food / Papel</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Papel</h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
            A community restaurant built for the modern business pace. Premium daily specials and a la carte dining at WESPA Business &amp; Lounge, Green Gold.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
              Your Daily Dining Companion
            </h2>
            <p className="text-lg text-stone-600 mb-4">
              Papel is more than a lunch spot — it is the heartbeat of the WESPA community. Designed for professionals who value quality without compromise, our kitchen serves dishes that are nutritious, flavorful, and ready when you are.
            </p>
            <p className="text-lg text-stone-600">
              Whether you are catching up with a colleague over daily specials or hosting an informal meeting over an a la carte lunch, Papel offers the perfect balance of convenience and quality.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <h2 className="text-3xl font-bold text-stone-900 mb-10">What Makes Papel Special</h2>
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
              WESPA Business &amp; Lounge, Green Gold
            </p>
            <p className="text-stone-500">Radnicka cesta 52, Zagreb</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-stone-900 text-white">
        <div className="container-wespa text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Try Papel?
          </h2>
          <p className="text-lg text-stone-300 mb-8 max-w-xl mx-auto">
            Reserve your table and discover a dining experience designed for the modern professional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="wespa" size="lg">
              Book a Table
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
