'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
import { Button } from '@/components/atoms/Button'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
}

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

const clientStories = [
  {
    id: 1,
    company: 'TechStart d.o.o.',
    industry: 'Technology',
    logo: '/images/spaces/office-Copy-of-DSC_4745.jpg',
    image: '/images/spaces/coworking-1.jpg',
    quote: 'Moving to WESPA was the best decision for our growing team. The flexibility to scale from 5 to 25 people without changing locations has been invaluable.',
    author: 'Marko Horvat',
    role: 'CEO & Founder',
    results: [
      { metric: '40%', label: 'Team Growth' },
      { metric: '€50K', label: 'Savings/Year' },
      { metric: '3x', label: 'Productivity' }
    ]
  },
  {
    id: 2,
    company: 'Creative Agency Hub',
    industry: 'Marketing & Design',
    logo: '/images/spaces/lounge-1.jpg',
    image: '/images/spaces/urban-hub-1.jpg',
    quote: 'The atmosphere at WESPA inspires creativity. Our team loves the collaborative spaces and the networking opportunities with other innovative companies.',
    author: 'Ana Kovačević',
    role: 'Creative Director',
    results: [
      { metric: '25+', label: 'New Clients' },
      { metric: '100%', label: 'Team Satisfaction' },
      { metric: '15', label: 'Awards Won' }
    ]
  },
  {
    id: 3,
    company: 'FinTech Solutions',
    industry: 'Financial Services',
    logo: '/images/spaces/meeting-KGD_8894-Edit.jpg',
    image: '/images/spaces/meeting-KGZ_1671-HDR.jpg',
    quote: 'The professional environment and premium meeting rooms help us make the right impression with clients. WESPA understands what growing businesses need.',
    author: 'Ivan Petrović',
    role: 'Managing Partner',
    results: [
      { metric: '€2M', label: 'Funding Raised' },
      { metric: '50+', label: 'Client Meetings' },
      { metric: '8/10', label: 'Client Rating' }
    ]
  },
  {
    id: 4,
    company: 'Remote First Studio',
    industry: 'Software Development',
    logo: '/images/spaces/lounge-2.jpg',
    image: '/images/spaces/coworking-2.jpg',
    quote: 'Even as a remote-first company, having access to WESPA spaces when we need them has transformed how our distributed team collaborates.',
    author: 'Petra Novak',
    role: 'Head of Operations',
    results: [
      { metric: '90%', label: 'Retention Rate' },
      { metric: '12', label: 'Countries Covered' },
      { metric: '5x', label: 'Team Bonding' }
    ]
  }
]

const stats = [
  { value: '500+', label: 'Companies Served' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '4.9', label: 'Average Rating' },
  { value: '15+', label: 'Industries' }
]

export default function ClientStoriesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/images/spaces/urban-hub-1.jpg"
            alt="WESPA Community"
            fill
            className="object-cover"
          />
        </div>
        <div className="container-wespa relative z-10">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-6"
            >
              Client Stories
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-display font-bold text-white mb-6"
            >
              Success Stories from Our <span className="text-gradient">Community</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-white/80 leading-relaxed"
            >
              Discover how businesses of all sizes are thriving at WESPA. From startups
              to established enterprises, our members share their journey to success.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-stone-50 py-12 border-b border-stone-200">
        <div className="container-wespa">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-stone-900">{stat.value}</p>
                <p className="text-stone-500 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="section-spacing">
        <div className="container-wespa">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
              Featured Stories
            </h2>
            <p className="text-lg text-stone-600">
              Real results from real businesses in our community
            </p>
          </motion.div>

          <div className="space-y-24">
            {clientStories.map((story, index) => (
              <motion.article
                key={story.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                <motion.div
                  variants={fadeInUp}
                  className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}
                >
                  <div className="image-container aspect-[4/3]">
                    <Image
                      src={story.image}
                      alt={story.company}
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}
                >
                  <span className="inline-block px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-sm font-medium mb-4">
                    {story.industry}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-semibold mb-6">
                    {story.company}
                  </h3>
                  <blockquote className="text-xl text-stone-700 leading-relaxed mb-8 italic">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-stone-200 overflow-hidden">
                      <Image
                        src={story.logo}
                        alt={story.author}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">{story.author}</p>
                      <p className="text-stone-500 text-sm">{story.role}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-4 p-6 bg-stone-50 rounded-2xl">
                    {story.results.map((result, i) => (
                      <div key={i} className="text-center">
                        <p className="text-2xl font-bold text-stone-900">{result.metric}</p>
                        <p className="text-sm text-stone-500">{result.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
              Hear From Our Members
            </h2>
            <p className="text-lg text-stone-600">
              Watch video testimonials from businesses thriving at WESPA
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative aspect-video bg-stone-900 rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={`/images/spaces/${index === 0 ? 'coworking-1' : index === 1 ? 'lounge-1' : 'urban-hub-1'}.jpg`}
                  alt="Video testimonial"
                  fill
                  className="object-cover opacity-70 group-hover:opacity-50 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-stone-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-semibold">Coming Soon</p>
                  <p className="text-sm text-white/70">Video testimonial</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="section-spacing">
        <div className="container-wespa">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-stone-600">
              From tech startups to established enterprises, WESPA welcomes all industries
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              'Technology', 'Finance', 'Marketing', 'Legal', 'Healthcare',
              'E-commerce', 'Consulting', 'Design', 'Media', 'Real Estate',
              'Education', 'Manufacturing', 'Logistics', 'Hospitality', 'Non-profit'
            ].map((industry, index) => (
              <motion.span
                key={index}
                variants={fadeInUp}
                className="px-5 py-2.5 bg-stone-100 text-stone-700 rounded-full text-sm font-medium hover:bg-stone-200 transition-colors cursor-default"
              >
                {industry}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-stone-900 text-white">
        <div className="container-wespa">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-display font-semibold mb-6"
            >
              Ready to Write Your Success Story?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-white/70 mb-10"
            >
              Join hundreds of businesses thriving at WESPA. Schedule a tour and
              discover the perfect space for your team.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-visit">
                <Button variant="primary" size="lg" className="bg-white text-stone-900 hover:bg-stone-100">
                  Book a Visit
                </Button>
              </Link>
              <Link href="/spaces">
                <Button variant="secondary" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  Explore Spaces
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
