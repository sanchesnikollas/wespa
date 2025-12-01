'use client'

// ============================================
// WESPA Website - Single Blog Article Page
// Individual blog post/article
// ============================================

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { Tag } from '@/components/atoms/Tag'
import { LeadForm } from '@/components/molecules/Form'

// ============================================
// Blog Article Data
// ============================================
interface BlogArticle {
  slug: string
  title: string
  excerpt: string
  category: string
  author: { name: string; role: string; avatar?: string }
  publishedAt: string
  readingTime: number
  image: string
  content: { type: 'paragraph' | 'heading' | 'list' | 'quote'; text: string | string[] }[]
  tags: string[]
}

const blogArticlesData: Record<string, BlogArticle> = {
  'future-of-work-2024': {
    slug: 'future-of-work-2024',
    title: 'The Future of Work: 5 Trends Shaping 2024 and Beyond',
    excerpt: 'From AI integration to the evolution of hybrid work, discover the key trends that will define how we work in the coming years.',
    category: 'Trends',
    author: { name: 'WESPA Team', role: 'Workspace Experts' },
    publishedAt: '2024-01-15',
    readingTime: 8,
    image: '/images/spaces/coworking-1.jpg',
    content: [
      { type: 'paragraph', text: 'The workplace is evolving faster than ever before. As we move through 2024, several key trends are reshaping how, where, and why we work. Understanding these trends is crucial for businesses looking to stay competitive and attract top talent.' },
      { type: 'heading', text: '1. AI-Augmented Workspaces' },
      { type: 'paragraph', text: 'Artificial intelligence is no longer just a buzzword—it\'s becoming an integral part of our daily work lives. From smart meeting rooms that automatically adjust lighting and temperature to AI assistants that handle scheduling and routine tasks, the workplace is getting smarter.' },
      { type: 'heading', text: '2. The Evolution of Hybrid Work' },
      { type: 'paragraph', text: 'Hybrid work is maturing. Companies are moving beyond ad-hoc arrangements to create structured, purposeful hybrid policies that maximize both flexibility and collaboration. The focus is shifting from "where" people work to "how" they work together effectively.' },
      { type: 'list', text: ['Intentional in-office days for collaboration', 'Remote work for focused, individual tasks', 'Third spaces like coworking for flexibility', 'Clear guidelines and expectations'] },
      { type: 'heading', text: '3. Wellness-Centered Design' },
      { type: 'paragraph', text: 'Office design is increasingly focused on employee wellness. Natural light, biophilic elements, quiet zones, and spaces for physical activity are becoming standard rather than perks. The goal is to create environments that support both mental and physical health.' },
      { type: 'quote', text: 'The best workspaces don\'t just accommodate work—they enhance the entire human experience of working.' },
      { type: 'heading', text: '4. Community and Connection' },
      { type: 'paragraph', text: 'As remote work becomes more common, the value of in-person connection increases. Workspaces are becoming community hubs, offering networking events, professional development, and social activities that can\'t be replicated virtually.' },
      { type: 'heading', text: '5. Sustainability as Standard' },
      { type: 'paragraph', text: 'Environmental responsibility is no longer optional. From energy-efficient buildings to sustainable commuting options, businesses are increasingly choosing workspaces that align with their environmental values.' },
    ],
    tags: ['future of work', 'trends', 'hybrid work', 'AI', 'wellness'],
  },
  'productivity-tips-coworking': {
    slug: 'productivity-tips-coworking',
    title: '10 Productivity Tips for Coworking Spaces',
    excerpt: 'Make the most of your coworking experience with these proven strategies for staying focused and productive.',
    category: 'Productivity',
    author: { name: 'WESPA Team', role: 'Workspace Experts' },
    publishedAt: '2024-02-01',
    readingTime: 6,
    image: '/images/spaces/coworking-2.jpg',
    content: [
      { type: 'paragraph', text: 'Coworking spaces offer incredible flexibility and networking opportunities, but they can also present unique challenges for productivity. Here are our top tips for making the most of your coworking experience.' },
      { type: 'heading', text: '1. Choose Your Spot Wisely' },
      { type: 'paragraph', text: 'Most coworking spaces offer different zones for different types of work. Identify areas that match your task—quiet zones for deep work, collaborative areas for meetings, and social spaces for networking.' },
      { type: 'heading', text: '2. Use Noise-Canceling Headphones' },
      { type: 'paragraph', text: 'A good pair of noise-canceling headphones can be a game-changer in a busy coworking environment. They signal that you\'re in focus mode and help block out ambient noise.' },
      { type: 'heading', text: '3. Establish a Routine' },
      { type: 'paragraph', text: 'Having a consistent routine helps your brain associate the coworking space with productive work. Try to arrive and leave at the same times, and develop rituals that signal the start and end of your workday.' },
      { type: 'list', text: ['Morning coffee ritual at the café', 'Dedicated lunch break away from desk', 'End-of-day wrap-up routine', 'Weekly networking time'] },
      { type: 'heading', text: '4. Take Advantage of Amenities' },
      { type: 'paragraph', text: 'Don\'t forget to use the amenities you\'re paying for. Book meeting rooms for important calls, use the lounge for casual meetings, and attend community events.' },
      { type: 'quote', text: 'The most productive coworkers are those who treat the space as their own—they make themselves at home while respecting others.' },
    ],
    tags: ['productivity', 'coworking', 'tips', 'focus', 'work habits'],
  },
  'choosing-right-workspace': {
    slug: 'choosing-right-workspace',
    title: 'How to Choose the Right Workspace for Your Business',
    excerpt: 'A comprehensive guide to evaluating workspace options and finding the perfect fit for your team.',
    category: 'Guide',
    author: { name: 'WESPA Team', role: 'Workspace Experts' },
    publishedAt: '2024-02-15',
    readingTime: 10,
    image: '/images/spaces/office-Copy-of-DSC_4745.jpg',
    content: [
      { type: 'paragraph', text: 'Choosing the right workspace is one of the most important decisions a business can make. The right space can boost productivity, attract talent, and strengthen company culture. The wrong choice can drain resources and hinder growth.' },
      { type: 'heading', text: 'Understanding Your Needs' },
      { type: 'paragraph', text: 'Before evaluating options, take time to understand your specific requirements. Consider team size, growth projections, work styles, and budget constraints.' },
      { type: 'list', text: ['Current team size and 12-month projection', 'Types of work performed (collaborative vs. individual)', 'Client meeting requirements', 'Budget and cash flow considerations', 'Location preferences and commute times'] },
      { type: 'heading', text: 'Traditional Office vs. Flexible Workspace' },
      { type: 'paragraph', text: 'Traditional offices offer stability and control but require significant upfront investment and long-term commitment. Flexible workspaces provide agility and lower risk but may have less customization options.' },
      { type: 'heading', text: 'Key Factors to Evaluate' },
      { type: 'paragraph', text: 'When touring potential spaces, pay attention to these critical factors that will impact your daily operations and employee satisfaction.' },
      { type: 'list', text: ['Natural lighting and ventilation', 'Noise levels and acoustic design', 'Technology infrastructure', 'Common areas and amenities', 'Community and networking opportunities', 'Flexibility to scale up or down'] },
      { type: 'quote', text: 'The best workspace is one that you don\'t notice—it simply enables great work to happen.' },
    ],
    tags: ['workspace', 'office', 'guide', 'business', 'real estate'],
  },
}

// Default article for unknown slugs
const defaultArticle: BlogArticle = {
  slug: 'default',
  title: 'WESPA Article',
  excerpt: 'Insights and ideas from the WESPA team.',
  category: 'Article',
  author: { name: 'WESPA Team', role: 'Workspace Experts' },
  publishedAt: new Date().toISOString().split('T')[0],
  readingTime: 5,
  image: '/images/spaces/coworking-1.jpg',
  content: [{ type: 'paragraph', text: 'Content coming soon.' }],
  tags: ['wespa', 'workspace'],
}

// ============================================
// Blog Article Page
// ============================================
export default function BlogArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const article = blogArticlesData[slug] || defaultArticle

  // 404 if article not found
  if (!blogArticlesData[slug]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-stone-900 mb-4">Article Not Found</h1>
          <p className="text-stone-600 mb-8">The article you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/ideas">View All Articles</Link>
          </Button>
        </div>
      </div>
    )
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-stone-900 text-white py-16 lg:py-24">
        <div className="container-wespa">
          <div className="max-w-3xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-sm text-stone-400 mb-8">
              <Link href="/" className="hover:text-white">Home</Link>
              <Icon name="chevron-right" size="xs" />
              <Link href="/ideas" className="hover:text-white">Ideas</Link>
              <Icon name="chevron-right" size="xs" />
              <span className="text-white">{article.category}</span>
            </nav>

            {/* Category */}
            <Tag variant="outline" className="border-stone-700 text-stone-300 mb-6">
              {article.category}
            </Tag>

            {/* Title */}
            <h1 className="text-3xl lg:text-5xl font-bold mb-6">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center justify-center gap-4 text-stone-400">
              <span>{article.author.name}</span>
              <span>•</span>
              <span>{formattedDate}</span>
              <span>•</span>
              <span>{article.readingTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="container-wespa -mt-8">
        <motion.div
          className="aspect-[21/9] relative rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </motion.div>
      </section>

      {/* Content */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Article Content */}
            <article className="lg:col-span-2 prose prose-lg prose-stone max-w-none">
              {article.content.map((block, i) => {
                switch (block.type) {
                  case 'heading':
                    return <h2 key={i} className="text-2xl font-bold text-stone-900 mt-8 mb-4">{block.text as string}</h2>
                  case 'paragraph':
                    return <p key={i} className="text-stone-600 leading-relaxed mb-4">{block.text as string}</p>
                  case 'list':
                    return (
                      <ul key={i} className="list-disc pl-6 mb-4 space-y-2">
                        {(block.text as string[]).map((item, j) => (
                          <li key={j} className="text-stone-600">{item}</li>
                        ))}
                      </ul>
                    )
                  case 'quote':
                    return (
                      <blockquote key={i} className="border-l-4 border-wespa-red pl-6 py-2 my-8 italic text-xl text-stone-700">
                        {block.text as string}
                      </blockquote>
                    )
                  default:
                    return null
                }
              })}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-stone-200">
                {article.tags.map((tag, i) => (
                  <Tag key={i} variant="outline" size="sm">{tag}</Tag>
                ))}
              </div>

              {/* Share */}
              <div className="flex items-center gap-4 mt-8">
                <span className="text-sm text-stone-500">Share this article:</span>
                <div className="flex gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://wespa.hr/ideas/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
                  >
                    <Icon name="twitter" size="sm" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://wespa.hr/ideas/${slug}`)}&title=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
                  >
                    <Icon name="linkedin" size="sm" />
                  </a>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Author */}
                <div className="bg-stone-50 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-wespa-red rounded-full flex items-center justify-center text-white font-bold">
                      W
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">{article.author.name}</p>
                      <p className="text-sm text-stone-500">{article.author.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-stone-600">
                    The WESPA team shares insights on workplace trends, productivity, and creating better work environments.
                  </p>
                </div>

                {/* Newsletter CTA */}
                <div className="bg-white border border-stone-200 rounded-2xl p-6">
                  <h3 className="font-semibold text-stone-900 mb-2">
                    Get more insights
                  </h3>
                  <p className="text-sm text-stone-600 mb-4">
                    Subscribe to our newsletter for the latest ideas and updates.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wespa-red"
                    />
                    <Button variant="wespa" fullWidth>Subscribe</Button>
                  </div>
                </div>

                {/* Book Visit CTA */}
                <div className="bg-stone-900 text-white rounded-2xl p-6">
                  <h3 className="font-semibold mb-2">Experience WESPA</h3>
                  <p className="text-sm text-stone-300 mb-4">
                    See our workspaces in person and discover how we can help your business.
                  </p>
                  <Button variant="wespa" fullWidth asChild>
                    <Link href="/book-visit">Book a Visit</Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <h2 className="text-2xl font-bold text-stone-900 mb-8">More from Ideas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.values(blogArticlesData)
              .filter(a => a.slug !== slug)
              .slice(0, 3)
              .map((a) => (
                <Link
                  key={a.slug}
                  href={`/ideas/${a.slug}`}
                  className="bg-white rounded-xl overflow-hidden border border-stone-200 hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video relative">
                    <Image src={a.image} alt={a.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <Tag size="sm">{a.category}</Tag>
                      <span className="text-xs text-stone-500">{a.readingTime} min</span>
                    </div>
                    <h3 className="font-semibold text-stone-900 line-clamp-2">{a.title}</h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
