'use client'

// ============================================
// WESPA Website - Splash Screen Component
// Professional loading screen with WESPA branding
// ============================================

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ============================================
// WESPA Logo SVG (White version)
// ============================================
function WespaLogoWhite({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5 10L22 35H28L34.5 10H40L33 40H23L16.5 15L10 40H0L-7 10H-1L5.5 35H11.5L15.5 10Z"
        fill="white"
        transform="translate(15, 5)"
      />
      <text
        x="100"
        y="35"
        fontFamily="var(--font-lora), Georgia, serif"
        fontSize="32"
        fontWeight="600"
        fill="white"
        textAnchor="middle"
        letterSpacing="8"
      >
        WESPA
      </text>
    </svg>
  )
}

// ============================================
// Splash Screen Component
// ============================================
export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if document is ready
    const checkReady = () => {
      if (document.readyState === 'complete') {
        setIsLoaded(true)
      }
    }

    // Check immediately
    checkReady()

    // Also listen for load event
    window.addEventListener('load', () => setIsLoaded(true))

    return () => {
      window.removeEventListener('load', () => setIsLoaded(true))
    }
  }, [])

  useEffect(() => {
    if (isLoaded) {
      // Minimum display time of 1 second for smooth experience
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isLoaded])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-wespa-red"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-8"
          >
            <WespaLogoWhite className="w-48 h-auto md:w-64" />
          </motion.div>

          {/* Loading Bar Container */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="w-48 md:w-64"
          >
            {/* Loading Bar Background */}
            <div className="h-1 bg-white/30 rounded-full overflow-hidden">
              {/* Animated Loading Bar */}
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: 1,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-6 text-white/80 text-sm tracking-widest uppercase"
          >
            Work. Eat. Socialize. Play.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
