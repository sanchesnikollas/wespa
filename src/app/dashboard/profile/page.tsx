'use client'

// ============================================
// WESPA Dashboard - Profile Page
// User profile settings and information
// ============================================

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Icon } from '@/components/atoms/Icon'

// ============================================
// Profile Page
// ============================================
export default function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
  })
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')

  const handleSave = async () => {
    setSaveStatus('saving')
    try {
      await updateProfile(formData)
      setSaveStatus('saved')
      setIsEditing(false)
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch {
      setSaveStatus('idle')
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-stone-900 mb-2">Profile Settings</h1>
        <p className="text-stone-600">Manage your account information</p>
      </div>

      {/* Profile Card */}
      <motion.div
        className="bg-white rounded-2xl border border-stone-200 overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Avatar Section */}
        <div className="bg-gradient-to-r from-stone-900 to-stone-800 px-8 py-12 text-center">
          <div className="w-24 h-24 rounded-full bg-wespa-red flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </div>
          <h2 className="text-xl font-semibold text-white">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-stone-400 capitalize">{user?.membershipType} Member</p>
        </div>

        {/* Form Section */}
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-stone-900">Personal Information</h3>
            {!isEditing ? (
              <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
                <Icon name="user" size="sm" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} isLoading={saveStatus === 'saving'}>
                  {saveStatus === 'saved' ? 'Saved!' : 'Save'}
                </Button>
              </div>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              disabled={!isEditing}
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              disabled={!isEditing}
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={!isEditing}
            />
            <Input
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={!isEditing}
            />
            <div className="md:col-span-2">
              <Input
                label="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Security Section */}
      <motion.div
        className="bg-white rounded-2xl border border-stone-200 p-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold text-stone-900 mb-6">Security</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Icon name="lock" size="md" className="text-stone-400" />
              <div>
                <p className="font-medium text-stone-900">Password</p>
                <p className="text-sm text-stone-500">Last changed 30 days ago</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">
              Change
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Icon name="mail" size="md" className="text-stone-400" />
              <div>
                <p className="font-medium text-stone-900">Email Notifications</p>
                <p className="text-sm text-stone-500">Receive updates about your bookings</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">
              Manage
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        className="bg-white rounded-2xl border border-red-200 p-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h3>
        <p className="text-stone-600 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">
          Delete Account
        </Button>
      </motion.div>
    </div>
  )
}
