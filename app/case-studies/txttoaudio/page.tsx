import { Metadata } from 'next';
import Link from 'next/link';
import { ttsIdentity } from '@/lib/tts-access';
import { TtsBetaAccess } from '@/components/tts-beta-access';
import TxtToAudioClient from '@/components/txttoaudio-client';
import { TxtToAudioReport } from '@/components/txttoaudio-report';

export const metadata: Metadata = {
  title: 'Text to Audio | Sararin',
  description: 'A locally validated Thai–English–Chinese document-to-audio use case, with its workflow, test results and remaining release checks.',
};

export default async function TxtToAudioPage() {
  const allowed = Boolean(await ttsIdentity());

  return (
    <main className="min-h-screen bg-[#faf8f5] text-slate-800">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <nav className="mb-8">
          <Link
            href="/case-studies"
            className="text-sm text-slate-500 hover:text-slate-700 underline underline-offset-2"
          >
            ← Back to Case Studies
          </Link>
        </nav>

        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 mb-1">
          Listen to your documents
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          ไม่มีเวลาอ่าน? แปลงเอกสารเป็นไฟล์เสียง แล้วเก็บไว้ฟังเมื่อสะดวก
        </p>
        <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">รุ่นทดสอบแบบมีรหัสเชิญ · บริการเสียงทำงานเมื่อเครื่องของผู้ดูแลออนไลน์ รับงานครั้งละหนึ่งเอกสาร กรุณาทดสอบด้วยเอกสารที่ไม่เป็นความลับ และดาวน์โหลดเสียงเก็บไว้ก่อนครบ 24 ชั่วโมง</p>

        {!allowed ? (
          <TtsBetaAccess />
        ) : (
          <TxtToAudioClient />
        )}
        <TxtToAudioReport />
      </div>
    </main>
  );
}
