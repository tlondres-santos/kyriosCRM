import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import type { AdminWorkspace } from "@/lib/mock/admin";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function WorkspacesTable({
  workspaces,
}: {
  workspaces: AdminWorkspace[];
}) {
  return (
    <div className="rounded-lg border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead>#</TableHead>
            <TableHead>Workspace</TableHead>
            <TableHead>Dono</TableHead>
            <TableHead>Plano</TableHead>
            <TableHead className="text-right">Membros</TableHead>
            <TableHead className="text-right">Leads</TableHead>
            <TableHead className="text-right">Negócios</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {workspaces.map((ws) => (
            <TableRow key={ws.id} className="hover:bg-muted/20">
              <TableCell className="text-muted-foreground text-sm font-mono">
                #{ws.workspace_number}
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-sm">{ws.name}</p>
                  <p className="text-xs text-muted-foreground">{ws.slug}</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="text-sm">{ws.owner_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {ws.owner_email}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={ws.plan === "pro" ? "default" : "secondary"}
                  className={
                    ws.plan === "pro"
                      ? "bg-[#290042] text-white hover:bg-[#290042]/90"
                      : ""
                  }
                >
                  {ws.plan === "pro" ? "Pro" : "Free"}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-sm">
                {ws.member_count}
              </TableCell>
              <TableCell className="text-right text-sm">
                {ws.lead_count}
              </TableCell>
              <TableCell className="text-right text-sm">
                {ws.deal_count}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(ws.created_at)}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/workspaces/${ws.id}`}>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
