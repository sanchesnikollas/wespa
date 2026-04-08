import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Insights, research, and trends from WESPA. Articles about coworking, flexible workspaces, productivity, and the future of work in Zagreb.',
}

const categories = ['All', 'Research', 'Trends', 'Case Studies', 'Flexible Products']

const articles = [
  {
    title: 'The Future of Flexible Work in Croatia',
    category: 'Research',
    excerpt: 'How Zagreb is becoming a hub for remote workers and digital nomads, and what it means for the future of workspace design.',
    readTime: '5 min read',
  },
  {
    title: 'Why Hybrid Teams Choose Coworking',
    category: 'Trends',
    excerpt: 'The shift from traditional offices to flexible coworking spaces and how companies are adapting their real estate strategies.',
    readTime: '4 min read',
  },
  {
    title: 'How a Tech Startup Scaled from 2 to 20 at WESPA',
    category: 'Case Studies',
    excerpt: 'From a hot desk to a private office — the journey of a Zagreb-based SaaS company within the WESPA ecosystem.',
    readTime: '6 min read',
  },
  {
    title: 'Productivity Tips for Coworking Spaces',
    category: 'Flexible Products',
    excerpt: 'Practical strategies to stay focused, productive, and balanced when working in a shared environment.',
    readTime: '3 min read',
  },
  {
    title: 'Building Community in a Post-Pandemic Workplace',
    category: 'Trends',
    excerpt: 'How coworking spaces are evolving to foster genuine human connection and professional networking.',
    readTime: '5 min read',
  },
  {
    title: 'The Business Case for Flexible Workspaces',
    category: 'Research',
    excerpt: 'Data-driven insights into why companies of all sizes are choosing flexible workspace solutions over traditional leases.',
    readTime: '7 min read',
  },
]

export default function ResourcesPage() {
  return (
    <main>
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <Image src="/images/workspaces/coworking/coworking-3.jpg" alt="WESPA resources" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="container-wespa relative z-10">
          <p className="text-wespa-red font-semibold mb-4">Ideas by WESPA</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Resources</h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
            Insights, research, and trends shaping the future of work. Stay informed with articles from the WESPA community.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-wespa">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat === 'All'
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
            {articles.map((article) => (
              <article key={article.title} className="group p-6 bg-white border border-stone-200 rounded-2xl hover:shadow-card-hover hover:border-stone-300 transition-all">
                <span className="text-xs font-semibold text-wespa-red uppercase tracking-wide">{article.category}</span>
                <h3 className="text-lg font-bold text-stone-900 mt-2 mb-3 group-hover:text-wespa-red transition-colors">
                  {article.title}
                </h3>
                <p className="text-stone-600 text-sm mb-4">{article.excerpt}</p>
                <span className="text-xs text-stone-400">{article.readTime}</span>
              </article>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-20 bg-stone-50 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-stone-600 max-w-xl mx-auto mb-8">
              Get the latest insights and trends delivered to your inbox. No spam, just valuable content for professionals.
            </p>
            <Button variant="wespa" size="lg" asChild>
              <Link href="/community">Join the Community</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
