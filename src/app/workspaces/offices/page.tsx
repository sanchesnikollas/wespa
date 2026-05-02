'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Private Offices',
    breadcrumb: 'Workspaces',
    tagline: 'Beyond the standard office',
    title: 'Your Address to Success.',
    subtitle: 'Fully managed, move-in ready offices for your team. Privacy, flexibility, and access to a 200+ company network.',
    bookVisit: 'Book a visit',
    // Office Options (#50)
    optionsTitle: 'Office Options',
    optionsSubtitle: 'Choose the format that fits how your team operates today.',
    options: [
      {
        name: 'Private Office Space',
        priceLabel: 'Pricing on request',
        description: 'Secure a dedicated space of up to 150m² with a fully customizable layout. Enjoy the privacy of a separate zone.',
        image: '/images/workspaces/offices/office-1.jpg',
      },
      {
        name: 'Tailored Workspace',
        priceLabel: 'Pricing on request',
        description: "Large office suites up to 150m², fully customizable to match your team's needs and dynamics.",
        image: '/images/workspaces/offices/office-2.jpg',
      },
    ],
    // Everything Included (mantido)
    everythingIncluded: 'Included Features',
    everythingIncludedSubtitle: 'Every WESPA office comes with the full operational stack.',
    features: ['Utilities & high-speed internet', 'Professional cleaning', 'Reception services', 'Meeting room hours included', '24/7 secure access', 'Mail & package handling', 'Community events access', 'On-site restaurants'],
    // Perfect for (#55)
    perfectForTitle: 'Perfect for:',
    perfectFor: [
      'Established teams of 5–50',
      'Companies opening a Zagreb HQ',
      'Hybrid teams that need anchored space',
      'Regulated industries needing privacy',
    ],
    // Why Choose WESPA Offices? (#56)
    whyTitle: 'Why Choose WESPA Offices?',
    whySubtitle: 'Built for ambitious teams that want focus without the operational tax.',
    why: [
      {
        title: 'Scalability',
        description: 'A solution for growing companies seeking a dedicated base with room to expand, without the need for relocation.',
      },
      {
        title: 'Premium Amenities',
        description: 'Alongside your private office, enjoy full access to all WESPA amenities: professionally designed common areas, fitness, dining, events.',
      },
      {
        title: 'Privacy & Identity',
        description: 'Branded entrance, dedicated meeting rooms, and a private floor zone for your team.',
      },
    ],
  },
  // TODO i18n HR — atualizar copy EN aplicado em 02/05/2026 (figma feedback #47-#64)
  hr: {
    pageTitle: 'Privatni uredi',
    breadcrumb: 'Prostori',
    tagline: 'Iznad standardnog ureda',
    title: 'Vaša adresa uspjeha.',
    subtitle: 'Potpuno upravljani uredi spremni za useljenje za vaš tim. Privatnost, fleksibilnost i pristup mreži od 200+ tvrtki.',
    bookVisit: 'Zakažite posjet',
    optionsTitle: 'Opcije ureda',
    optionsSubtitle: 'Odaberite format koji odgovara načinu rada vašeg tima.',
    options: [
      {
        name: 'Privatni uredski prostor',
        priceLabel: 'Cijena na upit',
        description: 'Osigurajte dedicirani prostor do 150m² s potpuno prilagodljivim rasporedom. Uživajte u privatnosti odvojene zone.',
        image: '/images/workspaces/offices/office-1.jpg',
      },
      {
        name: 'Prilagođeni radni prostor',
        priceLabel: 'Cijena na upit',
        description: 'Veliki uredski apartmani do 150m², potpuno prilagodljivi potrebama i dinamici vašeg tima.',
        image: '/images/workspaces/offices/office-2.jpg',
      },
    ],
    everythingIncluded: 'Uključene pogodnosti',
    everythingIncludedSubtitle: 'Svaki WESPA ured dolazi s punim operativnim paketom.',
    features: ['Režije i brzi internet', 'Profesionalno čišćenje', 'Recepcijske usluge', 'Uključeni sati za sobe za sastanke', '24/7 siguran pristup', 'Primanje pošte i paketa', 'Pristup događanjima zajednice', 'Restorani na lokaciji'],
    perfectForTitle: 'Savršeno za:',
    perfectFor: [
      'Etablirane timove 5–50 ljudi',
      'Tvrtke koje otvaraju HQ u Zagrebu',
      'Hibridne timove kojima treba sidrište',
      'Regulirane industrije s potrebom privatnosti',
    ],
    whyTitle: 'Zašto WESPA uredi?',
    whySubtitle: 'Stvoreni za ambiciozne timove koji žele fokus bez operativnog tereta.',
    why: [
      {
        title: 'Skalabilnost',
        description: 'Rješenje za tvrtke u rastu koje traže dediciranu bazu s prostorom za širenje, bez selidbi.',
      },
      {
        title: 'Premium pogodnosti',
        description: 'Uz vaš privatni ured, puni pristup svim WESPA pogodnostima: zajedničkim prostorima, fitnessu, gastronomiji i događajima.',
      },
      {
        title: 'Privatnost i identitet',
        description: 'Brendirani ulaz, dedicirane sobe za sastanke i privatna zona kata za vaš tim.',
      },
    ],
  },
}

export default function OfficesPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <title>{c.pageTitle} | WESPA</title>
      <meta name="description" content={c.subtitle} />
      <main>
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/workspaces/offices/office-1.jpg" alt="WESPA private offices" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/75" />
          <div className="container-wespa relative z-10">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/20">
              {c.tagline}
            </span>
            <p className="text-wespa-red font-semibold mb-4">{c.breadcrumb}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.title}</h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
              {c.subtitle}
            </p>
          </div>
        </section>

        {/* Office Options — figma feedback #50 */}
        <section className="section-spacing">
          <div className="container-wespa">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">{c.optionsTitle}</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">{c.optionsSubtitle}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
              {c.options.map((opt) => (
                <div key={opt.name} className="bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col">
                  <div className="relative aspect-[5/3]">
                    <Image src={opt.image} alt={opt.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-stone-900">{opt.name}</h3>
                    <p className="text-wespa-red font-semibold mb-4">{opt.priceLabel}</p>
                    <p className="text-stone-600 leading-relaxed mb-6 flex-1">{opt.description}</p>
                    <Button variant="wespa" size="lg" asChild>
                      <Link href="/book-visit">{c.bookVisit}</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Included Features + Perfect for — figma feedback #46/#55 */}
        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <div className="grid lg:grid-cols-2 gap-10">
              <div>
                <h2 className="text-3xl font-bold mb-3">{c.everythingIncluded}</h2>
                <p className="text-stone-600 mb-6">{c.everythingIncludedSubtitle}</p>
                <ul className="space-y-3">
                  {c.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-stone-700">
                      <span className="text-wespa-red font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-stone-900 text-white rounded-3xl p-10">
                <h3 className="text-2xl font-bold mb-6">{c.perfectForTitle}</h3>
                <ul className="space-y-3">
                  {c.perfectFor.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-stone-200">
                      <span className="text-wespa-red">✓</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose WESPA Offices — figma feedback #56 */}
        <section className="section-spacing">
          <div className="container-wespa">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">{c.whyTitle}</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">{c.whySubtitle}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-10">
              {c.why.map((b) => (
                <div key={b.title} className="bg-white border border-stone-200 rounded-2xl p-8">
                  <h3 className="text-xl font-bold mb-3 text-stone-900">{b.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button variant="wespa" size="lg" asChild>
                <Link href="/book-visit">{c.bookVisit}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
