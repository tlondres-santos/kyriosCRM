"use client";

import { useState } from "react";
import { Phone, Mail, Users, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ActivityForm from "@/components/leads/ActivityForm";
import type { Activity, ActivityType } from "@/types";

const ACTIVITY_CONFIG: Record<
  ActivityType,
  { label: string; icon: React.ElementType; className: string }
> = {
  ligacao: {
    label: "Ligação",
    icon: Phone,
    className: "bg-blue-100 text-blue-700",
  },
  email: {
    label: "E-mail",
    icon: Mail,
    className: "bg-purple-100 text-purple-700",
  },
  reuniao: {
    label: "Reunião",
    icon: Users,
    className: "bg-green-100 text-green-700",
  },
  nota: {
    label: "Nota",
    icon: FileText,
    className: "bg-amber-100 text-amber-700",
  },
};

function initials(name: string | null): string {
  if (!name) return "?";
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

interface ActivityTimelineProps {
  activities: Activity[];
  leadId: string;
}

export default function ActivityTimeline({
  activities: initial,
  leadId,
}: ActivityTimelineProps) {
  const [activities, setActivities] = useState<Activity[]>(
    [...initial].sort(
      (a, b) =>
        new Date(b.activity_date).getTime() - new Date(a.activity_date).getTime()
    )
  );

  function handleAdd(activity: Activity) {
    setActivities((prev) =>
      [activity, ...prev].sort(
        (a, b) =>
          new Date(b.activity_date).getTime() - new Date(a.activity_date).getTime()
      )
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Atividades{" "}
          <span className="text-muted-foreground font-normal text-sm">
            ({activities.length})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ActivityForm leadId={leadId} onAdd={handleAdd} />

        {activities.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-6">
            Nenhuma atividade registrada.
          </p>
        ) : (
          <div className="relative space-y-4">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
            {activities.map((activity) => {
              const cfg = ACTIVITY_CONFIG[activity.type];
              const Icon = cfg.icon;
              return (
                <div key={activity.id} className="flex gap-4 pl-0">
                  <div
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${cfg.className}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="outline" className={`text-xs ${cfg.className} border-current/20`}>
                        {cfg.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(activity.activity_date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm">{activity.description}</p>
                    {activity.author && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[9px] bg-primary/10 text-primary">
                            {initials(activity.author.full_name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          {activity.author.full_name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
