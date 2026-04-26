# Kyrios CRM — Execution Plan

> Strategy: build the full UI with mock/static data first, then wire each feature to Supabase. This allows rapid iteration on UX before any backend is in place.

---

## Phase 1 — Foundation

### M01 · Project Setup & Design System
**Branch:** `setup/project-init`

**Objective:** Bootstrap the Next.js 14 project with all tooling configured, folder structure in place, and the design system tokens ready so every subsequent milestone starts from a clean, consistent base.

**Deliverables:**
- [X] `npx create-next-app@latest` with TypeScript, Tailwind, App Router, `src/` dir
- [X] Install and init shadcn/ui (`npx shadcn@latest init`)
- [X] Add core shadcn components: Button, Input, Label, Card, Badge, Avatar, Separator, Dropdown, Sheet, Tooltip, Dialog, Sonner (toast)
- [X] Install all dependencies: `@dnd-kit/core @dnd-kit/sortable recharts @supabase/ssr @supabase/supabase-js stripe resend @hookform/resolvers react-hook-form zod lucide-react`
- [X] Create full folder structure (`src/app`, `src/components/ui`, `src/components/kanban`, `src/components/leads`, `src/components/dashboard`, `src/lib`, `src/hooks`, `src/types`, `supabase/migrations`, `supabase/functions`, `docs`, `public`)
- [X] Configure `tailwind.config.ts` with brand accent color (indigo) and Inter font
- [X] Create `src/types/index.ts` with all domain types: `Workspace`, `Lead`, `Deal`, `Activity`, `Member`, `PipelineStage`, `Plan`
- [X] Configure `tsconfig.json` with `strict: true` and path alias `@/`
- [X] Create `.env.local.example` with all required env vars
- [X] Verify `tsc --noEmit` passes with zero errors

**Final commit:** `setup: initialize Next.js 14 project with shadcn/ui, full folder structure and domain types`

---

### M02 · App Shell & Navigation UI
**Branch:** `feat/app-shell-ui`

**Objective:** Build the authenticated app layout — sidebar, topbar, workspace switcher, and responsive shell — so all feature UIs have a real frame to live in from milestone M04 onward.

**Deliverables:**
- [X] `src/components/layout/Sidebar.tsx` — logo, nav links (Dashboard, Leads, Pipeline, Settings), workspace switcher dropdown (mock workspaces), user avatar + name at bottom
- [X] `src/components/layout/Topbar.tsx` — page title, global search input (UI only), notifications icon
- [X] `src/app/(app)/layout.tsx` — wraps all authenticated pages with Sidebar + Topbar
- [X] `src/app/(app)/page.tsx` — redirects to `/dashboard`
- [X] Active nav link highlight via `usePathname()`
- [X] Mobile-responsive: sidebar collapses to Sheet/drawer on small screens
- [X] Dark/light mode ready (shadcn CSS variables, no toggle needed yet)

**Final commit:** `feat: app shell with sidebar, topbar and workspace switcher UI`

---

### M03 · Landing Page
**Branch:** `feat/landing-page`

**Objective:** Deliver the public marketing page for Kyrios CRM — the first thing a visitor sees. No backend required.

**Deliverables:**
- [X] `src/app/page.tsx` — public landing page (Server Component)
- [X] `src/components/landing/Hero.tsx` — headline, subline, CTA buttons (Start Free / See Demo)
- [X] `src/components/landing/Features.tsx` — 6-card grid: Pipeline Kanban, Gestão de Leads, Atividades, Dashboard, Multi-empresa, Planos acessíveis
- [X] `src/components/landing/Pricing.tsx` — Free vs Pro cards with feature lists and CTA
- [X] `src/components/landing/Footer.tsx` — links, copyright
- [X] `src/components/landing/Navbar.tsx` — logo, nav links, Login / Começar grátis buttons
- [X] Fully responsive (mobile-first)
- [X] `tsc --noEmit` passes

**Final commit:** `feat: landing page with hero, features, pricing and footer`

---

## Phase 2 — Core UI (Mock Data)

### M04 · Auth Pages UI
**Branch:** `feat/auth-ui`

**Objective:** Build all authentication screens (login, signup, password reset) as static forms. No Supabase wired yet — forms submit to `console.log`. Backend is added in M08.

**Deliverables:**
- [X] `src/app/(auth)/layout.tsx` — centered card layout, logo
- [X] `src/app/(auth)/login/page.tsx` — email + password form, "Forgot password?" link, "Create account" link
- [X] `src/app/(auth)/signup/page.tsx` — name + email + password form, terms checkbox
- [X] `src/app/(auth)/forgot-password/page.tsx` — email form
- [X] `src/app/(auth)/reset-password/page.tsx` — new password form
- [X] All forms built with `react-hook-form` + `zod` validation (client-side)
- [X] Loading states and error message slots in place (ready for real errors in M08)
- [X] `tsc --noEmit` passes

**Final commit:** `feat: auth pages UI — login, signup, password reset with form validation`

---

### M05 · Leads UI
**Branch:** `feat/leads-ui`

**Objective:** Build the complete leads management UI — list, detail, create/edit — using mock data. Backend wired in M09.

**Deliverables:**
- [X] `src/lib/mock/leads.ts` — 10 mock leads with all fields
- [X] `src/app/(app)/leads/page.tsx` — leads list: table with Name, Company, Status badge, Owner, Created date; search bar; status filter; "Novo Lead" button
- [X] `src/components/leads/LeadTable.tsx` — sortable table rows, row click navigates to detail
- [X] `src/components/leads/LeadFilters.tsx` — filter by status, owner, date range
- [X] `src/app/(app)/leads/new/page.tsx` — create lead form (name, email, phone, company, role, status, owner)
- [X] `src/app/(app)/leads/[id]/page.tsx` — lead detail: profile card + activity timeline
- [X] `src/components/leads/LeadProfile.tsx` — profile card with all fields + Edit / Delete actions
- [X] `src/components/leads/ActivityTimeline.tsx` — chronological list of mock activities with type icons (ligação, e-mail, reunião, nota)
- [X] `src/components/leads/ActivityForm.tsx` — inline "Add activity" form (type, description, date)
- [X] `tsc --noEmit` passes

**Final commit:** `feat: leads UI — list, detail, create/edit and activity timeline with mock data`

---

### M06 · Pipeline Kanban UI
**Branch:** `feat/pipeline-ui`

**Objective:** Build the Kanban board with full drag-and-drop between stages using `@dnd-kit`. Stage moves are persisted to local state only. Backend wired in M10.

**Deliverables:**
- [ ] `src/lib/mock/deals.ts` — 12 mock deals spread across all 6 stages
- [ ] `src/app/(app)/pipeline/page.tsx` — Kanban board page
- [ ] `src/components/kanban/KanbanBoard.tsx` — `"use client"`, DndContext + SortableContext, renders all columns
- [ ] `src/components/kanban/KanbanColumn.tsx` — stage header (name, deal count, total R$), droppable area, "Add deal" button
- [ ] `src/components/kanban/DealCard.tsx` — draggable card: title, value (R$), lead name, owner avatar, deadline (with overdue highlight)
- [ ] `src/components/kanban/DealForm.tsx` — dialog form to create/edit a deal (title, value, lead, owner, deadline, stage)
- [ ] Stage order: Novo Lead → Contato Realizado → Proposta Enviada → Negociação → Fechado Ganho → Fechado Perdido
- [ ] Drag-and-drop updates local state; visual feedback during drag (opacity, cursor)
- [ ] `tsc --noEmit` passes

**Final commit:** `feat: pipeline Kanban UI with @dnd-kit drag-and-drop and deal cards`

---

### M07 · Dashboard UI
**Branch:** `feat/dashboard-ui`

**Objective:** Build the dashboard with metric cards, funnel chart, and upcoming deals list using mock data. Backend wired in M12.

**Deliverables:**
- [ ] `src/lib/mock/metrics.ts` — mock metric values and funnel data
- [ ] `src/app/(app)/dashboard/page.tsx` — dashboard page
- [ ] `src/components/dashboard/MetricCards.tsx` — 4 cards: Total de Leads, Negócios Abertos, Valor do Pipeline (R$), Taxa de Conversão (%) — with trend arrows
- [ ] `src/components/dashboard/FunnelChart.tsx` — `"use client"`, Recharts BarChart showing deal count per stage
- [ ] `src/components/dashboard/UpcomingDeals.tsx` — list of deals with deadline in the next 7 days, with stage badge and value
- [ ] Responsive grid layout (2-col → 4-col metric cards)
- [ ] `tsc --noEmit` passes

**Final commit:** `feat: dashboard UI with metric cards, funnel chart (Recharts) and upcoming deals`

---

### M08 · Settings & Workspace UI
**Branch:** `feat/settings-ui`

**Objective:** Build all settings pages — workspace info, team members, invite form, and billing/plan UI — as static shells. Functional backends added in M13 and M14.

**Deliverables:**
- [ ] `src/app/(app)/settings/layout.tsx` — settings sub-navigation (Workspace, Team, Billing)
- [ ] `src/app/(app)/settings/workspace/page.tsx` — workspace name + logo form (static)
- [ ] `src/app/(app)/settings/team/page.tsx` — members table (name, email, role badge, Remove action); "Invite Member" button opens dialog
- [ ] `src/components/settings/InviteDialog.tsx` — email input + role selector (Admin/Member), Send Invite button
- [ ] `src/app/(app)/settings/billing/page.tsx` — current plan card (Free/Pro), usage bars (members used / leads used), Upgrade / Manage Subscription CTA buttons
- [ ] `src/components/settings/PlanCard.tsx` — plan details, feature list, CTA
- [ ] `tsc --noEmit` passes

**Final commit:** `feat: settings UI — workspace, team management and billing pages`

---

## Phase 3 — Backend Foundation

### M09 · Supabase Setup, Schema & Auth
**Branch:** `feat/supabase-auth`

**Objective:** Wire up Supabase Auth and create the core database schema (users, workspaces, workspace_members) with RLS. Replace mock auth in M04 with real Supabase sign-in/sign-up. Implement first-run workspace creation.

**Deliverables:**
- [ ] Create Supabase project, populate `.env.local` with real keys
- [ ] `src/lib/supabase/server.ts` — `createServerClient` helper (@supabase/ssr)
- [ ] `src/lib/supabase/client.ts` — `createBrowserClient` helper
- [ ] `src/middleware.ts` — session refresh on every request, redirect unauthenticated users from `(app)` routes to `/login`
- [ ] Migration `001_core_schema.sql`:
  - `profiles` table (id, full_name, avatar_url) linked to `auth.users`
  - `workspaces` table (id, name, slug, plan, stripe_customer_id, stripe_subscription_id)
  - `workspace_members` table (workspace_id, user_id, role)
  - RLS: users can only read/write their own workspaces via membership
  - Trigger: auto-insert `profiles` row on `auth.users` insert
- [ ] Wire login form to `supabase.auth.signInWithPassword()`
- [ ] Wire signup form to `supabase.auth.signUp()` → create workspace → insert workspace_member as admin
- [ ] Wire forgot-password to `supabase.auth.resetPasswordForEmail()`
- [ ] Wire reset-password to `supabase.auth.updateUser()`
- [ ] Workspace switcher in sidebar reads real user memberships
- [ ] Active workspace stored in `localStorage` (key: `kyrios_workspace_id`)
- [ ] `tsc --noEmit` passes

**Final commit:** `feat: Supabase auth, core schema (workspaces + members) and session management`

---

## Phase 4 — Feature Backends

### M10 · Leads Backend
**Branch:** `feat/leads-backend`

**Objective:** Replace mock leads with real Supabase data. Full CRUD with RLS scoped to `workspace_id`.

**Deliverables:**
- [ ] Migration `002_leads.sql`:
  - `leads` table: id, workspace_id, name, email, phone, company, role, status, owner_id, created_at
  - RLS: workspace members can read; admin + member can insert/update; admin can delete
- [ ] `src/lib/supabase/leads.ts` — `getLeads()`, `getLead()`, `createLead()`, `updateLead()`, `deleteLead()` server functions
- [ ] Replace mock data in `leads/page.tsx` with `getLeads()` server fetch
- [ ] Replace mock data in `leads/[id]/page.tsx` with `getLead()` server fetch
- [ ] Wire create form (Server Action in `leads/new/page.tsx`) to `createLead()`
- [ ] Wire edit form (Server Action in `leads/[id]/edit/page.tsx`) to `updateLead()`
- [ ] Wire delete button to `deleteLead()` with confirmation dialog
- [ ] Search and filter params passed to `getLeads()` query (`ilike`, `.eq` filters)
- [ ] `tsc --noEmit` passes

**Final commit:** `feat: leads backend — Supabase CRUD with RLS, search and filters`

---

### M11 · Pipeline & Deals Backend
**Branch:** `feat/pipeline-backend`

**Objective:** Replace mock deals with real Supabase data. Persist drag-and-drop stage moves to the database.

**Deliverables:**
- [ ] Migration `003_deals.sql`:
  - `deals` table: id, workspace_id, title, value, stage, lead_id, owner_id, deadline, created_at
  - RLS: same as leads
- [ ] `src/lib/supabase/deals.ts` — `getDeals()`, `createDeal()`, `updateDeal()`, `moveDeal()`, `deleteDeal()`
- [ ] `KanbanBoard.tsx` fetches real deals on mount
- [ ] `handleDragEnd` calls `moveDeal()` Server Action to persist stage change
- [ ] Optimistic UI update: move card immediately, revert on error (toast)
- [ ] DealForm wired to `createDeal()` / `updateDeal()`
- [ ] `tsc --noEmit` passes

**Final commit:** `feat: pipeline backend — deals CRUD and persistent drag-and-drop via Supabase`

---

### M12 · Activities Backend
**Branch:** `feat/activities-backend`

**Objective:** Replace mock activities with real Supabase data. Activity CRUD wired to lead detail page.

**Deliverables:**
- [ ] Migration `004_activities.sql`:
  - `activities` table: id, workspace_id, lead_id, author_id, type (ligação|email|reunião|nota), description, activity_date, created_at
  - RLS: workspace members read; admin + member insert/update/delete own activities
- [ ] `src/lib/supabase/activities.ts` — `getActivities()`, `createActivity()`, `deleteActivity()`
- [ ] `leads/[id]/page.tsx` fetches real activities via `getActivities({ leadId })`
- [ ] `ActivityForm.tsx` submits via Server Action to `createActivity()`
- [ ] Delete activity with confirmation; timeline refreshes via `router.refresh()`
- [ ] `tsc --noEmit` passes

**Final commit:** `feat: activities backend — CRUD with RLS wired to lead detail timeline`

---

### M13 · Dashboard Backend
**Branch:** `feat/dashboard-backend`

**Objective:** Replace mock metrics with real aggregated queries from Supabase.

**Deliverables:**
- [ ] `src/lib/supabase/metrics.ts`:
  - `getTotalLeads(workspaceId)` — count of leads
  - `getOpenDeals(workspaceId)` — count of deals not in Fechado Ganho/Perdido
  - `getPipelineValue(workspaceId)` — sum of open deal values
  - `getConversionRate(workspaceId)` — Fechado Ganho / (Fechado Ganho + Fechado Perdido)
  - `getFunnelData(workspaceId)` — count per stage
  - `getUpcomingDeals(workspaceId, days=7)` — deals with deadline in next N days
- [ ] `dashboard/page.tsx` fetches all metrics server-side (parallel `Promise.all`)
- [ ] `MetricCards.tsx` receives real values as props
- [ ] `FunnelChart.tsx` receives real funnel data
- [ ] `UpcomingDeals.tsx` receives real deals
- [ ] `tsc --noEmit` passes

**Final commit:** `feat: dashboard backend — real metrics and funnel data from Supabase`

---

## Phase 5 — Advanced Features

### M14 · Collaboration & Multi-workspace
**Branch:** `feat/multi-workspace`

**Objective:** Enable workspace invites by email (Resend), accept-invite flow, role enforcement in UI, and workspace switcher fully functional.

**Deliverables:**
- [ ] Migration `005_invites.sql`:
  - `invites` table: id, workspace_id, email, role, token (uuid), accepted_at, expires_at, invited_by
  - RLS: admin can insert; anyone with matching email can read
- [ ] `src/lib/resend/inviteEmail.ts` — sends invite email with accept link using Resend
- [ ] `settings/team/page.tsx` `InviteDialog` submits Server Action → inserts invite row → sends email
- [ ] `src/app/(auth)/invite/[token]/page.tsx` — accept invite page: shows workspace name + role, "Accept & Join" button
  - If not logged in → redirect to signup with `?invite=<token>`
  - On accept: insert `workspace_members`, mark invite as accepted
- [ ] Role enforcement in UI: members see no Delete buttons, no Settings nav link
- [ ] Workspace switcher (Sidebar) reads all workspaces from `workspace_members`, switches active workspace in `localStorage` + re-fetches data
- [ ] Remove member (admin only): deletes `workspace_members` row via Server Action
- [ ] `tsc --noEmit` passes

**Final commit:** `feat: multi-workspace collaboration — email invites (Resend), accept flow and role enforcement`

---

### M15 · Monetization (Stripe)
**Branch:** `feat/stripe`

**Objective:** Integrate Stripe Checkout for Pro plan upgrade, handle subscription lifecycle via webhook Edge Function, enforce Free plan limits.

**Deliverables:**
- [ ] `src/lib/stripe/client.ts` — Stripe SDK instance
- [ ] `src/lib/stripe/checkout.ts` — `createCheckoutSession(workspaceId, userId)` → Stripe Checkout URL
- [ ] `src/app/api/stripe/create-checkout/route.ts` — POST handler, returns checkout URL
- [ ] `src/lib/stripe/portal.ts` — `createPortalSession(stripeCustomerId)` → Customer Portal URL
- [ ] `src/app/api/stripe/create-portal/route.ts` — POST handler for billing page "Manage Subscription"
- [ ] `supabase/functions/stripe-webhook/index.ts` — Edge Function:
  - Verifies Stripe signature
  - `checkout.session.completed` → set `workspaces.plan = 'pro'`, store `stripe_customer_id` + `stripe_subscription_id`
  - `customer.subscription.deleted` → set `workspaces.plan = 'free'`, clear subscription fields
- [ ] `settings/billing/page.tsx` — Upgrade button calls `/api/stripe/create-checkout`; Manage button calls `/api/stripe/create-portal`
- [ ] Plan limit enforcement:
  - `src/lib/limits.ts` — `checkLeadLimit(workspaceId)`, `checkMemberLimit(workspaceId)` — return `{ allowed: boolean, current: number, max: number }`
  - Block lead creation if Free plan and leads ≥ 50 (show upgrade prompt)
  - Block invite if Free plan and members ≥ 2 (show upgrade prompt)
- [ ] Usage bars in `settings/billing/page.tsx` wired to real counts
- [ ] `tsc --noEmit` passes

**Final commit:** `feat: Stripe integration — Pro checkout, Customer Portal, webhook Edge Function and plan limits`

---

### M16 · Onboarding Flow
**Branch:** `feat/onboarding`

**Objective:** Guide new users through workspace setup, first invite, and first lead so they experience the core value immediately after signup.

**Deliverables:**
- [ ] `src/app/(app)/onboarding/page.tsx` — 3-step wizard (Client Component):
  - Step 1: Name your workspace (prefilled from signup, editable)
  - Step 2: Invite a teammate (optional email input, skip available)
  - Step 3: Add your first lead (inline mini-form)
- [ ] `src/components/onboarding/StepIndicator.tsx` — progress dots
- [ ] On signup: `workspace.onboarding_completed = false`; middleware redirects to `/onboarding` if not completed and no leads exist
- [ ] On completing step 3 (or explicit skip): set `workspace.onboarding_completed = true`, redirect to `/dashboard`
- [ ] Migration `006_onboarding.sql`: add `onboarding_completed boolean default false` to `workspaces`
- [ ] `tsc --noEmit` passes

**Final commit:** `feat: onboarding wizard — workspace setup, teammate invite and first lead`

---

## Phase 6 — Deploy

### M17 · Production Deploy
**Branch:** `deploy/production`

**Objective:** Ship Kyrios CRM to production on Vercel + Supabase with all environment variables configured and smoke-tested.

**Deliverables:**
- [ ] Create GitHub repository, push `main` branch
- [ ] Run all Supabase migrations on the production project (`supabase db push`)
- [ ] Deploy Stripe webhook Edge Function (`supabase functions deploy stripe-webhook`)
- [ ] Register Stripe webhook endpoint in Stripe dashboard, copy signing secret to env
- [ ] Create Vercel project linked to GitHub repo
- [ ] Configure all env vars in Vercel (SUPABASE_URL, SUPABASE_ANON_KEY, STRIPE_*, RESEND_API_KEY, NEXT_PUBLIC_APP_URL)
- [ ] Set `NEXT_PUBLIC_APP_URL` to production Vercel domain
- [ ] Add production domain to Supabase Auth allowed redirect URLs
- [ ] Smoke test checklist:
  - [ ] Landing page loads and looks correct
  - [ ] Sign up creates user + workspace
  - [ ] Can create a lead and see it in the list
  - [ ] Can create a deal and drag between stages
  - [ ] Invite email arrives and accept flow works
  - [ ] Stripe checkout opens and completes (test mode)
  - [ ] Webhook fires and workspace plan changes to `pro`
  - [ ] Customer Portal opens from billing settings
- [ ] Set Stripe to live mode after smoke test passes

**Final commit:** `deploy: production release — Vercel + Supabase, all env vars and smoke test passed`

---

## Milestone Summary

| # | Branch | Phase | Status |
|---|---|---|---|
| M01 | `setup/project-init` | Foundation | ✅ |
| M02 | `feat/app-shell-ui` | Foundation | ✅ |
| M03 | `feat/landing-page` | Foundation | ✅ |
| M04 | `feat/auth-ui` | Core UI | ✅ |
| M05 | `feat/leads-ui` | Core UI | ✅ |
| M06 | `feat/pipeline-ui` | Core UI | ⬜ |
| M07 | `feat/dashboard-ui` | Core UI | ⬜ |
| M08 | `feat/settings-ui` | Core UI | ⬜ |
| M09 | `feat/supabase-auth` | Backend Foundation | ⬜ |
| M10 | `feat/leads-backend` | Feature Backends | ⬜ |
| M11 | `feat/pipeline-backend` | Feature Backends | ⬜ |
| M12 | `feat/activities-backend` | Feature Backends | ⬜ |
| M13 | `feat/dashboard-backend` | Feature Backends | ⬜ |
| M14 | `feat/multi-workspace` | Advanced Features | ⬜ |
| M15 | `feat/stripe` | Advanced Features | ⬜ |
| M16 | `feat/onboarding` | Advanced Features | ⬜ |
| M17 | `deploy/production` | Deploy | ⬜ |
