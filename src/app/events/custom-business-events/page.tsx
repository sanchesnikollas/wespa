'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Business Events',
    breadcrumb: 'Events',
    title: 'Custom Business Events',
    subtitle: 'Professional event infrastructure for conferences, panels, workshops, and corporate gatherings. 10 halls across 2 locations with capacity from 2 to 500+ people.',
    stats: [
      { value: '10', label: 'Event halls' },
      { value: '2', label: 'Locations' },
      { value: '2-500+', label: 'Capacity range' },
      { value: '100%', label: 'Customisable' },
    ],
    formatsTitle: 'Event Formats',
    formatsDesc: 'Whether you need a boardroom for 4 or a conference hall for 500, we configure the space and services to match your format.',
    eventFormats: [
      { name: 'Conferences', description: 'Large-scale gatherings with keynote stages, breakout sessions, and networking areas for up to 500+ attendees.' },
      { name: 'Panels & Talks', description: 'Moderated discussions and speaker sessions with professional staging, AV, and live streaming capabilities.' },
      { name: 'Workshops & Training', description: 'Interactive sessions in focused environments with flexible seating, whiteboards, and collaboration tools.' },
      { name: 'Corporate Gatherings', description: 'Company meetings, team events, product launches, and celebrations in a professional setting.' },
    ],
    servicesTitle: 'Included Services',
    servicesDesc: 'Every business event at WESPA comes with professional support. Mix and match services to build the package your event needs.',
    services: [
      { title: 'Business Catering', description: 'Professional catering packages from Papel and SPOT. Coffee breaks, working lunches, seated dinners, and cocktail receptions designed for corporate events.' },
      { title: 'AV Equipment', description: 'State-of-the-art audio-visual systems in every hall. HD projectors, wireless presentation, multi-zone sound, stage lighting, and video conferencing integration.' },
      { title: 'Event Management', description: 'Dedicated event coordinators handle logistics, vendor management, guest registration, signage, and on-site support from setup to teardown.' },
      { title: 'Live Streaming', description: 'Reach remote audiences with multi-camera live streaming, screen sharing, and audience interaction tools for hybrid conferences and webinars.' },
    ],
    ctaTitle: 'Plan Your Business Event',
    ctaDesc: 'Share your event requirements and our team will prepare a detailed proposal with venue options, services, and pricing.',
    ctaButton: 'Request a Proposal',
  },
  hr: {
    pageTitle: 'Poslovni događaji',
    breadcrumb: 'Događanja',
    title: 'Poslovni događaji',
    subtitle: 'Profesionalna infrastruktura za konferencije, panele, radionice i korporativna okupljanja. 10 dvorana na 2 lokacije s kapacitetom od 2 do 500+ osoba.',
    stats: [
      { value: '10', label: 'Dvorana za događanja' },
      { value: '2', label: 'Lokacije' },
      { value: '2-500+', label: 'Raspon kapaciteta' },
      { value: '100%', label: 'Prilagodljivo' },
    ],
    formatsTitle: 'Formati događanja',
    formatsDesc: 'Trebate li sobu za 4 ili konferencijsku dvoranu za 500, konfiguriramo prostor i usluge prema vašem formatu.',
    eventFormats: [
      { name: 'Konferencije', description: 'Velika okupljanja s glavnom pozornicom, breakout sesijama i networking prostorima za do 500+ sudionika.' },
      { name: 'Paneli i predavanja', description: 'Moderirane diskusije i govorničke sesije s profesionalnom pozornicom, AV opremom i live streaming mogućnostima.' },
      { name: 'Radionice i edukacije', description: 'Interaktivne sesije u fokusiranim okruženjima s fleksibilnim rasporedom sjedenja, pločama i alatima za suradnju.' },
      { name: 'Korporativna okupljanja', description: 'Sastanci tvrtke, timski događaji, lansiranja proizvoda i proslave u profesionalnom okruženju.' },
    ],
    servicesTitle: 'Uključene usluge',
    servicesDesc: 'Svaki poslovni događaj u WESPA dolazi s profesionalnom podrškom. Kombinirajte usluge kako biste sastavili paket koji vaš događaj treba.',
    services: [
      { title: 'Poslovni catering', description: 'Profesionalni catering paketi od Papel i SPOT restorana. Pauze za kavu, radni ručkovi, sjedala za večeru i koktel prijemi dizajnirani za korporativne događaje.' },
      { title: 'AV oprema', description: 'Najsuvremeniji audio-vizualni sustavi u svakoj dvorani. HD projektori, bežična prezentacija, višezonski zvuk, scensko osvjetljenje i integracija video konferencija.' },
      { title: 'Upravljanje događajem', description: 'Posvećeni koordinatori upravljaju logistikom, dobavljačima, registracijom gostiju, signalizacijom i podrškom na licu mjesta od postavljanja do rastavljanja.' },
      { title: 'Live streaming', description: 'Doseznite udaljenu publiku s višekamernim live streamingom, dijeljenjem zaslona i alatima za interakciju s publikom za hibridne konferencije i webinare.' },
    ],
    ctaTitle: 'Planirajte svoj poslovni događaj',
    ctaDesc: 'Podijelite zahtjeve za događaj i naš tim pripremiti će detaljni prijedlog s opcijama prostora, uslugama i cijenama.',
    ctaButton: 'Zatražite prijedlog',
  },
}

export default function CustomBusinessEventsPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <title>{c.pageTitle} | WESPA</title>
      <meta name="description" content={c.subtitle} />
      <main>
        {/* Hero */}
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/events/business/business-event-1.jpg" alt="WESPA business event" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/75" />
          <div className="container-wespa relative z-10">
            <p className="text-wespa-red font-semibold mb-4">{c.breadcrumb}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.title}</h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
              {c.subtitle}
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-stone-200">
          <div className="container-wespa py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {c.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-stone-900">{stat.value}</div>
                  <div className="text-sm text-stone-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Formats */}
        <section className="section-spacing">
          <div className="container-wespa">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">{c.formatsTitle}</h2>
            <p className="text-stone-600 mb-10 max-w-2xl">
              {c.formatsDesc}
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {c.eventFormats.map((format) => (
                <div
                  key={format.name}
                  className="p-8 bg-white border border-stone-200 rounded-2xl"
                >
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{format.name}</h3>
                  <p className="text-stone-600">{format.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">{c.servicesTitle}</h2>
            <p className="text-stone-600 mb-10 max-w-2xl">
              {c.servicesDesc}
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              {c.services.map((service) => (
                <div key={service.title} className="flex gap-4">
                  <div className="w-1 bg-wespa-red rounded-full shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 mb-2">{service.title}</h3>
                    <p className="text-stone-600 text-sm">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-spacing">
          <div className="container-wespa text-center">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">{c.ctaTitle}</h2>
            <p className="text-stone-600 mb-8 max-w-xl mx-auto">
              {c.ctaDesc}
            </p>
            <Button variant="wespa" size="lg" asChild>
              <Link href="/contact">{c.ctaButton}</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
