'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Special Events',
    breadcrumb: 'Events',
    title: 'Custom Special Events',
    subtitle: 'From intimate dinners to large private celebrations with full organizational support. WESPA provides a space that adapts to your concept and audience.',
    foodDrinkTitle: 'Food & Drink',
    foodDrinkSubtitle: 'Two restaurants and full custom catering — all in-house.',
    foodDrink: [
      { title: 'Restaurant Papel', description: 'Refined Mediterranean cuisine for elegant occasions.', image: '/images/food/papel/papel-1.jpg', href: '/food/papel' },
      { title: 'Restaurant SPOT', description: 'Contemporary casual menus for vibrant gatherings.', image: '/images/food/spot/spot-1.jpg', href: '/food/spot' },
      { title: 'Custom Catering', description: 'Tailored menus, plated dinners, and cocktail receptions designed for your event.', image: '/images/events/special/event-1.jpg', href: '/contact' },
    ],
    whatWeHost: 'What We Host',
    whatWeHostDesc: 'Every special event is unique. We work closely with you to design an experience that reflects your personality and exceeds your expectations.',
    eventCategories: [
      { name: 'Private Celebrations', description: 'Birthday parties, anniversaries, milestone events, and intimate gatherings tailored to your vision.' },
      { name: 'Weddings & Receptions', description: 'Elegant wedding ceremonies and receptions with premium catering, custom decor, and dedicated coordination.' },
      { name: 'Concerts & Performances', description: 'Live music events, showcases, and performances with professional stage, sound, and lighting setups.' },
      { name: 'Full Event Organisation', description: 'End-to-end planning and execution for any occasion — from concept development to day-of management.' },
    ],
    servicesTitle: 'Full-Service Production',
    servicesDesc: 'We bring together catering, production, and entertainment under one roof so your event runs seamlessly from start to finish.',
    services: [
      { title: 'Papel & SPOT Catering', description: 'In-house catering from our own restaurants. Papel offers refined Mediterranean cuisine while SPOT delivers contemporary casual menus. Custom menus available for any event size.' },
      { title: 'AV Production', description: 'Professional audio-visual equipment and technicians. High-definition projection, multi-channel sound systems, stage lighting, and custom visual setups.' },
      { title: 'Entertainment', description: 'Curated entertainment options including DJs, live bands, performers, and MCs. We connect you with trusted professionals who match your event style.' },
      { title: 'Live Streaming', description: 'Broadcast your event to remote audiences with multi-camera live streaming, professional mixing, and platform integration for hybrid events.' },
    ],
    ctaTitle: 'Let\'s Plan Your Celebration',
    ctaDesc: 'Tell us about your event and our team will craft a tailored proposal. No commitment required.',
    ctaButton: 'Get in Touch',
  },
  // TODO i18n HR — atualizar copy EN aplicado em 02/05/2026 (figma feedback #91-#107)
  hr: {
    pageTitle: 'Posebni događaji',
    breadcrumb: 'Događanja',
    title: 'Posebni događaji',
    subtitle: 'Od intimnih večera do velikih privatnih proslava uz potpunu organizacijsku podršku. WESPA nudi prostor koji se prilagođava vašoj ideji i publici.',
    foodDrinkTitle: 'Hrana i piće',
    foodDrinkSubtitle: 'Dva restorana i potpuno prilagođen catering — sve in-house.',
    foodDrink: [
      { title: 'Restoran Papel', description: 'Rafinirana mediteranska kuhinja za elegantne prilike.', image: '/images/food/papel/papel-1.jpg', href: '/food/papel' },
      { title: 'Restoran SPOT', description: 'Suvremeni ležerni jelovnici za živahna okupljanja.', image: '/images/food/spot/spot-1.jpg', href: '/food/spot' },
      { title: 'Prilagođeni catering', description: 'Prilagođeni jelovnici, večere i koktel prijemi dizajnirani za vaš događaj.', image: '/images/events/special/event-1.jpg', href: '/contact' },
    ],
    whatWeHost: 'Što organiziramo',
    whatWeHostDesc: 'Svaki posebni događaj je jedinstven. Blisko surađujemo s vama kako bismo dizajnirali iskustvo koje odražava vašu osobnost i nadmašuje vaša očekivanja.',
    eventCategories: [
      { name: 'Privatne proslave', description: 'Rođendanske zabave, obljetnice, svečani događaji i intimna okupljanja prilagođena vašoj viziji.' },
      { name: 'Vjenčanja i prijemi', description: 'Elegantna vjenčanja i prijemi s premium cateringom, prilagođenim dekorom i posvećenom koordinacijom.' },
      { name: 'Koncerti i nastupi', description: 'Koncerti uživo, showcaseovi i nastupi s profesionalnom pozornicom, zvukom i rasvjetom.' },
      { name: 'Potpuna organizacija događaja', description: 'Planiranje i izvršenje od početka do kraja za svaku priliku — od razvoja koncepta do upravljanja na dan događaja.' },
    ],
    servicesTitle: 'Cjelovita produkcija',
    servicesDesc: 'Spajamo catering, produkciju i zabavu pod jednim krovom kako bi vaš događaj tekao besprijekorno od početka do kraja.',
    services: [
      { title: 'Papel i SPOT catering', description: 'Vlastiti catering iz naših restorana. Papel nudi rafinirano mediteransko jelo, dok SPOT donosi suvremene ležerne jelovnike. Prilagođeni jelovnici za svaku veličinu događaja.' },
      { title: 'AV produkcija', description: 'Profesionalna audio-vizualna oprema i tehničari. HD projekcija, višekanalni zvučni sustavi, scensko osvjetljenje i prilagođene vizualne postavke.' },
      { title: 'Zabava', description: 'Kurirani zabavni sadržaji uključujući DJ-eve, live bendove, izvođače i voditelje. Povezujemo vas s provjerenim profesionalcima koji odgovaraju stilu vašeg događaja.' },
      { title: 'Live streaming', description: 'Prenesite svoj događaj udaljenoj publici s višekamernim live streamingom, profesionalnim miksanjem i integracijom platformi za hibridne događaje.' },
    ],
    ctaTitle: 'Isplanirajmo vašu proslavu',
    ctaDesc: 'Recite nam o svom događaju i naš tim izraditi će prilagođeni prijedlog. Bez obveza.',
    ctaButton: 'Kontaktirajte nas',
  },
}

export default function CustomSpecialEventsPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <title>{c.pageTitle} | WESPA</title>
      <meta name="description" content={c.subtitle} />
      <main>
        {/* Hero */}
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/events/special/event-1.jpg" alt="WESPA special event" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/75" />
          <div className="container-wespa relative z-10">
            <p className="text-wespa-red font-semibold mb-4">{c.breadcrumb}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.title}</h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
              {c.subtitle}
            </p>
          </div>
        </section>

        {/* Food & Drink — figma feedback #95 */}
        <section className="section-spacing">
          <div className="container-wespa">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">{c.foodDrinkTitle}</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">{c.foodDrinkSubtitle}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {c.foodDrink.map((item) => (
                <Link key={item.title} href={item.href} className="group bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-card-hover transition-shadow">
                  <div className="relative aspect-[5/3]">
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-wespa-red transition-colors">{item.title}</h3>
                    <p className="text-stone-600 text-sm">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Event Categories */}
        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">{c.whatWeHost}</h2>
            <p className="text-stone-600 mb-10 max-w-2xl">
              {c.whatWeHostDesc}
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {c.eventCategories.map((category) => (
                <div
                  key={category.name}
                  className="p-8 bg-white border border-stone-200 rounded-2xl"
                >
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{category.name}</h3>
                  <p className="text-stone-600">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">{c.servicesTitle}</h2>
            <p className="text-stone-600 mb-10 max-w-2xl">
              {c.servicesDesc}
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              {c.services.map((service) => (
                <div key={service.title} className="flex gap-4">
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

        {/* CTA */}
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
