'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const STORAGE_KEY = 'wespa-consent-v1'

type ConsentChoice = 'granted' | 'denied'

interface ConsentState {
  ad_storage: ConsentChoice
  ad_user_data: ConsentChoice
  ad_personalization: ConsentChoice
  analytics_storage: ConsentChoice
}

function pushConsent(state: ConsentState) {
  if (typeof window === 'undefined') return
  const dl = (window.dataLayer = window.dataLayer || []) as unknown[]
  // Use the `update` command so default values set in <head> get upgraded.
  dl.push(['consent', 'update', state])
  dl.push({ event: 'consent_update', ...state })
}

const COPY = {
  en: {
    title: 'We use cookies',
    body:
      'We use cookies for analytics and to improve your experience. You can accept all, reject all, or read our privacy policy.',
    accept: 'Accept all',
    reject: 'Reject all',
    privacy: 'Privacy policy',
  },
  hr: {
    title: 'Koristimo kolačiće',
    body:
      'Koristimo kolačiće za analitiku i poboljšanje iskustva. Možete prihvatiti sve, odbiti sve ili pročitati pravila privatnosti.',
    accept: 'Prihvati sve',
    reject: 'Odbij sve',
    privacy: 'Pravila privatnosti',
  },
}

export function ConsentBanner() {
  const { language } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        pushConsent(JSON.parse(saved))
      } catch {
        setVisible(true)
      }
    } else {
      setVisible(true)
    }
  }, [])

  const decide = (choice: ConsentChoice) => {
    const state: ConsentState = {
      ad_storage: choice,
      ad_user_data: choice,
      ad_personalization: choice,
      analytics_storage: choice,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    pushConsent(state)
    setVisible(false)
  }

  if (!visible) return null

  const t = COPY[language === 'hr' ? 'hr' : 'en']

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.title}
      className="fixed bottom-4 left-4 right-4 z-50 max-w-xl rounded-2xl bg-stone-900 p-5 text-sm text-white shadow-2xl md:left-6 md:right-auto md:bottom-6"
    >
      <p className="font-semibold mb-2">{t.title}</p>
      <p className="text-stone-300 mb-4 leading-relaxed">{t.body}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => decide('granted')}
          className="px-4 py-2 rounded-lg bg-wespa-red-dark text-white font-semibold hover:bg-wespa-red-darker"
        >
          {t.accept}
        </button>
        <button
          type="button"
          onClick={() => decide('denied')}
          className="px-4 py-2 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20"
        >
          {t.reject}
        </button>
        <a
          href="/privacy"
          className="px-4 py-2 rounded-lg text-stone-300 hover:text-white underline-offset-4 hover:underline self-center"
        >
          {t.privacy}
        </a>
      </div>
    </div>
  )
}
