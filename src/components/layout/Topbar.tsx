"use client";

import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NotificationsBell } from "./NotificationsBell";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/leads": "Leads",
  "/pipeline": "Pipeline",
  "/settings": "Configurações",
  "/settings/workspace": "Configurações — Workspace",
  "/settings/team": "Configurações — Equipe",
  "/settings/billing": "Configurações — Plano",
};

function getTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  const base = "/" + pathname.split("/")[1];
  return pageTitles[base] ?? "Kyrios CRM";
}

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-white px-6">
      {/* Mobile hamburger */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Page title */}
      <h1 className="text-lg font-semibold text-foreground hidden sm:block">
        {getTitle(pathname)}
      </h1>

      {/* Search */}
      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            className="w-64 pl-9 h-9 bg-muted/50 border-0 focus-visible:ring-1"
          />
        </div>

        <NotificationsBell />
      </div>
    </header>
  );
}
