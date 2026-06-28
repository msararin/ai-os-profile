import { redirect } from "next/navigation"
import { ShieldCheck, LogOut, LockKeyhole, UserRoundCheck } from "lucide-react"

import { auth, isAllowedInternalEmail, signOut } from "@/auth"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function InternalDashboardPage() {
  const session = await auth()
  const email = session?.user?.email

  if (!email || !isAllowedInternalEmail(email)) {
    redirect("/api/auth/signin?callbackUrl=/internal/dashboard")
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <Badge variant="outline" className="gap-2">
                <ShieldCheck className="size-3.5" />
                Owner access
              </Badge>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                  Internal Cockpit
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Protected owner-only shell for future AIOS operational views.
                </p>
              </div>
            </div>

            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}
            >
              <Button type="submit" variant="outline">
                <LogOut className="size-4" />
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-2 lg:px-8">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <UserRoundCheck className="size-4 text-primary" />
              Session
            </CardTitle>
            <CardDescription>Server-side session validation is active.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Signed in as <span className="font-medium text-foreground">{email}</span>.
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <LockKeyhole className="size-4 text-primary" />
              Route Protection
            </CardTitle>
            <CardDescription>Internal routes are deny-by-default.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Requests to <code className="rounded bg-muted px-1 py-0.5">/internal/*</code> require an
            allowed Google OAuth account before page code renders.
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
