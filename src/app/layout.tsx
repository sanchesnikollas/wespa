import type { Metadata, Viewport } from 'next'
import { Lora, Source_Sans_3 } from 'next/font/google'
import '@/styles/globals.css'
import { Header } from '@/components/organisms/Header'
import { BottomNav } from '@/components/organisms/BottomNav'
import { Footer } from '@/components/organisms/Footer'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthProvider } from '@/contexts/AuthContext'

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
    <html lang="en" className={`${lora.variable} ${sourceSans.variable}`}>
      <head>
        <link rel="icon" href="/images/logo/fav-icon-dark.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo/fav-icon-dark.png" />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          <LanguageProvider>
            {/* Skip to main content link for accessibility */}
            <a
              href="#main-content"
              className="skip-link"
            >
              Skip to main content
            </a>

            {/* Global Header */}
            <Header />

            {/* Main content */}
            <main id="main-content" className="min-h-screen">
              {children}
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Mobile bottom navigation (app-like) */}
            <BottomNav />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
