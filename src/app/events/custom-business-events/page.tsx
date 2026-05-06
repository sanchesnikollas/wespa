'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Business Events',
    breadcrumb: 'Events',
    tagline: 'Technology and ambiance for your most important business moments.',
    title: 'Custom Business Events',
    subtitle: 'Professional infrastructure for conferences, panels, and workshops of all sizes. Host an event that reflects your standards.',
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
    // Support / Stage & Media — figma feedback #100-#105
    supportTitle: 'Support',
    supportSubtitle: 'We provide complete event organization with professional consulting in all aspects:',
    stageMediaCategory: 'Stage & Media',
    supportItems: [
      'Sound systems, professional lighting, and technical support.',
      'Booking and coordination of DJs or live bands.',
      'Stage setup and live streaming for remote guests.',
    ],
    // Business Catering destaque — figma feedback #108
    cateringTitle: 'Business Catering',
    cateringDesc: 'Professional catering packages from Papel and SPOT. Coffee breaks, working lunches, seated dinners, and cocktail receptions designed for corporate events.',
    cateringCta: 'Explore Food',
    // Technical Solutions & Logistics — figma feedback #109-#115
    servicesTitle: 'Technical Solutions & Logistics (Full Service)',
    servicesDesc: 'We ensure a flawless execution through a complete range of additional services:',
    services: [
      { title: 'Advanced AV Equipment', description: 'Professional sound, lighting, and production support.' },
      { title: 'Event Management', description: 'On-site organizational support and protocol coordination.' },
      { title: 'Live Streaming', description: 'High-quality broadcasting of your panels or conferences.' },
    ],
    ctaTitle: 'Plan Your Business Event',
    ctaDesc: 'Share your event requirements and our team will prepare a detailed proposal with venue options, services, and pricing.',
    ctaButton: 'Get in touch',
  },
  hr: {
    pageTitle: 'Poslovni događaji',
    breadcrumb: 'Događanja',
    tagline: 'Tehnologija i ambijent za vaše najvažnije poslovne trenutke.',
    title: 'Poslovni događaji',
    subtitle: 'Profesionalna infrastruktura za konferencije, panele i radionice svih veličina. Domaćin događanja koje odražava vaše standarde.',
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
    supportTitle: 'Podrška',
    supportSubtitle: 'Pružamo potpunu organizaciju događanja uz profesionalno savjetovanje u svim aspektima:',
    stageMediaCategory: 'Pozornica i mediji',
    supportItems: [
      'Ozvučenje, profesionalna rasvjeta i tehnička podrška.',
      'Rezervacija i koordinacija DJ-eva ili live bendova.',
      'Postavljanje pozornice i live streaming za udaljene goste.',
    ],
    cateringTitle: 'Poslovni catering',
    cateringDesc: 'Profesionalni catering paketi od Papel i SPOT restorana. Pauze za kavu, radni ručkovi, večere i koktel prijemi za korporativne događaje.',
    cateringCta: 'Istraži gastronomiju',
    servicesTitle: 'Tehnička rješenja i logistika (Full Service)',
    servicesDesc: 'Osiguravamo besprijekornu izvedbu kroz potpuni raspon dodatnih usluga:',
    services: [
      { title: 'Napredna AV oprema', description: 'Profesionalni zvuk, rasvjeta i produkcijska podrška.' },
      { title: 'Upravljanje događajem', description: 'Operativna podrška i koordinacija protokola na licu mjesta.' },
      { title: 'Live streaming', description: 'Vrhunsko emitiranje vaših panela ili konferencija.' },
    ],
    ctaTitle: 'Planirajte svoj poslovni događaj',
    ctaDesc: 'Podijelite zahtjeve za događaj i naš tim pripremiti će detaljni prijedlog s opcijama prostora, uslugama i cijenama.',
    ctaButton: 'Kontaktirajte nas',
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
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/20">
              {c.tagline}
            </span>
            <p className="text-wespa-red font-semibold mb-4">{c.breadcrumb}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.title}</h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-3xl">
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

        {/* Support · Stage & Media — figma feedback #100-#105 */}
        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-wespa-red mb-3">{c.stageMediaCategory}</p>
              <h2 className="text-3xl font-bold text-stone-900 mb-4">{c.supportTitle}</h2>
              <p className="text-stone-600">{c.supportSubtitle}</p>
            </div>
            <ul className="space-y-4 max-w-3xl">
              {c.supportItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-stone-700 bg-white rounded-2xl p-5 border border-stone-200">
                  <span className="text-wespa-red mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Business Catering — figma feedback #108 */}
        <section className="section-spacing">
          <div className="container-wespa">
            <div className="bg-stone-900 text-white rounded-3xl p-10 md:p-14 grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">{c.cateringTitle}</h3>
                <p className="text-stone-300 leading-relaxed">{c.cateringDesc}</p>
              </div>
              <div className="md:text-right">
                <Button variant="wespa" size="lg" asChild>
                  <Link href="/food">{c.cateringCta}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Solutions & Logistics — figma feedback #109-#115 */}
        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">{c.servicesTitle}</h2>
            <p className="text-stone-600 mb-10 max-w-2xl">
              {c.servicesDesc}
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              {c.services.map((service) => (
                <div key={service.title} className="flex gap-4 bg-white rounded-2xl p-6 border border-stone-200">
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
