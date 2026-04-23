import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#290042]/95 backdrop-blur supports-[backdrop-filter]:bg-[#290042]/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold tracking-tight text-white">
            Kyrios <span className="text-[#F4C430]">CRM</span>
          </span>
        </Link>

        {/* Nav links — hidden on mobile */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-white/70 transition-colors hover:text-white"
          >
            Funcionalidades
          </a>
          <a
            href="#pricing"
            className="text-sm text-white/70 transition-colors hover:text-white"
          >
            Planos
          </a>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-white/80 hover:bg-white/10 hover:text-white"
          >
            <Link href="/login">Entrar</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-[#F4C430] text-[#290042] font-semibold hover:bg-[#F4C430]/90"
          >
            <Link href="/signup">Começar grátis</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
