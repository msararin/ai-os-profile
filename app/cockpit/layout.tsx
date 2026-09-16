import Link from "next/link"
import { requireOwner } from "@/lib/owner-access"
import { signOut } from "@/auth"
export const dynamic = "force-dynamic"
export const metadata = { title: "Owner Cockpit · Private", robots: { index: false, follow: false, nocache: true } }
const navigation = [["Overview","/cockpit"],["Workstreams","/cockpit/workstreams"],["Telemetry","/cockpit/telemetry"],["Evidence","/cockpit/evidence"],["Methodology","/cockpit/methodology"],["Experiments","/cockpit/experiments"],["Deployments","/cockpit/deployments"],["Security / Audit","/cockpit/security"]]
export default async function CockpitLayout({ children }: { children: React.ReactNode }) {
  await requireOwner()
  return <div className="min-h-screen bg-slate-50 text-slate-900"><header className="border-b border-slate-700 bg-slate-950 px-6 py-5 text-white"><div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4"><Link href="/cockpit" className="text-sm font-semibold tracking-[.15em] text-teal-300">OWNER COCKPIT · PRIVATE</Link><form action={async()=>{ "use server"; await requireOwner(); await signOut({ redirectTo: "/login" }) }}><button className="rounded-lg border border-slate-600 px-4 py-2 text-xs">Sign out</button></form></div></header><div className="mx-auto grid max-w-[1550px] lg:grid-cols-[215px_1fr]"><aside className="border-b border-slate-200 bg-white p-5 lg:min-h-[calc(100vh-80px)] lg:border-r"><p className="mb-4 text-xs uppercase tracking-widest text-slate-400">Workspace</p><nav className="flex flex-wrap gap-1 lg:flex-col">{navigation.map(([title,href])=><Link key={href} href={href} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-teal-50 hover:text-teal-800">{title}</Link>)}</nav><p className="mt-8 text-xs leading-5 text-slate-400">Private operational records.<br/>Review before sharing.</p></aside><main className="min-w-0 p-5 sm:p-8 lg:p-10">{children}</main></div></div>
}
