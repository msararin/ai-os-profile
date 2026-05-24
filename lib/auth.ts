import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const allowedEmails = process.env.INTERNAL_ALLOWED_EMAILS?.split(',').map(e => e.trim()) || []

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const email = user.email?.toLowerCase()
      
      if (!email) {
        console.warn('[Auth] Sign-in attempt with no email')
        return false
      }

      if (!allowedEmails.includes(email)) {
        console.warn(`[Auth] Unauthorized sign-in attempt: ${email}`)
        return false
      }

      console.log(`[Auth] Authorized sign-in: ${email}`)
      return true
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
})
