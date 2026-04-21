# Review Widget — Fase 2: Widget Preact + Shadow DOM

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Widget drop-in em Preact + Shadow DOM que, injetado via `<script>` num site, permite cliente autenticado criar pins com comentários + threads + resolve via Supabase. Ao final, funciona no staging do WESPA com deploy via Cloudflare Pages em `review.sanches.io`.

**Architecture:** Vite em lib mode produz um único bundle IIFE (`widget.js`, ~40kb gz). O bundle é carregado via `<script>` no host, injeta um `<div>` com Shadow DOM attached, monta Preact app dentro. Tailwind compilado é injetado como `<style>` no shadow root pra isolamento total. Supabase JS handle auth (magic link) + DB + RLS. Sem realtime na v1 (refresh manual; adiciona na v1.1).

**Tech Stack:** Vite 5, Preact 10, TypeScript 5, Tailwind CSS 3, @supabase/supabase-js 2, Vitest pra testes unit, Cloudflare Pages pro CDN.

**Spec pai:** `docs/superpowers/specs/2026-04-21-review-widget-design.md`.
**Plano anterior:** `docs/superpowers/plans/2026-04-21-review-supabase-foundation.md` (Fase 1 completada).

---

## Pré-requisitos verificados

- Projeto Supabase ativo: `rmrtndvblnsvogifxisr` (Frankfurt)
- Repo backend: `SANCHES-IO/review-supabase` (Fase 1)
- Credenciais Supabase em `~/Documents/review-supabase/.env`:
  - `SUPABASE_URL=https://rmrtndvblnsvogifxisr.supabase.co`
  - `SUPABASE_ANON_KEY=eyJhbG...` (anon, segura pra expor no bundle público)
- Seed WESPA pronto: 1 site + 2 members

## Decisões de escopo desta fase

**Dentro:** injeção via script, Shadow DOM, login magic link, criar pin, comentar, ver sidebar, responder thread, resolver thread, deploy CDN.

**Fora da v1 (pra v1.1+):** Realtime (widget faz polling/refresh manual), multi-session tabs, dedup semântica, draft local offline.

## File Structure

```
review-widget/                         (novo repo SANCHES-IO/review-widget)
├── .gitignore
├── .env.example
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── index.html                         # host de dev (substituído na Task 7)
├── .github/
│   └── workflows/
│       └── deploy.yml                 # build + push pro Cloudflare Pages
├── src/
│   ├── index.ts                       # entrypoint — injeta no host
│   ├── app.tsx                        # <App /> raiz
│   ├── config.ts                      # SUPABASE_URL/KEY (build-time env)
│   ├── lib/
│   │   ├── supabase.ts                # cliente Supabase + helper queries
│   │   ├── auth.ts                    # magic link + session listener
│   │   └── anchor.ts                  # selector+offset <-> DOM element
│   ├── hooks/
│   │   ├── use-session.ts             # retorna session atual + loading
│   │   └── use-threads.ts             # lista threads da página atual
│   ├── components/
│   │   ├── FloatingButton.tsx
│   │   ├── Sidebar.tsx
│   │   ├── ThreadItem.tsx
│   │   ├── ThreadDetail.tsx
│   │   ├── PinOverlay.tsx
│   │   ├── Pin.tsx
│   │   ├── CreatePinMode.tsx
│   │   ├── LoginForm.tsx
│   │   └── ui/
│   │       └── Button.tsx
│   └── styles/
│       └── tailwind.css               # @tailwind directives
└── tests/
    ├── anchor.test.ts
    └── supabase-mock.ts
```

---

## Task 1: Criar repo e scaffold Vite+Preact+TS

**Files:**
- Create: `~/Documents/review-widget/` (repo inteiro)

- [ ] **Step 1.1: Criar repo GitHub privado**

```bash
cd ~/Documents
gh repo create SANCHES-IO/review-widget \
  --private \
  --description "Widget drop-in de review estilo Figma — Preact + Shadow DOM" \
  --clone
cd review-widget
```

- [ ] **Step 1.2: Inicializar Vite com template Preact+TS**

```bash
npm create vite@latest . -- --template preact-ts
```

Quando perguntar se remove arquivos existentes do diretório (`.git`, README), responder **N**.

Expected: cria `package.json`, `vite.config.ts`, `src/app.tsx`, `src/main.tsx`.

- [ ] **Step 1.3: Instalar deps de runtime + dev**

```bash
npm install @supabase/supabase-js
npm install -D tailwindcss postcss autoprefixer vitest @vitest/ui jsdom happy-dom
```

- [ ] **Step 1.4: Ajustar package.json scripts**

Substituir o bloco `scripts` no `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc --noEmit && vite build",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 1.5: .gitignore**

Substituir `.gitignore`:

```
node_modules
dist
dist-ssr
.DS_Store
.env
.env.local
*.local
```

- [ ] **Step 1.6: Commit inicial + push**

```bash
git add -A
git commit -m "chore: scaffold vite+preact+ts widget"
git branch -M main
git push -u origin main
```

---

## Task 2: Config Tailwind

**Files:**
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `src/styles/tailwind.css`

- [ ] **Step 2.1: tailwind.config.ts**

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eef5ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
} satisfies Config;
```

- [ ] **Step 2.2: postcss.config.js**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 2.3: src/styles/tailwind.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* reset específico do shadow root (o host pode estar com estilos tortos) */
:host {
  all: initial;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
}
```

- [ ] **Step 2.4: Commit**

```bash
git add tailwind.config.ts postcss.config.js src/styles/tailwind.css
git commit -m "chore: tailwind setup with shadow-root safe reset"
git push
```

---

## Task 3: Config Vite lib mode (IIFE bundle)

**Files:**
- Modify: `vite.config.ts`
- Create: `src/index.ts` (stub temporário)

- [ ] **Step 3.1: Criar stub de entrypoint**

Arquivo `src/index.ts`:

```ts
// Entrypoint do widget. Preenchido na Task 7.
console.log("[review-widget] loaded");
```

- [ ] **Step 3.2: Atualizar vite.config.ts**

```ts
import { defineConfig, loadEnv } from "vite";
import preact from "@preact/preset-vite";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [preact()],
    define: {
      __SUPABASE_URL__: JSON.stringify(env.VITE_SUPABASE_URL ?? ""),
      __SUPABASE_ANON_KEY__: JSON.stringify(env.VITE_SUPABASE_ANON_KEY ?? ""),
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "SanchesReview",
        formats: ["iife"],
        fileName: () => "widget.js",
      },
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
        },
      },
      emptyOutDir: true,
    },
  };
});
```

- [ ] **Step 3.3: Adicionar types pros defines**

Arquivo `src/config.ts`:

```ts
declare const __SUPABASE_URL__: string;
declare const __SUPABASE_ANON_KEY__: string;

export const SUPABASE_URL = __SUPABASE_URL__;
export const SUPABASE_ANON_KEY = __SUPABASE_ANON_KEY__;
```

- [ ] **Step 3.4: Criar .env.example e .env**

Arquivo `.env.example`:

```
VITE_SUPABASE_URL=https://rmrtndvblnsvogifxisr.supabase.co
VITE_SUPABASE_ANON_KEY=
```

Arquivo `.env` (gitignored, preencher com valores reais):

```
VITE_SUPABASE_URL=https://rmrtndvblnsvogifxisr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtcnRuZHZibG5zdm9naWZ4aXNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3OTYzNTQsImV4cCI6MjA5MjM3MjM1NH0.UO9_3rWrdFfkz-83Nhj5jtoGPQ_7LoFr60md7IUflsU
```

- [ ] **Step 3.5: Testar build**

```bash
npm run build
```

Expected: `dist/widget.js` criado. Inspecionar: `ls -la dist/` e `wc -c dist/widget.js` (deve ser ~5-20kb no stub).

- [ ] **Step 3.6: Commit**

```bash
git add vite.config.ts src/config.ts src/index.ts .env.example
git commit -m "chore: vite lib mode IIFE + build-time supabase env"
git push
```

---

## Task 4: Utilitário anchor (TDD)

**Files:**
- Create: `src/lib/anchor.ts`
- Create: `tests/anchor.test.ts`
- Create: `vitest.config.ts`

- [ ] **Step 4.1: Config do Vitest**

Arquivo `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  test: {
    environment: "happy-dom",
  },
});
```

- [ ] **Step 4.2: Escrever teste primeiro**

Arquivo `tests/anchor.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { buildAnchor, resolveAnchor } from "../src/lib/anchor";

describe("anchor", () => {
  it("buildAnchor retorna selector + offsets pra elemento clicado", () => {
    document.body.innerHTML = `
      <main>
        <section id="hero"><h1>Boost Productivity</h1></section>
      </main>
    `;
    const h1 = document.querySelector("h1")!;
    // mocka getBoundingClientRect
    h1.getBoundingClientRect = () =>
      ({ left: 100, top: 200, width: 200, height: 50 }) as DOMRect;

    const anchor = buildAnchor(h1, { clientX: 180, clientY: 230 });

    expect(anchor.selector).toContain("h1");
    expect(anchor.offsetX).toBeCloseTo(0.4, 1);
    expect(anchor.offsetY).toBeCloseTo(0.6, 1);
    expect(anchor.textSnippet).toBe("Boost Productivity");
  });

  it("resolveAnchor encontra elemento e retorna posição absoluta", () => {
    document.body.innerHTML = `<h1>X</h1>`;
    const h1 = document.querySelector("h1")!;
    h1.getBoundingClientRect = () =>
      ({ left: 100, top: 200, width: 200, height: 50 }) as DOMRect;

    const pos = resolveAnchor({
      selector: "h1",
      offsetX: 0.5,
      offsetY: 0.5,
      textSnippet: "X",
    });

    expect(pos).toEqual({ x: 200, y: 225 });
  });

  it("resolveAnchor retorna null se elemento não existe", () => {
    document.body.innerHTML = `<p>Nada aqui</p>`;
    const pos = resolveAnchor({
      selector: "h1.ghost",
      offsetX: 0.5,
      offsetY: 0.5,
      textSnippet: "Gone",
    });
    expect(pos).toBeNull();
  });
});
```

- [ ] **Step 4.3: Rodar o teste e confirmar que falha**

```bash
npm test 2>&1 | tail -10
```

Expected: falha com `Cannot find module '../src/lib/anchor'`.

- [ ] **Step 4.4: Implementar anchor.ts**

Arquivo `src/lib/anchor.ts`:

```ts
export interface Anchor {
  selector: string;
  offsetX: number;
  offsetY: number;
  textSnippet: string;
}

function getStableSelector(el: Element): string {
  if (el.id) return `#${CSS.escape(el.id)}`;
  const parts: string[] = [];
  let current: Element | null = el;
  while (current && current.tagName.toLowerCase() !== "html") {
    const tag = current.tagName.toLowerCase();
    const parent = current.parentElement;
    if (!parent) {
      parts.unshift(tag);
      break;
    }
    const siblings = Array.from(parent.children).filter(
      (c) => c.tagName === current!.tagName,
    );
    const idx = siblings.indexOf(current) + 1;
    parts.unshift(siblings.length > 1 ? `${tag}:nth-of-type(${idx})` : tag);
    current = parent;
  }
  return parts.join(" > ");
}

export function buildAnchor(
  el: Element,
  click: { clientX: number; clientY: number },
): Anchor {
  const rect = el.getBoundingClientRect();
  const offsetX = rect.width > 0 ? (click.clientX - rect.left) / rect.width : 0;
  const offsetY = rect.height > 0 ? (click.clientY - rect.top) / rect.height : 0;
  const textSnippet = (el.textContent ?? "").trim().slice(0, 100);
  return {
    selector: getStableSelector(el),
    offsetX: Math.max(0, Math.min(1, offsetX)),
    offsetY: Math.max(0, Math.min(1, offsetY)),
    textSnippet,
  };
}

export function resolveAnchor(
  anchor: Anchor,
): { x: number; y: number } | null {
  const el = document.querySelector(anchor.selector);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width * anchor.offsetX,
    y: rect.top + rect.height * anchor.offsetY,
  };
}
```

- [ ] **Step 4.5: Rodar testes e confirmar passam**

```bash
npm test 2>&1 | tail -10
```

Expected: `Test Files  1 passed`, 3 assertions passando.

- [ ] **Step 4.6: Commit**

```bash
git add src/lib/anchor.ts tests/anchor.test.ts vitest.config.ts
git commit -m "feat: anchor utility (DOM element + offset)"
git push
```

---

## Task 5: Supabase client + auth helpers

**Files:**
- Create: `src/lib/supabase.ts`
- Create: `src/lib/auth.ts`

- [ ] **Step 5.1: supabase.ts**

Arquivo `src/lib/supabase.ts`:

```ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../config";

export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
      storageKey: "scw-auth-session",
    },
  },
);

export interface CommentRow {
  id: string;
  site_id: string;
  session_id: string | null;
  author_email: string;
  body: string;
  page_url: string;
  anchor_selector: string;
  anchor_offset_x: number;
  anchor_offset_y: number;
  anchor_text_snippet: string | null;
  viewport_width: number;
  status: "open" | "resolved" | "reopened";
  created_at: string;
  resolved_at: string | null;
}

export interface ReplyRow {
  id: string;
  comment_id: string;
  author_email: string;
  body: string;
  source: "human" | "claude-code";
  commit_sha: string | null;
  created_at: string;
}
```

- [ ] **Step 5.2: auth.ts**

Arquivo `src/lib/auth.ts`:

```ts
import { supabase } from "./supabase";
import type { Session } from "@supabase/supabase-js";

export async function sendMagicLink(email: string): Promise<void> {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.href,
    },
  });
  if (error) throw error;
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export async function getSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthStateChange(cb: (session: Session | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => cb(session));
}

export async function isMember(siteId: string, email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("site_members")
    .select("email")
    .eq("site_id", siteId)
    .eq("email", email.toLowerCase())
    .maybeSingle();
  if (error) return false;
  return data !== null;
}
```

- [ ] **Step 5.3: Commit**

```bash
git add src/lib/supabase.ts src/lib/auth.ts
git commit -m "feat: supabase client + auth helpers (magic link)"
git push
```

---

## Task 6: Hook use-session + use-threads

**Files:**
- Create: `src/hooks/use-session.ts`
- Create: `src/hooks/use-threads.ts`

- [ ] **Step 6.1: use-session.ts**

Arquivo `src/hooks/use-session.ts`:

```ts
import { useEffect, useState } from "preact/hooks";
import type { Session } from "@supabase/supabase-js";
import { getSession, onAuthStateChange } from "../lib/auth";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getSession().then((s) => {
      if (!mounted) return;
      setSession(s);
      setLoading(false);
    });
    const { data: sub } = onAuthStateChange((s) => setSession(s));
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
}
```

- [ ] **Step 6.2: use-threads.ts**

Arquivo `src/hooks/use-threads.ts`:

```ts
import { useEffect, useState, useCallback } from "preact/hooks";
import { supabase, type CommentRow } from "../lib/supabase";

export function useThreads(siteId: string, pageUrl: string) {
  const [threads, setThreads] = useState<CommentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("site_id", siteId)
      .eq("page_url", pageUrl)
      .order("created_at", { ascending: true });
    if (error) setError(error.message);
    else setThreads((data as CommentRow[]) ?? []);
    setLoading(false);
  }, [siteId, pageUrl]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { threads, loading, error, reload };
}
```

- [ ] **Step 6.3: Commit**

```bash
git add src/hooks/
git commit -m "feat: use-session + use-threads preact hooks"
git push
```

---

## Task 7: Entrypoint — injeção no host (Shadow DOM + mount Preact)

**Files:**
- Modify: `src/index.ts`
- Create: `src/app.tsx`
- Modify: `index.html` (dev)

- [ ] **Step 7.1: Substituir src/index.ts**

```ts
import { render, h } from "preact";
import { App } from "./app";
import tailwindCSS from "./styles/tailwind.css?inline";

const CONTAINER_ID = "scw-root";

function getSiteId(): string | null {
  const current = document.currentScript as HTMLScriptElement | null;
  if (current?.dataset.siteId) return current.dataset.siteId;
  const any = document.querySelector<HTMLScriptElement>(
    "script[data-site-id]",
  );
  return any?.dataset.siteId ?? null;
}

function mount() {
  if (document.getElementById(CONTAINER_ID)) return;
  const siteId = getSiteId();
  if (!siteId) {
    console.warn("[review-widget] missing data-site-id, skipping mount");
    return;
  }

  const host = document.createElement("div");
  host.id = CONTAINER_ID;
  host.style.all = "initial";
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: "open" });
  const styleEl = document.createElement("style");
  styleEl.textContent = tailwindCSS;
  shadow.appendChild(styleEl);

  const appRoot = document.createElement("div");
  shadow.appendChild(appRoot);

  render(h(App, { siteId }), appRoot);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
```

- [ ] **Step 7.2: src/app.tsx com stub inicial**

```tsx
import { h } from "preact";
import { useSession } from "./hooks/use-session";

interface AppProps {
  siteId: string;
}

export function App({ siteId }: AppProps) {
  const { session, loading } = useSession();
  const reviewMode =
    new URLSearchParams(window.location.search).has("review") ||
    session !== null;

  if (!reviewMode) return null;
  if (loading) return null;

  return (
    <div class="fixed bottom-4 right-4 bg-brand-600 text-white px-4 py-2 rounded-lg shadow-lg font-sans">
      {session ? `[${siteId}] logged in as ${session.user.email}` : "Review mode — not logged in"}
    </div>
  );
}
```

- [ ] **Step 7.3: index.html de dev que carrega o widget**

Substituir `index.html`:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>review-widget dev</title>
  </head>
  <body style="font-family: system-ui; padding: 2rem;">
    <main>
      <section>
        <h1>Host Site (dev)</h1>
        <p>Essa página é o host de desenvolvimento do widget.</p>
        <p>Adicione <code>?review=1</code> na URL pra ativar o review mode.</p>
        <button id="b">Botão qualquer</button>
      </section>
    </main>
    <script type="module" src="/src/index.ts" data-site-id="wespa"></script>
  </body>
</html>
```

- [ ] **Step 7.4: Rodar dev e testar**

```bash
npm run dev
```

Abrir `http://localhost:5173/?review=1` no browser. Expected: canto inferior direito mostra "Review mode — not logged in".

- [ ] **Step 7.5: Commit**

```bash
git add src/index.ts src/app.tsx index.html
git commit -m "feat: shadow DOM injection + preact mount + review mode gate"
git push
```

---

## Task 8: LoginForm (magic link UI)

**Files:**
- Create: `src/components/LoginForm.tsx`
- Create: `src/components/ui/Button.tsx`
- Modify: `src/app.tsx`

- [ ] **Step 8.1: Button atom**

Arquivo `src/components/ui/Button.tsx`:

```tsx
import { h, ComponentChildren } from "preact";
import { JSX } from "preact";

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  children: ComponentChildren;
}

export function Button({
  variant = "primary",
  children,
  class: className = "",
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 text-sm font-medium rounded-md px-3 py-2 transition-colors disabled:opacity-50";
  const styles = {
    primary: "bg-brand-600 text-white hover:bg-brand-700",
    ghost: "bg-transparent text-gray-900 hover:bg-gray-100",
  };
  return (
    <button class={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
```

- [ ] **Step 8.2: LoginForm.tsx**

```tsx
import { h } from "preact";
import { useState } from "preact/hooks";
import { sendMagicLink } from "../lib/auth";
import { Button } from "./ui/Button";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: Event) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      await sendMagicLink(email.trim().toLowerCase());
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div class="p-4 bg-white rounded-lg shadow-lg max-w-sm border border-gray-200">
        <p class="text-sm text-gray-700">
          Link enviado pra <strong>{email}</strong>. Abra o email e clique no link pra entrar.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      class="p-4 bg-white rounded-lg shadow-lg max-w-sm border border-gray-200 flex flex-col gap-3"
    >
      <h3 class="text-sm font-semibold text-gray-900">Review mode</h3>
      <p class="text-xs text-gray-600">
        Digite seu email pra receber um link de acesso.
      </p>
      <input
        type="email"
        required
        value={email}
        onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
        placeholder="seu@email.com"
        class="border border-gray-300 rounded-md px-3 py-2 text-sm"
        disabled={status === "sending"}
      />
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : "Enviar link"}
      </Button>
      {error && <p class="text-xs text-red-600">{error}</p>}
    </form>
  );
}
```

- [ ] **Step 8.3: Atualizar src/app.tsx**

```tsx
import { h } from "preact";
import { useSession } from "./hooks/use-session";
import { LoginForm } from "./components/LoginForm";

interface AppProps {
  siteId: string;
}

export function App({ siteId }: AppProps) {
  const { session, loading } = useSession();
  const reviewMode =
    new URLSearchParams(window.location.search).has("review") ||
    session !== null;

  if (!reviewMode || loading) return null;

  if (!session) {
    return (
      <div class="fixed bottom-4 right-4 font-sans">
        <LoginForm />
      </div>
    );
  }

  return (
    <div class="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-2 font-sans text-sm">
      Logged in as <strong>{session.user.email}</strong> on site <strong>{siteId}</strong>
    </div>
  );
}
```

- [ ] **Step 8.4: Testar fluxo de login**

```bash
npm run dev
```

Abrir `http://localhost:5173/?review=1`. Preencher email `nikollas@sanches.io`, clicar enviar. Expected: UI mostra "Link enviado". Email chega (se Resend já estiver ativo; se não, só o magic link do Supabase chega).

- [ ] **Step 8.5: Commit**

```bash
git add src/components/
git commit -m "feat: login form with magic link"
git push
```

---

## Task 9: FloatingButton + Sidebar esqueleto

**Files:**
- Create: `src/components/FloatingButton.tsx`
- Create: `src/components/Sidebar.tsx`
- Create: `src/components/ThreadItem.tsx`
- Modify: `src/app.tsx`

- [ ] **Step 9.1: FloatingButton.tsx**

```tsx
import { h } from "preact";

interface Props {
  count: number;
  onClick: () => void;
}

export function FloatingButton({ count, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label="Abrir review"
      class="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-brand-600 text-white shadow-lg hover:bg-brand-700 flex items-center justify-center font-sans"
    >
      <span aria-hidden>💬</span>
      {count > 0 && (
        <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 min-w-[1.25rem] px-1 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}
```

- [ ] **Step 9.2: ThreadItem.tsx**

```tsx
import { h } from "preact";
import type { CommentRow } from "../lib/supabase";

interface Props {
  thread: CommentRow;
  onClick: () => void;
  active?: boolean;
}

export function ThreadItem({ thread, onClick, active }: Props) {
  const isOpen = thread.status !== "resolved";
  return (
    <button
      onClick={onClick}
      class={`w-full text-left p-3 border-b border-gray-100 hover:bg-gray-50 ${
        active ? "bg-brand-50" : ""
      }`}
    >
      <div class="flex items-center justify-between gap-2">
        <strong class="text-xs text-gray-900 truncate">{thread.author_email}</strong>
        <span
          class={`text-[10px] px-1.5 py-0.5 rounded-full ${
            isOpen ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
          }`}
        >
          {isOpen ? "open" : "resolved"}
        </span>
      </div>
      <p class="text-sm text-gray-700 mt-1 line-clamp-2">{thread.body}</p>
      {thread.anchor_text_snippet && (
        <p class="text-[11px] text-gray-500 mt-1 truncate italic">
          "{thread.anchor_text_snippet}"
        </p>
      )}
    </button>
  );
}
```

- [ ] **Step 9.3: Sidebar.tsx**

```tsx
import { h } from "preact";
import { useState } from "preact/hooks";
import type { CommentRow } from "../lib/supabase";
import { ThreadItem } from "./ThreadItem";
import { Button } from "./ui/Button";

interface Props {
  threads: CommentRow[];
  onClose: () => void;
  onSelectThread: (id: string) => void;
  onCreateClick: () => void;
  activeThreadId: string | null;
  userEmail: string;
  onSignOut: () => void;
}

export function Sidebar({
  threads,
  onClose,
  onSelectThread,
  onCreateClick,
  activeThreadId,
  userEmail,
  onSignOut,
}: Props) {
  const [tab, setTab] = useState<"open" | "resolved">("open");
  const filtered = threads.filter((t) =>
    tab === "open" ? t.status !== "resolved" : t.status === "resolved",
  );

  return (
    <aside class="fixed right-0 top-0 bottom-0 w-[360px] bg-white border-l border-gray-200 shadow-2xl flex flex-col font-sans z-10">
      <header class="p-3 border-b border-gray-200 flex items-center justify-between">
        <strong class="text-sm">Reviews</strong>
        <button
          onClick={onClose}
          class="text-gray-500 hover:text-gray-900 text-xs"
          aria-label="Fechar"
        >
          ✕
        </button>
      </header>

      <div class="p-3 flex items-center justify-between gap-2 border-b border-gray-100">
        <Button onClick={onCreateClick} class="flex-1">
          + Novo comentário
        </Button>
      </div>

      <div class="flex border-b border-gray-200">
        <button
          onClick={() => setTab("open")}
          class={`flex-1 text-xs py-2 ${
            tab === "open" ? "border-b-2 border-brand-600 font-semibold" : "text-gray-600"
          }`}
        >
          Abertos
        </button>
        <button
          onClick={() => setTab("resolved")}
          class={`flex-1 text-xs py-2 ${
            tab === "resolved" ? "border-b-2 border-brand-600 font-semibold" : "text-gray-600"
          }`}
        >
          Resolvidos
        </button>
      </div>

      <div class="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <p class="p-4 text-xs text-gray-500">Nenhum comentário.</p>
        )}
        {filtered.map((t) => (
          <ThreadItem
            key={t.id}
            thread={t}
            onClick={() => onSelectThread(t.id)}
            active={activeThreadId === t.id}
          />
        ))}
      </div>

      <footer class="p-3 border-t border-gray-200 text-xs text-gray-600 flex items-center justify-between">
        <span class="truncate">{userEmail}</span>
        <button onClick={onSignOut} class="text-brand-600 hover:underline">
          sair
        </button>
      </footer>
    </aside>
  );
}
```

- [ ] **Step 9.4: Atualizar src/app.tsx pra orquestrar sidebar + botão**

```tsx
import { h } from "preact";
import { useState } from "preact/hooks";
import { useSession } from "./hooks/use-session";
import { useThreads } from "./hooks/use-threads";
import { LoginForm } from "./components/LoginForm";
import { FloatingButton } from "./components/FloatingButton";
import { Sidebar } from "./components/Sidebar";
import { signOut } from "./lib/auth";

interface AppProps {
  siteId: string;
}

export function App({ siteId }: AppProps) {
  const { session, loading } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const pageUrl = window.location.pathname + window.location.search;
  const { threads, reload } = useThreads(siteId, pageUrl);

  const reviewMode =
    new URLSearchParams(window.location.search).has("review") ||
    session !== null;
  if (!reviewMode || loading) return null;
  if (!session) {
    return <div class="fixed bottom-4 right-4 font-sans"><LoginForm /></div>;
  }

  const openCount = threads.filter((t) => t.status !== "resolved").length;

  return (
    <div>
      {!sidebarOpen && (
        <FloatingButton count={openCount} onClick={() => setSidebarOpen(true)} />
      )}
      {sidebarOpen && (
        <Sidebar
          threads={threads}
          onClose={() => setSidebarOpen(false)}
          onSelectThread={(id) => setActiveThreadId(id)}
          onCreateClick={() => {
            // TODO Task 10: entrar em modo criar pin
            alert("Modo criar pin — implementado na Task 10");
          }}
          activeThreadId={activeThreadId}
          userEmail={session.user.email ?? ""}
          onSignOut={signOut}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 9.5: Testar**

```bash
npm run dev
```

Abrir com `?review=1`, logar. Expected: botão flutuante aparece. Clicar → abre sidebar. Clicar ✕ → fecha.

- [ ] **Step 9.6: Commit**

```bash
git add src/components/ src/app.tsx
git commit -m "feat: floating button + sidebar with open/resolved tabs"
git push
```

---

## Task 10: CreatePinMode + PinOverlay + Pin

**Files:**
- Create: `src/components/CreatePinMode.tsx`
- Create: `src/components/PinOverlay.tsx`
- Create: `src/components/Pin.tsx`
- Modify: `src/app.tsx`

- [ ] **Step 10.1: Pin.tsx**

```tsx
import { h } from "preact";

interface Props {
  x: number;
  y: number;
  number: number;
  resolved: boolean;
  onClick: () => void;
}

export function Pin({ x, y, number, resolved, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        left: `${x - 16}px`,
        top: `${y - 16}px`,
        zIndex: 9,
      }}
      class={`h-8 w-8 rounded-full text-xs font-bold text-white shadow-md border-2 border-white ${
        resolved ? "bg-gray-400" : "bg-brand-600"
      }`}
    >
      {number}
    </button>
  );
}
```

- [ ] **Step 10.2: PinOverlay.tsx**

```tsx
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { resolveAnchor } from "../lib/anchor";
import type { CommentRow } from "../lib/supabase";
import { Pin } from "./Pin";

interface Props {
  threads: CommentRow[];
  onSelectThread: (id: string) => void;
}

export function PinOverlay({ threads, onSelectThread }: Props) {
  const [, setTick] = useState(0);

  useEffect(() => {
    function onChange() {
      setTick((t) => t + 1);
    }
    window.addEventListener("resize", onChange);
    window.addEventListener("scroll", onChange, true);
    return () => {
      window.removeEventListener("resize", onChange);
      window.removeEventListener("scroll", onChange, true);
    };
  }, []);

  return (
    <div>
      {threads.map((t, idx) => {
        const pos = resolveAnchor({
          selector: t.anchor_selector,
          offsetX: t.anchor_offset_x,
          offsetY: t.anchor_offset_y,
          textSnippet: t.anchor_text_snippet ?? "",
        });
        if (!pos) return null;
        return (
          <Pin
            key={t.id}
            x={pos.x}
            y={pos.y}
            number={idx + 1}
            resolved={t.status === "resolved"}
            onClick={() => onSelectThread(t.id)}
          />
        );
      })}
    </div>
  );
}
```

- [ ] **Step 10.3: CreatePinMode.tsx**

```tsx
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { buildAnchor, type Anchor } from "../lib/anchor";

interface Props {
  onCancel: () => void;
  onCreate: (anchor: Anchor, body: string) => Promise<void>;
}

export function CreatePinMode({ onCancel, onCreate }: Props) {
  const [clickedAnchor, setClickedAnchor] = useState<Anchor | null>(null);
  const [clickPos, setClickPos] = useState<{ x: number; y: number } | null>(null);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  function onHostClick(e: MouseEvent) {
    if (clickedAnchor) return;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el) return;
    const anchor = buildAnchor(el, e);
    setClickedAnchor(anchor);
    setClickPos({ x: e.clientX, y: e.clientY });
    e.stopPropagation();
    e.preventDefault();
  }

  useEffect(() => {
    window.addEventListener("click", onHostClick, true);
    document.body.style.cursor = "crosshair";
    return () => {
      window.removeEventListener("click", onHostClick, true);
      document.body.style.cursor = "";
    };
  }, [clickedAnchor]);

  async function onSubmit(e: Event) {
    e.preventDefault();
    if (!clickedAnchor || !body.trim()) return;
    setBusy(true);
    try {
      await onCreate(clickedAnchor, body.trim());
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div class="fixed inset-0 bg-black/10 pointer-events-none z-[8]" />
      <div class="fixed top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-md shadow-lg z-20">
        Clique onde quer comentar · ESC cancela
      </div>
      {clickPos && clickedAnchor && (
        <div
          style={{
            position: "fixed",
            left: `${clickPos.x}px`,
            top: `${clickPos.y + 20}px`,
            zIndex: 21,
          }}
          class="bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-[260px]"
        >
          <form onSubmit={onSubmit} class="flex flex-col gap-2">
            <textarea
              value={body}
              onInput={(e) => setBody((e.target as HTMLTextAreaElement).value)}
              placeholder="Seu comentário..."
              rows={3}
              class="border border-gray-300 rounded-md px-2 py-1 text-sm resize-none"
              autofocus
              disabled={busy}
            />
            <div class="flex justify-end gap-2">
              <button
                type="button"
                onClick={onCancel}
                class="text-xs text-gray-600 hover:text-gray-900"
                disabled={busy}
              >
                cancelar
              </button>
              <button
                type="submit"
                class="text-xs bg-brand-600 text-white px-3 py-1 rounded-md hover:bg-brand-700 disabled:opacity-50"
                disabled={busy || !body.trim()}
              >
                {busy ? "enviando..." : "enviar"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 10.4: Wire do CreatePinMode + PinOverlay no App**

Substituir `src/app.tsx`:

```tsx
import { h } from "preact";
import { useState } from "preact/hooks";
import { useSession } from "./hooks/use-session";
import { useThreads } from "./hooks/use-threads";
import { LoginForm } from "./components/LoginForm";
import { FloatingButton } from "./components/FloatingButton";
import { Sidebar } from "./components/Sidebar";
import { PinOverlay } from "./components/PinOverlay";
import { CreatePinMode } from "./components/CreatePinMode";
import { signOut } from "./lib/auth";
import { supabase } from "./lib/supabase";
import type { Anchor } from "./lib/anchor";

interface AppProps {
  siteId: string;
}

export function App({ siteId }: AppProps) {
  const { session, loading } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const pageUrl = window.location.pathname + window.location.search;
  const { threads, reload } = useThreads(siteId, pageUrl);

  const reviewMode =
    new URLSearchParams(window.location.search).has("review") ||
    session !== null;
  if (!reviewMode || loading) return null;
  if (!session) {
    return <div class="fixed bottom-4 right-4 font-sans"><LoginForm /></div>;
  }

  const openCount = threads.filter((t) => t.status !== "resolved").length;

  async function handleCreate(anchor: Anchor, body: string) {
    const email = session!.user.email!;
    const { error } = await supabase.from("comments").insert({
      site_id: siteId,
      author_email: email,
      body,
      page_url: pageUrl,
      anchor_selector: anchor.selector,
      anchor_offset_x: anchor.offsetX,
      anchor_offset_y: anchor.offsetY,
      anchor_text_snippet: anchor.textSnippet,
      viewport_width: window.innerWidth,
    });
    if (error) {
      alert(`Erro: ${error.message}`);
      return;
    }
    setCreating(false);
    await reload();
    setSidebarOpen(true);
  }

  return (
    <div>
      <PinOverlay threads={threads} onSelectThread={(id) => {
        setActiveThreadId(id);
        setSidebarOpen(true);
      }} />

      {!sidebarOpen && !creating && (
        <FloatingButton count={openCount} onClick={() => setSidebarOpen(true)} />
      )}

      {sidebarOpen && (
        <Sidebar
          threads={threads}
          onClose={() => setSidebarOpen(false)}
          onSelectThread={setActiveThreadId}
          onCreateClick={() => {
            setSidebarOpen(false);
            setCreating(true);
          }}
          activeThreadId={activeThreadId}
          userEmail={session.user.email ?? ""}
          onSignOut={signOut}
        />
      )}

      {creating && (
        <CreatePinMode
          onCancel={() => setCreating(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 10.5: Testar fluxo completo**

```bash
npm run dev
```

Logar → botão flutuante → abrir sidebar → "+ Novo comentário" → clicar num elemento → comentar → enviar. Expected: comment aparece na sidebar + pin aparece na tela.

- [ ] **Step 10.6: Commit**

```bash
git add src/components/ src/app.tsx
git commit -m "feat: create pin mode + pin overlay with anchor resolution"
git push
```

---

## Task 11: ThreadDetail (replies + input + resolve)

**Files:**
- Create: `src/components/ThreadDetail.tsx`
- Modify: `src/components/Sidebar.tsx`

- [ ] **Step 11.1: ThreadDetail.tsx**

```tsx
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import type { CommentRow, ReplyRow } from "../lib/supabase";
import { supabase } from "../lib/supabase";
import { Button } from "./ui/Button";

interface Props {
  thread: CommentRow;
  userEmail: string;
  onBack: () => void;
  onChange: () => void;
}

export function ThreadDetail({ thread, userEmail, onBack, onChange }: Props) {
  const [replies, setReplies] = useState<ReplyRow[]>([]);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    const { data } = await supabase
      .from("replies")
      .select("*")
      .eq("comment_id", thread.id)
      .order("created_at", { ascending: true });
    setReplies((data as ReplyRow[]) ?? []);
  }

  useEffect(() => {
    void load();
  }, [thread.id]);

  async function onSubmit(e: Event) {
    e.preventDefault();
    if (!body.trim()) return;
    setBusy(true);
    const { error } = await supabase.from("replies").insert({
      comment_id: thread.id,
      author_email: userEmail,
      body: body.trim(),
      source: "human",
    });
    if (!error) {
      setBody("");
      await load();
    } else {
      alert(error.message);
    }
    setBusy(false);
  }

  async function onResolve() {
    setBusy(true);
    const newStatus = thread.status === "resolved" ? "open" : "resolved";
    const { error } = await supabase
      .from("comments")
      .update({
        status: newStatus,
        resolved_at: newStatus === "resolved" ? new Date().toISOString() : null,
      })
      .eq("id", thread.id);
    if (!error) {
      onChange();
    }
    setBusy(false);
  }

  return (
    <div class="flex flex-col h-full">
      <header class="p-3 border-b border-gray-200 flex items-center gap-2">
        <button onClick={onBack} class="text-xs text-gray-600 hover:text-gray-900">
          ← voltar
        </button>
      </header>

      <div class="flex-1 overflow-y-auto">
        <div class="p-3 border-b border-gray-100">
          <p class="text-xs text-gray-500">{thread.author_email}</p>
          <p class="text-sm text-gray-900 mt-1">{thread.body}</p>
        </div>

        {replies.map((r) => (
          <div key={r.id} class="p-3 border-b border-gray-100">
            <p class="text-xs text-gray-500">
              {r.author_email}
              {r.source === "claude-code" && (
                <span class="ml-2 bg-purple-100 text-purple-800 text-[10px] px-1 rounded">
                  claude
                </span>
              )}
            </p>
            <p class="text-sm text-gray-900 mt-1">{r.body}</p>
            {r.commit_sha && (
              <p class="text-[11px] text-gray-500 mt-1">
                commit <code>{r.commit_sha.slice(0, 7)}</code>
              </p>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} class="p-3 border-t border-gray-200 flex flex-col gap-2">
        <textarea
          value={body}
          onInput={(e) => setBody((e.target as HTMLTextAreaElement).value)}
          placeholder="Responder..."
          rows={2}
          class="border border-gray-300 rounded-md px-2 py-1 text-sm resize-none"
          disabled={busy}
        />
        <div class="flex gap-2">
          <Button type="submit" disabled={busy || !body.trim()} class="flex-1">
            enviar
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={onResolve}
            disabled={busy}
          >
            {thread.status === "resolved" ? "reabrir" : "resolver"}
          </Button>
        </div>
      </form>
    </div>
  );
}
```

- [ ] **Step 11.2: Integrar ThreadDetail no Sidebar**

Substituir `src/components/Sidebar.tsx`:

```tsx
import { h } from "preact";
import { useState } from "preact/hooks";
import type { CommentRow } from "../lib/supabase";
import { ThreadItem } from "./ThreadItem";
import { ThreadDetail } from "./ThreadDetail";
import { Button } from "./ui/Button";

interface Props {
  threads: CommentRow[];
  onClose: () => void;
  onCreateClick: () => void;
  activeThreadId: string | null;
  setActiveThreadId: (id: string | null) => void;
  userEmail: string;
  onSignOut: () => void;
  onReload: () => void;
}

export function Sidebar({
  threads,
  onClose,
  onCreateClick,
  activeThreadId,
  setActiveThreadId,
  userEmail,
  onSignOut,
  onReload,
}: Props) {
  const [tab, setTab] = useState<"open" | "resolved">("open");
  const active = threads.find((t) => t.id === activeThreadId) ?? null;

  return (
    <aside class="fixed right-0 top-0 bottom-0 w-[360px] bg-white border-l border-gray-200 shadow-2xl flex flex-col font-sans z-10">
      {!active && (
        <>
          <header class="p-3 border-b border-gray-200 flex items-center justify-between">
            <strong class="text-sm">Reviews</strong>
            <button onClick={onClose} class="text-gray-500 hover:text-gray-900 text-xs" aria-label="Fechar">✕</button>
          </header>

          <div class="p-3 border-b border-gray-100">
            <Button onClick={onCreateClick} class="w-full">+ Novo comentário</Button>
          </div>

          <div class="flex border-b border-gray-200">
            <button onClick={() => setTab("open")} class={`flex-1 text-xs py-2 ${tab === "open" ? "border-b-2 border-brand-600 font-semibold" : "text-gray-600"}`}>Abertos</button>
            <button onClick={() => setTab("resolved")} class={`flex-1 text-xs py-2 ${tab === "resolved" ? "border-b-2 border-brand-600 font-semibold" : "text-gray-600"}`}>Resolvidos</button>
          </div>

          <div class="flex-1 overflow-y-auto">
            {threads
              .filter((t) => (tab === "open" ? t.status !== "resolved" : t.status === "resolved"))
              .map((t) => (
                <ThreadItem
                  key={t.id}
                  thread={t}
                  onClick={() => setActiveThreadId(t.id)}
                  active={activeThreadId === t.id}
                />
              ))}
            {threads.filter((t) => (tab === "open" ? t.status !== "resolved" : t.status === "resolved")).length === 0 && (
              <p class="p-4 text-xs text-gray-500">Nenhum comentário.</p>
            )}
          </div>

          <footer class="p-3 border-t border-gray-200 text-xs text-gray-600 flex items-center justify-between">
            <span class="truncate">{userEmail}</span>
            <button onClick={onSignOut} class="text-brand-600 hover:underline">sair</button>
          </footer>
        </>
      )}

      {active && (
        <ThreadDetail
          thread={active}
          userEmail={userEmail}
          onBack={() => setActiveThreadId(null)}
          onChange={onReload}
        />
      )}
    </aside>
  );
}
```

- [ ] **Step 11.3: Atualizar App pra passar `setActiveThreadId` e `onReload`**

No `src/app.tsx`, substituir o JSX da Sidebar por:

```tsx
<Sidebar
  threads={threads}
  onClose={() => setSidebarOpen(false)}
  onCreateClick={() => {
    setSidebarOpen(false);
    setCreating(true);
  }}
  activeThreadId={activeThreadId}
  setActiveThreadId={setActiveThreadId}
  userEmail={session.user.email ?? ""}
  onSignOut={signOut}
  onReload={reload}
/>
```

- [ ] **Step 11.4: Testar**

```bash
npm run dev
```

Clicar num thread → abre detail. Responder → aparece. Resolver → status muda + pin fica cinza.

- [ ] **Step 11.5: Commit**

```bash
git add src/components/ src/app.tsx
git commit -m "feat: thread detail with replies, resolve and reopen"
git push
```

---

## Task 12: Keyboard shortcut (tecla C ativa modo pin)

**Files:**
- Modify: `src/app.tsx`

- [ ] **Step 12.1: Adicionar listener de teclado no App**

Dentro de `App`, antes do `return`, adicionar:

```tsx
useEffect(() => {
  function onKey(e: KeyboardEvent) {
    if (e.key !== "c" && e.key !== "C") return;
    const t = e.target as HTMLElement | null;
    const tag = t?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || t?.isContentEditable) return;
    setSidebarOpen(false);
    setCreating(true);
  }
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, []);
```

Não esquecer de importar `useEffect`:

```tsx
import { useEffect, useState } from "preact/hooks";
```

- [ ] **Step 12.2: Testar**

```bash
npm run dev
```

Logado, apertar C → entra em modo criar pin. Dentro de input/textarea, C NÃO ativa.

- [ ] **Step 12.3: Commit**

```bash
git add src/app.tsx
git commit -m "feat: C keyboard shortcut toggles create mode"
git push
```

---

## Task 13: GitHub Actions + Cloudflare Pages deploy

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `wrangler.toml`

- [ ] **Step 13.1: Criar Cloudflare Pages project manualmente**

No dashboard Cloudflare:
1. Workers & Pages > Create > Pages > Connect to Git
2. Selecionar repo `SANCHES-IO/review-widget`, branch `main`
3. Build settings:
   - Build command: `npm run build`
   - Build output: `dist`
4. Env vars:
   - `VITE_SUPABASE_URL` = `https://rmrtndvblnsvogifxisr.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `<anon key completa>`
5. Save → primeiro deploy roda automaticamente

Expected: deploy em ~1min, URL tipo `review-widget.pages.dev`.

- [ ] **Step 13.2: Custom domain review.sanches.io**

No projeto Cloudflare Pages criado:
1. Custom domains > Set up a custom domain
2. Domain: `review.sanches.io`
3. Cloudflare auto-cria CNAME porque o DNS já está no Cloudflare

Expected: após propagação (~5 min), `https://review.sanches.io/widget.js` serve o bundle.

- [ ] **Step 13.3: Smoke test do CDN**

```bash
curl -sI https://review.sanches.io/widget.js | head -5
curl -s https://review.sanches.io/widget.js | head -c 200
```

Expected: `200 OK`, `content-type: application/javascript`, primeiras linhas mostram `(function(){"use strict";` (IIFE).

- [ ] **Step 13.4: Commit config (se tiver algum adicionado)**

```bash
# Se criou wrangler.toml ou workflow, commita. Caso use só UI do Cloudflare,
# não tem nada a commitar nesta task.
git status
```

---

## Task 14: Atualizar README

**Files:**
- Modify: `README.md`

- [ ] **Step 14.1: README.md completo**

```markdown
# review-widget

Widget drop-in de review (pins + threads) estilo Figma.
Preact + Shadow DOM + Vite lib mode. Faz parte do projeto review-widget da Sanches.io.

## Embedar num site

```html
<script
  src="https://review.sanches.io/widget.js"
  data-site-id="SEU_SITE_ID"
  defer
></script>
```

O widget fica invisível por padrão. Pra ativar:
- Adicione `?review=1` na URL, OU
- Se o visitante já tem sessão (Supabase) e email está em `site_members`, aparece direto.

## Desenvolvimento

```bash
npm install
cp .env.example .env        # preencher VITE_SUPABASE_ANON_KEY
npm run dev                  # http://localhost:5173/?review=1
npm test                     # Vitest
npm run build                # dist/widget.js
```

## Stack

- Preact 10 + TypeScript
- Vite em lib mode (formato IIFE, um único bundle)
- Tailwind CSS (injetado como `<style>` no Shadow DOM)
- Supabase JS (auth magic link + DB + RLS)

## Arquitetura

- `src/index.ts` — entrypoint: cria `<div id="scw-root">`, attachShadow, monta Preact dentro
- `src/app.tsx` — orquestra sessão, sidebar, modo criar pin, overlay de pins
- `src/lib/anchor.ts` — serializa/deserializa pin (selector + offset)
- `src/lib/supabase.ts` — client + tipos
- `src/lib/auth.ts` — magic link + session listener
- `src/components/` — UI: FloatingButton, Sidebar, ThreadDetail, PinOverlay, CreatePinMode, LoginForm

## Limitações da v1

- Desktop only (oculto em <768px)
- Sem realtime (refresh manual — sidebar carrega ao abrir e após INSERT)
- Sem anexos / screenshot / menções
- Só pt-BR na UI

## Deploy

Cloudflare Pages, deploy automático em push pra `main`.
Custom domain: `review.sanches.io`.
Env vars no dashboard: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
```

- [ ] **Step 14.2: Commit**

```bash
git add README.md
git commit -m "docs: complete README with setup, stack, architecture"
git push
```

---

## Task 15: Integração no site WESPA (staging)

**Files:**
- Modify: `/Users/nikollasanches/Documents/wespa/src/app/layout.tsx`

- [ ] **Step 15.1: Descobrir onde o layout raiz do WESPA insere scripts**

```bash
cd /Users/nikollasanches/Documents/wespa
grep -n "Script\|<script" src/app/layout.tsx | head -10
```

- [ ] **Step 15.2: Adicionar o script tag (condicional pra staging)**

Editar `src/app/layout.tsx`. Dentro do `<body>`, ao final, adicionar:

```tsx
{/* Review widget — só em preview/staging pra não pesar em produção */}
{process.env.NEXT_PUBLIC_ENABLE_REVIEW === "1" && (
  <Script
    src="https://review.sanches.io/widget.js"
    data-site-id="wespa"
    strategy="afterInteractive"
  />
)}
```

Garantir que `import Script from "next/script";` está presente no topo do arquivo.

- [ ] **Step 15.3: Setar env var no Railway (staging only)**

No dashboard do Railway do WESPA, adicionar env var:
- `NEXT_PUBLIC_ENABLE_REVIEW` = `1`

(Em produção com DNS `wespa.hr` final, desabilita ou controla por env diferente.)

- [ ] **Step 15.4: Deploy**

```bash
cd /Users/nikollasanches/Documents/wespa
git add src/app/layout.tsx
git commit -m "feat: add review widget script (staging-only via env)"
git push origin master
```

Railway auto-deploy em ~1-2min.

- [ ] **Step 15.5: Smoke test no staging**

Abrir a URL do Railway do WESPA com `?review=1`. Expected: widget aparece (LoginForm). Logar com `nikollas@sanches.io` → aparece magic link no email.

---

## Task 16: Smoke test E2E manual

- [ ] **Step 16.1: Login → criar pin → comentar**

1. Abrir `https://luminous-wonder-production.up.railway.app/?review=1`
2. Logar com `nikollas@sanches.io`, clicar link no email
3. Retornar ao site, widget logado
4. Apertar C (ou clicar botão flutuante → "+ Novo comentário")
5. Clicar em algum elemento (ex: hero da home)
6. Escrever "teste da Fase 2 funcionando"
7. Enviar

Expected: pin aparece na tela + thread na sidebar.

- [ ] **Step 16.2: Responder thread**

1. Clicar no pin OU no thread na sidebar
2. Digitar resposta "confirmado"
3. Enviar

Expected: reply aparece abaixo do comment.

- [ ] **Step 16.3: Resolver thread**

1. Na thread aberta, clicar "resolver"

Expected: pin fica cinza, thread vai pra aba "Resolvidos".

- [ ] **Step 16.4: Verificar isolamento**

1. Abrir o site em aba anônima, sem logar
2. Adicionar `?review=1`

Expected: LoginForm aparece, mas ao logar com email NÃO whitelisted (teste com outro email pessoal), UI mostra "sem acesso" ou widget nunca ativa (RLS retorna vazio).

- [ ] **Step 16.5: Verificar no Supabase Dashboard**

Abrir `https://supabase.com/dashboard/project/rmrtndvblnsvogifxisr/editor`:
- Table `comments` → ver 1 linha inserida
- Table `replies` → ver 1 linha
- Verificar `anchor_selector` e `anchor_text_snippet` preenchidos

---

## Verificação final — Fase 2 completa

- [ ] Repo `SANCHES-IO/review-widget` criado e pushed
- [ ] `npm test` passa (3+ assertions em anchor)
- [ ] `npm run build` produz `dist/widget.js` (~40kb ± 10kb gz)
- [ ] `https://review.sanches.io/widget.js` retorna 200 + JS válido
- [ ] WESPA staging com `?review=1` mostra LoginForm
- [ ] Login por magic link funciona (email chega)
- [ ] Criar pin + comentar funciona (INSERT no Supabase)
- [ ] Pin aparece ancorado no elemento correto, resiste a resize
- [ ] Sidebar lista threads, tabs open/resolved funcionam
- [ ] Reply funciona (INSERT em replies)
- [ ] Resolve funciona (UPDATE status)
- [ ] Tecla `C` entra em modo criar pin
- [ ] Usuário não-whitelisted não vê dados de outros sites (RLS)

Após Fase 2 completa, seguir pra **Fase 3 — MCP server + slash commands Claude Code**.
