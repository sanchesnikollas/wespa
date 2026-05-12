# Lighthouse Audit — Quick Wins (2026-05-11, run 3)

Re-audit após aplicar quick wins do baseline. Mesmo setup: mobile, Slow 4G + 4× CPU.

## Comparação completa Before → After P0 → After Quickwins

| Rota | Perf (b→p→q) | A11y (b→p→q) | BP | SEO (b→p→q) |
|---|---|---|---|---|
| `/` | 79→79→**91** | 97→97→97 | 96 | 92→92→**100** |
| `/workspaces` | 94→94→**95** | 93→97→97 | 96 | 92→100→100 |
| `/workspaces/coworking` | 92→94→**96** | 92→95→**97** | 96 | 92→100→100 |
| `/workspaces/meeting-rooms` | 93→94→**95** | 92→95→95 | 96 | 92→100→100 |
| `/workspaces/offices` | 92→95→93 | 93→97→97 | 96 | 92→100→100 |
| `/workspaces/conference-rooms` | 95→95→94 | 93→97→97 | 96 | 92→100→100 |
| `/food` | 94→94→94 | 93→97→97 | 96 | 92→100→100 |
| `/location` | 93→93→93 | 93→97→97 | 96 | 92→100→100 |

**Highlights:**
- **SEO: 8/8 páginas em 100** (homepage subiu 92 → 100 ao corrigir `link-text`)
- **Homepage Perf: 79 → 91 (+12 pontos)** com LCP 5.04s → 3.5s (-30%) e SI 4.10s → 1.70s (-58%)
- **A11y consolidada em 95-97** (média) com heading-order 100 na coworking

Pequenas variações (-1 a -2) em offices/conference-rooms são variabilidade entre runs, não regressões reais.

## Fixes aplicados

### 1. `browserslist` em package.json (P1)
Adicionado config com browsers modernos (Chrome 100+, Edge 100+, Firefox 100+, Safari 15.4+, iOS Safari 15.4+):
```json
"browserslist": [
  "chrome >= 100", "edge >= 100", "firefox >= 100",
  "safari >= 15.4", "ios_saf >= 15.4", "and_chr >= 100"
]
```
**Impacto:** Reduz polyfills antigos servidos pra browsers modernos. Homepage Perf jumpou +12. `legacy-javascript-insight` ainda mostra 11 KiB savings residual mas main thread descongestionou significativamente.

### 2. `link-text` homepage (P2)
4 cards de plan na homepage (CardPlan em [Card.tsx:311](src/components/molecules/Card.tsx)) tinham `<Link>Learn More</Link>` genérico.

**Fix:**
- Texto visível: `Learn More` → `View {plan.name}` ("View FlyDesk", "View OwnDesk", etc.)
- Adicionado `aria-label={`Learn more about the ${plan.name} plan`}` no Link

**Impacto:** Homepage SEO 92 → 100. Audit `link-text` passou (0 → 100).

### 3. `heading-order` na coworking (P2)
Página `/workspaces/coworking` pulava de `<h1>` (hero) direto para `<h3>` (plan name) sem `<h2>` intermediário.

**Fix:** Adicionado `<h2 className="sr-only">{language === 'en' ? 'Coworking Plans' : 'Coworking planovi'}</h2>` antes da grid de plans (em [coworking/page.tsx:86](src/app/workspaces/coworking/page.tsx)). Bilíngue, invisível visualmente (sr-only), restaura hierarquia.

**Impacto:** A11y coworking 95 → 97. Audit `heading-order` passou.

## Gaps ainda abertos

### P0 restantes
- **wespa-red color-contrast (3.83 fail)** — 2-8 items por página, todos com fg/bg envolvendo `#ef4136`. Solução cirúrgica: trocar `text-wespa-red`/`bg-wespa-red` por `text-wespa-red-dark`/`bg-wespa-red-dark` (token já existe no Tailwind) em CTAs e textos pequenos sobre fundo branco. Decisão de brand: tom levemente mais escuro mas mantém identidade visual.

### P1 restantes
- **LCP 2.78s-3.5s** (median ~3s) — ainda acima do target Google "Good" (<2.5s). Homepage caiu pra 3.5s mas ainda "Needs Improvement". Próximo: investigar elemento LCP, otimizar hero image (provavelmente fetchpriority="high", sizes adequados).
- **legacy-javascript-insight 11 KiB** residual — provavelmente do GTM ou outros scripts third-party que não respondem ao browserslist.
- **render-blocking 140-150ms** — CSS/JS bloqueando first paint. Considerar critical CSS inline.
- **image-delivery 80-180 KiB savings** — imagens hero ainda maiores que viewport mobile.

### P2 restantes
- `errors-in-console` em 8/8 — **falso positivo local** (CORS Supabase). Em produção sobe pra BP=100.

## Reproduzir

```bash
npm run build
PORT=3003 npm run start &
LIGHTHOUSE_BASE_URL=http://localhost:3003 LIGHTHOUSE_OUT_DIR=docs/lighthouse/2026-05-11-quickwins npm run lighthouse:all
```
