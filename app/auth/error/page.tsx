import Link from "next/link"
import { auth } from "@/lib/auth"
import {
  getInternalAllowedEmailDiagnostics,
  isLocalInternalReviewAccessEnabled,
  maskEmail,
} from "@/lib/local-internal-review"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default async function AuthErrorPage() {
  const session = await auth()
  const isDevelopment = process.env.NODE_ENV === "development"
  const allowlist = getInternalAllowedEmailDiagnostics()
  const authDiagnostics = [
    {
      label: "Signed-in email",
      value: maskEmail(session?.user?.email),
    },
    {
      label: "Allowed email count",
      value: String(allowlist.count),
    },
    {
      label: "INTERNAL_ALLOWED_EMAILS loaded",
      value: allowlist.isLoaded ? "yes" : "no",
    },
    {
      label: "AUTH_SECRET present",
      value: process.env.AUTH_SECRET ? "yes" : "no",
    },
    {
      label: "NEXTAUTH_SECRET present",
      value: process.env.NEXTAUTH_SECRET ? "yes" : "no",
    },
    {
      label: "GOOGLE_CLIENT_ID present",
      value: process.env.GOOGLE_CLIENT_ID || process.env.AUTH_GOOGLE_ID ? "yes" : "no",
    },
    {
      label: "GOOGLE_CLIENT_SECRET present",
      value: process.env.GOOGLE_CLIENT_SECRET || process.env.AUTH_GOOGLE_SECRET ? "yes" : "no",
    },
    {
      label: "Local review mode active",
      value: isLocalInternalReviewAccessEnabled() ? "yes" : "no",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-red-600">
            Authentication Error
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              🚫 Access denied. Your email is not authorized to access this area.
            </AlertDescription>
          </Alert>

          <div className="text-sm text-muted-foreground space-y-3">
            <p>
              Only specific email addresses are allowed to access the internal dashboard.
            </p>
            <p>
              If you believe you should have access, please contact the site administrator.
            </p>
          </div>

          {isDevelopment && (
            <div className="rounded-md border border-yellow-500/30 bg-yellow-50 p-3 text-xs text-yellow-950 dark:bg-yellow-950 dark:text-yellow-100">
              <p className="mb-2 font-medium">Development auth diagnostics</p>
              <dl className="space-y-1">
                {authDiagnostics.map((item) => (
                  <div key={item.label} className="flex justify-between gap-3">
                    <dt>{item.label}</dt>
                    <dd className="font-medium">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3">
                If your email is not in the allowlist, update INTERNAL_ALLOWED_EMAILS and restart dev server.
              </p>
              <p className="mt-2">
                Also check AUTH_SECRET / NEXTAUTH_SECRET, GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET, and INTERNAL_ALLOWED_EMAILS.
              </p>
            </div>
          )}

          <div className="pt-4 space-y-2">
            <Link 
              href="/auth/signin"
              className="block w-full text-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
            >
              Try Again
            </Link>
            <Link 
              href="/"
              className="block w-full text-center px-4 py-2 text-primary hover:underline"
            >
              Back to Public Portfolio
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
