import type { Plan } from "@/types";

export interface AdminWorkspace {
  id: string;
  name: string;
  slug: string;
  plan: Plan;
  workspace_number: number;
  owner_name: string;
  owner_email: string;
  member_count: number;
  lead_count: number;
  deal_count: number;
  mrr: number;
  created_at: string;
  members: AdminMember[];
  leads: AdminLead[];
  deals: AdminDeal[];
}

export interface AdminMember {
  id: string;
  full_name: string;
  email: string;
  role: "admin" | "member";
  joined_at: string;
}

export interface AdminLead {
  id: string;
  name: string;
  company: string | null;
  status: string;
  created_at: string;
}

export interface AdminDeal {
  id: string;
  title: string;
  value: number;
  stage: string;
  created_at: string;
}

export const ADMIN_WORKSPACES: AdminWorkspace[] = [
  {
    id: "ws-1",
    name: "Minha Empresa",
    slug: "minha-empresa",
    plan: "free",
    workspace_number: 1,
    owner_name: "Tiago Londres",
    owner_email: "tiago@kyrioscrm.com.br",
    member_count: 3,
    lead_count: 10,
    deal_count: 9,
    mrr: 0,
    created_at: "2024-01-15T10:00:00.000Z",
    members: [
      { id: "m1", full_name: "Tiago Londres", email: "tiago@kyrioscrm.com.br", role: "admin", joined_at: "2024-01-15T10:00:00.000Z" },
      { id: "m2", full_name: "Ana Silva", email: "ana@kyrioscrm.com.br", role: "member", joined_at: "2024-01-20T09:00:00.000Z" },
      { id: "m3", full_name: "Carlos Mendes", email: "carlos@kyrioscrm.com.br", role: "member", joined_at: "2024-02-01T11:00:00.000Z" },
    ],
    leads: [
      { id: "l1", name: "Fernanda Costa", company: "TechCorp Brasil", status: "qualificado", created_at: "2024-03-01T10:00:00.000Z" },
      { id: "l2", name: "Ricardo Almeida", company: "Vendas Pro", status: "contatado", created_at: "2024-03-05T14:00:00.000Z" },
      { id: "l3", name: "Juliana Ramos", company: "MKT Digital", status: "novo", created_at: "2024-03-10T09:00:00.000Z" },
      { id: "l4", name: "Marcos Oliveira", company: "Indústria XYZ", status: "contatado", created_at: "2024-03-08T11:00:00.000Z" },
      { id: "l5", name: "Patrícia Sousa", company: "Consultoria ABC", status: "novo", created_at: "2024-03-12T16:00:00.000Z" },
      { id: "l6", name: "Eduardo Santos", company: "AgroTec", status: "qualificado", created_at: "2024-03-14T08:00:00.000Z" },
      { id: "l7", name: "Camila Ferreira", company: "Saúde 360", status: "qualificado", created_at: "2024-03-05T13:00:00.000Z" },
      { id: "l8", name: "Bruno Lima", company: "Fintech IO", status: "contatado", created_at: "2024-03-18T10:00:00.000Z" },
      { id: "l9", name: "Sônia Gomes", company: "Varejo BR", status: "desqualificado", created_at: "2024-02-28T15:00:00.000Z" },
      { id: "l10", name: "André Barros", company: "Logística Sul", status: "desqualificado", created_at: "2024-02-25T12:00:00.000Z" },
    ],
    deals: [
      { id: "d1", title: "Contrato TechCorp", value: 12000, stage: "proposta_enviada", created_at: "2024-03-02T10:00:00.000Z" },
      { id: "d2", title: "Parceria AgroTec", value: 8500, stage: "fechado_ganho", created_at: "2024-03-10T14:00:00.000Z" },
      { id: "d3", title: "Projeto Saúde 360", value: 5000, stage: "negociacao", created_at: "2024-03-12T09:00:00.000Z" },
    ],
  },
  {
    id: "ws-2",
    name: "Cliente Alpha",
    slug: "cliente-alpha",
    plan: "pro",
    workspace_number: 2,
    owner_name: "Beatriz Rocha",
    owner_email: "beatriz@clientealpha.com.br",
    member_count: 5,
    lead_count: 28,
    deal_count: 14,
    mrr: 49,
    created_at: "2024-01-22T08:30:00.000Z",
    members: [
      { id: "m4", full_name: "Beatriz Rocha", email: "beatriz@clientealpha.com.br", role: "admin", joined_at: "2024-01-22T08:30:00.000Z" },
      { id: "m5", full_name: "Rafael Torres", email: "rafael@clientealpha.com.br", role: "member", joined_at: "2024-01-25T10:00:00.000Z" },
      { id: "m6", full_name: "Larissa Pinto", email: "larissa@clientealpha.com.br", role: "member", joined_at: "2024-02-03T09:00:00.000Z" },
      { id: "m7", full_name: "Diego Faria", email: "diego@clientealpha.com.br", role: "member", joined_at: "2024-02-10T14:00:00.000Z" },
      { id: "m8", full_name: "Mônica Reis", email: "monica@clientealpha.com.br", role: "admin", joined_at: "2024-02-15T11:00:00.000Z" },
    ],
    leads: [
      { id: "l11", name: "Grupo Nexus", company: "Nexus Tecnologia", status: "qualificado", created_at: "2024-02-01T10:00:00.000Z" },
      { id: "l12", name: "Marina Castro", company: "Editora Bloom", status: "contatado", created_at: "2024-02-05T14:00:00.000Z" },
      { id: "l13", name: "Paulo Neto", company: "Construtora Prime", status: "novo", created_at: "2024-02-10T09:00:00.000Z" },
      { id: "l14", name: "Simone Leal", company: "HR Connect", status: "qualificado", created_at: "2024-02-12T11:00:00.000Z" },
      { id: "l15", name: "Roberto Vaz", company: "Energia Verde", status: "contatado", created_at: "2024-02-18T16:00:00.000Z" },
    ],
    deals: [
      { id: "d4", title: "Expansão Nexus Q2", value: 32000, stage: "negociacao", created_at: "2024-02-15T10:00:00.000Z" },
      { id: "d5", title: "Licença Editora Bloom", value: 9800, stage: "proposta_enviada", created_at: "2024-02-20T14:00:00.000Z" },
      { id: "d6", title: "Implantação Prime", value: 45000, stage: "fechado_ganho", created_at: "2024-03-01T09:00:00.000Z" },
    ],
  },
  {
    id: "ws-3",
    name: "Tech Solutions",
    slug: "tech-solutions",
    plan: "free",
    workspace_number: 3,
    owner_name: "Gabriel Moura",
    owner_email: "gabriel@techsolutions.io",
    member_count: 1,
    lead_count: 7,
    deal_count: 3,
    mrr: 0,
    created_at: "2024-02-10T15:00:00.000Z",
    members: [
      { id: "m9", full_name: "Gabriel Moura", email: "gabriel@techsolutions.io", role: "admin", joined_at: "2024-02-10T15:00:00.000Z" },
    ],
    leads: [
      { id: "l16", name: "Clara Drummond", company: "Drummond Advocacia", status: "novo", created_at: "2024-02-15T10:00:00.000Z" },
      { id: "l17", name: "Fábio Cunha", company: "Cunha Imóveis", status: "contatado", created_at: "2024-02-20T14:00:00.000Z" },
      { id: "l18", name: "Vanessa Braga", company: "Studio VB", status: "qualificado", created_at: "2024-02-25T09:00:00.000Z" },
    ],
    deals: [
      { id: "d7", title: "Sistema Drummond", value: 6000, stage: "contato_realizado", created_at: "2024-02-28T10:00:00.000Z" },
    ],
  },
];

export const ADMIN_METRICS = {
  totalWorkspaces: ADMIN_WORKSPACES.length,
  totalUsers: ADMIN_WORKSPACES.reduce((s, w) => s + w.member_count, 0),
  totalLeads: ADMIN_WORKSPACES.reduce((s, w) => s + w.lead_count, 0),
  mrr: ADMIN_WORKSPACES.reduce((s, w) => s + w.mrr, 0),
  proWorkspaces: ADMIN_WORKSPACES.filter((w) => w.plan === "pro").length,
};
