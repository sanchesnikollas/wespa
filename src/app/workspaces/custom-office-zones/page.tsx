'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    breadcrumb: 'Workspaces',
    title: 'Custom Office Zones',
    subtitle: 'Dedicated spaces up to 150m² with fully customizable layouts. Design your ideal work environment within the WESPA ecosystem.',
    highlights: [
      { title: 'Up to 150m²', desc: 'Generous spaces for growing teams' },
      { title: 'Fully Customizable', desc: 'Design the layout that works for you' },
      { title: 'All-Inclusive', desc: 'Utilities, internet, cleaning included' },
    ],
    interestedTitle: 'Interested in a Custom Zone?',
    interestedDesc: 'Our team will help you design the perfect space. Pricing is tailored to your specific requirements.',
    requestQuote: 'Request a Quote',
  },
  hr: {
    breadcrumb: 'Prostori',
    title: 'Prilagođene uredske zone',
    subtitle: 'Namjenski prostori do 150m² s potpuno prilagodljivim rasporedom. Dizajnirajte idealno radno okruženje.',
    highlights: [
      { title: 'Do 150m²', desc: 'Prostrani prostori za timove u rastu' },
      { title: 'Potpuno prilagodljivo', desc: 'Dizajnirajte raspored koji vam odgovara' },
      { title: 'Sve uključeno', desc: 'Režije, internet, čišćenje uključeno' },
    ],
    interestedTitle: 'Zainteresirani za prilagođenu zonu?',
    interestedDesc: 'Naš tim pomoći će vam dizajnirati savršen prostor. Cijena je prilagođena vašim specifičnim zahtjevima.',
    requestQuote: 'Zatražite ponudu',
  },
}

export default function CustomOfficeZonesPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <title>{c.title} | WESPA</title>
      <meta name="description" content={c.subtitle} />
      <main>
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/workspaces/offices/office-2.jpg" alt="WESPA custom office zones" fill className="object-cover" priority />
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
          <div className="container-wespa max-w-4xl">
            <div className="grid gap-8 md:grid-cols-3 mb-16">
              {c.highlights.map((item) => (
                <div key={item.title} className="text-center p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-stone-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-stone-50 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">{c.interestedTitle}</h2>
              <p className="text-stone-600 mb-8 max-w-xl mx-auto">{c.interestedDesc}</p>
              <Button variant="wespa" size="lg" asChild>
                <Link href="/contact">{c.requestQuote}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
