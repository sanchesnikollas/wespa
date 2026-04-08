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
    aboutTitle: 'Where Ideas Come to Life',
    aboutP1: 'WESPA Urban Hub at Zavrtnica is the antidote to the corporate office. It is a space where raw creativity meets modern infrastructure — where startups launch, freelancers find their tribe, and ideas turn into ventures.',
    aboutP2: 'The industrial character of the building is not just aesthetic — it is a mindset. Open, honest, and built for people who are making things happen.',
    featuresTitle: 'What You Will Find Here',
    features: [
      { title: 'Industrial Charm', description: 'Raw concrete, exposed brick, and open ceilings create an atmosphere that sparks creativity and bold thinking.' },
      { title: 'Startup Hub', description: 'Purpose-built for startups and scale-ups. Flexible terms, collaborative spaces, and a network of founders who get it.' },
      { title: 'Coworking Spaces', description: 'Flexible desks and dedicated workstations for freelancers, remote workers, and small teams who thrive in community.' },
      { title: 'SPOT Restaurant', description: 'On-site premium dining for tenants and visitors. Fine dining with a curated wine list, right where you work.' },
      { title: 'Creative Community', description: 'Designers, developers, marketers, and entrepreneurs — a diverse mix of talent that makes Zavrtnica buzz with energy.' },
      { title: 'Event & Podcast Spaces', description: 'Dedicated areas for workshops, meetups, podcast recordings, and community events.' },
    ],
    addressTitle: 'Address',
    addressName: 'WESPA Urban Hub',
    addressStreet: 'Zavrtnica 17, Zagreb',
    galleryTitle: 'Explore Urban Hub',
    ctaTitle: 'Join the Community',
    ctaDesc: 'Book a tour of WESPA Urban Hub and see why Zavrtnica is Zagreb\'s most exciting business address.',
    bookTour: 'Book a Tour',
    allLocations: 'All Locations',
  },
  hr: {
    pageTitle: 'Urban Hub',
    breadcrumb: 'Početna / Lokacije / Urban Hub',
    title: 'WESPA Spaces',
    subtitle: 'Autentičan industrijski prostor za timove koji stvaraju budućnost.',
    aboutTitle: 'Gdje ideje dobivaju život',
    aboutP1: 'WESPA Urban Hub na Zavrtnici je protuteža korporativnom uredu. To je prostor gdje se sirova kreativnost susreće s modernom infrastrukturom — gdje startupovi nastaju, freelanceri pronalaze svoje pleme, a ideje se pretvaraju u pothvate.',
    aboutP2: 'Industrijski karakter zgrade nije samo estetika — to je način razmišljanja. Otvoren, iskren i izgrađen za ljude koji stvaraju promjene.',
    featuresTitle: 'Što ćete ovdje pronaći',
    features: [
      { title: 'Industrijski šarm', description: 'Sirovi beton, vidljiva cigla i otvoreni stropovi stvaraju atmosferu koja potiče kreativnost i hrabro razmišljanje.' },
      { title: 'Startup hub', description: 'Namjenski izgrađen za startupove i scale-upove. Fleksibilni uvjeti, kolaborativni prostori i mreža osnivača koji razumiju.' },
      { title: 'Coworking prostori', description: 'Fleksibilni stolovi i dodijeljene radne stanice za freelancere, remote radnike i male timove koji napreduju u zajednici.' },
      { title: 'Restoran SPOT', description: 'Premium gastronomija na lokaciji za stanare i posjetitelje. Fine dining s kuratiranom vinskom kartom, upravo tamo gdje radite.' },
      { title: 'Kreativna zajednica', description: 'Dizajneri, programeri, marketinški stručnjaci i poduzetnici — raznolik spoj talenata koji Zavrtnici daje energiju.' },
      { title: 'Prostori za događanja i podcast', description: 'Namjenski prostori za radionice, meetupove, snimanja podcasta i događanja zajednice.' },
    ],
    addressTitle: 'Adresa',
    addressName: 'WESPA Urban Hub',
    addressStreet: 'Zavrtnica 17, Zagreb',
    galleryTitle: 'Istražite Urban Hub',
    ctaTitle: 'Pridružite se zajednici',
    ctaDesc: 'Zakažite obilazak WESPA Urban Huba i saznajte zašto je Zavrtnica najuzbudljivija poslovna adresa u Zagrebu.',
    bookTour: 'Zakažite obilazak',
    allLocations: 'Sve lokacije',
  },
}

export default function UrbanHubPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <title>{c.pageTitle} | WESPA</title>
      <meta name="description" content={c.subtitle} />
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
