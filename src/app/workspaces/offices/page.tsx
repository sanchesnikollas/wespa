'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    breadcrumb: 'Workspaces',
    title: 'Private Offices',
    subtitle: 'Private offices for teams of 2-12 people. All-inclusive amenities with the benefits of a thriving community.',
    everythingIncluded: 'Everything Included',
    features: ['Utilities & high-speed internet', 'Professional cleaning', 'Reception services', 'Meeting room hours included', '24/7 secure access', 'Mail & package handling', 'Community events access', 'On-site restaurants'],
    getQuoteTitle: 'Get a Custom Quote',
    getQuoteDesc: 'Pricing depends on team size, location preference, and lease duration. Contact us for a personalized offer.',
    requestQuote: 'Request a Quote',
  },
  hr: {
    breadcrumb: 'Prostori',
    title: 'Privatni uredi',
    subtitle: 'Privatni uredi za timove od 2-12 osoba. Sve uključeno u cijeni uz pogodnosti zajednice.',
    everythingIncluded: 'Sve uključeno',
    features: ['Režije i brzi internet', 'Profesionalno čišćenje', 'Recepcijske usluge', 'Uključeni sati za sobe za sastanke', '24/7 siguran pristup', 'Primanje pošte i paketa', 'Pristup događanjima zajednice', 'Restorani na lokaciji'],
    getQuoteTitle: 'Zatražite prilagođenu ponudu',
    getQuoteDesc: 'Cijena ovisi o veličini tima, preferiranoj lokaciji i trajanju najma. Kontaktirajte nas za personaliziranu ponudu.',
    requestQuote: 'Zatražite ponudu',
  },
}

export default function OfficesPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <title>{c.title} | WESPA</title>
      <meta name="description" content={c.subtitle} />
      <main>
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/workspaces/offices/office-1.jpg" alt="WESPA private offices" fill className="object-cover" priority />
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
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold mb-6">{c.everythingIncluded}</h2>
                <ul className="space-y-4">
                  {c.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-stone-700">
                      <span className="text-wespa-red font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-stone-50 rounded-2xl p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">{c.getQuoteTitle}</h3>
                <p className="text-stone-600 mb-6">{c.getQuoteDesc}</p>
                <Button variant="wespa" size="lg" asChild>
                  <Link href="/contact">{c.requestQuote}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
