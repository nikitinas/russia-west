"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type HeaderSlotContextValue = {
  slot: ReactNode;
  setSlot: (node: ReactNode) => void;
};

const HeaderSlotContext = createContext<HeaderSlotContextValue | null>(null);

export function HeaderSlotProvider({ children }: { children: ReactNode }) {
  const [slot, setSlotState] = useState<ReactNode>(null);
  const value: HeaderSlotContextValue = {
    slot,
    setSlot: useCallback((node: ReactNode) => setSlotState(node), []),
  };
  return (
    <HeaderSlotContext.Provider value={value}>{children}</HeaderSlotContext.Provider>
  );
}

export function useHeaderSlot() {
  const ctx = useContext(HeaderSlotContext);
  return ctx ? ctx.setSlot : () => {};
}

export function useHeaderSlotContent() {
  const ctx = useContext(HeaderSlotContext);
  return ctx?.slot ?? null;
}
