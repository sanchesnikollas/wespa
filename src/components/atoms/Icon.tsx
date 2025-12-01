'use client'

// ============================================
// WESPA Website - Icon Component
// Using Lucide React for modern icons
// ============================================

import { cn } from '@/lib/utils'
import {
  Package,
  Coffee,
  Heart,
  Users,
  Star,
  Monitor,
  Building,
  Building2,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Menu,
  Search,
  Clock,
  Wifi,
  Printer,
  Briefcase,
  Home,
  Utensils,
  Mic,
  Play,
  Download,
  ExternalLink,
  Linkedin,
  Instagram,
  Facebook,
  Globe,
  Lock,
  User,
  Eye,
  EyeOff,
  FileText,
  File,
  Folder,
  Lightbulb,
  Twitter,
  Calculator,
  TrendingUp,
  CheckSquare,
  Rocket,
  Link,
  BookOpen,
  Award,
  ClipboardList,
  Camera,
  Music,
  Car,
  Wine,
  Gift,
  Image,
  type LucideIcon,
} from 'lucide-react'

// ============================================
// Types
// ============================================
export type IconName =
  | 'package'
  | 'coffee'
  | 'heart'
  | 'users'
  | 'star'
  | 'monitor'
  | 'building'
  | 'calendar'
  | 'map-pin'
  | 'phone'
  | 'mail'
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up'
  | 'arrow-down'
  | 'chevron-right'
  | 'chevron-left'
  | 'chevron-down'
  | 'chevron-up'
  | 'check'
  | 'x'
  | 'menu'
  | 'search'
  | 'clock'
  | 'wifi'
  | 'printer'
  | 'briefcase'
  | 'home'
  | 'utensils'
  | 'mic'
  | 'play'
  | 'download'
  | 'external-link'
  | 'linkedin'
  | 'instagram'
  | 'facebook'
  | 'globe'
  | 'lock'
  | 'user'
  | 'eye'
  | 'eye-off'
  | 'file-text'
  | 'file'
  | 'folder'
  | 'lightbulb'
  | 'twitter'
  | 'calculator'
  | 'trending-up'
  | 'check-square'
  | 'rocket'
  | 'link'
  | 'book-open'
  | 'award'
  | 'clipboard-list'
  | 'camera'
  | 'music'
  | 'car'
  | 'wine'
  | 'gift'
  | 'image'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface IconProps {
  name: IconName
  size?: IconSize
  className?: string
  strokeWidth?: number
}

// ============================================
// Size Configuration
// ============================================
const sizeConfig: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
}

// ============================================
// Icon Map - Lucide React components
// ============================================
const iconMap: Record<IconName, LucideIcon> = {
  package: Package,
  coffee: Coffee,
  heart: Heart,
  users: Users,
  star: Star,
  monitor: Monitor,
  building: Building2,
  calendar: Calendar,
  'map-pin': MapPin,
  phone: Phone,
  mail: Mail,
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  check: Check,
  x: X,
  menu: Menu,
  search: Search,
  clock: Clock,
  wifi: Wifi,
  printer: Printer,
  briefcase: Briefcase,
  home: Home,
  utensils: Utensils,
  mic: Mic,
  play: Play,
  download: Download,
  'external-link': ExternalLink,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  globe: Globe,
  lock: Lock,
  user: User,
  eye: Eye,
  'eye-off': EyeOff,
  'file-text': FileText,
  file: File,
  folder: Folder,
  lightbulb: Lightbulb,
  twitter: Twitter,
  calculator: Calculator,
  'trending-up': TrendingUp,
  'check-square': CheckSquare,
  rocket: Rocket,
  link: Link,
  'book-open': BookOpen,
  award: Award,
  'clipboard-list': ClipboardList,
  camera: Camera,
  music: Music,
  car: Car,
  wine: Wine,
  gift: Gift,
  image: Image,
}

// ============================================
// Component
// ============================================
export function Icon({
  name,
  size = 'md',
  className,
  strokeWidth = 2,
}: IconProps) {
  const LucideIcon = iconMap[name]
  const dimension = sizeConfig[size]

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  return (
    <LucideIcon
      size={dimension}
      strokeWidth={strokeWidth}
      className={cn('shrink-0', className)}
      aria-hidden="true"
    />
  )
}

// ============================================
// Feature Icon (larger with background)
// ============================================
export interface FeatureIconProps {
  name: IconName
  className?: string
}

export function FeatureIcon({ name, className }: FeatureIconProps) {
  return (
    <div
      className={cn(
        'w-12 h-12 flex items-center justify-center',
        'bg-stone-100 rounded-lg',
        className
      )}
    >
      <Icon name={name} size="lg" className="text-stone-700" />
    </div>
  )
}
