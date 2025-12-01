'use client'

// ============================================
// WESPA Website - Book Visit Confirmation Page
// Shown after successful form submission
// ============================================

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'

export default function BookVisitConfirmationPage() {
  // Track conversion on page load
  useEffect(() => {
    // GTM Event
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'form_submission',
        form_type: 'book_visit',
        conversion_type: 'calendar_confirmation',
      })
    }

    // Meta Pixel Event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Schedule')
    }

    // LinkedIn Event
    if (typeof window !== 'undefined' && (window as any).lintrk) {
      (window as any).lintrk('track', { conversion_id: 'book_visit' })
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
            <Icon name="check" size="xl" className="text-green-600" />
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-4">
            Visit Scheduled!
          </h1>

          {/* Message */}
          <p className="text-lg text-stone-600 mb-8">
            Thank you for booking a visit to WESPA. Our team will contact you shortly
            to confirm the details of your tour.
          </p>

          {/* What to expect */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-8 text-left">
            <h2 className="font-semibold text-stone-900 mb-4">What happens next?</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-wespa-red/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm font-semibold text-wespa-red">1</span>
                </div>
                <span className="text-stone-600">
                  You'll receive a confirmation email within the next few minutes
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-wespa-red/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm font-semibold text-wespa-red">2</span>
                </div>
                <span className="text-stone-600">
                  Our team will call you to schedule the perfect time
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-wespa-red/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm font-semibold text-wespa-red">3</span>
                </div>
                <span className="text-stone-600">
                  Visit us and discover your new workspace
                </span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="wespa" asChild>
              <Link href="/spaces">Explore Our Spaces</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>

          {/* Contact info */}
          <p className="text-sm text-stone-500 mt-8">
            Questions? Contact us at{' '}
            <a href="tel:+38512345678" className="text-stone-700 hover:text-wespa-red">
              +385 1 234 5678
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
