// ============================================
// WESPA — Feedback Implementation Report (data)
// Source of truth: review widget comments (Gabi, round May/2026)
// Snapshot: docs/review/2026-05-21-feedback-gabi.md
// Cross-checked live against production on 2026-06-18 (63/63 applied)
// Bilingual: English (en) + Croatian (hr)
// ============================================

export type Lang = 'en' | 'hr'
export type ChangeKind = 'change' | 'remove' | 'add' | 'text'

export interface ReviewItem {
  n: number
  /** Where on the page the comment was pinned (English key; HR via WHERE_HR) */
  where: string
  kind: ChangeKind
  before?: string
  after?: string
}

export interface ReviewPage {
  path: string
  label: string
  items: ReviewItem[]
}

export const GENERATED_AT = 'June 18, 2026'
export const TOTAL = 63

// ============================================
// UI strings
// ============================================
export const ui: Record<Lang, {
  roundLabel: string
  heroTitle1: string
  heroTitle2: string
  heroSubtitle: string
  statImplemented: string
  statPages: string
  statLive: string
  jump: string
  comment: string
  comments: string
  viewLive: string
  quotesNote: string
  confirmTitle: string
  confirmSubtitle: string
  earlierTitle: string
  earlierSubtitle: string
  footerNote: string
  refreshTip: string
  goToSite: string
  kindChange: string
  kindRemove: string
  kindAdd: string
  kindText: string
  implemented: string
}> = {
  en: {
    roundLabel: 'Review round — May 2026',
    heroTitle1: 'Every comment,',
    heroTitle2: 'implemented.',
    heroSubtitle:
      'A transparent record of all your review feedback and exactly how each item was applied to the live website. Every change below is already published — open any page to see it in context.',
    statImplemented: 'Comments implemented',
    statPages: 'Pages updated',
    statLive: 'Live in production',
    jump: 'Jump to page',
    comment: 'comment',
    comments: 'comments',
    viewLive: 'View live page',
    quotesNote: 'Examples are shown in the site’s English copy.',
    confirmTitle: 'A few items we interpreted',
    confirmSubtitle:
      'These were applied with a small judgement call where the comment was open to interpretation. All are easily reversible — just let us know.',
    earlierTitle: 'Earlier rounds, also shipped',
    earlierSubtitle:
      'The 63 comments above are the most recent round. For the full picture, here is everything else delivered over the previous weeks.',
    footerNote: 'Report generated June 18, 2026 · cross-checked against the live site.',
    refreshTip: 'Tip: if a change doesn’t appear for you, refresh the page with Cmd/Ctrl + Shift + R.',
    goToSite: 'Go to wespa.gigwand.com',
    kindChange: 'Changed',
    kindRemove: 'Removed',
    kindAdd: 'Added',
    kindText: 'Updated',
    implemented: 'Implemented',
  },
  hr: {
    roundLabel: 'Krug pregleda — svibanj 2026.',
    heroTitle1: 'Svaki komentar,',
    heroTitle2: 'primijenjen.',
    heroSubtitle:
      'Transparentan pregled svih vaših komentara i točno kako je svaka stavka primijenjena na živoj stranici. Sve izmjene u nastavku već su objavljene — otvorite bilo koju stranicu da ih vidite u kontekstu.',
    statImplemented: 'Primijenjenih komentara',
    statPages: 'Ažuriranih stranica',
    statLive: 'Uživo u produkciji',
    jump: 'Skoči na stranicu',
    comment: 'komentar',
    comments: 'komentara',
    viewLive: 'Pogledaj stranicu uživo',
    quotesNote: 'Primjeri su prikazani u engleskoj verziji stranice.',
    confirmTitle: 'Nekoliko stavki koje smo protumačili',
    confirmSubtitle:
      'Ove su primijenjene uz malu prosudbu ondje gdje je komentar bio otvoren za tumačenje. Sve se lako mogu vratiti — samo nam javite.',
    earlierTitle: 'Raniji krugovi, također isporučeni',
    earlierSubtitle:
      '63 komentara iznad čine najnoviji krug. Za potpunu sliku, ovdje je sve ostalo isporučeno tijekom prethodnih tjedana.',
    footerNote: 'Izvještaj generiran 18. lipnja 2026. · provjereno na živoj stranici.',
    refreshTip: 'Savjet: ako se izmjena ne prikazuje, osvježite stranicu s Cmd/Ctrl + Shift + R.',
    goToSite: 'Idi na wespa.gigwand.com',
    kindChange: 'Promijenjeno',
    kindRemove: 'Uklonjeno',
    kindAdd: 'Dodano',
    kindText: 'Ažurirano',
    implemented: 'Primijenjeno',
  },
}

// ============================================
// "where" label translations (EN key -> HR)
// ============================================
export const WHERE_HR: Record<string, string> = {
  'Newsletter block ("Subscribe to our Newsletter…")': 'Newsletter blok',
  'Newsletter sign-up paragraph': 'Newsletter odlomak',
  'Events section title': 'Naslov sekcije događaja',
  'Member Spotlight subtitle': 'Podnaslov “Member Spotlight”',
  'Industry Trends subtitle': 'Podnaslov “Industry Trends”',
  'WESPA News subtitle': 'Podnaslov “WESPA News”',
  'Membership paragraph': 'Odlomak o članstvu',
  'Section label': 'Oznaka sekcije',
  'Benefit title': 'Naslov pogodnosti',
  'CTA title': 'CTA naslov',
  'CTA button': 'CTA gumb',
  'Pricing period': 'Razdoblje cijene',
  'FlyDesk price': 'FlyDesk cijena',
  'FlyDesk + Lunch price': 'FlyDesk + Lunch cijena',
  'OwnDesk price': 'OwnDesk cijena',
  'OfficeDesk price': 'OfficeDesk cijena',
  '"Most Popular" badge': 'Oznaka “Most Popular”',
  'OfficeDesk feature': 'OfficeDesk značajka',
  'Hero title': 'Naslov hero sekcije',
  'Duplicate about title': 'Duplicirani naslov',
  'Address': 'Adresa',
  'Below the address': 'Ispod adrese',
  'Section title': 'Naslov sekcije',
  'Feature title': 'Naslov značajke',
  'Hero (had no CTA)': 'Hero (bez CTA-a)',
  'Below the section title': 'Ispod naslova sekcije',
  'Service title': 'Naslov usluge',
  'Hero subtitle': 'Hero podnaslov',
  'Intro paragraph': 'Uvodni odlomak',
  'Description': 'Opis',
  'Venue group title': 'Naslov grupe prostora',
  'SHIFT room description (110m²)': 'Opis SHIFT dvorane (110 m²)',
  'Price': 'Cijena',
  'Food & Drink section': 'Sekcija “Food & Drink”',
  'The SPOT Experience': 'Sekcija “The SPOT Experience”',
  '"The SPOT Standard" section': 'Sekcija “The SPOT Standard”',
  'Find Us address': 'Adresa u “Find Us”',
  'Above the intro paragraph': 'Iznad uvodnog odlomka',
  'Below the title': 'Ispod naslova',
}

export function whereLabel(where: string, lang: Lang): string {
  if (lang === 'hr') return WHERE_HR[where] ?? where
  return where
}

// ============================================
// The 63 review-widget comments, grouped by page
// ============================================
export const reviewPages: ReviewPage[] = [
  {
    path: '/community',
    label: 'Community',
    items: [
      { n: 1, where: 'Newsletter block ("Subscribe to our Newsletter…")', kind: 'remove', before: 'Newsletter subscription section' },
      { n: 2, where: 'Newsletter sign-up paragraph', kind: 'remove', before: '“Sign up for the WESPA newsletter and get community updates…”' },
      { n: 3, where: 'Events section title', kind: 'change', before: 'Events That Connect', after: 'Events that Connect' },
      { n: 4, where: 'Member Spotlight subtitle', kind: 'remove', before: '“Founders and creators building from inside WESPA.”' },
      { n: 5, where: 'Industry Trends subtitle', kind: 'remove', before: '“Macro signals shaping the work and life economy.”' },
      { n: 6, where: 'WESPA News subtitle', kind: 'remove', before: '“Updates, openings, and behind-the-scenes from our spaces.”' },
      { n: 7, where: 'Membership paragraph', kind: 'remove', before: '“Community members get the opportunity to be featured as guests…”' },
      { n: 8, where: 'Section label', kind: 'remove', before: '“WESPA Community Membership.”' },
      { n: 9, where: 'Benefit title', kind: 'change', before: '24/7 Access', after: '24/7 Space Access' },
      { n: 10, where: 'CTA title', kind: 'change', before: 'Become a Member', after: 'Become a Community Member' },
      { n: 11, where: 'CTA button', kind: 'change', before: 'Get in Touch', after: 'Become a Member' },
    ],
  },
  {
    path: '/workspaces/coworking',
    label: 'Coworking',
    items: [
      { n: 12, where: 'Pricing period', kind: 'remove', before: '“/day”' },
      { n: 13, where: 'FlyDesk price', kind: 'change', before: '€30', after: '€30.00' },
      { n: 14, where: 'FlyDesk + Lunch price', kind: 'change', before: '€35/day + VAT', after: '€35.00 + VAT' },
      { n: 15, where: 'OwnDesk price', kind: 'change', before: '€219/month + VAT', after: '€219.00 + VAT' },
      { n: 16, where: '"Most Popular" badge', kind: 'remove', before: 'Most Popular' },
      { n: 17, where: 'OfficeDesk price', kind: 'change', before: '€226/month + VAT', after: '€226.00 + VAT' },
      { n: 18, where: 'OfficeDesk feature', kind: 'remove', before: '“Private office (2-6 people)”' },
      { n: 19, where: 'CTA button', kind: 'change', before: 'Get Started', after: 'Book Your Desk' },
      { n: 20, where: 'CTA button', kind: 'change', before: 'Get Started', after: 'Book Your Desk' },
      { n: 21, where: 'CTA button', kind: 'change', before: 'Get Started', after: 'Book Your Desk' },
      { n: 22, where: 'CTA button', kind: 'change', before: 'Get Started', after: 'Book Your Desk' },
    ],
  },
  {
    path: '/location/business-lounge',
    label: 'Business & Lounge',
    items: [
      { n: 23, where: 'Hero title', kind: 'change', before: 'The Premium WESPA Experience', after: 'A Premium Address for Your Success: WESPA Business & Lounge' },
      { n: 24, where: 'Duplicate about title', kind: 'remove', before: '“A Premium Address for Your Success…” (duplicate removed)' },
      { n: 25, where: 'Address', kind: 'change', before: 'Radnička cesta 50, Zagreb', after: 'Radnička cesta 50, 10000 Zagreb, Croatia' },
      { n: 26, where: 'Below the address', kind: 'add', after: 'Reception: +385 95 340 0984' },
      { n: 27, where: 'Section title', kind: 'change', before: "What's at Business & Lounge", after: 'What Green Gold Offers' },
      { n: 28, where: 'Feature title', kind: 'change', before: 'Private Workspaces', after: 'Exclusive Offices' },
      { n: 29, where: 'CTA button', kind: 'change', before: 'Book a Tour', after: 'Request a Premium Quote' },
    ],
  },
  {
    path: '/grow-your-company',
    label: 'Grow Your Company',
    items: [
      { n: 30, where: 'Hero (had no CTA)', kind: 'add', after: 'Button: “Apply Your Startup”' },
      { n: 31, where: 'Section title', kind: 'change', before: 'Our Process', after: 'How We Work?' },
      { n: 32, where: 'Below the section title', kind: 'add', after: 'Structured process, measurable results.' },
      { n: 33, where: 'Service title', kind: 'change', before: 'Market Expansion', after: 'Expansion & Capital Bridge' },
      { n: 34, where: 'CTA button', kind: 'change', before: 'Apply now', after: 'APPLY NOW' },
    ],
  },
  {
    path: '/workspaces/offices',
    label: 'Offices',
    items: [
      { n: 35, where: 'Hero subtitle', kind: 'change', before: 'Beyond the standard office.', after: 'Beyond the standard office' },
      { n: 36, where: 'Intro paragraph', kind: 'remove', before: '“Choose the format that fits how your team operates today.”' },
      { n: 37, where: 'CTA button', kind: 'change', before: 'Book a visit', after: 'Book your office now' },
      { n: 38, where: 'CTA button', kind: 'change', before: 'Book a visit', after: 'Book your office now' },
      { n: 39, where: 'CTA button', kind: 'change', before: 'Book a visit', after: 'Book your office now' },
    ],
  },
  {
    path: '/location/urban-hub',
    label: 'Urban Hub',
    items: [
      { n: 40, where: 'Intro paragraph', kind: 'text', after: 'Step into the space that has become the heart of Zagreb’s startup culture. Whether you need a spot in our coworking hub or the privacy of your own office, everything is tailored to your pace, supporting your professional growth all the way.' },
      { n: 41, where: 'Section title', kind: 'change', before: 'What You Will Find Here', after: 'What Zavrtnica Offers' },
      { n: 42, where: 'Address', kind: 'change', before: 'Heinzelova ulica 60, Zagreb', after: 'Heinzelova ulica 60, 10000 Zagreb, Croatia' },
      { n: 43, where: 'CTA title', kind: 'change', before: 'Join the Community', after: 'Schedule a Tour' },
    ],
  },
  {
    path: '/workspaces/conference-rooms',
    label: 'Conference Rooms',
    items: [
      { n: 44, where: 'Venue group title', kind: 'change', before: 'WESPA Urban Hub (Zavrtnica 17)', after: 'Venues at WESPA Urban Hub (Zavrtnica 17)' },
      { n: 45, where: 'Venue group title', kind: 'change', before: 'WESPA Business & Lounge (Green Gold)', after: 'Venues at WESPA Business & Lounge (Green Gold)' },
      { n: 46, where: 'SHIFT room description (110m²)', kind: 'change', before: 'theater layout', after: 'cinema layout' },
      { n: 47, where: 'CTA button', kind: 'change', before: 'Book a Conference Room', after: 'Get a Quote' },
    ],
  },
  {
    path: '/workspaces/meeting-rooms',
    label: 'Meeting Rooms',
    items: [
      { n: 48, where: 'Price', kind: 'change', before: '€350', after: '€350.00' },
      { n: 49, where: 'Price', kind: 'change', before: '€750', after: '€750.00' },
      { n: 50, where: 'Price', kind: 'change', before: '€850', after: '€850.00' },
      { n: 51, where: 'CTA button', kind: 'change', before: 'Book a visit', after: 'Book a Room' },
    ],
  },
  {
    path: '/events/custom-special-events',
    label: 'Custom Special Events',
    items: [
      { n: 52, where: 'Feature title', kind: 'change', before: 'Support', after: 'Full Service Support' },
      { n: 53, where: 'Food & Drink section', kind: 'add', after: 'Restaurant Papel & restaurant SPOT offer a wide range of contemporary international and regional cuisine. Our focus is on quality ingredients and the highest level of service, whether for an elegant fine dining experience or a relaxed buffet.' },
      { n: 54, where: 'CTA button', kind: 'change', before: 'Get in Touch', after: 'Check date availability for your event.' },
    ],
  },
  {
    path: '/food/spot',
    label: 'SPOT',
    items: [
      { n: 55, where: 'The SPOT Experience', kind: 'add', after: 'Button: “See the Menu”' },
      { n: 56, where: '"The SPOT Standard" section', kind: 'remove', before: 'Section removed (Curated Wine List, Corporate Standards, Flawless Service)' },
      { n: 57, where: 'Find Us address', kind: 'change', before: 'WESPA Spaces — Urban Hub, Heinzelova ulica 60, Zagreb', after: 'WESPA Spaces — Green Gold, Radnička cesta 50, Zagreb' },
    ],
  },
  {
    path: '/events/custom-business-events',
    label: 'Custom Business Events',
    items: [
      { n: 58, where: 'Above the intro paragraph', kind: 'add', after: 'Title: “A flexible space that works for you.”' },
      { n: 59, where: 'CTA button', kind: 'change', before: 'Get in touch', after: 'Check date availability for your event.' },
    ],
  },
  {
    path: '/food/papel',
    label: 'Papel',
    items: [
      { n: 60, where: 'Intro paragraph', kind: 'text', after: '“Everything you need for a quality break.” separated from the rest of the paragraph.' },
      { n: 61, where: 'Description', kind: 'text', after: 'A relaxed community restaurant tailored to the pace of modern business. Choose from premium daily specials and an a la carte menu made with nutrient-rich ingredients that provide energy without the heavy feel. The ideal spot for an informal meeting or a business lunch.' },
    ],
  },
  {
    path: '/workspaces/custom-office-zones',
    label: 'Custom Office Zones',
    items: [
      { n: 62, where: 'Below the title', kind: 'add', after: 'Full-service office solutions for larger teams and established companies.' },
      { n: 63, where: 'CTA button', kind: 'change', before: 'Request a Quote', after: 'Request a Custom Quote' },
    ],
  },
]

// ============================================
// Items we interpreted and would like confirmed
// ============================================
export interface ConfirmItem {
  page: string
  pageHr: string
  note: string
  noteHr: string
}

export const confirmItems: ConfirmItem[] = [
  {
    page: 'Footer (site-wide)',
    pageHr: 'Podnožje (cijela stranica)',
    note: 'The newsletter pin was on the global footer newsletter. To avoid leaving an orphan form, the entire footer newsletter section was removed — this affects every page. Easily reversible.',
    noteHr: 'Komentar je bio na newsletteru u globalnom podnožju. Kako forma ne bi ostala bez svrhe, uklonjena je cijela newsletter sekcija iz podnožja — to utječe na sve stranice. Lako se može vratiti.',
  },
  {
    page: 'Grow Your Company',
    pageHr: 'Grow Your Company',
    note: 'The “Apply Your Startup” button had no anchor, so it was added to the hero (which had no CTA), linking to /contact?subject=forge.',
    noteHr: 'Gumb “Apply Your Startup” nije imao oznaku, pa je dodan u hero (koji nije imao CTA), s poveznicom na /contact?subject=forge.',
  },
  {
    page: 'Conference Rooms',
    pageHr: 'Conference Rooms',
    note: '“theater layout” → “cinema layout” was applied only to the pinned SHIFT room (110m²). The word “theater” still appears for INDIGO / INCUBATOR / BOND / ESCAPE — confirm if you want it changed everywhere.',
    noteHr: '“theater layout” → “cinema layout” primijenjeno je samo na označenu dvoranu SHIFT (110 m²). Riječ “theater” i dalje se pojavljuje za INDIGO / INCUBATOR / BOND / ESCAPE — potvrdite želite li promjenu posvuda.',
  },
  {
    page: 'SPOT',
    pageHr: 'SPOT',
    note: 'The “See the Menu” button was created, but there is no menu page/PDF in the project yet. It links provisionally to /food — we need the real menu URL.',
    noteHr: 'Gumb “See the Menu” je dodan, ali u projektu još ne postoji stranica/PDF s jelovnikom. Privremeno vodi na /food — trebamo pravi URL jelovnika.',
  },
  {
    page: 'SPOT',
    pageHr: 'SPOT',
    note: '“remove this section” removed the whole “The SPOT Standard” block (3 cards). If you only meant the “Curated Wine List” card, we can restore the other two.',
    noteHr: '“ukloni ovu sekciju” uklonilo je cijeli blok “The SPOT Standard” (3 kartice). Ako ste mislili samo na karticu “Curated Wine List”, možemo vratiti druge dvije.',
  },
  {
    page: 'Croatian (HR)',
    pageHr: 'Hrvatski (HR)',
    note: 'All new strings were translated conservatively to Croatian — worth a final check by a native speaker.',
    noteHr: 'Svi novi tekstovi prevedeni su konzervativno na hrvatski — vrijedi ih dati na završnu provjeru izvornom govorniku.',
  },
]

// ============================================
// Earlier rounds (context — already shipped)
// ============================================
export interface EarlierRound {
  label: string
  labelHr: string
  when: string
  whenHr: string
  count: string
  detail: string
  detailHr: string
}

export const earlierRounds: EarlierRound[] = [
  {
    label: 'Figma design review',
    labelHr: 'Figma pregled dizajna',
    when: 'May 2',
    whenHr: '2. svibnja',
    count: '~211',
    detail: 'Comments #1–#211 applied across 11 pages (home, coworking, meeting rooms, conference rooms, offices, events, food, location, Forge, resources, community).',
    detailHr: 'Komentari #1–#211 primijenjeni na 11 stranica (naslovnica, coworking, sale za sastanke, konferencijske sale, uredi, događaji, hrana, lokacije, Forge, resursi, community).',
  },
  {
    label: 'Live widget feedback (Gabi)',
    labelHr: 'Komentari putem widgeta (Gabi)',
    when: 'May 5–7',
    whenHr: '5.–7. svibnja',
    count: '~175',
    detail: 'Multiple rounds: homepage, coworking, meeting rooms, offices, custom office zones, conference rooms, events, community, grow-your-company and more.',
    detailHr: 'Više krugova: naslovnica, coworking, sale za sastanke, uredi, prilagođene uredske zone, konferencijske sale, događaji, community, grow-your-company i drugo.',
  },
  {
    label: 'Homepage feedback (Andrea)',
    labelHr: 'Komentari na naslovnicu (Andrea)',
    when: 'May 8',
    whenHr: '8. svibnja',
    count: '13',
    detail: 'Homepage copy and layout adjustments.',
    detailHr: 'Prilagodbe teksta i rasporeda na naslovnici.',
  },
  {
    label: 'Performance, SEO & accessibility pass',
    labelHr: 'Performanse, SEO i pristupačnost',
    when: 'May 11–20',
    whenHr: '11.–20. svibnja',
    count: '—',
    detail: 'Lighthouse audit on the 8 key pages: SEO 100 and Accessibility 100 across the board, plus LCP improvements.',
    detailHr: 'Lighthouse analiza na 8 ključnih stranica: SEO 100 i Pristupačnost 100 na svima, uz poboljšanja LCP-a.',
  },
]
