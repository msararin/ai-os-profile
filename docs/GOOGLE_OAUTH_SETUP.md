# Google OAuth Setup Guide for sararin.ai

**Last Updated:** 2026-05-24  
**Status:** Code ready, needs Vercel environment variables

---

## 📋 Step-by-Step Setup

### 1. Create Google OAuth Credentials

1. Go to: https://console.cloud.google.com/apis/credentials
2. Create a new project (or select existing)
3. Click **"Create Credentials"** → **"OAuth client ID"**
4. Application type: **Web application**
5. Name: `sararin.ai Internal Auth`

**Authorized JavaScript origins:**
```
https://sararin.ai
```

**Authorized redirect URIs:**
```
https://sararin.ai/api/auth/callback/google
```

6. Click **Create**
7. Copy the **Client ID** and **Client Secret**

---

### 2. Generate NextAuth Secret

Run this command in your terminal:

```bash
openssl rand -base64 32
```

Copy the output (e.g., `abc123xyz...`)

---

### 3. Add Environment Variables to Vercel

1. Go to: https://vercel.com/dashboard
2. Select project: **ai-os-profile**
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

| Variable | Value | Example |
|----------|-------|---------|
| `GOOGLE_CLIENT_ID` | From step 1 | `123456789-abc.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | From step 1 | `GOCSPX-abc123xyz` |
| `NEXTAUTH_SECRET` | From step 2 | `your-generated-secret` |
| `NEXTAUTH_URL` | Production URL | `https://sararin.ai` |
| `INTERNAL_ALLOWED_EMAILS` | Your email | `msararin@gmail.com` |

**Important:** Set all variables to **Production** environment

---

### 4. Redeploy

After adding environment variables:

1. Go to **Deployments** tab in Vercel
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**

Or just push any commit to main (auto-deploys).

---

## 🔒 Security Notes

### Email Allowlist

Only emails in `INTERNAL_ALLOWED_EMAILS` can access `/internal/*` routes.

To add multiple emails:
```
INTERNAL_ALLOWED_EMAILS=msararin@gmail.com,other@example.com
```

(Comma-separated, no spaces)

### Session Management

- Sessions use JWT strategy
- Stored in HTTP-only cookies
- Middleware checks session before allowing access to /internal/*
- Unauthorized users redirected to `/auth/signin`
- Failed sign-ins logged to console

### Privacy

- Only email address is used for authentication
- No other personal data collected or stored
- Google OAuth consent screen shows: "View your email address"

---

## 🧪 Testing Auth Flow

Once environment variables are set:

1. Visit: https://sararin.ai/internal/dashboard
2. Should redirect to: `/auth/signin`
3. Click **"Sign in with Google"**
4. Google OAuth consent screen appears
5. Sign in with authorized email
6. Redirected back to: `/internal/dashboard`
7. Dashboard loads successfully ✅

**Test unauthorized access:**
- Sign in with different email
- Should see: `/auth/error` page
- "Access denied" message

---

## 🚨 Troubleshooting

### "Redirect URI mismatch" error

- Check Google Console redirect URIs exactly match:
  - `https://sararin.ai/api/auth/callback/google`
- No trailing slash
- HTTPS required

### Sign-in button does nothing

- Check browser console for errors
- Verify `GOOGLE_CLIENT_ID` is set in Vercel
- Verify NextAuth API route exists: `/api/auth/[...nextauth]/route.ts`

### Unauthorized after successful Google sign-in

- Check `INTERNAL_ALLOWED_EMAILS` variable
- Email must match exactly (case-insensitive)
- Check Vercel logs for: `[Auth] Unauthorized sign-in attempt: <email>`

### Session not persisting

- Check `NEXTAUTH_SECRET` is set
- Try clearing cookies
- Check `NEXTAUTH_URL` matches production domain

---

## 📝 Current Auth Routes

| Route | Purpose |
|-------|---------|
| `/auth/signin` | Sign-in page with Google button |
| `/auth/error` | Unauthorized access error page |
| `/api/auth/[...nextauth]` | NextAuth.js API handler |
| `/internal/*` | Protected routes (requires auth) |

---

## ✅ Checklist

- [ ] Google OAuth credentials created
- [ ] Redirect URIs configured
- [ ] GOOGLE_CLIENT_ID added to Vercel
- [ ] GOOGLE_CLIENT_SECRET added to Vercel
- [ ] NEXTAUTH_SECRET generated and added
- [ ] NEXTAUTH_URL set to https://sararin.ai
- [ ] INTERNAL_ALLOWED_EMAILS set to msararin@gmail.com
- [ ] Vercel redeployed
- [ ] Tested sign-in flow
- [ ] Tested unauthorized access
- [ ] Dashboard accessible after auth

---

**Status:** Ready to activate once environment variables are set! 🚀
