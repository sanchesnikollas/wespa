# LCP <2.5s — análise e plano (próxima sessão dedicada)

**Status atual:** Homepage LCP **3.48s** (era 5.04s no baseline, -31% após homepage virar Server Component em `e372d5d`). Ainda acima do alvo Google "Good" <2.5s.

## Por que não foi feito agora

O ganho fácil já foi capturado (Server Component: -0.71s). O que falta exige **refactor de risco** sem testes de regressão visual automatizados — não vale arriscar quebrar prod numa sessão não-dedicada.

## Diagnóstico

**LCP element:** hero image (`<Image priority>` em [Sections.tsx](src/components/organisms/Sections.tsx) `HeroSection`). Next.js já faz preload correto (srcset + `fetchPriority=high` + `imageSizes=100vw`).

**LCP breakdown (Lighthouse local):**
- TTFB ~12ms, resource load delay ~11ms, load duration ~239ms, render delay ~15ms = ~277ms "internos"
- O restante (~3.2s em Slow 4G + 4× CPU) é **boot/parse/setup** competindo pela main thread

**Causa raiz:** [src/components/organisms/Sections.tsx](src/components/organisms/Sections.tsx) é:
- `'use client'` inteiro (1201 linhas)
- 14 componentes exportados no mesmo módulo
- Importa `framer-motion` no topo (lib pesada)

Qualquer página que usa **uma** Section baixa o módulo inteiro (14 sections + framer-motion) como um chunk client único. Não há code-splitting.

## Plano (sessão dedicada, ~2-3h + regression testing)

### 1. Code-split Sections.tsx (maior impacto)
Separar os 14 componentes em arquivos individuais (`src/components/organisms/sections/HeroSection.tsx`, etc.) ou agrupados por fold:
- **Above-fold** (`HeroSection`, `ClientLogosSection`, `LocationsSection`) — mantêm import estático
- **Below-fold** (`PlansSection`, `FeaturesSection`, `PainPointsSection`, `TestimonialsSection`, `LeadFormSection`, `MediaSection`) — `next/dynamic` lazy import

Cuidados: helpers compartilhados (`SectionTitle`, `fadeInUp` variants, imports de `@/config/site`) precisam ser extraídos pra módulo comum. Testar cada página que importa Sections.

### 2. Reduzir framer-motion above-the-fold
HeroSection usa `useScroll`/`useTransform` pra parallax + fade. Avaliar trocar por:
- CSS scroll-driven animations (`animation-timeline: scroll()`) — suporte moderno, alinhado com browserslist atual
- Ou simplificar (remover parallax, manter só entrada `fadeInUp` via CSS keyframes) — **decisão de design** (muda comportamento visual)

### 3. Critical CSS inline
Render-blocking de 10.3KB CSS / ~153ms. Next.js já inline o crítico parcialmente. Avaliar `experimental.optimizeCss` em next.config.js (usa `critters`).

### Verificação
- `npm run lighthouse:all` antes/depois (comparar LCP de cada página)
- Regression visual: abrir cada página e confirmar layout/animações intactas (Chrome MCP / preview)
- `npm run build` limpo, `npm run type-check` limpo

## Meta realista
LCP <2.5s pode não ser 100% alcançável em Slow 4G pra uma homepage com hero fullscreen. Alvo pragmático: **<3s consistente** (passa de "Needs Improvement" alto pra borderline "Good"). Field data (CrUX) costuma ser melhor que lab throttled.
