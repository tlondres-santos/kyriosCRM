"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LeadStatus } from "@/types";
import { MOCK_OWNERS } from "@/lib/mock/leads";

interface LeadFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: LeadStatus | "all";
  onStatusChange: (value: LeadStatus | "all") => void;
  ownerId: string | "all";
  onOwnerChange: (value: string | "all") => void;
  dateFrom: string;
  onDateFromChange: (value: string) => void;
  dateTo: string;
  onDateToChange: (value: string) => void;
}

export default function LeadFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  ownerId,
  onOwnerChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
}: LeadFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, empresa ou e-mail..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <Select value={status} onValueChange={(v) => onStatusChange(v as LeadStatus | "all")}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os status</SelectItem>
          <SelectItem value="novo">Novo</SelectItem>
          <SelectItem value="contatado">Contatado</SelectItem>
          <SelectItem value="qualificado">Qualificado</SelectItem>
          <SelectItem value="desqualificado">Desqualificado</SelectItem>
        </SelectContent>
      </Select>

      <Select value={ownerId} onValueChange={onOwnerChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Responsável" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os donos</SelectItem>
          {MOCK_OWNERS.map((owner) => (
            <SelectItem key={owner.id} value={owner.id}>
              {owner.full_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="date"
        value={dateFrom}
        onChange={(e) => onDateFromChange(e.target.value)}
        className="w-[150px]"
        title="Data inicial"
      />
      <Input
        type="date"
        value={dateTo}
        onChange={(e) => onDateToChange(e.target.value)}
        className="w-[150px]"
        title="Data final"
      />
    </div>
  );
}
