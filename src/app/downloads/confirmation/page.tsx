'use client'

// ============================================
// WESPA Website - Download Confirmation Page
// Shown after successful download form submission
// ============================================

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'

function DownloadConfirmationContent() {
  const searchParams = useSearchParams()
  const downloadTitle = searchParams.get('title') || 'Resource'
  const downloadUrl = searchParams.get('url') || '#'

  // Track conversion on page load
  useEffect(() => {
    // GTM Event
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'form_submission',
        form_type: 'download',
        conversion_type: 'download_confirmation',
        resource_title: downloadTitle,
      })
    }

    // Meta Pixel Event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', { content_name: downloadTitle })
    }

    // LinkedIn Event
    if (typeof window !== 'undefined' && (window as any).lintrk) {
      (window as any).lintrk('track', { conversion_id: 'download' })
    }
  }, [downloadTitle])

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
            <Icon name="download" size="xl" className="text-green-600" />
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-4">
            Your Download is Ready!
          </h1>

          {/* Message */}
          <p className="text-lg text-stone-600 mb-8">
            Thank you for your interest in WESPA. Your download should start automatically.
            If it doesn't, click the button below.
          </p>

          {/* Download button */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Icon name="file-text" size="lg" className="text-wespa-red" />
              <span className="font-semibold text-stone-900">{downloadTitle}</span>
            </div>
            <Button variant="wespa" asChild fullWidth>
              <a href={downloadUrl} download>
                <Icon name="download" size="sm" />
                Download Now
              </a>
            </Button>
          </div>

          {/* Email notice */}
          <div className="bg-stone-100 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3 text-left">
              <Icon name="mail" size="sm" className="text-stone-400 mt-0.5 shrink-0" />
              <p className="text-sm text-stone-600">
                We've also sent a copy to your email address for future reference.
              </p>
            </div>
          </div>

          {/* Related resources */}
          <div className="text-left mb-8">
            <h3 className="font-semibold text-stone-900 mb-4">You might also like:</h3>
            <div className="space-y-3">
              <Link
                href="/downloads"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200 hover:border-stone-300 transition-colors"
              >
                <Icon name="folder" size="md" className="text-stone-400" />
                <span className="text-stone-700">Browse all resources</span>
                <Icon name="arrow-right" size="sm" className="text-stone-400 ml-auto" />
              </Link>
              <Link
                href="/ideas"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200 hover:border-stone-300 transition-colors"
              >
                <Icon name="lightbulb" size="md" className="text-stone-400" />
                <span className="text-stone-700">Read our latest articles</span>
                <Icon name="arrow-right" size="sm" className="text-stone-400 ml-auto" />
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="secondary" asChild>
              <Link href="/book-visit">Book a Visit</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function DownloadConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center">Loading...</div>}>
      <DownloadConfirmationContent />
    </Suspense>
  )
}
