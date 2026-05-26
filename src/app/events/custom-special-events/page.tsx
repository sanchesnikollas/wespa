'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Special Events',
    breadcrumb: 'Events / Custom Special Events',
    title: 'Your idea, our stage.',
    subtitle: 'From intimate dinners to large private celebrations with full organizational support. WESPA provides a space that transforms according to your vision. Whether you are planning a wedding with a modern twist, a private concert, or an exclusive dinner at SPOT, we deliver top-tier production, custom catering, and an ambiance to remember.',
    foodDrinkTitle: 'Food & Drink',
    foodDrinkSubtitle: 'Good food makes a great event even better.',
    foodDrinkBody: 'Restaurant Papel & restaurant SPOT offer a wide range of contemporary international and regional cuisine. Our focus is on quality ingredients and the highest level of service, whether for an elegant fine dining experience or a relaxed buffet.',
    foodDrink: [
      { title: 'Restaurant Papel', description: 'Refined Mediterranean cuisine for elegant occasions.', image: '/images/food/papel/papel-1.jpg', href: '/food/papel' },
      { title: 'Restaurant SPOT', description: 'Contemporary casual menus for vibrant gatherings.', image: '/images/food/spot/spot-1.jpg', href: '/food/spot' },
    ],
    servicesTitle: 'Full Service Support',
    servicesDesc: 'We provide complete event organization with professional consulting in all aspects:',
    services: [
      { title: 'AV Production', description: 'Sound systems, professional lighting, and technical support.' },
      { title: 'Entertainment', description: 'Booking and coordination of DJs or live bands.' },
      { title: 'Stage & Media', description: 'Stage setup and live streaming for remote guests.' },
    ],
    ctaTitle: 'Let\'s Plan Your Celebration',
    ctaDesc: 'Tell us about your event and our team will craft a tailored proposal. No commitment required.',
    ctaButton: 'Check date availability for your event.',
  },
  hr: {
    pageTitle: 'Posebni događaji',
    breadcrumb: 'Događanja / Posebni događaji',
    title: 'Vaša ideja, naša pozornica.',
    subtitle: 'Od intimnih večera do velikih privatnih proslava uz potpunu organizacijsku podršku. WESPA nudi prostor koji se transformira prema vašoj viziji. Bilo da planirate vjenčanje s modernim štihom, privatni koncert ili ekskluzivnu večeru u SPOT-u, donosimo vrhunsku produkciju, prilagođeni catering i ambijent koji se pamti.',
    foodDrinkTitle: 'Hrana i piće',
    foodDrinkSubtitle: 'Dobra hrana čini sjajan događaj još boljim.',
    foodDrink: [
      { title: 'Restoran Papel', description: 'Rafinirana mediteranska kuhinja za elegantne prilike.', image: '/images/food/papel/papel-1.jpg', href: '/food/papel' },
      { title: 'Restoran SPOT', description: 'Suvremeni ležerni jelovnici za živahna okupljanja.', image: '/images/food/spot/spot-1.jpg', href: '/food/spot' },
    ],
    servicesTitle: 'Podrška',
    servicesDesc: 'Pružamo cjelovitu organizaciju događanja uz profesionalno savjetovanje u svim aspektima:',
    services: [
      { title: 'AV produkcija', description: 'Zvučni sustavi, profesionalna rasvjeta i tehnička podrška.' },
      { title: 'Zabava', description: 'Rezervacija i koordinacija DJ-eva ili live bendova.' },
      { title: 'Pozornica i mediji', description: 'Postavljanje pozornice i live streaming za udaljene goste.' },
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
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/events/special/event-1.jpg" alt="WESPA special event" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/75" />
          <div className="container-wespa relative z-10">
            <p className="text-wespa-red font-semibold mb-4">{c.breadcrumb}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.title}</h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-3xl">
              {c.subtitle}
            </p>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-wespa">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">{c.foodDrinkTitle}</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">{c.foodDrinkSubtitle}</p>
              {'foodDrinkBody' in c && (
                <p className="text-stone-600 max-w-2xl mx-auto mt-4">{(c as { foodDrinkBody?: string }).foodDrinkBody}</p>
              )}
            </div>
            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {c.foodDrink.map((item) => (
                <Link key={item.title} href={item.href} className="group bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-card-hover transition-shadow">
                  <div className="relative aspect-[5/3]">
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
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

        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">{c.servicesTitle}</h2>
            <p className="text-stone-600 mb-10 max-w-2xl">{c.servicesDesc}</p>

            <div className="grid gap-8 md:grid-cols-3">
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
