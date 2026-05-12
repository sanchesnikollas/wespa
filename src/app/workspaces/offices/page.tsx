'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Private Offices',
    breadcrumb: 'Workspaces / Offices',
    title: 'Beyond the standard office.',
    subtitle: 'Fully managed, move-in ready offices for your team. Privacy, flexibility, and access to a 200+ company network. One contract, one invoice, zero hassle.',
    bookVisit: 'Book a visit',
    optionsTitle: 'Office Options',
    optionsSubtitle: 'Choose the format that fits how your team operates today.',
    options: [
      {
        name: 'Private Office Space',
        priceLabel: 'Pricing on request',
        description: 'Offices designed for teams of 2 to 12 people. One space. One price. No hidden costs. Utilities, 24/7 access, high-speed internet, maintenance, meeting rooms, reception, and printing/scanning/copying — all included.',
        image: '/images/workspaces/offices/office-1.jpg',
      },
      {
        name: 'Office Zone',
        priceLabel: 'Pricing on request',
        description: 'Spaces up to 100 m² with customizable layouts to fit your requirements. The go-to solution for larger teams and scaling companies, including premium amenities and additional meeting room hours.',
        image: '/images/workspaces/offices/office-2.jpg',
      },
    ],
    everythingIncluded: 'Included Features',
    everythingIncludedSubtitle: 'Every WESPA office comes with the full operational stack.',
    features: [
      ['Infrastructure', 'Fully furnished spaces, high-speed internet, and IT support.'],
      ['Logistics', 'Cleaning, office maintenance, reception, and mail handling.'],
      ['Access', '24/7 access to your private workspace.'],
    ] as [string, string][],
    perksTitle: 'Additional Perks & Community',
    perks: [
      ['Networking', 'Access to community events, professional workshops, and shared lounge areas.'],
      ['On-site Facilities', 'Local parking, gym, on-site restaurant, and café.'],
      ['Pet-friendly', 'Your pets are more than welcome in our spaces.'],
    ] as [string, string][],
    perfectForTitle: 'Perfect for:',
    perfectFor: [
      'Small Teams requiring privacy within a connected environment.',
      'Startups looking for a professional ecosystem to scale.',
      'Remote Employees seeking a balance between quiet focus and community.',
      'Entrepreneurs needing a prestigious business address.',
    ],
    whyTitle: 'Why Choose WESPA Offices?',
    whySubtitle: 'Built for ambitious teams that want focus without the operational tax.',
    why: [
      { title: 'Dynamic Community', description: 'Be part of a network of over 200 companies.' },
      { title: 'All-Inclusive Pricing', description: 'One fee covers rent, utilities, internet, and maintenance.' },
      { title: 'Prime Locations', description: 'Centrally located in Zagreb’s main business districts.' },
      { title: 'Professional Image', description: 'Modern spaces designed to impress your clients.' },
      { title: 'Flexibility', description: 'Easily scale your workspace up or down as your business evolves.' },
      { title: 'Work-Life Balance', description: 'Enjoy on-site amenities like break areas, a gym, and great coffee.' },
    ],
  },
  hr: {
    pageTitle: 'Privatni uredi',
    breadcrumb: 'Prostori / Uredi',
    title: 'Iznad standardnog ureda.',
    subtitle: 'Potpuno upravljani uredi spremni za useljenje za vaš tim. Privatnost, fleksibilnost i pristup mreži od 200+ tvrtki. Jedan ugovor, jedan račun, bez gnjavaže.',
    bookVisit: 'Zakažite posjet',
    optionsTitle: 'Opcije ureda',
    optionsSubtitle: 'Odaberite format koji odgovara načinu rada vašeg tima.',
    options: [
      {
        name: 'Privatni uredski prostor',
        priceLabel: 'Cijena na upit',
        description: 'Uredi dizajnirani za timove od 2 do 12 osoba. Jedan prostor. Jedna cijena. Bez skrivenih troškova. Režije, 24/7 pristup, brzi internet, održavanje, sobe za sastanke, recepcija i ispis/skeniranje/kopiranje — sve uključeno.',
        image: '/images/workspaces/offices/office-1.jpg',
      },
      {
        name: 'Office Zone',
        priceLabel: 'Cijena na upit',
        description: 'Prostori do 100 m² s prilagodljivim rasporedom prema vašim potrebama. Idealno rješenje za veće timove i tvrtke u rastu, uključujući premium pogodnosti i dodatne sate za sobe za sastanke.',
        image: '/images/workspaces/offices/office-2.jpg',
      },
    ],
    everythingIncluded: 'Uključene pogodnosti',
    everythingIncludedSubtitle: 'Svaki WESPA ured dolazi s punim operativnim paketom.',
    features: [
      ['Infrastruktura', 'Potpuno opremljeni prostori, brzi internet i IT podrška.'],
      ['Logistika', 'Čišćenje, održavanje ureda, recepcija i primanje pošte.'],
      ['Pristup', '24/7 pristup vašem privatnom radnom prostoru.'],
    ] as [string, string][],
    perksTitle: 'Dodatne pogodnosti i zajednica',
    perks: [
      ['Networking', 'Pristup događanjima zajednice, profesionalnim radionicama i zajedničkim loungeovima.'],
      ['Pogodnosti na lokaciji', 'Parking, teretana, restoran i kafić na lokaciji.'],
      ['Pet-friendly', 'Vaši ljubimci su više nego dobrodošli u našim prostorima.'],
    ] as [string, string][],
    perfectForTitle: 'Savršeno za:',
    perfectFor: [
      'Male timove kojima treba privatnost unutar povezanog okruženja.',
      'Startupe koji traže profesionalni ekosustav za skaliranje.',
      'Remote zaposlenike koji žele ravnotežu između fokusa i zajednice.',
      'Poduzetnike kojima treba prestižna poslovna adresa.',
    ],
    whyTitle: 'Zašto WESPA uredi?',
    whySubtitle: 'Stvoreni za ambiciozne timove koji žele fokus bez operativnog tereta.',
    why: [
      { title: 'Dinamična zajednica', description: 'Postanite dio mreže od preko 200 tvrtki.' },
      { title: 'Sve-uključeni paket', description: 'Jedna cijena pokriva najam, režije, internet i održavanje.' },
      { title: 'Premium lokacije', description: 'Centralno u glavnim poslovnim četvrtima Zagreba.' },
      { title: 'Profesionalni imidž', description: 'Moderni prostori dizajnirani da ostave dojam na klijente.' },
      { title: 'Fleksibilnost', description: 'Lako skalirajte radni prostor prema rastu tvrtke.' },
      { title: 'Work-life balance', description: 'Uživajte u pogodnostima na lokaciji — break areama, teretani i dobroj kavi.' },
    ],
  },
}

export default function OfficesPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
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

        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <div className="grid lg:grid-cols-2 gap-10 mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-3">{c.everythingIncluded}</h2>
                <p className="text-stone-600 mb-6">{c.everythingIncludedSubtitle}</p>
                <ul className="space-y-4">
                  {c.features.map(([t, d]) => (
                    <li key={t} className="text-stone-700">
                      <strong className="text-stone-900">{t}:</strong> {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-stone-900 text-white rounded-3xl p-10">
                <h3 className="text-2xl font-bold mb-6">{c.perfectForTitle}</h3>
                <ul className="space-y-3">
                  {c.perfectFor.map((p) => (
                    <li key={p} className="flex gap-3 text-stone-200">
                      <span className="text-wespa-red shrink-0">✓</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-stone-900">{c.perksTitle}</h3>
              <ul className="space-y-4">
                {c.perks.map(([t, d]) => (
                  <li key={t} className="text-stone-700">
                    <strong className="text-stone-900">{t}:</strong> {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-wespa">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">{c.whyTitle}</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">{c.whySubtitle}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-10">
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
