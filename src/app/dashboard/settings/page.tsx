'use client'

// ============================================
// WESPA Dashboard - Settings Page
// Account preferences and settings
// ============================================

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { cn } from '@/lib/utils'

// ============================================
// Settings Section Component
// ============================================
interface SettingsSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  delay?: number
}

function SettingsSection({ title, description, children, delay = 0 }: SettingsSectionProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  )
}

// ============================================
// Toggle Switch Component
// ============================================
interface ToggleSwitchProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
  label: string
  description?: string
}

function ToggleSwitch({ enabled, onChange, label, description }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-wespa-red focus:ring-offset-2',
          enabled ? 'bg-wespa-red' : 'bg-gray-200'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            enabled ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  )
}

// ============================================
// Settings Page
// ============================================
export default function SettingsPage() {
  const { user, logout } = useAuth()
  const { language, toggleLanguage } = useLanguage()

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    bookingReminders: true,
    newsletter: false,
    promotions: false,
  })

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showActivity: false,
  })

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences</p>
      </div>

      {/* Language Settings */}
      <SettingsSection
        title="Language & Region"
        description="Choose your preferred language"
        delay={0}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <Icon name="globe" size="md" className="text-gray-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Display Language</p>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'English' : 'Português'}
              </p>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={toggleLanguage}>
            Switch to {language === 'en' ? 'PT' : 'EN'}
          </Button>
        </div>
      </SettingsSection>

      {/* Notification Settings */}
      <SettingsSection
        title="Notifications"
        description="Manage how you receive updates"
        delay={0.1}
      >
        <div className="divide-y divide-gray-100">
          <ToggleSwitch
            enabled={notifications.email}
            onChange={(val) => setNotifications({ ...notifications, email: val })}
            label="Email Notifications"
            description="Receive important updates via email"
          />
          <ToggleSwitch
            enabled={notifications.bookingReminders}
            onChange={(val) => setNotifications({ ...notifications, bookingReminders: val })}
            label="Booking Reminders"
            description="Get reminded about upcoming bookings"
          />
          <ToggleSwitch
            enabled={notifications.newsletter}
            onChange={(val) => setNotifications({ ...notifications, newsletter: val })}
            label="Newsletter"
            description="Monthly updates from WESPA"
          />
          <ToggleSwitch
            enabled={notifications.promotions}
            onChange={(val) => setNotifications({ ...notifications, promotions: val })}
            label="Promotions & Offers"
            description="Special deals and discounts"
          />
        </div>
      </SettingsSection>

      {/* Privacy Settings */}
      <SettingsSection
        title="Privacy"
        description="Control your privacy preferences"
        delay={0.2}
      >
        <div className="divide-y divide-gray-100">
          <ToggleSwitch
            enabled={privacy.profileVisible}
            onChange={(val) => setPrivacy({ ...privacy, profileVisible: val })}
            label="Profile Visibility"
            description="Allow other members to see your profile"
          />
          <ToggleSwitch
            enabled={privacy.showActivity}
            onChange={(val) => setPrivacy({ ...privacy, showActivity: val })}
            label="Show Activity Status"
            description="Show when you're active in the workspace"
          />
        </div>
      </SettingsSection>

      {/* Connected Accounts */}
      <SettingsSection
        title="Connected Accounts"
        description="Link external accounts for easier login"
        delay={0.3}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Icon name="linkedin" size="md" className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">LinkedIn</p>
                <p className="text-sm text-gray-500">Not connected</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">Connect</Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center">
                <Icon name="mail" size="md" className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Google</p>
                <p className="text-sm text-gray-500">Not connected</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">Connect</Button>
          </div>
        </div>
      </SettingsSection>

      {/* App Preferences */}
      <SettingsSection
        title="App Preferences"
        description="Customize your WESPA experience"
        delay={0.4}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Icon name="calendar" size="md" className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Default Location</p>
                <p className="text-sm text-gray-500">WESPA Business - Green Gold</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">Change</Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Icon name="clock" size="md" className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Timezone</p>
                <p className="text-sm text-gray-500">Europe/Zagreb (UTC+1)</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">Change</Button>
          </div>
        </div>
      </SettingsSection>

      {/* Account Actions */}
      <SettingsSection
        title="Account"
        delay={0.5}
      >
        <div className="space-y-4">
          <Button variant="secondary" fullWidth onClick={logout}>
            <Icon name="arrow-left" size="sm" />
            Sign Out
          </Button>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-3">
              Need to export your data or delete your account? Contact our support team.
            </p>
            <Button variant="ghost" size="sm" className="text-gray-500">
              Contact Support
            </Button>
          </div>
        </div>
      </SettingsSection>

      {/* App Info */}
      <div className="text-center py-6 text-sm text-gray-400">
        <p>WESPA App v1.0.0</p>
        <p className="mt-1">Member ID: {user?.id || 'N/A'}</p>
      </div>
    </div>
  )
}
