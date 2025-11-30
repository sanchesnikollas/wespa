'use client'

// ============================================
// WESPA Website - Hospitality Page
// Frame: 04_Hospitality_Desktop
// ============================================

import { motion } from 'framer-motion'
import { PageHero, SectionTitle } from '@/components/organisms/Sections'
import { CardBase } from '@/components/molecules/Card'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { Tag } from '@/components/atoms/Tag'
import { restaurants } from '@/config/site'

// ============================================
// Hospitality Page Component
// ============================================
export default function HospitalityPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        title="Culinary Excellence at WESPA"
        subtitle="From power lunches to casual catch-ups, our restaurants offer the perfect setting for every occasion. Experience gastronomy that complements your work."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hospitality' },
        ]}
      />

      {/* Restaurant Cards */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="space-y-16 lg:space-y-24">
            {/* Papel Restaurant */}
            <motion.div
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Image */}
              <div className="aspect-[4/3] bg-wire-200 rounded-xl flex items-center justify-center">
                <div className="text-center text-wire-400">
                  <Icon name="utensils" size="xl" className="mx-auto mb-2" />
                  <span className="text-body-sm">Papel Restaurant Image</span>
                </div>
              </div>

              {/* Content */}
              <div>
                <Tag size="sm" className="mb-4">Fine Dining</Tag>
                <h2 className="text-display-sm font-bold text-wire-900 mb-4">
                  Papel Restaurant
                </h2>
                <p className="text-body-lg text-wire-600 mb-6">
                  {restaurants.find(r => r.id === 'papel')?.description}
                </p>

                {/* Features */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Icon name="star" size="md" className="text-wire-500 mt-0.5" />
                    <div>
                      <h4 className="text-heading-sm font-semibold text-wire-900">Mediterranean Cuisine</h4>
                      <p className="text-body-sm text-wire-600">Contemporary dishes with local ingredients</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="users" size="md" className="text-wire-500 mt-0.5" />
                    <div>
                      <h4 className="text-heading-sm font-semibold text-wire-900">Private Dining</h4>
                      <p className="text-body-sm text-wire-600">Exclusive room for special occasions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="clock" size="md" className="text-wire-500 mt-0.5" />
                    <div>
                      <h4 className="text-heading-sm font-semibold text-wire-900">Business Lunch</h4>
                      <p className="text-body-sm text-wire-600">Daily changing menu 11:00 - 15:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="calendar" size="md" className="text-wire-500 mt-0.5" />
                    <div>
                      <h4 className="text-heading-sm font-semibold text-wire-900">Corporate Catering</h4>
                      <p className="text-body-sm text-wire-600">Events and meeting catering</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-3">
                  <Button rightIcon={<Icon name="external-link" size="sm" />}>
                    View Menu
                  </Button>
                  <Button variant="secondary">
                    Book a Table
                  </Button>
                </div>

                {/* Location */}
                <p className="mt-6 text-body-sm text-wire-500 flex items-center gap-2">
                  <Icon name="map-pin" size="sm" />
                  WESPA Business & Lounge, Green Gold
                </p>
              </div>
            </motion.div>

            {/* SPOT Restaurant */}
            <motion.div
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Content (reversed order on desktop) */}
              <div className="lg:order-2">
                <div className="aspect-[4/3] bg-wire-200 rounded-xl flex items-center justify-center">
                  <div className="text-center text-wire-400">
                    <Icon name="utensils" size="xl" className="mx-auto mb-2" />
                    <span className="text-body-sm">SPOT Restaurant Image</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:order-1">
                <Tag size="sm" className="mb-4">Casual Dining</Tag>
                <h2 className="text-display-sm font-bold text-wire-900 mb-4">
                  SPOT Restaurant
                </h2>
                <p className="text-body-lg text-wire-600 mb-6">
                  {restaurants.find(r => r.id === 'spot')?.description}
                </p>

                {/* Features */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Icon name="coffee" size="md" className="text-wire-500 mt-0.5" />
                    <div>
                      <h4 className="text-heading-sm font-semibold text-wire-900">All-Day Menu</h4>
                      <p className="text-body-sm text-wire-600">Breakfast, lunch, and dinner</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="users" size="md" className="text-wire-500 mt-0.5" />
                    <div>
                      <h4 className="text-heading-sm font-semibold text-wire-900">Community Tables</h4>
                      <p className="text-body-sm text-wire-600">Perfect for networking</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="wifi" size="md" className="text-wire-500 mt-0.5" />
                    <div>
                      <h4 className="text-heading-sm font-semibold text-wire-900">Work-Friendly</h4>
                      <p className="text-body-sm text-wire-600">WiFi, power outlets, quiet zones</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="calendar" size="md" className="text-wire-500 mt-0.5" />
                    <div>
                      <h4 className="text-heading-sm font-semibold text-wire-900">Event Catering</h4>
                      <p className="text-body-sm text-wire-600">Workshops and community events</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-3">
                  <Button rightIcon={<Icon name="external-link" size="sm" />}>
                    View Menu
                  </Button>
                  <Button variant="secondary">
                    Order for Pickup
                  </Button>
                </div>

                {/* Location */}
                <p className="mt-6 text-body-sm text-wire-500 flex items-center gap-2">
                  <Icon name="map-pin" size="sm" />
                  WESPA Spaces, Zavrtnica
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WESPA Members Benefits */}
      <section className="section-spacing bg-wire-50">
        <div className="container-wespa">
          <SectionTitle
            title="Member Benefits"
            subtitle="WESPA members enjoy exclusive perks at our restaurants."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'star', title: '10% Discount', desc: 'On all food and beverages' },
              { icon: 'calendar', title: 'Priority Booking', desc: 'Reserve tables in advance' },
              { icon: 'users', title: 'Meeting Catering', desc: 'Special rates for events' },
              { icon: 'package', title: 'Delivery to Desk', desc: 'Order directly to your workspace' },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-wire-white p-6 rounded-xl border border-wire-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Icon name={benefit.icon as any} size="lg" className="text-wire-700 mb-4" />
                <h3 className="text-heading-sm font-semibold text-wire-900 mb-2">{benefit.title}</h3>
                <p className="text-body-sm text-wire-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="bg-wire-900 text-wire-white rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-display-sm font-bold mb-4">
              Host Your Event With Us
            </h2>
            <p className="text-body-lg text-wire-300 mb-8 max-w-xl mx-auto">
              From corporate dinners to celebration parties, our restaurants offer
              the perfect setting for private events.
            </p>
            <Button
              size="lg"
              className="bg-wire-white text-wire-900 hover:bg-wire-100"
            >
              Request Event Catering
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
