'use client'

// ============================================
// WESPA Website - Contact Page
// Frame: 06_Contact_Desktop
// ============================================

import { motion } from 'framer-motion'
import { PageHero } from '@/components/organisms/Sections'
import { ContactForm } from '@/components/molecules/Form'
import { Icon, IconName } from '@/components/atoms/Icon'
import { siteConfig, locations } from '@/config/site'

// ============================================
// Contact Card Component
// ============================================
interface ContactCardProps {
  icon: IconName
  title: string
  children: React.ReactNode
}

function ContactCard({ icon, title, children }: ContactCardProps) {
  return (
    <div className="bg-wire-50 rounded-xl p-6">
      <Icon name={icon} size="lg" className="text-wire-700 mb-4" />
      <h3 className="text-heading-sm font-semibold text-wire-900 mb-3">{title}</h3>
      {children}
    </div>
  )
}

// ============================================
// Contact Page Component
// ============================================
export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        title="Get in Touch"
        subtitle="Have questions about our spaces, memberships, or events? We're here to help."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
      />

      {/* Main Content */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Sales Contact */}
              <ContactCard icon="briefcase" title="Sales & Memberships">
                <div className="space-y-3 text-body-sm">
                  <a
                    href={`tel:${siteConfig.contact.sales.phone}`}
                    className="flex items-center gap-2 text-wire-600 hover:text-wire-900"
                  >
                    <Icon name="phone" size="sm" />
                    {siteConfig.contact.sales.phone}
                  </a>
                  <a
                    href={`mailto:${siteConfig.contact.sales.email}`}
                    className="flex items-center gap-2 text-wire-600 hover:text-wire-900"
                  >
                    <Icon name="mail" size="sm" />
                    {siteConfig.contact.sales.email}
                  </a>
                </div>
              </ContactCard>

              {/* Events Contact */}
              <ContactCard icon="calendar" title="Events & Venue Booking">
                <div className="space-y-3 text-body-sm">
                  <a
                    href={`tel:${siteConfig.contact.events.phone}`}
                    className="flex items-center gap-2 text-wire-600 hover:text-wire-900"
                  >
                    <Icon name="phone" size="sm" />
                    {siteConfig.contact.events.phone}
                  </a>
                  <a
                    href={`mailto:${siteConfig.contact.events.email}`}
                    className="flex items-center gap-2 text-wire-600 hover:text-wire-900"
                  >
                    <Icon name="mail" size="sm" />
                    {siteConfig.contact.events.email}
                  </a>
                </div>
              </ContactCard>

              {/* General Contact */}
              <ContactCard icon="mail" title="General Inquiries">
                <div className="space-y-3 text-body-sm">
                  <a
                    href={`tel:${siteConfig.contact.general.phone}`}
                    className="flex items-center gap-2 text-wire-600 hover:text-wire-900"
                  >
                    <Icon name="phone" size="sm" />
                    {siteConfig.contact.general.phone}
                  </a>
                  <a
                    href={`mailto:${siteConfig.contact.general.email}`}
                    className="flex items-center gap-2 text-wire-600 hover:text-wire-900"
                  >
                    <Icon name="mail" size="sm" />
                    {siteConfig.contact.general.email}
                  </a>
                </div>
              </ContactCard>

              {/* Social */}
              <ContactCard icon="users" title="Follow Us">
                <div className="flex gap-4">
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-wire-200 rounded-lg text-wire-600 hover:text-wire-900 hover:bg-wire-300 transition-colors"
                  >
                    <Icon name="linkedin" size="md" />
                  </a>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-wire-200 rounded-lg text-wire-600 hover:text-wire-900 hover:bg-wire-300 transition-colors"
                  >
                    <Icon name="instagram" size="md" />
                  </a>
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-wire-200 rounded-lg text-wire-600 hover:text-wire-900 hover:bg-wire-300 transition-colors"
                  >
                    <Icon name="facebook" size="md" />
                  </a>
                </div>
              </ContactCard>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-2">
              <div className="bg-wire-white border border-wire-200 rounded-xl p-6 lg:p-8">
                <h2 className="text-heading-lg font-semibold text-wire-900 mb-2">
                  Send us a message
                </h2>
                <p className="text-body-md text-wire-600 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="section-spacing bg-wire-50">
        <div className="container-wespa">
          <h2 className="text-display-sm font-bold text-wire-900 mb-8 text-center">
            Our Locations
          </h2>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                className="bg-wire-white rounded-xl overflow-hidden border border-wire-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Map placeholder */}
                <div className="aspect-video bg-wire-200 flex items-center justify-center">
                  <div className="text-center text-wire-400">
                    <Icon name="map-pin" size="xl" className="mx-auto mb-2" />
                    <span className="text-body-sm">Map for {location.fullName}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-heading-lg font-semibold text-wire-900 mb-1">
                    {location.fullName}
                  </h3>
                  <p className="text-body-sm text-wire-500 mb-4">
                    {location.address}, {location.postalCode} {location.city}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-caption text-wire-500 mb-1">Phone</p>
                      <a
                        href={`tel:${location.phone}`}
                        className="text-body-sm text-wire-700 hover:text-wire-900"
                      >
                        {location.phone}
                      </a>
                    </div>
                    <div>
                      <p className="text-caption text-wire-500 mb-1">Email</p>
                      <a
                        href={`mailto:${location.email}`}
                        className="text-body-sm text-wire-700 hover:text-wire-900"
                      >
                        {location.email}
                      </a>
                    </div>
                  </div>

                  <a
                    href={`https://maps.google.com/?q=${location.address},${location.city}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-body-sm font-medium text-wire-700 hover:text-wire-900"
                  >
                    <Icon name="external-link" size="sm" />
                    Get directions
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="py-12 border-t border-wire-200">
        <div className="container-wespa">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-heading-sm font-semibold text-wire-900 mb-2">
                Reception Hours
              </h3>
              <p className="text-body-sm text-wire-600">Mon-Fri: 08:00 - 18:00</p>
            </div>
            <div>
              <h3 className="text-heading-sm font-semibold text-wire-900 mb-2">
                Member Access
              </h3>
              <p className="text-body-sm text-wire-600">24/7 for eligible members</p>
            </div>
            <div>
              <h3 className="text-heading-sm font-semibold text-wire-900 mb-2">
                Response Time
              </h3>
              <p className="text-body-sm text-wire-600">Within 24 business hours</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
