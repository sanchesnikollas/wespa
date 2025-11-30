'use client'

// ============================================
// WESPA Website - Book a Visit Page
// Frame: 05_BookVisit_Desktop
// Main conversion page with step form
// ============================================

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageHero, SectionTitle } from '@/components/organisms/Sections'
import { LeadForm } from '@/components/molecules/Form'
import { CardLocation } from '@/components/molecules/Card'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { Tag } from '@/components/atoms/Tag'
import { locations } from '@/config/site'

// ============================================
// What to Expect Section
// ============================================
const tourSteps = [
  {
    icon: 'calendar',
    title: 'Schedule Your Visit',
    description: 'Pick a time that works for you. Tours typically last 30-45 minutes.',
  },
  {
    icon: 'users',
    title: 'Meet Our Team',
    description: 'A WESPA representative will guide you through our spaces.',
  },
  {
    icon: 'building',
    title: 'Explore the Spaces',
    description: 'See workstations, meeting rooms, lounges, and amenities firsthand.',
  },
  {
    icon: 'coffee',
    title: 'Experience the Community',
    description: 'Feel the atmosphere and meet some of our members.',
  },
]

// ============================================
// Book Visit Page Component
// ============================================
export default function BookVisitPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-wire-900 text-wire-white py-16 lg:py-24">
        <div className="container-wespa">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-display-md lg:text-display-lg font-bold mb-6 text-balance">
                Book a Visit
              </h1>
              <p className="text-body-lg text-wire-300 mb-8">
                The best way to understand WESPA is to experience it. Schedule a
                personalized tour and let our team help you find the perfect
                workspace for your needs.
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                {[
                  'Personalized tour of all spaces',
                  'Meet the community',
                  'Understand pricing and options',
                  'No obligation, just exploration',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Icon name="check" size="md" className="text-wire-400" />
                    <span className="text-body-md text-wire-200">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-wire-white p-6 lg:p-8 rounded-xl"
            >
              <h2 className="text-heading-lg font-semibold text-wire-900 mb-6">
                Schedule Your Tour
              </h2>
              <LeadForm variant="full" defaultInquiryType="tour" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-spacing">
        <div className="container-wespa">
          <SectionTitle
            title="What to Expect"
            subtitle="Your visit is designed to help you make an informed decision about your workspace."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tourSteps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-wire-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={step.icon as any} size="lg" className="text-wire-700" />
                </div>
                <div className="text-caption text-wire-500 mb-2">Step {index + 1}</div>
                <h3 className="text-heading-sm font-semibold text-wire-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-body-sm text-wire-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="section-spacing bg-wire-50">
        <div className="container-wespa">
          <SectionTitle
            title="Choose Your Location"
            subtitle="Visit one or both of our locations to find your ideal workspace."
          />

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CardLocation location={location} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="max-w-3xl mx-auto">
            <SectionTitle title="Frequently Asked Questions" />

            <div className="space-y-4">
              {[
                {
                  q: 'How long does a tour take?',
                  a: 'A typical tour lasts 30-45 minutes, but we can adjust based on your needs and questions.',
                },
                {
                  q: 'Can I bring my team?',
                  a: 'Absolutely! We encourage teams to visit together to get everyone\'s input.',
                },
                {
                  q: 'Is there any obligation after the tour?',
                  a: 'None at all. The tour is designed to help you explore, not to pressure you.',
                },
                {
                  q: 'Can I try working here before committing?',
                  a: 'Yes! Ask about our day pass options during your tour.',
                },
                {
                  q: 'What should I prepare for the tour?',
                  a: 'Just bring yourself and any questions you have. We\'ll handle the rest.',
                },
              ].map((faq, index) => (
                <motion.details
                  key={index}
                  className="group bg-wire-50 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <summary className="flex items-center justify-between cursor-pointer p-5 text-heading-sm font-semibold text-wire-900 list-none">
                    {faq.q}
                    <Icon
                      name="chevron-down"
                      size="sm"
                      className="text-wire-500 transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <div className="px-5 pb-5 text-body-md text-wire-600">
                    {faq.a}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="bg-wire-100 py-8">
        <div className="container-wespa">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-heading-sm font-semibold text-wire-900">
                Prefer to talk first?
              </p>
              <p className="text-body-sm text-wire-600">
                Our team is happy to answer any questions before your visit.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" leftIcon={<Icon name="phone" size="sm" />}>
                Call Us
              </Button>
              <Button variant="secondary" leftIcon={<Icon name="mail" size="sm" />}>
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
