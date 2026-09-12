'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function TtsBetaAccess() {
  const [code, setCode] = useState(''), [busy, setBusy] = useState(false), [error, setError] = useState('')
  const router = useRouter()
  return <form className="space-y-3 rounded-xl border border-slate-200 bg-white p-6" onSubmit={async event => {
    event.preventDefault(); setBusy(true); setError('')
    try {
      const response = await fetch('/api/tts/access', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail ?? 'Could not sign in.')
      setCode(''); router.refresh()
    } catch (error) { setError(error instanceof Error ? error.message : 'Please try again.') }
    finally { setBusy(false) }
  }}>
    <h2 className="font-semibold">Try the beta · เข้าทดสอบ</h2>
    <p className="text-sm text-slate-600">ใส่รหัสตัวเลขที่ได้รับจาก Sararin เพื่ออัปโหลดและสร้างเสียง ไม่ต้องล็อกอินหรือใช้อีเมล</p>
    <label className="block text-sm">รหัสเข้าทดสอบ 8 หลัก<input type="password" inputMode="numeric" pattern="[0-9]{8}" autoComplete="off" value={code} onChange={event => setCode(event.target.value.replace(/\D/g, '').slice(0,8))} required minLength={8} maxLength={8} className="mt-1 w-full rounded border border-slate-300 p-2" /></label>
    <button disabled={busy} className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white disabled:opacity-50">{busy ? 'Opening…' : 'Start testing'}</button>
    {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
  </form>
}
