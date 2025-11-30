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
import { NavLink, MobileNav } from '@/components/molecules/Navigation'
import { mainNavigation, secondaryNavigation } from '@/config/navigation'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
            <div className="hidden lg:flex items-center gap-3">
              {/* Secondary nav links */}
              <div className="flex items-center gap-2 border-r border-wire-200 pr-3">
                {secondaryNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-body-sm text-wire-600 hover:text-wire-900 transition-colors px-2 py-1"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Auth actions */}
              <div className="flex items-center gap-2">
                {isAuthenticated ? (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-semibold">
                          {user?.firstName?.charAt(0) || 'U'}
                        </div>
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={logout}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/login">{t('nav.login')}</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/join">{t('nav.joinNow')}</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button - 48px touch target */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-3 min-w-[48px] min-h-[48px] flex items-center justify-center text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <Icon name="menu" size="md" />
            </button>
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

      {/* Mobile Navigation */}
      <MobileNav
        items={mainNavigation}
        secondaryItems={secondaryNavigation}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

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
