"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Perspective = "russia" | "west";

const PerspectiveContext = createContext<{
  perspective: Perspective;
  setPerspective: (p: Perspective) => void;
} | null>(null);

export function PerspectiveProvider({ children }: { children: ReactNode }) {
  const [perspective, setPerspectiveState] = useState<Perspective>("russia");
  const setPerspective = useCallback((p: Perspective) => setPerspectiveState(p), []);
  return (
    <PerspectiveContext.Provider value={{ perspective, setPerspective }}>
      {children}
    </PerspectiveContext.Provider>
  );
}

export function usePerspective() {
  const ctx = useContext(PerspectiveContext);
  if (!ctx) throw new Error("usePerspective must be used within PerspectiveProvider");
  return ctx;
}
