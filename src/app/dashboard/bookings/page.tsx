'use client'

// ============================================
// WESPA Dashboard - Bookings Page
// Manage room bookings and reservations
// ============================================

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { cn } from '@/lib/utils'

// ============================================
// Types
// ============================================
interface Booking {
  id: string
  type: 'meeting' | 'focus' | 'event'
  room: string
  location: string
  date: string
  startTime: string
  endTime: string
  status: 'upcoming' | 'completed' | 'cancelled'
}

// ============================================
// Mock Data
// ============================================
const mockBookings: Booking[] = [
  {
    id: '1',
    type: 'meeting',
    room: 'Meeting Room A',
    location: 'WESPA Business',
    date: '2024-12-02',
    startTime: '10:00',
    endTime: '11:00',
    status: 'upcoming',
  },
  {
    id: '2',
    type: 'focus',
    room: 'Focus Booth 3',
    location: 'WESPA Lounge',
    date: '2024-12-04',
    startTime: '14:00',
    endTime: '16:00',
    status: 'upcoming',
  },
  {
    id: '3',
    type: 'meeting',
    room: 'Board Room',
    location: 'WESPA Business',
    date: '2024-11-28',
    startTime: '09:00',
    endTime: '12:00',
    status: 'completed',
  },
]

// ============================================
// Booking Card
// ============================================
function BookingCard({ booking }: { booking: Booking }) {
  const typeConfig = {
    meeting: { label: 'Meeting Room', color: 'bg-blue-100 text-blue-700' },
    focus: { label: 'Focus Booth', color: 'bg-red-100 text-red-700' },
    event: { label: 'Event Space', color: 'bg-purple-100 text-purple-700' },
  }

  const statusConfig = {
    upcoming: { label: 'Upcoming', color: 'text-green-600' },
    completed: { label: 'Completed', color: 'text-gray-400' },
    cancelled: { label: 'Cancelled', color: 'text-red-500' },
  }

  return (
    <motion.div
      className={cn(
        'bg-white rounded-2xl p-6 border border-gray-200',
        booking.status === 'completed' && 'opacity-60'
      )}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className={cn('text-xs font-medium px-3 py-1 rounded-full', typeConfig[booking.type].color)}>
          {typeConfig[booking.type].label}
        </span>
        <span className={cn('text-sm font-medium', statusConfig[booking.status].color)}>
          {statusConfig[booking.status].label}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-1">{booking.room}</h3>
      <p className="text-sm text-gray-500 mb-4">{booking.location}</p>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Icon name="calendar" size="sm" className="text-gray-400" />
          {new Date(booking.date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
        </div>
        <div className="flex items-center gap-2">
          <Icon name="clock" size="sm" className="text-gray-400" />
          {booking.startTime} - {booking.endTime}
        </div>
      </div>

      {booking.status === 'upcoming' && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
          <Button variant="secondary" size="sm" className="flex-1">
            Reschedule
          </Button>
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
            Cancel
          </Button>
        </div>
      )}
    </motion.div>
  )
}

// ============================================
// Bookings Page
// ============================================
export default function BookingsPage() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all')
  const [showNewBooking, setShowNewBooking] = useState(false)

  const filteredBookings = mockBookings.filter((b) => {
    if (filter === 'all') return true
    return b.status === filter
  })

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your room reservations</p>
        </div>
        <Button onClick={() => setShowNewBooking(true)}>
          <Icon name="calendar" size="sm" />
          New Booking
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
        {(['all', 'upcoming', 'completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize',
              filter === tab
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings Grid */}
      {filteredBookings.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <Icon name="calendar" size="xl" className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-500 mb-6">You don't have any {filter !== 'all' ? filter : ''} bookings</p>
          <Button onClick={() => setShowNewBooking(true)}>
            Book a Room
          </Button>
        </div>
      )}

      {/* New Booking Modal Placeholder */}
      {showNewBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">New Booking</h2>
              <button
                onClick={() => setShowNewBooking(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Icon name="x" size="md" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Booking functionality coming soon. For now, please contact reception to make a reservation.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" fullWidth onClick={() => setShowNewBooking(false)}>
                Close
              </Button>
              <Button fullWidth onClick={() => window.location.href = '/contact'}>
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
