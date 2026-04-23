export type Plan = "free" | "pro";

export type WorkspaceRole = "admin" | "member";

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: Plan;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  onboarding_completed: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}

export interface WorkspaceMember {
  workspace_id: string;
  user_id: string;
  role: WorkspaceRole;
  profile?: Profile;
}

export type LeadStatus =
  | "novo"
  | "contatado"
  | "qualificado"
  | "desqualificado";

export interface Lead {
  id: string;
  workspace_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  role: string | null;
  status: LeadStatus;
  owner_id: string | null;
  created_at: string;
  owner?: Profile;
}

export type PipelineStage =
  | "novo_lead"
  | "contato_realizado"
  | "proposta_enviada"
  | "negociacao"
  | "fechado_ganho"
  | "fechado_perdido";

export const PIPELINE_STAGES: { id: PipelineStage; label: string }[] = [
  { id: "novo_lead", label: "Novo Lead" },
  { id: "contato_realizado", label: "Contato Realizado" },
  { id: "proposta_enviada", label: "Proposta Enviada" },
  { id: "negociacao", label: "Negociação" },
  { id: "fechado_ganho", label: "Fechado Ganho" },
  { id: "fechado_perdido", label: "Fechado Perdido" },
];

export interface Deal {
  id: string;
  workspace_id: string;
  title: string;
  value: number;
  stage: PipelineStage;
  lead_id: string | null;
  owner_id: string | null;
  deadline: string | null;
  created_at: string;
  lead?: Pick<Lead, "id" | "name" | "company">;
  owner?: Profile;
}

export type ActivityType = "ligacao" | "email" | "reuniao" | "nota";

export interface Activity {
  id: string;
  workspace_id: string;
  lead_id: string;
  author_id: string;
  type: ActivityType;
  description: string;
  activity_date: string;
  created_at: string;
  author?: Profile;
}

export interface Invite {
  id: string;
  workspace_id: string;
  email: string;
  role: WorkspaceRole;
  token: string;
  invited_by: string;
  accepted_at: string | null;
  expires_at: string;
  workspace?: Pick<Workspace, "id" | "name">;
}

export interface PlanLimitResult {
  allowed: boolean;
  current: number;
  max: number;
}

export interface MetricCards {
  totalLeads: number;
  openDeals: number;
  pipelineValue: number;
  conversionRate: number;
}

export interface FunnelDataPoint {
  stage: string;
  label: string;
  count: number;
}
