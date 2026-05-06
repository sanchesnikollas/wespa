'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Business & Lounge',
    breadcrumb: 'Home / Locations / Business & Lounge',
    title: 'A Premium Address for Your Success: WESPA Business & Lounge',
    subtitle: 'Establish your new base in the most prominent business complex on Radnička. Enjoy sophisticated interior, premium amenities, and an unparalleled location.',
    aboutTitle: 'The Premium WESPA Experience',
    aboutP1: 'WESPA Business & Lounge at Green Gold is where established businesses find their home. Every detail — from the refined interiors to the on-site dining — is designed to support professionals who operate at the highest level.',
    aboutP2: 'Located at Radnička cesta 50 in Zagreb, this flagship location brings together exclusive workspaces, premium hospitality, and a vibrant business community under one roof.',
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
    galleryTitle: 'Explore Business & Lounge',
    ctaTitle: 'See It for Yourself',
    ctaDesc: 'Book a tour of WESPA Business & Lounge and discover your next business address.',
    bookTour: 'Book a Tour',
    allLocations: 'All Locations',
  },
  hr: {
    pageTitle: 'Business & Lounge',
    breadcrumb: 'Početna / Lokacije / Business & Lounge',
    title: 'Premium adresa za vaš uspjeh: WESPA Business & Lounge',
    subtitle: 'Uspostavite svoju novu bazu u najistaknutijem poslovnom kompleksu na Radničkoj. Uživajte u sofisticiranom interijeru, premium pogodnostima i neusporedivoj lokaciji.',
    aboutTitle: 'Premium WESPA iskustvo',
    aboutP1: 'WESPA Business & Lounge u Green Goldu je mjesto gdje etablirane tvrtke pronalaze svoj dom. Svaki detalj — od rafiniranjih interijera do gastronomije na lokaciji — dizajniran je za podršku profesionalcima koji posluju na najvišoj razini.',
    aboutP2: 'Smješten na Radničkoj cesti 50 u Zagrebu, ova vodeća lokacija spaja ekskluzivne radne prostore, premium ugostiteljstvo i živahnu poslovnu zajednicu pod jednim krovom.',
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
    galleryTitle: 'Istražite Business & Lounge',
    ctaTitle: 'Uvjerite se sami',
    ctaDesc: 'Zakažite obilazak WESPA Business & Lounge i otkrijte svoju sljedeću poslovnu adresu.',
    bookTour: 'Zakažite obilazak',
    allLocations: 'Sve lokacije',
  },
}

export default function BusinessLoungePage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <title>{c.pageTitle} | WESPA</title>
      <meta name="description" content={c.subtitle} />
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
              <p className="text-lg text-stone-600 mb-4">
                {c.aboutP1}
              </p>
              <p className="text-lg text-stone-600">
                {c.aboutP2}
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
              <p className="text-lg text-stone-900 font-semibold">{c.addressStreet}</p>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="wespa" size="lg" asChild>
                <Link href="/book-visit">{c.bookTour}</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/location">{c.allLocations}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
