import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Local Rain Forecast Chatbot | Sararin",
  description: "A community rain chatbot case study: making location-based forecasts easier to understand, with transparent sources and evidence limits.",
}
const sections = [
  {title:"The problem · ปัญหา", th:"พยากรณ์ภาพรวมจังหวัดอาจไม่ตอบว่า บริเวณที่ฉันอยู่ อีก 3 ชั่วโมงฝนจะเป็นอย่างไร การอ่านเรดาร์เองต้องเข้าใจตำแหน่ง เวลา และสเกลสี", en:"Province-wide summaries can leave residents unsure what to expect locally. Reading radar requires interpreting location, timestamps and the colour scale."},
  {title:"The approach · แนวทาง", th:"ออกแบบ chatbot ให้สรุปพยากรณ์ตามพิกัดจาก Open-Meteo เป็นคำตอบสั้น พร้อมพื้นที่ ช่วงเวลา และแหล่งข้อมูล เริ่มทดลองที่ทุ่งสองห้อง กรุงเทพฯ", en:"Design a chatbot that translates coordinate-based Open-Meteo forecasts into concise answers with location, time and source information, starting with Thung Song Hong, Bangkok."},
  {title:"Expected value · คุณค่าที่คาดหวัง", th:"ประชาชนเข้าถึงแนวโน้มฝนที่เจาะจงกว่าภาพรวมจังหวัด และเข้าใจได้โดยไม่จำเป็นต้องอ่านแผนที่เป็น ประโยชน์ด้านความเข้าใจยังต้องทดสอบกับผู้ใช้จริง", en:"Make local forecast information easier to access and understand. Better user comprehension is an intended benefit, not yet a measured outcome."},
  {title:"Evidence boundaries · ข้อจำกัด", th:"ความละเอียดขึ้นกับกริดของโมเดล หลายแขวงอาจใช้ข้อมูลเดียวกัน พยากรณ์ไม่ใช่ฝนตรวจวัดจริง ยังไม่มีผลยืนยันว่าแม่นกว่าพยากรณ์ทั่วไปหรือผู้ที่อ่านเรดาร์เป็น", en:"Spatial detail depends on the model grid; neighbouring subdistricts may share a cell. Forecasts do not confirm observed rain. Superior accuracy and live service readiness have not been established."},
  {title:"Next validation · การพิสูจน์ผลลัพธ์", th:"วัดความถูกต้องโดยเทียบพยากรณ์ที่เก็บล่วงหน้ากับฝนตรวจวัด แยกฝนที่พลาดและการคาดฝนที่ไม่เกิดขึ้น พร้อมทดสอบว่าผู้ใช้เข้าใจพื้นที่ เวลา และข้อจำกัดได้เร็วขึ้นหรือไม่", en:"Evaluate archived forecasts against observations, including missed rain and false alarms. Separately test how accurately and quickly users understand location, timing and uncertainty."},
]
export default function RainChatbotCaseStudyPage() {
  return <PageLayout>
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/case-studies" className="text-sm font-medium text-primary hover:underline">← Back to Case Studies</Link>
        <div className="mt-5 flex flex-wrap gap-2"><Badge variant="outline">Community weather information</Badge><Badge variant="outline">In development · Validation pending</Badge></div>
        <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">Local Rain Forecast Chatbot</h1>
        <p lang="th" className="mt-4 text-lg leading-8 text-muted-foreground">ช่วยประชาชนเข้าใจพยากรณ์ฝนตามพื้นที่</p>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">Making location-based forecasts understandable while keeping geographic detail, forecast accuracy and observed rain distinct.</p>
        <p className="mt-4 text-sm text-muted-foreground">Case-study snapshot: 27 September 2026 · Initial pilot area: Thung Song Hong, Bangkok</p>
      </div>
    </section>
    <section className="py-10">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.3fr_0.8fr] lg:px-8">
        <div className="space-y-5">{sections.map(section=><Card key={section.title}><CardHeader><CardTitle>{section.title}</CardTitle></CardHeader><CardContent className="space-y-3 text-sm leading-7 text-muted-foreground"><p lang="th">{section.th}</p><p lang="en">{section.en}</p></CardContent></Card>)}</div>
        <aside className="space-y-5">
          <Card><CardHeader><CardTitle>LINE · @777bsqns</CardTitle></CardHeader><CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
            <p lang="th">สแกน QR เพื่อเพิ่มเพื่อนบัญชี LINE ของโครงการ</p>
            <Image src="/case-studies/rain-chatbot/line-qr-original.png" alt="Owner-provided LINE account information and add-friend QR for @777bsqns" width={1086} height={978} unoptimized className="h-auto w-full rounded-lg bg-white"/>
            <p>Owner-provided account QR. Bot response availability has not been verified in this case study.</p>
            <a href="/case-studies/rain-chatbot/line-qr-original.png" download="Rain_Chatbot_LINE_QR.png" className="inline-flex rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Download QR image</a>
          </CardContent></Card>
          <Card><CardHeader><CardTitle>Download case study</CardTitle></CardHeader><CardContent className="space-y-3 text-sm leading-6 text-muted-foreground"><p>Thai case study with English overview and embedded QR. Open the downloaded HTML to print or save as PDF.</p><a href="/downloads/rain-chatbot-case-study.html" download className="inline-flex rounded-md border border-border px-4 py-2 font-medium text-primary hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Download HTML · TH / EN</a></CardContent></Card>
          <Card><CardHeader><CardTitle>Sources</CardTitle></CardHeader><CardContent className="space-y-3 text-sm leading-6 text-muted-foreground"><p><a className="underline" href="https://open-meteo.com/en/docs" target="_blank" rel="noreferrer">Open-Meteo forecast documentation</a></p><p><a className="underline" href="https://www.metoffice.gov.uk/research/weather/observations-research/radar-products" target="_blank" rel="noreferrer">Met Office: Radar products</a></p><p>Confidence in the documented API distinction: high. Local chatbot forecast accuracy: not yet measured.</p></CardContent></Card>
        </aside>
      </div>
    </section>
  </PageLayout>
}
