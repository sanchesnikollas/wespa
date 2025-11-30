'use client'

// ============================================
// WESPA Website - Navigation Components
// Desktop nav, mobile nav, dropdown menus
// ============================================

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/atoms/Button'
import { Icon, IconName } from '@/components/atoms/Icon'
import type { NavItem } from '@/types'

// ============================================
// Desktop Navigation Link
// ============================================
interface NavLinkProps {
  item: NavItem
  className?: string
}

export function NavLink({ item, className }: NavLinkProps) {
  const hasChildren = item.children && item.children.length > 0
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150)
  }

  if (!hasChildren) {
    return (
      <a
        href={item.href}
        className={cn(
          'text-body-sm font-medium text-wire-700',
          'hover:text-wire-900 transition-colors',
          'py-2 px-3',
          className
        )}
      >
        {item.label}
      </a>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={cn(
          'flex items-center gap-1 text-body-sm font-medium text-wire-700',
          'hover:text-wire-900 transition-colors',
          'py-2 px-3',
          isOpen && 'text-wire-900',
          className
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <Icon
          name="chevron-down"
          size="xs"
          className={cn('transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 min-w-[200px] bg-wire-white border border-wire-200 rounded-lg shadow-elevated py-2 z-50"
          >
            {item.children?.map((child) => (
              <a
                key={child.href}
                href={child.href}
                className="block px-4 py-2 text-body-sm text-wire-700 hover:bg-wire-50 hover:text-wire-900 transition-colors"
              >
                {child.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// Mobile Navigation
// ============================================
interface MobileNavProps {
  items: NavItem[]
  secondaryItems?: NavItem[]
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ items, secondaryItems, isOpen, onClose }: MobileNavProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Focus the close button when menu opens for accessibility
      setTimeout(() => closeButtonRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with fade animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu panel with slide animation */}
          <motion.nav
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ x: '100%', opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.8 }}
            transition={{
              type: 'spring',
              damping: 28,
              stiffness: 350,
              mass: 0.8
            }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[360px] bg-white z-50 lg:hidden overflow-y-auto shadow-2xl"
          >
            {/* Header with Logo */}
            <div className="flex items-center justify-between p-5 border-b border-stone-200">
              <Link
                href="/"
                onClick={onClose}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg"
              >
                <div className="relative w-28 h-8">
                  <Image
                    src="/images/logo/logo-cinza.svg"
                    alt="WESPA"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="p-3 min-w-[48px] min-h-[48px] flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-label="Close navigation menu"
              >
                <Icon name="x" size="md" />
              </button>
            </div>

            {/* Main navigation with staggered animation */}
            <motion.div
              className="p-4 space-y-1"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.1
                  }
                }
              }}
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <MobileNavItem item={item} onClose={onClose} />
                </motion.div>
              ))}
            </motion.div>

            {/* Divider */}
            {secondaryItems && secondaryItems.length > 0 && (
              <>
                <div className="mx-4 border-t border-stone-200" />
                <motion.div
                  className="p-4 space-y-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {secondaryItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="block py-3 px-4 min-h-[48px] flex items-center text-base text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              </>
            )}

            {/* CTA with entrance animation */}
            <motion.div
              className="p-5 mt-auto border-t border-stone-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Button fullWidth size="lg" onClick={onClose}>
                Book a Visit
              </Button>
            </motion.div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}

// ============================================
// Mobile Nav Item (with accordion for children)
// Enhanced with better touch targets and animations
// ============================================
interface MobileNavItemProps {
  item: NavItem
  onClose?: () => void
}

function MobileNavItem({ item, onClose }: MobileNavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  if (!hasChildren) {
    return (
      <a
        href={item.href}
        onClick={onClose}
        className="block py-4 px-4 min-h-[52px] flex items-center text-lg font-medium text-stone-900 hover:bg-stone-50 rounded-xl transition-colors active:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      >
        {item.label}
      </a>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full py-4 px-4 min-h-[52px] text-lg font-medium text-stone-900 hover:bg-stone-50 rounded-xl transition-colors active:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        aria-expanded={isExpanded}
        aria-controls={`submenu-${item.href}`}
      >
        {item.label}
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon name="chevron-down" size="sm" className="text-stone-500" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`submenu-${item.href}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.25,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="overflow-hidden"
          >
            <motion.div
              className="pl-4 py-2 space-y-1"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.03
                  }
                }
              }}
            >
              {item.children?.map((child) => (
                <motion.a
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  className="block py-3 px-4 min-h-[48px] flex items-center text-base text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-xl transition-colors active:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  variants={{
                    hidden: { opacity: 0, x: 10 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  {child.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// Breadcrumb Navigation
// ============================================
interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-2 text-body-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <Icon name="chevron-right" size="xs" className="text-wire-400" />
              )}
              {isLast || !item.href ? (
                <span className={cn(isLast ? 'text-wire-900 font-medium' : 'text-wire-500')}>
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="text-wire-600 hover:text-wire-900 transition-colors"
                >
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// ============================================
// Tabs Navigation
// ============================================
interface TabItem {
  id: string
  label: string
  icon?: IconName
}

interface TabsNavProps {
  tabs: TabItem[]
  activeTab: string
  onChange: (tabId: string) => void
  className?: string
}

export function TabsNav({ tabs, activeTab, onChange, className }: TabsNavProps) {
  return (
    <div className={cn('flex gap-1 p-1 bg-wire-100 rounded-lg', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 text-body-sm font-medium rounded-md transition-colors',
            activeTab === tab.id
              ? 'bg-wire-white text-wire-900 shadow-sm'
              : 'text-wire-600 hover:text-wire-800'
          )}
          aria-selected={activeTab === tab.id}
          role="tab"
        >
          {tab.icon && <Icon name={tab.icon} size="sm" />}
          {tab.label}
        </button>
      ))}
    </div>
  )
}

// ============================================
// Pagination
// ============================================
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-2', className)}>
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 text-wire-600 hover:text-wire-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <Icon name="chevron-left" size="sm" />
      </button>

      <div className="flex gap-1">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              'w-10 h-10 flex items-center justify-center text-body-sm font-medium rounded-lg transition-colors',
              page === currentPage
                ? 'bg-wire-900 text-wire-white'
                : 'text-wire-600 hover:bg-wire-100'
            )}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 text-wire-600 hover:text-wire-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <Icon name="chevron-right" size="sm" />
      </button>
    </nav>
  )
}
