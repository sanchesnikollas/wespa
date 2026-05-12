# Lighthouse Audit — P0 fixes (2026-05-11, run 2)

Re-audit após aplicar parte do P0 da [triagem baseline](../2026-05-11/README.md). Mesmo setup: mobile, Slow 4G + 4× CPU.

## Comparação Before → After

| Rota | Perf (b→a) | A11y (b→a) | BP (b→a) | **SEO (b→a)** |
|---|---|---|---|---|
| `/` | 79→79 | 97→97 | 96→96 | 92→92 |
| `/workspaces` | 94→94 | 93→**97** | 96→96 | 92→**100** |
| `/workspaces/coworking` | 92→94 | 92→**95** | 96→96 | 92→**100** |
| `/workspaces/meeting-rooms` | 93→94 | 92→**95** | 96→96 | 92→**100** |
| `/workspaces/offices` | 92→95 | 93→**97** | 96→96 | 92→**100** |
| `/workspaces/conference-rooms` | 95→95 | 93→**97** | 96→96 | 92→**100** |
| `/food` | 94→94 | 93→**97** | 96→96 | 92→**100** |
| `/location` | 93→93 | 93→**97** | 96→96 | 92→**100** |

**Wins:**
- **SEO 92 → 100** em 7/8 páginas (homepage ficou em 92, gap = `link-text` issue não atacado)
- **A11y 92-93 → 95-97** (média +3 pontos)
- **`document-title` audit: 1/8 passing → 8/8 passing** (era o bug crítico)

**Sem mudança (esperado):**
- Performance — LCP/imagens não foram atacadas nesta sessão
- Best Practices 96 — `errors-in-console` é falso positivo CORS local (gigwand beacon Supabase). Em produção sobe pra 100.

## Fixes aplicados

### 1. Title duplicado (P0 #1) — RESOLVIDO

**Antes:** 7/8 páginas renderizavam 2 `<title>` tags (um vazio + o correto).

**Causa:** `'use client'` page.tsx renderizando `<title>{c.pageTitle} | WESPA</title>` no JSX, conflitando com `metadata.title` exportado em layout.tsx.

**Fix:**
- Removidas 2 linhas (`<title>` + `<meta name="description">`) de 21 page.tsx
- Criados 6 layouts faltantes (5 estáticos + 1 dinâmico com `generateMetadata` em `[slug]/layout.tsx`)
- Cada página agora tem 1 `<title>` correto via Next.js metadata API

**Limitação conhecida (não-blocker):** `title.template: '%s | WESPA'` do root layout não propaga para layouts 2-nível profundos (ex: `/workspaces/coworking` mostra "Coworking in Zagreb", sem " | WESPA"). Lighthouse `document-title` audit passa mesmo assim. Brand consistency é nice-to-have pra próxima sessão.

### 2. Color-contrast `text-stone-500` (parte do P0 #3) — PARCIALMENTE RESOLVIDO

**Antes:** `text-stone-500` (#78716c) em fundos claros falha 4.4 vs 4.5 WCAG AA.

**Fix:** Substituído `text-stone-500` → `text-stone-600` (#57534e) em 25 files (47 ocorrências) via perl. Contraste sobe pra ~7.5.

**Pendente:** `text-wespa-red` (#ef4136) sobre branco e `bg-wespa-red` com `text-white` ainda falham 3.83. Não atacado porque envolve decisão de brand (existem tokens `wespa-red-dark` no Tailwind, mas mudar afeta visual da marca). Items restantes do `color-contrast` audit: 2-8 por página, todos relacionados a wespa-red.

## Gaps ainda abertos (próxima sessão)

### P0 restantes
- **LCP médio 3.0s, homepage 5.04s** — não atacado. Precisa investigar elemento LCP visualmente (Lighthouse `largest-contentful-paint-element` audit returns empty `details.items` por algum motivo — talvez bug do reporter na v13).
- **wespa-red color-contrast** — decisão de brand: ou trocar token `wespa-red` global, ou aplicar `text-wespa-red-dark` cirurgicamente em ~32 files.

### P1 (do baseline)
- `render-blocking-insight` — 140-150ms savings (CSS/JS bloqueando first paint)
- `legacy-javascript-insight` — 11 KiB legacy polyfills. Adicionar `browserslist` em package.json.
- `image-delivery-insight` — 80-180 KiB savings em imagens hero

### P2 (do baseline)
- 4 `link-text` na homepage (provável: social icons sem aria-label)
- 2 páginas com `heading-order` quebrado

## Reproduzir

```bash
npm run build
PORT=3003 npm run start &
LIGHTHOUSE_BASE_URL=http://localhost:3003 LIGHTHOUSE_OUT_DIR=docs/lighthouse/2026-05-11-after-p0 npm run lighthouse:all
```

## Audit final pendente

Audit contra produção (`wespa.gigwand.com`) pra confirmar:
- `errors-in-console` resolve (CORS configurada em prod) → Best Practices = 100
- `image-delivery` melhora com CDN Railway
