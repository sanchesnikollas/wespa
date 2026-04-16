'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Meeting Rooms',
    breadcrumb: 'Workspaces',
    title: 'Where Ideas Become Deals.',
    subtitle: 'Modern, fully-equipped meeting spaces for all your business needs. Host impactful meetings, training sessions, and workshops in WESPA\'s state-of-the-art rooms.',
    meetingRoomS: 'Meeting Room S',
    upTo4: 'Up to 4 people',
    meetingRoomL: 'Meeting Room L',
    upTo10: 'Up to 10 people',
    perHour: '/hour',
    saveWithPackages: 'Save with Packages',
    hoursValidity: 'hours · 6 months validity',
    bookRoom: 'Book a Room',
  },
  hr: {
    pageTitle: 'Sobe za sastanke',
    breadcrumb: 'Prostori',
    title: 'Gdje ideje postaju dogovori.',
    subtitle: 'Moderni, potpuno opremljeni prostori za sve Vaše poslovne potrebe. Održavajte učinkovite sastanke, treninge i radionice u WESPA sobama najnovije generacije.',
    meetingRoomS: 'Soba za sastanke S',
    upTo4: 'Do 4 osobe',
    meetingRoomL: 'Soba za sastanke L',
    upTo10: 'Do 10 osoba',
    perHour: '/sat',
    saveWithPackages: 'Uštedite s paketima',
    hoursValidity: 'sati · 6 mjeseci valjanosti',
    bookRoom: 'Rezervirajte sobu',
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
            <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto mb-16">
              <div className="p-8 bg-white border border-stone-200 rounded-2xl text-center">
                <h3 className="text-xl font-bold mb-2">{c.meetingRoomS}</h3>
                <p className="text-stone-600 mb-4">{c.upTo4}</p>
                <p className="text-3xl font-bold text-stone-900 mb-1">€22<span className="text-lg text-stone-500">{c.perHour}</span></p>
              </div>
              <div className="p-8 bg-white border border-stone-200 rounded-2xl text-center">
                <h3 className="text-xl font-bold mb-2">{c.meetingRoomL}</h3>
                <p className="text-stone-600 mb-4">{c.upTo10}</p>
                <p className="text-3xl font-bold text-stone-900 mb-1">€32<span className="text-lg text-stone-500">{c.perHour}</span></p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center mb-8">{c.saveWithPackages}</h2>
            <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
              {[
                { name: 'Package S', hours: 20, price: 350 },
                { name: 'Package M', hours: 40, price: 750 },
                { name: 'Package L', hours: 70, price: 850 },
              ].map((pkg) => (
                <div key={pkg.name} className="p-6 bg-stone-50 border border-stone-200 rounded-2xl text-center">
                  <h3 className="text-lg font-bold mb-2">{pkg.name}</h3>
                  <p className="text-3xl font-bold text-stone-900 mb-1">€{pkg.price}</p>
                  <p className="text-stone-600">{pkg.hours} {c.hoursValidity}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="wespa" size="lg" asChild>
                <Link href="/book-visit">{c.bookRoom}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
