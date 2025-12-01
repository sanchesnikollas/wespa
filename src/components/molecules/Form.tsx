'use client'

// ============================================
// WESPA Website - Form Components
// Cmp/Form_BookVisit, Cmp/Form_Contact, Cmp/Form_Newsletter
// ============================================

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/atoms/Button'
import { Input, Textarea, Select, Checkbox } from '@/components/atoms/Input'
import { Icon } from '@/components/atoms/Icon'
import { trackEvent, getStoredUTM } from '@/components/tracking'
import type { FormStatus, LeadFormData, ContactFormData, NewsletterFormData } from '@/types'

// ============================================
// Validation Schemas
// ============================================
const leadFormSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  companyName: z.string().optional(),
  phone: z.string().optional(),
  inquiryType: z.enum(['workspace', 'event', 'tour', 'general']),
  spaceType: z.string().optional(),
  teamSize: z.string().optional(),
  numberOfPeople: z.number().optional(),
  message: z.string().optional(),
  marketingConsent: z.boolean(),
})

const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

const newsletterSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
})

// ============================================
// Form Status Message Component
// ============================================
interface FormStatusMessageProps {
  status: FormStatus
  successMessage?: string
  errorMessage?: string
}

function FormStatusMessage({
  status,
  successMessage = 'Thank you! We\'ll be in touch soon.',
  errorMessage = 'Something went wrong. Please try again.',
}: FormStatusMessageProps) {
  if (status === 'idle' || status === 'loading') return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        'p-4 rounded-lg flex items-start gap-3',
        status === 'success' && 'bg-green-50 text-green-800',
        status === 'error' && 'bg-red-50 text-red-800'
      )}
      role="alert"
    >
      <Icon
        name={status === 'success' ? 'check' : 'x'}
        size="sm"
        className="mt-0.5 shrink-0"
      />
      <p className="text-body-sm">
        {status === 'success' ? successMessage : errorMessage}
      </p>
    </motion.div>
  )
}

// ============================================
// Lead Form (Cmp/Form_BookVisit)
// Main conversion form for homepage and book-visit page
// ============================================
interface LeadFormProps {
  className?: string
  variant?: 'full' | 'compact'
  defaultInquiryType?: LeadFormData['inquiryType']
  onSubmit?: (data: LeadFormData) => Promise<void>
  redirectToConfirmation?: boolean
}

export function LeadForm({
  className,
  variant = 'full',
  defaultInquiryType = 'workspace',
  onSubmit,
  redirectToConfirmation = true,
}: LeadFormProps) {
  const router = useRouter()
  const [status, setStatus] = useState<FormStatus>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      inquiryType: defaultInquiryType,
      marketingConsent: false,
    },
  })

  const inquiryType = watch('inquiryType')

  const handleFormSubmit = async (data: LeadFormData) => {
    setStatus('loading')
    try {
      // Get UTM parameters
      const utmData = getStoredUTM()

      if (onSubmit) {
        await onSubmit(data)
      } else {
        // Simulate API call (would send to CRM with UTM data)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        console.log('Form data:', { ...data, ...utmData })
      }

      // Track conversion
      trackEvent.bookVisit(data.spaceType)

      // Redirect to confirmation page
      if (redirectToConfirmation) {
        router.push('/book-visit/confirmation')
      } else {
        setStatus('success')
        reset()
      }
    } catch {
      setStatus('error')
    }
  }

  const teamSizeOptions = [
    { value: '1', label: 'Just me' },
    { value: '2-5', label: '2-5 people' },
    { value: '6-10', label: '6-10 people' },
    { value: '11-25', label: '11-25 people' },
    { value: '26-50', label: '26-50 people' },
    { value: '51+', label: '51+ people' },
  ]

  const spaceTypeOptions = [
    { value: 'coworking', label: 'Coworking' },
    { value: 'office', label: 'Private Office' },
    { value: 'meeting', label: 'Meeting Room' },
    { value: 'event', label: 'Event Space' },
  ]

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={cn('space-y-6', className)}
      noValidate
    >
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <FormStatusMessage status={status} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Inquiry type tabs */}
            <div className="flex gap-2 p-1 bg-wire-100 rounded-lg">
              {[
                { value: 'workspace', label: 'Find a workspace' },
                { value: 'event', label: 'Event space' },
              ].map((type) => (
                <label
                  key={type.value}
                  className={cn(
                    'flex-1 py-2 px-4 text-center text-body-sm font-medium rounded-md cursor-pointer transition-colors',
                    inquiryType === type.value
                      ? 'bg-wire-white text-wire-900 shadow-sm'
                      : 'text-wire-600 hover:text-wire-800'
                  )}
                >
                  <input
                    type="radio"
                    value={type.value}
                    {...register('inquiryType')}
                    className="sr-only"
                  />
                  {type.label}
                </label>
              ))}
            </div>

            {/* Form fields grid */}
            <div className={cn(
              'grid gap-4',
              variant === 'full' ? 'md:grid-cols-2' : 'grid-cols-1'
            )}>
              <Input
                label="Full name"
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

              {variant === 'full' && (
                <>
                  <Input
                    label="Company name"
                    placeholder="Your company"
                    error={errors.companyName?.message}
                    {...register('companyName')}
                  />

                  <Input
                    label="Phone number"
                    type="tel"
                    placeholder="+385 1 234 5678"
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                </>
              )}

              {inquiryType === 'workspace' && (
                <>
                  <Select
                    label="Type of space"
                    options={spaceTypeOptions}
                    placeholder="Select space type"
                    {...register('spaceType')}
                  />

                  <Select
                    label="Team size"
                    options={teamSizeOptions}
                    placeholder="Select team size"
                    {...register('teamSize')}
                  />
                </>
              )}

              {inquiryType === 'event' && (
                <Input
                  label="Number of people"
                  type="number"
                  placeholder="e.g. 50"
                  {...register('numberOfPeople', { valueAsNumber: true })}
                />
              )}
            </div>

            {/* Consent checkbox */}
            <Checkbox
              label="I agree to receive communications from WESPA. View our Privacy Policy and Terms of Service."
              error={errors.marketingConsent?.message}
              {...register('marketingConsent')}
            />

            {/* Error message */}
            {status === 'error' && <FormStatusMessage status={status} />}

            {/* Submit button */}
            <Button
              type="submit"
              variant="wespa"
              fullWidth
              isLoading={status === 'loading'}
            >
              {inquiryType === 'event' ? 'Request Event Space' : 'Book a Visit'}
            </Button>

            {/* Legal text */}
            <p className="text-caption text-wire-500 text-center">
              By submitting this form, you agree to our{' '}
              <a href="/terms" className="underline hover:text-wire-700">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="underline hover:text-wire-700">Privacy Policy</a>.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

// ============================================
// Contact Form (Cmp/Form_Contact)
// ============================================
interface ContactFormProps {
  className?: string
  onSubmit?: (data: ContactFormData) => Promise<void>
  redirectToConfirmation?: boolean
}

export function ContactForm({ className, onSubmit, redirectToConfirmation = true }: ContactFormProps) {
  const router = useRouter()
  const [status, setStatus] = useState<FormStatus>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const handleFormSubmit = async (data: ContactFormData) => {
    setStatus('loading')
    try {
      // Get UTM parameters
      const utmData = getStoredUTM()

      if (onSubmit) {
        await onSubmit(data)
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        console.log('Contact form data:', { ...data, ...utmData })
      }

      // Track conversion
      trackEvent.contactSubmit(data.subject)

      // Redirect to confirmation page
      if (redirectToConfirmation) {
        router.push('/contact/confirmation')
      } else {
        setStatus('success')
        reset()
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={cn('space-y-6', className)}
      noValidate
    >
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <FormStatusMessage
            status={status}
            successMessage="Thank you for your message! We'll get back to you within 24 hours."
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Full name"
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

            <Input
              label="Phone number"
              type="tel"
              placeholder="+385 1 234 5678"
              error={errors.phone?.message}
              {...register('phone')}
            />

            <Input
              label="Subject"
              placeholder="How can we help?"
              required
              error={errors.subject?.message}
              {...register('subject')}
            />

            <Textarea
              label="Message"
              placeholder="Tell us more about your inquiry..."
              required
              error={errors.message?.message}
              {...register('message')}
            />

            {status === 'error' && <FormStatusMessage status={status} />}

            <Button type="submit" variant="wespa" fullWidth isLoading={status === 'loading'}>
              Send Message
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

// ============================================
// Newsletter Form (for footer)
// ============================================
interface NewsletterFormProps {
  className?: string
  onSubmit?: (data: NewsletterFormData) => Promise<void>
}

export function NewsletterForm({ className, onSubmit }: NewsletterFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  const handleFormSubmit = async (data: NewsletterFormData) => {
    setStatus('loading')
    try {
      if (onSubmit) {
        await onSubmit(data)
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn('flex items-center gap-2 text-body-sm text-green-600', className)}
      >
        <Icon name="check" size="sm" />
        <span>Thanks for subscribing!</span>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={cn('space-y-3', className)}
      noValidate
    >
      <div className="flex gap-2">
        <Input
          placeholder="Your name"
          className="flex-1"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          type="email"
          placeholder="your@email.com"
          className="flex-1"
          error={errors.email?.message}
          {...register('email')}
        />
        <Button type="submit" isLoading={status === 'loading'} className="shrink-0">
          Subscribe
        </Button>
      </div>
      {status === 'error' && (
        <p className="text-caption text-error">Failed to subscribe. Please try again.</p>
      )}
    </form>
  )
}

// ============================================
// Hero Filter Form (for homepage hero)
// ============================================
interface HeroFilterFormProps {
  className?: string
  onFilter?: (filters: { teamSize: string; industry: string; needType: string }) => void
}

export function HeroFilterForm({ className, onFilter }: HeroFilterFormProps) {
  const [filters, setFilters] = useState({
    teamSize: '',
    industry: '',
    needType: '',
  })

  const teamSizeOptions = [
    { value: '1', label: '1 person' },
    { value: '2-5', label: '2-5 people' },
    { value: '6-10', label: '6-10 people' },
    { value: '11-25', label: '11-25 people' },
    { value: '26+', label: '26+ people' },
  ]

  const industryOptions = [
    { value: 'tech', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'creative', label: 'Creative' },
    { value: 'other', label: 'Other' },
  ]

  const needTypeOptions = [
    { value: 'coworking', label: 'Coworking' },
    { value: 'office', label: 'Private Office' },
    { value: 'event', label: 'Event Space' },
  ]

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilter?.(newFilters)
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="grid gap-3 sm:grid-cols-3">
        <Select
          options={teamSizeOptions}
          placeholder="Team Size"
          value={filters.teamSize}
          onChange={(e) => handleFilterChange('teamSize', e.target.value)}
        />
        <Select
          options={industryOptions}
          placeholder="Industry"
          value={filters.industry}
          onChange={(e) => handleFilterChange('industry', e.target.value)}
        />
        <Select
          options={needTypeOptions}
          placeholder="Type of need"
          value={filters.needType}
          onChange={(e) => handleFilterChange('needType', e.target.value)}
        />
      </div>
      <Button variant="wespa" fullWidth size="lg" rightIcon={<Icon name="arrow-right" size="sm" />}>
        Book a Visit
      </Button>
      <p className="text-caption text-wire-500 text-center">
        Entry point of the main conversion funnel
      </p>
    </div>
  )
}
