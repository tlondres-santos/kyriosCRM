"use client";

import { useState, useCallback, useEffect } from "react";
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
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { KanbanColumn } from "./KanbanColumn";
import { DealCard } from "./DealCard";
import { DealEditSheet } from "./DealEditSheet";

export function KanbanBoard() {
  const { activeWorkspaceId } = useWorkspace();
  const [deals, setDeals] = useState<Deal[]>(() =>
    MOCK_DEALS.filter((d) => d.workspace_id === activeWorkspaceId)
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);

  useEffect(() => {
    setDeals(MOCK_DEALS.filter((d) => d.workspace_id === activeWorkspaceId));
  }, [activeWorkspaceId]);

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
      const idx = MOCK_DEALS.findIndex((d) => d.id === activeId);
      if (idx !== -1) MOCK_DEALS[idx] = { ...MOCK_DEALS[idx], stage: overStage };
      return;
    }

    const overDeal = deals.find((d) => d.id === overId);
    if (overDeal && activeDeal.stage !== overDeal.stage) {
      setDeals((prev) =>
        prev.map((d) => (d.id === activeId ? { ...d, stage: overDeal.stage } : d))
      );
      const idx = MOCK_DEALS.findIndex((d) => d.id === activeId);
      if (idx !== -1) MOCK_DEALS[idx] = { ...MOCK_DEALS[idx], stage: overDeal.stage };
    }
  }

  function handleSaveDeal(updated: Deal) {
    setDeals((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    const idx = MOCK_DEALS.findIndex((d) => d.id === updated.id);
    if (idx !== -1) MOCK_DEALS[idx] = updated;
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
      const next = arrayMove(prev, activeIndex, overIndex);
      MOCK_DEALS.splice(0, MOCK_DEALS.length, ...next);
      return next;
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
