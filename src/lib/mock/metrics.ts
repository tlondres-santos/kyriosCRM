import type { MetricCards, FunnelDataPoint } from "@/types";
import type { Deal } from "@/types";

export const MOCK_METRICS: MetricCards = {
  totalLeads: 10,
  openDeals: 7,
  pipelineValue: 50290,
  conversionRate: 50,
};

export const MOCK_METRIC_TRENDS = {
  totalLeads: { delta: 2, up: true },
  openDeals: { delta: 1, up: true },
  pipelineValue: { delta: 3500, up: true },
  conversionRate: { delta: 5, up: false },
};

export const MOCK_FUNNEL: FunnelDataPoint[] = [
  { stage: "novo_lead", label: "Novo Lead", count: 2 },
  { stage: "contato_realizado", label: "Contato", count: 2 },
  { stage: "proposta_enviada", label: "Proposta", count: 1 },
  { stage: "negociacao", label: "Negociação", count: 2 },
  { stage: "fechado_ganho", label: "Ganho", count: 1 },
  { stage: "fechado_perdido", label: "Perdido", count: 1 },
];

export const MOCK_UPCOMING: Pick<
  Deal,
  "id" | "title" | "stage" | "value" | "deadline" | "lead"
>[] = [
  {
    id: "deal-2",
    title: "Plano Pro Anual — Vendas Pro",
    stage: "negociacao",
    value: 5880,
    deadline: "2026-05-02",
    lead: { id: "lead-2", name: "Ricardo Almeida", company: "Vendas Pro" },
  },
  {
    id: "deal-7",
    title: "Saúde 360 — Piloto 3 usuários",
    stage: "negociacao",
    value: 1470,
    deadline: "2026-05-04",
    lead: { id: "lead-7", name: "Camila Ferreira", company: "Saúde 360" },
  },
  {
    id: "deal-1",
    title: "Implantação CRM — TechCorp Brasil",
    stage: "proposta_enviada",
    value: 12000,
    deadline: "2026-05-08",
    lead: { id: "lead-1", name: "Fernanda Costa", company: "TechCorp Brasil" },
  },
  {
    id: "deal-3",
    title: "Licença MKT Digital",
    stage: "contato_realizado",
    value: 2940,
    deadline: "2026-05-15",
    lead: { id: "lead-3", name: "Juliana Ramos", company: "MKT Digital" },
  },
  {
    id: "deal-8",
    title: "Fintech IO — Integração API",
    stage: "contato_realizado",
    value: 6000,
    deadline: "2026-05-20",
    lead: { id: "lead-8", name: "Bruno Lima", company: "Fintech IO" },
  },
];
