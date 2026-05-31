import { cookies } from "next/headers"

export default async function InternalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const isLocalReview = cookieStore.get("local-internal-review")?.value === "1"

  return (
    <>
      {isLocalReview && (
        <div className="border-b border-yellow-500/40 bg-yellow-100 px-4 py-3 text-sm font-medium text-yellow-950 dark:bg-yellow-950 dark:text-yellow-100">
          Local review mode — development only. Production auth is still required.
        </div>
      )}
      <div className="border-b border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm font-medium text-foreground">
        Internal status surfaces are not live dashboards unless explicitly marked "Verified as of."
        Unverified operational data is hidden or marked pending to avoid false confidence.
      </div>
      {children}
    </>
  )
}
