'use client'

// ============================================
// WESPA Website - Header Component
// Cmp/Header - Global navigation header
// ============================================

import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { NavLink } from '@/components/molecules/Navigation'
import { mainNavigation, secondaryNavigation } from '@/config/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { siteConfig } from '@/config/site'

// ============================================
// Language Switcher Component
// ============================================
function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage()

  return (
    <div className={cn('flex items-center bg-wire-100 rounded-full p-0.5', className)}>
      <button
        onClick={() => setLanguage('hr')}
        className={cn(
          'px-3 py-1 rounded-full text-body-sm font-medium transition-all duration-200',
          language === 'hr'
            ? 'bg-white text-stone-900 shadow-sm'
            : 'text-stone-500 hover:text-stone-700'
        )}
        aria-label="Hrvatski"
      >
        HR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          'px-3 py-1 rounded-full text-body-sm font-medium transition-all duration-200',
          language === 'en'
            ? 'bg-white text-stone-900 shadow-sm'
            : 'text-stone-500 hover:text-stone-700'
        )}
        aria-label="English"
      >
        EN
      </button>
    </div>
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const { t, language } = useLanguage()

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
                <Link href="/book-visit">{t('nav.bookVisit')}</Link>
              </Button>

              {/* Language Switcher */}
              <LanguageSwitcher />
            </div>

            {/* Mobile: Language Switcher + hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <LanguageSwitcher className="text-stone-600" />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex items-center justify-center w-10 h-10 rounded-full text-stone-700 hover:bg-stone-100 transition-colors"
                aria-label="Open menu"
              >
                <Icon name="menu" size="md" />
              </button>
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

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] lg:hidden bg-white overflow-y-auto"
          >
            <div className="sticky top-0 flex items-center justify-between px-6 h-16 border-b border-stone-200 bg-white">
              <Logo />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-full text-stone-700 hover:bg-stone-100 transition-colors"
                aria-label="Close menu"
              >
                <Icon name="x" size="md" />
              </button>
            </div>

            <nav className="px-6 py-8 space-y-2">
              {mainNavigation.map((item) => (
                <div key={item.href} className="border-b border-stone-100 pb-2">
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-4 text-lg font-semibold text-stone-900 hover:text-wespa-red transition-colors"
                  >
                    <span>{language === 'hr' ? item.labelHr ?? item.label : item.label}</span>
                    <Icon name="chevron-right" size="sm" className="text-stone-400" />
                  </Link>
                  {item.children && item.children.length > 0 && (
                    <div className="pl-4 space-y-1 pb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center py-2 text-sm text-stone-600 hover:text-wespa-red transition-colors"
                        >
                          {language === 'hr' ? child.labelHr ?? child.label : child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {secondaryNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-4 border-b border-stone-100 text-lg font-semibold text-stone-900 hover:text-wespa-red transition-colors"
                >
                  <span>{language === 'hr' ? item.labelHr ?? item.label : item.label}</span>
                  <Icon name="chevron-right" size="sm" className="text-stone-400" />
                </Link>
              ))}
            </nav>

            <div className="px-6 pb-10 space-y-3">
              <Button variant="wespa" size="lg" fullWidth asChild>
                <Link href="/book-visit" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav.bookVisit')}
                </Link>
              </Button>
              <Button variant="secondary" size="lg" fullWidth asChild>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  {language === 'hr' ? 'Kontakt' : 'Contact'}
                </Link>
              </Button>
              <a
                href={`tel:${siteConfig.contact.sales.phone.replace(/\s/g, '')}`}
                className="flex items-center justify-center gap-2 py-4 text-stone-700 font-medium hover:text-wespa-red transition-colors"
              >
                <Icon name="phone" size="sm" />
                {siteConfig.contact.sales.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
          <div className="flex gap-2">
            <Button fullWidth size="lg" asChild>
              <Link href="/book-visit">{t('nav.bookVisit')}</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild className="shrink-0 px-4">
              <Link href="/contact" aria-label="Contact">
                <Icon name="phone" size="sm" />
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
