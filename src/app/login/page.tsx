'use client'

// ============================================
// WESPA Website - Login Page
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

export default function LoginPage() {
  const { t } = useLanguage()
  const { login, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await login(email, password)
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/images/spaces/lounge-1.jpg"
          alt="WESPA Workspace"
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
              Work. Eat. Socialize. Play. Anytime.
            </h2>
            <p className="text-stone-300 text-lg leading-relaxed">
              Access premium workspaces, manage your membership, and connect with the WESPA community.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right: Form Section */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
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
            {t('auth.login.title')}
          </h1>
          <p className="text-stone-600 mb-8">
            {t('auth.login.subtitle')}
          </p>

          {/* Demo notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-amber-800">
              <strong>Demo Mode:</strong> Enter any email and password to log in and explore the dashboard.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label={t('auth.login.email')}
              type="email"
              placeholder="you@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Icon name="mail" size="sm" className="text-stone-400" />}
            />

            <div className="relative">
              <Input
                label={t('auth.login.password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex items-center justify-between">
              <Checkbox label={t('auth.login.rememberMe')} />
              <Link
                href="/forgot-password"
                className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
              >
                {t('auth.login.forgotPassword')}
              </Link>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading}
            >
              {t('auth.login.cta')}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-stone-600">
              {t('auth.login.noAccount')}{' '}
              <Link
                href="/join"
                className="font-medium text-stone-900 hover:text-wespa-red transition-colors"
              >
                {t('auth.login.signUp')}
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
