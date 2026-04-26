"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  KanbanSquare,
  Settings,
  ChevronDown,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/pipeline", label: "Pipeline", icon: KanbanSquare },
  { href: "/settings", label: "Configurações", icon: Settings },
];

const mockWorkspaces = [
  { id: "1", name: "Minha Empresa" },
  { id: "2", name: "Cliente Alpha" },
];

interface SidebarContentProps {
  onNavigate?: () => void;
}

export function SidebarContent({ onNavigate }: SidebarContentProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-[#290042] text-white">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <Image
          src="/logo.png"
          alt="Kyrios CRM"
          width={140}
          height={52}
          className="object-contain"
          priority
        />
      </div>

      <Separator className="bg-white/10" />

      {/* Workspace switcher */}
      <div className="px-4 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white outline-none">
            <Building2 className="h-4 w-4 shrink-0" />
            <span className="flex-1 truncate text-left">Minha Empresa</span>
            <ChevronDown className="h-3 w-3 shrink-0 opacity-60" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            {mockWorkspaces.map((ws) => (
              <DropdownMenuItem key={ws.id}>{ws.name}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator className="bg-white/10" />

      {/* Nav links */}
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#F4C430] text-[#290042]"
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

      {/* User profile */}
      <div className="flex items-center gap-3 px-6 py-4">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-[#F4C430] text-[#290042] text-xs font-bold">
            U
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">Usuário</p>
          <p className="truncate text-xs text-white/50">usuario@email.com</p>
        </div>
      </div>
    </div>
  );
}
