import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { betaToken, TTS_COOKIE, ttsOriginAllowed } from '@/lib/tts-access'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const reply = (detail: string, status: number) => Response.json({ detail }, { status, headers: { 'Cache-Control': 'private, no-store' } })

export async function POST(request: Request) {
  if (!ttsOriginAllowed(request)) return reply('Open this form on the website.', 403)
  const codes = (process.env.TTS_BETA_ACCESS_CODES ?? '').split(',').map(code => code.trim()), secret = process.env.TTS_BETA_SESSION_SECRET
  if (codes.length !== 2 || new Set(codes).size !== 2 || codes.some(code => !/^\d{8}$/.test(code)) || !secret || secret.length < 32) return reply('Tester access is not configured.', 503)
  try {
    const reader = request.body?.getReader()
    if (!reader) return reply('Enter your invitation code.', 400)
    let body = new Uint8Array()
    try {
      while (true) {
        const { value, done } = await reader.read(); if (done) break
        if (body.length + value.length > 1024) { await reader.cancel(); return reply('Invalid invitation code.', 413) }
        const next = new Uint8Array(body.length + value.length); next.set(body); next.set(value, body.length); body = next
      }
    } finally { reader.releaseLock() }
    const supplied = JSON.parse(new TextDecoder().decode(body)).code
    if (typeof supplied !== 'string') return reply('Invalid invitation code.', 401)
    const actual = Buffer.from(supplied.trim())
    let matched = -1
    codes.forEach((code, index) => { const expected = Buffer.from(code); if (actual.length === expected.length && timingSafeEqual(actual, expected)) matched = index })
    if (matched < 0) return reply('Invalid invitation code.', 401)
    const maxAge = 7 * 24 * 3600
    ;(await cookies()).set(TTS_COOKIE, betaToken(createHmac('sha256', secret).update(`beta-user:${matched + 1}`).digest('hex').slice(0, 32), Date.now() + maxAge * 1000, secret), {
      httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge,
    })
    return reply('Access granted.', 200)
  } catch { return reply('Invalid invitation code.', 400) }
}
