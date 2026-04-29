"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Users, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const settingsNav = [
  { href: "/settings/workspace", label: "Workspace", icon: Building2 },
  { href: "/settings/team", label: "Equipe", icon: Users },
  { href: "/settings/billing", label: "Faturamento", icon: CreditCard },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie seu workspace, equipe e plano.
        </p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <nav className="flex shrink-0 flex-row gap-1 md:w-48 md:flex-col">
          {settingsNav.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
