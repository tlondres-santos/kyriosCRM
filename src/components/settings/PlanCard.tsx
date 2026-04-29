import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import type { Plan } from "@/types";

interface PlanCardProps {
  plan: Plan;
  leadsUsed: number;
  leadsMax: number;
  membersUsed: number;
  membersMax: number;
}

const PRO_FEATURES = [
  "Membros ilimitados",
  "Leads ilimitados",
  "Pipeline Kanban completo",
  "Dashboard com métricas",
  "Suporte prioritário",
];

const FREE_FEATURES = [
  "Até 2 membros",
  "Até 50 leads",
  "Pipeline Kanban",
  "Dashboard básico",
];

export function PlanCard({
  plan,
  leadsUsed,
  leadsMax,
  membersUsed,
  membersMax,
}: PlanCardProps) {
  const isPro = plan === "pro";
  const features = isPro ? PRO_FEATURES : FREE_FEATURES;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Plano Atual</CardTitle>
          <Badge
            className={
              isPro
                ? "bg-[#290042] text-white hover:bg-[#290042]/90"
                : "bg-secondary text-secondary-foreground"
            }
          >
            {isPro ? "Pro" : "Free"}
          </Badge>
        </div>
        {isPro ? (
          <p className="text-2xl font-bold">
            R$ 49
            <span className="text-sm font-normal text-muted-foreground">
              /mês
            </span>
          </p>
        ) : (
          <p className="text-2xl font-bold">
            Gratuito
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-5">
        <ul className="space-y-2">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 shrink-0 text-primary" />
              {f}
            </li>
          ))}
        </ul>

        {!isPro && (
          <div className="space-y-3">
            <UsageBar label="Leads" used={leadsUsed} max={leadsMax} />
            <UsageBar label="Membros" used={membersUsed} max={membersMax} />
          </div>
        )}

        {isPro ? (
          <Button variant="outline" className="w-full" disabled>
            Gerenciar Assinatura
          </Button>
        ) : (
          <Button className="w-full" disabled>
            <Zap className="mr-2 h-4 w-4" />
            Fazer Upgrade para Pro — R$ 49/mês
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function UsageBar({
  label,
  used,
  max,
}: {
  label: string;
  used: number;
  max: number;
}) {
  const pct = Math.min((used / max) * 100, 100);
  const isNearLimit = pct >= 80;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span>
          {used} / {max}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${
            isNearLimit ? "bg-destructive" : "bg-primary"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
