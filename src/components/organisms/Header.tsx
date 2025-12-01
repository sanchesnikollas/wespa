'use client'

// ============================================
// WESPA Website - Header Component
// Cmp/Header - Global navigation header
// ============================================

import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { NavLink } from '@/components/molecules/Navigation'
import { mainNavigation } from '@/config/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'

// ============================================
// Language Switcher Component
// ============================================
function LanguageSwitcher({ className }: { className?: string }) {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-full',
        'text-body-sm font-medium transition-all duration-200',
        'hover:bg-wire-100 active:bg-wire-200',
        className
      )}
      aria-label={`Switch to ${language === 'en' ? 'Portuguese' : 'English'}`}
    >
      <Icon name="globe" size="sm" />
      <span className="uppercase">{language}</span>
    </button>
  )
}

// ============================================
// Logo Component with actual SVG
// ============================================
function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/" className={cn('flex items-center', className)} aria-label="WESPA Home">
      <motion.div
        className="relative"
        animate={{
          width: compact ? 100 : 130,
          height: compact ? 24 : 32
        }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src="/images/logo/logo-cinza.svg"
          alt="WESPA"
          fill
          className="object-contain object-left"
          priority
        />
      </motion.div>
    </Link>
  )
}

// ============================================
// Header Component with scroll animation
// ============================================
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const { scrollY } = useScroll()
  const { t } = useLanguage()
  const { user, isAuthenticated, logout } = useAuth()

  // Track scroll position for header style changes
  useMotionValueEvent(scrollY, 'change', (latest) => {
    // Determine scroll direction
    const isScrollingDown = latest > lastScrollY
    setLastScrollY(latest)

    // Show/hide based on scroll direction
    if (latest > 100) {
      setIsVisible(!isScrollingDown)
    } else {
      setIsVisible(true)
    }

    // Compact mode when scrolled past threshold
    setIsScrolled(latest > 50)
    setIsCompact(latest > 100)
  })


  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-colors duration-300'
        )}
        initial={{ y: -100 }}
        animate={{
          y: isVisible ? 0 : -100,
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.97)' : 'rgba(255, 255, 255, 1)',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          boxShadow: isScrolled ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
        }}
      >
        <div className="container-wespa">
          <motion.nav
            className="flex items-center justify-between"
            animate={{ height: isCompact ? 60 : 80 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Logo */}
            <Logo compact={isCompact} />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {mainNavigation.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Book a Visit CTA */}
              <Button variant="wespa" size="sm" asChild>
                <Link href="/book-visit">Book a Visit</Link>
              </Button>

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Auth actions */}
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="w-8 h-8 rounded-full bg-wespa-red flex items-center justify-center text-white text-sm font-semibold hover:bg-wespa-red-dark transition-colors"
                  title="Dashboard"
                >
                  {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
                </Link>
              ) : (
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">{t('nav.login')}</Link>
                </Button>
              )}
            </div>

            {/* Mobile: Language Switcher only (navigation moved to bottom bar) */}
            <div className="lg:hidden flex items-center gap-2">
              <LanguageSwitcher className="text-stone-600" />
              {isAuthenticated && (
                <Link
                  href="/dashboard"
                  className="w-8 h-8 rounded-full bg-wespa-red flex items-center justify-center text-white text-sm font-semibold"
                >
                  {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
                </Link>
              )}
            </div>
          </motion.nav>
        </div>

        {/* Progress indicator for long pages */}
        <motion.div
          className="h-0.5 bg-gradient-to-r from-wespa-red to-wespa-red-dark origin-left"
          style={{
            scaleX: scrollY,
          }}
        />
      </motion.header>

      {/* Header spacer - animated */}
      <motion.div
        animate={{ height: isCompact ? 60 : 80 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </>
  )
}

// ============================================
// Sticky CTA Bar (for mobile)
// Shows at bottom of screen on scroll
// ============================================
export function StickyCtaBar() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollY } = useScroll()
  const { t } = useLanguage()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsVisible(latest > 300)
  })

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            'fixed bottom-0 left-0 right-0 z-40 lg:hidden',
            'bg-white border-t border-wire-200 p-4 shadow-elevated'
          )}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Button fullWidth size="lg" asChild>
            <Link href="/book-visit">{t('nav.bookVisit')}</Link>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
