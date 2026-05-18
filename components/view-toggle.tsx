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

export function ViewToggle() {
  const { view, setView } = useView()

  return (
    <div className="flex items-center gap-1 rounded-md border border-border bg-muted p-0.5 text-xs">
      <button
        onClick={() => setView("external")}
        className={cn(
          "rounded px-2 py-1 font-medium transition-colors",
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
          "rounded px-2 py-1 font-medium transition-colors",
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
