"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { PIPELINE_STAGES, type Deal, type PipelineStage } from "@/types";
import { MOCK_DEALS } from "@/lib/mock/deals";
import { KanbanColumn } from "./KanbanColumn";
import { DealCard } from "./DealCard";
import { DealEditSheet } from "./DealEditSheet";

export function KanbanBoard() {
  const [deals, setDeals] = useState<Deal[]>(MOCK_DEALS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const activeDeal = activeId ? deals.find((d) => d.id === activeId) ?? null : null;

  const getDealsForStage = useCallback(
    (stage: PipelineStage) => deals.filter((d) => d.stage === stage),
    [deals]
  );

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(active.id as string);
  }

  function handleDragOver({ active, over }: DragOverEvent) {
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeDeal = deals.find((d) => d.id === activeId);
    if (!activeDeal) return;

    const overStage = PIPELINE_STAGES.find((s) => s.id === overId)?.id;
    if (overStage && activeDeal.stage !== overStage) {
      setDeals((prev) =>
        prev.map((d) => (d.id === activeId ? { ...d, stage: overStage } : d))
      );
      return;
    }

    const overDeal = deals.find((d) => d.id === overId);
    if (overDeal && activeDeal.stage !== overDeal.stage) {
      setDeals((prev) =>
        prev.map((d) => (d.id === activeId ? { ...d, stage: overDeal.stage } : d))
      );
    }
  }

  function handleSaveDeal(updated: Deal) {
    setDeals((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null);
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    setDeals((prev) => {
      const activeIndex = prev.findIndex((d) => d.id === activeId);
      const overIndex = prev.findIndex((d) => d.id === overId);
      if (activeIndex === -1 || overIndex === -1) return prev;
      return arrayMove(prev, activeIndex, overIndex);
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-3 overflow-x-auto pb-4">
        {PIPELINE_STAGES.map((stage) => (
          <KanbanColumn
            key={stage.id}
            id={stage.id}
            label={stage.label}
            deals={getDealsForStage(stage.id)}
            onEdit={setEditingDeal}
          />
        ))}
      </div>

      <DragOverlay>
        {activeDeal && <DealCard deal={activeDeal} />}
      </DragOverlay>

      <DealEditSheet
        deal={editingDeal}
        open={!!editingDeal}
        onClose={() => setEditingDeal(null)}
        onSave={handleSaveDeal}
      />
    </DndContext>
  );
}
