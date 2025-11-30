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

const coffeeMenu = [
  { name: 'Signature Espresso', description: 'Our house blend, rich and smooth', price: '€3' },
  { name: 'Flat White', description: 'Velvety microfoam, double shot', price: '€4' },
  { name: 'Cold Brew', description: '18-hour steep, naturally sweet', price: '€4.50' },
  { name: 'Matcha Latte', description: 'Ceremonial grade, oat milk', price: '€5' }
]

const quickBites = [
  { name: 'Avocado Toast', description: 'Sourdough, poached egg, microgreens', price: '€9' },
  { name: 'Açaí Bowl', description: 'Fresh berries, granola, honey', price: '€11' },
  { name: 'Protein Box', description: 'Hard boiled eggs, hummus, veggies', price: '€8' },
  { name: 'Fresh Pastries', description: 'Daily selection from our bakery', price: '€4+' }
]

const features: { icon: WespaIconName; title: string; description: string }[] = [
  { icon: 'hospitality', title: 'Specialty Coffee', description: 'Single origin beans roasted locally' },
  { icon: 'flexibility', title: 'Fast Service', description: 'Order ahead via app, grab & go' },
  { icon: 'verified', title: 'Healthy Options', description: 'Vegan, gluten-free, fresh daily' },
  { icon: 'wifi', title: 'Work-Friendly', description: 'High-speed WiFi, power outlets' }
]

export default function SpotPage() {
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
            src="/images/hospitality/spot-1.jpg"
            alt="SPOT Coffee Bar"
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
              SPOT
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
            >
              Your daily fuel station. Premium coffee, healthy bites, and the perfect
              environment to power through your day.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex gap-4">
              <Button variant="primary" size="lg" className="bg-white text-stone-900 hover:bg-stone-100">
                Order Ahead
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
              <span className="text-sm font-medium text-stone-500 uppercase tracking-wider">The Concept</span>
              <h2 className="text-4xl md:text-5xl font-display font-semibold mt-4 mb-6 text-balance">
                Coffee Culture, <span className="text-gradient">Elevated</span>
              </h2>
              <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                SPOT is where productivity meets pleasure. Our specialty coffee bar serves
                carefully sourced beans, healthy snacks, and quick bites designed to keep
                you energized and focused throughout your workday.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                Whether you need a morning espresso, a mid-day pick-me-up, or a healthy
                lunch between meetings, SPOT delivers quality and convenience in equal measure.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="relative"
            >
              <div className="image-container aspect-[4/5]">
                <Image
                  src="/images/hospitality/spot-2.jpg"
                  alt="SPOT interior"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-stone-900 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gradient">7AM</p>
                  <p className="text-sm text-stone-400 mt-1">Opens Daily</p>
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
              Why SPOT?
            </h2>
            <p className="text-lg text-stone-600">
              More than coffee—it&apos;s your daily productivity partner
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

      {/* Menu Section */}
      <section className="section-spacing bg-stone-900 text-white">
        <div className="container-wespa">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-display font-semibold mb-4">
              The Menu
            </h2>
            <p className="text-lg text-stone-400">
              Fuel your day with quality ingredients
            </p>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-2 gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {/* Coffee Menu */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                <span className="text-3xl">☕</span> Coffee & Drinks
              </h3>
              <div className="space-y-6">
                {coffeeMenu.map((item, index) => (
                  <div key={index} className="flex justify-between items-start pb-4 border-b border-stone-700">
                    <div>
                      <h4 className="text-lg font-medium mb-1">{item.name}</h4>
                      <p className="text-stone-400 text-sm">{item.description}</p>
                    </div>
                    <span className="font-medium text-gradient">{item.price}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Bites Menu */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                <span className="text-3xl">🥗</span> Quick Bites
              </h3>
              <div className="space-y-6">
                {quickBites.map((item, index) => (
                  <div key={index} className="flex justify-between items-start pb-4 border-b border-stone-700">
                    <div>
                      <h4 className="text-lg font-medium mb-1">{item.name}</h4>
                      <p className="text-stone-400 text-sm">{item.description}</p>
                    </div>
                    <span className="font-medium text-gradient">{item.price}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Button variant="primary" size="lg" className="bg-white text-stone-900 hover:bg-stone-100">
              View Full Menu
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-spacing">
        <div className="container-wespa">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="image-container aspect-square lg:col-span-2 lg:row-span-2">
              <Image
                src="/images/hospitality/spot-1.jpg"
                alt="SPOT ambiance"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="image-container aspect-square">
              <Image
                src="/images/hospitality/spot-2.jpg"
                alt="SPOT coffee"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="image-container aspect-square">
              <Image
                src="/images/hospitality/spot-3.jpg"
                alt="SPOT interior"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Order Info */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <motion.div
            className="grid lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="mb-4">
                <WespaIconCircle name="phone" size="lg" variant="brand" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Order Ahead</h3>
              <p className="text-stone-600 mb-4">
                Skip the line by ordering through our app. Your coffee will be ready when you arrive.
              </p>
              <Button variant="secondary" size="sm">Download App</Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="mb-4">
                <WespaIconCircle name="location" size="lg" variant="brand" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Delivery</h3>
              <p className="text-stone-600 mb-4">
                Can&apos;t leave your desk? We deliver to all WESPA locations and nearby offices.
              </p>
              <Button variant="secondary" size="sm">Order Delivery</Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="mb-4">
                <WespaIconCircle name="private-office" size="lg" variant="brand" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Catering</h3>
              <p className="text-stone-600 mb-4">
                Hosting a meeting? Let us handle the coffee and refreshments for your team.
              </p>
              <Button variant="secondary" size="sm">Request Quote</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing">
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
              Visit SPOT Today
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-stone-600 mb-10"
            >
              Open daily from 7AM. Find us at both WESPA Green Gold and Zavrtnica locations.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Find Location
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
