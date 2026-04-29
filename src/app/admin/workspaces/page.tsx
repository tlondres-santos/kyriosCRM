import { WorkspacesTable } from "@/components/admin/WorkspacesTable";
import { ADMIN_WORKSPACES } from "@/lib/mock/admin";

export default function AdminWorkspacesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Workspaces</h2>
        <p className="text-sm text-muted-foreground">
          {ADMIN_WORKSPACES.length} workspaces registrados na plataforma.
        </p>
      </div>
      <WorkspacesTable workspaces={ADMIN_WORKSPACES} />
    </div>
  );
}
