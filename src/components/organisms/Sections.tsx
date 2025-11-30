'use client'

// ============================================
// WESPA Website - Section Components (Premium)
// Reusable sections for pages with real images
// ============================================

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/atoms/Button'
import { Icon, IconName } from '@/components/atoms/Icon'
import { WespaIcon, WespaIconCircle, type WespaIconName } from '@/components/atoms/WespaIcon'
import { Tag } from '@/components/atoms/Tag'
import {
  CardFeature,
  CardTestimonial,
  CardMetric,
  CardPlan,
  CardLocation,
  CardArticle,
} from '@/components/molecules/Card'
import { HeroFilterForm, LeadForm } from '@/components/molecules/Form'
import { wespaFeatures, wespaMetrics, coworkingPlans, locations } from '@/config/site'
import type { Feature, ClientStory, CoworkingPlan } from '@/types'

// ============================================
// Animation Variants
// ============================================
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
}

// ============================================
// Section Title Component (Premium)
// ============================================
interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}

export function SectionTitle({
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      className={cn(
        'mb-16 lg:mb-20',
        align === 'center' && 'text-center max-w-3xl mx-auto',
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUp}
    >
      <h2 className={cn(
        'text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance tracking-tight',
        light ? 'text-white' : 'text-stone-900'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'text-lg md:text-xl leading-relaxed',
          light ? 'text-stone-300' : 'text-stone-600'
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

// ============================================
// Hero Section (Premium with real images)
// ============================================
export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src="/images/spaces/urban-hub-1.jpg"
          alt="WESPA Premium Workspace"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/70 to-stone-900/40" />
      </motion.div>

      {/* Content */}
      <motion.div className="container-wespa relative z-10 py-20" style={{ opacity }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 border border-white/20">
                Work. Eat. Socialize. Play. Anytime.
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
              variants={fadeInUp}
            >
              The workspace,
              <br />
              <span className="text-gradient">redefined</span>
            </motion.h1>

            <motion.p
              className="text-xl text-stone-300 mb-10 leading-relaxed max-w-xl"
              variants={fadeInUp}
            >
              Experience total business flexibility within our ecosystem — premium offices,
              inspiring coworking, fine dining, and event venues in Zagreb's business district.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4" variants={fadeInUp}>
              <Button variant="wespa" size="lg">
                Book a Visit
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10 border border-white/30"
              >
                Explore Spaces
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="flex gap-8 mt-12 pt-12 border-t border-white/20"
              variants={fadeInUp}
            >
              {[
                { value: '3,000+', label: 'm² workspace' },
                { value: '320+', label: 'workstations' },
                { value: '2', label: 'locations' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-stone-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Filter Card (Glass effect) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="card-glass p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold text-stone-900 mb-2">Find your space</h2>
              <p className="text-stone-600 mb-6">Tell us about your needs</p>
              <HeroFilterForm />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Icon name="chevron-down" size="sm" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

// ============================================
// Plans Section (Premium Cards)
// ============================================
export function PlansSection() {
  return (
    <section className="section-spacing bg-stone-50">
      <div className="container-wespa">
        <SectionTitle
          title="Flexible plans for every workstyle"
          subtitle="From hot desks to private offices — find the perfect setup for you and your team."
        />

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          {coworkingPlans.map((plan) => (
            <motion.div key={plan.id} variants={fadeInUp}>
              <CardPlan plan={plan} />
            </motion.div>
          ))}
        </motion.div>

        {/* Metrics bar */}
        <motion.div
          className="mt-20 rounded-3xl overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
        >
          <div className="relative">
            <Image
              src="/images/spaces/lounge-1.jpg"
              alt="WESPA Lounge"
              width={1400}
              height={400}
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm" />
            <div className="absolute inset-0 flex items-center">
              <div className="container-wespa">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {wespaMetrics.map((metric) => (
                    <div key={metric.id} className="text-center">
                      <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                        {metric.value}
                        {metric.suffix && <span className="text-stone-400">{metric.suffix}</span>}
                      </div>
                      <div className="text-stone-400">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// Features Grid Section (Premium with WESPA Icons)
// ============================================

// Map feature types to WESPA brand icons
const featureIconMap: Record<string, WespaIconName> = {
  'building': 'private-office',
  'office': 'private-office',
  'workspace': 'flexibility',
  'users': 'dot-double',
  'community': 'dot-double',
  'wifi': 'wifi',
  'coffee': 'hospitality',
  'utensils': 'hospitality',
  'calendar': 'meeting',
  'meeting': 'meeting',
  'clock': 'flexibility',
  'shield': 'verified',
  'check': 'check',
  'phone': 'phone',
  'location': 'location',
  'map-pin': 'location',
  'document': 'document',
  'file': 'document',
  'design': 'design',
  'ruler': 'ruler',
  'events': 'stage',
  'stage': 'stage',
  'printer': 'printer',
  'amenities': 'amenities',
  'presentation': 'presentation',
  'screen': 'screen',
  'door': 'door',
  'concierge': 'concierge',
}

export function FeaturesSection() {
  // Features with WESPA icons
  const features = [
    {
      id: 'flexibility',
      icon: 'flexibility' as WespaIconName,
      title: 'Total Flexibility',
      description: 'Scale up or down as your business evolves. No long-term commitments required.',
    },
    {
      id: 'private-office',
      icon: 'private-office' as WespaIconName,
      title: 'Private Offices',
      description: 'Dedicated spaces for teams of any size, fully furnished and ready to use.',
    },
    {
      id: 'hospitality',
      icon: 'hospitality' as WespaIconName,
      title: 'Premium Hospitality',
      description: 'Two on-site restaurants — PAPEL for fine dining and SPOT for quick bites.',
    },
    {
      id: 'stage',
      icon: 'stage' as WespaIconName,
      title: 'Events & Stage',
      description: 'Professional venues for conferences, workshops, and corporate events.',
    },
    {
      id: 'wifi',
      icon: 'wifi' as WespaIconName,
      title: 'High-Speed Connectivity',
      description: 'Enterprise-grade WiFi and IT infrastructure throughout all spaces.',
    },
    {
      id: 'meeting',
      icon: 'meeting' as WespaIconName,
      title: 'Meeting Rooms',
      description: 'State-of-the-art meeting rooms with video conferencing equipment.',
    },
  ]

  return (
    <section className="section-spacing">
      <div className="container-wespa">
        <SectionTitle
          title="Why choose WESPA?"
          subtitle="Everything you need for productive work, exceptional hospitality, and memorable events."
        />

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="card-feature bg-stone-900 rounded-2xl p-8 lg:p-10 cursor-pointer group"
              variants={fadeInUp}
              whileHover={{
                y: -6,
                transition: { duration: 0.25, ease: 'easeOut' }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="mb-6"
                whileHover={{ scale: 1.1, rotate: 3 }}
                transition={{ duration: 0.2 }}
              >
                <WespaIcon name={feature.icon} size="xl" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-amber-400 transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-stone-400 leading-relaxed group-hover:text-stone-300 transition-colors duration-200">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// Testimonials Section (Premium Carousel)
// ============================================
interface TestimonialsSectionProps {
  stories: ClientStory[]
}

export function TestimonialsSection({ stories }: TestimonialsSectionProps) {
  const sampleStories: ClientStory[] = stories.length > 0 ? stories : [
    {
      id: '1',
      slug: 'blanka-story',
      clientName: 'Blanka M.',
      clientRole: 'Founder',
      companyName: 'Creative Studio',
      testimonial: 'WESPA has transformed how our team works. The flexibility and community here are unmatched. We\'ve grown from 3 to 15 people without ever worrying about office logistics.',
    },
    {
      id: '2',
      slug: 'filip-story',
      clientName: 'Filip K.',
      clientRole: 'CEO',
      companyName: 'Tech Startup',
      testimonial: 'Moving to WESPA was the best decision for our growing team. Professional environment, great networking, and the restaurants on-site are a huge plus for client meetings.',
    },
    {
      id: '3',
      slug: 'josipa-story',
      clientName: 'Josipa B.',
      clientRole: 'Consultant',
      companyName: 'Independent',
      testimonial: 'As a freelancer, I needed a professional space without the commitment. WESPA delivers exactly that — plus an amazing community that helps me win new clients.',
    },
  ]

  return (
    <section className="section-spacing bg-stone-900 text-white overflow-hidden">
      <div className="container-wespa">
        <SectionTitle
          title="Trusted by Zagreb's best"
          subtitle="Join hundreds of professionals who've made WESPA their workspace home."
          light
        />

        {/* Testimonial cards */}
        <motion.div
          className="flex gap-8 overflow-x-auto pb-8 -mx-6 px-6 scrollbar-hide"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {sampleStories.map((story) => (
            <motion.div
              key={story.id}
              className="shrink-0 w-[400px] cursor-pointer"
              variants={fadeInUp}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="card-testimonial bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-full hover:bg-white/10 hover:border-white/20 transition-colors duration-300">
                <motion.div
                  className="text-stone-400 mb-6"
                  whileHover={{ scale: 1.1, color: '#C9A962' }}
                  transition={{ duration: 0.2 }}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
                    <path d="M12 10c-4.4 0-8 3.6-8 8v14h14V18h-8c0-1.5 1.2-2.7 2.7-2.7V10H12zm18.7 0c-4.4 0-8 3.6-8 8v14h14V18h-8c0-1.5 1.2-2.7 2.7-2.7V10h-.7z" />
                  </svg>
                </motion.div>
                <blockquote className="text-lg text-stone-200 mb-8 leading-relaxed">
                  "{story.testimonial}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-stone-700 flex items-center justify-center text-white font-semibold"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {story.clientName.charAt(0)}
                  </motion.div>
                  <div>
                    <div className="font-semibold text-white">{story.clientName}</div>
                    <div className="text-sm text-stone-400">
                      {story.clientRole}, {story.companyName}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Logo bar */}
        <motion.div
          className="mt-16 pt-16 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-center text-stone-500 text-sm uppercase tracking-widest mb-8">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-28 h-10 bg-white/20 rounded flex items-center justify-center text-white/40 text-xs">
                Logo {i}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// Pain Points Section (Premium Split)
// ============================================
export function PainPointsSection() {
  return (
    <section className="section-spacing">
      <div className="container-wespa">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="image-container aspect-[4/5]">
              <Image
                src="/images/spaces/coworking-1.jpg"
                alt="Modern coworking space"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -right-8 bottom-12 bg-white rounded-2xl shadow-2xl p-6 max-w-[200px]">
              <div className="text-4xl font-bold text-stone-900 mb-1">98%</div>
              <div className="text-sm text-stone-600">member satisfaction rate</div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-8 tracking-tight">
              Is the traditional office holding you back?
            </h2>
            <p className="text-xl text-stone-600 mb-10 leading-relaxed">
              Long leases, rigid setups, and isolated home offices don't work for modern
              businesses. You need flexibility, community, and spaces that adapt to your needs.
            </p>

            <div className="space-y-6">
              {[
                { title: 'For Remote Professionals', items: ['Professional workspace on-demand', 'Network with like-minded professionals', 'No long-term commitments'] },
                { title: 'For Growing Teams', items: ['Scale your space as you grow', 'All-inclusive pricing', 'Premium amenities included'] },
              ].map((group, i) => (
                <div key={i} className="bg-stone-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-stone-900 mb-4">{group.title}</h3>
                  <ul className="space-y-3">
                    {group.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-stone-600">
                        <WespaIcon name="check" size="sm" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Button variant="wespa" size="lg" className="mt-8">
              Book a Visit
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// Locations Section (Premium Cards with Images)
// ============================================
export function LocationsSection() {
  const locationData = [
    {
      ...locations[0],
      image: '/images/spaces/lounge-2.jpg',
    },
    {
      ...locations[1],
      image: '/images/spaces/coworking-2.jpg',
    },
  ]

  return (
    <section className="section-spacing bg-stone-50">
      <div className="container-wespa">
        <SectionTitle
          title="Two prime locations"
          subtitle="Each with its unique character, united by the WESPA experience."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {locationData.map((location, index) => (
            <motion.div
              key={location.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <motion.div
                  className="aspect-[4/3]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src={location.image}
                    alt={location.fullName}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent group-hover:from-stone-900/95 transition-colors duration-300" />

                {/* Content overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <motion.span
                    className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium w-fit mb-4"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                  >
                    {location.vibe === 'corporate' ? 'Corporate Vibe' : 'Startup Vibe'}
                  </motion.span>
                  <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-200">{location.fullName}</h3>
                  <p className="text-stone-300 mb-4 flex items-center gap-2">
                    <Icon name="map-pin" size="sm" />
                    {location.address}
                  </p>
                  <p className="text-stone-300 mb-6 line-clamp-2 group-hover:text-stone-200 transition-colors duration-200">{location.description}</p>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Button
                      variant="secondary"
                      className="w-fit bg-white/10 border-white/30 text-white hover:bg-white hover:text-stone-900"
                    >
                      Explore Location
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// Main Lead Form Section (Premium)
// ============================================
export function LeadFormSection() {
  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-stone-900" />
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/images/spaces/meeting-KGZ_1671-HDR.jpg"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="container-wespa relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to elevate your work?
            </h2>
            <p className="text-xl text-stone-300">
              Book a visit and let our team help you find the perfect space.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <LeadForm variant="full" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// Ideas/Blog Section (Premium Grid)
// ============================================
interface IdeasSectionProps {
  articles?: {
    id: string
    slug: string
    title: string
    excerpt: string
    category: string
    publishedAt: string
    readingTime: number
    featured?: boolean
  }[]
}

export function IdeasSection({ articles }: IdeasSectionProps) {
  const sampleArticles = articles || [
    {
      id: '1',
      slug: 'importance-flexible-office',
      title: 'The Importance of Flexible Office Spaces in 2024',
      excerpt: 'Research shows that flexible workspaces increase employee satisfaction and productivity.',
      category: 'Research',
      publishedAt: '2024-01-15',
      readingTime: 5,
      featured: true,
    },
    {
      id: '2',
      slug: 'hybrid-work-trends',
      title: 'Hybrid Work Trends: What Companies Need to Know',
      excerpt: 'How leading companies are adapting their workspace strategies.',
      category: 'Trends',
      publishedAt: '2024-01-10',
      readingTime: 4,
    },
    {
      id: '3',
      slug: 'startup-office-guide',
      title: "A Startup's Guide to Choosing Office Space",
      excerpt: 'Key considerations for early-stage companies looking for workspace.',
      category: 'Guide',
      publishedAt: '2024-01-05',
      readingTime: 6,
    },
  ]

  return (
    <section className="section-spacing">
      <div className="container-wespa">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4 tracking-tight">
              Ideas by WESPA
            </h2>
            <p className="text-xl text-stone-600">
              Insights and trends shaping the future of work
            </p>
          </div>
          <Button variant="secondary">
            View all articles
            <Icon name="arrow-right" size="sm" />
          </Button>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {sampleArticles.map((article) => (
            <motion.div key={article.id} variants={fadeInUp}>
              <CardArticle article={article} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// WESPA Workplace Teaser Section (Premium)
// ============================================
export function WorkplaceTeaserSection() {
  return (
    <section className="section-spacing bg-stone-900">
      <div className="container-wespa">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-amber-500/20 rounded-full text-amber-400 text-sm font-medium mb-6">
              Coming Soon
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              WESPA Workplace
            </h2>
            <p className="text-xl text-stone-300 mb-8 leading-relaxed">
              Our upcoming digital platform will transform how you interact with WESPA.
              Book rooms, manage your membership, and connect with the community — all in one place.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                'Smart booking system',
                'Real-time availability',
                'Community features',
                'Mobile app',
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-stone-300">
                  <WespaIcon name="check" size="sm" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="bg-white text-stone-900 hover:bg-stone-100">
              Join the waitlist
            </Button>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-stone-800 rounded-3xl p-8 border border-stone-700">
              <div className="aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-6 glow-gold p-4">
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/logo/logo-white.png"
                        alt="WESPA"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">WESPA Workplace</h3>
                  <p className="text-stone-400">Your digital workspace companion</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// Page Hero (for inner pages)
// ============================================
interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumbs?: { label: string; href?: string }[]
  image?: string
  children?: React.ReactNode
}

export function PageHero({ title, subtitle, breadcrumbs, image, children }: PageHeroProps) {
  return (
    <section className={cn(
      'relative py-20 lg:py-28',
      image ? 'text-white' : 'bg-stone-50'
    )}>
      {image && (
        <>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/70" />
        </>
      )}

      <div className="container-wespa relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  {index > 0 && (
                    <Icon name="chevron-right" size="xs" className={image ? 'text-stone-400' : 'text-stone-400'} />
                  )}
                  {item.href ? (
                    <a href={item.href} className={cn(
                      'transition-colors',
                      image ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-900'
                    )}>
                      {item.label}
                    </a>
                  ) : (
                    <span className={image ? 'text-white font-medium' : 'text-stone-900 font-medium'}>
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <motion.h1
          className={cn(
            'text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-balance',
            image ? 'text-white' : 'text-stone-900'
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className={cn(
              'text-xl max-w-2xl leading-relaxed',
              image ? 'text-stone-300' : 'text-stone-600'
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        )}

        {children}
      </div>
    </section>
  )
}

// ============================================
// Empty State (Premium)
// ============================================
interface EmptyStateProps {
  icon?: IconName
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

export function EmptyState({ icon = 'search', title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 bg-stone-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <Icon name={icon} size="xl" className="text-stone-400" />
      </div>
      <h3 className="text-2xl font-semibold text-stone-900 mb-3">{title}</h3>
      <p className="text-lg text-stone-600 mb-8 max-w-md mx-auto">{description}</p>
      {action && (
        <Button variant="secondary">
          {action.label}
        </Button>
      )}
    </div>
  )
}
