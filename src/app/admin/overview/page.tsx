import { AdminMetricCards } from "@/components/admin/AdminMetricCards";
import { WorkspacesTable } from "@/components/admin/WorkspacesTable";
import { ADMIN_WORKSPACES, ADMIN_METRICS } from "@/lib/mock/admin";

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Visão Geral</h2>
        <p className="text-sm text-muted-foreground">
          Métricas consolidadas de todos os workspaces da plataforma.
        </p>
      </div>

      <AdminMetricCards {...ADMIN_METRICS} />

      <div>
        <h3 className="mb-3 text-base font-semibold">Todos os Workspaces</h3>
        <WorkspacesTable workspaces={ADMIN_WORKSPACES} />
      </div>
    </div>
  );
}
