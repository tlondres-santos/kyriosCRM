import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { InviteDialog } from "@/components/settings/InviteDialog";
import { MOCK_MEMBERS, CURRENT_USER_ID } from "@/lib/mock/workspace";

function getInitials(name: string | null) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TeamSettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle>Membros da Equipe</CardTitle>
            <CardDescription>
              {MOCK_MEMBERS.length} membro{MOCK_MEMBERS.length !== 1 ? "s" : ""}{" "}
              no workspace.
            </CardDescription>
          </div>
          <InviteDialog />
        </CardHeader>
        <CardContent className="p-0">
          <Separator />
          <ul className="divide-y">
            {MOCK_MEMBERS.map((member, idx) => {
              const isCurrentUser = member.user_id === CURRENT_USER_ID;
              const name = member.profile.full_name;
              return (
                <li
                  key={idx}
                  className="flex items-center gap-4 px-6 py-4"
                >
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                      {getInitials(name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium">
                        {name}
                      </span>
                      {isCurrentUser && (
                        <span className="text-xs text-muted-foreground">
                          (você)
                        </span>
                      )}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {member.email}
                    </p>
                  </div>

                  <Badge
                    variant={member.role === "admin" ? "default" : "secondary"}
                    className="shrink-0"
                  >
                    {member.role === "admin" ? "Admin" : "Membro"}
                  </Badge>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                    disabled={isCurrentUser}
                    aria-label="Remover membro"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
