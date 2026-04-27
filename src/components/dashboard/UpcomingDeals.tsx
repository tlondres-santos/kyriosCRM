import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MOCK_UPCOMING } from "@/lib/mock/metrics";
import { PIPELINE_STAGES } from "@/types";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(value);
}

function formatDeadline(deadline: string) {
  const date = new Date(deadline + "T00:00:00");
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

const STAGE_BADGE: Record<string, string> = {
  novo_lead: "bg-slate-100 text-slate-700",
  contato_realizado: "bg-blue-100 text-blue-700",
  proposta_enviada: "bg-amber-100 text-amber-700",
  negociacao: "bg-purple-100 text-purple-700",
  fechado_ganho: "bg-emerald-100 text-emerald-700",
  fechado_perdido: "bg-red-100 text-red-600",
};

export function UpcomingDeals() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Próximos Prazos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {MOCK_UPCOMING.map((deal) => {
          const stageLabel =
            PIPELINE_STAGES.find((s) => s.id === deal.stage)?.label ?? deal.stage;
          return (
            <div key={deal.id} className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{deal.title}</p>
                <Badge
                  className={cn(
                    "mt-1 text-xs font-normal border-0",
                    STAGE_BADGE[deal.stage] ?? "bg-slate-100 text-slate-700"
                  )}
                >
                  {stageLabel}
                </Badge>
              </div>
              <div className="text-right shrink-0 space-y-1">
                <p className="text-sm font-semibold text-[#290042]">
                  {formatCurrency(deal.value)}
                </p>
                {deal.deadline && (
                  <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDeadline(deal.deadline)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
