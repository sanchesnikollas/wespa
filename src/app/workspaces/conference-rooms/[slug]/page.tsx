'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { useLanguage } from '@/contexts/LanguageContext'

const rooms: Record<string, {
  name: string
  location: string
  locationHr: string
  address: string
  area: number
  capacity: { theater: number; classroom: number; boardroom: number; ushape: number }
  pricePerHour: number
  maxPrice?: number
  divisible?: boolean
  features: string[]
  featuresHr: string[]
  description: string
  descriptionHr: string
  images: string[]
}> = {
  indigo: {
    name: 'INDIGO',
    location: 'WESPA Spaces — Urban Hub',
    locationHr: 'WESPA Spaces — Urban Hub',
    address: 'Heinzelova ulica 60, Zagreb',
    area: 130,
    capacity: { theater: 150, classroom: 80, boardroom: 40, ushape: 35 },
    pricePerHour: 90,
    features: ['Projector & screen', 'Wireless presentation', 'Sound system', 'Stage/podium', 'Modular seating', 'Catering available', 'Natural daylight', 'Air conditioning'],
    featuresHr: ['Projektor i platno', 'Bežična prezentacija', 'Zvučni sustav', 'Pozornica/pult', 'Modularne stolice', 'Catering dostupan', 'Prirodno svjetlo', 'Klimatizacija'],
    description: 'WESPA\'s largest conference hall at the Urban Hub. Ideal for conferences, product launches, and corporate events with theater seating for up to 150 people.',
    descriptionHr: 'Najveća konferencijska dvorana WESPE u Urban Hubu. Idealna za konferencije, lansiranja proizvoda i korporativne događaje s kazališnim rasporedom za do 150 osoba.',
    images: ['/images/workspaces/meeting-rooms/meeting-room-1.jpg', '/images/workspaces/meeting-rooms/meeting-room-2.jpg', '/images/workspaces/meeting-rooms/meeting-room-3.jpg', '/images/workspaces/meeting-rooms/meeting-room-4.jpg'],
  },
  incubator: {
    name: 'INCUBATOR',
    location: 'WESPA Spaces — Urban Hub',
    locationHr: 'WESPA Spaces — Urban Hub',
    address: 'Heinzelova ulica 60, Zagreb',
    area: 70,
    capacity: { theater: 60, classroom: 40, boardroom: 25, ushape: 20 },
    pricePerHour: 67,
    features: ['Projector & screen', 'Whiteboard', 'Video conferencing', 'Modular furniture', 'Catering available', 'Natural daylight', 'Air conditioning'],
    featuresHr: ['Projektor i platno', 'Bijela ploča', 'Video konferencije', 'Modularan namještaj', 'Catering dostupan', 'Prirodno svjetlo', 'Klimatizacija'],
    description: 'Versatile mid-size room for workshops, training sessions, and team offsites. Flexible layouts from classroom to boardroom.',
    descriptionHr: 'Svestrana srednja soba za radionice, treninge i timske događaje. Fleksibilan raspored od učionice do konferencijskog stola.',
    images: ['/images/workspaces/meeting-rooms/meeting-room-5.jpg', '/images/workspaces/meeting-rooms/meeting-room-6.jpg', '/images/workspaces/meeting-rooms/meeting-room-7.jpg'],
  },
  bond: {
    name: 'BOND',
    location: 'WESPA Spaces — Urban Hub',
    locationHr: 'WESPA Spaces — Urban Hub',
    address: 'Heinzelova ulica 60, Zagreb',
    area: 63,
    capacity: { theater: 50, classroom: 30, boardroom: 22, ushape: 18 },
    pricePerHour: 65,
    features: ['Projector & screen', 'Whiteboard', 'Video conferencing', 'Catering available', 'Air conditioning'],
    featuresHr: ['Projektor i platno', 'Bijela ploča', 'Video konferencije', 'Catering dostupan', 'Klimatizacija'],
    description: 'A refined space ideal for client presentations, board meetings, and strategy sessions.',
    descriptionHr: 'Profinjeni prostor idealan za prezentacije klijentima, sjednice uprave i strateške sesije.',
    images: ['/images/workspaces/meeting-rooms/meeting-room-8.jpg', '/images/workspaces/meeting-rooms/meeting-room-9.jpg'],
  },
  'brain-gym': {
    name: 'BRAIN GYM',
    location: 'WESPA Spaces — Urban Hub',
    locationHr: 'WESPA Spaces — Urban Hub',
    address: 'Heinzelova ulica 60, Zagreb',
    area: 38,
    capacity: { theater: 30, classroom: 18, boardroom: 14, ushape: 12 },
    pricePerHour: 47,
    features: ['Display screen', 'Whiteboard', 'Video conferencing', 'Air conditioning'],
    featuresHr: ['Zaslon', 'Bijela ploča', 'Video konferencije', 'Klimatizacija'],
    description: 'Compact and focused room for brainstorming sessions, small workshops, and creative thinking.',
    descriptionHr: 'Kompaktna soba za brainstorming sesije, male radionice i kreativno razmišljanje.',
    images: ['/images/workspaces/meeting-rooms/meeting-room-10.jpg', '/images/workspaces/meeting-rooms/meeting-room-11.jpg'],
  },
  enter: {
    name: 'ENTER',
    location: 'WESPA Business & Lounge',
    locationHr: 'WESPA Business & Lounge',
    address: 'Radnička cesta 50, Zagreb',
    area: 170,
    capacity: { theater: 180, classroom: 100, boardroom: 50, ushape: 45 },
    pricePerHour: 113,
    maxPrice: 180,
    divisible: true,
    features: ['Divisible into 2 rooms', 'Professional AV system', 'Stage & podium', 'Wireless microphones', 'Live streaming ready', 'Catering & bar service', 'Natural daylight', 'Air conditioning'],
    featuresHr: ['Djeljivo u 2 sobe', 'Profesionalni AV sustav', 'Pozornica i pult', 'Bežični mikrofoni', 'Spremno za live streaming', 'Catering i bar usluga', 'Prirodno svjetlo', 'Klimatizacija'],
    description: 'WESPA\'s flagship conference hall at Green Gold. Divisible into two separate spaces, equipped with professional AV production. The go-to venue for large conferences and corporate events.',
    descriptionHr: 'Glavna konferencijska dvorana WESPE u Green Goldu. Djeljiva u dva odvojena prostora, opremljena profesionalnom AV produkcijom. Prvo mjesto za velike konferencije i korporativne događaje.',
    images: ['/images/locations/business-lounge/lounge-1.jpg', '/images/locations/business-lounge/lounge-2.jpg', '/images/locations/business-lounge/lounge-3.jpg', '/images/locations/business-lounge/lounge-4.jpg'],
  },
  shift: {
    name: 'SHIFT',
    location: 'WESPA Business & Lounge',
    locationHr: 'WESPA Business & Lounge',
    address: 'Radnička cesta 50, Zagreb',
    area: 110,
    capacity: { theater: 100, classroom: 60, boardroom: 35, ushape: 30 },
    pricePerHour: 120,
    features: ['Professional AV system', 'Projector & screen', 'Sound system', 'Catering available', 'Natural daylight', 'Air conditioning'],
    featuresHr: ['Profesionalni AV sustav', 'Projektor i platno', 'Zvučni sustav', 'Catering dostupan', 'Prirodno svjetlo', 'Klimatizacija'],
    description: 'Premium conference room designed for high-impact presentations, panels, and executive meetings.',
    descriptionHr: 'Premium konferencijska soba dizajnirana za visoko utjecajne prezentacije, panele i izvršne sastanke.',
    images: ['/images/locations/business-lounge/lounge-5.jpg', '/images/locations/business-lounge/lounge-6.jpg', '/images/locations/business-lounge/lounge-7.jpg'],
  },
  escape: {
    name: 'ESCAPE',
    location: 'WESPA Business & Lounge',
    locationHr: 'WESPA Business & Lounge',
    address: 'Radnička cesta 50, Zagreb',
    area: 43,
    capacity: { theater: 35, classroom: 20, boardroom: 16, ushape: 14 },
    pricePerHour: 57,
    features: ['Display screen', 'Whiteboard', 'Video conferencing', 'Catering available', 'Air conditioning'],
    featuresHr: ['Zaslon', 'Bijela ploča', 'Video konferencije', 'Catering dostupan', 'Klimatizacija'],
    description: 'An intimate space ideal for workshops, team planning sessions, and focused collaboration.',
    descriptionHr: 'Intimni prostor idealan za radionice, timsko planiranje i fokusiranu suradnju.',
    images: ['/images/locations/business-lounge/lounge-8.jpg', '/images/locations/business-lounge/lounge-9.jpg'],
  },
  connect: {
    name: 'CONNECT',
    location: 'WESPA Business & Lounge',
    locationHr: 'WESPA Business & Lounge',
    address: 'Radnička cesta 50, Zagreb',
    area: 26,
    capacity: { theater: 20, classroom: 12, boardroom: 10, ushape: 8 },
    pricePerHour: 49,
    features: ['Display screen', 'Whiteboard', 'Video conferencing', 'Air conditioning'],
    featuresHr: ['Zaslon', 'Bijela ploča', 'Video konferencije', 'Klimatizacija'],
    description: 'Compact boardroom for executive meetings, interviews, and focused one-on-one sessions.',
    descriptionHr: 'Kompaktna soba za izvršne sastanke, intervjue i fokusirane individualne sesije.',
    images: ['/images/locations/business-lounge/lounge-10.jpg', '/images/locations/business-lounge/lounge-11.jpg'],
  },
}

const labels = {
  en: {
    area: 'Area',
    price: 'Price',
    perHour: '/hour',
    divisible: 'Divisible',
    capacity: 'Capacity',
    theater: 'Theater',
    classroom: 'Classroom',
    boardroom: 'Boardroom',
    ushape: 'U-Shape',
    people: 'people',
    equipment: 'Equipment & Features',
    gallery: 'Gallery',
    bookRoom: 'Book This Room',
    allRooms: 'All Conference Rooms',
    requestQuote: 'Request a Quote',
  },
  hr: {
    area: 'Površina',
    price: 'Cijena',
    perHour: '/sat',
    divisible: 'Djeljivo',
    capacity: 'Kapacitet',
    theater: 'Kazalište',
    classroom: 'Učionica',
    boardroom: 'Konferencija',
    ushape: 'U-oblik',
    people: 'osoba',
    equipment: 'Oprema i značajke',
    gallery: 'Galerija',
    bookRoom: 'Rezervirajte ovu sobu',
    allRooms: 'Sve konferencijske dvorane',
    requestQuote: 'Zatražite ponudu',
  },
}

export default function ConferenceRoomDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { language } = useLanguage()
  const l = labels[language]
  const room = rooms[slug]

  if (!room) {
    return (
      <main className="section-spacing text-center">
        <div className="container-wespa">
          <h1 className="text-3xl font-bold mb-4">Room not found</h1>
          <Button variant="wespa" asChild>
            <Link href="/workspaces/conference-rooms">{l.allRooms}</Link>
          </Button>
        </div>
      </main>
    )
  }

  const features = language === 'hr' ? room.featuresHr : room.features
  const description = language === 'hr' ? room.descriptionHr : room.description
  const loc = language === 'hr' ? room.locationHr : room.location

  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src={room.images[0]} alt={room.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/75" />
          <div className="container-wespa relative z-10">
            <Link href="/workspaces/conference-rooms" className="inline-flex items-center gap-2 text-stone-400 hover:text-white mb-6 transition-colors">
              <Icon name="chevron-left" size="sm" />
              {l.allRooms}
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{room.name}</h1>
            <p className="text-lg text-stone-300 mb-2">{loc}</p>
            <p className="text-sm text-stone-400">{room.address}</p>
          </div>
        </section>

        {/* Details */}
        <section className="section-spacing">
          <div className="container-wespa">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2">
                <p className="text-lg text-stone-700 leading-relaxed mb-10">
                  {description}
                </p>

                {/* Capacity table */}
                <h2 className="text-2xl font-bold text-stone-900 mb-6">{l.capacity}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                  {[
                    { label: l.theater, value: room.capacity.theater },
                    { label: l.classroom, value: room.capacity.classroom },
                    { label: l.boardroom, value: room.capacity.boardroom },
                    { label: l.ushape, value: room.capacity.ushape },
                  ].map((cap) => (
                    <div key={cap.label} className="p-4 bg-stone-50 rounded-xl text-center">
                      <div className="text-2xl font-bold text-stone-900">{cap.value}</div>
                      <div className="text-sm text-stone-600">{cap.label}</div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <h2 className="text-2xl font-bold text-stone-900 mb-6">{l.equipment}</h2>
                <div className="grid md:grid-cols-2 gap-3 mb-12">
                  {features.map((f) => (
                    <div key={f} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
                      <Icon name="check" size="sm" className="text-wespa-red shrink-0" />
                      <span className="text-sm text-stone-700">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Gallery */}
                <h2 className="text-2xl font-bold text-stone-900 mb-6">{l.gallery}</h2>
                <div className="grid grid-cols-2 gap-3">
                  {room.images.map((img, i) => (
                    <div key={img} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image
                        src={img}
                        alt={`${room.name} ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="sticky top-24 p-8 bg-white border border-stone-200 rounded-2xl shadow-sm space-y-6">
                  <div>
                    <span className="text-sm text-stone-600">{l.area}</span>
                    <p className="text-2xl font-bold text-stone-900">{room.area}m²</p>
                  </div>
                  <div>
                    <span className="text-sm text-stone-600">{l.price}</span>
                    <p className="text-2xl font-bold text-wespa-red">
                      €{room.pricePerHour}{room.maxPrice ? `–${room.maxPrice}` : ''}{l.perHour}
                    </p>
                    {room.divisible && (
                      <span className="inline-block mt-1 text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-full">
                        {l.divisible}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-sm text-stone-600">{l.capacity}</span>
                    <p className="text-lg font-semibold text-stone-900">
                      {room.capacity.theater} {l.people} ({l.theater})
                    </p>
                  </div>
                  <Button variant="wespa" size="lg" fullWidth asChild>
                    <Link href="/contact?service=conference">{l.bookRoom}</Link>
                  </Button>
                  <Button variant="secondary" fullWidth asChild>
                    <Link href="/downloads/wespa-meeting-rooms.pdf" target="_blank">
                      <Icon name="download" size="sm" />
                      PDF Catalog
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
