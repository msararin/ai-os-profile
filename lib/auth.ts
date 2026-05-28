import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const googleClientId = process.env.AUTH_GOOGLE_ID ?? process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET ?? process.env.GOOGLE_CLIENT_SECRET
const authSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET

// Dynamically load allowed emails on each check to avoid stale cache
function getAllowedEmails(): string[] {
  const emails = process.env.INTERNAL_ALLOWED_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || []
  console.log(`[Auth] Loaded ${emails.length} allowed emails from env`)
  return emails
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: googleClientId!,
      clientSecret: googleClientSecret!,
      // Force consent screen on every sign-in to ensure fresh OAuth flow
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const email = user.email?.toLowerCase()
      const timestamp = new Date().toISOString()
      
      console.log(`[Auth:signIn] ${timestamp} - Sign-in attempt started`)
      console.log(`[Auth:signIn] User email: ${email}`)
      console.log(`[Auth:signIn] Account provider: ${account?.provider}`)
      console.log(`[Auth:signIn] Profile verified: ${(profile as any)?.email_verified}`)
      
      if (!email) {
        console.warn(`[Auth:signIn] ❌ DENIED - No email provided`)
        return false
      }

      // Re-load allowed emails on each sign-in to avoid stale cache
      const allowedEmails = getAllowedEmails()
      
      if (!allowedEmails.includes(email)) {
        console.warn(`[Auth:signIn] ❌ DENIED - Email not in allowlist: ${email}`)
        console.warn(`[Auth:signIn] Allowed emails count: ${allowedEmails.length}`)
        return false
      }

      console.log(`[Auth:signIn] ✅ AUTHORIZED - ${email}`)
      return true
    },
    
    async jwt({ token, user, account, trigger }) {
      const timestamp = new Date().toISOString()
      
      console.log(`[Auth:jwt] ${timestamp} - JWT callback triggered`)
      console.log(`[Auth:jwt] Trigger: ${trigger}`)
      console.log(`[Auth:jwt] Token sub: ${token.sub}`)
      console.log(`[Auth:jwt] User email: ${user?.email || token.email}`)
      
      // On sign-in, add user info to token
      if (user) {
        token.email = user.email
        console.log(`[Auth:jwt] Adding user to token: ${user.email}`)
      }
      
      return token
    },
    
    async session({ session, token }) {
      const timestamp = new Date().toISOString()
      
      console.log(`[Auth:session] ${timestamp} - Session callback`)
      console.log(`[Auth:session] Token email: ${token.email}`)
      console.log(`[Auth:session] Session user: ${session.user?.email}`)
      
      // Ensure email is in session
      if (token.email && session.user) {
        session.user.email = token.email as string
      }
      
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: authSecret,
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  debug: process.env.AUTH_DEBUG === 'true',
})
