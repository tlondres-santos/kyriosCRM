import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const links = [
  {
    label: "Produto",
    items: [
      { label: "Funcionalidades", href: "#features" },
      { label: "Planos", href: "#pricing" },
    ],
  },
  {
    label: "Conta",
    items: [
      { label: "Entrar", href: "/login" },
      { label: "Criar conta", href: "/signup" },
    ],
  },
  {
    label: "Legal",
    items: [
      { label: "Privacidade", href: "/privacidade" },
      { label: "Termos de uso", href: "/termos" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#290042] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center">
              <span className="text-xl font-bold tracking-tight text-white">
                Kyrios <span className="text-[#F4C430]">CRM</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Pipeline de vendas simples e eficiente para times que querem
              crescer.
            </p>
          </div>

          {/* Link columns */}
          {links.map((col) => (
            <div key={col.label}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                {col.label}
              </h4>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-white/10" />

        <p className="text-center text-xs text-white/30">
          © {new Date().getFullYear()} Kyrios CRM. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
