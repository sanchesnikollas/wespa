# Review Widget — Fase 3: MCP Server + Claude Code Integration

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** MCP server `review-mcp` que expõe tools pro Claude Code ler os comentários/threads do Supabase, responder em nome do Claude, resolver threads em lote e gerenciar review sessions — transformando o fluxo de review em comandos `/review start`, `/review status` executados direto no repo do site.

**Architecture:** Servidor MCP stdio-based em Node+TypeScript usando `@modelcontextprotocol/sdk`. Conecta ao Supabase com `service_role_key` (bypassa RLS — isolamento por `REVIEW_SITE_ID` passado via env var). Cada tool faz operação atômica no Postgres. Não toca em git — Claude Code comanda git, MCP só lê/escreve dados. Distribuído via `npx @sanches-io/review-mcp` pra zero-install em repos clientes.

**Tech Stack:** Node 20, TypeScript 5.7, @modelcontextprotocol/sdk ^1.0, @supabase/supabase-js ^2.47, zod ^3.23, tsx ^4 (dev), Vitest ^2 (testes).

**Spec pai:** `docs/superpowers/specs/2026-04-21-review-widget-design.md` seção 7.
**Plano anterior:** `docs/superpowers/plans/2026-04-21-review-widget-phase-2.md` (Fase 2 — widget).

---

## Pré-requisitos

- Supabase project `rmrtndvblnsvogifxisr` com schema da Fase 1
- **`SERVICE_ROLE_KEY`** do Supabase (no `~/Documents/review-supabase/.env`)
- Widget da Fase 2 em produção (pra ter dados de teste reais)
- Conta npm (opcional — só se for publicar publicamente). Alternativa: `npx github:SANCHES-IO/review-mcp`

## File Structure

```
review-mcp/                                 (novo repo SANCHES-IO/review-mcp)
├── .gitignore
├── .env.example
├── README.md
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts                            # entrypoint: monta MCP server + conecta stdio
│   ├── config.ts                           # env vars + validação
│   ├── supabase.ts                         # client com service_role
│   ├── types.ts                            # types de Comment/Reply/Session
│   ├── services/
│   │   ├── sites.ts                        # list_sites
│   │   ├── sessions.ts                     # list/get active/start/complete
│   │   ├── comments.ts                     # list open, get thread, resolve, batch
│   │   └── replies.ts                      # add reply
│   └── tools/
│       └── register.ts                     # registra todas as tools no server
├── tests/
│   ├── mock-supabase.ts                    # helper pra testes
│   └── services.test.ts                    # unit tests
└── templates/
    ├── .mcp.json                           # template pra embedar em site cliente
    └── review-slash-command.md             # template do /review
```

---

## Task 1: Criar repo e scaffold

- [ ] **Step 1.1: Criar repo GitHub**

```bash
cd ~/code
gh repo create SANCHES-IO/review-mcp \
  --private \
  --description "MCP server pro Claude Code processar reviews do review-widget em lote" \
  --clone
cd review-mcp
```

- [ ] **Step 1.2: Criar package.json**

Arquivo `package.json`:

```json
{
  "name": "@sanches-io/review-mcp",
  "version": "0.1.0",
  "type": "module",
  "description": "MCP server pro Claude Code processar reviews do review-widget",
  "bin": {
    "review-mcp": "dist/index.js"
  },
  "files": ["dist", "templates", "README.md"],
  "scripts": {
    "build": "tsc",
    "dev": "tsx watch src/index.ts",
    "start": "node dist/index.js",
    "test": "vitest run",
    "test:watch": "vitest",
    "prepublishOnly": "npm run build"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.4",
    "@supabase/supabase-js": "^2.47.10",
    "dotenv": "^16.4.7",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^22.10.2",
    "tsx": "^4.19.2",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  },
  "engines": {
    "node": ">=20"
  }
}
```

- [ ] **Step 1.3: Criar tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022"],
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "declaration": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "types": ["node"]
  },
  "include": ["src"],
  "exclude": ["dist", "node_modules", "tests"]
}
```

- [ ] **Step 1.4: .gitignore**

```
node_modules
dist
.env
.env.local
.DS_Store
*.tsbuildinfo
```

- [ ] **Step 1.5: .env.example**

```
# Credenciais do projeto Supabase central
SUPABASE_URL=https://rmrtndvblnsvogifxisr.supabase.co
SUPABASE_SERVICE_ROLE_KEY=

# Qual site este MCP está operando (injetado pelo .mcp.json)
REVIEW_SITE_ID=
```

- [ ] **Step 1.6: npm install + commit inicial**

```bash
npm install
git add package.json package-lock.json tsconfig.json .gitignore .env.example
git commit -m "chore: scaffold review-mcp (TypeScript MCP server)"
git branch -M main
git push -u origin main
```

---

## Task 2: Config module com validação

**Files:**
- Create: `src/config.ts`

- [ ] **Step 2.1: config.ts**

```ts
import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  REVIEW_SITE_ID: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("[review-mcp] config inválida:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = parsed.data;
```

- [ ] **Step 2.2: Commit**

```bash
git add src/config.ts
git commit -m "feat: env config validation with zod"
git push
```

---

## Task 3: Supabase client + tipos

**Files:**
- Create: `src/supabase.ts`
- Create: `src/types.ts`

- [ ] **Step 3.1: types.ts**

```ts
export interface Site {
  id: string;
  name: string;
  created_at: string;
}

export interface SiteMember {
  site_id: string;
  email: string;
  role: "designer" | "client";
  created_at: string;
}

export type SessionStatus = "active" | "in_progress" | "completed" | "archived";

export interface ReviewSession {
  id: string;
  site_id: string;
  name: string;
  status: SessionStatus;
  opened_at: string;
  closed_at: string | null;
  branch_name: string | null;
  pr_url: string | null;
  claude_run_at: string | null;
}

export type CommentStatus = "open" | "resolved" | "reopened";

export interface Comment {
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
  status: CommentStatus;
  created_at: string;
  resolved_at: string | null;
}

export interface Reply {
  id: string;
  comment_id: string;
  author_email: string;
  body: string;
  source: "human" | "claude-code";
  commit_sha: string | null;
  created_at: string;
}
```

- [ ] **Step 3.2: supabase.ts**

```ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { config } from "./config.js";

export const supabase: SupabaseClient = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { persistSession: false, autoRefreshToken: false },
  },
);
```

- [ ] **Step 3.3: Commit**

```bash
git add src/supabase.ts src/types.ts
git commit -m "feat: supabase client (service role) + domain types"
git push
```

---

## Task 4: Services — sites

**Files:**
- Create: `src/services/sites.ts`

- [ ] **Step 4.1: sites.ts**

```ts
import { supabase } from "../supabase.js";
import type { Site, SiteMember } from "../types.js";
import { config } from "../config.js";

export async function listSites(): Promise<Site[]> {
  const { data, error } = await supabase
    .from("sites")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as Site[]) ?? [];
}

export async function getSite(): Promise<Site | null> {
  const { data } = await supabase
    .from("sites")
    .select("*")
    .eq("id", config.REVIEW_SITE_ID)
    .maybeSingle();
  return data as Site | null;
}

export async function listMembers(): Promise<SiteMember[]> {
  const { data, error } = await supabase
    .from("site_members")
    .select("*")
    .eq("site_id", config.REVIEW_SITE_ID);
  if (error) throw new Error(error.message);
  return (data as SiteMember[]) ?? [];
}
```

- [ ] **Step 4.2: Commit**

```bash
git add src/services/sites.ts
git commit -m "feat(services): sites (list, get by env, list members)"
git push
```

---

## Task 5: Services — sessions

**Files:**
- Create: `src/services/sessions.ts`

- [ ] **Step 5.1: sessions.ts**

```ts
import { supabase } from "../supabase.js";
import type { ReviewSession, SessionStatus } from "../types.js";
import { config } from "../config.js";

export async function listSessions(): Promise<ReviewSession[]> {
  const { data, error } = await supabase
    .from("review_sessions")
    .select("*")
    .eq("site_id", config.REVIEW_SITE_ID)
    .order("opened_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as ReviewSession[]) ?? [];
}

export async function getActiveSession(): Promise<ReviewSession | null> {
  const { data } = await supabase
    .from("review_sessions")
    .select("*")
    .eq("site_id", config.REVIEW_SITE_ID)
    .in("status", ["active", "in_progress"])
    .order("opened_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data as ReviewSession | null;
}

export async function ensureActiveSession(): Promise<ReviewSession> {
  const existing = await getActiveSession();
  if (existing) return existing;

  const dateStr = new Date().toISOString().slice(0, 10);
  const name = `Review ${dateStr}`;
  const { data, error } = await supabase
    .from("review_sessions")
    .insert({
      site_id: config.REVIEW_SITE_ID,
      name,
      status: "active" satisfies SessionStatus,
    })
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data as ReviewSession;
}

export async function markSessionInProgress(
  sessionId: string,
  branchName: string,
): Promise<ReviewSession> {
  const { data, error } = await supabase
    .from("review_sessions")
    .update({
      status: "in_progress" satisfies SessionStatus,
      branch_name: branchName,
      claude_run_at: new Date().toISOString(),
    })
    .eq("id", sessionId)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data as ReviewSession;
}

export async function markSessionCompleted(
  sessionId: string,
  prUrl: string,
): Promise<ReviewSession> {
  const { data, error } = await supabase
    .from("review_sessions")
    .update({
      status: "completed" satisfies SessionStatus,
      pr_url: prUrl,
      closed_at: new Date().toISOString(),
    })
    .eq("id", sessionId)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data as ReviewSession;
}
```

- [ ] **Step 5.2: Commit**

```bash
git add src/services/sessions.ts
git commit -m "feat(services): sessions (list, ensure active, mark in_progress, complete)"
git push
```

---

## Task 6: Services — comments

**Files:**
- Create: `src/services/comments.ts`

- [ ] **Step 6.1: comments.ts**

```ts
import { supabase } from "../supabase.js";
import type { Comment, Reply } from "../types.js";
import { config } from "../config.js";

export async function listOpenComments(sessionId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("site_id", config.REVIEW_SITE_ID)
    .eq("session_id", sessionId)
    .in("status", ["open", "reopened"])
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return (data as Comment[]) ?? [];
}

export async function getThread(
  commentId: string,
): Promise<{ comment: Comment; replies: Reply[] } | null> {
  const { data: comment } = await supabase
    .from("comments")
    .select("*")
    .eq("id", commentId)
    .eq("site_id", config.REVIEW_SITE_ID)
    .maybeSingle();
  if (!comment) return null;

  const { data: replies } = await supabase
    .from("replies")
    .select("*")
    .eq("comment_id", commentId)
    .order("created_at", { ascending: true });

  return {
    comment: comment as Comment,
    replies: (replies as Reply[]) ?? [],
  };
}

export async function resolveComment(
  commentId: string,
): Promise<Comment> {
  const { data, error } = await supabase
    .from("comments")
    .update({
      status: "resolved",
      resolved_at: new Date().toISOString(),
    })
    .eq("id", commentId)
    .eq("site_id", config.REVIEW_SITE_ID)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data as Comment;
}

export async function batchResolveComments(
  commentIds: string[],
): Promise<number> {
  const { data, error } = await supabase
    .from("comments")
    .update({
      status: "resolved",
      resolved_at: new Date().toISOString(),
    })
    .in("id", commentIds)
    .eq("site_id", config.REVIEW_SITE_ID)
    .select("id");
  if (error) throw new Error(error.message);
  return (data ?? []).length;
}
```

- [ ] **Step 6.2: Commit**

```bash
git add src/services/comments.ts
git commit -m "feat(services): comments (list open, get thread, resolve, batch)"
git push
```

---

## Task 7: Services — replies

**Files:**
- Create: `src/services/replies.ts`

- [ ] **Step 7.1: replies.ts**

```ts
import { supabase } from "../supabase.js";
import type { Reply } from "../types.js";

export async function addReply(input: {
  commentId: string;
  authorEmail: string;
  body: string;
  source: "human" | "claude-code";
  commitSha?: string | null;
}): Promise<Reply> {
  const { data, error } = await supabase
    .from("replies")
    .insert({
      comment_id: input.commentId,
      author_email: input.authorEmail,
      body: input.body,
      source: input.source,
      commit_sha: input.commitSha ?? null,
    })
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data as Reply;
}
```

- [ ] **Step 7.2: Commit**

```bash
git add src/services/replies.ts
git commit -m "feat(services): add reply with source discrimination"
git push
```

---

## Task 8: MCP server skeleton + tool registry

**Files:**
- Create: `src/tools/register.ts`
- Create: `src/index.ts`

- [ ] **Step 8.1: tools/register.ts**

```ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as sites from "../services/sites.js";
import * as sessions from "../services/sessions.js";
import * as comments from "../services/comments.js";
import * as replies from "../services/replies.js";
import { config } from "../config.js";

function ok(payload: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(payload, null, 2) }],
  };
}

function err(message: string) {
  return {
    content: [{ type: "text" as const, text: `Error: ${message}` }],
    isError: true,
  };
}

export function registerTools(server: McpServer) {
  server.tool(
    "review__list_sites",
    "Lista todos os sites no Supabase central (útil pra debug — só mostra os que existem).",
    {},
    async () => {
      try {
        return ok(await sites.listSites());
      } catch (e) {
        return err((e as Error).message);
      }
    },
  );

  server.tool(
    "review__list_sessions",
    `Lista todas as review sessions do site ${config.REVIEW_SITE_ID} (ativa, in_progress, completed).`,
    {},
    async () => {
      try {
        return ok(await sessions.listSessions());
      } catch (e) {
        return err((e as Error).message);
      }
    },
  );

  server.tool(
    "review__get_active_session",
    "Retorna a session ativa (ou in_progress) do site atual. Se não existir, cria uma nova.",
    {},
    async () => {
      try {
        return ok(await sessions.ensureActiveSession());
      } catch (e) {
        return err((e as Error).message);
      }
    },
  );

  server.tool(
    "review__list_open_comments",
    "Lista threads com status open/reopened da session informada. Use review__get_active_session antes.",
    { session_id: z.string().uuid() },
    async ({ session_id }) => {
      try {
        return ok(await comments.listOpenComments(session_id));
      } catch (e) {
        return err((e as Error).message);
      }
    },
  );

  server.tool(
    "review__get_thread",
    "Retorna comment + replies de uma thread específica.",
    { comment_id: z.string().uuid() },
    async ({ comment_id }) => {
      try {
        const thread = await comments.getThread(comment_id);
        if (!thread) return err("Thread not found");
        return ok(thread);
      } catch (e) {
        return err((e as Error).message);
      }
    },
  );

  server.tool(
    "review__reply_to_thread",
    "Adiciona uma reply na thread. source='claude-code' marca replies automáticas.",
    {
      comment_id: z.string().uuid(),
      body: z.string().min(1),
      source: z.enum(["human", "claude-code"]).default("claude-code"),
      commit_sha: z.string().optional(),
      author_email: z.string().email().default("claude@sanches.io"),
    },
    async ({ comment_id, body, source, commit_sha, author_email }) => {
      try {
        const reply = await replies.addReply({
          commentId: comment_id,
          authorEmail: author_email,
          body,
          source,
          commitSha: commit_sha ?? null,
        });
        return ok(reply);
      } catch (e) {
        return err((e as Error).message);
      }
    },
  );

  server.tool(
    "review__resolve_thread",
    "Marca thread como resolved e adiciona uma reply final explicando a resolução. Use depois de aplicar o fix no código.",
    {
      comment_id: z.string().uuid(),
      message: z.string().min(1),
      commit_sha: z.string().optional(),
      author_email: z.string().email().default("claude@sanches.io"),
    },
    async ({ comment_id, message, commit_sha, author_email }) => {
      try {
        await replies.addReply({
          commentId: comment_id,
          authorEmail: author_email,
          body: message,
          source: "claude-code",
          commitSha: commit_sha ?? null,
        });
        const resolved = await comments.resolveComment(comment_id);
        return ok(resolved);
      } catch (e) {
        return err((e as Error).message);
      }
    },
  );

  server.tool(
    "review__batch_resolve",
    "Resolve múltiplas threads de uma vez com a mesma mensagem (útil pra fix único que cobre vários comments).",
    {
      comment_ids: z.array(z.string().uuid()).min(1),
      message: z.string().min(1),
      commit_sha: z.string().optional(),
      author_email: z.string().email().default("claude@sanches.io"),
    },
    async ({ comment_ids, message, commit_sha, author_email }) => {
      try {
        for (const id of comment_ids) {
          await replies.addReply({
            commentId: id,
            authorEmail: author_email,
            body: message,
            source: "claude-code",
            commitSha: commit_sha ?? null,
          });
        }
        const count = await comments.batchResolveComments(comment_ids);
        return ok({ resolved: count, ids: comment_ids });
      } catch (e) {
        return err((e as Error).message);
      }
    },
  );

  server.tool(
    "review__start_session",
    "Marca a session como in_progress e registra o nome do branch git onde o Claude vai aplicar fixes. Trava novos comments no widget.",
    {
      session_id: z.string().uuid(),
      branch_name: z.string().min(1),
    },
    async ({ session_id, branch_name }) => {
      try {
        return ok(await sessions.markSessionInProgress(session_id, branch_name));
      } catch (e) {
        return err((e as Error).message);
      }
    },
  );

  server.tool(
    "review__complete_session",
    "Marca session como completed após o PR ser mergeado. Uma nova session 'active' será auto-criada no próximo comment.",
    {
      session_id: z.string().uuid(),
      pr_url: z.string().url(),
    },
    async ({ session_id, pr_url }) => {
      try {
        return ok(await sessions.markSessionCompleted(session_id, pr_url));
      } catch (e) {
        return err((e as Error).message);
      }
    },
  );
}
```

- [ ] **Step 8.2: index.ts (entrypoint)**

```ts
#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./tools/register.js";
import { config } from "./config.js";

async function main() {
  const server = new McpServer({
    name: "review-mcp",
    version: "0.1.0",
  });

  registerTools(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error(`[review-mcp] connected, site=${config.REVIEW_SITE_ID}`);
}

main().catch((err) => {
  console.error("[review-mcp] fatal:", err);
  process.exit(1);
});
```

- [ ] **Step 8.3: Build e smoke test**

```bash
npm run build
```

Expected: `dist/index.js` criado.

Smoke test manual com variáveis reais:

```bash
SUPABASE_URL=https://rmrtndvblnsvogifxisr.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=$(grep SERVICE_ROLE ~/Documents/review-supabase/.env | cut -d= -f2) \
REVIEW_SITE_ID=wespa \
node dist/index.js
```

Expected: server fica em stdin aguardando JSON-RPC. `Ctrl+C` pra sair.

- [ ] **Step 8.4: Commit**

```bash
git add src/tools/register.ts src/index.ts
git commit -m "feat(mcp): register 10 tools + stdio server with McpServer"
git push
```

---

## Task 9: Tests com mocks

**Files:**
- Create: `tests/mock-supabase.ts`
- Create: `tests/services.test.ts`
- Create: `vitest.config.ts`

- [ ] **Step 9.1: vitest.config.ts**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: false,
  },
});
```

- [ ] **Step 9.2: mock-supabase.ts (helper pra mockar os services sem rede)**

Como os services importam `./supabase` estaticamente, melhor testar com Supabase real (integração) ou com um mini-mock de tabelas em memória.

Pra manter simples, vou usar integração: os testes rodam contra um `test-site` real no Supabase central. O script de setup/teardown é parte do próprio arquivo de teste.

Alternativa: criar o arquivo vazio por enquanto pra satisfazer imports, e testes focarem em integração.

Arquivo `tests/mock-supabase.ts`:

```ts
// Placeholder — testes atuais rodam contra Supabase real via env vars de teste.
// Se quiser mock completo, use vi.mock('../src/supabase') com uma fake client.
export {};
```

- [ ] **Step 9.3: services.test.ts (integração real contra Supabase)**

```ts
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { supabase } from "../src/supabase.js";
import * as sessions from "../src/services/sessions.js";
import * as comments from "../src/services/comments.js";
import * as replies from "../src/services/replies.js";

const TEST_SITE = "mcp-test-site";

beforeAll(async () => {
  // Seed: cria site + member
  await supabase.from("sites").upsert({ id: TEST_SITE, name: "MCP Test" });
  await supabase.from("site_members").upsert({
    site_id: TEST_SITE,
    email: "claude@sanches.io",
    role: "designer",
  });
});

afterAll(async () => {
  // Cleanup: cascade apaga tudo
  await supabase.from("sites").delete().eq("id", TEST_SITE);
});

describe("services integration (Supabase real)", () => {
  it("ensureActiveSession cria uma session se não existe", async () => {
    process.env.REVIEW_SITE_ID = TEST_SITE;
    const s = await sessions.ensureActiveSession();
    expect(s.site_id).toBe(TEST_SITE);
    expect(s.status).toBe("active");
  });

  it("listOpenComments retorna vazio inicialmente", async () => {
    const s = await sessions.ensureActiveSession();
    const open = await comments.listOpenComments(s.id);
    expect(open).toEqual([]);
  });

  it("fluxo completo: criar comment → reply → resolve", async () => {
    const s = await sessions.ensureActiveSession();

    // Insere comment direto (simulando widget)
    const { data: comment } = await supabase
      .from("comments")
      .insert({
        site_id: TEST_SITE,
        session_id: s.id,
        author_email: "client@test.com",
        body: "Teste de fluxo",
        page_url: "/",
        anchor_selector: "body",
        anchor_offset_x: 0.5,
        anchor_offset_y: 0.5,
        viewport_width: 1920,
      })
      .select("*")
      .single();
    expect(comment).toBeTruthy();
    const commentId = comment!.id as string;

    // Reply via service
    const reply = await replies.addReply({
      commentId,
      authorEmail: "claude@sanches.io",
      body: "Ajustado",
      source: "claude-code",
      commitSha: "abc1234",
    });
    expect(reply.source).toBe("claude-code");
    expect(reply.commit_sha).toBe("abc1234");

    // Resolve
    const resolved = await comments.resolveComment(commentId);
    expect(resolved.status).toBe("resolved");

    // getThread agora retorna reply + status resolved
    const thread = await comments.getThread(commentId);
    expect(thread?.comment.status).toBe("resolved");
    expect(thread?.replies).toHaveLength(1);
  });
});
```

- [ ] **Step 9.4: Rodar testes**

```bash
SUPABASE_URL=https://rmrtndvblnsvogifxisr.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=$(grep SERVICE_ROLE ~/Documents/review-supabase/.env | cut -d= -f2) \
REVIEW_SITE_ID=mcp-test-site \
npm test 2>&1 | tail -10
```

Expected: 3 testes passando.

- [ ] **Step 9.5: Commit**

```bash
git add tests/ vitest.config.ts
git commit -m "test: integration tests against supabase (services + flow)"
git push
```

---

## Task 10: Templates (.mcp.json + slash command)

**Files:**
- Create: `templates/.mcp.json`
- Create: `templates/review-slash-command.md`

- [ ] **Step 10.1: templates/.mcp.json**

```json
{
  "mcpServers": {
    "review": {
      "command": "npx",
      "args": ["-y", "@sanches-io/review-mcp"],
      "env": {
        "SUPABASE_URL": "https://rmrtndvblnsvogifxisr.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "${env:REVIEW_SUPABASE_SERVICE_KEY}",
        "REVIEW_SITE_ID": "wespa"
      }
    }
  }
}
```

Obs: `${env:REVIEW_SUPABASE_SERVICE_KEY}` exige setar essa env var na shell antes de abrir Claude Code. Alternativa é colocar a key direto (cuidado: não commitar).

- [ ] **Step 10.2: templates/review-slash-command.md**

```markdown
---
description: Comandos pra gerenciar review sessions via review-mcp
---

# /review — subcomandos

Use `/review status` pra ver o estado atual, `/review start` pra iniciar
o processamento de uma rodada de comentários.

## Subcomandos

### status
Mostra a session ativa, quantos comentários abertos, e se há session in_progress travada.

Fluxo:
1. Chame `review__get_active_session`
2. Se retornou session, chame `review__list_open_comments(session_id)`
3. Apresente resumo: "Session {name} — {n} abertos em {m} páginas"

### start
Inicia o processamento da session ativa.

Fluxo:
1. Chame `review__get_active_session` — se status já for "in_progress", avise que já tem rodada em andamento
2. Crie branch `review/session-{N}` localmente (`git checkout -b`)
3. Chame `review__start_session(session_id, branch_name)` pra marcar in_progress
4. Para cada comment aberto:
   - Leia page_url, anchor_selector, anchor_text_snippet, body
   - Mapeie page_url → arquivo do repo
   - Grep pelo snippet/body pra localizar exatamente o componente
   - Aplique o fix
   - Commit: `fix(scope): <resumo> — resolves <comment_id>`
   - Chame `review__resolve_thread(comment_id, "Ajustado ✓ commit <sha>", commit_sha)`
5. Ao terminar: `git push`, `gh pr create --title "Review session {N}"`
6. Chame `review__complete_session(session_id, pr_url)`

### resolve <comment_id> <mensagem>
Resolve manualmente uma thread específica sem passar por /review start.

Fluxo:
1. Chame `review__resolve_thread(comment_id, mensagem)`

## Regras importantes

- Sempre rodar `review__get_active_session` antes — nunca assumir que existe
- Se thread for ambígua (body vago, não dá pra achar o elemento), pare e pergunte
- Sempre incluir `commit_sha` nas tools que aceitam — dá rastreabilidade
- Não mexer em git commands direto do MCP (o MCP NÃO faz git) — você (Claude) comanda git via Bash, e só sincroniza estado via MCP
```

- [ ] **Step 10.3: Commit**

```bash
git add templates/
git commit -m "docs: templates .mcp.json + /review slash command"
git push
```

---

## Task 11: README

**Files:**
- Create: `README.md`

- [ ] **Step 11.1: README.md**

```markdown
# @sanches-io/review-mcp

MCP server pro Claude Code processar reviews do [review-widget](https://github.com/SANCHES-IO/review-widget) em lote.

## O que faz

Expõe 10 tools pro Claude Code ler comentários/threads do Supabase, responder em nome do Claude, resolver threads em lote, e gerenciar review sessions (rodadas de review).

## Instalação num repo cliente

1. No repo do site (ex: WESPA), copie os templates:

```bash
cp node_modules/@sanches-io/review-mcp/templates/.mcp.json .mcp.json
mkdir -p .claude/commands
cp node_modules/@sanches-io/review-mcp/templates/review-slash-command.md .claude/commands/review.md
```

2. Edite `.mcp.json` e setar `REVIEW_SITE_ID` pro data-site-id do seu site.

3. Exporte a service_role_key como env var (ou cole direto no .mcp.json):

```bash
export REVIEW_SUPABASE_SERVICE_KEY=eyJ...
```

4. Abra Claude Code no repo — as tools `review__*` ficam disponíveis.

## Tools expostas

| Tool | Uso |
|---|---|
| `review__list_sites` | Lista todos sites (debug) |
| `review__list_sessions` | Sessions do site atual |
| `review__get_active_session` | Session ativa (ou cria nova) |
| `review__list_open_comments(session_id)` | Threads abertas da session |
| `review__get_thread(comment_id)` | Thread + replies |
| `review__reply_to_thread(id, body, ...)` | Adiciona reply |
| `review__resolve_thread(id, message, commit_sha?)` | Resolve + reply |
| `review__batch_resolve(ids, message)` | Resolve várias |
| `review__start_session(id, branch)` | Marca in_progress + trava widget |
| `review__complete_session(id, pr_url)` | Fecha após PR merge |

## Slash commands sugeridos

Após instalar, use:
- `/review status` — ver estado atual
- `/review start` — processar session ativa → branch → fixes → PR
- `/review resolve <id> <msg>` — resolver thread manualmente

## Desenvolvimento

```bash
npm install
cp .env.example .env      # preencher SUPABASE_SERVICE_ROLE_KEY
npm run dev               # tsx watch
npm test                  # vitest (integração com Supabase real)
npm run build             # tsc → dist/
```

## Publicar (opcional)

```bash
npm version patch
npm publish --access public
```

Alternativa sem npm publish: usar `"args": ["-y", "github:SANCHES-IO/review-mcp"]` no `.mcp.json`.
```

- [ ] **Step 11.2: Commit**

```bash
git add README.md
git commit -m "docs: complete README with install, tools table, dev workflow"
git push
```

---

## Task 12: Integração no repo WESPA

**Files (no repo wespa):**
- Create: `/Users/nikollasanches/Documents/wespa/.mcp.json`
- Create: `/Users/nikollasanches/Documents/wespa/.claude/commands/review.md`

- [ ] **Step 12.1: Copiar .mcp.json pro repo wespa**

```bash
cd /Users/nikollasanches/Documents/wespa
cp ~/code/review-mcp/templates/.mcp.json .mcp.json
```

Editar `.mcp.json` pra usar caminho local (até o npm publish acontecer):

```json
{
  "mcpServers": {
    "review": {
      "command": "node",
      "args": ["/Users/nikollasanches/code/review-mcp/dist/index.js"],
      "env": {
        "SUPABASE_URL": "https://rmrtndvblnsvogifxisr.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "${env:REVIEW_SUPABASE_SERVICE_KEY}",
        "REVIEW_SITE_ID": "wespa"
      }
    }
  }
}
```

- [ ] **Step 12.2: Criar slash command no wespa**

```bash
mkdir -p .claude/commands
cp ~/code/review-mcp/templates/review-slash-command.md .claude/commands/review.md
```

- [ ] **Step 12.3: Setar env var na shell do user**

No `~/.zshrc` (ou `.bashrc`):

```bash
export REVIEW_SUPABASE_SERVICE_KEY="eyJ..."   # valor de ~/Documents/review-supabase/.env
```

Recarregar: `source ~/.zshrc`.

- [ ] **Step 12.4: Commit no wespa**

```bash
cd /Users/nikollasanches/Documents/wespa
git add .mcp.json .claude/commands/review.md
git commit -m "feat(review): add .mcp.json + /review slash command

Habilita review-mcp no Claude Code deste repo. Depende da env var
REVIEW_SUPABASE_SERVICE_KEY estar setada na shell do designer."
git push origin master
```

---

## Task 13: Smoke test E2E completo

- [ ] **Step 13.1: Reiniciar Claude Code no repo wespa**

Fechar e reabrir Claude Code dentro de `/Users/nikollasanches/Documents/wespa`. Claude Code detecta `.mcp.json` e carrega o server.

- [ ] **Step 13.2: Verificar que as tools aparecem**

No prompt do Claude, pergunte:

> "Quais tools review__ estão disponíveis?"

Expected: Claude lista 10 tools com descrições.

- [ ] **Step 13.3: Listar sessions atuais**

```
/review status
```

Expected: Claude chama `review__get_active_session` + `review__list_open_comments`, apresenta resumo tipo "Session Review YYYY-MM-DD — 0 comentários abertos".

- [ ] **Step 13.4: Criar um comentário de teste via widget**

Abrir Railway preview do WESPA com `?review=1`, logar, criar pin comentando algo trivial (ex: "teste do MCP end-to-end").

- [ ] **Step 13.5: Rodar /review status novamente**

```
/review status
```

Expected: mostra 1 comentário aberto com o texto digitado.

- [ ] **Step 13.6: Resolver via MCP sem passar pelo widget**

```
/review resolve <comment_id> "Testado ✓ — MCP funcionando"
```

Expected: Claude chama `review__resolve_thread`. Abrir dashboard Supabase → tabela `comments` → status='resolved'. Abrir `replies` → tem linha com source='claude-code'.

- [ ] **Step 13.7: Verificar widget atualizou**

Refresh a página do widget na aba aberta. Pin fica cinza, thread migra pra aba "Resolvidos".

---

## Verificação final — Fase 3 completa

- [ ] Repo `SANCHES-IO/review-mcp` criado e pushed
- [ ] `npm run build` gera `dist/index.js` sem erros
- [ ] `npm test` passa (3 testes integração)
- [ ] `.mcp.json` no WESPA carrega sem erro no Claude Code
- [ ] Claude Code enxerga 10 tools `review__*`
- [ ] `/review status` retorna dados reais do Supabase
- [ ] `/review resolve <id> <msg>` resolve thread e dispara email (quando Resend ativo)

Após Fase 3 completa, o produto está no estado: **widget em produção capturando comentários, e Claude Code processando em lote**. É o diferencial prometido no spec original (seção 6 e 7 do design doc).
