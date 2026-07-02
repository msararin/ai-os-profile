import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const OWNER_EMAIL = "msararin@gmail.com"

function getAllowedEmails() {
  const configuredEmails = process.env.INTERNAL_ALLOWED_EMAILS?.split(",") ?? []
  const emails = configuredEmails.map((email) => email.trim().toLowerCase()).filter(Boolean)

  return new Set([OWNER_EMAIL, ...emails])
}

export function isAllowedInternalEmail(email?: string | null) {
  if (!email) {
    return false
  }

  return getAllowedEmails().has(email.toLowerCase())
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth: session }) {
      return isAllowedInternalEmail(session?.user?.email)
    },
    signIn({ profile }) {
      return isAllowedInternalEmail(profile?.email)
    },
  },
})
