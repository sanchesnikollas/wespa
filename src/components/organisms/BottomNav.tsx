'use client'

// ============================================
// WESPA Website - Mobile Bottom Navigation
// App-like navigation for mobile devices
// ============================================

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Icon, IconName } from '@/components/atoms/Icon'
import { useLanguage } from '@/contexts/LanguageContext'

// ============================================
// Types
// ============================================
interface NavItemConfig {
  id: string
  label: string
  labelHr: string
  icon: IconName
  href: string
  activeIcon?: IconName
}

// ============================================
// Navigation Configuration
// ============================================
const navItems: NavItemConfig[] = [
  {
    id: 'home',
    label: 'Home',
    labelHr: 'Početna',
    icon: 'home',
    href: '/',
  },
  {
    id: 'spaces',
    label: 'Spaces',
    labelHr: 'Prostori',
    icon: 'building',
    href: '/spaces',
  },
  {
    id: 'book',
    label: 'Book',
    labelHr: 'Rezerviraj',
    icon: 'calendar',
    href: '/book-visit',
  },
  {
    id: 'menu',
    label: 'More',
    labelHr: 'Više',
    icon: 'menu',
    href: '#menu',
  },
]

// ============================================
// More Menu Items
// ============================================
const moreMenuItems = [
  { label: 'About', labelHr: 'O nama', href: '/about', icon: 'users' as IconName },
  { label: 'Hospitality', labelHr: 'Ugostiteljstvo', href: '/hospitality', icon: 'utensils' as IconName },
  { label: 'Events', labelHr: 'Događanja', href: '/events', icon: 'mic' as IconName },
  { label: 'Contact', labelHr: 'Kontakt', href: '/contact', icon: 'mail' as IconName },
  { label: 'Blog', labelHr: 'Blog', href: '/blog', icon: 'external-link' as IconName },
]

// ============================================
// Bottom Navigation Component
// ============================================
export function BottomNav() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Handle scroll to show/hide nav
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY

      // Only hide when scrolling down past 100px
      if (currentScrollY > 100) {
        setIsVisible(!isScrollingDown)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Close menu when pathname changes
  useEffect(() => {
    setIsMoreMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname?.startsWith(href)
  }

  // Nav items - just use the standard items
  const displayNavItems = navItems

  return (
    <>
      {/* More Menu Overlay */}
      <AnimatePresence>
        {isMoreMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMoreMenuOpen(false)}
            />
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-20 left-4 right-4 bg-white rounded-2xl shadow-2xl z-50 lg:hidden overflow-hidden"
            >
              <div className="p-2">
                {moreMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMoreMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-4 px-4 py-4 rounded-xl transition-colors',
                      'hover:bg-gray-100 active:bg-gray-200',
                      isActive(item.href) && 'bg-red-50 text-wespa-red'
                    )}
                  >
                    <Icon name={item.icon} size="md" />
                    <span className="text-base font-medium">
                      {language === 'hr' ? item.labelHr : item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: isVisible ? 0 : 100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed bottom-0 left-0 right-0 z-40 lg:hidden',
          'bg-white/95 backdrop-blur-lg',
          'border-t border-gray-200',
          'pb-safe' // iOS safe area
        )}
        style={{
          paddingBottom: 'max(env(safe-area-inset-bottom), 8px)',
        }}
      >
        <div className="flex items-center justify-around px-2 h-16">
          {displayNavItems.map((item) => {
            const active = item.href === '#menu' ? isMoreMenuOpen : isActive(item.href)
            const isMenuButton = item.href === '#menu'

            if (isMenuButton) {
              return (
                <button
                  key={item.id}
                  onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  className={cn(
                    'flex flex-col items-center justify-center gap-1 py-2 px-4 min-w-[64px]',
                    'transition-colors duration-200',
                    active ? 'text-wespa-red' : 'text-gray-500'
                  )}
                >
                  <motion.div
                    animate={{ rotate: isMoreMenuOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon
                      name={isMoreMenuOpen ? 'x' : item.icon}
                      size="md"
                      strokeWidth={active ? 2.5 : 2}
                    />
                  </motion.div>
                  <span className={cn(
                    'text-[10px] font-medium',
                    active && 'font-semibold'
                  )}>
                    {language === 'hr' ? item.labelHr : item.label}
                  </span>
                </button>
              )
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 py-2 px-4 min-w-[64px]',
                  'transition-colors duration-200',
                  active ? 'text-wespa-red' : 'text-gray-500'
                )}
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.1 }}
                >
                  <Icon
                    name={item.icon}
                    size="md"
                    strokeWidth={active ? 2.5 : 2}
                  />
                </motion.div>
                <span className={cn(
                  'text-[10px] font-medium',
                  active && 'font-semibold'
                )}>
                  {language === 'hr' ? item.labelHr : item.label}
                </span>
                {/* Active indicator dot */}
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-0.5 w-1 h-1 bg-wespa-red rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </motion.nav>

      {/* Spacer for bottom nav */}
      <div className="h-20 lg:hidden" />
    </>
  )
}
