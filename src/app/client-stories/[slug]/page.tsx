'use client'

// ============================================
// WESPA Website - Single Client Story Page
// Individual case study/testimonial
// ============================================

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/atoms/Button'
import { Icon, IconName } from '@/components/atoms/Icon'
import { Tag } from '@/components/atoms/Tag'

// ============================================
// Client Story Data
// ============================================
interface ClientStory {
  slug: string
  clientName: string
  companyName: string
  companyLogo?: string
  industry: string
  teamSize: string
  spaceType: string
  title: string
  subtitle: string
  quote: string
  challenge: string
  solution: string
  results: { metric: string; value: string }[]
  fullStory: string[]
  image: string
}

const clientStoriesData: Record<string, ClientStory> = {
  'tech-startup-growth': {
    slug: 'tech-startup-growth',
    clientName: 'Marina Kovač',
    companyName: 'TechFlow',
    industry: 'Technology',
    teamSize: '15-25 employees',
    spaceType: 'Private Office',
    title: 'How TechFlow Scaled from 5 to 25 Employees with WESPA',
    subtitle: 'A growing tech startup finds the perfect flexible workspace solution',
    quote: 'WESPA gave us the flexibility to grow without the burden of long-term lease commitments. When we needed more space, we just expanded.',
    challenge: 'TechFlow was growing rapidly and needed a workspace that could scale with them. Traditional office leases required 3-5 year commitments that didn\'t align with their agile growth plans.',
    solution: 'They started with a 4-person private office at WESPA Green Gold and expanded twice within 18 months, eventually occupying a 25-person suite with access to meeting rooms and event spaces.',
    results: [
      { metric: 'Team Growth', value: '400%' },
      { metric: 'Cost Savings', value: '35%' },
      { metric: 'Employee Satisfaction', value: '94%' },
    ],
    fullStory: [
      'When Marina Kovač founded TechFlow in 2021, she knew that finding the right workspace would be crucial to the company\'s success. "We were a team of five developers working out of my living room," she recalls. "We needed a professional space, but we couldn\'t commit to a traditional lease."',
      'WESPA\'s flexible office solutions proved to be the perfect fit. "The ability to start small and expand as we grew was exactly what we needed," Marina explains. "Within six months, we had doubled our team and needed more space. WESPA made it seamless."',
      'The benefits extended beyond just physical space. "The community aspect was unexpected but incredibly valuable," says Marina. "We\'ve found clients, partners, and even hired team members through connections we made at WESPA events."',
      'Today, TechFlow occupies a 25-person private office suite and regularly uses WESPA\'s meeting rooms for client presentations. "The all-inclusive pricing means we don\'t have to worry about utilities, maintenance, or any of the headaches that come with traditional offices," Marina notes.',
    ],
    image: '/images/spaces/office-Copy-of-DSC_4745.jpg',
  },
  'consulting-firm-efficiency': {
    slug: 'consulting-firm-efficiency',
    clientName: 'Ivan Horvat',
    companyName: 'Horvat Consulting',
    industry: 'Consulting',
    teamSize: '8-10 employees',
    spaceType: 'Dedicated Desks + Meeting Rooms',
    title: 'Horvat Consulting Reduces Overhead by 40% with Hybrid Setup',
    subtitle: 'A boutique consulting firm optimizes costs with flexible workspace',
    quote: 'We only pay for what we use. The meeting rooms are there when we need them, and our team has dedicated desks without the overhead of a full office.',
    challenge: 'Horvat Consulting needed space for client meetings and team collaboration but couldn\'t justify the cost of a traditional office when consultants spent most of their time at client sites.',
    solution: 'A hybrid solution combining dedicated desks for the core team with on-demand meeting room access for client presentations and team workshops.',
    results: [
      { metric: 'Overhead Reduction', value: '40%' },
      { metric: 'Meeting Room Usage', value: '20h/week' },
      { metric: 'Client Satisfaction', value: '98%' },
    ],
    fullStory: [
      'Ivan Horvat had been running his consulting firm from a traditional office for five years when he realized something had to change. "We were paying for 200 square meters, but on any given day, only 3-4 people were actually in the office," he explains.',
      'The move to WESPA allowed Horvat Consulting to right-size their workspace. "Now we have dedicated desks for our core team and book meeting rooms as needed. The savings are substantial, but more importantly, the quality of our workspace has actually improved."',
      'The professional environment at WESPA has also enhanced client perceptions. "When we bring clients to WESPA, they\'re impressed. The meeting rooms are top-notch, and the overall atmosphere is exactly what you\'d expect from a premium consulting firm."',
    ],
    image: '/images/spaces/meeting-KGD_8894-Edit.jpg',
  },
  'creative-agency-collaboration': {
    slug: 'creative-agency-collaboration',
    clientName: 'Ana Petrović',
    companyName: 'Pixel Studio',
    industry: 'Creative',
    teamSize: '6-8 employees',
    spaceType: 'Coworking + Private Office',
    title: 'Pixel Studio Finds Creative Inspiration at WESPA',
    subtitle: 'A design agency discovers the perfect blend of collaboration and focus',
    quote: 'The energy of the coworking space fuels our creativity, but when we need to focus on a big project, we retreat to our private office. Best of both worlds.',
    challenge: 'Pixel Studio needed a workspace that could accommodate both collaborative brainstorming sessions and focused individual work, without breaking the bank.',
    solution: 'A combination of coworking membership for day-to-day work and a small private office for confidential client projects and deep work sessions.',
    results: [
      { metric: 'Project Delivery', value: '+25%' },
      { metric: 'Team Creativity Index', value: '4.8/5' },
      { metric: 'New Client Referrals', value: '12' },
    ],
    fullStory: [
      'Ana Petrović founded Pixel Studio with a vision of creating a design agency that balanced creative energy with focused execution. "Traditional offices felt too isolated, but purely coworking spaces were too distracting for deep design work," she explains.',
      'WESPA\'s flexible options allowed Pixel Studio to create their ideal setup. "We start most days in the coworking area, surrounded by the energy of other creative professionals. When we need to focus, we move to our private office."',
      'The community at WESPA has also been a source of new business. "We\'ve gotten several referrals from other WESPA members. There\'s a real sense of supporting each other\'s businesses here."',
    ],
    image: '/images/spaces/coworking-1.jpg',
  },
}

// Default story for unknown slugs
const defaultStory: ClientStory = {
  slug: 'default',
  clientName: 'WESPA Member',
  companyName: 'Company',
  industry: 'Business',
  teamSize: '1-50 employees',
  spaceType: 'Flexible Workspace',
  title: 'Success Story at WESPA',
  subtitle: 'Discover how businesses thrive at WESPA',
  quote: 'WESPA has been instrumental in our growth and success.',
  challenge: 'Finding the right workspace solution for a growing business.',
  solution: 'WESPA\'s flexible workspace solutions provided the perfect fit.',
  results: [
    { metric: 'Growth', value: 'Significant' },
    { metric: 'Satisfaction', value: 'High' },
  ],
  fullStory: ['This success story showcases how WESPA helps businesses achieve their goals.'],
  image: '/images/spaces/coworking-1.jpg',
}

// ============================================
// Single Story Page
// ============================================
export default function ClientStoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const story = clientStoriesData[slug] || defaultStory

  // 404 if story not found
  if (!clientStoriesData[slug]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-stone-900 mb-4">Story Not Found</h1>
          <p className="text-stone-600 mb-8">The story you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/client-stories">View All Stories</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-stone-900 text-white py-16 lg:py-24">
        <div className="container-wespa">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-stone-400 mb-8">
              <Link href="/" className="hover:text-white">Home</Link>
              <Icon name="chevron-right" size="xs" />
              <Link href="/client-stories" className="hover:text-white">Client Stories</Link>
              <Icon name="chevron-right" size="xs" />
              <span className="text-white">{story.companyName}</span>
            </nav>

            {/* Meta */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Tag variant="outline" className="border-stone-700 text-stone-300">
                {story.industry}
              </Tag>
              <Tag variant="outline" className="border-stone-700 text-stone-300">
                {story.spaceType}
              </Tag>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-5xl font-bold mb-6">
              {story.title}
            </h1>
            <p className="text-xl text-stone-300">
              {story.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Story Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Featured Image */}
              <motion.div
                className="aspect-video relative rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Image
                  src={story.image}
                  alt={story.companyName}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Quote */}
              <blockquote className="border-l-4 border-wespa-red pl-6 py-4">
                <p className="text-xl lg:text-2xl text-stone-700 italic mb-4">
                  "{story.quote}"
                </p>
                <footer className="text-stone-600">
                  — {story.clientName}, {story.companyName}
                </footer>
              </blockquote>

              {/* Challenge */}
              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">The Challenge</h2>
                <p className="text-stone-600 leading-relaxed">{story.challenge}</p>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">The Solution</h2>
                <p className="text-stone-600 leading-relaxed">{story.solution}</p>
              </div>

              {/* Full Story */}
              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-6">The Full Story</h2>
                <div className="space-y-4">
                  {story.fullStory.map((paragraph, i) => (
                    <p key={i} className="text-stone-600 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Company Info */}
                <div className="bg-stone-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-stone-900 mb-4">Company Profile</h3>
                  <dl className="space-y-4 text-sm">
                    <div>
                      <dt className="text-stone-500">Company</dt>
                      <dd className="font-medium text-stone-900">{story.companyName}</dd>
                    </div>
                    <div>
                      <dt className="text-stone-500">Industry</dt>
                      <dd className="font-medium text-stone-900">{story.industry}</dd>
                    </div>
                    <div>
                      <dt className="text-stone-500">Team Size</dt>
                      <dd className="font-medium text-stone-900">{story.teamSize}</dd>
                    </div>
                    <div>
                      <dt className="text-stone-500">Space Type</dt>
                      <dd className="font-medium text-stone-900">{story.spaceType}</dd>
                    </div>
                  </dl>
                </div>

                {/* Results */}
                <div className="bg-wespa-red text-white rounded-2xl p-6">
                  <h3 className="font-semibold mb-4">Key Results</h3>
                  <div className="space-y-4">
                    {story.results.map((result, i) => (
                      <div key={i}>
                        <div className="text-3xl font-bold">{result.value}</div>
                        <div className="text-sm text-red-100">{result.metric}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-white border border-stone-200 rounded-2xl p-6">
                  <h3 className="font-semibold text-stone-900 mb-2">
                    Ready to write your success story?
                  </h3>
                  <p className="text-sm text-stone-600 mb-4">
                    Book a visit and discover how WESPA can help your business grow.
                  </p>
                  <Button variant="wespa" fullWidth asChild>
                    <Link href="/book-visit">Book a Visit</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Stories */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <h2 className="text-2xl font-bold text-stone-900 mb-8">More Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.values(clientStoriesData)
              .filter(s => s.slug !== slug)
              .slice(0, 3)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/client-stories/${s.slug}`}
                  className="bg-white rounded-xl overflow-hidden border border-stone-200 hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video relative">
                    <Image src={s.image} alt={s.companyName} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <Tag size="sm" className="mb-2">{s.industry}</Tag>
                    <h3 className="font-semibold text-stone-900 mb-2">{s.companyName}</h3>
                    <p className="text-sm text-stone-600 line-clamp-2">{s.subtitle}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
