import { Building2, Users, UserSquare2, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AdminMetrics {
  totalWorkspaces: number;
  totalUsers: number;
  totalLeads: number;
  mrr: number;
  proWorkspaces: number;
}

export function AdminMetricCards({
  totalWorkspaces,
  totalUsers,
  totalLeads,
  mrr,
  proWorkspaces,
}: AdminMetrics) {
  const cards = [
    {
      label: "Workspaces",
      value: totalWorkspaces,
      sub: `${proWorkspaces} Pro · ${totalWorkspaces - proWorkspaces} Free`,
      icon: Building2,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Usuários Totais",
      value: totalUsers,
      sub: "em todos os workspaces",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Leads Totais",
      value: totalLeads,
      sub: "em todos os workspaces",
      icon: UserSquare2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "MRR",
      value: `R$ ${mrr.toLocaleString("pt-BR")}`,
      sub: `${proWorkspaces} assinatura${proWorkspaces !== 1 ? "s" : ""} ativa${proWorkspaces !== 1 ? "s" : ""}`,
      icon: TrendingUp,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <Card key={c.label}>
            <CardContent className="flex items-start gap-3 p-5">
              <div className={`rounded-lg p-2 shrink-0 ${c.bg}`}>
                <Icon className={`h-5 w-5 ${c.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{c.label}</p>
                <p className="text-2xl font-bold tracking-tight">{c.value}</p>
                <p className="text-xs text-muted-foreground truncate">{c.sub}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
