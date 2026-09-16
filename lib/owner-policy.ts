export const SESSION_SECONDS = 8 * 60 * 60
export type OwnerSession = { valid?: boolean; googleSub?: string; ownerExpiresAt?: number; expires?: string } | null
export function ownerStatus(session: OwnerSession, ownerSub = process.env.OWNER_GOOGLE_SUB, now = Date.now()): 200 | 401 | 403 {
  if (!session || !session.expires || !Number.isFinite(Date.parse(session.expires)) || Date.parse(session.expires) <= now ||
      typeof session.ownerExpiresAt !== "number" || !Number.isFinite(session.ownerExpiresAt) || session.ownerExpiresAt <= now) return 401
  if (!ownerSub || !session.googleSub || session.googleSub !== ownerSub || session.valid !== true) return 403
  return 200
}
