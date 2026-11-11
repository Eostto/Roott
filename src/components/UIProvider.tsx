"use client";

import { createContext, useContext, useState } from "react";

type UI = {
  callOpen: boolean;
  openCall: () => void;
  closeCall: () => void;
};

const UIContext = createContext<UI | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [callOpen, setCallOpen] = useState(false);
  return (
    <UIContext.Provider
      value={{
        callOpen,
        openCall: () => setCallOpen(true),
        closeCall: () => setCallOpen(false),
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}

/** Buton care deschide fereastra „Comandă un apel”. */
export function CallButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { openCall } = useUI();
  return (
    <button type="button" onClick={openCall} className={className}>
      {children}
    </button>
  );
}
