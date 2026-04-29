"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, LogOut, ChevronUp } from "lucide-react";

const profileSchema = z.object({
  full_name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const MOCK_USER = {
  full_name: "Tiago Londres",
  email: "tiago@kyrioscrm.com.br",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function UserMenu() {
  const [sheetOpen, setSheetOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: MOCK_USER,
  });

  function onSubmit(data: ProfileFormData) {
    console.log("Profile update (mock):", data);
    setSheetOpen(false);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex w-full items-center gap-3 px-6 py-4 text-left transition-colors hover:bg-white/10 outline-none">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="bg-[#F4C430] text-[#290042] text-xs font-bold">
                {getInitials(MOCK_USER.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {MOCK_USER.full_name}
              </p>
              <p className="truncate text-xs text-white/50">{MOCK_USER.email}</p>
            </div>
            <ChevronUp className="h-3.5 w-3.5 shrink-0 text-white/40" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="start" className="w-56 mb-1">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-0.5">
              <p className="text-sm font-medium">{MOCK_USER.full_name}</p>
              <p className="text-xs text-muted-foreground">{MOCK_USER.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setSheetOpen(true)}>
            <User className="mr-2 h-4 w-4" />
            Editar Perfil
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar Perfil</SheetTitle>
            <SheetDescription>
              Atualize seu nome e e-mail de acesso.
            </SheetDescription>
          </SheetHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col gap-5"
          >
            <div className="flex justify-center">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                  {getInitials(MOCK_USER.full_name)}
                </AvatarFallback>
              </Avatar>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="profile-name">Nome completo</Label>
              <Input id="profile-name" {...register("full_name")} />
              {errors.full_name && (
                <p className="text-xs text-destructive">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-email">E-mail</Label>
              <Input id="profile-email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-password">Nova Senha</Label>
              <Input
                id="profile-password"
                type="password"
                placeholder="Deixe em branco para não alterar"
                disabled
              />
              <p className="text-xs text-muted-foreground">
                Alteração de senha disponível após integração com autenticação.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setSheetOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Salvar
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
