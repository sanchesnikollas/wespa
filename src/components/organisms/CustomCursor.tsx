'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hoverText, setHoverText] = useState('')

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
    if (!isVisible) setIsVisible(true)
  }, [cursorX, cursorY, isVisible])

  const handleMouseDown = useCallback(() => setIsClicking(true), [])
  const handleMouseUp = useCallback(() => setIsClicking(false), [])
  const handleMouseLeave = useCallback(() => setIsVisible(false), [])
  const handleMouseEnter = useCallback(() => setIsVisible(true), [])

  useEffect(() => {
    // Don't render on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    // Track hover on interactive elements
    const handleElementHover = () => {
      const interactiveSelector = 'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]'

      document.addEventListener('mouseover', (e) => {
        const target = e.target as HTMLElement
        const interactive = target.closest(interactiveSelector)
        if (interactive) {
          setIsHovering(true)
          const cursorLabel = interactive.getAttribute('data-cursor-text')
          if (cursorLabel) setHoverText(cursorLabel)
        }
      })

      document.addEventListener('mouseout', (e) => {
        const target = e.target as HTMLElement
        const interactive = target.closest(interactiveSelector)
        if (interactive) {
          setIsHovering(false)
          setHoverText('')
        }
      })
    }

    handleElementHover()

    // Hide default cursor
    document.documentElement.style.cursor = 'none'
    const style = document.createElement('style')
    style.id = 'custom-cursor-style'
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
      @media (pointer: coarse) {
        *, *::before, *::after { cursor: auto !important; }
      }
    `
    document.head.appendChild(style)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
      document.documentElement.style.cursor = ''
      const existingStyle = document.getElementById('custom-cursor-style')
      if (existingStyle) existingStyle.remove()
    }
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter])

  // Don't render on touch/mobile
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Dot - precise cursor point */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: isClicking ? 4 : 6,
            height: isClicking ? 4 : 6,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Ring - smooth follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border-2 border-white flex items-center justify-center"
          animate={{
            width: isHovering ? 64 : isClicking ? 28 : 36,
            height: isHovering ? 64 : isClicking ? 28 : 36,
            opacity: isVisible ? 1 : 0,
            backgroundColor: isHovering ? 'rgba(239, 65, 54, 0.15)' : 'transparent',
            borderColor: isHovering ? 'rgba(239, 65, 54, 0.6)' : 'rgba(255, 255, 255, 0.8)',
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {hoverText && isHovering && (
            <motion.span
              className="text-[8px] font-bold uppercase tracking-widest text-white whitespace-nowrap"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {hoverText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}
