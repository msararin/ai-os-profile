'use client'
import { useState } from 'react'

export type AudioPart = { index: number; status: string; totalSegments: number; completedSegments: number; duration?: number; error?: string }

function SaveFile({ href, name, zip = false, children }: { href: string; name: string; zip?: boolean; children: React.ReactNode }) {
  const [state, setState] = useState('')
  return <div>
    <a href={href} download={name} className="text-sm font-medium text-emerald-800 underline underline-offset-4" onClick={async event => {
      event.preventDefault(); if (state === 'Preparing…') return
      setState('Preparing…')
      try {
        const response = await fetch(href)
        if (!response.ok || !response.headers.get('content-type')?.includes(zip ? 'application/zip' : 'audio/mpeg')) throw new Error('Download failed. Please try again.')
        const blob = await response.blob()
        if (!blob.size) throw new Error('The download is empty.')
        const url = URL.createObjectURL(blob), a = document.createElement('a')
        a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove()
        setTimeout(() => URL.revokeObjectURL(url), 60000); setState('')
      } catch (error) { setState(error instanceof Error ? error.message : 'Download failed.') }
    }}>{children}</a>
    {state && <p role="status" className="mt-1 text-xs text-slate-600">{state}</p>}
  </div>
}

export function TtsParts({ jobId, parts, complete, canRetry, onRetry, fileName }: {
  jobId: string; parts: AudioPart[]; complete: boolean; canRetry: boolean;
  onRetry: (index?: number) => void; fileName: string | null
}) {
  const base = (fileName ?? 'document').replace(/\.(txt|docx)$/i, '').replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_')
  return <section aria-label="Audio parts" className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
    <h2 className="font-semibold">Audio parts · เสียงแยกตอน</h2>
    <p className="text-sm text-slate-600">{parts.filter(p => p.status === 'completed').length} / {parts.length} ตอนพร้อมฟัง · ตอนที่เสร็จแล้วดาวน์โหลดได้ทันที</p>
    {!complete && <p className="text-xs text-slate-600">MP3 รวมและ ZIP จะพร้อมเมื่อครบทุกตอน</p>}
    {canRetry && !complete && <button onClick={() => onRetry()} className="rounded border border-slate-300 px-3 py-2 text-sm">Resume unfinished parts / finish downloads</button>}
    {complete && <SaveFile href={`/api/tts/jobs/${jobId}/zip`} name={`${base}-parts.zip`} zip>Download all parts (ZIP)</SaveFile>}
    <ol className="space-y-3">
      {parts.map(part => <li key={part.index} className="rounded-lg border border-slate-200 p-3">
        <div className="flex flex-wrap justify-between gap-2 text-sm"><span className="font-medium">Part {String(part.index).padStart(2, '0')}</span><span>{part.status}{part.duration ? ` · ${Math.floor(part.duration / 60)}:${String(Math.round(part.duration % 60)).padStart(2, '0')}` : ''}</span></div>
        {part.status === 'running' && <p className="mt-2 text-xs text-slate-600">{part.completedSegments} / {part.totalSegments} speech sections</p>}
        {part.status === 'completed' ? <div className="mt-3 space-y-3">
          <audio controls preload="none" src={`/api/tts/jobs/${jobId}/parts/${part.index}/audio`} aria-label={`Audio part ${part.index}`} className="w-full" />
          <SaveFile href={`/api/tts/jobs/${jobId}/parts/${part.index}/download`} name={`${base}-part-${String(part.index).padStart(2, '0')}.mp3`}>Download part {part.index}</SaveFile>
        </div> : <>
          {part.error && <p className="mt-2 text-xs text-red-700">{part.error}</p>}
          {canRetry && <button onClick={() => onRetry(part.index)} className="mt-2 text-sm text-emerald-800 underline">Retry part {part.index}</button>}
        </>}
      </li>)}
    </ol>
  </section>
}
