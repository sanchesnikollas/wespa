import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * WESPA Brand Icon Catalog
 * Maps semantic names to icon files.
 * Paths are relative to /public/images/ — accepts both "icones/xxx" (legacy Artboards)
 * and "wespa-icons/xxx" (official icons from wespa.hr).
 */
export const WESPA_ICONS = {
  // Core Actions (legacy brand Artboards)
  check: 'icones/Artboard 1@3x.png',
  'document-stack': 'icones/Artboard 2@3x.png',
  verified: 'icones/Artboard 3@3x.png',

  // Spaces
  'private-office': 'icones/Artboard 4@3x.png',
  door: 'icones/Artboard 13@3x.png',

  // Services
  hospitality: 'icones/Artboard 5@3x.png',
  concierge: 'icones/Artboard 5@3x.png',
  phone: 'icones/Artboard 6@3x.png',
  contact: 'icones/Artboard 6@3x.png',

  // Location & Navigation
  location: 'icones/Artboard 7@3x.png',
  pin: 'icones/Artboard 7@3x.png',

  // Documents & Business
  document: 'icones/Artboard 8@3x.png',
  contract: 'icones/Artboard 8@3x.png',

  // Events & Stage
  stage: 'icones/Artboard 9@3x.png',
  events: 'icones/Artboard 9@3x.png',
  auditorium: 'icones/Artboard 9@3x.png',

  // Design & Architecture
  design: 'icones/Artboard 10@3x.png',
  architecture: 'icones/Artboard 10@3x.png',
  ruler: 'icones/Artboard 10@3x.png',

  // Features
  flexibility: 'icones/Artboard 11@3x.png',
  balance: 'icones/Artboard 11@3x.png',

  // Technology
  wifi: 'icones/Artboard 12@3x.png',
  connectivity: 'icones/Artboard 12@3x.png',

  // Amenities
  printer: 'icones/Artboard 16@3x.png',
  amenities: 'icones/Artboard 16@3x.png',

  // Meeting & Presentation
  meeting: 'icones/Artboard 20@3x.png',
  presentation: 'icones/Artboard 20@3x.png',
  screen: 'icones/Artboard 20@3x.png',

  // Decorative dots
  'dot-single': 'icones/Artboard 14@3x.png',
  'dot-double': 'icones/Artboard 15@3x.png',
  'dot-full': 'icones/Artboard 17@3x.png',
  'dot-colon': 'icones/Artboard 18@3x.png',
  'dot-notch': 'icones/Artboard 19@3x.png',

  // Official wespa.hr literal icons (from the live site)
  'parking': 'wespa-icons/parking.png',
  'pet-friendly': 'wespa-icons/dog-friendly.png',
  'ergonomic-chair': 'wespa-icons/office-chair.png',
  'lounge-chair': 'wespa-icons/lounge.png',
  'cigar-lounge': 'wespa-icons/tobacco.png',
  'meditation': 'wespa-icons/relax-area.png',
  'food-tray': 'wespa-icons/tray.png',
  'vending-machine': 'wespa-icons/vending-machine.png',
  'phone-booth': 'wespa-icons/phone-booth.png',
  'conference-podium': 'wespa-icons/conference-1.png',
  'meeting-table': 'wespa-icons/meeting-rooms.png',
  'one-price': 'wespa-icons/one-price.png',
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
      src={`/images/${iconFile}`}
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
        src={`/images/${iconFile}`}
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
