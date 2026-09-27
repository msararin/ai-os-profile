import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Rain Forecast Chatbot Case Study | Sararin",
  description: "A bounded case study for making coordinate-linked rain forecasts easier to understand.",
}

const sources = [
  ["Open-Meteo Forecast API", "รับพิกัด WGS84 และคืนพยากรณ์รายชั่วโมงจากแบบจำลอง/กริด", "ไม่ได้รับรองความแม่นระดับแขวง และไม่ใช่ฝนตรวจวัด ณ จุดบ้าน", "กำหนดเป็น R1; ตรวจเอกสารแล้ว แต่ยังไม่มี runtime receipt ของโครงการ"],
  ["TMD / Bangkok radar", "ภาพเรดาร์และเวลาของภาพสำหรับดูตำแหน่งและการเคลื่อนที่ของกลุ่มฝน", "สีต้องอ่านตาม legend ของผลิตภัณฑ์นั้น และไม่ใช่ probability forecast", "Candidate; endpoint, coverage, freshness และสิทธิ์ใช้ซ้ำยังต้องพิสูจน์"],
  ["RainViewer map tiles", "radar-composite tiles ตามพิกัด/zoom พร้อม color-scheme parameter", "สีฟ้า เขียว เหลืองเปลี่ยนความหมายได้ตาม scheme", "Candidate; ยังไม่อนุมัติเป็น production source"],
]

const delivery = [
  ["ค้นชื่อ / ปักหมุด / โลเคชันจากเพื่อน", "ตกลงแล้ว", "ยังไม่มีหลักฐาน", "ยังไม่ทดสอบ", "พิกัด → deterministic reverse geocode → ผู้ใช้ยืนยันก่อนบันทึก"],
  ["พิกัดเป็น source of truth", "ตกลงแล้ว", "ยังไม่มีหลักฐาน", "ยังไม่ทดสอบ", "LLM อธิบาย/แปลเท่านั้น ห้ามเดาภูมิศาสตร์"],
  ["ฝนตอนนี้ / 3 ชั่วโมง / แนวโน้ม 3 วัน", "ตกลงแล้ว", "ยังไม่มีหลักฐาน", "ยังไม่ทดสอบ", "เรียกดูตามคำขอ; ใช้จุดเปอร์เซ็นต์เทียบวันก่อน ไม่ใช้ MoM"],
  ["ไทย / English / 简体中文", "ตกลงแล้ว", "ยังไม่มีหลักฐาน", "ยังไม่ทดสอบ", "ทุกภาษาต้องมาจากผลคำนวณเดียวกัน"],
  ["Open-Meteo coordinate forecast", "เลือกเป็นแหล่ง R1", "ยังไม่มี runtime receipt", "ตรวจเอกสารแล้ว", "ยังไม่ยืนยัน response, freshness หรือ accuracy ของระบบ"],
  ["LINE OA · @777bsqns", "บัญชียืนยันแล้ว", "มี QR จากเจ้าของ", "ยังไม่ทดสอบ bot response", "การมี QR ไม่ใช่หลักฐานว่าบอตพร้อมใช้งาน"],
]

const Cell = ({ children }: { children: ReactNode }) => <td className="p-4 align-top leading-6 text-muted-foreground">{children}</td>

export default function RainChatbotCaseStudyPage() {
  return <PageLayout>
    <header className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/case-studies" className="text-sm font-medium text-primary hover:underline">← Back to Case Studies</Link>
        <div className="mt-5 flex flex-wrap gap-2"><Badge variant="outline">Community weather information</Badge><Badge variant="outline">Specification defined</Badge><Badge variant="outline">Implementation & validation pending</Badge></div>
        <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">Rain Forecast Chatbot</h1>
        <p lang="th" className="mt-4 max-w-4xl text-xl leading-8">ช่วยประชาชนเข้าใจพยากรณ์ฝนที่สัมพันธ์กับพื้นที่ของตน โดยไม่ต้องตีความแผนที่อากาศเอง</p>
        <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">Making forecast information easier to access and understand—without confusing precise location selection with proven neighbourhood-level accuracy.</p>
        <div className="mt-6 rounded-lg border border-amber-300/60 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:bg-amber-950/20 dark:text-amber-100"><strong>Evidence status · 27 September 2026:</strong> requirements and bounded architecture are documented. The chatbot workflow, live API response, forecast accuracy, multilingual replies and service readiness have not been demonstrated end to end.</div>
      </div>
    </header>

    <main className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-5 md:grid-cols-3">
        {[
          ["The public problem", "พยากรณ์ภาพรวมจังหวัดอาจไม่ตอบว่า พื้นที่ที่ฉันสนใจ วันนี้และอีก 3 วันฝนมีแนวโน้มอย่างไร ขณะที่เรดาร์ต้องดูตำแหน่ง เวลา และ legend"],
          ["The intended experience", "เลือกพื้นที่ ยืนยันชื่อพื้นที่ แล้วรับสรุปภาษาคนที่ผูกกับพิกัด ช่วงเวลา และแหล่งข้อมูล"],
          ["The honest claim", "จุดเด่นที่คาดหวังคือเข้าถึงง่าย สรุปง่าย และผูกกับพื้นที่—not proven accuracy. ความแม่นและประโยชน์จริงต้องวัด"],
        ].map(([title, text]) => <Card key={title}><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-muted-foreground"><p>{text}</p></CardContent></Card>)}
      </section>

      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Source truth</p>
        <h2 className="mt-2 text-2xl font-semibold">What the data can—and cannot—say</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">The selected forecast interface is coordinate-based, but its answer still represents numerical model data associated with a grid. เลือกตำแหน่งได้ถึงแขวง ≠ พยากรณ์แม่นระดับแขวง.</p>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="min-w-[900px] w-full text-left text-sm"><thead className="bg-muted/60"><tr><th className="p-4">Source</th><th className="p-4">What it provides</th><th className="p-4">What it does not prove</th><th className="p-4">Project status</th></tr></thead><tbody>{sources.map(([a,b,c,d]) => <tr key={a} className="border-t border-border"><th className="p-4 align-top font-medium">{a}</th><Cell>{b}</Cell><Cell>{c}</Cell><Cell>{d}</Cell></tr>)}</tbody></table></div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card><CardHeader><CardTitle>Location contract · ข้อตกลงการเลือกพื้นที่</CardTitle></CardHeader><CardContent className="space-y-4 text-sm leading-7 text-muted-foreground"><ol className="grid gap-3 sm:grid-cols-2">{[
          ["1 · Choose", "ค้นชื่อพื้นที่ / ปักหมุด / ใช้โลเคชันที่เพื่อนส่งมา"],
          ["2 · Resolve", "แปลงเป็น latitude/longitude และ reverse geocode แบบ deterministic"],
          ["3 · Confirm", "แสดงชื่อพื้นที่และหมุดให้ผู้ใช้ยืนยันก่อนบันทึก"],
          ["4 · Explain", "LLM สรุป/แปลจากข้อมูล ห้ามเดาพิกัด เขต หรือแขวง"],
        ].map(([a,b]) => <li key={a} className="rounded-lg border border-border p-4"><strong className="block text-foreground">{a}</strong>{b}</li>)}</ol><p><strong className="text-foreground">Boundary:</strong> precise coordinates improve location association; they do not increase the model grid’s inherent precision.</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Forecast response contract</CardTitle></CardHeader><CardContent className="space-y-4 text-sm leading-7 text-muted-foreground"><p><strong className="text-foreground">On demand:</strong> ฝนตอนนี้, 3 ชั่วโมงข้างหน้า และแนวโน้ม 3 วัน</p><p><strong className="text-foreground">Languages:</strong> ไทย / English / 简体中文 จากผลคำนวณชุดเดียวกัน</p><p><strong className="text-foreground">Daily change:</strong> ใช้ “จุดเปอร์เซ็นต์เทียบวันก่อน” ไม่ใช้ MoM</p><p><strong className="text-foreground">Disclosure:</strong> แสดงพื้นที่ เวลา แหล่งข้อมูล freshness และสถานะ missing/stale/conflicting</p></CardContent></Card>
      </section>

      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Delivery truth</p><h2 className="mt-2 text-2xl font-semibold">Agreed ≠ built ≠ tested</h2>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="min-w-[980px] w-full text-left text-sm"><thead className="bg-muted/60"><tr><th className="p-4">Capability</th><th className="p-4">Requirement</th><th className="p-4">Built evidence</th><th className="p-4">Test evidence</th><th className="p-4">Boundary / next proof</th></tr></thead><tbody>{delivery.map(([a,b,c,d,e]) => <tr key={a} className="border-t border-border"><th className="p-4 align-top font-medium">{a}</th><Cell>{b}</Cell><Cell>{c}</Cell><Cell>{d}</Cell><Cell>{e}</Cell></tr>)}</tbody></table></div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card><CardHeader><CardTitle>Chatbot vs. weather map or radar</CardTitle></CardHeader><CardContent className="space-y-4 text-sm leading-7 text-muted-foreground"><p><strong className="text-foreground">Chatbot’s intended advantage:</strong> lower interpretation effort, concise wording and an explicit link to the confirmed location.</p><p><strong className="text-foreground">Map/radar advantage:</strong> preserves spatial context, movement and source detail that a short message can hide.</p><p><strong className="text-foreground">Colour rule:</strong> blue, green or yellow means only what the displayed source legend says. Forecast probability, model precipitation and radar reflectivity are different quantities.</p><p>No superiority claim is made. A fair comparison requires user-comprehension and forecast-versus-observation tests.</p></CardContent></Card>
        <Card><CardHeader><CardTitle>What must be proven next</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-muted-foreground"><ul className="list-disc space-y-2 pl-5"><li>Live response, model/grid metadata, freshness and failure behaviour.</li><li>End-to-end LINE webhook, reply, deduplication and language parity.</li><li>Location confirmation prevents wrong-area saves without LLM geography guesses.</li><li>Archived forecasts versus observations, including missed rain and false alarms.</li><li>Whether users understand area, timing and uncertainty more accurately or faster.</li></ul></CardContent></Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card><CardHeader><CardTitle>LINE project account · @777bsqns</CardTitle></CardHeader><CardContent className="grid gap-5 sm:grid-cols-[220px_1fr] sm:items-center"><Image src="/case-studies/rain-chatbot/line-qr-original.png" alt="Owner-provided LINE add-friend QR for @777bsqns" width={1086} height={978} unoptimized className="h-auto w-full rounded-lg bg-white"/><div className="space-y-4 text-sm leading-7 text-muted-foreground"><p>QR นี้ยืนยันช่องทางบัญชีที่เจ้าของให้ไว้เท่านั้น ยังไม่ยืนยันว่าบอตตอบกลับหรือพร้อมให้บริการ</p><p>The original QR download is separate from the case-study download.</p><a href="/case-studies/rain-chatbot/line-qr-original.png" download="Rain_Chatbot_LINE_QR_original.png" className="inline-flex rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground">Download original QR image</a></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Download this case study</CardTitle></CardHeader><CardContent className="space-y-4 text-sm leading-7 text-muted-foreground"><p>Downloadable Thai/English HTML with the same status boundaries and source notes. Its QR loads from the canonical public asset and requires a network connection.</p><a href="/downloads/rain-chatbot-case-study.html" download className="inline-flex rounded-md border border-border px-4 py-2 font-medium text-primary hover:bg-muted">Download Case Study HTML</a></CardContent></Card>
      </section>

      <section className="rounded-xl border border-border bg-muted/30 p-6"><h2 className="text-xl font-semibold">Primary references</h2><ul className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground md:grid-cols-2"><li><a className="underline" href="https://open-meteo.com/en/docs" target="_blank" rel="noreferrer">Open-Meteo Forecast API</a> — coordinates, variables, models and grid-cell selection.</li><li><a className="underline" href="https://weather.tmd.go.th/disclaimer.html" target="_blank" rel="noreferrer">TMD radar disclaimer</a> — product-use boundary.</li><li><a className="underline" href="https://weather.bangkok.go.th/Radar/" target="_blank" rel="noreferrer">Bangkok radar</a> — source display and timestamp.</li><li><a className="underline" href="https://www.rainviewer.com/api/weather-maps-api.html" target="_blank" rel="noreferrer">RainViewer Weather Maps API</a> — radar tiles and color scheme.</li><li><a className="underline" href="https://www.rainviewer.com/api/transition-faq.html" target="_blank" rel="noreferrer">RainViewer API transition</a> — current limitations.</li></ul><p className="mt-5 text-xs text-muted-foreground">Documentation review: 27 September 2026. Documentation availability is not project runtime evidence.</p></section>
    </main>
  </PageLayout>
}
