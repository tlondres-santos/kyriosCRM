import {
  KanbanSquare,
  Users,
  MessageSquare,
  BarChart3,
  Building2,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: KanbanSquare,
    title: "Pipeline Kanban",
    description:
      "Mova negócios entre etapas com drag-and-drop. Do primeiro contato ao fechamento, tudo visível num relance.",
  },
  {
    icon: Users,
    title: "Gestão de Leads",
    description:
      "Cadastre contatos completos, filtre por status e responsável, e acompanhe cada lead com histórico detalhado.",
  },
  {
    icon: MessageSquare,
    title: "Registro de Atividades",
    description:
      "Registre ligações, e-mails, reuniões e notas diretamente no lead. Timeline cronológica para não perder nada.",
  },
  {
    icon: BarChart3,
    title: "Dashboard de Métricas",
    description:
      "Total de leads, negócios abertos, valor do pipeline e taxa de conversão. Gráfico de funil para visualizar gargalos.",
  },
  {
    icon: Building2,
    title: "Multi-empresa",
    description:
      "Gerencie múltiplos workspaces, convide colaboradores por e-mail e controle permissões por função.",
  },
  {
    icon: Zap,
    title: "Planos acessíveis",
    description:
      "Comece grátis com até 2 colaboradores e 50 leads. Faça upgrade para o Pro quando precisar crescer.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#290042] sm:text-4xl">
            Tudo que seu time de vendas precisa
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Funcionalidades pensadas para equipes que querem vender mais, não
            gerenciar software.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-xl border border-border/60 p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#290042]/8 text-[#290042] group-hover:bg-[#290042] group-hover:text-[#F4C430] transition-colors">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
