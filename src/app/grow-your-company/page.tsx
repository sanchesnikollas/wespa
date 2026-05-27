'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Grow Your Company',
    breadcrumb: 'Forge Growth Platform',
    title: 'FORGE: From Traction to Scale.',
    subtitle: "We don't build MVPs; we build growth engines. The region's first execution-first platform for post-seed startups ready for global expansion.",
    heroButton: 'Apply Your Startup',
    whyTitle: 'WHY FORGE?',
    whySubtitle: 'Not an Accelerator. We Are Your Growth Partner',
    whyBody: "Accelerators teach theory and help you raise your first round. We step in when you already have that. FORGE is designed for founders who have outgrown early-stage programs. We don't offer generic lectures, but an operational deep dive. Our goal isn't a Demo Day, but sustainable revenue growth, new market entry, and Series A readiness.",
    processTitle: 'How We Work?',
    processTagline: 'Structured process, measurable results.',
    processDesc: 'A structured, hands-on approach to unlocking your next stage of growth. Applications are open year-round. Our Core Team filters candidates. We look for proven traction, clear ambition, and a team ready for rapid change.',
    phases: [
      {
        step: '01',
        title: 'Scale Diagnosis',
        duration: '4-6 weeks',
        description: 'Before we run, we identify the bottlenecks. We conduct a deep analysis of your startup – from legal compliance to market potential.',
        outcomes: [
          { label: 'Outcome', text: 'A clear growth hypothesis and a prioritized execution roadmap. We decide on further collaboration after this phase.' },
        ],
      },
      {
        step: '02',
        title: 'Growth Engine Build',
        duration: '3-4 months',
        description: "The heart of the FORGE platform. We pair you with our 'Cluster Leads' – experienced founders who work 1-on-1 with you.",
        outcomes: [
          { label: 'Focus', text: 'Sales process design, pricing strategy, hiring key roles, and channel development.' },
          { label: 'Outcome', text: 'A repeatable customer acquisition system (Repeatable Sales Motion).' },
        ],
      },
      {
        step: '03',
        title: 'Expansion & Capital Bridge',
        duration: '',
        description: 'For those ready for the big leagues. We focus on new market expansion and strategic partnerships.',
        outcomes: [
          { label: 'Fundraising', text: 'Preparation of the "Deal Room," investor narrative, and direct connection to VC funds in our network.' },
          { label: 'Outcome', text: 'Investment hygiene and readiness for follow-on capital.' },
        ],
      },
    ],
    knowledgeTitle: 'Knowledge from the Trenches, Not Textbooks.',
    knowledgeBody: "You won't work with theorists, but with Operators – former founders and experts who have already built, scaled, and sold their companies. We use Cluster-based Playbooks tailored to your business model:",
    knowledgeClusters: [
      ['Enterprise Sales', 'For those selling to large systems (long cycles, heavy regulation).'],
      ['Mid-market SaaS', 'Focused on B2B subscriptions and the SME sector.'],
      ['Platform & Marketplace', 'For two-sided markets and network effects.'],
    ] as [string, string][],
    tracksTitle: 'Flexible Engagement Models',
    tracksDesc: 'Every startup is unique, so we offer two tracks after the initial diagnosis:',
    tracks: [
      {
        title: 'Client Track',
        tag: 'Structured Support',
        description: 'For startups needing to solve specific growth challenges.',
        bullets: [
          'Targeted mentorship and operational support.',
          'Access to FORGE tools and networks.',
          'Model: Monthly fee (Fee-based).',
        ],
      },
      {
        title: 'Partner Track',
        tag: 'Deep Integration',
        description: "For 'top performers' with whom we build a long-term story.",
        bullets: [
          'Intensive operational involvement of our team in your business.',
          'Direct path to investment.',
          'Model: Equity-based (We become partners in your success).',
        ],
      },
    ],
    readyTitle: 'Are You Ready for FORGE?',
    readyBody: 'We look for a specific company profile. Apply if:',
    readyCriteria: [
      'You are Post-seed or strong Late pre-seed.',
      'You have paying customers or strong pilots.',
      'You have a founding team ready for operational changes and fast decision-making.',
      'You have the ambition to expand beyond the local market.',
    ],
    ctaTitle: "Scaling is hard. Don't do it alone.",
    ctaDesc: 'Apply for an evaluation and see if you can become part of the FORGE portfolio.',
    ctaButton: 'APPLY NOW',
  },
  hr: {
    pageTitle: 'Rast tvrtke',
    breadcrumb: 'Forge platforma za rast',
    title: 'FORGE: Od trakcije do skaliranja.',
    subtitle: 'Ne gradimo MVP-e, gradimo mašine za rast. Prva execution-first platforma u regiji za post-seed startupe.',
    heroButton: 'Prijavite svoj startup',
    whyTitle: 'ZAŠTO FORGE?',
    whySubtitle: 'Nismo akcelerator. Mi smo vaš growth partner',
    whyBody: 'Akceleratori uče teoriju i pomažu vam u prvoj rundi. Mi ulazimo kad to već imate. FORGE je dizajniran za osnivače koji su prerasli early-stage programe. Ne nudimo generičke predavanja, već operativni deep dive. Naš cilj nije Demo Day, već održiv rast prihoda, ulazak na nova tržišta i Series A spremnost.',
    processTitle: 'Kako radimo?',
    processTagline: 'Strukturiran proces, mjerljivi rezultati.',
    processDesc: 'Strukturirani, praktični pristup otključavanju vaše sljedeće faze rasta. Prijave su otvorene tijekom cijele godine. Naš Core Team filtrira kandidate. Tražimo dokazanu trakciju, jasnu ambiciju i tim spreman za brze promjene.',
    phases: [
      {
        step: '01',
        title: 'Dijagnoza skaliranja',
        duration: '4-6 tjedana',
        description: 'Prije trčanja identificiramo uska grla. Provodimo dubinsku analizu vašeg startupa – od pravne usklađenosti do tržišnog potencijala.',
        outcomes: [
          { label: 'Rezultat', text: 'Jasna hipoteza rasta i prioritetna mapa izvršenja. Daljnju suradnju odlučujemo nakon ove faze.' },
        ],
      },
      {
        step: '02',
        title: 'Izgradnja growth enginea',
        duration: '3-4 mjeseca',
        description: "Srce FORGE platforme. Spajamo vas s našim 'Cluster Leadsima' – iskusnim osnivačima koji rade 1-on-1 s vama.",
        outcomes: [
          { label: 'Fokus', text: 'Dizajn prodajnog procesa, strategija cijena, zapošljavanje ključnih uloga i razvoj kanala.' },
          { label: 'Rezultat', text: 'Ponovljiv sustav akvizicije korisnika (Repeatable Sales Motion).' },
        ],
      },
      {
        step: '03',
        title: 'Ekspanzija i kapitalni most',
        duration: '',
        description: 'Za one spremne za veliku ligu. Fokus na ekspanziju na nova tržišta i strateška partnerstva.',
        outcomes: [
          { label: 'Prikupljanje kapitala', text: 'Priprema "Deal Rooma", narativa za investitore i direktno povezivanje s VC fondovima u našoj mreži.' },
          { label: 'Rezultat', text: 'Investicijska higijena i spremnost za follow-on kapital.' },
        ],
      },
    ],
    knowledgeTitle: 'Znanje s terena, ne iz udžbenika.',
    knowledgeBody: 'Nećete raditi s teoretičarima, već s Operaterima – bivšim osnivačima i stručnjacima koji su već gradili, skalirali i prodavali svoje tvrtke. Koristimo Cluster-based Playbooks prilagođene vašem poslovnom modelu:',
    knowledgeClusters: [
      ['Enterprise Sales', 'Za one koji prodaju velikim sustavima (dugi ciklusi, jaka regulacija).'],
      ['Mid-market SaaS', 'Fokus na B2B pretplate i SME sektor.'],
      ['Platform & Marketplace', 'Za dvostrana tržišta i network effects.'],
    ] as [string, string][],
    tracksTitle: 'Fleksibilni modeli suradnje',
    tracksDesc: 'Svaki startup je jedinstven, pa nakon početne dijagnoze nudimo dva traka:',
    tracks: [
      {
        title: 'Client Track',
        tag: 'Strukturirana podrška',
        description: 'Za startupe koji trebaju riješiti specifične izazove rasta.',
        bullets: [
          'Ciljano mentorstvo i operativna podrška.',
          'Pristup FORGE alatima i mrežama.',
          'Model: Mjesečna naknada (Fee-based).',
        ],
      },
      {
        title: 'Partner Track',
        tag: 'Duboka integracija',
        description: "Za 'top performers' s kojima gradimo dugoročnu priču.",
        bullets: [
          'Intenzivno operativno uključivanje našeg tima u vaš posao.',
          'Direktan put do investicije.',
          'Model: Equity-based (Postajemo partneri u vašem uspjehu).',
        ],
      },
    ],
    readyTitle: 'Jeste li spremni za FORGE?',
    readyBody: 'Tražimo specifičan profil tvrtke. Prijavite se ako:',
    readyCriteria: [
      'Ste Post-seed ili snažan Late pre-seed.',
      'Imate klijente koji plaćaju ili snažne pilote.',
      'Imate osnivački tim spreman za operativne promjene i brzo donošenje odluka.',
      'Imate ambiciju proširiti se izvan lokalnog tržišta.',
    ],
    ctaTitle: 'Skaliranje je teško. Ne radite to sami.',
    ctaDesc: 'Prijavite se za evaluaciju i otkrijte možete li postati dio FORGE portfelja.',
    ctaButton: 'PRIJAVITE SE',
  },
}

export default function GrowYourCompanyPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <main>
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/locations/business-lounge/lounge-3.jpg" alt="Grow your company at WESPA" fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/75" />
          <div className="container-wespa relative z-10">
            <p className="text-wespa-red font-semibold mb-4">{c.breadcrumb}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.title}</h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl mb-8">
              {c.subtitle}
            </p>
            <Button variant="wespa" size="lg" asChild>
              <Link href="/contact?subject=forge">{c.heroButton}</Link>
            </Button>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-wespa">
            <div className="text-center mb-8 max-w-3xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-widest text-wespa-red mb-3">{c.whyTitle}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 leading-snug mb-6">{c.whySubtitle}</h2>
              <p className="text-lg text-stone-600 leading-relaxed">{c.whyBody}</p>
            </div>
          </div>
        </section>

        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">{c.processTitle}</h2>
            <p className="text-lg font-medium text-wespa-red text-center mb-4">{c.processTagline}</p>
            <p className="text-stone-600 text-center max-w-2xl mx-auto mb-16">
              {c.processDesc}
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              {c.phases.map((phase) => (
                <div key={phase.step} className="relative p-8 bg-white border border-stone-200 rounded-2xl">
                  <span className="text-5xl font-bold text-stone-100">{phase.step}</span>
                  <h3 className="text-xl font-bold mt-2 mb-1">{phase.title}</h3>
                  {phase.duration && (
                    <p className="text-sm text-wespa-red font-semibold mb-4">{phase.duration}</p>
                  )}
                  <p className="text-stone-600 mb-4">{phase.description}</p>
                  <div className="border-t border-stone-200 pt-4 space-y-3">
                    {phase.outcomes.map((o) => (
                      <div key={o.label}>
                        <p className="text-xs font-semibold uppercase tracking-widest text-stone-600 mb-1">{o.label}</p>
                        <p className="text-sm text-stone-700">{o.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-wespa">
            <div className="bg-stone-900 text-white rounded-3xl p-10 md:p-16 max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">{c.knowledgeTitle}</h2>
              <p className="text-lg text-stone-300 leading-relaxed text-center max-w-3xl mx-auto mb-10">{c.knowledgeBody}</p>
              <div className="grid gap-6 md:grid-cols-3">
                {c.knowledgeClusters.map(([t, d]) => (
                  <div key={t} className="bg-stone-800 rounded-2xl p-6">
                    <h3 className="font-bold text-white mb-2">{t}</h3>
                    <p className="text-sm text-stone-300 leading-relaxed">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{c.tracksTitle}</h2>
            <p className="text-stone-600 text-center max-w-2xl mx-auto mb-16">
              {c.tracksDesc}
            </p>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {c.tracks.map((track) => (
                <div key={track.title} className="p-8 bg-white border border-stone-200 rounded-2xl flex flex-col">
                  <h3 className="text-2xl font-bold mb-2 text-stone-900">{track.title}</h3>
                  <span className="inline-block self-start px-3 py-1 bg-wespa-red/10 text-wespa-red text-xs font-semibold rounded-full mb-4">
                    {track.tag}
                  </span>
                  <p className="text-stone-600 mb-6 leading-relaxed">{track.description}</p>
                  <ul className="space-y-3 mb-6">
                    {track.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-stone-700">
                        <span className="text-wespa-red mt-0.5">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-wespa">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{c.readyTitle}</h2>
                <p className="text-stone-600 max-w-2xl mx-auto">{c.readyBody}</p>
              </div>
              <ul className="grid md:grid-cols-2 gap-4">
                {c.readyCriteria.map((cr) => (
                  <li key={cr} className="bg-white border border-stone-200 rounded-2xl p-5 flex items-start gap-3">
                    <span className="text-wespa-red mt-0.5">✓</span>
                    <span className="text-stone-700">{cr}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section-spacing bg-stone-900 text-white">
          <div className="container-wespa text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{c.ctaTitle}</h2>
            <p className="text-stone-300 max-w-xl mx-auto mb-8">
              {c.ctaDesc}
            </p>
            <Button variant="wespa" size="lg" asChild>
              <Link href="/contact?subject=forge">{c.ctaButton}</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
