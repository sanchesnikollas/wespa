'use client'

// ============================================
// WESPA Website - Franchise Page
// Landing page for franchise opportunities
// ============================================

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { PageHero, SectionTitle } from '@/components/organisms/Sections'
import { CardBase, CardMetric } from '@/components/molecules/Card'
import { Button } from '@/components/atoms/Button'
import { Icon, FeatureIcon } from '@/components/atoms/Icon'
import { Tag } from '@/components/atoms/Tag'
import { Input, Textarea, Select } from '@/components/atoms/Input'
import type { FormStatus } from '@/types'

// ============================================
// Franchise Form Schema
// ============================================
const franchiseSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(5, 'Phone is required'),
  companyName: z.string().optional(),
  country: z.string().min(2, 'Country is required'),
  city: z.string().min(2, 'City is required'),
  investmentRange: z.string().optional(),
  message: z.string().optional(),
})

type FranchiseFormData = z.infer<typeof franchiseSchema>

// ============================================
// Franchise Benefits
// ============================================
const benefits = [
  {
    icon: 'package',
    title: 'Proven Business Model',
    description: 'Replicate our successful Zagreb operations with comprehensive operational playbooks.',
  },
  {
    icon: 'users',
    title: 'Full Support System',
    description: 'Training, marketing materials, technology platform, and ongoing operational support.',
  },
  {
    icon: 'building',
    title: 'Flexible Formats',
    description: 'From 500m² boutique spaces to 5,000m² flagship locations, we adapt to your market.',
  },
  {
    icon: 'star',
    title: 'Premium Brand',
    description: 'Join a brand synonymous with quality, hospitality, and modern workspace design.',
  },
]

// ============================================
// Franchise Stats
// ============================================
const stats = [
  { value: '2', label: 'Operating Locations', suffix: '' },
  { value: '3,000', label: 'Total Square Meters', suffix: '+' },
  { value: '95', label: 'Occupancy Rate', suffix: '%' },
  { value: '4.9', label: 'Member Satisfaction', suffix: '/5' },
]

// ============================================
// Franchise Page Component
// ============================================
export default function FranchisePage() {
  const [status, setStatus] = useState<FormStatus>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FranchiseFormData>({
    resolver: zodResolver(franchiseSchema),
  })

  const onSubmit = async (data: FranchiseFormData) => {
    setStatus('loading')
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const investmentOptions = [
    { value: '100-250k', label: '€100,000 - €250,000' },
    { value: '250-500k', label: '€250,000 - €500,000' },
    { value: '500k-1m', label: '€500,000 - €1,000,000' },
    { value: '1m+', label: '€1,000,000+' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-wire-900 text-wire-white py-16 lg:py-24">
        <div className="container-wespa">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Tag variant="outline" className="border-wire-500 text-wire-300 mb-6">
                Franchise Opportunities
              </Tag>
              <h1 className="text-display-md lg:text-display-lg font-bold mb-6 text-balance">
                Bring WESPA to Your City
              </h1>
              <p className="text-body-lg text-wire-300 mb-8">
                Join the future of flexible workspaces. Partner with WESPA to bring our
                proven coworking, hospitality, and events concept to new markets.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-wire-white text-wire-900 hover:bg-wire-100"
                  rightIcon={<Icon name="download" size="sm" />}
                >
                  Download Franchise Deck
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-wire-white hover:bg-wire-800"
                  onClick={() => document.getElementById('franchise-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Express Interest
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-wire-100 py-8">
        <div className="container-wespa">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-display-sm lg:text-display-md font-bold text-wire-900">
                  {stat.value}
                  {stat.suffix && <span className="text-wire-500">{stat.suffix}</span>}
                </div>
                <div className="text-body-sm text-wire-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-spacing">
        <div className="container-wespa">
          <SectionTitle
            title="Why Partner with WESPA?"
            subtitle="A comprehensive franchise opportunity backed by proven success."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="p-6 bg-wire-50 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <FeatureIcon name={benefit.icon as any} className="mb-4" />
                <h3 className="text-heading-sm font-semibold text-wire-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-body-sm text-wire-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="section-spacing bg-wire-50">
        <div className="container-wespa">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-display-sm font-bold text-wire-900 mb-6">
                Complete Franchise Package
              </h2>
              <p className="text-body-lg text-wire-600 mb-8">
                We provide everything you need to successfully launch and operate
                a WESPA location in your market.
              </p>

              <div className="space-y-4">
                {[
                  'Brand licensing and guidelines',
                  'Interior design and fit-out support',
                  'Technology platform and booking system',
                  'Staff training programs',
                  'Marketing and launch support',
                  'Operational playbooks and SOPs',
                  'Ongoing support and best practices',
                  'F&B concept (Papel/SPOT) optional',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Icon name="check" size="md" className="text-wire-500 shrink-0" />
                    <span className="text-body-md text-wire-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Investment Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <CardBase className="p-8">
                <h3 className="text-heading-lg font-semibold text-wire-900 mb-6">
                  Investment Overview
                </h3>

                <div className="space-y-6">
                  <div className="pb-6 border-b border-wire-200">
                    <p className="text-caption text-wire-500 mb-1">Franchise Fee</p>
                    <p className="text-heading-xl font-bold text-wire-900">€50,000 - €100,000</p>
                    <p className="text-body-sm text-wire-600">Depending on market and size</p>
                  </div>

                  <div className="pb-6 border-b border-wire-200">
                    <p className="text-caption text-wire-500 mb-1">Total Investment</p>
                    <p className="text-heading-xl font-bold text-wire-900">€250,000 - €1,000,000+</p>
                    <p className="text-body-sm text-wire-600">Including fit-out and working capital</p>
                  </div>

                  <div>
                    <p className="text-caption text-wire-500 mb-1">Royalty Fee</p>
                    <p className="text-heading-xl font-bold text-wire-900">5-7%</p>
                    <p className="text-body-sm text-wire-600">Of gross revenue</p>
                  </div>
                </div>

                <Button
                  fullWidth
                  size="lg"
                  className="mt-8"
                  rightIcon={<Icon name="download" size="sm" />}
                >
                  Download Full Details
                </Button>
              </CardBase>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="franchise-form" className="section-spacing">
        <div className="container-wespa">
          <div className="max-w-2xl mx-auto">
            <SectionTitle
              title="Express Your Interest"
              subtitle="Tell us about yourself and your market. We'll reach out to discuss opportunities."
            />

            <CardBase className="p-6 lg:p-8">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="check" size="lg" className="text-green-600" />
                  </div>
                  <h3 className="text-heading-lg font-semibold text-wire-900 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-body-md text-wire-600 mb-6">
                    We've received your interest. Our franchise team will contact you within 48 hours.
                  </p>
                  <Button variant="secondary" onClick={() => setStatus('idle')}>
                    Submit Another Inquiry
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      placeholder="John Doe"
                      required
                      error={errors.fullName?.message}
                      {...register('fullName')}
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="john@company.com"
                      required
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Phone"
                      type="tel"
                      placeholder="+1 234 567 8900"
                      required
                      error={errors.phone?.message}
                      {...register('phone')}
                    />
                    <Input
                      label="Company (if applicable)"
                      placeholder="Your company name"
                      error={errors.companyName?.message}
                      {...register('companyName')}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Country"
                      placeholder="e.g., Germany"
                      required
                      error={errors.country?.message}
                      {...register('country')}
                    />
                    <Input
                      label="City"
                      placeholder="e.g., Munich"
                      required
                      error={errors.city?.message}
                      {...register('city')}
                    />
                  </div>

                  <Select
                    label="Investment Range"
                    options={investmentOptions}
                    placeholder="Select investment range"
                    {...register('investmentRange')}
                  />

                  <Textarea
                    label="Tell us about your interest"
                    placeholder="Share your background, experience, and why you're interested in WESPA..."
                    {...register('message')}
                  />

                  {status === 'error' && (
                    <div className="p-4 bg-red-50 text-red-800 rounded-lg text-body-sm">
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    isLoading={status === 'loading'}
                  >
                    Submit Interest
                  </Button>

                  <p className="text-caption text-wire-500 text-center">
                    By submitting, you agree to our Privacy Policy. Your information will be used to evaluate franchise opportunities.
                  </p>
                </form>
              )}
            </CardBase>
          </div>
        </div>
      </section>
    </>
  )
}
