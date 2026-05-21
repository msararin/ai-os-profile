"use client"

import type { ComponentType } from "react"
import {
  ClipboardCheck,
  FileClock,
  History,
  ListChecks,
  NotebookText,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CockpitSectionId =
  | "system-status"
  | "workstreams"
  | "patch-history"
  | "evidence"
  | "decisions"
  | "next-actions"

const sections = [
  {
    id: "system-status",
    label: "System Status",
    description: "Current operating state",
    icon: ClipboardCheck,
  },
  {
    id: "workstreams",
    label: "Workstreams",
    description: "Owners and next moves",
    icon: ListChecks,
  },
  {
    id: "patch-history",
    label: "Patch History",
    description: "Completed v2 sequence",
    icon: History,
  },
  {
    id: "evidence",
    label: "Evidence / Proof",
    description: "Validation and proof levels",
    icon: Target,
  },
  {
    id: "decisions",
    label: "Run Log / Decisions",
    description: "Operating notes",
    icon: NotebookText,
  },
  {
    id: "next-actions",
    label: "Next Actions",
    description: "Review-ready queue",
    icon: FileClock,
  },
] satisfies Array<{
  id: CockpitSectionId
  label: string
  description: string
  icon: ComponentType<{ className?: string }>
}>

export function CockpitSidebar({
  activeSection,
  onSectionChange,
}: {
  activeSection: CockpitSectionId
  onSectionChange: (section: CockpitSectionId) => void
}) {
  return (
    <aside className="border-b border-border bg-muted/30 lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r">
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:sticky lg:top-14 lg:mx-0 lg:max-w-none lg:px-6 lg:py-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Cockpit Menu
        </p>
        <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
          {sections.map((section) => {
            const Icon = section.icon
            const isActive = activeSection === section.id

            return (
              <Button
                key={section.id}
                type="button"
                variant="ghost"
                className={cn(
                  "h-auto min-w-48 justify-start whitespace-normal rounded-lg border border-transparent px-3 py-3 text-left lg:min-w-0",
                  isActive
                    ? "border-primary/20 bg-accent text-primary shadow-xs"
                    : "text-muted-foreground hover:bg-background hover:text-foreground"
                )}
                aria-pressed={isActive}
                onClick={() => onSectionChange(section.id)}
              >
                <Icon className="mt-0.5 size-4" />
                <span className="grid min-w-0 gap-0.5">
                  <span className="text-sm font-medium leading-none">
                    {section.label}
                  </span>
                  <span className="text-xs font-normal leading-snug text-muted-foreground">
                    {section.description}
                  </span>
                </span>
              </Button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
