'use client'

// ============================================
// WESPA Website - About Page
// ============================================

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/atoms/Button'
import { Icon, IconName } from '@/components/atoms/Icon'
import Link from 'next/link'

// ============================================
// Animation Variants
// ============================================
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

// ============================================
// Value Card
// ============================================
interface ValueCardProps {
  icon: IconName
  title: string
  description: string
}

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200"
      variants={fadeInUp}
      whileHover={{ y: -4 }}
    >
      <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center mb-6">
        <Icon name={icon} size="lg" className="text-wespa-red" />
      </div>
      <h3 className="text-xl font-semibold text-stone-900 mb-3">{title}</h3>
      <p className="text-stone-600">{description}</p>
    </motion.div>
  )
}

// ============================================
// About Page
// ============================================
export default function AboutPage() {
  const values: ValueCardProps[] = [
    {
      icon: 'users',
      title: 'Community First',
      description: 'We believe in the power of connection. Our spaces are designed to foster collaboration and meaningful relationships.',
    },
    {
      icon: 'star',
      title: 'Excellence',
      description: 'From design to service, we maintain the highest standards to ensure an exceptional experience for every member.',
    },
    {
      icon: 'heart',
      title: 'Hospitality',
      description: 'Workspace meets hospitality. We combine professional environments with warm, welcoming service.',
    },
    {
      icon: 'globe',
      title: 'Sustainability',
      description: 'We are committed to environmentally responsible practices in all aspects of our operations.',
    },
  ]

  const stats = [
    { value: '3,000+', label: 'Square meters' },
    { value: '320+', label: 'Workstations' },
    { value: '500+', label: 'Members' },
    { value: '2', label: 'Locations' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/spaces/urban-hub-1.jpg"
            alt="WESPA Space"
            fill
            className="object-cover"
          />
        </div>
        <div className="container-wespa relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Work. Eat. Socialize. Play. Anytime.
            </h1>
            <p className="text-xl text-stone-300 mb-8 leading-relaxed">
              WESPA is more than a workspace. It's an ecosystem designed for modern professionals who demand flexibility, community, and excellence in everything they do.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="secondary">
                <Link href="/book-visit">Book a Visit</Link>
              </Button>
              <Button asChild variant="ghost" className="border border-white/30 text-white hover:bg-white/10">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-32">
        <div className="container-wespa">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-wespa-red font-medium mb-4 block">Our Story</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-stone-900 mb-6">
                Redefining the Modern Workspace
              </h2>
              <div className="space-y-4 text-stone-600 text-lg">
                <p>
                  Founded in Zagreb, WESPA emerged from a simple observation: the traditional office no longer serves the needs of modern professionals. We envisioned a space where work, hospitality, and community seamlessly blend.
                </p>
                <p>
                  Today, WESPA stands as Zagreb's premier workspace destination, offering not just desks and meeting rooms, but a complete business ecosystem. From our award-winning restaurants to our state-of-the-art event venues, every detail is designed to elevate your professional life.
                </p>
                <p>
                  Our mission is clear: to create environments where businesses thrive, connections flourish, and every day feels a little more inspiring.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/spaces/lounge-1.jpg"
                alt="WESPA Lounge"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-stone-900">
        <div className="container-wespa">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-stone-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-32 bg-stone-50">
        <div className="container-wespa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-stone-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              The principles that guide everything we do at WESPA.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <ValueCard key={index} {...value} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 lg:py-32">
        <div className="container-wespa">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-stone-900 mb-6">
              Two Locations, One Community
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Both located in Zagreb's business district, our spaces offer unique experiences united by the WESPA standard of excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: 'WESPA Business',
                address: 'Radnička cesta 52, Zagreb',
                description: 'Our flagship location featuring private offices, coworking spaces, and the renowned Papel restaurant.',
                image: '/images/spaces/urban-hub-1.jpg',
              },
              {
                name: 'WESPA Lounge',
                address: 'Radnička cesta 47, Zagreb',
                description: 'A more intimate setting perfect for creative professionals, featuring SPOT restaurant and event spaces.',
                image: '/images/spaces/lounge-1.jpg',
              },
            ].map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden"
              >
                <div className="aspect-[4/3]">
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{location.name}</h3>
                  <p className="text-stone-300 flex items-center gap-2 mb-3">
                    <Icon name="map-pin" size="sm" />
                    {location.address}
                  </p>
                  <p className="text-stone-400">{location.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-wespa-red">
        <div className="container-wespa text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Experience WESPA?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Schedule a tour and discover why leading professionals choose WESPA as their workspace.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link href="/book-visit">Book Your Visit</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
