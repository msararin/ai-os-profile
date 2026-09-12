import 'server-only'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

export const TTS_COOKIE = 'sararin_tts_beta'
const signature = (value: string, secret: string) => createHmac('sha256', secret).update(value).digest('base64url')
export function betaToken(id: string, expires: number, secret: string) {
  const payload = Buffer.from(JSON.stringify({ id, expires })).toString('base64url')
  return `${payload}.${signature(payload, secret)}`
}
export async function ttsIdentity() {
  const secret = process.env.TTS_BETA_SESSION_SECRET
  const value = (await cookies()).get(TTS_COOKIE)?.value
  if (!secret || secret.length < 32 || !value || value.length > 512) return null
  try {
    const [payload, supplied, extra] = value.split('.')
    const expected = signature(payload, secret)
    if (extra || !supplied || supplied.length !== expected.length || !timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))) return null
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
    if (!/^[a-f0-9]{32}$/.test(data.id) || !Number.isFinite(data.expires) || data.expires <= Date.now()) return null
    return `tester:${data.id}`
  } catch { return null }
}
export function ttsOriginAllowed(request: Request) {
  try {
    const raw = request.headers.get('origin'), parsed = new URL(raw ?? '')
    const site = request.headers.get('sec-fetch-site')
    const allowed = process.env.NODE_ENV === 'production'
      ? [new URL(process.env.TTS_SITE_ORIGIN ?? 'https://sararin.ai').origin, ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : [])]
      : [new URL(`${new URL(request.url).protocol}//${request.headers.get('host')}`).origin]
    return raw === parsed.origin && ['http:', 'https:'].includes(parsed.protocol) && allowed.includes(parsed.origin) && (site === null || site === 'same-origin')
  } catch { return false }
}
