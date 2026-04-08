import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'Food | WESPA',
  description: 'Explore WESPA dining — Papel community restaurant at Green Gold and SPOT premium business dining at Zavrtnica. Culinary excellence for every occasion.',
}

const restaurants = [
  {
    title: 'Papel',
    subtitle: 'Community Restaurant',
    description:
      'A community restaurant built for the modern business pace. Enjoy premium daily specials and a la carte dishes crafted from nutritious, locally sourced ingredients. Perfect for informal meetings, business lunches, or a quick midday recharge.',
    highlights: ['Daily Specials', 'A La Carte Menu', 'Nutritious Ingredients', 'Informal Meetings'],
    location: 'WESPA Business & Lounge, Green Gold',
    href: '/food/papel',
  },
  {
    title: 'SPOT',
    subtitle: 'Premium Business Dining',
    description:
      'Premium business dining with fine dining standards and a curated wine list. SPOT delivers flawless service tailored to corporate expectations — the ideal setting for client dinners, celebrations, and executive gatherings.',
    highlights: ['Fine Dining', 'Curated Wine List', 'Corporate Standards', 'Flawless Service'],
    location: 'WESPA Urban Hub, Zavrtnica',
    href: '/food/spot',
  },
]

export default function FoodPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <Image src="/images/food/papel/papel-1.jpg" alt="WESPA gastronomy" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="container-wespa relative z-10">
          <p className="text-wespa-red font-medium mb-4">Home / Food</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Gastronomy at WESPA
          </h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
            Two restaurants, two experiences. From community-driven daily menus to premium fine dining — fuel your workday with culinary excellence.
          </p>
        </div>
      </section>

      {/* Restaurant Cards */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="grid gap-10 md:grid-cols-2">
            {restaurants.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group block p-8 bg-white border border-stone-200 rounded-2xl hover:shadow-lg hover:border-stone-300 transition-all"
              >
                <p className="text-sm font-medium text-wespa-red uppercase tracking-wider mb-2">
                  {r.subtitle}
                </p>
                <h2 className="text-3xl font-bold text-stone-900 mb-4 group-hover:text-wespa-red transition-colors">
                  {r.title}
                </h2>
                <p className="text-stone-600 mb-6">{r.description}</p>

                <ul className="grid grid-cols-2 gap-3 mb-6">
                  {r.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-wespa-red shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <p className="text-sm text-stone-500">{r.location}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Hungry for More?
          </h2>
          <p className="text-lg text-stone-600 mb-8 max-w-xl mx-auto">
            WESPA members enjoy exclusive food discounts and priority reservations at both restaurants.
          </p>
          <Button variant="wespa" size="lg" asChild>
            <Link href="/book-visit">Book a Visit</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
