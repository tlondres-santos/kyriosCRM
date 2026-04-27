"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import { DealCard } from "./DealCard";
import type { Deal, PipelineStage } from "@/types";

interface KanbanColumnProps {
  id: PipelineStage;
  label: string;
  deals: Deal[];
  onEdit: (deal: Deal) => void;
}

const COLUMN_STYLES: Partial<Record<PipelineStage, string>> = {
  fechado_ganho: "border-t-emerald-500",
  fechado_perdido: "border-t-red-400",
};

const COUNT_STYLES: Partial<Record<PipelineStage, string>> = {
  fechado_ganho: "bg-emerald-100 text-emerald-700",
  fechado_perdido: "bg-red-100 text-red-600",
};

export function KanbanColumn({ id, label, deals, onEdit }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  const dealIds = deals.map((d) => d.id);

  return (
    <div className="flex flex-col w-64 shrink-0">
      <div
        className={cn(
          "rounded-t-lg border-t-2 border-x border-border bg-muted/40 px-3 py-2.5 flex items-center justify-between",
          COLUMN_STYLES[id] ?? "border-t-[#290042]"
        )}
      >
        <h3 className="text-sm font-semibold text-foreground truncate">{label}</h3>
        <span
          className={cn(
            "ml-2 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
            COUNT_STYLES[id] ?? "bg-[#290042]/10 text-[#290042]"
          )}
        >
          {deals.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 min-h-32 rounded-b-lg border-x border-b border-border bg-muted/20 p-2 space-y-2 transition-colors",
          isOver && "bg-primary/5"
        )}
      >
        <SortableContext items={dealIds} strategy={verticalListSortingStrategy}>
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} onEdit={onEdit} />
          ))}
        </SortableContext>

        {deals.length === 0 && (
          <div className="flex h-20 items-center justify-center text-xs text-muted-foreground/50">
            Sem negócios
          </div>
        )}
      </div>
    </div>
  );
}
