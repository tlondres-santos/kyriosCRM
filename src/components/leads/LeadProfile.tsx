"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Pencil, Trash2, Mail, Phone, Building2, Briefcase, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOCK_LEADS, MOCK_OWNERS } from "@/lib/mock/leads";
import { MOCK_DEALS } from "@/lib/mock/deals";
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

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const editSchema = z.object({
  name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  phone: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
  status: z.enum(["novo", "contatado", "qualificado", "desqualificado"]),
  owner_id: z.string().optional(),
});

type EditValues = z.infer<typeof editSchema>;

interface LeadProfileProps {
  lead: Lead;
}

export default function LeadProfile({ lead: initial }: LeadProfileProps) {
  const router = useRouter();
  const [lead, setLead] = useState(initial);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      name: lead.name,
      email: lead.email ?? "",
      phone: lead.phone ?? "",
      company: lead.company ?? "",
      role: lead.role ?? "",
      status: lead.status,
      owner_id: lead.owner_id ?? "",
    },
  });

  function onEdit(data: EditValues) {
    const updatedOwner = MOCK_OWNERS.find((o) => o.id === data.owner_id);
    const updates = {
      ...data,
      email: data.email || null,
      phone: data.phone || null,
      company: data.company || null,
      role: data.role || null,
      owner_id: data.owner_id || null,
      owner: updatedOwner ?? undefined,
    };
    setLead((prev) => ({ ...prev, ...updates }));
    const idx = MOCK_LEADS.findIndex((l) => l.id === lead.id);
    if (idx !== -1) Object.assign(MOCK_LEADS[idx], updates);
    toast.success("Lead atualizado!");
    setEditOpen(false);
  }

  function onDelete() {
    const idx = MOCK_LEADS.findIndex((l) => l.id === lead.id);
    if (idx !== -1) MOCK_LEADS.splice(idx, 1);
    const dealIdx = MOCK_DEALS.findIndex((d) => d.lead_id === lead.id);
    if (dealIdx !== -1) MOCK_DEALS.splice(dealIdx, 1);
    toast.success("Lead removido!");
    setDeleteOpen(false);
    router.push("/leads");
  }

  const statusCfg = STATUS_CONFIG[lead.status];

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="text-base bg-primary/10 text-primary font-semibold">
                  {initials(lead.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold leading-tight">{lead.name}</h3>
                {lead.role && (
                  <p className="text-sm text-muted-foreground">{lead.role}</p>
                )}
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  reset({
                    name: lead.name,
                    email: lead.email ?? "",
                    phone: lead.phone ?? "",
                    company: lead.company ?? "",
                    role: lead.role ?? "",
                    status: lead.status,
                    owner_id: lead.owner_id ?? "",
                  });
                  setEditOpen(true);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Badge variant="outline" className={statusCfg.className}>
            {statusCfg.label}
          </Badge>

          <Separator />

          <div className="space-y-3">
            {lead.email && (
              <div className="flex items-center gap-2.5 text-sm">
                <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                <a
                  href={`mailto:${lead.email}`}
                  className="text-primary hover:underline truncate"
                >
                  {lead.email}
                </a>
              </div>
            )}
            {lead.phone && (
              <div className="flex items-center gap-2.5 text-sm">
                <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span>{lead.phone}</span>
              </div>
            )}
            {lead.company && (
              <div className="flex items-center gap-2.5 text-sm">
                <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span>{lead.company}</span>
              </div>
            )}
            {lead.role && (
              <div className="flex items-center gap-2.5 text-sm">
                <Briefcase className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span>{lead.role}</span>
              </div>
            )}
          </div>

          {lead.owner && (
            <>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground mb-2">Responsável</p>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                      {initials(lead.owner.full_name ?? "?")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{lead.owner.full_name}</span>
                </div>
              </div>
            </>
          )}

          <Separator />
          <div>
            <p className="text-xs text-muted-foreground mb-1">Criado em</p>
            <p className="text-sm">
              {new Date(lead.created_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Edit sheet */}
      <Sheet open={editOpen} onOpenChange={setEditOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Editar lead</SheetTitle>
          </SheetHeader>
          <form
            onSubmit={handleSubmit(onEdit)}
            className="mt-6 space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="edit-name">
                Nome <span className="text-destructive">*</span>
              </Label>
              <Input id="edit-name" {...register("name")} />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-email">E-mail</Label>
              <Input id="edit-email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-phone">Telefone</Label>
              <Input id="edit-phone" {...register("phone")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-company">Empresa</Label>
              <Input id="edit-company" {...register("company")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-role">Cargo</Label>
              <Input id="edit-role" {...register("role")} />
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select
                value={watch("status")}
                onValueChange={(v) => setValue("status", v as LeadStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="novo">Novo</SelectItem>
                  <SelectItem value="contatado">Contatado</SelectItem>
                  <SelectItem value="qualificado">Qualificado</SelectItem>
                  <SelectItem value="desqualificado">Desqualificado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Responsável</Label>
              <Select
                value={watch("owner_id") ?? ""}
                onValueChange={(v) => setValue("owner_id", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
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
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Salvar
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover lead</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover <strong>{lead.name}</strong>? Esta
              ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              Remover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
