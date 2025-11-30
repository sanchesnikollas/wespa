'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
import { Button } from '@/components/atoms/Button'
import { WespaIcon, WespaIconCircle, type WespaIconName } from '@/components/atoms/WespaIcon'

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
      staggerChildren: 0.1
    }
  }
}

const menuHighlights = [
  {
    name: 'Signature Pasta',
    description: 'Fresh handmade pasta with seasonal ingredients',
    price: '€16'
  },
  {
    name: 'Mediterranean Bowl',
    description: 'Grilled vegetables, quinoa, feta & herb dressing',
    price: '€14'
  },
  {
    name: 'Beef Carpaccio',
    description: 'Thinly sliced beef with arugula & parmesan',
    price: '€18'
  },
  {
    name: 'Fresh Seafood',
    description: 'Daily catch prepared to perfection',
    price: 'Market'
  }
]

const features: { icon: WespaIconName; title: string; description: string }[] = [
  { icon: 'hospitality', title: 'Business Breakfast', description: 'Start your day right with our healthy options' },
  { icon: 'document', title: 'Power Lunch', description: 'Quick yet refined meals for busy professionals' },
  { icon: 'concierge', title: 'After Work', description: 'Unwind with our curated wine selection' },
  { icon: 'stage', title: 'Private Events', description: 'Host memorable gatherings in our space' }
]

export default function PapelPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[80vh] flex items-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          <Image
            src="/images/hospitality/papel-1.jpg"
            alt="PAPEL Restaurant"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </motion.div>

        <div className="container-wespa relative z-10">
          <motion.div
            className="max-w-2xl text-white"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6"
            >
              WESPA Hospitality
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-display font-bold mb-6 text-white"
            >
              PAPEL
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
            >
              A modern Mediterranean restaurant where business meets pleasure.
              Fresh ingredients, creative cuisine, and an ambiance designed for connection.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex gap-4">
              <Button variant="primary" size="lg" className="bg-white text-stone-900 hover:bg-stone-100">
                Reserve a Table
              </Button>
              <Button variant="secondary" size="lg" className="border-white/30 text-white hover:bg-white/10">
                View Menu
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <motion.div
            className="grid lg:grid-cols-2 gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp}>
              <span className="text-sm font-medium text-stone-500 uppercase tracking-wider">The Experience</span>
              <h2 className="text-4xl md:text-5xl font-display font-semibold mt-4 mb-6 text-balance">
                Where Every Meal Becomes a <span className="text-gradient">Moment</span>
              </h2>
              <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                PAPEL is more than a restaurant—it&apos;s a culinary destination within WESPA&apos;s ecosystem.
                Our chef crafts dishes that inspire conversation, fuel productivity, and celebrate
                the art of Mediterranean cuisine.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                From power breakfasts to client dinners, every dish is prepared with intention.
                Locally sourced ingredients, seasonal menus, and a commitment to excellence
                define the PAPEL experience.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="relative"
            >
              <div className="image-container aspect-[4/5]">
                <Image
                  src="/images/hospitality/papel-2.jpg"
                  alt="PAPEL interior"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center text-white font-bold">
                    4.9
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">Excellent Rating</p>
                    <p className="text-sm text-stone-500">Based on 500+ reviews</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
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
              Designed for Every Occasion
            </h2>
            <p className="text-lg text-stone-600">
              From morning meetings to evening celebrations, PAPEL adapts to your needs
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-8 bg-stone-50 rounded-2xl hover:bg-stone-100 transition-colors"
              >
                <div className="flex justify-center mb-4">
                  <WespaIconCircle name={feature.icon} size="lg" variant="light" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-stone-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="section-spacing bg-stone-900 text-white">
        <div className="container-wespa">
          <motion.div
            className="grid lg:grid-cols-2 gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp}>
              <span className="text-sm font-medium text-stone-400 uppercase tracking-wider">Menu Highlights</span>
              <h2 className="text-4xl md:text-5xl font-display font-semibold mt-4 mb-12">
                Chef&apos;s Selection
              </h2>

              <div className="space-y-8">
                {menuHighlights.map((item, index) => (
                  <div key={index} className="flex justify-between items-start pb-6 border-b border-stone-700">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                      <p className="text-stone-400">{item.description}</p>
                    </div>
                    <span className="text-lg font-medium text-gradient">{item.price}</span>
                  </div>
                ))}
              </div>

              <Button variant="primary" size="lg" className="mt-10 bg-white text-stone-900 hover:bg-stone-100">
                View Full Menu
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="image-container aspect-square"
            >
              <Image
                src="/images/hospitality/papel-3.jpg"
                alt="PAPEL dish"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
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
              The Atmosphere
            </h2>
            <p className="text-lg text-stone-600">
              A space designed for connection, conversation, and culinary delight
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="image-container aspect-[3/4] md:row-span-2">
              <Image
                src="/images/hospitality/papel-1.jpg"
                alt="PAPEL ambiance"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="image-container aspect-video">
              <Image
                src="/images/hospitality/papel-2.jpg"
                alt="PAPEL interior"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="image-container aspect-video">
              <Image
                src="/images/hero/hero-secondary.jpg"
                alt="PAPEL cuisine"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="image-container aspect-video md:col-span-2">
              <Image
                src="/images/hospitality/papel-3.jpg"
                alt="PAPEL details"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-stone-50">
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
              Ready to Experience PAPEL?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-stone-600 mb-10"
            >
              Reserve your table and discover why PAPEL is Zagreb&apos;s most talked-about business dining destination.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Reserve Now
              </Button>
              <Link href="/hospitality">
                <Button variant="secondary" size="lg">
                  Explore All Hospitality
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
