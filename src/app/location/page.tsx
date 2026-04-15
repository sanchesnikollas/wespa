'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Locations',
    breadcrumb: 'Home / Locations',
    title: 'Our Locations',
    subtitle: 'Two distinct locations in Zagreb, each with its own character and purpose. Find the WESPA space that fits your work style.',
    locations: [
      {
        title: 'Business & Lounge',
        subtitle: 'Green Gold',
        address: 'Radnička cesta 50, Zagreb',
        description: 'A premium business center with exclusive offices and a sophisticated atmosphere. Home to Papel restaurant and the WESPA lounge experience. Designed for established businesses and professionals who demand excellence.',
        highlights: ['Premium Offices', 'Papel Restaurant', 'Executive Lounge', 'Meeting Rooms'],
        href: '/location/business-lounge',
      },
      {
        title: 'Urban Hub',
        subtitle: 'Zavrtnica',
        address: 'Heinzelova ulica 60, Zagreb',
        description: 'Industrial charm meets modern innovation. A startup hub and coworking space with SPOT restaurant on-site. Built for creative teams, entrepreneurs, and the WESPA community at large.',
        highlights: ['Coworking Spaces', 'SPOT Restaurant', 'Startup Hub', 'Creative Community'],
        href: '/location/urban-hub',
      },
    ],
    ctaTitle: 'Visit Us In Person',
    ctaDesc: 'See the spaces for yourself. Book a guided tour of either location and find your perfect workspace.',
    ctaButton: 'Book a Tour',
  },
  hr: {
    pageTitle: 'Lokacije',
    breadcrumb: 'Početna / Lokacije',
    title: 'Naše lokacije',
    subtitle: 'Dvije jedinstvene lokacije u Zagrebu, svaka sa svojim karakterom i svrhom. Pronađite WESPA prostor koji odgovara vašem stilu rada.',
    locations: [
      {
        title: 'Business & Lounge',
        subtitle: 'Green Gold',
        address: 'Radnička cesta 50, Zagreb',
        description: 'Premium poslovni centar s ekskluzivnim uredima i sofisticiranom atmosferom. Dom restorana Papel i WESPA lounge iskustva. Dizajniran za etablirane tvrtke i profesionalce koji traže izvrsnost.',
        highlights: ['Premium uredi', 'Restoran Papel', 'Izvršni lounge', 'Sobe za sastanke'],
        href: '/location/business-lounge',
      },
      {
        title: 'Urban Hub',
        subtitle: 'Zavrtnica',
        address: 'Heinzelova ulica 60, Zagreb',
        description: 'Industrijski šarm susreće modernu inovaciju. Startup hub i coworking prostor s restoranom SPOT na lokaciji. Izgrađen za kreativne timove, poduzetnike i širu WESPA zajednicu.',
        highlights: ['Coworking prostori', 'Restoran SPOT', 'Startup hub', 'Kreativna zajednica'],
        href: '/location/urban-hub',
      },
    ],
    ctaTitle: 'Posjetite nas osobno',
    ctaDesc: 'Pogledajte prostore sami. Zakažite vođeni obilazak bilo koje lokacije i pronađite savršen radni prostor.',
    ctaButton: 'Zakažite obilazak',
  },
}

export default function LocationPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <title>{c.pageTitle} | WESPA</title>
      <meta name="description" content={c.subtitle} />
      <main>
        {/* Hero */}
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/locations/business-lounge/lounge-1.jpg" alt="WESPA locations" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/75" />
          <div className="container-wespa relative z-10">
            <p className="text-wespa-red font-medium mb-4">{c.breadcrumb}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.title}</h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
              {c.subtitle}
            </p>
          </div>
        </section>

        {/* Location Cards */}
        <section className="section-spacing">
          <div className="container-wespa">
            <div className="grid gap-10 md:grid-cols-2">
              {c.locations.map((loc) => (
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
              {c.ctaTitle}
            </h2>
            <p className="text-lg text-stone-600 mb-8 max-w-xl mx-auto">
              {c.ctaDesc}
            </p>
            <Button variant="wespa" size="lg" asChild>
              <Link href="/book-visit">{c.ctaButton}</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
