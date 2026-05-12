'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Food',
    breadcrumb: 'Home / Food',
    title: 'Gastronomy at WESPA',
    subtitle: 'Two restaurants, two experiences. From community-driven daily menus to premium fine dining — fuel your workday with culinary excellence.',
    breakTitle: 'Everything you need for a quality break.',
    restaurants: [
      {
        title: 'Papel',
        subtitle: 'Community Restaurant',
        description: 'Our definition of a business lunch includes flawless service and culinary precision. Enjoy authentic flavors with attentive hospitality.',
        highlights: ['Daily Specials', 'A La Carte Menu', 'Nutritious Ingredients', 'Informal Meetings'],
        location: 'WESPA Business & Lounge, Green Gold',
        href: '/food/papel',
      },
      {
        title: 'SPOT',
        subtitle: 'Premium Business Dining',
        description: 'Premium business dining with fine dining standards and a curated wine list. SPOT delivers flawless service tailored to corporate expectations — the ideal setting for client dinners, celebrations, and executive gatherings.',
        highlights: ['Fine Dining', 'Curated Wine List', 'Corporate Standards', 'Flawless Service'],
        location: 'WESPA Urban Hub, Zavrtnica',
        href: '/food/spot',
      },
    ],
    galleryTitle: 'A Taste of WESPA',
    galleryDesc: 'From fine dining to casual business meals — culinary excellence at every turn.',
    ctaTitle: 'Hungry for More?',
    ctaDesc: 'WESPA members enjoy exclusive food discounts and priority reservations at both restaurants.',
    ctaButton: 'Make a Reservation',
  },
  hr: {
    pageTitle: 'Gastronomija',
    breadcrumb: 'Početna / Gastronomija',
    title: 'Gastronomija u WESPA',
    subtitle: 'Dva restorana, dva iskustva. Od dnevnih jelovnika zajednice do premium fine dininga — napunite radni dan gastronomskom izvrsnošću.',
    breakTitle: 'Sve što vam treba za kvalitetnu pauzu.',
    restaurants: [
      {
        title: 'Papel',
        subtitle: 'Restoran zajednice',
        description: 'Naša definicija poslovnog ručka uključuje besprijekornu uslugu i kulinarsku preciznost. Uživajte u autentičnim okusima uz pažljivu ugostiteljsku pažnju.',
        highlights: ['Dnevni specijaliteti', 'A la carte jelovnik', 'Nutritivni sastojci', 'Neformalni sastanci'],
        location: 'WESPA Business & Lounge, Green Gold',
        href: '/food/papel',
      },
      {
        title: 'SPOT',
        subtitle: 'Premium poslovna gastronomija',
        description: 'Premium poslovna gastronomija s fine dining standardima i kuratiranom vinskom kartom. SPOT pruža besprijekornu uslugu prilagođenu korporativnim očekivanjima — idealno okruženje za večere s klijentima, proslave i izvršna okupljanja.',
        highlights: ['Fine dining', 'Kuratirana vinska karta', 'Korporativni standardi', 'Besprijekorna usluga'],
        location: 'WESPA Urban Hub, Zavrtnica',
        href: '/food/spot',
      },
    ],
    galleryTitle: 'Okus WESPA',
    galleryDesc: 'Od fine dininga do ležernih poslovnih obroka — gastronomska izvrsnost na svakom koraku.',
    ctaTitle: 'Želite više?',
    ctaDesc: 'WESPA članovi uživaju ekskluzivne popuste na hranu i prioritetne rezervacije u oba restorana.',
    ctaButton: 'Rezervirajte stol',
  },
}

export default function FoodPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/food/papel/papel-1.jpg" alt="WESPA gastronomy" fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/75" />
          <div className="container-wespa relative z-10">
            <p className="text-wespa-red font-medium mb-4">{c.breadcrumb}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {c.title}
            </h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
              {c.subtitle}
            </p>
          </div>
        </section>

        {/* Restaurant Cards */}
        <section className="section-spacing">
          <div className="container-wespa">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-stone-900">{c.breakTitle}</h2>
            <div className="grid gap-10 md:grid-cols-2">
              {c.restaurants.map((r) => (
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

                  <p className="text-sm text-stone-600">{r.location}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Experience */}
        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{c.galleryTitle}</h2>
            <p className="text-stone-600 text-center max-w-2xl mx-auto mb-12">{c.galleryDesc}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
              {[
                '/images/food/papel/papel-1.jpg',
                '/images/food/spot/spot-3.jpg',
                '/images/food/papel/papel-5.jpg',
                '/images/food/spot/spot-5.jpg',
                '/images/food/papel/papel-9.jpg',
                '/images/food/spot/spot-7.jpg',
                '/images/food/papel/papel-11.jpg',
                '/images/food/spot/spot-9.jpg',
              ].map((src, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image src={src} alt="WESPA dining" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
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
              {/* TODO figma #120 — confirmar destino do botão "Make a Reservation" (form? email?). Hoje aponta pra /contact. */}
              <Link href="/contact?subject=reservation">{c.ctaButton}</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
