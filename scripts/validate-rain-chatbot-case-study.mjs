import assert from "node:assert/strict"
import fs from "node:fs"

const page = fs.readFileSync("app/case-studies/rain-chatbot/page.tsx", "utf8")
const index = fs.readFileSync("app/case-studies/page.tsx", "utf8")
const download = fs.readFileSync("public/downloads/rain-chatbot-case-study.html", "utf8")
const qr = fs.statSync("public/case-studies/rain-chatbot/line-qr-original.png")

for (const marker of [
  "Evidence already established vs. additional validation",
  "The chatbot has been tested in real use.",
  "ทดสอบใช้งานจริงบน live chatbot แล้ว",
  "เลือกตำแหน่งได้ถึงแขวง ≠ พยากรณ์แม่นระดับแขวง",
  "deterministic reverse geocode",
  "ห้ามเดาภูมิศาสตร์",
  "แนวโน้ม 3 วัน",
  "简体中文",
  "จุดเปอร์เซ็นต์เทียบวันก่อน",
  "สถานะใช้งานได้จริงยืนยันแยกต่างหากจาก owner trial",
  "คนท้องที่",
  "ไม่ต้องอ่านเรดาร์เอง",
  "RainViewer Weather Maps API",
  "Service status · 1 October 2026:",
  "ปิดให้บริการแล้ว เนื่องจากสถานการณ์ผ่อนคลายลงและปัจจุบันมีบริการทางเลือกอื่นให้ใช้งานจำนวนมาก",
]) assert.ok(page.includes(marker), `missing page marker: ${marker}`)

assert.ok(index.includes('status: "Service closed"'), "index closure status is not aligned")
assert.ok(index.includes('title: "Rain Forecast Chatbot"'), "index title is not aligned")
assert.ok(index.includes("owner-tested"), "index owner-trial boundary is not aligned")
assert.ok(index.includes("Comparative accuracy"), "index accuracy boundary is not aligned")
assert.ok(download.includes("SERVICE CLOSED / TESTED IN REAL USE / OWNER-TESTED USEFULNESS"), "download closure status boundary missing")
assert.ok(download.includes("ปิดให้บริการแล้ว เนื่องจากสถานการณ์ผ่อนคลายลงและปัจจุบันมีบริการทางเลือกอื่นให้ใช้งานจำนวนมาก"), "download closure reason missing")
assert.ok(download.includes("บอตผ่านการทดสอบใช้งานจริงแล้ว"), "download real-use test evidence missing")
assert.ok(download.includes("https://sararin.ai/case-studies/rain-chatbot/line-qr-original.png"), "download does not reference the original QR")
assert.ok(qr.size > 50_000, "original QR asset is unexpectedly small")

console.log("PASS_RAIN_CHATBOT_CASE_STUDY_CONTRACT")
