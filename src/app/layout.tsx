import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import Script from 'next/script'
import '@/styles/globals.css'
import { ConditionalLayout } from '@/components/organisms/ConditionalLayout'
import { CustomCursor } from '@/components/organisms/CustomCursor'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AnalyticsProvider, UTMTracker } from '@/components/tracking'
import { HomePageJsonLd } from '@/components/seo'

// ============================================
// Metadata
// ============================================
export const metadata: Metadata = {
  title: {
    default: 'WESPA | Work. Eat. Socialize. Play. Anytime.',
    template: '%s | WESPA',
  },
  description:
    'Premium coworking, offices, restaurants, lounges and event venues in the heart of Zagreb\'s business district. Experience total business flexibility within our ecosystem.',
  keywords: [
    'coworking Zagreb',
    'office space Zagreb',
    'meeting rooms',
    'event venues',
    'flexible workspace',
    'WESPA',
    'business lounge',
  ],
  authors: [{ name: 'WESPA' }],
  creator: 'WESPA',
  publisher: 'WESPA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://wespa.gigwand.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_HR',
    url: 'https://wespa.gigwand.com',
    siteName: 'WESPA',
    title: 'WESPA | Work. Eat. Socialize. Play. Anytime.',
    description:
      'Premium coworking, offices, restaurants, lounges and event venues in Zagreb.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WESPA - Premium Workspace in Zagreb',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WESPA | Work. Eat. Socialize. Play. Anytime.',
    description:
      'Premium coworking, offices, restaurants, lounges and event venues in Zagreb.',
    images: ['/og-image.jpg'],
  },
  robots:
    process.env.NEXT_PUBLIC_NOINDEX === '1'
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
}

export const viewport: Viewport = {
  themeColor: '#171717',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// ============================================
// Root Layout
// ============================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* JSON-LD Structured Data for SEO */}
        <HomePageJsonLd />
      </head>
      <body className="font-sans antialiased">
        <AnalyticsProvider>
          <LanguageProvider>
            {/* Custom Cursor (desktop only) */}
            <CustomCursor />

            {/* UTM Parameter Tracker */}
            <Suspense fallback={null}>
              <UTMTracker />
            </Suspense>

            {/* Layout with Header/Footer */}
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </LanguageProvider>
        </AnalyticsProvider>

        {/* Review widget — só em staging quando NEXT_PUBLIC_ENABLE_REVIEW=1 */}
        {process.env.NEXT_PUBLIC_ENABLE_REVIEW === '1' && (
          <Script
            src={process.env.NEXT_PUBLIC_REVIEW_WIDGET_URL ?? 'https://review.sanches.io/widget.js'}
            data-site-id="wespa"
            data-locale="pt"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
