'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Conference Rooms',
    breadcrumb: 'Workspaces',
    title: 'WESPA Conference Rooms',
    subtitle: 'Choose a setting that matches your plans. Spaces equipped with high-end technology.',
    divisible: 'Divisible',
    galleryTitle: 'Our Conference Spaces',
    bookRoom: 'Book a Conference Room',
  },
  hr: {
    pageTitle: 'Konferencijske dvorane',
    breadcrumb: 'Prostori',
    title: 'WESPA konferencijski prostori',
    subtitle: 'Odaberite ambijent koji prati Vaše planove. Prostor opremljen vrhunskom tehnologijom.',
    divisible: 'Djeljivo',
    galleryTitle: 'Naši konferencijski prostori',
    bookRoom: 'Rezervirajte konferencijsku dvoranu',
  },
}

const rooms = [
  { name: 'INDIGO', location: 'Zavrtnica', area: '130m²', price: '€90/hr' },
  { name: 'INCUBATOR', location: 'Zavrtnica', area: '70m²', price: '€67/hr' },
  { name: 'BOND', location: 'Zavrtnica', area: '63m²', price: '€65/hr' },
  { name: 'BRAIN GYM', location: 'Zavrtnica', area: '38m²', price: '€47/hr' },
  { name: 'ENTER', location: 'Green Gold', area: '170m²', price: '€113-180/hr', note: true },
  { name: 'SHIFT', location: 'Green Gold', area: '110m²', price: '€120/hr' },
  { name: 'ESCAPE', location: 'Green Gold', area: '43m²', price: '€57/hr' },
  { name: 'CONNECT', location: 'Green Gold', area: '26m²', price: '€49/hr' },
]

export default function ConferenceRoomsPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <title>{c.pageTitle} | WESPA</title>
      <meta name="description" content={c.subtitle} />
      <main>
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/workspaces/meeting-rooms/meeting-room-2.jpg" alt="WESPA conference rooms" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/75" />
          <div className="container-wespa relative z-10">
            <p className="text-wespa-red font-semibold mb-4">{c.breadcrumb}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.title}</h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
              {c.subtitle}
            </p>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-wespa">
            <h2 className="text-2xl font-bold mb-8">Zavrtnica</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
              {rooms.filter(r => r.location === 'Zavrtnica').map((room) => (
                <div key={room.name} className="p-6 bg-white border border-stone-200 rounded-2xl">
                  <h3 className="text-lg font-bold mb-1">{room.name}</h3>
                  <p className="text-stone-500 text-sm mb-3">{room.area}</p>
                  <p className="text-xl font-bold text-wespa-red">{room.price}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-8">Green Gold</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
              {rooms.filter(r => r.location === 'Green Gold').map((room) => (
                <div key={room.name} className="p-6 bg-white border border-stone-200 rounded-2xl">
                  <h3 className="text-lg font-bold mb-1">{room.name}</h3>
                  <p className="text-stone-500 text-sm mb-3">{room.area}{room.note ? ` · ${c.divisible}` : ''}</p>
                  <p className="text-xl font-bold text-wespa-red">{room.price}</p>
                </div>
              ))}
            </div>

            {/* Gallery */}
            <h2 className="text-3xl font-bold text-center mb-10">{c.galleryTitle}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 mb-16">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={`/images/workspaces/meeting-rooms/meeting-room-${i}.jpg`}
                    alt={`Conference room ${i}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button variant="wespa" size="lg" asChild>
                <Link href="/contact">{c.bookRoom}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
