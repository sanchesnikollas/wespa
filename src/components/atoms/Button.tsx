'use client'

// ============================================
// WESPA Website - Button Component
// Cmp/Button_Primary, Cmp/Button_Secondary
// Fixed contrast issues and standardized styles
// ============================================

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

// ============================================
// Types
// ============================================
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link' | 'wespa' | 'gold'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
  as?: 'button' | 'motion'
  asChild?: boolean
}

// ============================================
// Styles - Fixed contrast issues
// ============================================
const baseStyles = cn(
  'inline-flex items-center justify-center gap-2',
  'font-medium font-sans',
  'rounded-xl',
  'transition-all duration-200',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'
)

const variantStyles: Record<ButtonVariant, string> = {
  // Primary: Dark background with WHITE text (high contrast)
  primary: cn(
    'bg-stone-900 text-white',
    'hover:bg-stone-800',
    'active:bg-stone-950',
    'focus-visible:ring-stone-700'
  ),
  // Secondary: Light background with DARK text (high contrast)
  secondary: cn(
    'bg-white text-stone-900 border border-stone-300',
    'hover:bg-stone-50 hover:border-stone-400',
    'active:bg-stone-100',
    'focus-visible:ring-stone-400'
  ),
  // Ghost: Transparent with DARK text
  ghost: cn(
    'bg-transparent text-stone-700',
    'hover:bg-stone-100 hover:text-stone-900',
    'active:bg-stone-200',
    'focus-visible:ring-stone-400'
  ),
  // Link: Transparent with underline
  link: cn(
    'bg-transparent text-stone-700 underline-offset-4',
    'hover:underline hover:text-stone-900',
    'p-0',
    'focus-visible:ring-stone-400'
  ),
  // WESPA Red: Brand red with WHITE text (high contrast)
  wespa: cn(
    'bg-wespa-red text-white',
    'hover:bg-wespa-red-dark hover:shadow-lg hover:shadow-red-500/30',
    'active:bg-wespa-red-darker',
    'focus-visible:ring-wespa-red'
  ),
  // Gold: Gold gradient with WHITE text (high contrast)
  gold: cn(
    'bg-gradient-to-r from-amber-500 to-amber-600 text-white',
    'hover:from-amber-600 hover:to-amber-700 hover:shadow-lg hover:shadow-amber-500/25',
    'active:from-amber-700 active:to-amber-800',
    'focus-visible:ring-amber-500'
  ),
}

const sizeStyles: Record<ButtonSize, string> = {
  // Mobile-first: minimum 48px touch target (WCAG 2.5.5)
  sm: 'px-4 py-2.5 min-h-[44px] text-sm',
  md: 'px-6 py-3 min-h-[48px] text-base',
  lg: 'px-8 py-4 min-h-[52px] text-lg',
}

// ============================================
// Loading Spinner
// ============================================
const LoadingSpinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

// ============================================
// Component
// ============================================
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      as = 'button',
      asChild = false,
      ...props
    },
    ref
  ) => {
    const buttonClasses = cn(
      baseStyles,
      variantStyles[variant],
      variant !== 'link' && sizeStyles[size],
      fullWidth && 'w-full',
      className
    )

    const content = (
      <>
        {isLoading ? (
          <LoadingSpinner />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        <span>{children}</span>
        {rightIcon && !isLoading && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </>
    )

    // Support for asChild pattern (Radix UI Slot)
    if (asChild) {
      return (
        <Slot ref={ref} className={buttonClasses} {...props}>
          {children}
        </Slot>
      )
    }

    if (as === 'motion') {
      return (
        <motion.button
          ref={ref}
          className={buttonClasses}
          disabled={disabled || isLoading}
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          {...(props as HTMLMotionProps<'button'>)}
        >
          {content}
        </motion.button>
      )
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'

// ============================================
// Button Link Component (for Next.js Link)
// ============================================
export interface ButtonLinkProps {
  href: string
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
  className?: string
  children: ReactNode
  external?: boolean
}

export const ButtonLink = ({
  href,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  children,
  external = false,
}: ButtonLinkProps) => {
  const linkClasses = cn(
    baseStyles,
    variantStyles[variant],
    variant !== 'link' && sizeStyles[size],
    fullWidth && 'w-full',
    className
  )

  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <a href={href} className={linkClasses} {...externalProps}>
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </a>
  )
}
