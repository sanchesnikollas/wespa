import type { Metadata, Viewport } from 'next'
import { Lora, Source_Sans_3 } from 'next/font/google'
import { Suspense } from 'react'
import '@/styles/globals.css'
import { ConditionalLayout } from '@/components/organisms/ConditionalLayout'
import { SplashScreen } from '@/components/organisms/SplashScreen'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { AnalyticsProvider, UTMTracker } from '@/components/tracking'
import { HomePageJsonLd } from '@/components/seo'

// ============================================
// Font Configuration - Premium Typography
// Lora for headings (elegant serif)
// Source Sans 3 for body (readable sans-serif)
// ============================================
const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
  weight: ['400', '500', '600', '700'],
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans',
  weight: ['300', '400', '500', '600', '700'],
})

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
  metadataBase: new URL('https://wespa.hr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_HR',
    url: 'https://wespa.hr',
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
  robots: {
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
    <html lang="hr" className={`${lora.variable} ${sourceSans.variable}`}>
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
          <AuthProvider>
            <LanguageProvider>
              {/* Splash Screen */}
              <SplashScreen />

              {/* UTM Parameter Tracker */}
              <Suspense fallback={null}>
                <UTMTracker />
              </Suspense>

              {/* Conditional Layout - hides Header/Footer in Dashboard */}
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </LanguageProvider>
          </AuthProvider>
        </AnalyticsProvider>
      </body>
    </html>
  )
}
