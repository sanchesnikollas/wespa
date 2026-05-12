'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Business & Lounge',
    breadcrumb: 'Home / Locations / Business & Lounge',
    title: 'The Premium WESPA Experience',
    subtitle: 'Exclusive business hub in the heart of Radnička.',
    aboutTitle: 'A Premium Address for Your Success: WESPA Business & Lounge',
    aboutP1: 'Establish your new base in the most prominent business complex on Radnička. Enjoy sophisticated interiors, premium service standards, and the discretion offered by our private offices and meeting rooms.',
    featuresTitle: "What's at Business & Lounge",
    features: [
      { title: 'Private Workspaces', description: 'Private workspaces and Office Zones tailored for established firms.' },
      { title: 'Business Lounge', description: 'An elegant setting for informal meetings and quiet work sessions.' },
      { title: 'Conference Venues', description: 'Enter, Shift, and Escape halls, along with the luxury Connect room for corporate events.' },
      { title: 'Flawless Service', description: 'Premium user experience with dedicated front desk and IT support.' },
      { title: 'On-site Dining', description: 'Access to SPOT Restaurant & Cafe and a spacious outdoor terrace.' },
    ],
    addressTitle: 'Address',
    addressName: 'WESPA Business & Lounge',
    addressBuilding: 'Green Gold Business Centre',
    addressStreet: 'Radnička cesta 50, Zagreb',
    addressNote: 'Please Note: At this location, we provide individual offices and team suites, while our coworking options (Fly Desk or Own Desk) are located at WESPA Spaces, Zavrtnica.',
    galleryTitle: 'Explore Business & Lounge',
    ctaTitle: 'See It for Yourself',
    ctaDesc: 'Book a tour of WESPA Business & Lounge and discover your next business address.',
    bookTour: 'Book a Tour',
  },
  hr: {
    pageTitle: 'Business & Lounge',
    breadcrumb: 'Početna / Lokacije / Business & Lounge',
    title: 'Premium WESPA iskustvo',
    subtitle: 'Ekskluzivni poslovni hub u srcu Radničke.',
    aboutTitle: 'Premium adresa za vaš uspjeh: WESPA Business & Lounge',
    aboutP1: 'Uspostavite svoju novu bazu u najistaknutijem poslovnom kompleksu na Radničkoj. Uživajte u sofisticiranim interijerima, premium standardima usluge i diskreciji koju nude naši privatni uredi i sobe za sastanke.',
    featuresTitle: 'Što vas čeka u Business & Lounge',
    features: [
      { title: 'Privatni radni prostori', description: 'Privatni radni prostori i Office Zones prilagođeni etabliranim tvrtkama.' },
      { title: 'Business Lounge', description: 'Elegantno okruženje za neformalne sastanke i tihe radne sesije.' },
      { title: 'Konferencijski prostori', description: 'Dvorane Enter, Shift i Escape te luksuzna Connect soba za korporativne događaje.' },
      { title: 'Besprijekorna usluga', description: 'Premium korisničko iskustvo s posvećenom recepcijom i IT podrškom.' },
      { title: 'Gastronomija na lokaciji', description: 'Pristup restoranu i kafiću SPOT te prostranoj vanjskoj terasi.' },
    ],
    addressTitle: 'Adresa',
    addressName: 'WESPA Business & Lounge',
    addressBuilding: 'Green Gold poslovni centar',
    addressStreet: 'Radnička cesta 50, Zagreb',
    addressNote: 'Napomena: Na ovoj lokaciji pružamo individualne urede i timske apartmane, dok se naše coworking opcije (Fly Desk ili Own Desk) nalaze u WESPA Spaces, Zavrtnica.',
    galleryTitle: 'Istražite Business & Lounge',
    ctaTitle: 'Uvjerite se sami',
    ctaDesc: 'Zakažite obilazak WESPA Business & Lounge i otkrijte svoju sljedeću poslovnu adresu.',
    bookTour: 'Zakažite obilazak',
  },
}

export default function BusinessLoungePage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/locations/business-lounge/lounge-2.jpg" alt="WESPA Business and Lounge" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/75" />
          <div className="container-wespa relative z-10">
            <p className="text-wespa-red font-medium mb-4">{c.breadcrumb}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.title}</h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
              {c.subtitle}
            </p>
          </div>
        </section>

        {/* About */}
        <section className="section-spacing">
          <div className="container-wespa">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
                {c.aboutTitle}
              </h2>
              <p className="text-lg text-stone-600">
                {c.aboutP1}
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <h2 className="text-3xl font-bold text-stone-900 mb-10">{c.featuresTitle}</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {c.features.map((f) => (
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
              <h2 className="text-3xl font-bold text-stone-900 mb-4">{c.addressTitle}</h2>
              <p className="text-lg text-stone-600 mb-1">{c.addressName}</p>
              <p className="text-lg text-stone-600 mb-1">{c.addressBuilding}</p>
              <p className="text-lg text-stone-900 font-semibold mb-6">{c.addressStreet}</p>
              <p className="text-stone-600 text-sm leading-relaxed border-l-2 border-wespa-red pl-4">
                {c.addressNote}
              </p>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <h2 className="text-3xl font-bold text-center mb-10">{c.galleryTitle}</h2>
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
              {c.ctaTitle}
            </h2>
            <p className="text-lg text-stone-300 mb-8 max-w-xl mx-auto">
              {c.ctaDesc}
            </p>
            <Button variant="wespa" size="lg" asChild>
              <Link href="/book-visit">{c.bookTour}</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
