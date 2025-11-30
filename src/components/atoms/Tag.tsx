'use client'

// ============================================
// WESPA Website - Tag Component
// Cmp/Tag
// ============================================

import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// ============================================
// Types
// ============================================
export type TagVariant = 'default' | 'outline' | 'solid'
export type TagColor = 'neutral' | 'primary' | 'success' | 'warning' | 'error'
export type TagSize = 'sm' | 'md'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant
  color?: TagColor
  size?: TagSize
  icon?: React.ReactNode
  removable?: boolean
  onRemove?: () => void
}

// ============================================
// Styles
// ============================================
const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full'

const sizeStyles: Record<TagSize, string> = {
  sm: 'px-2.5 py-0.5 text-caption',
  md: 'px-3 py-1 text-body-sm',
}

const variantColorStyles: Record<TagVariant, Record<TagColor, string>> = {
  default: {
    neutral: 'bg-wire-100 text-wire-700',
    primary: 'bg-wire-200 text-wire-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    error: 'bg-red-100 text-red-800',
  },
  outline: {
    neutral: 'bg-transparent border border-wire-300 text-wire-700',
    primary: 'bg-transparent border border-wire-400 text-wire-800',
    success: 'bg-transparent border border-green-400 text-green-700',
    warning: 'bg-transparent border border-amber-400 text-amber-700',
    error: 'bg-transparent border border-red-400 text-red-700',
  },
  solid: {
    neutral: 'bg-wire-800 text-wire-white',
    primary: 'bg-wire-900 text-wire-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-amber-500 text-white',
    error: 'bg-red-600 text-white',
  },
}

// ============================================
// Remove Button
// ============================================
const RemoveButton = ({ onClick }: { onClick?: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="ml-1 -mr-1 p-0.5 rounded-full hover:bg-black/10 transition-colors"
    aria-label="Remove tag"
  >
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 3L3 9M3 3L9 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
)

// ============================================
// Component
// ============================================
export function Tag({
  className,
  variant = 'default',
  color = 'neutral',
  size = 'md',
  icon,
  removable = false,
  onRemove,
  children,
  ...props
}: TagProps) {
  return (
    <span
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantColorStyles[variant][color],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {removable && <RemoveButton onClick={onRemove} />}
    </span>
  )
}

// ============================================
// Status Tag (for availability)
// ============================================
export type StatusType = 'available' | 'limited' | 'unavailable'

const statusConfig: Record<StatusType, { label: string; color: TagColor }> = {
  available: { label: 'Available', color: 'success' },
  limited: { label: 'Limited', color: 'warning' },
  unavailable: { label: 'Unavailable', color: 'error' },
}

export interface StatusTagProps {
  status: StatusType
  size?: TagSize
  className?: string
}

export function StatusTag({ status, size = 'sm', className }: StatusTagProps) {
  const config = statusConfig[status]

  return (
    <Tag
      variant="default"
      color={config.color}
      size={size}
      className={className}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full',
          status === 'available' && 'bg-green-500',
          status === 'limited' && 'bg-amber-500',
          status === 'unavailable' && 'bg-red-500'
        )}
      />
      {config.label}
    </Tag>
  )
}

// ============================================
// Category Tag (for articles/events)
// ============================================
export interface CategoryTagProps {
  category: string
  href?: string
  size?: TagSize
  className?: string
}

export function CategoryTag({ category, href, size = 'sm', className }: CategoryTagProps) {
  const tagContent = (
    <Tag variant="outline" color="neutral" size={size} className={className}>
      {category}
    </Tag>
  )

  if (href) {
    return (
      <a href={href} className="hover:opacity-80 transition-opacity">
        {tagContent}
      </a>
    )
  }

  return tagContent
}
