import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'Conference Rooms',
  description: 'Premium conference rooms in Zagreb from €47/hour. 8 rooms across 2 locations with AV equipment, catering, and tech support.',
}

const rooms = [
  { name: 'INDIGO', location: 'Zavrtnica', area: '130m²', price: '€90/hr' },
  { name: 'INCUBATOR', location: 'Zavrtnica', area: '70m²', price: '€67/hr' },
  { name: 'BOND', location: 'Zavrtnica', area: '63m²', price: '€65/hr' },
  { name: 'BRAIN GYM', location: 'Zavrtnica', area: '38m²', price: '€47/hr' },
  { name: 'ENTER', location: 'Green Gold', area: '170m²', price: '€113-180/hr', note: 'Divisible' },
  { name: 'SHIFT', location: 'Green Gold', area: '110m²', price: '€120/hr' },
  { name: 'ESCAPE', location: 'Green Gold', area: '43m²', price: '€57/hr' },
  { name: 'CONNECT', location: 'Green Gold', area: '26m²', price: '€49/hr' },
]

export default function ConferenceRoomsPage() {
  return (
    <main>
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <Image src="/images/workspaces/meeting-rooms/meeting-room-2.jpg" alt="WESPA conference rooms" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="container-wespa relative z-10">
          <p className="text-wespa-red font-semibold mb-4">Workspaces</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Conference Rooms</h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
            8 premium conference rooms across 2 locations. Full AV equipment, projectors, catering, and tech support included.
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
                <p className="text-stone-500 text-sm mb-3">{room.area}{room.note ? ` · ${room.note}` : ''}</p>
                <p className="text-xl font-bold text-wespa-red">{room.price}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="wespa" size="lg" asChild>
              <Link href="/contact">Book a Conference Room</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
