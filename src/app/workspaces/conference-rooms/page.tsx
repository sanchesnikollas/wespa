'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Conference Rooms',
    breadcrumb: 'Workspaces',
    title: 'Your vision on the right stage: WESPA Conference Rooms',
    subtitle: 'Professional room rentals in Zagreb. Choose a setting that matches your plans. Secure a space equipped with everything you need for an impactful event.',
    divisible: 'Divisible',
    galleryTitle: 'Our Conference Spaces',
    bookRoom: 'Book a Conference Room',
    perHour: '/ hour',
    vat: '+ VAT',
    // Localizações
    urbanHubTitle: 'WESPA Urban Hub (Zavrtnica 17)',
    businessLoungeTitle: 'WESPA Business & Lounge (Green Gold)',
    businessLoungeRange: '€113 – €180 + VAT / hour',
    // What's Included (#65)
    whatsIncludedTitle: "What's Included?",
    whatsIncludedSubtitle: 'Every booking comes with the full WESPA standards.',
    whatsIncluded: [
      'Projector & screen',
      'High-speed Wi-Fi',
      'Coffee & water',
      'Reception support',
      'Setup & cleanup',
    ],
    // Perfect for (#66)
    perfectForTitle: 'Perfect for:',
    perfectFor: [
      'Corporate conferences',
      'Workshops & training',
      'Product launches',
      'Panel discussions',
    ],
    // Additional Event Services (#89)
    additionalServicesTitle: 'Additional Event Services',
    additionalServicesSubtitle: 'Add a full event production layer when your moment deserves it.',
    additionalServices: [
      { title: 'Catering (Papel & SPOT)', description: 'On-site dining and bespoke menus from our restaurants.' },
      { title: 'AV Production', description: 'Professional sound, lighting, and recording.' },
      { title: 'Stage Setup', description: 'From simple lecterns to fully branded stage layouts.' },
      { title: 'Live Streaming', description: 'High-quality broadcasting for hybrid audiences.' },
    ],
    // Custom Office Zones CTA (#67)
    zoneCtaTitle: 'Need a custom setup?',
    zoneCtaSubtitle: 'Explore our Custom Office Zones for fully branded, dedicated environments.',
    zoneCta: 'Explore Custom Office Zones',
  },
  // TODO i18n HR — atualizar copy EN aplicado em 02/05/2026 (figma feedback #65-#89)
  hr: {
    pageTitle: 'Konferencijske dvorane',
    breadcrumb: 'Prostori',
    title: 'Vaša vizija na pravoj pozornici: WESPA konferencijske dvorane',
    subtitle: 'Profesionalni najam dvorana u Zagrebu. Odaberite ambijent koji prati vaše planove i osigurajte prostor opremljen za maksimalan utjecaj.',
    divisible: 'Djeljivo',
    galleryTitle: 'Naši konferencijski prostori',
    bookRoom: 'Rezervirajte dvoranu',
    perHour: '/ sat',
    vat: '+ PDV',
    urbanHubTitle: 'WESPA Urban Hub (Zavrtnica 17)',
    businessLoungeTitle: 'WESPA Business & Lounge (Green Gold)',
    businessLoungeRange: '€113 – €180 + PDV / sat',
    whatsIncludedTitle: 'Što je uključeno?',
    whatsIncludedSubtitle: 'Svaka rezervacija dolazi s WESPA standardima.',
    whatsIncluded: [
      'Projektor i platno',
      'Brzi Wi-Fi',
      'Kava i voda',
      'Podrška recepcije',
      'Postavljanje i čišćenje',
    ],
    perfectForTitle: 'Savršeno za:',
    perfectFor: [
      'Korporativne konferencije',
      'Radionice i treninge',
      'Lansiranje proizvoda',
      'Panel rasprave',
    ],
    additionalServicesTitle: 'Dodatne usluge za događanja',
    additionalServicesSubtitle: 'Dodajte sloj pune produkcije kad trenutak to zaslužuje.',
    additionalServices: [
      { title: 'Catering (Papel i SPOT)', description: 'Gastronomija i prilagođeni menui iz naših restorana.' },
      { title: 'AV produkcija', description: 'Profesionalni zvuk, rasvjeta i snimanje.' },
      { title: 'Postavljanje pozornice', description: 'Od jednostavnog pulta do potpuno brendiranih pozornica.' },
      { title: 'Live streaming', description: 'Vrhunsko emitiranje za hibridnu publiku.' },
    ],
    zoneCtaTitle: 'Trebate prilagođeno rješenje?',
    zoneCtaSubtitle: 'Istražite naše Custom Office Zones za potpuno brendirana, posvećena okruženja.',
    zoneCta: 'Istraži Custom Office Zones',
  },
}

// figma feedback #71 — TODO endereço Zavrtnica 17 (Figma) vs Heinzelova 60 (config). Confirmar com Gabi.
const rooms = [
  { slug: 'indigo', name: 'INDIGO', location: 'Zavrtnica', area: '130m²', price: '€90.00', priceNote: false, image: '/images/workspaces/meeting-rooms/meeting-room-1.jpg', capacity: 90, descriptionEn: 'A 130m² hall equipped with a projector, screen, and three fixed TVs. Capacity for up to 90 participants in a theater layout.' },
  { slug: 'incubator', name: 'INCUBATOR', location: 'Zavrtnica', area: '70m²', price: '€67.00', priceNote: false, image: '/images/workspaces/meeting-rooms/meeting-room-5.jpg', capacity: 50, descriptionEn: 'A 70m² multimedia space featuring a projector and screen. Ideal for groups of up to 50 in a theater setup.' },
  { slug: 'bond', name: 'BOND', location: 'Zavrtnica', area: '63m²', price: '€65.00', priceNote: false, image: '/images/workspaces/meeting-rooms/meeting-room-8.jpg', capacity: 40, descriptionEn: 'A 63m² room with a projector and screen. A versatile space for up to 40 participants in a theater layout.' },
  { slug: 'brain-gym', name: 'BRAIN GYM', location: 'Zavrtnica', area: '38m²', price: '€47.00', priceNote: false, image: '/images/workspaces/meeting-rooms/meeting-room-10.jpg', capacity: 25, descriptionEn: 'A compact 38m² room with a projector and screen. An excellent choice for smaller workshops up to 25 people.' },
  { slug: 'enter', name: 'ENTER', location: 'Green Gold', area: '170m²', price: '€113 – €180', priceNote: true, image: '/images/locations/business-lounge/lounge-1.jpg', capacity: 180, descriptionEn: 'Our largest hall at 170m² with a 3-part division possibility. Features two projectors, a sound system, and two fixed TVs.' },
  { slug: 'shift', name: 'SHIFT', location: 'Green Gold', area: '110m²', price: '€120.00', priceNote: false, image: '/images/locations/business-lounge/lounge-5.jpg', capacity: 70, descriptionEn: 'A 110m² space with two projectors, screens, and two fixed TVs. Accommodates up to 70 participants in a theater layout.' },
  { slug: 'escape', name: 'ESCAPE', location: 'Green Gold', area: '43m²', price: '€57.00', priceNote: false, image: '/images/locations/business-lounge/lounge-8.jpg', capacity: 30, descriptionEn: 'A 43m² area with a projector and screen. Suitable for school and theater formats for up to 30 people.' },
  { slug: 'connect', name: 'CONNECT', location: 'Green Gold', area: '26m²', price: '€49.00', priceNote: false, image: '/images/locations/business-lounge/lounge-10.jpg', capacity: 12, descriptionEn: 'A 26m² luxury meeting room with a TV and a private toilet. Ensures full discretion for meetings with up to 12 participants.' },
]

// TODO figma #90 — Gabi marcou "excluir essa página inteira" — provavelmente refere-se a uma página individual em [slug]/. Não deletada; aguardar screenshot pra identificar.

export default function ConferenceRoomsPage() {
  const { language } = useLanguage()
  const c = content[language]

  const RoomCard = ({ room }: { room: typeof rooms[number] }) => (
    <Link href={`/workspaces/conference-rooms/${room.slug}`} className="group bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-card-hover hover:border-stone-300 transition-all flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={room.image} alt={room.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-1 group-hover:text-wespa-red transition-colors">{room.name}</h3>
        <p className="text-stone-500 text-sm mb-3">{room.area}{room.priceNote ? ` · ${c.divisible}` : ''} · up to {room.capacity} people</p>
        <p className="text-stone-600 text-sm mb-4 leading-relaxed flex-1">{room.descriptionEn}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-stone-900">{room.price}</span>
          <span className="text-stone-500 text-sm">{c.vat}</span>
          <span className="text-stone-500 text-sm">{c.perHour}</span>
        </div>
      </div>
    </Link>
  )

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
            <p className="text-lg md:text-xl text-stone-300 max-w-3xl">
              {c.subtitle}
            </p>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-wespa">
            <h2 className="text-3xl font-bold mb-8">{c.urbanHubTitle}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-20">
              {rooms.filter(r => r.location === 'Zavrtnica').map((room) => (
                <RoomCard key={room.slug} room={room} />
              ))}
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold">{c.businessLoungeTitle}</h2>
              <p className="text-stone-500 mt-1">{c.businessLoungeRange}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-20">
              {rooms.filter(r => r.location === 'Green Gold').map((room) => (
                <RoomCard key={room.slug} room={room} />
              ))}
            </div>

            {/* What's Included — figma feedback #65 */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              <div className="bg-stone-50 rounded-3xl p-10">
                <h3 className="text-2xl font-bold mb-2">{c.whatsIncludedTitle}</h3>
                <p className="text-stone-600 mb-6">{c.whatsIncludedSubtitle}</p>
                <ul className="space-y-3">
                  {c.whatsIncluded.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-stone-700">
                      <span className="text-wespa-red">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Perfect for — figma feedback #66 */}
              <div className="bg-stone-900 text-white rounded-3xl p-10">
                <h3 className="text-2xl font-bold mb-6">{c.perfectForTitle}</h3>
                <ul className="space-y-3">
                  {c.perfectFor.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-stone-200">
                      <span className="text-wespa-red">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Additional Event Services — figma feedback #89 */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{c.additionalServicesTitle}</h3>
                <p className="text-stone-600 max-w-2xl mx-auto">{c.additionalServicesSubtitle}</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {c.additionalServices.map((srv) => (
                  <div key={srv.title} className="bg-white border border-stone-200 rounded-2xl p-6">
                    <h4 className="font-bold mb-2 text-stone-900">{srv.title}</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">{srv.description}</p>
                  </div>
                ))}
              </div>
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

            {/* Custom Office Zones CTA — figma feedback #67 (/zone) */}
            <div className="bg-stone-900 text-white rounded-3xl p-10 md:p-14 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{c.zoneCtaTitle}</h3>
                <p className="text-stone-300">{c.zoneCtaSubtitle}</p>
              </div>
              <Button variant="wespa" size="lg" asChild>
                <Link href="/workspaces/custom-office-zones">{c.zoneCta}</Link>
              </Button>
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
