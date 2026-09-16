import { requireOwner } from "@/lib/owner-access"
import Link from "next/link"
export const dynamic = "force-dynamic"
export const metadata = { robots: { index: false, follow: false } }
export default async function Layout({ children }: { children: React.ReactNode }) { await requireOwner(); return <><div className="bg-slate-950 px-6 py-4 text-sm text-teal-300"><Link href="/cockpit">OWNER COCKPIT · PRIVATE · Back to overview</Link></div>{children}</> }
