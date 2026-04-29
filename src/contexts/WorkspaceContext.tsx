"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface WorkspaceOption {
  id: string;
  name: string;
}

const WORKSPACES: WorkspaceOption[] = [
  { id: "ws-1", name: "Minha Empresa" },
  { id: "ws-2", name: "Cliente Alpha" },
  { id: "ws-3", name: "Tech Solutions" },
];

const STORAGE_KEY = "kyrios_workspace_id";
const DEFAULT_WS = "ws-1";

interface WorkspaceContextValue {
  workspaces: WorkspaceOption[];
  activeWorkspaceId: string;
  activeWorkspace: WorkspaceOption;
  setActiveWorkspaceId: (id: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [activeWorkspaceId, setActiveWorkspaceIdState] = useState<string>(DEFAULT_WS);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && WORKSPACES.some((w) => w.id === stored)) {
      setActiveWorkspaceIdState(stored);
    }
  }, []);

  function setActiveWorkspaceId(id: string) {
    localStorage.setItem(STORAGE_KEY, id);
    setActiveWorkspaceIdState(id);
  }

  const activeWorkspace =
    WORKSPACES.find((w) => w.id === activeWorkspaceId) ?? WORKSPACES[0];

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces: WORKSPACES,
        activeWorkspaceId,
        activeWorkspace,
        setActiveWorkspaceId,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return ctx;
}
