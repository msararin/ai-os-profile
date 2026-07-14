import { redirect } from "next/navigation"
import { auth, isAllowedInternalEmail } from "@/auth"

export const dynamic = "force-dynamic"

export default async function TelemetryOperatorPage() {
  const session = await auth()
  if (!session?.user?.email || !isAllowedInternalEmail(session.user.email)) redirect("/api/auth/signin?callbackUrl=/internal/telemetry/operator")
  if (process.env.VERCEL_ENV !== "preview") return <main className="p-8">Operator unavailable outside Preview.</main>
  return (
    <main className="mx-auto max-w-xl space-y-4 p-8">
      <h1 className="text-2xl font-semibold">Bounded OIDC round-trip</h1>
      <p className="text-sm text-muted-foreground">Preview-only test object; no operational pointer or graph data is changed.</p>
      <form action="/api/internal/telemetry/operator" method="post">
        <button className="rounded bg-primary px-4 py-2 text-primary-foreground" type="submit">Run bounded OIDC round-trip once</button>
      </form>
    </main>
  )
}
