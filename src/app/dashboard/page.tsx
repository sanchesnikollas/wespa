'use client'

// ============================================
// WESPA Dashboard - Overview Page
// Main dashboard with quick stats and actions
// ============================================

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/atoms/Button'
import { Icon, IconName } from '@/components/atoms/Icon'
import { cn } from '@/lib/utils'

// ============================================
// Stats Card
// ============================================
interface StatCardProps {
  label: string
  value: string | number
  icon: IconName
  trend?: string
  trendUp?: boolean
}

function StatCard({ label, value, icon, trend, trendUp }: StatCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center">
          <Icon name={icon} size="lg" className="text-stone-600" />
        </div>
        {trend && (
          <span
            className={cn(
              'text-xs font-medium px-2 py-1 rounded-full',
              trendUp
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            )}
          >
            {trend}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-stone-900 mb-1">{value}</p>
      <p className="text-sm text-stone-500">{label}</p>
    </motion.div>
  )
}

// ============================================
// Quick Action Card
// ============================================
interface QuickActionProps {
  title: string
  description: string
  icon: IconName
  href: string
  color?: 'default' | 'amber' | 'red'
}

function QuickAction({ title, description, icon, href, color = 'default' }: QuickActionProps) {
  const colorClasses = {
    default: 'bg-stone-900 text-white hover:bg-stone-800',
    amber: 'bg-amber-500 text-white hover:bg-amber-600',
    red: 'bg-wespa-red text-white hover:bg-wespa-red-dark',
  }

  return (
    <Link href={href}>
      <motion.div
        className={cn(
          'rounded-2xl p-6 cursor-pointer transition-colors',
          colorClasses[color]
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Icon name={icon} size="lg" className="mb-4 opacity-80" />
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm opacity-80">{description}</p>
      </motion.div>
    </Link>
  )
}

// ============================================
// Upcoming Booking Card
// ============================================
interface BookingProps {
  type: string
  location: string
  date: string
  time: string
}

function UpcomingBooking({ type, location, date, time }: BookingProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl">
      <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
        <Icon name="calendar" size="md" className="text-amber-600" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-stone-900">{type}</p>
        <p className="text-sm text-stone-500">{location}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-stone-900">{date}</p>
        <p className="text-sm text-stone-500">{time}</p>
      </div>
    </div>
  )
}

// ============================================
// Dashboard Page
// ============================================
export default function DashboardPage() {
  const { user } = useAuth()

  // Mock data
  const stats = [
    { label: 'Meeting Hours Used', value: '12h', icon: 'clock' as IconName, trend: '+3h', trendUp: true },
    { label: 'Days This Month', value: 18, icon: 'calendar' as IconName },
    { label: 'Guests Invited', value: 5, icon: 'users' as IconName },
    { label: 'Coffee Credits', value: '8', icon: 'coffee' as IconName },
  ]

  const upcomingBookings: BookingProps[] = [
    { type: 'Meeting Room', location: 'Business - Room A', date: 'Dec 2', time: '10:00 - 11:00' },
    { type: 'Focus Booth', location: 'Lounge - Booth 3', date: 'Dec 4', time: '14:00 - 16:00' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-stone-900 mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-stone-600">
          Here's what's happening with your workspace today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-stone-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickAction
            title="Book a Room"
            description="Reserve meeting rooms and focus booths"
            icon="calendar"
            href="/dashboard/bookings"
            color="amber"
          />
          <QuickAction
            title="Invite a Guest"
            description="Get a day pass for your visitor"
            icon="users"
            href="/dashboard/bookings"
          />
          <QuickAction
            title="Report an Issue"
            description="Something not working? Let us know"
            icon="mail"
            href="/contact"
          />
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-stone-900">Upcoming Bookings</h2>
            <Link href="/dashboard/bookings" className="text-sm text-amber-600 hover:text-amber-700">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking, i) => (
                <UpcomingBooking key={i} {...booking} />
              ))
            ) : (
              <div className="text-center py-12 bg-stone-50 rounded-2xl">
                <Icon name="calendar" size="xl" className="mx-auto mb-4 text-stone-300" />
                <p className="text-stone-500">No upcoming bookings</p>
                <Button variant="secondary" size="sm" className="mt-4">
                  Book Now
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Membership Card */}
        <div>
          <h2 className="text-xl font-semibold text-stone-900 mb-4">Your Membership</h2>
          <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl p-6 text-white">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-stone-400 text-sm mb-1">Current Plan</p>
                <p className="text-2xl font-bold capitalize">{user?.membershipType || 'FlyDesk'}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center">
                <Icon name="star" size="lg" className="text-white" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-stone-400 text-sm">Member Since</p>
                <p className="font-medium">{user?.memberSince || 'Jan 2024'}</p>
              </div>
              <div>
                <p className="text-stone-400 text-sm">Location</p>
                <p className="font-medium capitalize">{user?.location || 'Business'}</p>
              </div>
            </div>
            <Link href="/dashboard/membership">
              <Button variant="secondary" fullWidth className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Manage Membership
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-stone-900 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100">
          {[
            { action: 'Meeting Room booked', detail: 'Room A - Business', time: '2 hours ago' },
            { action: 'Profile updated', detail: 'Contact information changed', time: 'Yesterday' },
            { action: 'Guest pass sent', detail: 'john@company.com', time: '3 days ago' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-stone-900">{activity.action}</p>
                <p className="text-sm text-stone-500">{activity.detail}</p>
              </div>
              <span className="text-xs text-stone-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
