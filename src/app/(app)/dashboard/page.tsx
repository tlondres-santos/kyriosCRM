import { MetricCards } from "@/components/dashboard/MetricCards";
import { FunnelChart } from "@/components/dashboard/FunnelChart";
import { UpcomingDeals } from "@/components/dashboard/UpcomingDeals";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Visão geral do seu pipeline de vendas.</p>
      </div>
      <MetricCards />
      <div className="grid gap-4 lg:grid-cols-2">
        <FunnelChart />
        <UpcomingDeals />
      </div>
    </div>
  );
}
