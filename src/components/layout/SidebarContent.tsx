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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { UserMenu } from "./UserMenu";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { Check } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/pipeline", label: "Pipeline", icon: KanbanSquare },
  { href: "/settings", label: "Configurações", icon: Settings },
];

interface SidebarContentProps {
  onNavigate?: () => void;
}

export function SidebarContent({ onNavigate }: SidebarContentProps) {
  const pathname = usePathname();
  const { workspaces, activeWorkspace, setActiveWorkspaceId } = useWorkspace();

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
            <span className="flex-1 truncate text-left">{activeWorkspace.name}</span>
            <ChevronDown className="h-3 w-3 shrink-0 opacity-60" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            {workspaces.map((ws) => (
              <DropdownMenuItem
                key={ws.id}
                onClick={() => setActiveWorkspaceId(ws.id)}
                className="flex items-center justify-between"
              >
                <span>{ws.name}</span>
                {ws.id === activeWorkspace.id && (
                  <Check className="h-3.5 w-3.5 text-primary" />
                )}
              </DropdownMenuItem>
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

      <UserMenu />
    </div>
  );
}
