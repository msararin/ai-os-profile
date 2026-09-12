'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, FileText, AlertCircle, Loader2, X } from 'lucide-react';
import { TtsParts, type AudioPart } from './tts-parts';

type Tab = 'upload' | 'paste';
type GenStatus = 'idle' | 'submitting' | 'polling' | 'completed' | 'failed' | 'cancelled';

interface JobProgress {
  completedSegments?: number;
  totalSegments?: number;
  status: string;
  error?: string;
  parts?: AudioPart[];
}

const MAX_CHARS = 200000;
const MAX_IMPORT_BYTES = 4 * 1048576;

function sanitizeDetail(obj: unknown): string {
  if (!obj || typeof obj !== 'object') return 'An unexpected error occurred.';
  const o = obj as Record<string, unknown>;
  const msg = o.detail ?? o.error ?? o.message;
  if (typeof msg === 'string' && msg.length < 300) return msg;
  return 'An unexpected error occurred.';
}

export default function TxtToAudioClient() {
  const [tab, setTab] = useState<Tab>('upload');
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const [genStatus, setGenStatus] = useState<GenStatus>('idle');
  const [jobId, setJobId] = useState<string | null>(null);
  const [progress, setProgress] = useState<JobProgress | null>(null);
  const [genError, setGenError] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const busyRef = useRef(false);
  const versionRef = useRef(0);

  const clearOutput = useCallback(() => {
    setJobId(null);
    setProgress(null);
    setGenError(null);
    setGenStatus('idle');
    setDownloadError(null);
  }, []);

  const stopPolling = useCallback(() => {
    versionRef.current += 1;
    if (pollRef.current) {
      clearTimeout(pollRef.current);
      pollRef.current = null;
    }
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    busyRef.current = false;
  }, []);

  useEffect(() => () => stopPolling(), [stopPolling]);

  const handleTextChange = (v: string) => {
    setText(v);
    clearOutput();
  };

  const handleTabChange = (t: Tab) => {
    setTab(t);
    setText('');
    setFileName(null);
    setImportError(null);
    clearOutput();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > MAX_IMPORT_BYTES) {
      setImportError('File exceeds 4 MiB limit.');
      return;
    }
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'txt' && ext !== 'docx') {
      setImportError('Only .txt and .docx files are supported.');
      return;
    }
    setImporting(true);
    stopPolling();
    const version = versionRef.current;
    const ac = new AbortController();
    abortRef.current = ac;
    setImportError(null);
    clearOutput();
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/tts/imports', { method: 'POST', body: form, signal: ac.signal });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        if (res.status === 413) throw new Error('File too large.');
        if (res.status === 422) throw new Error(sanitizeDetail(j));
        if (res.status === 429) throw new Error('Too many requests. Please wait and try again.');
        if (res.status === 503) throw new Error('Audio service is unavailable. Please try again later.');
        throw new Error(sanitizeDetail(j));
      }
      const data = await res.json();
      if (version !== versionRef.current) return;
      const extracted: string = data.text ?? '';
      if (Array.from(extracted).length > MAX_CHARS) throw new Error('Extracted text exceeds 200,000 characters. Please shorten the file.');
      setText(extracted);
      setFileName(file.name);
    } catch (err: unknown) {
      if (version !== versionRef.current) return;
      setImportError(err instanceof Error ? err.message : 'Import failed.');
    } finally {
      if (version === versionRef.current) setImporting(false);
    }
  };

  const pollJob = useCallback((id: string) => {
    if (busyRef.current) return;
    busyRef.current = true;
    const ac = new AbortController();
    const version = versionRef.current;
    abortRef.current = ac;
    fetch(`/api/tts/jobs/${id}`, { signal: ac.signal })
      .then(async (res) => {
        if (version !== versionRef.current) return;
        busyRef.current = false;
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          if (res.status === 503) throw new Error('Audio service is unavailable. Please try again later.');
          throw new Error(sanitizeDetail(j));
        }
        const data: JobProgress = await res.json();
        if (version !== versionRef.current) return;
        setProgress(data);
        if (data.status === 'completed') {
          setGenStatus('completed');
          stopPolling();
        } else if (data.status === 'failed') {
          setGenStatus('failed');
          setGenError(sanitizeDetail(data));
          stopPolling();
        } else if (data.status === 'cancelled') {
          setGenStatus('cancelled');
          stopPolling();
        } else {
          pollRef.current = setTimeout(() => pollJob(id), 2000);
        }
      })
      .catch((err: unknown) => {
        if (version !== versionRef.current) return;
        busyRef.current = false;
        if (err instanceof Error && err.name === 'AbortError') return;
        setGenStatus('failed');
        setGenError(err instanceof Error ? err.message : 'Polling error.');
        stopPolling();
      });
  }, [stopPolling]);

  const handleGenerate = async () => {
    if (!text.trim() || genStatus === 'submitting' || genStatus === 'polling') return;
    stopPolling();
    clearOutput();
    setGenStatus('submitting');
    const version = versionRef.current;
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const res = await fetch('/api/tts/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim() }),
        signal: ac.signal,
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        if (res.status === 429) throw new Error('Too many requests. Please wait and try again.');
        if (res.status === 503) throw new Error('Audio service is unavailable. Please try again later.');
        throw new Error(sanitizeDetail(j));
      }
      const data = await res.json();
      if (version !== versionRef.current) return;
      const id: string = data.id;
      setJobId(id);
      setGenStatus('polling');
      pollRef.current = setTimeout(() => pollJob(id), 100);
    } catch (err: unknown) {
      if (version !== versionRef.current) return;
      setGenStatus('failed');
      setGenError(err instanceof Error ? err.message : 'Failed to start generation.');
    }
  };

  const handleCancel = async () => {
    if (!jobId) return;
    stopPolling();
    const version = versionRef.current;
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const response = await fetch(`/api/tts/jobs/${jobId}/cancel`, { method: 'POST', signal: ac.signal });
      if (!response.ok) throw new Error('Cancellation could not be confirmed. Check the job again.');
      const result = await response.json();
      if (version !== versionRef.current) return;
      setGenStatus(result.status === 'completed' ? 'completed' : 'cancelled');
      const snapshot = await fetch(`/api/tts/jobs/${jobId}`, { signal: ac.signal });
      if (snapshot.ok) {
        const latest = await snapshot.json();
        if (version === versionRef.current) setProgress(latest);
      }
    } catch (err) {
      if (version !== versionRef.current) return;
      setGenError(err instanceof Error ? err.message : 'Cancellation failed.');
      setGenStatus('failed');
    }
  };

  const handleRetry = async (index?: number) => {
    if (!jobId) return;
    stopPolling(); const version = versionRef.current;
    setGenStatus('submitting'); setGenError(null);
    try {
      const response = await fetch(`/api/tts/jobs/${jobId}/${index === undefined ? 'retry' : `parts/${index}/retry`}`, { method: 'POST' });
      if (!response.ok) throw new Error(sanitizeDetail(await response.json()));
      if (version !== versionRef.current) return;
      setGenStatus('polling'); pollRef.current = setTimeout(() => pollJob(jobId), 100);
    } catch (error) {
      if (version !== versionRef.current) return;
      setGenStatus('failed'); setGenError(error instanceof Error ? error.message : 'Retry failed.');
    }
  };

  const isLocked = importing || genStatus === 'submitting' || genStatus === 'polling';
  const charCount = Array.from(text).length;
  const overLimit = charCount > MAX_CHARS;

  const progressLine = genStatus === 'polling' && progress?.totalSegments
    ? `Processing ${progress.completedSegments ?? 0} / ${progress.totalSegments} segments…`
    : genStatus === 'polling' ? 'Generating audio…'
    : genStatus === 'submitting' ? 'Submitting…' : null;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200">
        {(['upload', 'paste'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => handleTabChange(t)}
            disabled={isLocked}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === t
                ? 'border-b-2 border-slate-800 text-slate-900'
                : 'text-slate-500 hover:text-slate-700'
            } disabled:opacity-50`}
          >
            {t === 'upload' ? 'Upload a file' : 'Paste text'}
          </button>
        ))}
      </div>

      {/* Upload Tab */}
      {tab === 'upload' && (
        <div className="space-y-3">
          <label
            className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-white p-8 text-center cursor-pointer transition hover:border-slate-400 ${
              isLocked ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            {importing ? (
              <Loader2 className="w-6 h-6 text-slate-500 animate-spin" />
            ) : (
              <Upload className="w-6 h-6 text-slate-500" />
            )}
            <span className="text-sm text-slate-600">
              {fileName ? fileName : 'Click to upload .txt or .docx'}
            </span>
            <span className="text-xs text-slate-500">Max 4 MiB</span>
            <input
              type="file"
              accept=".txt,.docx"
              className="sr-only"
              onChange={handleFileUpload}
              disabled={isLocked}
            />
          </label>
          <p className="text-xs text-slate-500">
            Thai, English and Mandarin Chinese are detected automatically. Chinese simplified and traditional text are supported. PDF is not supported — export as DOCX or TXT from Google Docs or Word manually. No OCR.
          </p>
          {importError && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-xs text-red-700">{importError}</p>
            </div>
          )}
        </div>
      )}

      {/* Paste Tab */}
      {tab === 'paste' && (
        <div className="space-y-1">
          <p className="text-xs text-slate-500">
            Thai, English and Mandarin Chinese are detected automatically. Chinese simplified and traditional text are supported.
          </p>
        </div>
      )}

      {/* Shared textarea */}
      <p className="text-xs text-slate-600">เอกสารยาวจะแบ่งเป็นตอนตามประโยคหรือย่อหน้า ระยะเวลาต่อตอนเป็นค่าประมาณ เลือกดาวน์โหลดแยกตอน รวม MP3 หรือ ZIP ได้เมื่อสร้างเสร็จ</p>
      <p className="text-xs text-slate-500">ข้ามเครื่องหมายขึ้นต้นรายการ เช่น - • * และอีโมจิเมื่ออ่านเสียง โดยยังแสดงไว้ในข้อความ · List bullets and decorative emoji are not spoken.</p>
      <div className="space-y-1">
        <div className="relative">
          <textarea
            className={`w-full min-h-[180px] rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 leading-relaxed resize-y placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300 transition ${
              isLocked ? 'opacity-60 pointer-events-none' : ''
            } ${overLimit ? 'border-red-300' : ''}`}
            placeholder={tab === 'upload' ? 'Extracted text will appear here for editing…' : 'Paste your script here…'}
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            disabled={isLocked}
            aria-label="Script text"
          />
        </div>
        <div className={`text-xs text-right ${
          overLimit ? 'text-red-500' : 'text-slate-500'
        }`}>
          {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
        </div>
      </div>

      {/* Generate button */}
      <div className="flex gap-3 items-center">
        <button
          onClick={handleGenerate}
          disabled={isLocked || !text.trim() || overLimit}
          className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          {genStatus === 'submitting' || genStatus === 'polling' ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Generating…
            </span>
          ) : 'Generate Audio'}
        </button>
        {(genStatus === 'polling' || genStatus === 'submitting') && jobId && (
          <button
            onClick={handleCancel}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
        )}
      </div>

      {/* Progress */}
      {progressLine && (
        <p
          role="status"
          aria-live="polite"
          className="text-sm text-slate-500"
        >
          {progressLine}
        </p>
      )}

      {/* Errors */}
      {genStatus === 'failed' && genError && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3">
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-red-700">{genError}</p>
            <p className="text-xs text-red-500 mt-1">Completed parts are kept. Retry an unfinished part below, or edit the text to start a new document.</p>
          </div>
        </div>
      )}

      {genStatus === 'cancelled' && (
        <p className="text-sm text-slate-500">Generation cancelled.</p>
      )}

      {/* Completed */}
      {jobId && progress?.parts && <TtsParts jobId={jobId} parts={progress.parts} complete={genStatus === 'completed'} canRetry={!isLocked} onRetry={handleRetry} fileName={fileName} />}
      {genStatus === 'completed' && jobId && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
          <h2 className="font-semibold">Complete document · ไฟล์เดียวทั้งเอกสาร</h2>
          <audio
            controls
            src={`/api/tts/jobs/${jobId}/audio`}
            className="w-full"
            aria-label="Generated audio"
          />
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <a
              href={`/api/tts/jobs/${jobId}/download`}
              download
              onClick={async (event) => {
                event.preventDefault();
                if (downloading) return;
                setDownloading(true); setDownloadError(null);
                try {
                  const response = await fetch(`/api/tts/jobs/${jobId}/download`);
                  if (!response.ok || !response.headers.get('content-type')?.includes('audio/mpeg')) {
                    throw new Error('Download failed. Please sign in again or regenerate the audio.');
                  }
                  const blob = await response.blob();
                  if (!blob.size) throw new Error('The audio file is empty. Please generate it again.');
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `${(fileName ?? 'document').replace(/\.(txt|docx)$/i, '').replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_')}-audio.mp3`;
                  document.body.appendChild(link); link.click(); link.remove();
                  setTimeout(() => URL.revokeObjectURL(url), 60000);
                } catch (error) { setDownloadError(error instanceof Error ? error.message : 'Download failed.'); }
                finally { setDownloading(false); }
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
            >
              <FileText className="w-4 h-4" /> {downloading ? 'Preparing download…' : 'Download MP3'}
            </a>
          </div>
          {downloadError && <p role="alert" className="text-sm text-red-700">{downloadError}</p>}
          <p className="text-xs text-slate-500">ดูไฟล์ที่บันทึกในรายการ Downloads ของเบราว์เซอร์ แล้วเลือก Show in Finder เพื่อเปิดโฟลเดอร์</p>
          <div className="space-y-1">
            <p className="text-xs text-slate-500">
              Server audio expires after approximately 24 hours. A downloaded copy stays on your computer.
            </p>
            <p className="text-xs text-slate-500">
              Text is processed on the owner's self-hosted worker — no cloud TTS service is used.
            </p>
            <p className="text-xs text-slate-500">
              Pronunciation of names, numbers, and mixed-language text may not be accurate. Please review before use.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
