"use client";

import type { ReactNode } from "react";
import { Users, Briefcase, DollarSign, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MOCK_METRIC_TRENDS } from "@/lib/mock/metrics";
import { MOCK_LEADS } from "@/lib/mock/leads";
import { MOCK_DEALS } from "@/lib/mock/deals";
import { useWorkspace } from "@/contexts/WorkspaceContext";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(value);
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trendLabel: string;
  trendUp: boolean;
}

function MetricCard({ title, value, icon, trendLabel, trendUp }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
          </div>
          <div className="rounded-md bg-[#290042]/10 p-2 text-[#290042]">{icon}</div>
        </div>
        <div
          className={cn(
            "mt-3 flex items-center gap-1 text-xs",
            trendUp ? "text-emerald-600" : "text-red-500"
          )}
        >
          {trendUp ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
          <span>{trendLabel} em relação ao mês passado</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function MetricCards() {
  const { activeWorkspaceId } = useWorkspace();
  const leads = MOCK_LEADS.filter((l) => l.workspace_id === activeWorkspaceId);
  const deals = MOCK_DEALS.filter((d) => d.workspace_id === activeWorkspaceId);

  const totalLeads = leads.length;
  const openDeals = deals.filter(
    (d) => d.stage !== "fechado_ganho" && d.stage !== "fechado_perdido"
  ).length;
  const pipelineValue = deals.filter(
    (d) => d.stage !== "fechado_perdido"
  ).reduce((sum, d) => sum + d.value, 0);
  const won = deals.filter((d) => d.stage === "fechado_ganho").length;
  const conversionRate =
    deals.length > 0 ? Math.round((won / deals.length) * 100) : 0;
  const t = MOCK_METRIC_TRENDS;

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total de Leads"
        value={String(totalLeads)}
        icon={<Users className="h-5 w-5" />}
        trendLabel={`+${t.totalLeads.delta} leads`}
        trendUp={t.totalLeads.up}
      />
      <MetricCard
        title="Negócios Abertos"
        value={String(openDeals)}
        icon={<Briefcase className="h-5 w-5" />}
        trendLabel={`+${t.openDeals.delta} negócio`}
        trendUp={t.openDeals.up}
      />
      <MetricCard
        title="Valor do Pipeline"
        value={formatCurrency(pipelineValue)}
        icon={<DollarSign className="h-5 w-5" />}
        trendLabel={`+${formatCurrency(t.pipelineValue.delta)}`}
        trendUp={t.pipelineValue.up}
      />
      <MetricCard
        title="Taxa de Conversão"
        value={`${conversionRate}%`}
        icon={<TrendingUp className="h-5 w-5" />}
        trendLabel={`-${t.conversionRate.delta}%`}
        trendUp={t.conversionRate.up}
      />
    </div>
  );
}
