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
    // WHY FORGE? — figma feedback #157
    whyTitle: 'WHY FORGE?',
    whySubtitle: "Because scaling shouldn't be guesswork. FORGE pairs proven operators with ambitious founders to compress 5 years of growth into 18 months.",
    why: [
      { title: 'Operator-led mentorship', description: 'Real founders who shipped and exited — not consultants reading playbooks.' },
      { title: 'Capital network', description: 'Direct introductions to regional VCs, angels, and strategic partners.' },
      { title: 'Hands-on integration', description: 'We work inside your business — strategy, sales, hiring, and operations.' },
      { title: 'Croatia-to-EU bridge', description: 'A clear path from Croatian traction to a credible European story.' },
    ],
    // Application process — figma feedback #158
    applicationTitle: 'Application process',
    applicationBody: 'Applications are open year-round. Our Core Team filters candidates. We look for proven traction, clear ambition, and founder-market fit.',
    // Process / Phases — figma feedback #159-#166
    processTitle: 'Our Process',
    processDesc: 'A structured, hands-on approach to unlocking your next stage of growth.',
    phases: [
      {
        step: '01',
        title: 'Scale Diagnosis',
        duration: '4-6 weeks',
        description: 'Before we run, we identify the bottlenecks. We conduct a deep analysis of your startup – from legal structure to growth funnels.',
        outcomeLabel: 'Outcome',
        outcome: 'A clear growth hypothesis.',
      },
      {
        step: '02',
        title: 'Mentorship Pairing',
        duration: '3-4 months',
        description: "The heart of the FORGE platform. We pair you with our 'Cluster Leads' – experienced founders who work 1-on-1 with you.",
        outcomeLabel: 'Focus',
        outcome: 'Sales process design, pricing strategy, hiring key roles, and operational unblocking.',
      },
      {
        step: '03',
        title: 'Market Expansion',
        duration: 'Ongoing',
        description: 'For those ready for the big leagues. We focus on new market expansion and strategic partnerships.',
        outcomeLabel: 'Fundraising',
        outcome: "Preparation of the 'Deal Room', investor narrative, and capital introductions.",
      },
    ],
    // Knowledge from the Trenches — figma feedback #167
    knowledgeTitle: 'Knowledge from the Trenches, Not Textbooks.',
    knowledgeBody: 'Our methodology is built on real operator scars — successful exits, painful pivots, and hard-won unit economics. No frameworks copy-pasted from books.',
    // Flexible Engagement Models — figma feedback #168-#177
    tracksTitle: 'Flexible Engagement Models',
    tracksDesc: 'Every startup is unique, so we offer two tracks after the initial diagnosis:',
    tracks: [
      {
        title: 'Structured Support',
        description: 'For startups needing to solve specific growth challenges.',
        bullet: 'Targeted mentorship and operational support.',
        cta: 'Learn More',
      },
      {
        title: 'Deep Integration',
        description: "For 'top performers' with whom we build a long-term story.",
        bullet: 'Intensive operational involvement of our team in your business.',
        cta: 'Apply now',
      },
    ],
    // Are You Ready for FORGE? — figma feedback #178
    readyTitle: 'Are You Ready for FORGE?',
    readyBody: 'We look for a specific founder profile: technical or domain depth, willingness to be challenged, traction signal, and 5+ year ambition.',
    readyCriteria: [
      'Proven traction (paying customers, retention)',
      'Clear ambition for European or global scale',
      'Coachable founders with operator instincts',
      'Team and capital structure ready to grow',
    ],
    // CTA — figma feedback #179-#181
    ctaTitle: "Scaling is hard. Don't do it alone.",
    ctaDesc: 'Apply for an evaluation and see if you can become part of the FORGE portfolio.',
    ctaButton: 'Apply now',
  },
  // TODO i18n HR — atualizar copy EN aplicado em 02/05/2026 (figma feedback #157-#181)
  hr: {
    pageTitle: 'Rast tvrtke',
    breadcrumb: 'Forge platforma za rast',
    title: 'FORGE: Od trakcije do skaliranja.',
    subtitle: 'Ne gradimo MVP-e, gradimo mašine za rast. Prva execution-first platforma u regiji za post-seed startupe.',
    whyTitle: 'ZAŠTO FORGE?',
    whySubtitle: 'Jer skaliranje ne bi smjelo biti nagađanje. FORGE spaja iskusne operatera s ambicioznim osnivačima kako bi 5 godina rasta sažeo u 18 mjeseci.',
    why: [
      { title: 'Mentorstvo iskusnih operatera', description: 'Pravi osnivači koji su isporučili i izašli — ne konzultanti koji čitaju knjige.' },
      { title: 'Mreža kapitala', description: 'Direktni uvodi u regionalne VC fondove, anđele i strateške partnere.' },
      { title: 'Praktična integracija', description: 'Radimo unutar vašeg posla — strategija, prodaja, zapošljavanje i operacije.' },
      { title: 'Most Hrvatska–EU', description: 'Jasan put od hrvatske trakcije do uvjerljive europske priče.' },
    ],
    applicationTitle: 'Postupak prijave',
    applicationBody: 'Prijave su otvorene tijekom cijele godine. Naš Core Team filtrira kandidate. Tražimo dokazanu trakciju, jasnu ambiciju i founder-market fit.',
    processTitle: 'Naš proces',
    processDesc: 'Strukturirani, praktični pristup otključavanju vaše sljedeće faze rasta.',
    phases: [
      {
        step: '01',
        title: 'Dijagnoza skaliranja',
        duration: '4-6 tjedana',
        description: 'Prije trčanja identificiramo uska grla. Provodimo dubinsku analizu vašeg startupa – od pravne strukture do funnel-a rasta.',
        outcomeLabel: 'Rezultat',
        outcome: 'Jasna hipoteza rasta.',
      },
      {
        step: '02',
        title: 'Spajanje mentora',
        duration: '3-4 mjeseca',
        description: "Srce FORGE platforme. Spajamo vas s našim 'Cluster Leadsima' – iskusnim osnivačima koji rade 1-on-1 s vama.",
        outcomeLabel: 'Fokus',
        outcome: 'Dizajn prodajnog procesa, strategija cijena, zapošljavanje ključnih uloga i operativno odblokiravanje.',
      },
      {
        step: '03',
        title: 'Tržišna ekspanzija',
        duration: 'Kontinuirano',
        description: 'Za one spremne za veliku ligu. Fokus na ekspanziju na nova tržišta i strateška partnerstva.',
        outcomeLabel: 'Prikupljanje kapitala',
        outcome: "Priprema 'Deal Rooma', narativa za investitore i uvodi u kapital.",
      },
    ],
    knowledgeTitle: 'Znanje s terena, ne iz udžbenika.',
    knowledgeBody: 'Naša metodologija izgrađena je na stvarnim ožiljcima operatera — uspješnim izlazima, bolnim pivotima i teško izborenoj unit economics matematici. Nema framework-a kopiranih iz knjiga.',
    tracksTitle: 'Fleksibilni modeli suradnje',
    tracksDesc: 'Svaki startup je jedinstven, pa nakon početne dijagnoze nudimo dva traka:',
    tracks: [
      {
        title: 'Strukturirana podrška',
        description: 'Za startupe koji trebaju riješiti specifične izazove rasta.',
        bullet: 'Ciljano mentorstvo i operativna podrška.',
        cta: 'Saznaj više',
      },
      {
        title: 'Duboka integracija',
        description: "Za 'top performers' s kojima gradimo dugoročnu priču.",
        bullet: 'Intenzivno operativno uključivanje našeg tima u vaš posao.',
        cta: 'Prijavite se',
      },
    ],
    readyTitle: 'Jeste li spremni za FORGE?',
    readyBody: 'Tražimo specifičan profil osnivača: tehničku ili domenski dubinu, spremnost na izazove, signal trakcije i ambiciju 5+ godina.',
    readyCriteria: [
      'Dokazana trakcija (klijenti koji plaćaju, retencija)',
      'Jasna ambicija europske ili globalne skale',
      'Osnivači spremni na coaching s operativnim instinktom',
      'Tim i kapital spremni za rast',
    ],
    ctaTitle: 'Skaliranje je teško. Ne radite to sami.',
    ctaDesc: 'Prijavite se za evaluaciju i otkrijte možete li postati dio FORGE portfelja.',
    ctaButton: 'Prijavite se',
  },
}

export default function GrowYourCompanyPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <title>{c.pageTitle} | WESPA</title>
      <meta name="description" content={c.subtitle} />
      <main>
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/locations/business-lounge/lounge-3.jpg" alt="Grow your company at WESPA" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/75" />
          <div className="container-wespa relative z-10">
            <p className="text-wespa-red font-semibold mb-4">{c.breadcrumb}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.title}</h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
              {c.subtitle}
            </p>
          </div>
        </section>

        {/* WHY FORGE? — figma feedback #157 */}
        <section className="section-spacing">
          <div className="container-wespa">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-wespa-red mb-3">{c.whyTitle}</p>
              <p className="text-2xl md:text-3xl font-bold text-stone-900 max-w-3xl mx-auto leading-snug">{c.whySubtitle}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {c.why.map((item) => (
                <div key={item.title} className="bg-white border border-stone-200 rounded-2xl p-6">
                  <h3 className="font-bold text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Application process — figma feedback #158 */}
            <div className="mt-12 max-w-3xl mx-auto bg-stone-50 rounded-3xl p-8">
              <h3 className="text-lg font-bold mb-2 text-stone-900">{c.applicationTitle}</h3>
              <p className="text-stone-600 leading-relaxed">{c.applicationBody}</p>
            </div>
          </div>
        </section>

        {/* 3-Phase Process — figma feedback #159-#166 */}
        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{c.processTitle}</h2>
            <p className="text-stone-600 text-center max-w-2xl mx-auto mb-16">
              {c.processDesc}
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              {c.phases.map((phase) => (
                <div key={phase.step} className="relative p-8 bg-white border border-stone-200 rounded-2xl">
                  <span className="text-5xl font-bold text-stone-100">{phase.step}</span>
                  <h3 className="text-xl font-bold mt-2 mb-1">{phase.title}</h3>
                  <p className="text-sm text-wespa-red font-semibold mb-4">{phase.duration}</p>
                  <p className="text-stone-600 mb-4">{phase.description}</p>
                  <div className="border-t border-stone-200 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-1">{phase.outcomeLabel}</p>
                    <p className="text-sm text-stone-700">{phase.outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Knowledge from the Trenches — figma feedback #167 */}
        <section className="section-spacing">
          <div className="container-wespa">
            <div className="bg-stone-900 text-white rounded-3xl p-10 md:p-16 max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{c.knowledgeTitle}</h2>
              <p className="text-lg text-stone-300 leading-relaxed">{c.knowledgeBody}</p>
            </div>
          </div>
        </section>

        {/* Flexible Engagement Models — figma feedback #168-#177 */}
        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{c.tracksTitle}</h2>
            <p className="text-stone-600 text-center max-w-2xl mx-auto mb-16">
              {c.tracksDesc}
            </p>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {c.tracks.map((track) => (
                <div key={track.title} className="p-8 bg-white border border-stone-200 rounded-2xl flex flex-col">
                  <h3 className="text-2xl font-bold mb-3 text-stone-900">{track.title}</h3>
                  <p className="text-stone-600 mb-6 leading-relaxed">{track.description}</p>
                  <p className="flex items-start gap-3 text-stone-700 mb-6 flex-1">
                    <span className="text-wespa-red mt-0.5">✓</span>
                    {track.bullet}
                  </p>
                  <Button variant="secondary" asChild>
                    <Link href="/contact?subject=forge">{track.cta}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Are You Ready for FORGE? — figma feedback #178 */}
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

        {/* CTA — figma feedback #179-#181 */}
        <section className="section-spacing bg-stone-900 text-white">
          <div className="container-wespa text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{c.ctaTitle}</h2>
            <p className="text-stone-300 max-w-xl mx-auto mb-8">
              {c.ctaDesc}
            </p>
            <Button variant="wespa" size="lg" asChild>
              {/* TODO figma #181 — confirmar destino real (form custom?). Hoje aponta pra /contact?subject=forge. */}
              <Link href="/contact?subject=forge">{c.ctaButton}</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
