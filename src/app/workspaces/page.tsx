'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Workspaces',
    title: 'Find Your Perfect Workspace',
    subtitle: 'From flexible hot desks to fully customizable office zones — WESPA offers workspace solutions that grow with your business.',
    workspaceTypes: [
      { title: 'Coworking', description: 'Flexible desks for freelancers and remote workers. Daily and monthly plans available.', href: '/workspaces/coworking', price: 'From €30/day' },
      { title: 'Meeting Rooms', description: 'Professional meeting rooms for 4-10 people with AV equipment and catering options.', href: '/workspaces/meeting-rooms', price: 'From €22/hour' },
      { title: 'Offices', description: 'Private offices for teams of 2-12 people with all-inclusive amenities.', href: '/workspaces/offices', price: 'On request' },
      { title: 'Custom Office Zones', description: 'Dedicated spaces up to 150m² with fully customizable layouts.', href: '/workspaces/custom-office-zones', price: 'On request' },
      { title: 'Conference Rooms', description: '8 premium conference rooms across 2 locations for up to 500+ attendees.', href: '/workspaces/conference-rooms', price: 'From €47/hour' },
    ],
    notSure: 'Not sure which workspace is right for you?',
    bookTour: 'Book a Tour',
  },
  hr: {
    pageTitle: 'Prostori',
    title: 'Pronađite savršen radni prostor',
    subtitle: 'Od fleksibilnih stolova do potpuno prilagodljivih uredskih zona — WESPA nudi rješenja za radne prostore koji rastu s vašim poslovanjem.',
    workspaceTypes: [
      { title: 'Coworking', description: 'Fleksibilni stolovi za freelancere i remote radnike. Dnevni i mjesečni planovi.', href: '/workspaces/coworking', price: 'Od €30/dan' },
      { title: 'Sobe za sastanke', description: 'Profesionalne sobe za sastanke za 4-10 osoba s AV opremom i cateringom.', href: '/workspaces/meeting-rooms', price: 'Od €22/sat' },
      { title: 'Uredi', description: 'Privatni uredi za timove od 2-12 osoba sa svim uključenim pogodnostima.', href: '/workspaces/offices', price: 'Na upit' },
      { title: 'Prilagođene uredske zone', description: 'Namjenski prostori do 150m² s potpuno prilagodljivim rasporedom.', href: '/workspaces/custom-office-zones', price: 'Na upit' },
      { title: 'Konferencijske dvorane', description: '8 premium konferencijskih dvorana na 2 lokacije za do 500+ sudionika.', href: '/workspaces/conference-rooms', price: 'Od €47/sat' },
    ],
    notSure: 'Niste sigurni koji radni prostor je pravi za vas?',
    bookTour: 'Zakažite obilazak',
  },
}

export default function WorkspacesPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <title>{c.pageTitle} | WESPA</title>
      <meta name="description" content={c.subtitle} />
      <main>
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/workspaces/coworking/coworking-1.jpg" alt="WESPA workspaces" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/75" />
          <div className="container-wespa relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.title}</h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
              {c.subtitle}
            </p>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-wespa">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {c.workspaceTypes.map((ws) => (
                <Link key={ws.href} href={ws.href} className="group block p-8 bg-white border border-stone-200 rounded-2xl hover:shadow-card-hover hover:border-stone-300 transition-all">
                  <h2 className="text-2xl font-bold text-stone-900 mb-3 group-hover:text-wespa-red transition-colors">{ws.title}</h2>
                  <p className="text-stone-600 mb-4">{ws.description}</p>
                  <p className="text-lg font-semibold text-wespa-red">{ws.price}</p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-16">
              <p className="text-lg text-stone-600 mb-6">{c.notSure}</p>
              <Button variant="wespa" size="lg" asChild>
                <Link href="/book-visit">{c.bookTour}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
