'use client'

// ============================================
// WESPA Website - Footer Component
// Cmp/Footer - Global footer with navigation, contact, newsletter
// ============================================

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Icon, IconName } from '@/components/atoms/Icon'
import { NewsletterForm } from '@/components/molecules/Form'
import { footerNavigation } from '@/config/navigation'
import { siteConfig, locations } from '@/config/site'
import { useLanguage } from '@/contexts/LanguageContext'

// ============================================
// Footer Link Column
// ============================================
interface FooterColumnProps {
  title: string
  links: { label: string; href: string }[]
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-body-sm font-semibold text-stone-900 mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-body-sm text-stone-600 hover:text-stone-900 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ============================================
// Contact Info Block
// ============================================
function ContactInfo() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-body-sm font-semibold text-stone-900 mb-4">
          {t('footer.contact.sales')}
        </h3>
        <div className="space-y-2">
          <a
            href={`tel:${siteConfig.contact.sales.phone}`}
            className="flex items-center gap-2 text-body-sm text-stone-600 hover:text-stone-900 transition-colors"
          >
            <Icon name="phone" size="sm" />
            {siteConfig.contact.sales.phone}
          </a>
          <a
            href={`mailto:${siteConfig.contact.sales.email}`}
            className="flex items-center gap-2 text-body-sm text-stone-600 hover:text-stone-900 transition-colors"
          >
            <Icon name="mail" size="sm" />
            {siteConfig.contact.sales.email}
          </a>
        </div>
      </div>

      <div>
        <h3 className="text-body-sm font-semibold text-stone-900 mb-4">
          {t('footer.contact.events')}
        </h3>
        <div className="space-y-2">
          <a
            href={`tel:${siteConfig.contact.events.phone}`}
            className="flex items-center gap-2 text-body-sm text-stone-600 hover:text-stone-900 transition-colors"
          >
            <Icon name="phone" size="sm" />
            {siteConfig.contact.events.phone}
          </a>
          <a
            href={`mailto:${siteConfig.contact.events.email}`}
            className="flex items-center gap-2 text-body-sm text-stone-600 hover:text-stone-900 transition-colors"
          >
            <Icon name="mail" size="sm" />
            {siteConfig.contact.events.email}
          </a>
        </div>
      </div>
    </div>
  )
}

// ============================================
// Location Info Block
// ============================================
function LocationsInfo() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <h3 className="text-body-sm font-semibold text-stone-900 mb-4">
        {t('footer.locations')}
      </h3>
      {locations.map((location) => (
        <div key={location.id} className="space-y-1">
          <p className="text-body-sm font-medium text-stone-800">{location.fullName}</p>
          <p className="text-body-sm text-stone-600">{location.address}</p>
          <p className="text-body-sm text-stone-600">
            {location.postalCode} {location.city}
          </p>
        </div>
      ))}
    </div>
  )
}

// ============================================
// Social Links
// ============================================
function SocialLinks() {
  const socialIcons: { name: IconName; href: string; label: string }[] = [
    { name: 'linkedin', href: siteConfig.social.linkedin, label: 'LinkedIn' },
    { name: 'instagram', href: siteConfig.social.instagram, label: 'Instagram' },
    { name: 'facebook', href: siteConfig.social.facebook, label: 'Facebook' },
  ]

  return (
    <div className="flex items-center gap-4">
      {socialIcons.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-stone-500 hover:text-stone-900 transition-colors"
          aria-label={social.label}
        >
          <Icon name={social.name} size="md" />
        </a>
      ))}
    </div>
  )
}

// ============================================
// Footer Component (Single, unified footer)
// ============================================
export function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  return (
    <footer className="bg-stone-50 border-t border-stone-200">
      {/* Newsletter Section */}
      <div className="container-wespa py-12 border-b border-stone-200">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-heading-lg font-serif font-semibold text-stone-900 mb-2">
            {t('footer.newsletter.title')}
          </h2>
          <p className="text-body-md text-stone-600 mb-6">
            {t('footer.newsletter.subtitle')}
          </p>
          <NewsletterForm />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-wespa py-12 lg:py-16">
        <div className="grid gap-8 lg:gap-12 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="block mb-6">
              <div className="relative w-40 h-10">
                <Image
                  src="/images/logo/logo-cinza.svg"
                  alt="WESPA"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-body-sm text-stone-600 mb-6 max-w-xs">
              {siteConfig.tagline}
              <br />
              {siteConfig.description}
            </p>
            <SocialLinks />
          </div>

          {/* Navigation columns */}
          <FooterColumn title={t('footer.sections.spaces')} links={footerNavigation.spaces} />
          <FooterColumn title={t('footer.sections.hospitality')} links={footerNavigation.hospitality} />
          <FooterColumn title={t('footer.sections.stage')} links={footerNavigation.stage} />
          <FooterColumn title={t('footer.sections.company')} links={footerNavigation.company} />
        </div>

        {/* Contact and Locations Row */}
        <div className="grid gap-8 lg:gap-12 sm:grid-cols-2 lg:grid-cols-4 mt-12 pt-12 border-t border-stone-200">
          <ContactInfo />
          <LocationsInfo />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-200">
        <div className="container-wespa py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-caption text-stone-500">
              &copy; {currentYear} WESPA. {t('footer.copyright')}
            </p>

            {/* Legal links */}
            <nav className="flex flex-wrap items-center gap-4 text-caption">
              {footerNavigation.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-stone-500 hover:text-stone-700 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
