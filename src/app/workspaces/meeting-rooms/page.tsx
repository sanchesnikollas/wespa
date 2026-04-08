import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'Meeting Rooms',
  description: 'Professional meeting rooms in Zagreb from €22/hour. Small and large rooms with AV equipment. Flexible packages available.',
}

export default function MeetingRoomsPage() {
  return (
    <main>
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <Image src="/images/workspaces/meeting-rooms/meeting-room-1.jpg" alt="WESPA meeting rooms" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="container-wespa relative z-10">
          <p className="text-wespa-red font-semibold mb-4">Workspaces</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Meeting Rooms</h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
            Professional meeting rooms equipped with latest technology. Book by the hour or save with our flexible packages.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-wespa">
          <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto mb-16">
            <div className="p-8 bg-white border border-stone-200 rounded-2xl text-center">
              <h3 className="text-xl font-bold mb-2">Meeting Room S</h3>
              <p className="text-stone-600 mb-4">Up to 4 people</p>
              <p className="text-3xl font-bold text-stone-900 mb-1">€22<span className="text-lg text-stone-500">/hour</span></p>
            </div>
            <div className="p-8 bg-white border border-stone-200 rounded-2xl text-center">
              <h3 className="text-xl font-bold mb-2">Meeting Room L</h3>
              <p className="text-stone-600 mb-4">Up to 10 people</p>
              <p className="text-3xl font-bold text-stone-900 mb-1">€32<span className="text-lg text-stone-500">/hour</span></p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-8">Save with Packages</h2>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {[
              { name: 'Package S', hours: 20, price: 350 },
              { name: 'Package M', hours: 40, price: 750 },
              { name: 'Package L', hours: 70, price: 850 },
            ].map((pkg) => (
              <div key={pkg.name} className="p-6 bg-stone-50 border border-stone-200 rounded-2xl text-center">
                <h3 className="text-lg font-bold mb-2">{pkg.name}</h3>
                <p className="text-3xl font-bold text-stone-900 mb-1">€{pkg.price}</p>
                <p className="text-stone-600">{pkg.hours} hours · 6 months validity</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="wespa" size="lg" asChild>
              <Link href="/book-visit">Book a Room</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
