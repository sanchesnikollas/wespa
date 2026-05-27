'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Custom Office Zones',
    breadcrumb: 'Workspaces / Office Zones',
    title: 'Custom office suites tailored to your needs',
    subtitleLead: 'Full-service office solutions for larger teams and established companies.',
    subtitle: 'Secure a dedicated space of up to 150m² with a fully customizable layout. Enjoy the privacy of a separate zone with full access to all WESPA community amenities and services. One contract, one invoice, no additional fees.',
    highlights: [
      {
        title: 'Tailored Workspace',
        desc: 'Large office suites up to 150m², fully customizable to match your team’s needs and dynamics.',
      },
      {
        title: 'Scalability',
        desc: 'A solution for growing companies seeking a dedicated base with room to expand, without the need for relocation or operational hassle.',
      },
      {
        title: 'Premium Amenities',
        desc: 'Alongside your private office, enjoy full access to all WESPA amenities: professionally designed common areas, meeting rooms, reception, and business support.',
      },
    ],
    whatsIncludedTitle: 'What’s Included?',
    whatsIncluded: [
      ['Meeting Rooms', 'Included monthly hours for professionally equipped meeting rooms, with a seamless booking system.'],
      ['24/7 Access', 'Uninterrupted access to the space for all authorized team members.'],
      ['Utilities & Technical Infrastructure', 'Utilities, high-speed internet, regular cleaning, and technical maintenance are all included in a single monthly fee.'],
      ['Business & Administrative Support', 'Reception services and printing/scanning/copying based on a fair usage policy.'],
      ['Pricing', 'Available upon request, tailored specifically to your requirements.'],
    ] as [string, string][],
    perfectForTitle: 'Perfect for:',
    perfectFor: [
      'Large Teams seeking privacy and autonomy within a professional business environment.',
      'Established Companies needing a workspace that adapts to new hires and evolving needs.',
      'Organizations seeking a workspace without operational overhead.',
    ],
    interestedTitle: 'Interested in a Custom Zone?',
    interestedDesc: 'Our team will help you design the perfect space. Pricing is tailored to your specific requirements.',
    requestQuote: 'Request a Custom Quote',
  },
  hr: {
    pageTitle: 'Uredske zone',
    breadcrumb: 'Prostori / Uredske zone',
    title: 'Samostalni uredski prostor prilagođen vašim potrebama',
    subtitleLead: 'Full-service uredska rješenja za veće timove i etablirane tvrtke.',
    subtitle: 'Osigurajte dedicirani prostor do 150m² s potpuno prilagodljivim rasporedom. Uživajte u privatnosti odvojene zone uz puni pristup svim WESPA pogodnostima i uslugama zajednice. Jedan ugovor, jedan račun, bez dodatnih troškova.',
    highlights: [
      {
        title: 'Prilagođeni radni prostor',
        desc: 'Veliki uredski apartmani do 150m², potpuno prilagodljivi potrebama i dinamici vašeg tima.',
      },
      {
        title: 'Skalabilnost',
        desc: 'Rješenje za tvrtke u rastu koje traže dediciranu bazu s prostorom za širenje, bez selidbi ili operativne gnjavaže.',
      },
      {
        title: 'Premium pogodnosti',
        desc: 'Uz vaš privatni ured, puni pristup svim WESPA pogodnostima: profesionalno dizajniranim zajedničkim prostorima, sobama za sastanke, recepciji i poslovnoj podršci.',
      },
    ],
    whatsIncludedTitle: 'Što je uključeno?',
    whatsIncluded: [
      ['Sobe za sastanke', 'Uključeni mjesečni sati za profesionalno opremljene sobe za sastanke s besprijekornim sustavom rezervacija.'],
      ['24/7 pristup', 'Neprekidan pristup prostoru za sve ovlaštene članove tima.'],
      ['Režije i tehnička infrastruktura', 'Režije, brzi internet, redovito čišćenje i tehničko održavanje — sve uključeno u jednu mjesečnu cijenu.'],
      ['Poslovna i administrativna podrška', 'Recepcijske usluge i ispis/skeniranje/kopiranje prema fair usage politici.'],
      ['Cijena', 'Dostupna na upit, prilagođena vašim specifičnim zahtjevima.'],
    ] as [string, string][],
    perfectForTitle: 'Savršeno za:',
    perfectFor: [
      'Velike timove koji traže privatnost i autonomiju u profesionalnom poslovnom okruženju.',
      'Etablirane tvrtke kojima treba radni prostor koji se prilagođava novim zaposlenicima i potrebama.',
      'Organizacije koje žele radni prostor bez operativnog tereta.',
    ],
    interestedTitle: 'Zainteresirani za prilagođenu zonu?',
    interestedDesc: 'Naš tim pomoći će vam dizajnirati savršen prostor. Cijena je prilagođena vašim specifičnim zahtjevima.',
    requestQuote: 'Zatražite prilagođenu ponudu',
  },
}

export default function CustomOfficeZonesPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <main>
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/workspaces/offices/office-2.jpg" alt="WESPA custom office zones" fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/75" />
          <div className="container-wespa relative z-10">
            <p className="text-wespa-red font-semibold mb-4">{c.breadcrumb}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{c.title}</h1>
            <p className="text-xl md:text-2xl text-white font-semibold mb-4 max-w-2xl">
              {c.subtitleLead}
            </p>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
              {c.subtitle}
            </p>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-wespa max-w-5xl">
            <div className="grid gap-8 md:grid-cols-3 mb-20">
              {c.highlights.map((item) => (
                <div key={item.title} className="bg-white border border-stone-200 rounded-2xl p-8">
                  <h3 className="text-xl font-bold mb-3 text-stone-900">{item.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-10 mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-stone-900">{c.whatsIncludedTitle}</h2>
                <ul className="space-y-4">
                  {c.whatsIncluded.map(([t, d]) => (
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
