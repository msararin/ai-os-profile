import Link from "next/link"
import { requireOwner } from "@/lib/owner-access"

export async function PageLayout({ children }: { children: React.ReactNode }) {
  await requireOwner()
  return <div className="min-w-0 rounded-xl border border-slate-200 bg-background text-foreground">
    <div className="border-b border-border px-5 py-4 text-sm">
      <Link href="/cockpit/aios" className="font-semibold text-teal-700 underline">AIOS archive</Link>
      <p className="mt-2 text-muted-foreground">Original AIOS pages · preserved September 2026. Roles, diagrams and status snapshots describe the saved design and evidence; they are not live system health.</p>
      <nav aria-label="AIOS sections" className="mt-3 flex flex-wrap gap-4">
        <Link href="/cockpit/aios/org-roles" className="text-teal-700 underline">Org Chart · Big Crew &amp; Supernova</Link>
        <Link href="/cockpit/aios/architecture" className="text-teal-700 underline">Architecture</Link>
        <Link href="/cockpit/aios/architecture/system-health" className="text-teal-700 underline">System Health</Link>
        <Link href="/cockpit/telemetry" className="text-teal-700 underline">Recorded telemetry</Link>
      </nav>
    </div>
    {children}
  </div>
}
