// ============================================
// WESPA Website - Navigation Configuration
// ============================================

import { NavItem } from '@/types'

// Primary navigation - shown in main header area
export const mainNavigation: NavItem[] = [
  {
    label: 'Workspaces',
    labelHr: 'Prostori',
    href: '/workspaces',
    children: [
      { label: 'Coworking', labelHr: 'Coworking', href: '/workspaces/coworking' },
      { label: 'Meeting Rooms', labelHr: 'Sobe za sastanke', href: '/workspaces/meeting-rooms' },
      { label: 'Offices', labelHr: 'Uredi', href: '/workspaces/offices' },
      { label: 'Custom Office Zones', labelHr: 'Prilagođene zone', href: '/workspaces/custom-office-zones' },
      { label: 'Conference Rooms', labelHr: 'Konferencijske dvorane', href: '/workspaces/conference-rooms' },
    ],
  },
  {
    label: 'Events',
    labelHr: 'Događanja',
    href: '/events',
    children: [
      { label: 'Custom Special Events', labelHr: 'Posebni događaji', href: '/events/custom-special-events' },
      { label: 'Custom Business Events', labelHr: 'Poslovni događaji', href: '/events/custom-business-events' },
      { label: 'Event Spaces', labelHr: 'Prostori za događanja', href: '/events/event-spaces' },
    ],
  },
  {
    label: 'Food',
    labelHr: 'Gastronomija',
    href: '/food',
    children: [
      { label: 'Papel', labelHr: 'Papel', href: '/food/papel' },
      { label: 'Spot', labelHr: 'Spot', href: '/food/spot' },
    ],
  },
  {
    label: 'Location',
    labelHr: 'Lokacija',
    href: '/location',
    children: [
      { label: 'Business & Lounge', labelHr: 'Business & Lounge', href: '/location/business-lounge' },
      { label: 'Urban Hub', labelHr: 'Urban Hub', href: '/location/urban-hub' },
    ],
  },
  {
    label: 'Grow Your Company',
    labelHr: 'Rast tvrtke',
    href: '/grow-your-company',
  },
  {
    label: 'Community',
    labelHr: 'Zajednica',
    href: '/community',
  },
  {
    label: 'Resources',
    labelHr: 'Resursi',
    href: '/resources',
  },
]

// Secondary links - shown in footer or secondary positions
export const secondaryNavigation: NavItem[] = [
  { label: 'Contact', labelHr: 'Kontakt', href: '/contact' },
  { label: 'About', labelHr: 'O nama', href: '/about' },
]

export const footerNavigation = {
  workspaces: [
    { label: 'Coworking', labelHr: 'Coworking', href: '/workspaces/coworking' },
    { label: 'Meeting Rooms', labelHr: 'Sobe za sastanke', href: '/workspaces/meeting-rooms' },
    { label: 'Offices', labelHr: 'Uredi', href: '/workspaces/offices' },
    { label: 'Custom Office Zones', labelHr: 'Prilagođene zone', href: '/workspaces/custom-office-zones' },
    { label: 'Conference Rooms', labelHr: 'Konferencijske dvorane', href: '/workspaces/conference-rooms' },
  ],
  food: [
    { label: 'Papel', labelHr: 'Papel', href: '/food/papel' },
    { label: 'Spot', labelHr: 'Spot', href: '/food/spot' },
  ],
  events: [
    { label: 'Custom Special Events', labelHr: 'Posebni događaji', href: '/events/custom-special-events' },
    { label: 'Custom Business Events', labelHr: 'Poslovni događaji', href: '/events/custom-business-events' },
    { label: 'Event Spaces', labelHr: 'Prostori za događanja', href: '/events/event-spaces' },
  ],
  company: [
    { label: 'About WESPA', labelHr: 'O WESPA', href: '/about' },
    { label: 'Grow Your Company', labelHr: 'Rast tvrtke', href: '/grow-your-company' },
    { label: 'Community', labelHr: 'Zajednica', href: '/community' },
    { label: 'Resources', labelHr: 'Resursi', href: '/resources' },
    { label: 'Contact', labelHr: 'Kontakt', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', labelHr: 'Politika privatnosti', href: '/privacy' },
    { label: 'General Terms', labelHr: 'Uvjeti korištenja', href: '/terms' },
    { label: 'Code of Conduct & House Rules', labelHr: 'Kućni red', href: '/house-rules' },
  ],
}
