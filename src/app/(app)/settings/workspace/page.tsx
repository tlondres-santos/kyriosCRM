import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Building2, Upload } from "lucide-react";
import { MOCK_WORKSPACE } from "@/lib/mock/workspace";

export default function WorkspaceSettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações do Workspace</CardTitle>
          <CardDescription>
            Nome e identidade visual do seu workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                <Building2 className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium">Logo do Workspace</p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG ou SVG. Máx. 1 MB.
              </p>
              <Button variant="outline" size="sm" disabled>
                <Upload className="mr-2 h-3.5 w-3.5" />
                Alterar logo
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="workspace-name">Nome do Workspace</Label>
              <Input
                id="workspace-name"
                defaultValue={MOCK_WORKSPACE.name}
                placeholder="Ex: Minha Empresa"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workspace-slug">Slug</Label>
              <Input
                id="workspace-slug"
                defaultValue={MOCK_WORKSPACE.slug}
                placeholder="minha-empresa"
              />
              <p className="text-xs text-muted-foreground">
                Identificador único do workspace.
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button disabled>Salvar alterações</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
          <CardDescription>
            Ações irreversíveis que afetam todo o workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Excluir Workspace</p>
              <p className="text-xs text-muted-foreground">
                Remove permanentemente o workspace e todos os dados associados.
              </p>
            </div>
            <Button variant="destructive" disabled>
              Excluir Workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
