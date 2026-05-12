'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Virtual Office',
    breadcrumb: 'Workspaces / Virtual Office',
    title: 'Premium Address, Zero Overhead.',
    subtitle:
      'Boost your business image without the overhead of a physical office. Register your company, receive mail, and meet clients on demand from a premium business address in the heart of Zagreb.',
    intro:
      'WESPA Virtual Office gives remote teams, freelancers, and international companies a fully compliant Croatian business presence. Use our address for company registration, bank accounts, and official correspondence while working from anywhere.',
    featuresTitle: "What's included",
    features: [
      {
        title: 'Business registration address',
        description:
          'Use our Zagreb address to register your company with the Croatian commercial court (Sudski registar) and tax authority.',
      },
      {
        title: 'Mail handling & scanning',
        description:
          'We receive, sort, and scan your mail daily. Pick up in person or have it forwarded worldwide.',
      },
      {
        title: 'Dedicated phone line',
        description:
          'Local Zagreb phone number with professional call answering in Croatian and English.',
      },
      {
        title: 'On-demand meeting rooms',
        description:
          'Book a boardroom or private meeting space when you need to meet clients in person. Credits included.',
      },
      {
        title: 'Company formation support',
        description:
          'We partner with local accountants and lawyers to help you set up a d.o.o., j.d.o.o., or branch office.',
      },
      {
        title: 'Access to WESPA community',
        description:
          'Network with 300+ members, attend events, and use the lounge when you visit Zagreb.',
      },
    ],
    plansTitle: 'Virtual Office plans',
    plans: [
      {
        name: 'Essentials',
        price: '€49',
        period: '/month',
        description:
          'Business address + mail handling for freelancers and solo founders.',
        features: [
          'Zagreb business address',
          'Mail receipt & notification',
          'Monthly mail pickup',
          'Community lounge access (drop-in)',
        ],
      },
      {
        name: 'Professional',
        price: '€99',
        period: '/month',
        description:
          'For registered companies that need regular presence and meeting space.',
        features: [
          'Everything in Essentials',
          'Mail scanning & forwarding',
          'Dedicated phone line',
          '4 hours of meeting room/month',
          'Registered seat for company',
        ],
        popular: true,
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        description:
          'International teams setting up a full Croatian business presence.',
        features: [
          'Everything in Professional',
          'Call answering (EN + HR)',
          'Unlimited meeting room hours',
          'Company formation assistance',
          'Accounting & legal referrals',
        ],
      },
    ],
    ctaTitle: 'Ready to set up in Zagreb?',
    ctaDesc:
      'Talk to our team about registering your company at WESPA and what documents you need.',
    getStarted: 'Get Started',
    mostPopular: 'Most Popular',
    contact: 'Contact Sales',
  },
  hr: {
    pageTitle: 'Virtualna adresa',
    breadcrumb: 'Prostori / Virtualna adresa',
    title: 'Premium adresa, bez režija.',
    subtitle:
      'Podignite imidž vašeg poslovanja bez troškova fizičkog ureda. Registrirajte tvrtku, primajte poštu i sastajte se s klijentima po potrebi s premium poslovne adrese u centru Zagreba.',
    intro:
      'WESPA Virtualna Adresa omogućuje udaljenim timovima, freelancerima i međunarodnim tvrtkama potpuno usklađenu hrvatsku poslovnu prisutnost. Koristite našu adresu za registraciju tvrtke, bankovne račune i službenu korespondenciju dok radite odakle god želite.',
    featuresTitle: 'Što je uključeno',
    features: [
      {
        title: 'Adresa za registraciju tvrtke',
        description:
          'Koristite našu zagrebačku adresu za registraciju tvrtke kod Sudskog registra i Porezne uprave.',
      },
      {
        title: 'Primanje i skeniranje pošte',
        description:
          'Primamo, sortiramo i skeniramo vašu poštu svakodnevno. Preuzmite osobno ili proslijedimo bilo gdje u svijetu.',
      },
      {
        title: 'Dedicirana telefonska linija',
        description:
          'Lokalni zagrebački broj s profesionalnim odgovaranjem na hrvatskom i engleskom.',
      },
      {
        title: 'Sobe za sastanke na zahtjev',
        description:
          'Rezervirajte dvoranu ili privatnu sobu kada trebate susret s klijentima uživo. Uključeni krediti.',
      },
      {
        title: 'Podrška pri osnivanju tvrtke',
        description:
          'Surađujemo s lokalnim knjigovođama i odvjetnicima za osnivanje d.o.o., j.d.o.o. ili podružnice.',
      },
      {
        title: 'Pristup WESPA zajednici',
        description:
          'Umrežite se s više od 300 članova, posjetite događanja i koristite lounge kada ste u Zagrebu.',
      },
    ],
    plansTitle: 'Paketi virtualne adrese',
    plans: [
      {
        name: 'Essentials',
        price: '€49',
        period: '/mjesec',
        description:
          'Poslovna adresa i primanje pošte za freelancere i pojedinačne osnivače.',
        features: [
          'Zagrebačka poslovna adresa',
          'Primitak i obavijest o pošti',
          'Mjesečno preuzimanje pošte',
          'Pristup lounge prostoru (drop-in)',
        ],
      },
      {
        name: 'Professional',
        price: '€99',
        period: '/mjesec',
        description:
          'Za registrirane tvrtke koje trebaju redovitu prisutnost i prostor za sastanke.',
        features: [
          'Sve iz paketa Essentials',
          'Skeniranje i prosljeđivanje pošte',
          'Dedicirana telefonska linija',
          '4 sata sobe za sastanke/mjesec',
          'Registrirano sjedište tvrtke',
        ],
        popular: true,
      },
      {
        name: 'Enterprise',
        price: 'Po dogovoru',
        period: '',
        description:
          'Međunarodni timovi koji uspostavljaju punu hrvatsku poslovnu prisutnost.',
        features: [
          'Sve iz paketa Professional',
          'Odgovaranje na pozive (EN + HR)',
          'Neograničeni sati soba za sastanke',
          'Pomoć pri osnivanju tvrtke',
          'Preporuke knjigovodstva i pravnih usluga',
        ],
      },
    ],
    ctaTitle: 'Spremni za postavljanje u Zagrebu?',
    ctaDesc:
      'Razgovarajte s našim timom o registraciji tvrtke u WESPA-i i potrebnoj dokumentaciji.',
    getStarted: 'Započni',
    mostPopular: 'Najpopularniji',
    contact: 'Kontaktiraj prodaju',
  },
}

export default function VirtualOfficePage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <main>
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image
            src="/images/workspaces/offices/office-3.jpg"
            alt="WESPA virtual office Zagreb"
            fill
            className="object-cover"
            priority
          />
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
            <p className="text-lg text-stone-700 leading-relaxed">{c.intro}</p>
          </div>
        </section>

        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-12 text-center">
              {c.featuresTitle}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {c.features.map((f) => (
                <div
                  key={f.title}
                  className="p-8 bg-white border border-stone-200 rounded-2xl"
                >
                  <h3 className="text-xl font-bold text-stone-900 mb-3">
                    {f.title}
                  </h3>
                  <p className="text-stone-600">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-wespa">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-12 text-center">
              {c.plansTitle}
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {c.plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative p-8 bg-white border rounded-2xl ${
                    plan.popular
                      ? 'border-wespa-red shadow-lg'
                      : 'border-stone-200'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-wespa-red-dark text-white text-xs font-semibold px-4 py-1 rounded-full">
                      {c.mostPopular}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-stone-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-stone-900">
                      {plan.price}
                    </span>
                    <span className="text-stone-600">{plan.period}</span>
                  </div>
                  <p className="text-stone-600 text-sm mb-6">
                    {plan.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-stone-700"
                      >
                        <span className="text-wespa-red mt-0.5">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.popular ? 'wespa' : 'secondary'}
                    fullWidth
                    asChild
                  >
                    <Link href="/contact">{c.getStarted}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing bg-stone-900 text-white">
          <div className="container-wespa text-center max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {c.ctaTitle}
            </h2>
            <p className="text-stone-300 mb-8">{c.ctaDesc}</p>
            <Button variant="wespa" asChild>
              <Link href="/contact">{c.contact}</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
