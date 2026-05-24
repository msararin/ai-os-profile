# OAuth Sign-Out Bug - Verification Checklist

## Deployment Status

- [x] Code changes committed to Git
- [x] Pushed to GitHub (commit: a689b75)
- [ ] Vercel deployment triggered automatically
- [ ] Vercel deployment completed successfully

## Pre-Deployment Verification

- [x] Local build passes (`pnpm build`)
- [x] No syntax errors in modified files
- [x] Comprehensive logging added
- [x] Dynamic email loading implemented
- [x] OAuth flow reset configured
- [x] Documentation created

## Post-Deployment Testing

### Environment Variables (Check Vercel Dashboard)
- [ ] `INTERNAL_ALLOWED_EMAILS` is set correctly
- [ ] `GOOGLE_CLIENT_ID` is configured
- [ ] `GOOGLE_CLIENT_SECRET` is configured
- [ ] `NEXTAUTH_SECRET` exists
- [ ] `NEXTAUTH_URL` = `https://sararin.ai`

### Functional Testing
- [ ] Navigate to https://sararin.ai/internal/dashboard
- [ ] Verify redirect to sign-in page
- [ ] Sign in with authorized Google account
- [ ] Verify successful login and access to dashboard
- [ ] Check browser console for `[Auth:*]` logs (if dev mode)
- [ ] Click "Sign Out" button
- [ ] Verify redirect to homepage
- [ ] Navigate to /internal/dashboard again
- [ ] Sign in with same account
- [ ] **CRITICAL**: Verify second login succeeds (no "Access denied")

### Log Verification (Vercel Dashboard → Functions → Logs)
- [ ] Search for `[Auth:signIn]` logs
- [ ] Verify "Loaded N allowed emails" shows correct count
- [ ] Confirm "✅ AUTHORIZED" message appears
- [ ] Check for any "❌ DENIED" messages
- [ ] Verify `[Middleware]` logs show cookie presence

## Issues Found

_Document any issues discovered during testing:_

---

## Sign-Off

- [ ] First login works: _____ (date/time)
- [ ] Sign-out works: _____ (date/time)
- [ ] Second login works: _____ (date/time)
- [ ] No errors in Vercel logs: _____ (date/time)
- [ ] Bug is resolved: _____ (initials)

## Rollback Plan

If bug persists after deployment:

1. Check Vercel environment variables first
2. Add temporary debug logging:
   ```typescript
   console.log('[DEBUG] Raw env:', process.env.INTERNAL_ALLOWED_EMAILS)
   console.log('[DEBUG] Parsed emails:', getAllowedEmails())
   ```
3. Redeploy with debug logging
4. If still failing, revert to commit: 85c41ad (before fix)

## Notes

_Add any observations or follow-up items:_

---

**Deployment Time**: _____  
**Tester**: _____  
**Result**: _____
