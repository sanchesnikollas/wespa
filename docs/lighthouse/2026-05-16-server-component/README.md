# Lighthouse Audit — Homepage Server Component (2026-05-16, run 7)

Re-audit após refatorar [src/app/page.tsx](src/app/page.tsx) removendo `'use client'` (HomePage não tinha hooks, era só wrapper de Sections). As Sections internas (HeroSection com framer-motion, etc.) continuam Client Component.

## Comparação A11y final → Server Component

| Rota | Perf (a→s) | LCP (a→s) | SI (a→s) | A11y | BP | SEO |
|---|---|---|---|---:|---:|---:|
| `/` | 84 → **90** ✓ | 4.19s → **3.48s** | 4.10s → 3.41s | 100 | 96 | 100 |
| `/workspaces` | 94 → 95 | 3.08s → 2.86s | 1.41s → 1.24s | 100 | **100** | 100 |
| `/workspaces/coworking` | 94 → 94 | 3.08s → 3.08s | 1.46s → 1.42s | 100 | 96 | 100 |
| `/workspaces/meeting-rooms` | 94 → 95 | 3.01s → 3.01s | 1.41s → 1.42s | 100 | **100** | 100 |
| `/workspaces/offices` | 95 → 95 | 3.16s → 2.86s | 1.15s → 1.32s | 100 | **100** | 100 |
| `/workspaces/conference-rooms` | 94 → 95 | 2.95s → 2.93s | 1.41s → 1.41s | 100 | **100** | 100 |
| `/food` | 94 → 94 | 3.08s → 3.09s | 1.06s → 1.07s | 100 | **100** | 100 |
| `/location` | 93 → 93 | 3.16s → 3.16s | 1.07s → 1.07s | 100 | **100** | 100 |

**Highlights:**
- **Homepage Perf 84 → 90 (+6 pts)** com LCP -0.71s e SI -0.69s
- **BP subiu pra 100 em 5/8** (build sem `NEXT_PUBLIC_ENABLE_REVIEW=1` — widget não carrega → sem erro CORS local)
- A11y 100 e SEO 100 mantidos
- LCP <2.5s ainda não alcançado (mediana ~3s)

## Mudança aplicada

```diff
- 'use client'
-
  // ============================================
  // WESPA Website - Homepage
+ // Server Component — Sections internas sao Client onde precisam
  // ============================================
```

`HomePage()` é só wrapper de 9 Sections importadas — sem hooks, sem state, sem APIs Browser. Sections individuais (HeroSection com `useScroll`/`useTransform` framer-motion) continuam Client Component. Resultado: HomePage bundle 349B → 207B, e React não precisa hidratar o wrapper.

## Outras pages com `'use client'` (não refatoradas)

29 outras pages têm `'use client'` mas a maioria usa `useLanguage()` para conteúdo bilíngue. Refatorá-las requeriria mover dados pra Server Component + passar pra Client via props, ou usar Server-side i18n. Maior trabalho, ROI marginal já que homepage era o outlier real de LCP.

## Limites

LCP ainda 3-3.5s mediana. Para chegar em <2.5s ("Good" Google):
- HeroSection ainda tem framer-motion `useScroll`/`useTransform` que adiciona overhead
- Tailwind CSS bundle 10.3KB ainda bloqueia render
- Hidratação das outras Sections (Client) ainda acontece

Próximas tentativas (próxima sessão):
- Lazy load das Sections below-the-fold (`dynamic(() => import(...), { ssr: false })`)
- Substituir framer-motion no HeroSection por CSS animations
- Critical CSS inline manual

## Reproduzir

```bash
npm run build
PORT=3003 npm run start &
LIGHTHOUSE_BASE_URL=http://localhost:3003 LIGHTHOUSE_OUT_DIR=docs/lighthouse/2026-05-16-server-component npm run lighthouse:all
```
