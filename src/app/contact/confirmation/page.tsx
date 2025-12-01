'use client'

// ============================================
// WESPA Website - Contact Confirmation Page
// Shown after successful contact form submission
// ============================================

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'

export default function ContactConfirmationPage() {
  // Track conversion on page load
  useEffect(() => {
    // GTM Event
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'form_submission',
        form_type: 'contact',
        conversion_type: 'contact_confirmation',
      })
    }

    // Meta Pixel Event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Contact')
    }

    // LinkedIn Event
    if (typeof window !== 'undefined' && (window as any).lintrk) {
      (window as any).lintrk('track', { conversion_id: 'contact' })
    }
  }, [])

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-stone-50 py-16">
      <div className="container-wespa">
        <motion.div
          className="max-w-lg mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Success Icon */}
          <motion.div
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <Icon name="mail" size="xl" className="text-green-600" />
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-4">
            Message Sent!
          </h1>

          {/* Message */}
          <p className="text-lg text-stone-600 mb-8">
            Thank you for reaching out to WESPA. We've received your message and
            will get back to you within 24 business hours.
          </p>

          {/* Info box */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-8">
            <div className="flex items-center justify-center gap-3 text-stone-600">
              <Icon name="clock" size="md" className="text-stone-400" />
              <span>Average response time: <strong className="text-stone-900">4 hours</strong></span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="wespa" asChild>
              <Link href="/book-visit">Book a Visit</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>

          {/* Alternative contact */}
          <div className="mt-8 p-4 bg-stone-100 rounded-xl">
            <p className="text-sm text-stone-600 mb-2">Need immediate assistance?</p>
            <div className="flex justify-center gap-4">
              <a
                href="tel:+38512345678"
                className="flex items-center gap-2 text-sm font-medium text-stone-900 hover:text-wespa-red"
              >
                <Icon name="phone" size="sm" />
                Call us
              </a>
              <a
                href="https://wa.me/38512345678"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-stone-900 hover:text-wespa-red"
              >
                <Icon name="phone" size="sm" />
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
