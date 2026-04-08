'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Community',
    breadcrumb: 'Home / Community',
    title: 'More than just space. Join the community shaping the future.',
    subtitle: 'WESPA Community is the hub for innovation, business opportunities, and unforgettable experiences.',
    newsletterTitle: 'Stay in the Loop',
    newsletterDesc: 'Sign up for the WESPA newsletter and get community updates, event invitations, and exclusive content delivered to your inbox.',
    emailPlaceholder: 'Your email address',
    subscribe: 'Subscribe',
    eventsTitle: 'Community Events',
    eventsDesc: 'Regular events that educate, connect, and energize the WESPA community.',
    eventCategories: [
      { title: 'Education', description: 'Workshops, masterclasses, and skill-building sessions led by industry experts and community members.' },
      { title: 'Networking', description: 'Structured and informal gatherings designed to connect professionals, founders, and creatives across industries.' },
      { title: 'Fun', description: 'After-work socials, game nights, fitness sessions, and seasonal celebrations that make work-life balance real.' },
    ],
    blogTitle: 'From the Blog',
    blogDesc: 'Insights, stories, and ideas from the WESPA community. From founder spotlights to industry trends — our blog is where the community shares its voice.',
    readBlog: 'Read the Blog',
    podcastLabel: 'Podcast',
    podcastTitle: 'WESPA Talks',
    podcastP1: 'Conversations with founders, creators, and business leaders from the WESPA community and beyond. Real stories, real insights, no fluff.',
    podcastP2: 'Community members get the opportunity to be featured as guests and share their journey with our growing audience.',
    listenPodcast: 'Listen to WESPA Talks',
    membershipTitle: 'Community Membership',
    membershipDesc: 'Join the WESPA community and unlock perks designed to support your work and growth.',
    membershipPerks: [
      { title: '24/7 Access', description: 'Round-the-clock access to WESPA spaces. Work on your schedule, not ours.' },
      { title: 'Podcast Promotion', description: 'Get featured on WESPA Talks and amplify your story to our growing audience.' },
      { title: 'Exclusive Events', description: 'Members-only workshops, dinners, and networking sessions you will not find anywhere else.' },
      { title: 'WhatsApp Group', description: 'Direct access to the WESPA community channel — share opportunities, ask questions, and stay connected.' },
      { title: '2 Hours Meeting Room / Month', description: 'Complimentary meeting room access every month, included with your membership.' },
      { title: 'Food Discounts', description: 'Exclusive discounts at Papel and SPOT restaurants for all community members.' },
    ],
    ctaTitle: 'Become a Member',
    ctaDesc: 'Join the WESPA community and get access to spaces, events, perks, and a network of professionals who are building the future.',
    ctaButton: 'Get in Touch',
  },
  hr: {
    pageTitle: 'Zajednica',
    breadcrumb: 'Početna / Zajednica',
    title: 'Više od prostora. Pripadajte zajednici koja stvara budućnost.',
    subtitle: 'WESPA Community je središte inovacija, poslovnih prilika i nezaboravnih iskustava.',
    newsletterTitle: 'Budite u toku',
    newsletterDesc: 'Prijavite se na WESPA newsletter i primajte novosti zajednice, pozivnice na događanja i ekskluzivni sadržaj izravno u inbox.',
    emailPlaceholder: 'Vaša email adresa',
    subscribe: 'Pretplati se',
    eventsTitle: 'Događanja zajednice',
    eventsDesc: 'Redovita događanja koja educiraju, povezuju i energiziraju WESPA zajednicu.',
    eventCategories: [
      { title: 'Edukacija', description: 'Radionice, masterclassovi i sesije za izgradnju vještina koje vode stručnjaci iz industrije i članovi zajednice.' },
      { title: 'Networking', description: 'Strukturirana i neformalna okupljanja osmišljena za povezivanje profesionalaca, osnivača i kreatora iz različitih industrija.' },
      { title: 'Zabava', description: 'Druženja nakon posla, večeri igara, fitness sesije i sezonske proslave koje ostvaruju ravnotežu između posla i života.' },
    ],
    blogTitle: 'S bloga',
    blogDesc: 'Uvidi, priče i ideje iz WESPA zajednice. Od spotlight intervjua s osnivačima do industrijskih trendova — naš blog je mjesto gdje zajednica dijeli svoj glas.',
    readBlog: 'Čitaj blog',
    podcastLabel: 'Podcast',
    podcastTitle: 'WESPA Talks',
    podcastP1: 'Razgovori s osnivačima, kreatorima i poslovnim liderima iz WESPA zajednice i šire. Prave priče, pravi uvidi, bez pretjerivanja.',
    podcastP2: 'Članovi zajednice imaju priliku biti gosti i podijeliti svoje iskustvo s našom rastućom publikom.',
    listenPodcast: 'Slušaj WESPA Talks',
    membershipTitle: 'Članstvo u zajednici',
    membershipDesc: 'Pridružite se WESPA zajednici i otključajte pogodnosti dizajnirane za podršku vašem radu i rastu.',
    membershipPerks: [
      { title: '24/7 pristup', description: 'Pristup WESPA prostorima non-stop. Radite po svom rasporedu, ne po našem.' },
      { title: 'Promocija na podcastu', description: 'Budite gost WESPA Talks podcasta i pojačajte svoju priču pred našom rastućom publikom.' },
      { title: 'Ekskluzivna događanja', description: 'Radionice, večere i networking sesije samo za članove koje nećete pronaći nigdje drugdje.' },
      { title: 'WhatsApp grupa', description: 'Izravni pristup WESPA kanalu zajednice — dijelite prilike, postavljajte pitanja i ostanite povezani.' },
      { title: '2 sata sobe za sastanke / mjesečno', description: 'Besplatni pristup sobi za sastanke svaki mjesec, uključen u vaše članstvo.' },
      { title: 'Popusti na hranu', description: 'Ekskluzivni popusti u restoranima Papel i SPOT za sve članove zajednice.' },
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
            <div className="grid gap-8 md:grid-cols-3">
              {c.eventCategories.map((cat) => (
                <div key={cat.title} className="p-8 bg-white border border-stone-200 rounded-2xl">
                  <h3 className="text-2xl font-bold text-stone-900 mb-3">{cat.title}</h3>
                  <p className="text-stone-600">{cat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Highlights */}
        <section className="section-spacing">
          <div className="container-wespa">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                {c.blogTitle}
              </h2>
              <p className="text-lg text-stone-600 mb-8">
                {c.blogDesc}
              </p>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/resources">{c.readBlog}</Link>
              </Button>
            </div>
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
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                {c.membershipTitle}
              </h2>
              <p className="text-lg text-stone-600">
                {c.membershipDesc}
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
