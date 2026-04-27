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
import { MOCK_FUNNEL } from "@/lib/mock/metrics";

const BAR_COLORS: Record<string, string> = {
  fechado_ganho: "#10b981",
  fechado_perdido: "#f87171",
};

const DEFAULT_COLOR = "#290042";

export function FunnelChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Negócios por Etapa</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={MOCK_FUNNEL}
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
              {MOCK_FUNNEL.map((entry) => (
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
