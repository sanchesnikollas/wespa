'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Business Events',
    breadcrumb: 'Events / Custom Business Events',
    title: 'Technology and ambiance for your most important business moments.',
    subtitle: 'Professional infrastructure for conferences, panels, and workshops of all sizes. Host an event that reflects your brand’s professionalism.',
    intro: 'With 10 halls across two locations, state-of-the-art AV equipment, and the support of an experienced team, WESPA is the logical choice for gatherings of 2 to 500+ participants.',
    cateringTitle: 'Business Catering',
    cateringDesc: 'Great food is essential for successful networking. In partnership with Restaurants Papel & SPOT, we offer culinary solutions tailored to your business format, from coffee breaks and healthy breakfasts to gala dinners.',
    cateringCta: 'Explore Food',
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
    breadcrumb: 'Događanja / Poslovni događaji',
    title: 'Tehnologija i ambijent za vaše najvažnije poslovne trenutke.',
    subtitle: 'Profesionalna infrastruktura za konferencije, panele i radionice svih veličina. Domaćin događanja koje odražava profesionalnost vaše marke.',
    intro: 'S 10 dvorana na dvije lokacije, vrhunskom AV opremom i podrškom iskusnog tima, WESPA je logičan izbor za okupljanja od 2 do 500+ sudionika.',
    cateringTitle: 'Poslovni catering',
    cateringDesc: 'Dobra hrana ključna je za uspješan networking. U partnerstvu s restoranima Papel i SPOT nudimo kulinarska rješenja prilagođena vašem poslovnom formatu — od pauza za kavu i zdravih doručaka do gala večera.',
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
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/events/business/business-event-1.jpg" alt="WESPA business event" fill className="object-cover" priority />
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
            <p className="text-xl md:text-2xl text-stone-700 leading-relaxed max-w-4xl">
              {c.intro}
            </p>
          </div>
        </section>

        <section className="section-spacing bg-stone-50">
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

        <section className="section-spacing">
          <div className="container-wespa">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">{c.servicesTitle}</h2>
            <p className="text-stone-600 mb-10 max-w-2xl">{c.servicesDesc}</p>

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
