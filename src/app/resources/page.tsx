'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    pageTitle: 'Ideas by WESPA',
    breadcrumb: 'Home / Ideas by WESPA',
    title: 'Ideas by WESPA',
    subtitle: 'Insights, research, and trends shaping the future of work. Stay informed with articles from the WESPA community.',
    categories: ['All', 'Research', 'Trends', 'Case Studies', 'Guides'],
    articles: [
      {
        title: 'The Future of Flexible Work in Croatia',
        category: 'Research',
        excerpt: 'How Zagreb is becoming a hub for remote workers and digital nomads, and what it means for the future of workspace design.',
        readTime: '5 min read',
        date: 'March 2026',
        image: '/images/wespa-gallery/coworking-in-croatia.jpg',
      },
      {
        title: 'Why Hybrid Teams Choose Coworking',
        category: 'Trends',
        excerpt: 'The shift from traditional offices to flexible coworking spaces and how companies are adapting their real estate strategies.',
        readTime: '4 min read',
        date: 'February 2026',
        image: '/images/wespa-gallery/KGZ_1492-HDR.jpg',
      },
      {
        title: 'How a Tech Startup Scaled from 2 to 20 at WESPA',
        category: 'Case Studies',
        excerpt: 'From a hot desk to a private office — the journey of a Zagreb-based SaaS company within the WESPA ecosystem.',
        readTime: '6 min read',
        date: 'February 2026',
        image: '/images/wespa-gallery/KGD_4932-HDR.jpeg',
      },
      {
        title: 'Meeting Room Best Practices for Small Teams',
        category: 'Guides',
        excerpt: 'Practical strategies to run focused, outcome-driven meetings — and the room setups that make them work.',
        readTime: '4 min read',
        date: 'January 2026',
        image: '/images/wespa-gallery/KGD_4323-HDR-Edit.jpeg',
      },
      {
        title: 'Building Community in a Post-Pandemic Workplace',
        category: 'Trends',
        excerpt: 'How coworking spaces are evolving to foster genuine human connection and professional networking.',
        readTime: '5 min read',
        date: 'January 2026',
        image: '/images/wespa-gallery/experiences.jpg',
      },
      {
        title: 'Virtual Office Benefits for International Teams',
        category: 'Guides',
        excerpt: 'Why remote-first companies use a Zagreb virtual address to establish European presence without the overhead.',
        readTime: '6 min read',
        date: 'December 2025',
        image: '/images/wespa-gallery/offices-for-rent-in-zagreb.jpg',
      },
    ],
    stayUpdated: 'Stay Updated',
    stayUpdatedDesc: 'Get the latest insights and trends delivered to your inbox. No spam, just valuable content for professionals.',
    joinCommunity: 'Join the Community',
  },
  hr: {
    pageTitle: 'WESPA ideje',
    breadcrumb: 'Početna / WESPA ideje',
    title: 'WESPA ideje',
    subtitle: 'Uvidi, istraživanja i trendovi koji oblikuju budućnost rada. Budite informirani s člancima iz WESPA zajednice.',
    categories: ['Sve', 'Istraživanje', 'Trendovi', 'Studije slučaja', 'Vodiči'],
    articles: [
      {
        title: 'Budućnost fleksibilnog rada u Hrvatskoj',
        category: 'Istraživanje',
        excerpt: 'Kako Zagreb postaje središte za remote radnike i digitalne nomade i što to znači za budućnost dizajna radnih prostora.',
        readTime: '5 min čitanja',
        date: 'Ožujak 2026',
        image: '/images/wespa-gallery/coworking-in-croatia.jpg',
      },
      {
        title: 'Zašto hibridni timovi biraju coworking',
        category: 'Trendovi',
        excerpt: 'Prijelaz s tradicionalnih ureda na fleksibilne coworking prostore i kako tvrtke prilagođavaju svoje strategije nekretnina.',
        readTime: '4 min čitanja',
        date: 'Veljača 2026',
        image: '/images/wespa-gallery/KGZ_1492-HDR.jpg',
      },
      {
        title: 'Kako je tech startup skalirao s 2 na 20 u WESPA',
        category: 'Studije slučaja',
        excerpt: 'Od hot deska do privatnog ureda — put zagrebačke SaaS tvrtke unutar WESPA ekosustava.',
        readTime: '6 min čitanja',
        date: 'Veljača 2026',
        image: '/images/wespa-gallery/KGD_4932-HDR.jpeg',
      },
      {
        title: 'Najbolje prakse za sobe za sastanke',
        category: 'Vodiči',
        excerpt: 'Praktične strategije za vođenje fokusiranih, rezultatima vođenih sastanaka — i postavke prostora koje ih čine djelotvornima.',
        readTime: '4 min čitanja',
        date: 'Siječanj 2026',
        image: '/images/wespa-gallery/KGD_4323-HDR-Edit.jpeg',
      },
      {
        title: 'Izgradnja zajednice na post-pandemijskom radnom mjestu',
        category: 'Trendovi',
        excerpt: 'Kako se coworking prostori razvijaju kako bi poticali istinske ljudske veze i profesionalni networking.',
        readTime: '5 min čitanja',
        date: 'Siječanj 2026',
        image: '/images/wespa-gallery/experiences.jpg',
      },
      {
        title: 'Prednosti virtualnog ureda za međunarodne timove',
        category: 'Vodiči',
        excerpt: 'Zašto remote-first tvrtke koriste zagrebačku virtualnu adresu za europsku prisutnost bez operativnih troškova.',
        readTime: '6 min čitanja',
        date: 'Prosinac 2025',
        image: '/images/wespa-gallery/offices-for-rent-in-zagreb.jpg',
      },
    ],
    stayUpdated: 'Budite u toku',
    stayUpdatedDesc: 'Primajte najnovije uvide i trendove izravno u inbox. Bez spama, samo vrijedan sadržaj za profesionalce.',
    joinCommunity: 'Pridružite se zajednici',
  },
}

export default function ResourcesPage() {
  const { language } = useLanguage()
  const c = content[language]

  return (
    <>
      <title>{c.pageTitle} | WESPA</title>
      <meta name="description" content={c.subtitle} />
      <main>
        <section className="relative text-white py-24 md:py-32 overflow-hidden">
          <Image src="/images/workspaces/coworking/coworking-3.jpg" alt="WESPA resources" fill className="object-cover" priority />
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
          <div className="container-wespa">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-12">
              {c.categories.map((cat, idx) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    idx === 0
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Articles grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {c.articles.map((article) => (
                <article
                  key={article.title}
                  className="group bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-card-hover hover:border-stone-300 transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-semibold text-wespa-red uppercase tracking-wide">
                        {article.category}
                      </span>
                      <span className="text-xs text-stone-400">·</span>
                      <span className="text-xs text-stone-500">{article.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 mb-3 group-hover:text-wespa-red transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-stone-600 text-sm mb-4">{article.excerpt}</p>
                    <span className="text-xs text-stone-400">{article.readTime}</span>
                  </div>
                </article>
              ))}
            </div>

            {/* Newsletter CTA */}
            <div className="mt-20 bg-stone-50 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">{c.stayUpdated}</h2>
              <p className="text-stone-600 max-w-xl mx-auto mb-8">
                {c.stayUpdatedDesc}
              </p>
              <Button variant="wespa" size="lg" asChild>
                <Link href="/community">{c.joinCommunity}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
