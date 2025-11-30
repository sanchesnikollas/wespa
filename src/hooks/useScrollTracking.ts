'use client'

// ============================================
// WESPA Website - Scroll Tracking Hook
// For scroll position, direction, and depth tracking
// ============================================

import { useState, useEffect, useCallback, useRef } from 'react'
import { isClient, debounce } from '@/lib/utils'
import { tracking } from '@/services/tracking'

export interface ScrollState {
  scrollY: number
  scrollX: number
  scrollDirection: 'up' | 'down' | null
  isScrolling: boolean
  isAtTop: boolean
  isAtBottom: boolean
}

/**
 * Hook to track scroll position and direction
 */
export function useScroll(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollX: 0,
    scrollDirection: null,
    isScrolling: false,
    isAtTop: true,
    isAtBottom: false,
  })

  const lastScrollY = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isClient()) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollX = window.scrollX
      const direction = scrollY > lastScrollY.current ? 'down' : 'up'
      const isAtTop = scrollY <= 0
      const isAtBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 10

      setScrollState({
        scrollY,
        scrollX,
        scrollDirection: direction,
        isScrolling: true,
        isAtTop,
        isAtBottom,
      })

      lastScrollY.current = scrollY

      // Clear previous timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      // Set scrolling to false after scroll ends
      scrollTimeout.current = setTimeout(() => {
        setScrollState((prev) => ({ ...prev, isScrolling: false }))
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  return scrollState
}

/**
 * Hook to track scroll depth and report to analytics
 */
export function useScrollDepth(): void {
  const trackedDepths = useRef<Set<number>>(new Set())

  useEffect(() => {
    if (!isClient()) return

    const handleScroll = debounce(() => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)

      const depths = [25, 50, 75, 100] as const

      for (const depth of depths) {
        if (scrollPercent >= depth && !trackedDepths.current.has(depth)) {
          trackedDepths.current.add(depth)
          tracking.trackScrollDepth(depth)
        }
      }
    }, 100)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
}

/**
 * Hook to lock/unlock body scroll
 */
export function useScrollLock(lock: boolean): void {
  useEffect(() => {
    if (!isClient()) return

    if (lock) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [lock])
}

/**
 * Hook to scroll to element smoothly
 */
export function useScrollTo(): (elementId: string, offset?: number) => void {
  const scrollTo = useCallback((elementId: string, offset = 80) => {
    if (!isClient()) return

    const element = document.getElementById(elementId)
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  return scrollTo
}

/**
 * Hook to detect if user has scrolled past a threshold
 */
export function useScrolledPast(threshold: number): boolean {
  const [scrolledPast, setScrolledPast] = useState(false)

  useEffect(() => {
    if (!isClient()) return

    const handleScroll = () => {
      setScrolledPast(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolledPast
}
