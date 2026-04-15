'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Business & Lounge',
    breadcrumb: 'Home / Locations / Business & Lounge',
    title: 'WESPA Business & Lounge',
    subtitle: 'Exclusive business hub in the heart of Radnička.',
    aboutTitle: 'The Premium WESPA Experience',
    aboutP1: 'WESPA Business & Lounge at Green Gold is where established businesses find their home. Every detail — from the refined interiors to the on-site dining — is designed to support professionals who operate at the highest level.',
    aboutP2: 'Located at Radnička cesta 50 in Zagreb, this flagship location brings together exclusive workspaces, premium hospitality, and a vibrant business community under one roof.',
    featuresTitle: 'What You Will Find Here',
    features: [
      { title: 'Exclusive Offices', description: 'Private, fully equipped offices for teams that demand privacy, prestige, and a professional address.' },
      { title: 'Sophisticated Atmosphere', description: 'Elegantly designed interiors with premium finishes — a space that reflects the caliber of the businesses within it.' },
      { title: 'Papel Restaurant', description: 'On-site community restaurant serving premium daily specials and a la carte dining for tenants and visitors.' },
      { title: 'Executive Meeting Rooms', description: 'State-of-the-art meeting rooms with AV equipment, ideal for board meetings, client presentations, and negotiations.' },
      { title: 'Lounge & Networking', description: 'A curated lounge area designed for informal conversations, after-work relaxation, and community connection.' },
      { title: 'Premium Amenities', description: 'High-speed internet, concierge services, parking, and everything you need to operate at the highest level.' },
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
    title: 'WESPA Business & Lounge',
    subtitle: 'Ekskluzivni poslovni centar u srcu Radničke.',
    aboutTitle: 'Premium WESPA iskustvo',
    aboutP1: 'WESPA Business & Lounge u Green Goldu je mjesto gdje etablirane tvrtke pronalaze svoj dom. Svaki detalj — od rafiniranjih interijera do gastronomije na lokaciji — dizajniran je za podršku profesionalcima koji posluju na najvišoj razini.',
    aboutP2: 'Smješten na Radničkoj cesti 52 u Zagrebu, ova vodeća lokacija spaja ekskluzivne radne prostore, premium ugostiteljstvo i živahnu poslovnu zajednicu pod jednim krovom.',
    featuresTitle: 'Što ćete ovdje pronaći',
    features: [
      { title: 'Ekskluzivni uredi', description: 'Privatni, potpuno opremljeni uredi za timove koji traže privatnost, prestiž i profesionalnu adresu.' },
      { title: 'Sofisticirana atmosfera', description: 'Elegantno dizajnirani interijeri s premium završnim obradama — prostor koji odražava kalibar tvrtki u njemu.' },
      { title: 'Restoran Papel', description: 'Restoran zajednice na lokaciji koji služi premium dnevne specijalitete i a la carte jelovnik za stanare i posjetitelje.' },
      { title: 'Izvršne sobe za sastanke', description: 'Najsuvremenije sobe za sastanke s AV opremom, idealne za sastanke uprave, prezentacije klijentima i pregovore.' },
      { title: 'Lounge i networking', description: 'Kuratiran lounge prostor dizajniran za neformalne razgovore, opuštanje nakon posla i povezivanje zajednice.' },
      { title: 'Premium pogodnosti', description: 'Brzi internet, concierge usluge, parking i sve što vam treba za poslovanje na najvišoj razini.' },
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
