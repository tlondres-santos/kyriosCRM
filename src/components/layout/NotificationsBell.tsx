"use client";

import { useState } from "react";
import { Bell, UserPlus, KanbanSquare, Users, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    icon: Users,
    title: "Novo lead adicionado",
    description: "Fernanda Costa foi adicionada por Ana Silva.",
    time: "há 5 min",
    read: false,
  },
  {
    id: "n2",
    icon: KanbanSquare,
    title: "Negócio avançou de etapa",
    description: "\"Contrato TechCorp\" movido para Proposta Enviada.",
    time: "há 23 min",
    read: false,
  },
  {
    id: "n3",
    icon: UserPlus,
    title: "Convite aceito",
    description: "Carlos Mendes entrou no workspace.",
    time: "há 2 h",
    read: false,
  },
  {
    id: "n4",
    icon: KanbanSquare,
    title: "Negócio fechado",
    description: "\"Parceria AgroTec\" marcado como Fechado Ganho.",
    time: "ontem",
    read: true,
  },
];

export function NotificationsBell() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#F4C430] text-[10px] font-bold text-[#290042]">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <span className="text-sm font-semibold">Notificações</span>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Marcar todas como lidas
            </button>
          )}
        </div>

        <ul className="max-h-80 overflow-y-auto divide-y">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <li
                key={n.id}
                onClick={() => markRead(n.id)}
                className={cn(
                  "flex cursor-pointer gap-3 px-4 py-3 transition-colors hover:bg-muted/50",
                  !n.read && "bg-[#F4C430]/5"
                )}
              >
                <div
                  className={cn(
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    n.read
                      ? "bg-muted text-muted-foreground"
                      : "bg-primary/10 text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={cn(
                        "text-sm leading-snug",
                        n.read ? "font-normal" : "font-medium"
                      )}
                    >
                      {n.title}
                    </p>
                    {!n.read && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#F4C430]" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {n.description}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/60">
                    {n.time}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        {notifications.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            Nenhuma notificação.
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
