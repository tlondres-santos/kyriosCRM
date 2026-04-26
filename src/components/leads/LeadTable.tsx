"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Lead, LeadStatus } from "@/types";

const STATUS_CONFIG: Record<LeadStatus, { label: string; className: string }> = {
  novo: {
    label: "Novo",
    className: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100",
  },
  contatado: {
    label: "Contatado",
    className: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100",
  },
  qualificado: {
    label: "Qualificado",
    className: "bg-green-100 text-green-700 border-green-200 hover:bg-green-100",
  },
  desqualificado: {
    label: "Desqualificado",
    className: "bg-muted text-muted-foreground hover:bg-muted",
  },
};

type SortKey = "name" | "company" | "status" | "created_at";
type SortDir = "asc" | "desc";

function initials(name: string | null): string {
  if (!name) return "?";
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function SortIcon({ columnKey, sortKey, sortDir }: { columnKey: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (columnKey !== sortKey) return <ChevronsUpDown className="ml-1 h-3.5 w-3.5 text-muted-foreground/50 inline" />;
  return sortDir === "asc"
    ? <ChevronUp className="ml-1 h-3.5 w-3.5 inline" />
    : <ChevronDown className="ml-1 h-3.5 w-3.5 inline" />;
}

interface LeadTableProps {
  leads: Lead[];
}

export default function LeadTable({ leads }: LeadTableProps) {
  const router = useRouter();
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sorted = [...leads].sort((a, b) => {
    let valA: string = a[sortKey] ?? "";
    let valB: string = b[sortKey] ?? "";
    const cmp = valA.localeCompare(valB, "pt-BR", { sensitivity: "base" });
    return sortDir === "asc" ? cmp : -cmp;
  });

  if (sorted.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
        Nenhum lead encontrado.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer select-none"
              onClick={() => handleSort("name")}
            >
              Nome <SortIcon columnKey="name" sortKey={sortKey} sortDir={sortDir} />
            </TableHead>
            <TableHead
              className="cursor-pointer select-none"
              onClick={() => handleSort("company")}
            >
              Empresa <SortIcon columnKey="company" sortKey={sortKey} sortDir={sortDir} />
            </TableHead>
            <TableHead
              className="cursor-pointer select-none"
              onClick={() => handleSort("status")}
            >
              Status <SortIcon columnKey="status" sortKey={sortKey} sortDir={sortDir} />
            </TableHead>
            <TableHead>Responsável</TableHead>
            <TableHead
              className="cursor-pointer select-none"
              onClick={() => handleSort("created_at")}
            >
              Criado em <SortIcon columnKey="created_at" sortKey={sortKey} sortDir={sortDir} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((lead) => {
            const statusCfg = STATUS_CONFIG[lead.status];
            return (
              <TableRow
                key={lead.id}
                className="cursor-pointer"
                onClick={() => router.push(`/leads/${lead.id}`)}
              >
                <TableCell className="font-medium">
                  <div>{lead.name}</div>
                  {lead.email && (
                    <div className="text-xs text-muted-foreground">{lead.email}</div>
                  )}
                </TableCell>
                <TableCell>
                  <div>{lead.company ?? "—"}</div>
                  {lead.role && (
                    <div className="text-xs text-muted-foreground">{lead.role}</div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusCfg.className}>
                    {statusCfg.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  {lead.owner ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                          {initials(lead.owner.full_name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{lead.owner.full_name}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
