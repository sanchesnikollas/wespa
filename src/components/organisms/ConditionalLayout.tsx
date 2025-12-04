'use client'

// ============================================
// WESPA Website - Layout Wrapper
// Global Header/Footer for all public pages
// ============================================

import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
import { BottomNav } from '@/components/organisms/BottomNav'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  // All pages get Header, Footer, and BottomNav
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
