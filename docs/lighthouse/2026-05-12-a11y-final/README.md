# Lighthouse Audit — A11y 100 + SEO 100 (2026-05-12, run 6)

Re-audit após corrigir contraste `wespa-red` cirurgicamente + adicionar `<h2 sr-only>` na meeting-rooms. **Resultado: A11y 100 e SEO 100 em 8/8 páginas.**

## Comparação completa: baseline → A11y final

| Rota | Perf | A11y | BP | SEO |
|---|---:|---:|---:|---:|
| `/` | 79→**84** | 97→**100** | 96 | 92→**100** |
| `/workspaces` | 94→94 | 93→**100** | 96 | 92→**100** |
| `/workspaces/coworking` | 92→94 | 92→**100** | 96 | 92→**100** |
| `/workspaces/meeting-rooms` | 93→94 | 92→**100** | 96 | 92→**100** |
| `/workspaces/offices` | 92→95 | 93→**100** | 96 | 92→**100** |
| `/workspaces/conference-rooms` | 95→**97** | 93→**100** | 96 | 92→**100** |
| `/food` | 94→95 | 93→**100** | 96 | 92→**100** |
| `/location` | 93→93 | 93→**100** | 96 | 92→**100** |

**Highlights:**
- **A11y 100 em 8/8 páginas** (era 92-97)
- **SEO 100 em 8/8 páginas** (era 92)
- **Best Practices estável em 96** (CORS local falso positivo, sobe pra 100 em prod só após fix CORS Supabase)
- **Performance estabilizou em 93-97** (média ~93.5)

## Fixes desta rodada

### 1. `bg-wespa-red text-white` → `bg-wespa-red-dark text-white` (6 files)

[Button.tsx](src/components/atoms/Button.tsx) (variant 'wespa'), [ConsentBanner.tsx](src/components/tracking/ConsentBanner.tsx), [globals.css](src/styles/globals.css) (utility class), e 3 pages (`client-stories/[slug]`, `workspaces/coworking`, `workspaces/virtual-office`).

Contraste branco sobre vermelho subiu de 3.83 → ~5.0 (passa WCAG AA texto normal).

Hover state também escalou: `hover:bg-wespa-red-dark` → `hover:bg-wespa-red-darker` para manter feedback visual.

### 2. `text-wespa-red` → `text-wespa-red-dark` em texto pequeno sobre fundo branco

Específicos identificados pelo Lighthouse:
- [src/app/workspaces/page.tsx:113](src/app/workspaces/page.tsx:113) — `text-lg font-semibold text-wespa-red` em card prices (6 items)
- [src/app/food/page.tsx:104](src/app/food/page.tsx:104) — `text-sm font-medium text-wespa-red uppercase` em labels
- [src/app/location/page.tsx:95](src/app/location/page.tsx:95) — mesmo padrão
- [src/app/workspaces/offices/page.tsx:150](src/app/workspaces/offices/page.tsx:150) — `text-wespa-red font-semibold` em priceLabel
- [src/components/organisms/BottomNav.tsx](src/components/organisms/BottomNav.tsx) — active state em 2 lugares

**Não tocado** (em fundo escuro, passa contraste):
- `text-wespa-red font-semibold mb-4` em breadcrumbs dentro de heros (`<section>` com bg-stone-900/75)
- `text-wespa-red` em headings/large text que passam Large Text threshold

### 3. `heading-order` em meeting-rooms

Mesmo padrão que coworking: `<h1>` hero → `<h3>` direto (pula `<h2>`). Adicionado `<h2 className="sr-only">{...}</h2>` bilíngue antes da grid de rooms.

## Métricas Core Web Vitals (mobile, throttled)

| Métrica | Status |
|---|---|
| **LCP** | 2.63–4.19s — Homepage ainda "Needs Improvement" (3-5s). Outras páginas próximas/acima de 2.5s. |
| **FCP** | 0.75–1.43s — "Good" em 7/8. Homepage borderline. |
| **CLS** | 0.000–0.057 — **"Good" em 8/8** ✓ |
| **TBT** | 0–14ms — **"Good" em 8/8** ✓ |

## O que ainda pode lapidar

**Não atacável neste repo (decisão externa):**
- `NEXT_PUBLIC_NOINDEX=1` em prod → SEO prod sobe pra 100
- `NEXT_PUBLIC_ENABLE_REVIEW=1` em prod → unused-javascript 44KB resolve
- Fix CORS Supabase no projeto `gigwand-portal` → BP → 100
- Deploy desta branch → propaga 6 commits de fixes

**LCP <2.5s** (homepage):
- Hero image já preload+srcset corretamente (Next.js auto)
- Bottleneck é setup time: 87KB shared JS + hydration de `'use client'` HomePage com framer-motion
- Próximo experimento: tornar HomePage Server Component, isolar `'use client'` nas Sections que precisam

## Reproduzir

```bash
npm run build
PORT=3003 npm run start &
LIGHTHOUSE_BASE_URL=http://localhost:3003 LIGHTHOUSE_OUT_DIR=docs/lighthouse/2026-05-12-a11y-final npm run lighthouse:all
```
