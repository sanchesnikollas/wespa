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
    subtitle: 'We don\'t build MVPs; we build growth engines. The region\'s first execution-first platform for post-seed startups ready for global expansion.',
    processTitle: 'Our Process',
    processDesc: 'A structured, hands-on approach to unlocking your next stage of growth.',
    phases: [
      { step: '01', title: 'Diagnosis', duration: '4-6 weeks', description: 'Deep-dive analysis of your business model, market position, team structure, and growth blockers. We identify what is working, what is not, and where the highest-leverage opportunities lie.' },
      { step: '02', title: 'Growth Engine Build', duration: '3-4 months', description: 'Hands-on collaboration to build and activate your core growth systems — from go-to-market strategy and sales infrastructure to hiring playbooks and operational processes.' },
      { step: '03', title: 'Expansion & Capital Bridge', duration: 'Ongoing', description: 'Support for scaling into new markets, fundraising preparation, investor introductions, and strategic partnerships to accelerate your trajectory.' },
    ],
    tracksTitle: 'Two Ways to Work Together',
    tracksDesc: 'Choose the engagement model that fits your company and ambitions.',
    tracks: [
      { title: 'Client Track', subtitle: 'Fee-based engagement', description: 'Fixed monthly fee for structured advisory, workshops, and hands-on support. Ideal for companies that prefer a clear cost structure.', cta: 'Learn More' },
      { title: 'Partner Track', subtitle: 'Equity-based engagement', description: 'We invest our time and expertise in exchange for equity. Reserved for high-potential companies where we see strong alignment and upside.', cta: 'Apply Now' },
    ],
    ctaTitle: 'Ready to Scale?',
    ctaDesc: 'If you have a proven product, paying customers, and a team ready to grow — let\'s talk.',
    ctaButton: 'Apply Your Startup',
  },
  hr: {
    pageTitle: 'Rast tvrtke',
    breadcrumb: 'Forge platforma za rast',
    title: 'FORGE: Od trakcije do skaliranja.',
    subtitle: 'Ne gradimo MVP-e, gradimo mašine za rast. Prva execution-first platforma u regiji za post-seed startupe.',
    processTitle: 'Naš proces',
    processDesc: 'Strukturirani, praktični pristup otključavanju vaše sljedeće faze rasta.',
    phases: [
      { step: '01', title: 'Dijagnoza', duration: '4-6 tjedana', description: 'Dubinska analiza vašeg poslovnog modela, tržišne pozicije, strukture tima i blokada rasta. Identificiramo što funkcionira, što ne i gdje su prilike s najvećim utjecajem.' },
      { step: '02', title: 'Izgradnja motora rasta', duration: '3-4 mjeseca', description: 'Praktična suradnja na izgradnji i aktivaciji vaših ključnih sustava rasta — od strategije izlaska na tržište i prodajne infrastrukture do priručnika za zapošljavanje i operativnih procesa.' },
      { step: '03', title: 'Ekspanzija i kapitalni most', duration: 'Kontinuirano', description: 'Podrška za skaliranje na nova tržišta, pripremu za prikupljanje sredstava, uvode investitorima i strateška partnerstva za ubrzanje vaše putanje.' },
    ],
    tracksTitle: 'Dva načina suradnje',
    tracksDesc: 'Odaberite model angažmana koji odgovara vašoj tvrtki i ambicijama.',
    tracks: [
      { title: 'Klijentski model', subtitle: 'Angažman na bazi naknada', description: 'Fiksna mjesečna naknada za strukturirano savjetovanje, radionice i praktičnu podršku. Idealno za tvrtke koje preferiraju jasnu strukturu troškova.', cta: 'Saznaj više' },
      { title: 'Partnerski model', subtitle: 'Angažman na bazi udjela', description: 'Ulažemo svoje vrijeme i stručnost u zamjenu za udio. Rezervirano za tvrtke visokog potencijala s kojima vidimo snažno podudaranje i perspektivu.', cta: 'Prijavite se' },
    ],
    ctaTitle: 'Spremni za skaliranje?',
    ctaDesc: 'Ako imate dokazan proizvod, klijente koji plaćaju i tim spreman za rast — razgovarajmo.',
    ctaButton: 'Prijavite svoj startup',
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

        {/* 3-Phase Process */}
        <section className="section-spacing">
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
                  <p className="text-stone-600">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Engagement Models */}
        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{c.tracksTitle}</h2>
            <p className="text-stone-600 text-center max-w-2xl mx-auto mb-16">
              {c.tracksDesc}
            </p>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {c.tracks.map((track) => (
                <div key={track.title} className="p-8 bg-white border border-stone-200 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-1">{track.title}</h3>
                  <p className="text-wespa-red font-semibold text-sm mb-4">{track.subtitle}</p>
                  <p className="text-stone-600 mb-6">{track.description}</p>
                  <Button variant="secondary" asChild>
                    <Link href="/contact">{track.cta}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-spacing">
          <div className="container-wespa text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{c.ctaTitle}</h2>
            <p className="text-stone-600 max-w-xl mx-auto mb-8">
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
