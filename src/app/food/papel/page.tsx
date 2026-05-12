'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Papel Restaurant',
    breadcrumb: 'Home / Food / Papel',
    title: 'The gastro hub for your workday',
    subtitle: 'Everything you need for a quality break. A relaxed community restaurant tailored to the pace of modern business. Choose from premium daily specials and an a la carte menu made with nutrient-rich ingredients.',
    galleryTitle: 'The Papel Experience',
    featuresTitle: 'What Makes Papel Special',
    features: [
      { title: 'A La Carte Menu', description: 'A carefully curated selection of dishes for when you want to choose exactly what you crave.' },
      { title: 'Nutritious Ingredients', description: 'Every dish is designed to fuel your productivity — balanced, wholesome, and delicious.' },
      { title: 'Business-Friendly Atmosphere', description: 'Ideal for informal meetings, business lunches, or a quick recharge between sessions.' },
    ],
    findUs: 'Find Us',
    findUsLocation: 'WESPA Business & Lounge, Green Gold',
    findUsAddress: 'Radnička cesta 50, Zagreb',
    ctaTitle: 'Ready to Try Papel?',
    ctaDesc: 'Reserve your table and discover a dining experience designed for the modern professional.',
    bookTable: 'Make a Reservation',
  },
  hr: {
    pageTitle: 'Restoran Papel',
    breadcrumb: 'Početna / Gastronomija / Papel',
    title: 'Gastro baza vašeg radnog dana',
    subtitle: 'Sve što trebate za kvalitetnu pauzu. Opušteni community restoran prilagođen tempu suvremenog poslovanja. Birajte između vrhunskih dnevnih i a la carte jela od nutritivno bogatih namirnica.',
    galleryTitle: 'Papel iskustvo',
    featuresTitle: 'Što čini Papel posebnim',
    features: [
      { title: 'A la carte jelovnik', description: 'Pažljivo kuratiran izbor jela za trenutke kada želite odabrati točno ono što želite.' },
      { title: 'Nutritivni sastojci', description: 'Svako jelo dizajnirano je da potakne vašu produktivnost — uravnoteženo, zdravo i ukusno.' },
      { title: 'Poslovno ugodna atmosfera', description: 'Idealno za neformalne sastanke, poslovne ručkove ili brzo punjenje baterija između sesija.' },
    ],
    findUs: 'Pronađite nas',
    findUsLocation: 'WESPA Business & Lounge, Green Gold',
    findUsAddress: 'Radnička cesta 50, Zagreb',
    ctaTitle: 'Spremni probati Papel?',
    ctaDesc: 'Rezervirajte stol i otkrijte gastronomsko iskustvo dizajnirano za modernog profesionalca.',
    bookTable: 'Napravite rezervaciju',
  },
}

export default function PapelPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/food/papel/papel-2.jpg" alt="Papel restaurant" fill sizes="100vw" className="object-cover" priority />
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
                    src={`/images/food/papel/papel-${i}.jpg`}
                    alt={`Papel restaurant ${i}`}
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
              {c.bookTable}
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
