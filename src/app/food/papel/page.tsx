'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Papel Restaurant',
    breadcrumb: 'Home / Food / Papel',
    title: 'The gastro hub for your workday',
    subtitle: 'A relaxed community restaurant tailored to the pace of modern business. Choose from premium daily specials and an a la carte menu made with nutrient-rich ingredients.',
    aboutTitle: 'Your Daily Dining Companion',
    aboutP1: 'Papel is more than a lunch spot — it is the heartbeat of the WESPA community. Designed for professionals who value quality without compromise, our kitchen serves dishes that are nutritious, flavorful, and ready when you are.',
    aboutP2: 'Whether you are catching up with a colleague over daily specials or hosting an informal meeting over an a la carte lunch, Papel offers the perfect balance of convenience and quality.',
    galleryTitle: 'The Papel Experience',
    featuresTitle: 'What Makes Papel Special',
    features: [
      { title: 'Daily Specials', description: 'A rotating menu of freshly prepared dishes using seasonal, locally sourced ingredients. New flavors every day.' },
      { title: 'A La Carte Menu', description: 'A carefully curated selection of dishes for when you want to choose exactly what you crave.' },
      { title: 'Nutritious Ingredients', description: 'Every dish is designed to fuel your productivity — balanced, wholesome, and delicious.' },
      { title: 'Business-Friendly Atmosphere', description: 'Ideal for informal meetings, business lunches, or a quick recharge between sessions.' },
    ],
    findUs: 'Find Us',
    findUsLocation: 'WESPA Business & Lounge, Green Gold',
    findUsAddress: 'Radnicka cesta 52, Zagreb',
    ctaTitle: 'Ready to Try Papel?',
    ctaDesc: 'Reserve your table and discover a dining experience designed for the modern professional.',
    bookTable: 'Book a Table',
    backToFood: 'Back to Food',
  },
  hr: {
    pageTitle: 'Restoran Papel',
    breadcrumb: 'Početna / Gastronomija / Papel',
    title: 'Gastro baza vašeg radnog dana',
    subtitle: 'Opušteni community restoran prilagođen tempu suvremenog poslovanja. Birajte između vrhunskih dnevnih i a la carte jela od nutritivno bogatih namirnica.',
    aboutTitle: 'Vaš svakodnevni gastronomski pratitelj',
    aboutP1: 'Papel je više od mjesta za ručak — to je srce WESPA zajednice. Dizajniran za profesionalce koji cijene kvalitetu bez kompromisa, naša kuhinja služi jela koja su nutritivna, ukusna i spremna kad vi jeste.',
    aboutP2: 'Bilo da se družite s kolegom uz dnevne specijalitete ili organizirate neformalni sastanak uz a la carte ručak, Papel nudi savršenu ravnotežu praktičnosti i kvalitete.',
    galleryTitle: 'Papel iskustvo',
    featuresTitle: 'Što čini Papel posebnim',
    features: [
      { title: 'Dnevni specijaliteti', description: 'Rotirajući jelovnik svježe pripremljenih jela od sezonskih, lokalno nabavljenih sastojaka. Novi okusi svaki dan.' },
      { title: 'A la carte jelovnik', description: 'Pažljivo kuratiran izbor jela za trenutke kada želite odabrati točno ono što želite.' },
      { title: 'Nutritivni sastojci', description: 'Svako jelo dizajnirano je da potakne vašu produktivnost — uravnoteženo, zdravo i ukusno.' },
      { title: 'Poslovno ugodna atmosfera', description: 'Idealno za neformalne sastanke, poslovne ručkove ili brzo punjenje baterija između sesija.' },
    ],
    findUs: 'Pronađite nas',
    findUsLocation: 'WESPA Business & Lounge, Green Gold',
    findUsAddress: 'Radnička cesta 52, Zagreb',
    ctaTitle: 'Spremni probati Papel?',
    ctaDesc: 'Rezervirajte stol i otkrijte gastronomsko iskustvo dizajnirano za modernog profesionalca.',
    bookTable: 'Rezervirajte stol',
    backToFood: 'Natrag na gastronomiju',
  },
}

export default function PapelPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <title>{c.pageTitle} | WESPA</title>
      <meta name="description" content={c.subtitle} />
      <main>
        {/* Hero */}
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/food/papel/papel-2.jpg" alt="Papel restaurant" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-stone-900/75" />
          <div className="container-wespa relative z-10">
            <p className="text-wespa-red font-medium mb-4">{c.breadcrumb}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{c.title}</h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
              {c.subtitle}
            </p>
          </div>
        </section>

        {/* About */}
        <section className="section-spacing">
          <div className="container-wespa">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
                {c.aboutTitle}
              </h2>
              <p className="text-lg text-stone-600 mb-4">
                {c.aboutP1}
              </p>
              <p className="text-lg text-stone-600">
                {c.aboutP2}
              </p>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <h2 className="text-3xl font-bold text-center mb-10">{c.galleryTitle}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
              {[1, 3, 4, 5, 9, 10, 11, 12].map((i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={`/images/food/papel/papel-${i}.jpg`}
                    alt={`Papel restaurant ${i}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-spacing bg-stone-50">
          <div className="container-wespa">
            <h2 className="text-3xl font-bold text-stone-900 mb-10">{c.featuresTitle}</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {c.features.map((f) => (
                <div key={f.title} className="p-6 bg-white border border-stone-200 rounded-2xl">
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{f.title}</h3>
                  <p className="text-stone-600">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="section-spacing">
          <div className="container-wespa">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-stone-900 mb-4">{c.findUs}</h2>
              <p className="text-lg text-stone-600 mb-2">
                {c.findUsLocation}
              </p>
              <p className="text-stone-500">{c.findUsAddress}</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-spacing bg-stone-900 text-white">
          <div className="container-wespa text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {c.ctaTitle}
            </h2>
            <p className="text-lg text-stone-300 mb-8 max-w-xl mx-auto">
              {c.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="wespa" size="lg">
                {c.bookTable}
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/food">{c.backToFood}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
