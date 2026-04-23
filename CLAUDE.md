# Kyrios CRM — Project Briefing

## Overview

Kyrios CRM is a multi-tenant SaaS platform for sales pipeline management targeting SMBs, freelancers, and sales teams. It provides a Kanban-style deal pipeline, lead/contact management, activity tracking, team collaboration via workspaces, and monetization through Stripe subscriptions (Free / Pro at R$49/month).

Full PRD: [docs/PRD.md](docs/PRD.md)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI Library | React 18 + Tailwind CSS + shadcn/ui |
| Language | TypeScript 5 (strict mode) |
| Database + Auth | Supabase (PostgreSQL + RLS + Supabase Auth) |
| Backend/API | Next.js API Routes + Server Components |
| Drag-and-drop | @dnd-kit |
| Charts | Recharts |
| Payments | Stripe (Checkout + Customer Portal + Webhooks) |
| Email | Resend |
| Deploy | Vercel (frontend) + Supabase (DB/functions) |

---

## Folder Structure

```
src/
  app/                  # Next.js App Router — pages, layouts, route handlers
    (auth)/             # Login, signup, password reset
    (app)/              # Authenticated app shell
      dashboard/
      leads/
      pipeline/
      settings/
    api/                # API route handlers
  components/           # Shared UI components (shadcn/ui wrappers + custom)
    ui/                 # shadcn primitives
    kanban/             # Pipeline Kanban components
    leads/              # Lead-related components
    dashboard/          # Dashboard charts and metric cards
  lib/                  # Utility modules
    supabase/           # Supabase client (server + browser)
    stripe/             # Stripe client and helpers
    resend/             # Email helpers
  hooks/                # Custom React hooks
  types/                # Global TypeScript types and interfaces
supabase/
  migrations/           # SQL migration files (sequential)
  functions/            # Edge Functions (e.g., stripe-webhook)
docs/                   # PRD and other documentation
public/                 # Static assets
```

---

## Architecture Notes

- **Server Components by default.** Use `"use client"` only for interactive UI (drag-and-drop, forms, charts).
- **Supabase RLS is the security boundary.** Every table must have Row Level Security policies enforced by `workspace_id`. Never bypass RLS server-side except in Edge Functions using the service role key.
- **Stripe webhooks** are handled by a Supabase Edge Function (`supabase/functions/stripe-webhook`) to avoid cold-start issues on Vercel.
- **Multi-tenancy** is modeled via `workspaces` table. All data rows carry a `workspace_id` foreign key, and RLS policies filter by the authenticated user's workspace membership.
- **Auth** uses Supabase Auth (email/password + magic link). Session is managed via `@supabase/ssr` helpers for Next.js App Router.

---

## Key Domain Concepts

| Concept | Description |
|---|---|
| **Workspace** | An isolated tenant (company / team). Users belong to one or more workspaces. |
| **Lead / Contact** | A person or company in the sales funnel. |
| **Deal** | A sales opportunity linked to a lead, with a value (R$), stage, owner, and deadline. |
| **Pipeline Stage** | Ordered stages: Novo Lead → Contato Realizado → Proposta Enviada → Negociação → Fechado Ganho / Fechado Perdido |
| **Activity** | An interaction logged against a lead: ligação, e-mail, reunião, nota. |
| **Role** | `admin` (full access) or `member` (leads + deals only) within a workspace. |
| **Plan** | `free` (2 members, 50 leads) or `pro` (unlimited, R$49/month via Stripe). |

---

## Coding Conventions

- TypeScript strict mode (`"strict": true`). No `any` unless absolutely necessary.
- Prefer `async/await` over `.then()` chains.
- Server Actions for form mutations; API routes for webhook/external integrations.
- Component files: PascalCase (`LeadCard.tsx`). Utility files: camelCase (`formatCurrency.ts`).
- Tailwind classes only — no inline styles, no CSS modules.
- shadcn/ui components as the base for all UI elements; extend via `className` props.
- No comments unless the WHY is non-obvious. No docblocks.

---

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server-side only

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRO_PRICE_ID=

# Resend
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=              # e.g. https://kyrios-crm.vercel.app
```

---

## Visual Identity

- **Inspiration:** Pipedrive (pipeline UX), HubSpot (clean SaaS shell)
- **Tone:** Professional, minimal, action-oriented
- **Colors:**
  - Primary (brand): roxo escuro `#290042` — use `bg-primary`, `text-primary`, `brand-purple`
  - Accent (highlight): ouro `#F4C430` — use `bg-accent`, `text-accent`, `brand-gold`
  - Tailwind tokens: `brand-purple`, `brand-purple-light`, `brand-gold`, `brand-gold-light`
  - CSS variables: `--brand-purple`, `--brand-gold`
- **Typography:** Inter (system default via Tailwind/shadcn)
- **Density:** Medium — cards with breathing room, sidebar navigation, top metric strip on dashboard

---

## Development Process

1. Break each feature into a standalone, testable milestone.
2. Implement and verify one milestone fully before starting the next.
3. Always run `tsc --noEmit` and linting before considering a milestone done.
4. Migrations must be additive — never destructive — while the app is in active development.
