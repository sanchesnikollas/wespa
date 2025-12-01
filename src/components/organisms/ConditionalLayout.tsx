'use client'

// ============================================
// WESPA Website - Conditional Layout Wrapper
// Hides public Header/Footer in Dashboard routes
// ============================================

import { usePathname } from 'next/navigation'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
import { BottomNav } from '@/components/organisms/BottomNav'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()

  // Routes that should NOT show the public header/footer
  const isDashboard = pathname?.startsWith('/dashboard')

  if (isDashboard) {
    // Dashboard has its own layout, just render children
    return <>{children}</>
  }

  // Public pages get Header, Footer, and BottomNav
  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
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
    </>
  )
}
