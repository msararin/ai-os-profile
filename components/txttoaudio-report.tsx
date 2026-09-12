import libraries from '@/lib/tts-library-inventory.json'

const results = [
  { value: "20", label: "Backend tests passed" },
  { value: "58 / 58", label: "Long-document sections completed" },
  { value: "~20 min", label: "Audio generated in ~2 min locally" },
]

export function TxtToAudioReport() {
  return (
    <section id="report" aria-labelledby="report-title" className="mt-12 scroll-mt-8 border-t border-slate-200 pt-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Use case · Document listening</p>
      <h2 id="report-title" className="mt-3 text-2xl font-semibold tracking-tight">Listen when you don’t have time to read</h2>
      <p className="mt-4 leading-7 text-slate-600">
        Sometimes you want to take in a document but don’t have time to sit down and read it.
        Upload your Thai, English or Chinese document, or paste text, and turn it into an MP3 to listen to when convenient.
        Listening instead of reading is the main purpose; reviewing notes and rehearsing are optional uses.
      </p>
      <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="font-semibold text-emerald-900">Invited beta · Access by numeric code</p>
        <p className="mt-2 text-sm leading-6 text-emerald-900">Validation snapshot: 11 September 2026. Speech quality still needs human listening and acceptance.</p>
      </div>

      <h3 className="mt-8 text-lg font-semibold">A small, repeatable workflow</h3>
      <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7 text-slate-600">
        <li>Upload a simple TXT or Word DOCX file, or paste text. Export Google Docs yourself; no document connection is needed.</li>
        <li>Review and edit the extracted text. Thai, English and Mandarin Chinese are detected automatically, including mixed passages.</li>
        <li>Generate, listen and download an MP3. Saved audio can be reused from the private cache.</li>
      </ol>
      <p className="mt-3 text-sm leading-6 text-slate-600">Current scope: up to 200,000 characters and a 4 MiB upload. Long documents become listening parts, with individual MP3s, one combined MP3 or a ZIP. Failed parts can be retried without repeating completed ones. PDF and complex Word layouts are outside this version.</p>

      <h3 className="mt-8 text-lg font-semibold">What the local report established</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">12 September update: Mandarin and chapter downloads passed local tests. The backend suite now has 30 passing tests, including a failed middle part, service restart, retry without regenerating completed parts, and ZIP contents matching the MP3 parts. Earlier benchmark results below remain the 11 September snapshot.</p>
      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
        {results.map(({ value, label }) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-4">
            <dt className="text-sm leading-5 text-slate-600">{label}</dt>
            <dd className="mt-2 text-2xl font-semibold text-slate-900">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        The long-document run used 19,984 characters and produced 1,196 seconds of audio in 117.66 seconds on the test machine.
        These are observed local results, not a speed guarantee.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
        <li>Real speech generation, cache ownership, cancellation and timeout handling passed backend checks.</li>
        <li>Desktop and mobile browser checks covered upload, editing, playback and download using a synthetic local signed-in session.</li>
        <li>Type checking, lint and the production build passed. Real production sign-in has not been verified.</li>
      </ul>

      <h3 className="mt-8 text-lg font-semibold">How it was built and reviewed</h3>
      <p className="mt-3 leading-7 text-slate-600">
        Sonnet assisted with implementation and a separate QA review. Codex inspected and corrected the code, integrated it and ran the tests.
        Opus reviewed the candidate and returned a local pass. These were explicit model calls, not an autonomous Big Crew run.
      </p>
      <h3 className="mt-8 text-lg font-semibold">Beta testing and remaining work</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-600">
        <li>Listen to Thai, English and mixed samples, especially names, numbers and transitions.</li>
        <li>Resolve the Thai runtime package’s license evidence before claiming the whole stack is cleared for open-source use.</li>
        <li>The temporary audio worker requires the host computer to remain online. Download audio before the 24-hour retention period ends.</li>
      </ul>
      <p className="mt-5 text-sm leading-6 text-slate-600">The prototype generates speech locally without a paid TTS API. Hosting costs and pronunciation accuracy are not guaranteed.</p>
      <section id="libraries" aria-labelledby="libraries-title" className="mt-8 scroll-mt-8">
        <h3 id="libraries-title" className="text-lg font-semibold">Libraries used — learn and build on this</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">แชร์เครื่องมือที่ใช้จริงเพื่อให้คนอื่นศึกษาต่อ: หน้าที่ของแต่ละตัว เวอร์ชันที่ทดสอบ และลิงก์ต้นทาง ขอบคุณผู้พัฒนาและชุมชนที่ทำให้โปรเจกต์นี้เป็นไปได้</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">Selected libraries, models and tools, not a complete dependency audit. The Thai runtime’s license remains unresolved; its model’s MIT declaration does not cover every package automatically.</p>
        <div className="mt-4 grid gap-3">
          {libraries.map(library => (
            <article key={library.name} className="rounded-lg border border-slate-200 bg-white p-4">
              <a href={library.url} className="font-semibold text-emerald-800 underline underline-offset-4">{library.name}</a>
              <p className="mt-1 text-xs text-slate-500">{library.version}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{library.purpose}</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">License evidence: {library.license}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
