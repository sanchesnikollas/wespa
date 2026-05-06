'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { WespaIconCircle } from '@/components/atoms/WespaIcon'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Community',
    breadcrumb: 'Home / Community',
    title: 'More than just space. Join the community shaping the future.',
    subtitle: 'WESPA Community is the hub for innovation, business opportunities, and unforgettable experiences. Connect with industry leaders, share ideas, and grow with the support of the region’s largest business community.',
    openingTitle: 'Why work in isolation when you can be part of something bigger?',
    openingTagline: 'WESPA Community Membership.',
    openingBody: 'WESPA Community Membership is designed for modern professionals who need flexibility. Whether you need a place to work late hours, a professional studio for your promotion, or just want to stay in the loop with events — we provide the resources, you create the opportunities.',
    newsletterTitle: 'Stay in the Loop',
    newsletterDesc: 'Sign up for the WESPA newsletter and get community updates, event invitations, and exclusive content delivered to your inbox.',
    emailPlaceholder: 'Your email address',
    subscribe: 'Subscribe',
    eventsTitle: 'Events That Connect',
    eventsDesc: 'Whether you are seeking inspiration, new knowledge, or relaxed networking over a drink, our calendar is always full. From exclusive panels with industry experts to casual after-work gatherings — our events are designed to break the ice and create opportunities.',
    viewEventCalendar: 'View Event Calendar',
    eventCategories: [
      { title: 'Education & Workshops', description: 'Learn from the best through interactive formats.', icon: 'design' as const },
      { title: 'Networking', description: 'Meet your future business partner or client.', icon: 'dot-double' as const },
      { title: 'Fun', description: 'Because business is easier with a good atmosphere and a great community.', icon: 'flexibility' as const },
    ],
    blogTitle: 'Stories That Inspire',
    blogDesc: 'Peek into the minds of our members and partners. We bring you the latest trends in business, technology, and innovation, as well as success stories that started right here in our spaces.',
    blogCards: [
      { title: 'Member Spotlight', description: 'Founders and creators building from inside WESPA.' },
      { title: 'Industry Trends', description: 'Macro signals shaping the work and life economy.' },
      { title: 'WESPA News', description: 'Updates, openings, and behind-the-scenes from our spaces.' },
    ],
    readBlog: 'Read the Blog',
    podcastLabel: 'Podcast',
    podcastTitle: 'WESPA Talks: Listen to the Voice of Innovation',
    podcastP1: 'Tune into honest and deep conversations with the people shaping the market. Our podcast delivers uncensored stories about entrepreneurship, growth challenges, and visions of the future — straight from our studio to your headphones.',
    podcastP2: 'Community members get the opportunity to be featured as guests and share their journey with our growing audience.',
    listenPodcast: 'Listen to the Latest Episode',
    membershipTitle: 'WESPA Community Membership: Your Ticket to the World of Innovation',
    membershipDesc: 'Become part of the community without renting an office. One membership opens the doors to our spaces, studios, and network.',
    membershipPerks: [
      { title: '24/7 Access', description: 'Your digital key is always with you. Use WESPA community zones whenever it suits you – day or night.' },
      { title: 'Podcast & Video Promotion', description: 'Have a story? Tell it for free. Book a slot in our studio and present your project to a wider audience.' },
      { title: 'Exclusive Events & WESPA Collective', description: 'Automatically become part of the Collective. Enjoy free access to workshops, panels, and networking.' },
      { title: 'WESPA Community', description: 'Connect with other creatives and entrepreneurs directly through our internal WhatsApp group.' },
      { title: 'Meeting Rooms', description: 'Need privacy for an important deal? Includes 2 hours of meeting room usage per month (in slots after 5 PM).' },
      { title: 'Perks & Discounts', description: 'Enjoy special prices on food and drinks at our restaurant by showing your membership card.' },
    ],
    ctaTitle: 'Become a Member',
    ctaDesc: 'Join the WESPA community and get access to spaces, events, perks, and a network of professionals who are building the future.',
    ctaButton: 'Get in Touch',
  },
  hr: {
    pageTitle: 'Zajednica',
    breadcrumb: 'Početna / Zajednica',
    title: 'Više od prostora. Pridružite se zajednici koja oblikuje budućnost.',
    subtitle: 'WESPA Community je hub za inovacije, poslovne prilike i nezaboravna iskustva. Povežite se s liderima industrije, dijelite ideje i rastite uz podršku najveće poslovne zajednice u regiji.',
    openingTitle: 'Zašto raditi izolirano kad možete biti dio nečeg većeg?',
    openingTagline: 'WESPA Community Membership.',
    openingBody: 'WESPA Community Membership dizajniran je za moderne profesionalce kojima treba fleksibilnost. Bilo da trebate mjesto za rad u kasnim satima, profesionalni studio za promociju ili jednostavno želite biti u toku s događanjima — mi pružamo resurse, vi stvarate prilike.',
    newsletterTitle: 'Budite u toku',
    newsletterDesc: 'Prijavite se na WESPA newsletter i primajte novosti zajednice, pozivnice na događanja i ekskluzivni sadržaj izravno u inbox.',
    emailPlaceholder: 'Vaša email adresa',
    subscribe: 'Pretplati se',
    eventsTitle: 'Događanja koja povezuju',
    eventsDesc: 'Bilo da tražite inspiraciju, nova znanja ili opušteni networking uz piće, naš kalendar je uvijek pun. Od ekskluzivnih panela s industrijskim stručnjacima do ležernih after-work druženja — naša događanja dizajnirana su da prelome led i otvore prilike.',
    viewEventCalendar: 'Pogledaj kalendar događanja',
    eventCategories: [
      { title: 'Edukacija i radionice', description: 'Učite od najboljih kroz interaktivne formate.', icon: 'design' as const },
      { title: 'Networking', description: 'Upoznajte svog budućeg poslovnog partnera ili klijenta.', icon: 'dot-double' as const },
      { title: 'Zabava', description: 'Jer je posao lakši uz dobru atmosferu i sjajnu zajednicu.', icon: 'flexibility' as const },
    ],
    blogTitle: 'Priče koje inspiriraju',
    blogDesc: 'Zavirite u glave naših članova i partnera. Donosimo vam najnovije trendove u poslovanju, tehnologiji i inovacijama, kao i priče o uspjehu koje su krenule baš iz naših prostora.',
    blogCards: [
      { title: 'Member Spotlight', description: 'Osnivači i kreatori koji grade unutar WESPA-e.' },
      { title: 'Industry Trends', description: 'Makro signali koji oblikuju ekonomiju rada i života.' },
      { title: 'WESPA News', description: 'Ažuriranja, otvaranja i pogled iza kulisa naših prostora.' },
    ],
    readBlog: 'Čitaj blog',
    podcastLabel: 'Podcast',
    podcastTitle: 'WESPA Talks: Slušajte glas inovacije',
    podcastP1: 'Uključite se u iskrene i duboke razgovore s ljudima koji oblikuju tržište. Naš podcast donosi necenzurirane priče o poduzetništvu, izazovima rasta i vizijama budućnosti — izravno iz našeg studija u vaše slušalice.',
    podcastP2: 'Članovi zajednice imaju priliku biti gosti i podijeliti svoje iskustvo s našom rastućom publikom.',
    listenPodcast: 'Slušajte najnoviju epizodu',
    membershipTitle: 'WESPA Community Membership: Vaša ulaznica u svijet inovacije',
    membershipDesc: 'Postanite dio zajednice bez najma ureda. Jedno članstvo otvara vrata naših prostora, studija i mreže.',
    membershipPerks: [
      { title: '24/7 pristup', description: 'Vaš digitalni ključ uvijek je s vama. Koristite WESPA community zone kad god vam odgovara – danju ili noću.' },
      { title: 'Promocija podcasta i videa', description: 'Imate priču? Ispričajte je besplatno. Rezervirajte termin u našem studiju i predstavite svoj projekt široj publici.' },
      { title: 'Ekskluzivna događanja i WESPA Collective', description: 'Automatski postajete dio Collectivea. Uživajte besplatno u radionicama, panelima i networkingu.' },
      { title: 'WESPA Community', description: 'Povežite se s drugim kreativcima i poduzetnicima kroz našu internu WhatsApp grupu.' },
      { title: 'Sobe za sastanke', description: 'Trebate privatnost za važan dogovor? Uključeno 2 sata korištenja sobe za sastanke mjesečno (termini nakon 17h).' },
      { title: 'Pogodnosti i popusti', description: 'Posebne cijene na hranu i piće u našem restoranu uz vašu člansku karticu.' },
    ],
    ctaTitle: 'Postanite član',
    ctaDesc: 'Pridružite se WESPA zajednici i dobijte pristup prostorima, događanjima, pogodnostima i mreži profesionalaca koji grade budućnost.',
    ctaButton: 'Kontaktirajte nas',
  },
}

export default function CommunityPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <title>{c.pageTitle} | WESPA</title>
      <meta name="description" content={c.subtitle} />
      <main>
        {/* Hero */}
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/events/spaces/venue-3.jpg" alt="WESPA community" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/75" />
          <div className="container-wespa relative z-10">
            <p className="text-wespa-red font-medium mb-4">{c.breadcrumb}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.title}</h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
              {c.subtitle}
            </p>
          </div>
        </section>

        {/* Newsletter */}
        <section className="section-spacing">
          <div className="container-wespa">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                {c.newsletterTitle}
              </h2>
              <p className="text-lg text-stone-600 mb-8">
                {c.newsletterDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={c.emailPlaceholder}
                  className="flex-1 px-4 py-3 border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-wespa-red focus:border-transparent"
                />
                <Button variant="wespa">{c.subscribe}</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Community Events */}
        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">{c.eventsTitle}</h2>
            <p className="text-lg text-stone-600 mb-10 max-w-2xl">
              {c.eventsDesc}
            </p>
            <div className="grid gap-8 md:grid-cols-3 mb-10">
              {c.eventCategories.map((cat) => (
                <div key={cat.title} className="p-8 bg-white border border-stone-200 rounded-2xl hover:shadow-card-hover transition-shadow">
                  <div className="mb-4">
                    <WespaIconCircle name={cat.icon} size="md" variant="brand" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-3">{cat.title}</h3>
                  <p className="text-stone-600">{cat.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button variant="wespa" size="lg" asChild>
                <Link href="/resources">{c.viewEventCalendar}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Blog Highlights */}
        <section className="section-spacing">
          <div className="container-wespa">
            <div className="max-w-3xl mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                {c.blogTitle}
              </h2>
              <p className="text-lg text-stone-600">
                {c.blogDesc}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              {c.blogCards.map((card) => (
                <div key={card.title} className="p-6 bg-white border border-stone-200 rounded-2xl">
                  <h3 className="text-xl font-bold text-stone-900 mb-2">{card.title}</h3>
                  <p className="text-stone-600">{card.description}</p>
                </div>
              ))}
            </div>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/resources">{c.readBlog}</Link>
            </Button>
          </div>
        </section>

        {/* WESPA Talks Podcast */}
        <section className="section-spacing bg-stone-900 text-white">
          <div className="container-wespa">
            <div className="max-w-3xl">
              <p className="text-wespa-red font-medium mb-4">{c.podcastLabel}</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{c.podcastTitle}</h2>
              <p className="text-lg text-stone-300 mb-4">
                {c.podcastP1}
              </p>
              <p className="text-lg text-stone-300 mb-8">
                {c.podcastP2}
              </p>
              <Button variant="wespa" size="lg">
                {c.listenPodcast}
              </Button>
            </div>
          </div>
        </section>

        {/* Community Membership */}
        <section className="section-spacing">
          <div className="container-wespa">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                {c.membershipTitle}
              </h2>
              <p className="text-lg text-stone-600">
                {c.membershipDesc}
              </p>
            </div>

            {/* Big card: opening question + tagline + body */}
            <div className="bg-stone-900 text-white rounded-3xl p-10 md:p-14 max-w-4xl mx-auto mb-16">
              <p className="text-2xl md:text-3xl font-bold leading-snug mb-3">
                {c.openingTitle}
              </p>
              <p className="text-xl text-wespa-red font-semibold mb-6">
                {c.openingTagline}
              </p>
              <p className="text-lg text-stone-300 leading-relaxed">
                {c.openingBody}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {c.membershipPerks.map((perk) => (
                <div key={perk.title} className="p-6 bg-white border border-stone-200 rounded-2xl">
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{perk.title}</h3>
                  <p className="text-stone-600">{perk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-spacing bg-stone-50">
          <div className="container-wespa text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              {c.ctaTitle}
            </h2>
            <p className="text-lg text-stone-600 mb-8 max-w-xl mx-auto">
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
