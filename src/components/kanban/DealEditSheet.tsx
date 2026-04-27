"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PIPELINE_STAGES, type Deal, type PipelineStage } from "@/types";
import { MOCK_LEADS } from "@/lib/mock/leads";
import { MOCK_OWNERS } from "@/lib/mock/leads";

interface DealEditSheetProps {
  deal: Deal | null;
  open: boolean;
  onClose: () => void;
  onSave: (updated: Deal) => void;
}

export function DealEditSheet({ deal, open, onClose, onSave }: DealEditSheetProps) {
  const [form, setForm] = useState<Partial<Deal>>({});

  useEffect(() => {
    if (deal) setForm(deal);
  }, [deal]);

  if (!deal) return null;

  function handleChange(field: keyof Deal, value: string | number | null) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    if (!deal) return;
    const selectedLead = MOCK_LEADS.find((l) => l.id === form.lead_id);
    const selectedOwner = MOCK_OWNERS.find((o) => o.id === form.owner_id);
    onSave({
      ...deal,
      ...form,
      lead: selectedLead
        ? { id: selectedLead.id, name: selectedLead.name, company: selectedLead.company }
        : deal.lead,
      owner: selectedOwner ?? deal.owner,
    } as Deal);
    onClose();
  }

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Editar Negócio</SheetTitle>
        </SheetHeader>

        <div className="space-y-5 py-6">
          <div className="space-y-1.5">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={form.title ?? ""}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="value">Valor (R$)</Label>
            <Input
              id="value"
              type="number"
              min={0}
              value={form.value ?? ""}
              onChange={(e) => handleChange("value", Number(e.target.value))}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Etapa</Label>
            <Select
              value={form.stage ?? deal.stage}
              onValueChange={(v) => handleChange("stage", v as PipelineStage)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PIPELINE_STAGES.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Lead vinculado</Label>
            <Select
              value={form.lead_id ?? ""}
              onValueChange={(v) => handleChange("lead_id", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um lead" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_LEADS.map((l) => (
                  <SelectItem key={l.id} value={l.id}>
                    {l.name}
                    {l.company ? ` — ${l.company}` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Responsável</Label>
            <Select
              value={form.owner_id ?? ""}
              onValueChange={(v) => handleChange("owner_id", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um responsável" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_OWNERS.map((o) => (
                  <SelectItem key={o.id} value={o.id}>
                    {o.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="deadline">Prazo</Label>
            <Input
              id="deadline"
              type="date"
              value={form.deadline ?? ""}
              onChange={(e) => handleChange("deadline", e.target.value || null)}
            />
          </div>
        </div>

        <SheetFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#290042] hover:bg-[#290042]/90 text-white"
          >
            Salvar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
