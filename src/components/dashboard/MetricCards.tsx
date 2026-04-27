import type { ReactNode } from "react";
import { Users, Briefcase, DollarSign, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MOCK_METRICS, MOCK_METRIC_TRENDS } from "@/lib/mock/metrics";

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
  const m = MOCK_METRICS;
  const t = MOCK_METRIC_TRENDS;

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total de Leads"
        value={String(m.totalLeads)}
        icon={<Users className="h-5 w-5" />}
        trendLabel={`+${t.totalLeads.delta} leads`}
        trendUp={t.totalLeads.up}
      />
      <MetricCard
        title="Negócios Abertos"
        value={String(m.openDeals)}
        icon={<Briefcase className="h-5 w-5" />}
        trendLabel={`+${t.openDeals.delta} negócio`}
        trendUp={t.openDeals.up}
      />
      <MetricCard
        title="Valor do Pipeline"
        value={formatCurrency(m.pipelineValue)}
        icon={<DollarSign className="h-5 w-5" />}
        trendLabel={`+${formatCurrency(t.pipelineValue.delta)}`}
        trendUp={t.pipelineValue.up}
      />
      <MetricCard
        title="Taxa de Conversão"
        value={`${m.conversionRate}%`}
        icon={<TrendingUp className="h-5 w-5" />}
        trendLabel={`-${t.conversionRate.delta}%`}
        trendUp={t.conversionRate.up}
      />
    </div>
  );
}
