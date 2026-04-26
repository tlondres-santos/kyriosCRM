import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeadProfile from "@/components/leads/LeadProfile";
import ActivityTimeline from "@/components/leads/ActivityTimeline";
import { MOCK_LEADS, MOCK_ACTIVITIES } from "@/lib/mock/leads";

interface PageProps {
  params: { id: string };
}

export default function LeadDetailPage({ params }: PageProps) {
  const lead = MOCK_LEADS.find((l) => l.id === params.id);
  if (!lead) notFound();

  const activities = MOCK_ACTIVITIES.filter((a) => a.lead_id === lead.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/leads">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{lead.name}</h2>
          {lead.company && (
            <p className="text-muted-foreground">{lead.company}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <LeadProfile lead={lead} />
        </div>
        <div className="lg:col-span-2">
          <ActivityTimeline activities={activities} leadId={lead.id} />
        </div>
      </div>
    </div>
  );
}
