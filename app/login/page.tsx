import { signIn } from "@/auth"
import Link from "next/link"
export const metadata = { title: "Owner sign in", robots: { index: false, follow: false } }
export const dynamic = "force-dynamic"
export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams
  return <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100"><section className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-10 shadow-xl">
    <p className="text-xs font-semibold uppercase tracking-[.2em] text-teal-300">Sararin.ai · Private access</p>
    <h1 className="mt-5 text-3xl font-semibold">Owner sign in</h1><p className="mt-4 text-sm leading-6 text-slate-300">Sign in with your authorized Google account to open the private workspace.</p>
    {error && <p role="alert" className="mt-5 rounded-lg border border-amber-500/40 p-3 text-sm text-amber-200">Access was not granted. Check your account or server configuration.</p>}
    <form className="mt-8" action={async () => { "use server"; await signIn("google", { redirectTo: "/cockpit" }) }}><button className="w-full rounded-lg bg-white px-4 py-3 font-medium text-slate-950">Continue with Google</button></form>
    <Link href="/" className="mt-7 inline-block text-sm text-slate-400 hover:text-white">← Back to public site</Link>
  </section></main>
}
