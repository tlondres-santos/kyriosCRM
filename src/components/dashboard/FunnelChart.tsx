"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_DEALS } from "@/lib/mock/deals";
import { PIPELINE_STAGES } from "@/types";
import { useWorkspace } from "@/contexts/WorkspaceContext";

const SHORT_LABELS: Record<string, string> = {
  novo_lead: "Novo Lead",
  contato_realizado: "Contato",
  proposta_enviada: "Proposta",
  negociacao: "Negociação",
  fechado_ganho: "Ganho",
  fechado_perdido: "Perdido",
};

const BAR_COLORS: Record<string, string> = {
  fechado_ganho: "#10b981",
  fechado_perdido: "#f87171",
};

const DEFAULT_COLOR = "#290042";

export function FunnelChart() {
  const { activeWorkspaceId } = useWorkspace();
  const deals = MOCK_DEALS.filter((d) => d.workspace_id === activeWorkspaceId);
  const data = PIPELINE_STAGES.map((s) => ({
    stage: s.id,
    label: SHORT_LABELS[s.id] ?? s.label,
    count: deals.filter((d) => d.stage === s.id).length,
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Negócios por Etapa</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
          >
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              interval={0}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--muted))" }}
              contentStyle={{ fontSize: 12 }}
              formatter={(value: number) => [value, "Negócios"]}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry) => (
                <Cell
                  key={entry.stage}
                  fill={BAR_COLORS[entry.stage] ?? DEFAULT_COLOR}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
