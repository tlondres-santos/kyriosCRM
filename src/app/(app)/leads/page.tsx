"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeadFilters from "@/components/leads/LeadFilters";
import LeadTable from "@/components/leads/LeadTable";
import { MOCK_LEADS } from "@/lib/mock/leads";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import type { LeadStatus } from "@/types";

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<LeadStatus | "all">("all");
  const [ownerId, setOwnerId] = useState<string | "all">("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const { activeWorkspaceId } = useWorkspace();

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return MOCK_LEADS.filter((lead) => {
      if (lead.workspace_id !== activeWorkspaceId) return false;
      if (
        term &&
        !lead.name.toLowerCase().includes(term) &&
        !lead.email?.toLowerCase().includes(term) &&
        !lead.company?.toLowerCase().includes(term)
      )
        return false;
      if (status !== "all" && lead.status !== status) return false;
      if (ownerId !== "all" && lead.owner_id !== ownerId) return false;
      if (dateFrom && lead.created_at < dateFrom) return false;
      if (dateTo && lead.created_at > dateTo + "T23:59:59") return false;
      return true;
    });
  }, [search, status, ownerId, dateFrom, dateTo, activeWorkspaceId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Leads</h2>
          <p className="text-muted-foreground">
            Gerencie seus leads e contatos.
          </p>
        </div>
        <Button asChild>
          <Link href="/leads/new">
            <Plus className="mr-2 h-4 w-4" />
            Novo Lead
          </Link>
        </Button>
      </div>

      <LeadFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        ownerId={ownerId}
        onOwnerChange={setOwnerId}
        dateFrom={dateFrom}
        onDateFromChange={setDateFrom}
        dateTo={dateTo}
        onDateToChange={setDateTo}
      />

      <div className="text-sm text-muted-foreground">
        {filtered.length} lead{filtered.length !== 1 ? "s" : ""} encontrado
        {filtered.length !== 1 ? "s" : ""}
      </div>

      <LeadTable leads={filtered} />
    </div>
  );
}
