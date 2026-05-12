'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'SPOT Restaurant',
    breadcrumb: 'Home / Food / SPOT',
    title: 'Business-class dining',
    subtitle: 'A premium business restaurant in the Green Gold center featuring top-tier daily menu, a la carte service and a curated wine list. Our definition of a business lunch includes flawless service and culinary precision. Enjoy authentic flavors within an elegant setting that fully meets corporate standards.',
    galleryTitle: 'The SPOT Experience',
    featuresTitle: 'The SPOT Standard',
    features: [
      { title: 'Curated Wine List', description: 'An expertly assembled selection of wines from renowned vineyards — chosen to complement every course and occasion.' },
      { title: 'Corporate Standards', description: 'From executive lunches to client dinners, SPOT meets the expectations of the most discerning business professionals.' },
      { title: 'Flawless Service', description: 'Attentive, discreet, and impeccable. Our team ensures every detail is handled so you can focus on what matters.' },
    ],
    findUs: 'Find Us',
    findUsLocation: 'WESPA Spaces — Urban Hub',
    findUsAddress: 'Heinzelova ulica 60, Zagreb',
    ctaTitle: 'Experience SPOT',
    ctaDesc: 'Reserve your table and discover premium business dining at its finest.',
    reserveTable: 'Make a reservation',
  },
  hr: {
    pageTitle: 'Restoran SPOT',
    breadcrumb: 'Početna / Gastronomija / SPOT',
    title: 'Gastronomija s poslovnim potpisom',
    subtitle: 'Premium restoran u Green Gold centru s vrhunskim dnevnim menijem, a la carte uslugom i probranom vinskom kartom. Naša definicija poslovnog ručka uključuje besprijekornu uslugu i kulinarsku preciznost. Uživajte u autentičnim okusima u elegantnom ambijentu koji u potpunosti zadovoljava korporativne standarde.',
    galleryTitle: 'SPOT iskustvo',
    featuresTitle: 'SPOT standard',
    features: [
      { title: 'Kuratirana vinska karta', description: 'Stručno sastavljen izbor vina iz renomiranih vinograda — odabran da nadopuni svaki gang i priliku.' },
      { title: 'Korporativni standardi', description: 'Od izvršnih ručkova do večera s klijentima, SPOT zadovoljava očekivanja najzahtjevnijih poslovnih profesionalaca.' },
      { title: 'Besprijekorna usluga', description: 'Pažljiva, diskretna i besprijekorna. Naš tim osigurava da je svaki detalj zbrinut kako biste se vi mogli fokusirati na ono što je važno.' },
    ],
    findUs: 'Pronađite nas',
    findUsLocation: 'WESPA Spaces — Urban Hub',
    findUsAddress: 'Heinzelova ulica 60, Zagreb',
    ctaTitle: 'Doživite SPOT',
    ctaDesc: 'Rezervirajte stol i otkrijte premium poslovnu gastronomiju u njenom najboljem izdanju.',
    reserveTable: 'Napravite rezervaciju',
  },
}

export default function SpotPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/food/spot/spot-1.jpg" alt="SPOT restaurant" fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/75" />
          <div className="container-wespa relative z-10">
            <p className="text-wespa-red font-medium mb-4">{c.breadcrumb}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.title}</h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
              {c.subtitle}
            </p>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <h2 className="text-3xl font-bold text-center mb-10">{c.galleryTitle}</h2>
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
            <h2 className="text-3xl font-bold text-stone-900 mb-10">{c.featuresTitle}</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {c.features.map((f) => (
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
              <h2 className="text-3xl font-bold text-stone-900 mb-4">{c.findUs}</h2>
              <p className="text-lg text-stone-600 mb-2">
                {c.findUsLocation}
              </p>
              <p className="text-stone-600">{c.findUsAddress}</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-spacing bg-stone-900 text-white">
          <div className="container-wespa text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {c.ctaTitle}
            </h2>
            <p className="text-lg text-stone-300 mb-8 max-w-xl mx-auto">
              {c.ctaDesc}
            </p>
            <Button variant="wespa" size="lg">
              {c.reserveTable}
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
