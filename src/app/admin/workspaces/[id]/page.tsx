import { notFound } from "next/navigation";
import Link from "next/link";
import { ADMIN_WORKSPACES } from "@/lib/mock/admin";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, UserSquare2, KanbanSquare, DollarSign } from "lucide-react";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const STAGE_LABELS: Record<string, string> = {
  novo_lead: "Novo Lead",
  contato_realizado: "Contato Realizado",
  proposta_enviada: "Proposta Enviada",
  negociacao: "Negociação",
  fechado_ganho: "Fechado Ganho",
  fechado_perdido: "Fechado Perdido",
};

const STATUS_LABELS: Record<string, string> = {
  novo: "Novo",
  contatado: "Contatado",
  qualificado: "Qualificado",
  desqualificado: "Desqualificado",
};

export default function AdminWorkspaceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const ws = ADMIN_WORKSPACES.find((w) => w.id === params.id);
  if (!ws) notFound();

  const totalDealValue = ws.deals.reduce((s, d) => s + d.value, 0);

  return (
    <div className="space-y-6">
      {/* Back + header */}
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" asChild className="-ml-1 mt-0.5">
          <Link href="/admin/workspaces">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight">{ws.name}</h2>
            <Badge
              className={
                ws.plan === "pro"
                  ? "bg-[#290042] text-white hover:bg-[#290042]/90"
                  : ""
              }
              variant={ws.plan === "pro" ? "default" : "secondary"}
            >
              {ws.plan === "pro" ? "Pro" : "Free"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Workspace #{ws.workspace_number} · criado em {formatDate(ws.created_at)}
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Membros", value: ws.member_count, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Leads", value: ws.lead_count, icon: UserSquare2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Negócios", value: ws.deal_count, icon: KanbanSquare, color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Valor Pipeline", value: formatCurrency(totalDealValue), icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.label}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className={`rounded-lg p-2 shrink-0 ${c.bg}`}>
                  <Icon className={`h-4 w-4 ${c.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="text-xl font-bold">{c.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Info card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Informações</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Dono</p>
            <p className="font-medium">{ws.owner_name}</p>
            <p className="text-muted-foreground">{ws.owner_email}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Slug</p>
            <p className="font-mono text-xs bg-muted px-2 py-1 rounded inline-block">{ws.slug}</p>
          </div>
          {ws.mrr > 0 && (
            <div>
              <p className="text-xs text-muted-foreground">MRR</p>
              <p className="font-medium">{formatCurrency(ws.mrr)}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Members */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Membros ({ws.members.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Entrou em</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ws.members.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                          {getInitials(m.full_name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{m.full_name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{m.email}</TableCell>
                  <TableCell>
                    <Badge variant={m.role === "admin" ? "default" : "secondary"}>
                      {m.role === "admin" ? "Admin" : "Membro"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(m.joined_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Leads */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">
            Leads recentes ({ws.leads.length} de {ws.lead_count})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Nome</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Criado em</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ws.leads.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="text-sm font-medium">{l.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{l.company ?? "—"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs capitalize">
                      {STATUS_LABELS[l.status] ?? l.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(l.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Deals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">
            Negócios ({ws.deals.length} de {ws.deal_count})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Título</TableHead>
                <TableHead>Etapa</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Criado em</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ws.deals.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="text-sm font-medium">{d.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {STAGE_LABELS[d.stage] ?? d.stage}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    {formatCurrency(d.value)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(d.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
