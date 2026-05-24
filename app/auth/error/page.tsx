import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AuthErrorPage() {
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
