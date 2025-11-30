'use client'

// ============================================
// WESPA Website - Intersection Observer Hook
// For scroll-based animations and section tracking
// ============================================

import { useEffect, useRef, useState, RefObject } from 'react'

export interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
  onChange?: (entry: IntersectionObserverEntry) => void
}

export interface UseIntersectionObserverReturn<T extends Element> {
  ref: RefObject<T | null>
  isIntersecting: boolean
  entry: IntersectionObserverEntry | undefined
}

/**
 * Hook to observe element intersection with viewport
 */
export function useIntersectionObserver<T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn<T> {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
    onChange,
  } = options

  const ref = useRef<T | null>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>()
  const [isIntersecting, setIsIntersecting] = useState(false)

  const frozen = entry?.isIntersecting && freezeOnceVisible

  useEffect(() => {
    const node = ref.current

    if (!node || typeof IntersectionObserver !== 'function' || frozen) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry)
        setIsIntersecting(entry.isIntersecting)
        onChange?.(entry)
      },
      { threshold, root, rootMargin }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [threshold, root, rootMargin, frozen, onChange])

  return { ref, isIntersecting, entry }
}

/**
 * Hook to track multiple sections for scroll-spy
 */
export function useScrollSpy<T extends string>(
  sectionIds: T[],
  options: { offset?: number; threshold?: number } = {}
): T | null {
  const { offset = 100, threshold = 0.3 } = options
  const [activeSection, setActiveSection] = useState<T | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (!element) continue

        const { offsetTop, offsetHeight } = element
        const sectionTop = offsetTop
        const sectionBottom = offsetTop + offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(id)
          return
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeSection
}
