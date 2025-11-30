'use client'

// ============================================
// WESPA Website - Join Now / Register Page
// ============================================

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/atoms/Button'
import { Input, Checkbox } from '@/components/atoms/Input'
import { Icon } from '@/components/atoms/Icon'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'

export default function JoinPage() {
  const { t } = useLanguage()
  const { register, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!formData.agreeTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy')
      return
    }

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        company: formData.company,
      })
    } catch (err) {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/images/spaces/coworking-1.jpg"
          alt="WESPA Coworking"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 to-stone-900/40" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md text-white"
          >
            <div className="relative w-48 h-12 mb-8">
              <Image
                src="/images/logo/logo-white.png"
                alt="WESPA"
                fill
                className="object-contain object-left"
              />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-4 text-white">
              Join the WESPA Community
            </h2>
            <p className="text-stone-300 text-lg mb-8 leading-relaxed">
              Get access to premium workspaces, exclusive events, and a thriving business community in Zagreb.
            </p>
            <ul className="space-y-4">
              {[
                'Flexible workspace solutions',
                'Premium hospitality included',
                'Networking opportunities',
                'Professional event venues',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-stone-200">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <Icon name="check" size="xs" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Right: Form Section */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md py-8"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8">
            <Link href="/" className="block relative w-36 h-10">
              <Image
                src="/images/logo/logo-cinza.svg"
                alt="WESPA"
                fill
                className="object-contain object-left"
              />
            </Link>
          </div>

          <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">
            {t('auth.join.title')}
          </h1>
          <p className="text-stone-600 mb-8">
            {t('auth.join.subtitle')}
          </p>

          {/* Demo notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-amber-800">
              <strong>Demo Mode:</strong> Fill in the form to create a demo account and explore the dashboard.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label={t('auth.join.firstName')}
                type="text"
                placeholder="John"
                required
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
              />
              <Input
                label={t('auth.join.lastName')}
                type="text"
                placeholder="Doe"
                required
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
              />
            </div>

            <Input
              label={t('auth.join.email')}
              type="email"
              placeholder="you@company.com"
              required
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              leftIcon={<Icon name="mail" size="sm" className="text-stone-400" />}
            />

            <Input
              label={t('auth.join.phone')}
              type="tel"
              placeholder="+385 1 234 5678"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              leftIcon={<Icon name="phone" size="sm" className="text-stone-400" />}
            />

            <Input
              label={t('auth.join.company')}
              type="text"
              placeholder="Company name (optional)"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              leftIcon={<Icon name="building" size="sm" className="text-stone-400" />}
            />

            <div className="relative">
              <Input
                label={t('auth.join.password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                required
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                leftIcon={<Icon name="lock" size="sm" className="text-stone-400" />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-stone-400 hover:text-stone-600 transition-colors"
              >
                <Icon name={showPassword ? 'eye-off' : 'eye'} size="sm" />
              </button>
            </div>

            <div className="relative">
              <Input
                label={t('auth.join.confirmPassword')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                required
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                leftIcon={<Icon name="lock" size="sm" className="text-stone-400" />}
              />
            </div>

            <Checkbox
              label={
                <span className="text-sm text-stone-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-stone-900 hover:text-wespa-red">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-stone-900 hover:text-wespa-red">
                    Privacy Policy
                  </Link>
                </span>
              }
              checked={formData.agreeTerms}
              onChange={(e) => handleChange('agreeTerms', e.target.checked)}
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading}
              variant="wespa"
            >
              {t('auth.join.cta')}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-stone-600">
              {t('auth.join.hasAccount')}{' '}
              <Link
                href="/login"
                className="font-medium text-stone-900 hover:text-wespa-red transition-colors"
              >
                {t('auth.join.signIn')}
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors"
            >
              <Icon name="arrow-left" size="sm" />
              Back to homepage
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
