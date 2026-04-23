import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#290042] px-6 py-24 sm:py-32">
      {/* Background decoration */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(244,196,48,0.12),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#F4C430]/5 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/3 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center rounded-full border border-[#F4C430]/30 bg-[#F4C430]/10 px-4 py-1.5">
          <span className="text-xs font-medium text-[#F4C430]">
            Novo · Plano Pro agora por R$49/mês
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Seu pipeline de vendas,{" "}
          <span className="text-[#F4C430]">sem complicação</span>
        </h1>

        {/* Subline */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
          CRM visual com Kanban, gestão de leads e métricas em tempo real.
          Feito para PMEs, freelancers e times de vendas que precisam de clareza
          — não de complexidade.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-[#F4C430] text-[#290042] font-semibold px-8 hover:bg-[#F4C430]/90 shadow-lg shadow-[#F4C430]/20"
          >
            <Link href="/signup">
              Começar grátis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/20 bg-white/5 text-white px-8 hover:bg-white/10 hover:border-white/30 hover:text-white"
          >
            <Link href="#features">
              <Play className="mr-2 h-4 w-4" />
              Ver como funciona
            </Link>
          </Button>
        </div>

        {/* Social proof */}
        <p className="mt-8 text-sm text-white/40">
          Sem cartão de crédito · Plano Free para sempre · Setup em 2 minutos
        </p>
      </div>
    </section>
  );
}
