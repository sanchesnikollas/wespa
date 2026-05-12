'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Urban Hub',
    breadcrumb: 'Home / Locations / Urban Hub',
    title: 'WESPA Spaces',
    subtitle: 'An authentic industrial setting for teams building the future.',
    introTitle: 'Where ideas come to life',
    introBody: 'Step into the space that has become the heart of Zagreb’s startup culture. Whether you need a spot in the coworking, a private office that grows with you, a conference center, or relax & play zones — WESPA Spaces brings it all together.',
    featuresTitle: 'What You Will Find Here',
    features: [
      { title: 'The Premier Coworking HUB', description: 'A vast zone featuring Fly Desk and Own Desk workstations optimized for your rhythm of work.' },
      { title: 'Offices for Scaling Teams', description: 'Fully furnished, move-in-ready private spaces that grow along with your business.' },
      { title: 'Conference Center', description: 'Indigo, Incubator, Bond, and Brain Gym halls, fully equipped for workshops, lectures, and presentations.' },
      { title: 'Break & Chill', description: 'Relax & play zones, a spacious outdoor terrace, and on-site Restaurant Papel.' },
      { title: 'The Power of Community', description: 'Regular networking events and gatherings that foster collaboration among innovative teams.' },
    ],
    addressTitle: 'Address',
    addressName: 'WESPA Urban Hub',
    addressStreet: 'Heinzelova ulica 60, Zagreb',
    galleryTitle: 'Explore Urban Hub',
    ctaTitle: 'Join the Community',
    ctaDesc: 'Book a tour of WESPA Urban Hub and see why Zavrtnica is Zagreb\'s most exciting business address.',
    bookTour: 'Book a Tour',
  },
  hr: {
    pageTitle: 'Urban Hub',
    breadcrumb: 'Početna / Lokacije / Urban Hub',
    title: 'WESPA Spaces',
    subtitle: 'Autentičan industrijski ambijent za timove koji grade budućnost.',
    introTitle: 'Gdje ideje oživljavaju',
    introBody: 'Uđite u prostor koji je postao srce zagrebačke startup kulture. Bilo da trebate mjesto u coworkingu, privatni ured koji raste s vama, konferencijski centar ili relax & play zone — WESPA Spaces spaja sve na jednom mjestu.',
    featuresTitle: 'Što ćete ovdje pronaći',
    features: [
      { title: 'Premier Coworking HUB', description: 'Prostrana zona s Fly Desk i Own Desk radnim stanicama optimiziranim za vaš ritam rada.' },
      { title: 'Uredi za timove u rastu', description: 'Potpuno opremljeni, spremni za useljenje privatni prostori koji rastu zajedno s vašim poslovanjem.' },
      { title: 'Konferencijski centar', description: 'Dvorane Indigo, Incubator, Bond i Brain Gym, potpuno opremljene za radionice, predavanja i prezentacije.' },
      { title: 'Break & Chill', description: 'Relax & play zone, prostrana vanjska terasa i Restoran Papel na lokaciji.' },
      { title: 'Snaga zajednice', description: 'Redovita networking događanja i okupljanja koja potiču suradnju među inovativnim timovima.' },
    ],
    addressTitle: 'Adresa',
    addressName: 'WESPA Urban Hub',
    addressStreet: 'Heinzelova ulica 60, Zagreb',
    galleryTitle: 'Istražite Urban Hub',
    ctaTitle: 'Pridružite se zajednici',
    ctaDesc: 'Zakažite obilazak WESPA Urban Huba i saznajte zašto je Zavrtnica najuzbudljivija poslovna adresa u Zagrebu.',
    bookTour: 'Zakažite obilazak',
  },
}

export default function UrbanHubPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/locations/urban-hub/urban-hub-1.jpg" alt="WESPA Urban Hub" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/75" />
          <div className="container-wespa relative z-10">
            <p className="text-wespa-red font-medium mb-4">{c.breadcrumb}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.title}</h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
              {c.subtitle}
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="section-spacing">
          <div className="container-wespa">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
                {c.introTitle}
              </h2>
              <p className="text-lg text-stone-600">
                {c.introBody}
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
                    src={`/images/locations/urban-hub/urban-hub-${i}.jpg`}
                    alt={`Urban Hub ${i}`}
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
