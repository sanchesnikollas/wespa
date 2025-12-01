'use client'

// ============================================
// WESPA Dashboard - Membership Page
// View and manage membership details
// ============================================

import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/atoms/Button'
import { Icon, IconName } from '@/components/atoms/Icon'
import { cn } from '@/lib/utils'

// ============================================
// Plan Card
// ============================================
interface PlanCardProps {
  name: string
  price: number
  features: string[]
  isCurrentPlan: boolean
  isPopular?: boolean
}

function PlanCard({ name, price, features, isCurrentPlan, isPopular }: PlanCardProps) {
  return (
    <motion.div
      className={cn(
        'bg-white rounded-2xl border-2 p-6 relative',
        isCurrentPlan ? 'border-red-500' : 'border-gray-200',
        isPopular && !isCurrentPlan && 'border-gray-900'
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {isCurrentPlan && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
          Current Plan
        </span>
      )}
      {isPopular && !isCurrentPlan && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs font-medium rounded-full">
          Most Popular
        </span>
      )}

      <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
      <div className="mb-6">
        <span className="text-3xl font-bold text-gray-900">EUR {price}</span>
        <span className="text-gray-500">/month</span>
      </div>

      <ul className="space-y-3 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <Icon name="check" size="sm" className="text-green-500 mt-0.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {isCurrentPlan ? (
        <Button variant="secondary" fullWidth disabled>
          Current Plan
        </Button>
      ) : (
        <Button variant={isPopular ? 'primary' : 'secondary'} fullWidth>
          Upgrade
        </Button>
      )}
    </motion.div>
  )
}

// ============================================
// Usage Card
// ============================================
interface UsageCardProps {
  label: string
  used: number
  total: number
  icon: IconName
}

function UsageCard({ label, used, total, icon }: UsageCardProps) {
  const percentage = Math.round((used / total) * 100)

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
          <Icon name={icon} size="md" className="text-gray-600" />
        </div>
        <span className="text-sm text-gray-500">{used}/{total}</span>
      </div>
      <p className="font-medium text-gray-900 mb-2">{label}</p>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all',
            percentage > 80 ? 'bg-red-500' : percentage > 50 ? 'bg-red-500' : 'bg-green-500'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

// ============================================
// Membership Page
// ============================================
export default function MembershipPage() {
  const { user } = useAuth()

  const plans = [
    {
      name: 'FlyDesk',
      price: 150,
      features: [
        'Access to any available desk',
        'High-speed WiFi',
        'Meeting room credits (2h/month)',
        'Print & scan services',
        'Community events access',
      ],
    },
    {
      name: 'OwnDesk',
      price: 300,
      features: [
        'Personal dedicated desk',
        'Lockable storage',
        'High-speed WiFi',
        'Meeting room credits (5h/month)',
        '24/7 access',
        'Mail handling',
      ],
      isPopular: true,
    },
    {
      name: 'OfficeDesk',
      price: 600,
      features: [
        'Private office (2-6 people)',
        'Dedicated phone line',
        'Meeting room credits (10h/month)',
        'Premium WiFi',
        '24/7 access',
        'Custom branding options',
      ],
    },
  ]

  const usage = [
    { label: 'Meeting Room Hours', used: 3, total: 5, icon: 'calendar' as IconName },
    { label: 'Guest Passes', used: 2, total: 5, icon: 'users' as IconName },
    { label: 'Print Pages', used: 45, total: 100, icon: 'printer' as IconName },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Membership</h1>
        <p className="text-gray-600">View your plan details and usage</p>
      </div>

      {/* Current Plan Summary */}
      <motion.div
        className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-gray-400 text-sm mb-1">Your Current Plan</p>
            <h2 className="text-3xl font-bold capitalize mb-2">{user?.membershipType || 'FlyDesk'}</h2>
            <p className="text-gray-400">
              Member since {user?.memberSince || 'January 2024'} at WESPA {user?.location || 'Business'}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              View Invoice
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Upgrade Plan
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Usage Stats */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">This Month's Usage</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {usage.map((item, i) => (
            <UsageCard key={i} {...item} />
          ))}
        </div>
      </div>

      {/* All Plans */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Plans</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan.name}
              {...plan}
              isCurrentPlan={plan.name.toLowerCase() === user?.membershipType}
            />
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Billing History</h2>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Date</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Description</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Amount</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { date: 'Nov 1, 2024', description: 'Monthly membership', amount: 300, status: 'Paid' },
                { date: 'Oct 1, 2024', description: 'Monthly membership', amount: 300, status: 'Paid' },
                { date: 'Sep 1, 2024', description: 'Monthly membership', amount: 300, status: 'Paid' },
              ].map((invoice, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 text-sm text-gray-900">{invoice.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{invoice.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">EUR {invoice.amount}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm">
                      <Icon name="download" size="sm" />
                      PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
