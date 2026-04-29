"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, ShieldCheck, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const adminNav = [
  { href: "/admin/overview", label: "Visão Geral", icon: LayoutDashboard },
  { href: "/admin/workspaces", label: "Workspaces", icon: Building2 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      {/* Sidebar */}
      <aside className="flex w-60 shrink-0 flex-col bg-[#1a0029] text-white">
        {/* Header */}
        <div className="flex h-16 items-center gap-2.5 px-5">
          <ShieldCheck className="h-5 w-5 text-[#F4C430] shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-bold leading-none">Kyrios CRM</p>
            <Badge
              variant="outline"
              className="mt-1 border-[#F4C430]/50 text-[#F4C430] text-[10px] px-1.5 py-0"
            >
              Platform Admin
            </Badge>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <nav className="flex-1 space-y-1 px-3 py-4">
          {adminNav.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + "/") ||
              (href === "/admin/workspaces" && pathname.startsWith("/admin/workspaces"));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#F4C430] text-[#1a0029]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        <Separator className="bg-white/10" />

        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar className="h-7 w-7 shrink-0">
              <AvatarFallback className="bg-[#F4C430] text-[#1a0029] text-xs font-bold">
                TL
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-white">
                Tiago Londres
              </p>
              <p className="truncate text-[10px] text-white/50">
                Super Admin
              </p>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="text-white/40 hover:text-white transition-colors"
            title="Voltar ao app"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-4 w-4 text-[#F4C430]" />
            <span className="text-sm font-semibold text-foreground">
              Painel Administrativo da Plataforma
            </span>
          </div>
          <span className="rounded-md bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs text-amber-700 font-medium">
            Visível apenas para você — não acessível a usuários do CRM
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
