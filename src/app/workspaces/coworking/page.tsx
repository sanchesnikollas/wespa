'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Coworking',
    breadcrumb: 'Workspaces / Coworking',
    title: 'Workspace that works for you.',
    subtitle: 'Choose a plan that matches your pace. High-end infrastructure, fiber-optic internet, and a quiet, distraction-free environment.',
    mostPopular: 'Most Popular',
    getStarted: 'Get Started',
    vat: '+ VAT',
    galleryTitle: 'Our Coworking Spaces',
    amenities: {
      title: 'Standard Amenities',
      subtitle: 'Every plan includes full access to the WESPA infrastructure.',
      items: [
        'Zero Overhead: Utilities, cleaning, and maintenance are all handled by us.',
        'Call Privacy: Access to soundproof phone booths for private calls.',
        'Organic Networking: Direct access to a network of professionals and partners within the WESPA ecosystem.',
        'Meeting rooms: Available upon reservation.',
        'Recharge Zones: Access to fully equipped kitchens and lounge areas.',
      ],
    },
    plans: [
      { name: 'FlyDesk', price: '€30', period: '/day', image: '/images/workspaces/coworking/coworking-1.jpg', description: 'Your office for a day. Includes a desk and ergonomic chair in the coworking area, high-speed internet, and 1 hour of meeting room access. Possible to rent a monitor. Perfect for focused, short-term tasks.', features: ['Access to any available desk', 'High-speed WiFi', 'Meeting room access', 'Print & scan services', 'Community events', 'Lounge access'] },
      { name: 'FlyDesk + Lunch', price: '€35', period: '/day', image: '/images/workspaces/coworking/coworking-4.jpg', description: 'FlyDesk plus a meal of your choice from the daily menu (available at both locations).', features: ['All FlyDesk benefits', 'Daily lunch included', 'Choice of Papel or SPOT', 'Healthy, fresh options'] },
      { name: 'OwnDesk', price: '€219', period: '/month', image: '/images/workspaces/coworking/coworking-7.jpg', description: 'Your permanent workstation in the coworking zone. A dedicated home base with internet access and fair-use printing/scanning included.', features: ['Personal dedicated desk', 'Lockable storage', '24/7 access', 'Meeting room credits', 'Mail handling', 'High-speed WiFi'], popular: true },
      { name: 'OfficeDesk', price: '€226', period: '/month', image: '/images/workspaces/coworking/coworking-9.jpg', description: 'A dedicated desk within a shared office. For those who need office stability with full logistics support and printing services included.', features: ['Private office (2-6 people)', 'Dedicated phone line', 'Meeting room credits', '24/7 access', 'Custom branding options', 'Priority support'] },
    ],
  },
  hr: {
    pageTitle: 'Coworking',
    breadcrumb: 'Prostori / Coworking',
    title: 'Radni prostor koji radi za vas.',
    subtitle: 'Fleksibilni, dinamični prostori za stotine zadovoljnih profesionalaca. Naši coworking prostori nalaze se u poluotvorenim područjima, postižući savršen kompromis između suradničkog rada i mirnog radnog okruženja.',
    mostPopular: 'Najpopularniji',
    getStarted: 'Započni',
    vat: '+ PDV',
    galleryTitle: 'Naši coworking prostori',
    amenities: {
      title: 'Standardne pogodnosti',
      subtitle: 'Svaki plan uključuje puni pristup WESPA infrastrukturi.',
      items: [
        'Zero Overhead: Režije, čišćenje i održavanje rješavamo mi.',
        'Privatni pozivi: Pristup zvučno izoliranim kabinama za privatne pozive.',
        'Organski networking: Direktan pristup mreži profesionalaca i partnera unutar WESPA ekosustava.',
        'Sobe za sastanke: Dostupne uz rezervaciju.',
        'Recharge Zone: Pristup potpuno opremljenim kuhinjama i loungeu.',
      ],
    },
    plans: [
      { name: 'FlyDesk', price: '€30', period: '/dan', image: '/images/workspaces/coworking/coworking-1.jpg', description: 'Ured na jedan dan. Dobivaš radni stol i ergonomsku stolicu u coworking prostoru, brz internet i jedan sat korištenja sobe za sastanke. Mogućnost najma monitora. Idealno za fokusirane, kratkoročne zadatke.', features: ['Pristup bilo kojem dostupnom stolu', 'Brzi WiFi', 'Pristup sobama za sastanke', 'Usluge ispisa i skeniranja', 'Događanja zajednice', 'Pristup loungeu'] },
      { name: 'FlyDesk + Ručak', price: '€35', period: '/dan', image: '/images/workspaces/coworking/coworking-4.jpg', description: 'FlyDesk te dnevni obrok po izboru iz naše dnevne ponude (vrijedi za obje lokacije).', features: ['Sve FlyDesk pogodnosti', 'Dnevni ručak uključen', 'Izbor Papel ili SPOT', 'Zdravi, svježi obroci'] },
      { name: 'OwnDesk', price: '€219', period: '/mjesec', image: '/images/workspaces/coworking/coworking-7.jpg', description: 'Tvoj osobni radni stol u coworking zoni. Stalna baza koja uključuje internet te ispis i skeniranje dokumenata.', features: ['Osobni dodijeljeni stol', 'Zaključivo spremište', '24/7 pristup', 'Krediti za sobe za sastanke', 'Primanje pošte', 'Brzi WiFi'], popular: true },
      { name: 'OfficeDesk', price: '€226', period: '/mjesec', image: '/images/workspaces/coworking/coworking-9.jpg', description: 'Radni stol smješten u dijeljenom uredu. Za sve koji trebaju stabilnost ureda uz punu logističku podršku.', features: ['Privatni ured (2-6 osoba)', 'Namjenska telefonska linija', 'Krediti za sobe za sastanke', '24/7 pristup', 'Mogućnosti brendiranja', 'Prioritetna podrška'] },
    ],
  },
}

export default function CoworkingPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <main>
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/workspaces/coworking/coworking-2.jpg" alt="WESPA coworking space" fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/75" />
          <div className="container-wespa relative z-10">
            <p className="text-wespa-red font-semibold mb-4">{c.breadcrumb}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.title}</h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
              {c.subtitle}
            </p>
          </div>
        </section>

        <section className="section-spacing" aria-labelledby="coworking-plans-heading">
          <div className="container-wespa">
            <h2 id="coworking-plans-heading" className="sr-only">
              {language === 'en' ? 'Coworking Plans' : 'Coworking planovi'}
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {c.plans.map((plan) => (
                <div key={plan.name} className={`relative bg-white border rounded-2xl overflow-hidden flex flex-col ${plan.popular ? 'border-wespa-red shadow-lg' : 'border-stone-200'}`}>
                  {plan.popular && (
                    <span className="absolute top-4 right-4 z-10 bg-wespa-red text-white text-xs font-semibold px-4 py-1 rounded-full">{c.mostPopular}</span>
                  )}
                  <div className="relative aspect-[5/3] w-full">
                    <Image
                      src={plan.image}
                      alt={`${plan.name} workspace`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-stone-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-stone-900">{plan.price}</span>
                      <span className="text-stone-600">{plan.period}</span>
                      <span className="text-stone-600 ml-2 text-sm">{c.vat}</span>
                    </div>
                    <p className="text-stone-600 text-sm mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-stone-700">
                          <span className="text-wespa-red mt-0.5">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button variant={plan.popular ? 'wespa' : 'secondary'} fullWidth asChild>
                      <Link href="/book-visit">{c.getStarted}</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Standard Amenities — figma feedback #26 */}
        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">{c.amenities.title}</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">{c.amenities.subtitle}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {c.amenities.items.map((item) => (
                <div key={item} className="bg-white rounded-xl p-5 border border-stone-200 flex items-start gap-3">
                  <span className="text-wespa-red mt-0.5">✓</span>
                  <span className="text-sm text-stone-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <h2 className="text-3xl font-bold text-center mb-10">{c.galleryTitle}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
              {[1, 3, 4, 5, 7, 8, 9, 10].map((i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={`/images/workspaces/coworking/coworking-${i}.jpg`}
                    alt={`Coworking space ${i}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
