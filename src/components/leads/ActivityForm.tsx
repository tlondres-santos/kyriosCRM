"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Activity, ActivityType } from "@/types";

const schema = z.object({
  type: z.enum(["ligacao", "email", "reuniao", "nota"]),
  description: z.string().min(3, "Descreva a atividade"),
  activity_date: z.string().min(1, "Informe a data"),
});

type FormValues = z.infer<typeof schema>;

interface ActivityFormProps {
  leadId: string;
  onAdd: (activity: Activity) => void;
}

export default function ActivityForm({ leadId, onAdd }: ActivityFormProps) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "nota",
      activity_date: new Date().toISOString().split("T")[0],
    },
  });

  function onSubmit(data: FormValues) {
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      workspace_id: "ws-1",
      lead_id: leadId,
      author_id: "owner-1",
      type: data.type,
      description: data.description,
      activity_date: data.activity_date + "T12:00:00.000Z",
      created_at: new Date().toISOString(),
      author: { id: "owner-1", full_name: "Ana Silva", avatar_url: null },
    };
    onAdd(newActivity);
    reset();
    setOpen(false);
  }

  if (!open) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => setOpen(true)}
      >
        <Plus className="mr-2 h-4 w-4" />
        Adicionar atividade
      </Button>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-4 space-y-4">
      <h4 className="text-sm font-medium">Nova atividade</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Tipo</Label>
            <Select
              value={watch("type")}
              onValueChange={(v) => setValue("type", v as ActivityType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ligacao">Ligação</SelectItem>
                <SelectItem value="email">E-mail</SelectItem>
                <SelectItem value="reuniao">Reunião</SelectItem>
                <SelectItem value="nota">Nota</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="activity_date">Data</Label>
            <input
              id="activity_date"
              type="date"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              {...register("activity_date")}
            />
            {errors.activity_date && (
              <p className="text-xs text-destructive">{errors.activity_date.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            placeholder="Descreva a atividade..."
            rows={3}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs text-destructive">{errors.description.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              reset();
              setOpen(false);
            }}
          >
            Cancelar
          </Button>
          <Button type="submit" size="sm" disabled={isSubmitting}>
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
}
