'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Meeting Rooms',
    breadcrumb: 'Workspaces',
    title: 'Workspace built for your professional edge.',
    subtitle: 'Choose an environment tailored specifically for your business needs. Organize meetings, key sessions, and important presentations in spaces equipped for success.',
    perHour: '/ hour',
    vat: '+ VAT',
    bookRoom: 'Book a Room',
    rooms: [
      {
        name: 'Small Meeting Room',
        price: '€22.00',
        description: 'Capacity for up to 4 people. Designed for one-on-one interviews, confidential calls, or focused small-team sessions.',
      },
      {
        name: 'Large Meeting Room',
        price: '€32.00',
        description: 'Capacity for up to 10 people. Sufficient space for team presentations, board meetings, and workshops.',
      },
    ],
    packagesTitle: 'Meeting room packages',
    packagesNote: 'Note: All packages are valid for 6 months from the date of purchase.',
    packages: [
      {
        name: 'Package S',
        hours: 20,
        price: '€350',
        description: 'Includes 20 hours of usage, online booking, and full access to presentation hardware.',
      },
      {
        name: 'Package M',
        hours: 40,
        price: '€750',
        description: 'Includes 40 hours of usage with high availability and high-speed internet.',
      },
      {
        name: 'Package L',
        hours: 70,
        price: '€850',
        description: 'Our best value for regular users: 70 hours of usage with full logistics support.',
      },
    ],
    includedFeaturesTitle: 'Included Features',
    includedFeaturesSubtitle: 'Every booking and package comes with the WESPA standards.',
    includedFeatures: [
      'Online booking',
      'High-speed internet',
      'Presentation hardware',
      '24/7 access',
      'Dedicated support',
    ],
  },
  hr: {
    pageTitle: 'Sobe za sastanke',
    breadcrumb: 'Prostori',
    title: 'Radni prostor za vašu profesionalnu prednost.',
    subtitle: 'Odaberite okruženje prilagođeno vašim poslovnim potrebama. Organizirajte sastanke, ključne sesije i važne prezentacije u prostorima opremljenima za uspjeh.',
    perHour: '/ sat',
    vat: '+ PDV',
    bookRoom: 'Rezervirajte sobu',
    rooms: [
      {
        name: 'Mala soba za sastanke',
        price: '€22.00',
        description: 'Kapacitet do 4 osobe. Dizajnirana za individualne razgovore, povjerljive pozive ili fokusirane sesije malog tima.',
      },
      {
        name: 'Velika soba za sastanke',
        price: '€32.00',
        description: 'Kapacitet do 10 osoba. Dovoljno prostora za timske prezentacije, sastanke uprave i radionice.',
      },
    ],
    packagesTitle: 'Paketi za sobe za sastanke',
    packagesNote: 'Napomena: Svi paketi vrijede 6 mjeseci od datuma kupnje.',
    packages: [
      {
        name: 'Paket S',
        hours: 20,
        price: '€350',
        description: 'Uključuje 20 sati korištenja, online rezervaciju i puni pristup opremi za prezentacije.',
      },
      {
        name: 'Paket M',
        hours: 40,
        price: '€750',
        description: 'Uključuje 40 sati korištenja s visokom dostupnošću i brzim internetom.',
      },
      {
        name: 'Paket L',
        hours: 70,
        price: '€850',
        description: 'Najbolja vrijednost za stalne korisnike: 70 sati korištenja s punom logističkom podrškom.',
      },
    ],
    includedFeaturesTitle: 'Uključene pogodnosti',
    includedFeaturesSubtitle: 'Svaka rezervacija i paket dolaze s WESPA standardima.',
    includedFeatures: [
      'Online rezervacija',
      'Brzi internet',
      'Oprema za prezentacije',
      '24/7 pristup',
      'Namjenska podrška',
    ],
  },
}

export default function MeetingRoomsPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <title>{c.pageTitle} | WESPA</title>
      <meta name="description" content={c.subtitle} />
      <main>
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/workspaces/meeting-rooms/meeting-room-1.jpg" alt="WESPA meeting rooms" fill className="object-cover" priority />
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
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto mb-20">
              {c.rooms.map((room) => (
                <div key={room.name} className="p-8 bg-white border border-stone-200 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-3 text-stone-900">{room.name}</h3>
                  <p className="text-stone-600 mb-6 leading-relaxed">{room.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-stone-900">{room.price}</span>
                    <span className="text-stone-500">{c.vat}</span>
                    <span className="text-stone-500">{c.perHour}</span>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">{c.packagesTitle}</h2>
            <p className="text-stone-600 text-center max-w-xl mx-auto mb-12">{c.packagesNote}</p>

            <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-16">
              {c.packages.map((pkg) => (
                <div key={pkg.name} className="p-8 bg-stone-50 border border-stone-200 rounded-2xl">
                  <h3 className="text-xl font-bold mb-3 text-stone-900">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-stone-900">{pkg.price}</span>
                    <span className="text-stone-500 text-sm">{c.vat}</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">{pkg.description}</p>
                </div>
              ))}
            </div>

            {/* Included Features — figma feedback #46 */}
            <div className="bg-stone-900 text-white rounded-3xl p-10 md:p-14 max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{c.includedFeaturesTitle}</h3>
                <p className="text-stone-300">{c.includedFeaturesSubtitle}</p>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {c.includedFeatures.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <span className="text-wespa-red">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <Button variant="wespa" size="lg" asChild>
                  <Link href="/book-visit">{c.bookRoom}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
