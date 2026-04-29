import type { Workspace, WorkspaceMember, Profile } from "@/types";

export const MOCK_WORKSPACE: Workspace = {
  id: "ws-1",
  name: "Minha Empresa",
  slug: "minha-empresa",
  plan: "free",
  stripe_customer_id: null,
  stripe_subscription_id: null,
  onboarding_completed: true,
  created_at: "2024-01-15T10:00:00.000Z",
};

export const MOCK_PROFILES: Profile[] = [
  { id: "owner-1", full_name: "Ana Silva", avatar_url: null },
  { id: "owner-2", full_name: "Carlos Mendes", avatar_url: null },
  { id: "owner-3", full_name: "Tiago Londres", avatar_url: null },
];

export const MOCK_MEMBERS: (WorkspaceMember & {
  profile: Profile;
  email: string;
})[] = [
  {
    workspace_id: "ws-1",
    user_id: "owner-3",
    role: "admin",
    email: "tiago@kyrioscrm.com.br",
    profile: { id: "owner-3", full_name: "Tiago Londres", avatar_url: null },
  },
  {
    workspace_id: "ws-1",
    user_id: "owner-1",
    role: "member",
    email: "ana@kyrioscrm.com.br",
    profile: { id: "owner-1", full_name: "Ana Silva", avatar_url: null },
  },
  {
    workspace_id: "ws-1",
    user_id: "owner-2",
    role: "member",
    email: "carlos@kyrioscrm.com.br",
    profile: { id: "owner-2", full_name: "Carlos Mendes", avatar_url: null },
  },
];

export const CURRENT_USER_ID = "owner-3";

export const MOCK_LEAD_COUNT = 10;
export const MOCK_MEMBER_COUNT = MOCK_MEMBERS.length;
