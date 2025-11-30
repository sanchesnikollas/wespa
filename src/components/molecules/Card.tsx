'use client'

// ============================================
// WESPA Website - Card Components
// Cmp/Card_Space, Cmp/Card_Feature, Cmp/Card_Testimonial, Cmp/Card_Metric
// ============================================

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/atoms/Button'
import { Tag, StatusTag } from '@/components/atoms/Tag'
import { Icon, FeatureIcon, IconName } from '@/components/atoms/Icon'
import type { Space, Feature, ClientStory, Metric, CoworkingPlan } from '@/types'

// ============================================
// Card Base Component
// ============================================
interface CardBaseProps {
  children: React.ReactNode
  className?: string
  interactive?: boolean
  as?: 'div' | 'article' | 'motion'
}

export function CardBase({
  children,
  className,
  interactive = false,
  as = 'div',
}: CardBaseProps) {
  const cardClasses = cn(
    'bg-wire-white border border-wire-200 rounded-card',
    'transition-all duration-200',
    interactive && 'cursor-pointer hover:shadow-card-hover hover:border-wire-300 hover:-translate-y-1',
    !interactive && 'shadow-card',
    className
  )

  if (as === 'motion') {
    return (
      <motion.div
        className={cardClasses}
        whileHover={interactive ? { y: -4 } : undefined}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    )
  }

  const Component = as === 'article' ? 'article' : 'div'
  return <Component className={cardClasses}>{children}</Component>
}

// ============================================
// Card Space Component (Cmp/Card_Space)
// ============================================
interface CardSpaceProps {
  space: Space
  onClick?: () => void
}

// Default images for space types
const spaceTypeImages: Record<string, string> = {
  coworking: '/images/spaces/coworking-1.jpg',
  meeting: '/images/spaces/meeting-KGD_8894-Edit.jpg',
  office: '/images/spaces/office-Copy-of-DSC_4745.jpg',
  'urban-hub': '/images/spaces/urban-hub-1.jpg',
  'business-lounge': '/images/spaces/lounge-1.jpg',
}

export function CardSpace({ space, onClick }: CardSpaceProps) {
  const imageUrl = space.images?.[0] || spaceTypeImages[space.type] || '/images/spaces/coworking-1.jpg'

  return (
    <Link href={`/spaces/${space.slug}`} className="block">
      <CardBase interactive as="article" className="overflow-hidden">
        {/* Image */}
        <div className="aspect-card bg-wire-200 relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={space.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          {/* Status badge */}
          <div className="absolute top-3 right-3">
            <StatusTag status={space.availability} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Type tag */}
          <Tag size="sm" className="mb-3">
            {space.type.replace('-', ' ')}
          </Tag>

          {/* Title */}
          <h3 className="text-heading-md font-semibold text-wire-900 mb-2">
            {space.name}
          </h3>

          {/* Short description */}
          <p className="text-body-sm text-wire-600 line-clamp-2 mb-4">
            {space.shortDescription}
          </p>

          {/* Capacity */}
          <div className="flex items-center gap-2 text-body-sm text-wire-500 mb-4">
            <Icon name="users" size="sm" />
            <span>
              {space.capacity.min === space.capacity.max
                ? `${space.capacity.max} people`
                : `${space.capacity.min}-${space.capacity.max} people`}
            </span>
          </div>

          {/* Pricing (if available) */}
          {space.pricing && (
            <div className="text-body-sm text-wire-700 mb-4">
              <span className="font-semibold">From {space.pricing.currency} {space.pricing.from}</span>
              <span className="text-wire-500">/{space.pricing.type}</span>
            </div>
          )}

          {/* CTA */}
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            onClick={onClick}
            rightIcon={<Icon name="arrow-right" size="sm" />}
          >
            View details
          </Button>
        </div>
      </CardBase>
    </Link>
  )
}

// ============================================
// Card Feature Component (Cmp/Card_Feature)
// Grid layout for features section
// ============================================
interface CardFeatureProps {
  feature: Feature
  className?: string
}

export function CardFeature({ feature, className }: CardFeatureProps) {
  return (
    <div
      className={cn(
        'p-6 border-b border-r border-wire-200',
        'last:border-r-0',
        '[&:nth-child(3n)]:border-r-0',
        '[&:nth-last-child(-n+3)]:border-b-0',
        'transition-colors hover:bg-wire-50',
        className
      )}
    >
      <FeatureIcon name={feature.icon as IconName} className="mb-4" />
      <h3 className="text-heading-sm font-semibold text-wire-900 mb-2">
        {feature.title}
      </h3>
      <p className="text-body-sm text-wire-600">
        {feature.description}
      </p>
    </div>
  )
}

// ============================================
// Card Testimonial Component (Cmp/Card_Testimonial)
// ============================================
interface CardTestimonialProps {
  story: ClientStory
  className?: string
}

export function CardTestimonial({ story, className }: CardTestimonialProps) {
  return (
    <CardBase className={cn('p-6 min-w-[320px] max-w-[400px]', className)}>
      {/* Quote icon */}
      <div className="text-wire-200 mb-4">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
        </svg>
      </div>

      {/* Testimonial text */}
      <blockquote className="text-body-md text-wire-700 mb-6 line-clamp-3">
        "{story.testimonial}"
      </blockquote>

      {/* Author info */}
      <div className="flex items-center gap-3">
        {/* Avatar placeholder */}
        <div className="w-10 h-10 rounded-full bg-wire-200 flex items-center justify-center text-wire-500 text-body-sm font-medium">
          {story.clientName.charAt(0)}
        </div>
        <div>
          <div className="text-body-sm font-medium text-wire-900">
            {story.clientName}
          </div>
          <div className="text-caption text-wire-500">
            {story.clientRole && `${story.clientRole}, `}{story.companyName}
          </div>
        </div>
      </div>
    </CardBase>
  )
}

// ============================================
// Card Metric Component (Cmp/Card_Metric)
// ============================================
interface CardMetricProps {
  metric: Metric
  className?: string
}

export function CardMetric({ metric, className }: CardMetricProps) {
  return (
    <div className={cn('text-center p-6', className)}>
      <div className="text-display-md font-bold text-wire-900 mb-1">
        {metric.value}
        {metric.suffix && <span className="text-wire-500">{metric.suffix}</span>}
      </div>
      <div className="text-body-sm text-wire-600">{metric.label}</div>
    </div>
  )
}

// ============================================
// Card Plan Component (for coworking plans)
// ============================================
interface CardPlanProps {
  plan: CoworkingPlan
  onClick?: () => void
}

export function CardPlan({ plan, onClick }: CardPlanProps) {
  return (
    <CardBase
      className={cn(
        'p-6 relative',
        plan.popular && 'ring-2 ring-wire-900'
      )}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Tag variant="solid" color="primary" size="sm">
            Most Popular
          </Tag>
        </div>
      )}

      {/* Plan name */}
      <h3 className="text-heading-lg font-semibold text-wire-900 mb-1">
        {plan.name}
      </h3>
      <p className="text-body-sm text-wire-500 mb-4">{plan.tagline}</p>

      {/* Pricing */}
      <div className="mb-6">
        <span className="text-display-sm font-bold text-wire-900">
          {plan.pricing.currency} {plan.pricing.monthly}
        </span>
        <span className="text-body-sm text-wire-500">/month</span>
      </div>

      {/* Features list */}
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-body-sm text-wire-700">
            <Icon name="check" size="sm" className="mt-0.5 text-wire-500 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        variant={plan.popular ? 'primary' : 'secondary'}
        fullWidth
        onClick={onClick}
      >
        Learn More
      </Button>
    </CardBase>
  )
}

// ============================================
// Card Location Component
// ============================================
interface CardLocationProps {
  location: {
    id: string
    name: string
    fullName: string
    address: string
    description: string
    features: string[]
    vibe: 'corporate' | 'startup' | 'mixed'
  }
  onClick?: () => void
}

export function CardLocation({ location, onClick }: CardLocationProps) {
  return (
    <CardBase interactive className="overflow-hidden">
      {/* Image placeholder */}
      <div className="aspect-video bg-wire-200 relative">
        <div className="absolute inset-0 flex items-center justify-center text-wire-400">
          <Icon name="building" size="xl" />
        </div>
        {/* Vibe badge */}
        <div className="absolute top-3 left-3">
          <Tag variant="solid" color="neutral" size="sm">
            {location.vibe === 'corporate' ? 'Corporate Vibe' : 'Startup Vibe'}
          </Tag>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-heading-lg font-semibold text-wire-900 mb-1">
          {location.fullName}
        </h3>
        <p className="text-body-sm text-wire-500 mb-4 flex items-center gap-1">
          <Icon name="map-pin" size="sm" />
          {location.address}
        </p>

        <p className="text-body-sm text-wire-600 mb-4 line-clamp-2">
          {location.description}
        </p>

        {/* Features */}
        <ul className="flex flex-wrap gap-2 mb-6">
          {location.features.slice(0, 3).map((feature, index) => (
            <li key={index}>
              <Tag variant="outline" size="sm">{feature}</Tag>
            </li>
          ))}
          {location.features.length > 3 && (
            <Tag variant="outline" size="sm">+{location.features.length - 3}</Tag>
          )}
        </ul>

        {/* CTA */}
        <Button
          variant="secondary"
          fullWidth
          onClick={onClick}
          rightIcon={<Icon name="arrow-right" size="sm" />}
        >
          Explore this location
        </Button>
      </div>
    </CardBase>
  )
}

// ============================================
// Card Article Component (for blog/ideas)
// ============================================
interface CardArticleProps {
  article: {
    id: string
    slug: string
    title: string
    excerpt: string
    category: string
    publishedAt: string
    readingTime: number
    featured?: boolean
  }
  onClick?: () => void
}

export function CardArticle({ article, onClick }: CardArticleProps) {
  return (
    <CardBase interactive as="article" className="overflow-hidden">
      {/* Image placeholder */}
      <div className={cn(
        'bg-wire-200 relative',
        article.featured ? 'aspect-video' : 'aspect-card'
      )}>
        <div className="absolute inset-0 flex items-center justify-center text-wire-400">
          <Icon name="briefcase" size="xl" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category & reading time */}
        <div className="flex items-center justify-between mb-3">
          <Tag size="sm">{article.category}</Tag>
          <span className="text-caption text-wire-500">{article.readingTime} min read</span>
        </div>

        {/* Title */}
        <h3 className="text-heading-md font-semibold text-wire-900 mb-2 line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-body-sm text-wire-600 line-clamp-2 mb-4">
          {article.excerpt}
        </p>

        {/* Read more link */}
        <button
          onClick={onClick}
          className="inline-flex items-center gap-1 text-body-sm font-medium text-wire-700 hover:text-wire-900 transition-colors"
        >
          Read on
          <Icon name="arrow-right" size="sm" />
        </button>
      </div>
    </CardBase>
  )
}

// ============================================
// Card Event Type Component (for Stage page)
// ============================================
interface CardEventTypeProps {
  eventType: {
    id: string
    name: string
    description: string
    capacity: { min: number; max: number }
    icon: IconName
  }
  onClick?: () => void
}

export function CardEventType({ eventType, onClick }: CardEventTypeProps) {
  return (
    <CardBase interactive className="p-6">
      {/* Icon */}
      <FeatureIcon name={eventType.icon} className="mb-4" />

      {/* Title */}
      <h3 className="text-heading-md font-semibold text-wire-900 mb-2">
        {eventType.name}
      </h3>

      {/* Description */}
      <p className="text-body-sm text-wire-600 mb-4">
        {eventType.description}
      </p>

      {/* Capacity */}
      <div className="flex items-center gap-2 text-body-sm text-wire-500 mb-4">
        <Icon name="users" size="sm" />
        <span>{eventType.capacity.min}-{eventType.capacity.max} guests</span>
      </div>

      {/* CTA */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClick}
        rightIcon={<Icon name="arrow-right" size="sm" />}
        className="px-0"
      >
        Learn more
      </Button>
    </CardBase>
  )
}
