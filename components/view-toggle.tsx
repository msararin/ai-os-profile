"use client"

import { useState, createContext, useContext } from "react"
import { cn } from "@/lib/utils"

type ViewMode = "external" | "internal"

const ViewContext = createContext<{
  view: ViewMode
  setView: (view: ViewMode) => void
}>({
  view: "external",
  setView: () => {},
})

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<ViewMode>("external")
  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  )
}

export function useView() {
  return useContext(ViewContext)
}

export function ViewToggle({ prominent = false }: { prominent?: boolean }) {
  const { view, setView } = useView()

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-md border p-0.5 text-xs",
        prominent
          ? "border-primary/30 bg-accent shadow-sm"
          : "border-border bg-muted"
      )}
    >
      <button
        onClick={() => setView("external")}
        className={cn(
          "rounded px-2 py-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
          view === "external"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        External
      </button>
      <button
        onClick={() => setView("internal")}
        className={cn(
          "rounded px-2 py-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
          view === "internal"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Internal
      </button>
    </div>
  )
}
