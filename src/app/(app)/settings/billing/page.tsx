import { EarlyAccessBanner } from "@/components/settings/EarlyAccessBanner";
import { PlanCard } from "@/components/settings/PlanCard";
import {
  MOCK_WORKSPACE,
  MOCK_LEAD_COUNT,
  MOCK_MEMBER_COUNT,
} from "@/lib/mock/workspace";

const EARLY_ACCESS_LIMIT = 50;
const MOCK_WORKSPACE_NUMBER = 7;

const isEarlyAccess = MOCK_WORKSPACE_NUMBER <= EARLY_ACCESS_LIMIT;

export default function BillingSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Faturamento & Plano</h2>
        <p className="text-sm text-muted-foreground">
          Gerencie seu plano e informações de cobrança.
        </p>
      </div>

      {isEarlyAccess ? (
        <EarlyAccessBanner />
      ) : (
        <PlanCard
          plan={MOCK_WORKSPACE.plan}
          leadsUsed={MOCK_LEAD_COUNT}
          leadsMax={50}
          membersUsed={MOCK_MEMBER_COUNT}
          membersMax={2}
        />
      )}
    </div>
  );
}
