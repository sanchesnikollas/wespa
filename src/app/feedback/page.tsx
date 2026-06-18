'use client'

// ============================================
// WESPA — Feedback Implementation Report
// Client-facing page that exposes every review comment
// and how it was implemented, with a live link per page.
// Bilingual: English / Croatian (in-page toggle).
// ============================================

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight, ExternalLink, Minus, Plus, Pencil } from 'lucide-react'
import {
  reviewPages,
  confirmItems,
  earlierRounds,
  ui,
  whereLabel,
  TOTAL,
  type Lang,
  type ReviewItem,
} from './data'

// ============================================
// Animation
// ============================================
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.04 } } }

// ============================================
// Language toggle (segmented control)
// ============================================
function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1" role="group" aria-label="Language">
      {(['en', 'hr'] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-4 py-1.5 text-body-sm font-medium transition-colors ${
            lang === l ? 'bg-white text-stone-900' : 'text-stone-300 hover:text-white'
          }`}
        >
          {l === 'en' ? 'English' : 'Hrvatski'}
        </button>
      ))}
    </div>
  )
}

// ============================================
// Kind tag (Changed / Removed / Added / Updated)
// ============================================
function KindTag({ kind, lang }: { kind: ReviewItem['kind']; lang: Lang }) {
  const t = ui[lang]
  const map = {
    change: { label: t.kindChange, cls: 'bg-stone-100 text-stone-600', Icon: ArrowRight },
    remove: { label: t.kindRemove, cls: 'bg-red-50 text-wespa-red-dark', Icon: Minus },
    add: { label: t.kindAdd, cls: 'bg-emerald-50 text-emerald-700', Icon: Plus },
    text: { label: t.kindText, cls: 'bg-amber-50 text-amber-700', Icon: Pencil },
  } as const
  const { label, cls, Icon } = map[kind]
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-caption font-medium ${cls}`}>
      <Icon className="h-3 w-3" aria-hidden />
      {label}
    </span>
  )
}

// ============================================
// One review item row
// ============================================
function ChangeRow({ item, lang }: { item: ReviewItem; lang: Lang }) {
  const t = ui[lang]
  return (
    <motion.li
      variants={fadeUp}
      className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-4 transition-colors hover:border-stone-300 sm:p-5"
    >
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-stone-900 text-caption font-semibold text-white">
        {item.n}
      </span>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <KindTag kind={item.kind} lang={lang} />
          <span className="text-caption uppercase tracking-wide text-stone-400">
            {whereLabel(item.where, lang)}
          </span>
        </div>

        {item.kind === 'change' && (
          <p className="text-body-md leading-relaxed">
            <span className="text-stone-400 line-through decoration-wespa-red/60">{item.before}</span>
            <ArrowRight className="mx-2 inline h-4 w-4 text-stone-400" aria-hidden />
            <span className="font-semibold text-stone-900">{item.after}</span>
          </p>
        )}

        {item.kind === 'remove' && (
          <p className="text-body-md leading-relaxed text-stone-500 line-through decoration-wespa-red/60">
            {item.before}
          </p>
        )}

        {(item.kind === 'add' || item.kind === 'text') && (
          <p className="text-body-md font-medium leading-relaxed text-stone-900">{item.after}</p>
        )}
      </div>

      <span
        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"
        title={t.implemented}
        aria-label={t.implemented}
      >
        <Check className="h-4 w-4" aria-hidden />
      </span>
    </motion.li>
  )
}

// ============================================
// Page
// ============================================
export default function FeedbackPage() {
  const [lang, setLang] = useState<Lang>('en')
  const t = ui[lang]
  const pageCount = reviewPages.length

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-stone-900 py-20 text-white lg:py-28">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-wespa-red/20 blur-3xl"
          aria-hidden
        />
        <div className="container-wespa relative z-10">
          <div className="mb-10 flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-caption font-medium uppercase tracking-wide text-stone-300">
              {t.roundLabel}
            </span>
            <LangToggle lang={lang} setLang={setLang} />
          </div>

          <motion.div key={lang} initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <h1 className="mb-6 text-display-md font-bold leading-tight lg:text-display-lg">
              {t.heroTitle1}
              <br />
              <span className="text-wespa-red">{t.heroTitle2}</span>
            </h1>
            <p className="max-w-2xl text-body-lg leading-relaxed text-stone-300">{t.heroSubtitle}</p>
          </motion.div>

          {/* Stat band */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mt-12 grid max-w-2xl grid-cols-3 gap-4"
          >
            {[
              { value: `${TOTAL}/${TOTAL}`, label: t.statImplemented },
              { value: pageCount, label: t.statPages },
              { value: '100%', label: t.statLive },
            ].map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-display-sm font-bold text-white">{s.value}</div>
                <div className="mt-1 text-body-sm text-stone-400">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- Index ---------- */}
      <section className="border-b border-stone-200 bg-stone-50 py-6">
        <div className="container-wespa">
          <nav aria-label={t.jump} className="flex flex-wrap gap-2">
            {reviewPages.map((p) => (
              <a
                key={p.path}
                href={`#${p.path.replace(/\//g, '-').replace(/^-/, '')}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-body-sm text-stone-600 transition-colors hover:border-stone-400 hover:text-stone-900"
              >
                {p.label}
                <span className="text-stone-400">{p.items.length}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ---------- Per-page sections ---------- */}
      <section className="py-16 lg:py-20">
        <div className="container-wespa space-y-16">
          {lang === 'hr' && (
            <p className="-mb-10 text-body-sm italic text-stone-400">{t.quotesNote}</p>
          )}
          {reviewPages.map((p) => {
            const word = p.items.length === 1 ? t.comment : t.comments
            return (
              <div key={p.path} id={p.path.replace(/\//g, '-').replace(/^-/, '')} className="scroll-mt-24">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  variants={fadeUp}
                  className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 pb-4"
                >
                  <div>
                    <span className="text-caption uppercase tracking-wide text-wespa-red">
                      {p.items.length} {word}
                    </span>
                    <h2 className="text-heading-xl font-bold text-stone-900">{p.label}</h2>
                  </div>
                  <Link
                    href={p.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-body-sm font-medium text-white transition-colors hover:bg-stone-800"
                  >
                    {t.viewLive}
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </Link>
                </motion.div>

                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={stagger}
                  className="space-y-3"
                >
                  {p.items.map((item) => (
                    <ChangeRow key={item.n} item={item} lang={lang} />
                  ))}
                </motion.ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* ---------- Items to confirm ---------- */}
      <section className="bg-stone-50 py-16 lg:py-20">
        <div className="container-wespa">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-8 max-w-2xl">
            <h2 className="text-heading-xl font-bold text-stone-900">{t.confirmTitle}</h2>
            <p className="mt-2 text-body-md text-stone-600">{t.confirmSubtitle}</p>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-4 md:grid-cols-2"
          >
            {confirmItems.map((c, i) => (
              <motion.li key={i} variants={fadeUp} className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
                <div className="mb-1.5 text-caption font-semibold uppercase tracking-wide text-amber-700">
                  {lang === 'hr' ? c.pageHr : c.page}
                </div>
                <p className="text-body-sm leading-relaxed text-stone-700">{lang === 'hr' ? c.noteHr : c.note}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ---------- Earlier rounds ---------- */}
      <section className="py-16 lg:py-20">
        <div className="container-wespa">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-8 max-w-2xl">
            <h2 className="text-heading-xl font-bold text-stone-900">{t.earlierTitle}</h2>
            <p className="mt-2 text-body-md text-stone-600">{t.earlierSubtitle}</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-3">
            {earlierRounds.map((r) => (
              <motion.div
                key={r.label}
                variants={fadeUp}
                className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-5 sm:flex-row sm:items-center"
              >
                <div className="flex shrink-0 items-baseline gap-3 sm:w-56">
                  <span className="text-heading-lg font-bold text-wespa-red">{r.count}</span>
                  <span className="text-body-sm text-stone-400">{lang === 'hr' ? r.whenHr : r.when}</span>
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-stone-900">{lang === 'hr' ? r.labelHr : r.label}</div>
                  <p className="text-body-sm leading-relaxed text-stone-600">{lang === 'hr' ? r.detailHr : r.detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- Footer note ---------- */}
      <section className="bg-stone-900 py-14 text-white">
        <div className="container-wespa">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-body-md text-stone-300">{t.footerNote}</p>
              <p className="mt-1 text-body-sm text-stone-500">{t.refreshTip}</p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-body-sm font-medium text-stone-900 transition-colors hover:bg-stone-100"
            >
              {t.goToSite}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
