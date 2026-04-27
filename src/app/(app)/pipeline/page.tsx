import { KanbanBoard } from "@/components/kanban/KanbanBoard";

export default function PipelinePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Pipeline</h2>
        <p className="text-muted-foreground">
          Visualize e gerencie seus negócios no Kanban.
        </p>
      </div>
      <KanbanBoard />
    </div>
  );
}
