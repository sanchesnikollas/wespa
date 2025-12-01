import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * WESPA Brand Icon Catalog
 * Maps semantic names to icon files
 */
export const WESPA_ICONS = {
  // Core Actions
  check: 'Artboard 1@3x.png',
  'document-stack': 'Artboard 2@3x.png',
  verified: 'Artboard 3@3x.png',

  // Spaces
  'private-office': 'Artboard 4@3x.png',
  door: 'Artboard 13@3x.png',

  // Services
  hospitality: 'Artboard 5@3x.png',
  concierge: 'Artboard 5@3x.png',
  phone: 'Artboard 6@3x.png',
  contact: 'Artboard 6@3x.png',

  // Location & Navigation
  location: 'Artboard 7@3x.png',
  pin: 'Artboard 7@3x.png',

  // Documents & Business
  document: 'Artboard 8@3x.png',
  contract: 'Artboard 8@3x.png',

  // Events & Stage
  stage: 'Artboard 9@3x.png',
  events: 'Artboard 9@3x.png',
  auditorium: 'Artboard 9@3x.png',

  // Design & Architecture
  design: 'Artboard 10@3x.png',
  architecture: 'Artboard 10@3x.png',
  ruler: 'Artboard 10@3x.png',

  // Features
  flexibility: 'Artboard 11@3x.png',
  balance: 'Artboard 11@3x.png',

  // Technology
  wifi: 'Artboard 12@3x.png',
  connectivity: 'Artboard 12@3x.png',

  // Amenities
  printer: 'Artboard 16@3x.png',
  amenities: 'Artboard 16@3x.png',

  // Meeting & Presentation
  meeting: 'Artboard 20@3x.png',
  presentation: 'Artboard 20@3x.png',
  screen: 'Artboard 20@3x.png',

  // Decorative dots
  'dot-single': 'Artboard 14@3x.png',
  'dot-double': 'Artboard 15@3x.png',
  'dot-full': 'Artboard 17@3x.png',
  'dot-colon': 'Artboard 18@3x.png',
  'dot-notch': 'Artboard 19@3x.png',
} as const

export type WespaIconName = keyof typeof WESPA_ICONS

interface WespaIconProps {
  name: WespaIconName
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
  alt?: string
}

// Icon sizes for standalone use
const sizeMap = {
  xxs: 16,
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 80,
  '2xl': 120,
}

// Container sizes for circle variants
const containerSizeMap = {
  xxs: 24,
  xs: 32,
  sm: 72,
  md: 100,
  lg: 140,
  xl: 180,
  '2xl': 220,
}

// Icon sizes inside circles (should fill ~55-60% of container for visual balance)
const iconInCircleSizeMap = {
  xxs: 14,
  xs: 18,
  sm: 42,
  md: 56,
  lg: 80,
  xl: 100,
  '2xl': 128,
}

export function WespaIcon({
  name,
  size = 'md',
  className,
  alt
}: WespaIconProps) {
  const iconFile = WESPA_ICONS[name]
  const pixelSize = sizeMap[size]

  return (
    <Image
      src={`/images/icones/${iconFile}`}
      alt={alt || name}
      width={pixelSize}
      height={pixelSize}
      className={cn('object-contain', className)}
    />
  )
}

/**
 * Icon with background circle container
 */
interface WespaIconCircleProps extends WespaIconProps {
  variant?: 'light' | 'dark' | 'outline' | 'brand' | 'brand-solid'
}

export function WespaIconCircle({
  name,
  size = 'md',
  variant = 'light',
  className,
  alt
}: WespaIconCircleProps) {
  const iconFile = WESPA_ICONS[name]
  const containerSize = containerSizeMap[size]
  const iconSize = iconInCircleSizeMap[size]

  const variantStyles = {
    light: 'bg-stone-100',
    dark: 'bg-stone-900',
    outline: 'bg-transparent border-2 border-stone-200',
    brand: 'bg-[#ef4136]/10',
    'brand-solid': 'bg-[#ef4136]',
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full shrink-0',
        variantStyles[variant],
        className
      )}
      style={{ width: containerSize, height: containerSize }}
    >
      <Image
        src={`/images/icones/${iconFile}`}
        alt={alt || name}
        width={iconSize}
        height={iconSize}
        className="object-contain"
      />
    </div>
  )
}

/**
 * Feature card with icon
 */
interface FeatureWithIconProps {
  icon: WespaIconName
  title: string
  description: string
  className?: string
}

export function FeatureWithIcon({
  icon,
  title,
  description,
  className
}: FeatureWithIconProps) {
  return (
    <div className={cn('text-center p-8', className)}>
      <div className="flex justify-center mb-6">
        <WespaIconCircle name={icon} size="lg" variant="light" />
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-stone-600">{description}</p>
    </div>
  )
}
