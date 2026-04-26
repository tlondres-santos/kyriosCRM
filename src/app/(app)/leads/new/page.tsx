"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOCK_LEADS, MOCK_OWNERS } from "@/lib/mock/leads";
import type { Lead } from "@/types";

const schema = z.object({
  name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: z
    .string()
    .email("E-mail inválido")
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
  status: z.enum(["novo", "contatado", "qualificado", "desqualificado"]),
  owner_id: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function NewLeadPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { status: "novo" },
  });

  function onSubmit(data: FormValues) {
    const owner = MOCK_OWNERS.find((o) => o.id === data.owner_id);
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      workspace_id: "ws-1",
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      company: data.company || null,
      role: data.role || null,
      status: data.status,
      owner_id: data.owner_id || null,
      created_at: new Date().toISOString(),
      owner: owner ?? undefined,
    };
    MOCK_LEADS.unshift(newLead);
    toast.success("Lead criado com sucesso!");
    router.push("/leads");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/leads">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Novo Lead</h2>
          <p className="text-muted-foreground">
            Adicione um novo lead ao seu funil.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do lead</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">
                  Nome <span className="text-destructive">*</span>
                </Label>
                <Input id="name" placeholder="João Silva" {...register("name")} />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="joao@empresa.com.br"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="(11) 99999-0000"
                  {...register("phone")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  placeholder="Acme Corp"
                  {...register("company")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="role">Cargo</Label>
                <Input
                  id="role"
                  placeholder="Diretor Comercial"
                  {...register("role")}
                />
              </div>

              <div className="space-y-1.5">
                <Label>
                  Status <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={watch("status")}
                  onValueChange={(v) =>
                    setValue("status", v as FormValues["status"])
                  }
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

              <div className="space-y-1.5 sm:col-span-2">
                <Label>Responsável</Label>
                <Select
                  value={watch("owner_id") ?? ""}
                  onValueChange={(v) => setValue("owner_id", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_OWNERS.map((owner) => (
                      <SelectItem key={owner.id} value={owner.id}>
                        {owner.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" asChild>
                <Link href="/leads">Cancelar</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Criar lead
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
