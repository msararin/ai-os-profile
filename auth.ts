import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { ownerStatus, SESSION_SECONDS } from "@/lib/owner-policy"
import { audit } from "@/lib/owner-audit"
const secure = process.env.NODE_ENV === "production" || process.env.AUTH_URL?.startsWith("https:") === true
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google({
    clientId: process.env.GOOGLE_CLIENT_ID ?? process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? process.env.AUTH_GOOGLE_SECRET,
    authorization: { params: { scope: "openid email profile", access_type: "online" } },
    checks: ["pkce", "state", "nonce"],
  })],
  session: { strategy: "jwt", maxAge: SESSION_SECONDS },
  jwt: { maxAge: SESSION_SECONDS },
  useSecureCookies: secure,
  cookies: { sessionToken: {
    name: secure ? "__Secure-authjs.session-token" : "authjs.session-token",
    options: { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: SESSION_SECONDS },
  } },
  pages: { signIn: "/login", error: "/login" },
  callbacks: {
    signIn({ account, profile }) {
      const allowed = account?.provider === "google" && profile?.email_verified === true &&
        typeof profile.sub === "string" && Boolean(process.env.OWNER_GOOGLE_SUB) &&
        profile.sub === process.env.OWNER_GOOGLE_SUB
      if (!allowed) audit("authorization_denied")
      return allowed || "/access-denied"
    },
    jwt({ token, account, profile }) {
      if (account) {
        if (account.provider !== "google" || profile?.email_verified !== true ||
            typeof profile.sub !== "string" || !process.env.OWNER_GOOGLE_SUB ||
            profile.sub !== process.env.OWNER_GOOGLE_SUB) return null
        return { googleSub: profile.sub, ownerExpiresAt: Date.now() + SESSION_SECONDS * 1000 }
      }
      // Ignore client session-update input; identity is set only from the verified provider.
      if (typeof token.ownerExpiresAt !== "number" || token.ownerExpiresAt <= Date.now()) return null
      return token
    },
    session({ session, token }) {
      session.googleSub = typeof token.googleSub === "string" ? token.googleSub : undefined
      session.ownerExpiresAt = typeof token.ownerExpiresAt === "number" ? token.ownerExpiresAt : 0
      session.valid = ownerStatus({ ...session, valid: true }) === 200
      session.user = {} as typeof session.user
      return session
    },
  },
  events: { signIn: () => audit("login"), signOut: () => audit("logout") },
})
