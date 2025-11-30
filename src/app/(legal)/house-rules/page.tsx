// ============================================
// WESPA Website - House Rules Page
// ============================================

import { Metadata } from 'next'
import { Icon, IconName } from '@/components/atoms/Icon'

export const metadata: Metadata = {
  title: 'House Rules',
  description: 'WESPA House Rules - Guidelines for a productive and respectful workspace environment.',
}

interface RuleCardProps {
  icon: IconName
  title: string
  description: string
}

function RuleCard({ icon, title, description }: RuleCardProps) {
  return (
    <div className="flex gap-4 p-6 bg-stone-50 rounded-2xl">
      <div className="w-12 h-12 rounded-xl bg-stone-900 flex items-center justify-center shrink-0">
        <Icon name={icon} size="md" className="text-white" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-stone-900 mb-2">{title}</h3>
        <p className="text-stone-600">{description}</p>
      </div>
    </div>
  )
}

export default function HouseRulesPage() {
  const rules: RuleCardProps[] = [
    {
      icon: 'users',
      title: 'Respect Others',
      description: 'Treat all members, staff, and guests with courtesy and respect. WESPA is a professional environment where everyone deserves to feel welcome.',
    },
    {
      icon: 'phone',
      title: 'Phone Calls',
      description: 'Please take phone calls in designated phone booths or quiet areas. Keep conversations brief in shared spaces and use headphones for video calls.',
    },
    {
      icon: 'monitor',
      title: 'Clean Desk Policy',
      description: 'Clear your workspace at the end of each day. Hot desk users must remove all personal items. Dedicated desk users should keep their area tidy.',
    },
    {
      icon: 'coffee',
      title: 'Kitchen Etiquette',
      description: 'Clean up after yourself in kitchen areas. Label your food in the fridge. Dispose of expired items weekly. Wash your dishes immediately.',
    },
    {
      icon: 'wifi',
      title: 'Network Usage',
      description: 'Use the WiFi responsibly. Avoid downloading large files during peak hours. Do not share network passwords with non-members.',
    },
    {
      icon: 'calendar',
      title: 'Meeting Rooms',
      description: 'Book meeting rooms in advance through the app. End meetings on time. Leave the room clean and reset equipment for the next user.',
    },
    {
      icon: 'lock',
      title: 'Security',
      description: 'Always close doors behind you. Do not share your access card or code. Report any suspicious activity to staff immediately.',
    },
    {
      icon: 'printer',
      title: 'Printing',
      description: 'Print responsibly and collect your documents promptly. Use duplex printing when possible. Report printer issues to reception.',
    },
  ]

  return (
    <div className="py-20 lg:py-32">
      <div className="container-wespa">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 mb-6">
              House Rules
            </h1>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              To ensure a productive and enjoyable experience for all members, please follow these guidelines.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {rules.map((rule, index) => (
              <RuleCard key={index} {...rule} />
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-stone-900 mb-4">
              Operating Hours
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-stone-900 mb-2">WESPA Business</h3>
                <ul className="text-stone-600 space-y-1">
                  <li>Monday - Friday: 7:00 - 22:00</li>
                  <li>Saturday: 8:00 - 18:00</li>
                  <li>Sunday: Closed</li>
                  <li className="text-sm text-stone-500 mt-2">* OwnDesk & OfficeDesk members have 24/7 access</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-stone-900 mb-2">WESPA Lounge</h3>
                <ul className="text-stone-600 space-y-1">
                  <li>Monday - Friday: 8:00 - 20:00</li>
                  <li>Saturday: 9:00 - 17:00</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-stone-600">
              Questions about our house rules? Contact our team at{' '}
              <a href="mailto:info@wespa.hr" className="text-stone-900 hover:text-wespa-red">
                info@wespa.hr
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
