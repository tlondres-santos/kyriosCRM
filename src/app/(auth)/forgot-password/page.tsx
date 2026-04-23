"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    console.log("forgot-password", data);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card className="border-border/60 shadow-sm text-center">
        <CardContent className="pt-8 pb-6">
          <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-[#290042]" />
          <h2 className="text-xl font-bold text-[#290042]">E-mail enviado</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Verifique sua caixa de entrada e siga as instruções para redefinir
            sua senha.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block text-sm font-medium text-[#290042] hover:underline"
          >
            Voltar para o login
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-[#290042]">
          Esqueceu sua senha?
        </CardTitle>
        <CardDescription>
          Informe seu e-mail e enviaremos um link para redefinição.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="voce@empresa.com"
              autoComplete="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#290042] text-white hover:bg-[#290042]/90"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enviar link de redefinição
          </Button>

          <Link
            href="/login"
            className="text-center text-sm text-muted-foreground hover:text-[#290042]"
          >
            Voltar para o login
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
