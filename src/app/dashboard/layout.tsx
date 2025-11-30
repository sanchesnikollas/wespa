'use client'

// ============================================
// WESPA Dashboard - Layout
// Protected area for authenticated users
// ============================================

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { Icon, IconName } from '@/components/atoms/Icon'
import { Button } from '@/components/atoms/Button'
import { cn } from '@/lib/utils'

// ============================================
// Navigation Items
// ============================================
interface NavItem {
  label: string
  href: string
  icon: IconName
}

const dashboardNav: NavItem[] = [
  { label: 'Overview', href: '/dashboard', icon: 'home' },
  { label: 'My Bookings', href: '/dashboard/bookings', icon: 'calendar' },
  { label: 'Membership', href: '/dashboard/membership', icon: 'briefcase' },
  { label: 'Profile', href: '/dashboard/profile', icon: 'user' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'monitor' },
]

// ============================================
// Sidebar Component
// ============================================
function DashboardSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-stone-900">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-stone-800">
        <Link href="/" className="relative w-28 h-8">
          <Image
            src="/images/logo/logo-white.png"
            alt="WESPA"
            fill
            className="object-contain object-left"
          />
        </Link>
      </div>

      {/* User Info */}
      <div className="px-6 py-6 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-wespa-red flex items-center justify-center text-white font-semibold">
            {user?.firstName?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-stone-400 capitalize">
              {user?.membershipType || 'Member'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {dashboardNav.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                isActive
                  ? 'bg-wespa-red/20 text-wespa-red'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              )}
            >
              <Icon name={item.icon} size="sm" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-stone-800">
        <Button
          variant="ghost"
          fullWidth
          className="text-stone-400 hover:text-white hover:bg-stone-800 justify-start"
          onClick={logout}
        >
          <Icon name="arrow-left" size="sm" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}

// ============================================
// Mobile Header
// ============================================
function DashboardMobileHeader() {
  const { user, logout } = useAuth()

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-stone-200">
      <div className="flex items-center justify-between h-16 px-4">
        <Link href="/" className="relative w-24 h-6">
          <Image
            src="/images/logo/logo-cinza.svg"
            alt="WESPA"
            fill
            className="object-contain object-left"
          />
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-600">
            {user?.firstName}
          </span>
          <Button variant="ghost" size="sm" onClick={logout}>
            Sign Out
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="flex overflow-x-auto px-4 py-2 gap-2 border-t border-stone-100">
        {dashboardNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-stone-100 text-stone-700 hover:bg-stone-200"
          >
            <Icon name={item.icon} size="xs" />
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}

// ============================================
// Dashboard Layout
// ============================================
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-wespa-red rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <DashboardSidebar />
      <DashboardMobileHeader />

      {/* Main Content */}
      <main className="lg:pl-64 pt-28 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 lg:p-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}
