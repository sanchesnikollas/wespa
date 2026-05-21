# Fix CORS — Edge Function `ingest-event` (projeto gigwand-portal)

> **Onde aplicar:** repositório **`gigwand-portal`** (NÃO o Wespa Website). Projeto Supabase: `gigwand` (`hayjlojrcmprwmzgqlxz`), Edge Function `ingest-event` (ACTIVE, version 1).
>
> **Por quê:** o tracking beacon do Wespa (`gigwandBeacon()` em [src/components/tracking/Analytics.tsx](src/components/tracking/Analytics.tsx)) faz POST de `https://wespa.gigwand.com` → `hayjlojrcmprwmzgqlxz.supabase.co/functions/v1/ingest-event`. A função **não responde com os headers CORS** que liberam esse origin, então o browser bloqueia (preflight `OPTIONS` falha + `Failed to load resource: ERR_FAILED`). Resultado: **events não chegam ao portal em produção** e Lighthouse Best Practices fica em 96 (errors-in-console).

## Sintoma (confirmado no audit de prod 2026-05-11)

```
Access to resource at 'https://hayjlojrcmprwmzgqlxz.supabase.co/functions/v1/ingest-event'
from origin 'https://wespa.gigwand.com' has been blocked by CORS policy:
Response to preflight request doesn't pass access control check
```

Aparece em 8/8 páginas auditadas em prod.

## Patch (padrão Supabase Edge Function / Deno)

A função precisa: (1) tratar o preflight `OPTIONS`, (2) incluir os headers CORS em **todas** as respostas.

```ts
// supabase/functions/ingest-event/index.ts (no repo gigwand-portal)

// 1. Lista de origins permitidos (ou use '*' se o endpoint for público)
const ALLOWED_ORIGINS = [
  'https://wespa.gigwand.com',
  'https://widget.gigwand.com',
  // adicionar outros sites multi-tenant conforme necessário
]

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Vary': 'Origin',
  }
}

Deno.serve(async (req) => {
  const origin = req.headers.get('Origin')

  // 2. Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders(origin) })
  }

  // ... lógica existente de ingest ...

  // 3. Resposta final COM os headers CORS
  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  })
})
```

> **Nota:** sendBeacon (usado pelo gigwandBeacon) envia como POST sem preflight quando o Content-Type é `text/plain`. Se o beacon usa `application/json`, o preflight `OPTIONS` é disparado — por isso tratar OPTIONS é essencial. Verificar o Content-Type usado no `gigwandBeacon()` e alinhar.

## Deploy (no repo gigwand-portal)

```bash
# autenticado como dono do projeto gigwand
supabase functions deploy ingest-event --project-ref hayjlojrcmprwmzgqlxz
```

## Verificação pós-fix

```bash
# Preflight deve retornar 200 com Access-Control-Allow-Origin
curl -i -X OPTIONS \
  -H "Origin: https://wespa.gigwand.com" \
  -H "Access-Control-Request-Method: POST" \
  https://hayjlojrcmprwmzgqlxz.supabase.co/functions/v1/ingest-event

# Depois: re-rodar Lighthouse prod do Wespa — errors-in-console deve zerar, BP -> 100
LIGHTHOUSE_BASE_URL=https://wespa.gigwand.com npm run lighthouse:all
```

## Importante

Este fix **não foi aplicado daqui** — `gigwand` é prod compartilhada multi-tenant (serve `sync-review-rounds`, `sync-performance`, `sync-github`, `ingest-event`). Mexer via CLI a partir do repo Wespa seria divergência do código-fonte versionado no `gigwand-portal`. O fix pertence àquele repo, com review + deploy próprios.
