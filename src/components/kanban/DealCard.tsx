"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Calendar, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Deal } from "@/types";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(value);
}

function formatDeadline(deadline: string | null) {
  if (!deadline) return null;
  const date = new Date(deadline + "T00:00:00");
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function isOverdue(deadline: string | null) {
  if (!deadline) return false;
  return new Date(deadline + "T00:00:00") < new Date(new Date().toDateString());
}

interface DealCardProps {
  deal: Deal;
  onEdit?: (deal: Deal) => void;
}

export function DealCard({ deal, onEdit }: DealCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const overdue = isOverdue(deal.deadline);

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card
        onClick={() => !isDragging && onEdit?.(deal)}
        className={cn(
          "group cursor-pointer border border-border bg-white shadow-sm hover:shadow-md transition-shadow",
          isDragging && "opacity-50 shadow-lg ring-2 ring-primary/30 cursor-grabbing"
        )}
      >
        <CardContent className="p-3 space-y-2">
          <div className="flex items-start gap-2">
            <button
              {...listeners}
              onClick={(e) => e.stopPropagation()}
              className="mt-0.5 shrink-0 text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-grab active:cursor-grabbing"
              tabIndex={-1}
            >
              <GripVertical className="h-4 w-4" />
            </button>
            <p className="text-sm font-medium text-foreground leading-snug flex-1">
              {deal.title}
            </p>
          </div>

          <div className="pl-6">
            <span className="text-base font-semibold text-[#290042]">
              {formatCurrency(deal.value)}
            </span>
          </div>

          {deal.lead && (
            <div className="pl-6">
              <p className="text-xs text-muted-foreground truncate">
                {deal.lead.name}
                {deal.lead.company && (
                  <span className="text-muted-foreground/60"> · {deal.lead.company}</span>
                )}
              </p>
            </div>
          )}

          <div className="pl-6 flex items-center justify-between gap-2">
            {deal.owner?.full_name && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <User className="h-3 w-3 shrink-0" />
                <span className="truncate">{deal.owner.full_name.split(" ")[0]}</span>
              </div>
            )}

            {deal.deadline && (
              <Badge
                variant="outline"
                className={cn(
                  "text-xs px-1.5 py-0 h-5 font-normal shrink-0",
                  overdue
                    ? "border-red-300 bg-red-50 text-red-600"
                    : "border-border text-muted-foreground"
                )}
              >
                <Calendar className="h-2.5 w-2.5 mr-1" />
                {formatDeadline(deal.deadline)}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
