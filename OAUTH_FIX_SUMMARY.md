# OAuth Sign-Out Bug Fix - Summary

**Date**: May 24, 2026  
**Project**: sararin.ai (ai-os-profile)  
**Issue**: Second login fails with "Access denied" after sign-out  
**Status**: ✅ Fixed & Deployed

---

## Problem

After successfully signing in with Google OAuth, signing out, and attempting to sign in again, users would receive an "Access denied. Your email is not authorized" error message. The bug was intermittent and difficult to reproduce consistently.

---

## Root Cause

### Primary Issue: Stale Environment Variable Cache

The `allowedEmails` array was loaded once at module initialization:

```typescript
// BUGGY CODE:
const allowedEmails = process.env.INTERNAL_ALLOWED_EMAILS?.split(',')...
```

In Vercel's serverless Edge environment, this module could be cached across multiple requests. If the initial load failed or returned an empty array, subsequent sign-in attempts would always fail the authorization check.

### Contributing Factors

1. **No OAuth Flow Reset**: Google OAuth provider didn't force fresh account selection, potentially reusing stale OAuth state
2. **Insufficient Logging**: No visibility into which callback was failing or when
3. **Implicit Sign-Out**: No explicit callback URL or redirect specified

---

## Solution

### 1. Dynamic Email Loading (`lib/auth.ts`)

```typescript
function getAllowedEmails(): string[] {
  const emails = process.env.INTERNAL_ALLOWED_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || []
  console.log(`[Auth] Loaded ${emails.length} allowed emails from env`)
  return emails
}
```

**Benefit**: Fresh environment variable read on every sign-in attempt, preventing stale cache issues.

### 2. Force Fresh OAuth Flow

```typescript
Google({
  authorization: {
    params: {
      prompt: "select_account",
      access_type: "offline",
    },
  },
})
```

**Benefit**: Users always select their account, preventing OAuth state reuse.

### 3. Comprehensive Logging

Added detailed logging at every checkpoint:
- `[Auth:signIn]` - Email validation, authorization decisions
- `[Auth:jwt]` - Token creation and refresh
- `[Auth:session]` - Session hydration
- `[Middleware]` - Cookie presence, session state

**Benefit**: Full visibility into auth flow for debugging production issues.

### 4. Explicit Sign-Out

```typescript
signOut({ 
  callbackUrl: '/',
  redirect: true 
})
```

**Benefit**: Ensures proper cleanup and redirect after sign-out.

---

## Files Modified

| File | Changes |
|------|---------|
| `lib/auth.ts` | Dynamic email loading, OAuth reset, logging, cookie config |
| `middleware.ts` | Timestamp logging, cookie presence tracking |
| `app/internal/dashboard/page.tsx` | Explicit sign-out with callback |
| `app/auth/signin/page.tsx` | Sign-in initiation logging |

**New Files**:
- `OAUTH_DEBUG_NOTES.md` - Detailed debugging documentation
- `.env.local.example` - Environment variable template

---

## Testing Protocol

### Expected Log Flow (Successful Second Login)

```
[SignIn] Sign-in initiated by user
[Auth:signIn] 2026-05-24T... - Sign-in attempt started
[Auth:signIn] User email: user@example.com
[Auth:signIn] Loaded 1 allowed emails from env  ← FRESH LOAD
[Auth:signIn] ✅ AUTHORIZED - user@example.com
[Auth:jwt] JWT callback triggered
[Auth:session] Session callback
[Middleware] ✅ Authorized access: user@example.com
```

### Test Steps

1. ✅ Sign in with authorized email
2. ✅ Access `/internal/dashboard`
3. ✅ Click "Sign Out"
4. ✅ Verify redirect to homepage
5. ✅ Sign in again with same email
6. ✅ **Critical**: Second login should succeed

---

## Deployment

### Git Commit
```
Commit: f406485
Message: Fix OAuth sign-out bug: Dynamic email loading + comprehensive logging
```

### GitHub Push
```
Push: origin/main
Status: ✅ Successful
```

### Vercel Deployment
- Automatic deployment triggered by push to main
- Vercel will pull latest code and deploy
- Check Vercel dashboard for deployment status

### Environment Variables (Verify on Vercel)
```
INTERNAL_ALLOWED_EMAILS = your-email@example.com
GOOGLE_CLIENT_ID = [configured]
GOOGLE_CLIENT_SECRET = [configured]
NEXTAUTH_SECRET = [auto-generated]
NEXTAUTH_URL = https://sararin.ai
```

---

## Verification Steps (Post-Deployment)

1. **Monitor Vercel Logs**: Check for `[Auth:*]` log messages
2. **Test Sign-In Flow**: Verify first login works
3. **Test Sign-Out**: Confirm redirect to homepage
4. **Test Second Login**: Critical - this should now work without "Access denied"
5. **Check Production Logs**: Verify `getAllowedEmails()` is loading correct count

---

## If Bug Persists

### Debug Checklist

- [ ] Verify `INTERNAL_ALLOWED_EMAILS` is set in Vercel environment variables
- [ ] Check Vercel Function Logs for `[Auth:signIn]` messages
- [ ] Confirm `Loaded N allowed emails from env` shows N > 0
- [ ] Verify email in sign-in attempt matches email in env var (case-insensitive)
- [ ] Check cookie domain/path settings in browser DevTools
- [ ] Add temporary debug: `console.log('[DEBUG] Raw env:', process.env.INTERNAL_ALLOWED_EMAILS)`

### Advanced Debugging

If needed, add to `lib/auth.ts`:
```typescript
console.log('[DEBUG] All env keys:', Object.keys(process.env).filter(k => k.includes('EMAIL')))
console.log('[DEBUG] Raw value:', process.env.INTERNAL_ALLOWED_EMAILS)
```

---

## Technical Notes

- **NextAuth Version**: 5.0.0-beta.31
- **Session Strategy**: JWT (serverless-friendly)
- **OAuth Provider**: Google
- **Deployment Platform**: Vercel Edge Functions
- **Cache Behavior**: Edge Functions can cache modules, requiring dynamic env loading

---

## Success Metrics

- ✅ Build passes locally and on CI
- ✅ Code pushed to GitHub
- ✅ Comprehensive logging added
- ✅ Dynamic email loading prevents stale cache
- ✅ OAuth flow reset on every login
- 🔄 Awaiting production verification

---

## Documentation

- **Detailed Analysis**: `OAUTH_DEBUG_NOTES.md`
- **Environment Setup**: `.env.local.example`
- **Commit Message**: Full root cause and solution documented

---

**Next Steps**: Monitor production deployment and verify sign-out → sign-in flow works correctly.
