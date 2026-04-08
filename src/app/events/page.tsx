'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Events',
    title: 'Your Idea, Our Stage',
    subtitle: 'From intimate private celebrations to large-scale conferences, WESPA delivers end-to-end event production in premium venues across Zagreb.',
    eventTypes: [
      {
        title: 'Custom Special Events',
        description: 'Private celebrations, weddings, concerts, and bespoke occasions. Full event organisation with catering, entertainment, and production.',
        href: '/events/custom-special-events',
        highlights: ['Weddings & celebrations', 'Concerts & performances', 'Papel & SPOT catering', 'DJ, bands & live streaming'],
      },
      {
        title: 'Custom Business Events',
        description: 'Conferences, panels, workshops, and corporate gatherings. 10 halls across 2 locations with capacity for 2 to 500+ attendees.',
        href: '/events/custom-business-events',
        highlights: ['Conferences & panels', '10 halls, 2 locations', 'AV equipment included', 'Full event management'],
      },
      {
        title: 'Event Spaces',
        description: 'Premium venues at WESPA Business & Lounge (Green Gold) and WESPA Spaces (Zavrtnica). Flexible layouts for up to 150 guests.',
        href: '/events/event-spaces',
        highlights: ['WESPA Business & Lounge', 'WESPA Spaces Zavrtnica', 'Up to 150 guests', 'Flexible configurations'],
      },
    ],
    ctaText: 'Ready to bring your event to life?',
    ctaButton: 'Get in Touch',
  },
  hr: {
    pageTitle: 'Događanja',
    title: 'Vaša ideja, naša pozornica',
    subtitle: 'Od intimnih privatnih proslava do velikih konferencija, WESPA pruža cjelovitu event produkciju u premium prostorima diljem Zagreba.',
    eventTypes: [
      {
        title: 'Posebni događaji',
        description: 'Privatne proslave, vjenčanja, koncerti i posebne prilike. Potpuna organizacija s cateringom, zabavom i produkcijom.',
        href: '/events/custom-special-events',
        highlights: ['Vjenčanja i proslave', 'Koncerti i nastupi', 'Papel i SPOT catering', 'DJ, bendovi i live streaming'],
      },
      {
        title: 'Poslovni događaji',
        description: 'Konferencije, paneli, radionice i korporativna okupljanja. 10 dvorana na 2 lokacije s kapacitetom od 2 do 500+ sudionika.',
        href: '/events/custom-business-events',
        highlights: ['Konferencije i paneli', '10 dvorana, 2 lokacije', 'AV oprema uključena', 'Potpuno upravljanje događajem'],
      },
      {
        title: 'Prostori za događanja',
        description: 'Premium prostori u WESPA Business & Lounge (Green Gold) i WESPA Spaces (Zavrtnica). Fleksibilni rasporedi za do 150 gostiju.',
        href: '/events/event-spaces',
        highlights: ['WESPA Business & Lounge', 'WESPA Spaces Zavrtnica', 'Do 150 gostiju', 'Fleksibilne konfiguracije'],
      },
    ],
    ctaText: 'Spremni oživjeti svoj događaj?',
    ctaButton: 'Kontaktirajte nas',
  },
}

export default function EventsPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <title>{c.pageTitle} | WESPA</title>
      <meta name="description" content={c.subtitle} />
      <main>
        {/* Hero */}
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/events/spaces/venue-1.jpg" alt="WESPA event venue" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/75" />
          <div className="container-wespa relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.title}</h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
              {c.subtitle}
            </p>
          </div>
        </section>

        {/* Event Types */}
        <section className="section-spacing">
          <div className="container-wespa">
            <div className="grid gap-8 md:grid-cols-3">
              {c.eventTypes.map((event) => (
                <Link
                  key={event.href}
                  href={event.href}
                  className="group block p-8 bg-white border border-stone-200 rounded-2xl hover:shadow-card-hover hover:border-stone-300 transition-all"
                >
                  <h2 className="text-2xl font-bold text-stone-900 mb-3 group-hover:text-wespa-red transition-colors">
                    {event.title}
                  </h2>
                  <p className="text-stone-600 mb-6">{event.description}</p>
                  <ul className="space-y-2">
                    {event.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                        <span className="text-wespa-red mt-0.5">&#10003;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <p className="text-lg text-stone-600 mb-6">{c.ctaText}</p>
              <Button variant="wespa" size="lg" asChild>
                <Link href="/contact">{c.ctaButton}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
