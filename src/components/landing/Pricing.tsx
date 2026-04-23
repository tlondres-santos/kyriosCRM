import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "R$0",
    period: "para sempre",
    description: "Para quem está começando a organizar as vendas.",
    highlight: false,
    cta: "Começar grátis",
    href: "/signup",
    features: [
      "Até 2 colaboradores",
      "Até 50 leads",
      "Pipeline Kanban completo",
      "Registro de atividades",
      "1 workspace",
    ],
  },
  {
    name: "Pro",
    price: "R$49",
    period: "por mês",
    description: "Para times que querem crescer sem limites.",
    highlight: true,
    cta: "Assinar Pro",
    href: "/signup?plan=pro",
    features: [
      "Colaboradores ilimitados",
      "Leads ilimitados",
      "Pipeline Kanban completo",
      "Registro de atividades",
      "Workspaces ilimitados",
      "Dashboard de métricas",
      "Convites por e-mail",
      "Suporte prioritário",
    ],
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="bg-[#290042]/4 px-6 py-24"
    >
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#290042] sm:text-4xl">
            Planos simples, sem surpresas
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comece grátis. Faça upgrade quando precisar.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 sm:items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                plan.highlight
                  ? "border-[#290042] bg-[#290042] text-white shadow-2xl shadow-[#290042]/30"
                  : "border-border bg-white"
              }`}
            >
              {plan.highlight && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F4C430] text-[#290042] font-semibold hover:bg-[#F4C430]">
                  Mais popular
                </Badge>
              )}

              <div className="mb-6">
                <h3
                  className={`text-lg font-semibold ${
                    plan.highlight ? "text-white" : "text-foreground"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-bold ${
                      plan.highlight ? "text-[#F4C430]" : "text-[#290042]"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.highlight ? "text-white/60" : "text-muted-foreground"
                    }`}
                  >
                    /{plan.period}
                  </span>
                </div>
                <p
                  className={`mt-2 text-sm ${
                    plan.highlight ? "text-white/70" : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm">
                    <Check
                      className={`h-4 w-4 shrink-0 ${
                        plan.highlight ? "text-[#F4C430]" : "text-[#290042]"
                      }`}
                    />
                    <span
                      className={
                        plan.highlight ? "text-white/80" : "text-foreground"
                      }
                    >
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={
                  plan.highlight
                    ? "bg-[#F4C430] text-[#290042] font-semibold hover:bg-[#F4C430]/90"
                    : "bg-[#290042] text-white hover:bg-[#290042]/90"
                }
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
