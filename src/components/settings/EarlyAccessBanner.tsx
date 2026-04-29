import { Sparkles } from "lucide-react";

export function EarlyAccessBanner() {
  return (
    <div className="rounded-xl border border-[#F4C430]/50 bg-[#F4C430]/10 p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-[#F4C430]/20 p-2.5 shrink-0">
          <Sparkles className="h-5 w-5 text-[#F4C430]" />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-foreground">
            Acesso Antecipado — Todos os Recursos Liberados
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Você faz parte dos primeiros 50 workspaces do Kyrios CRM. Como
            agradecimento, todos os recursos do plano Pro estão disponíveis sem
            custo durante o período de acesso antecipado.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {[
              "Membros ilimitados",
              "Leads ilimitados",
              "Pipeline e Kanban completo",
              "Dashboard com métricas",
              "Suporte prioritário",
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F4C430] shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Quando a cobrança for ativada, você será avisado com antecedência.
          </p>
        </div>
      </div>
    </div>
  );
}
