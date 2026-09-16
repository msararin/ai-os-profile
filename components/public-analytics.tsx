"use client"
import { usePathname } from "next/navigation"
import { Analytics } from "@vercel/analytics/next"
export function PublicAnalytics() { const path=usePathname(); if (/^\/(cockpit|internal|login)(\/|$)/.test(path)) return null; return <Analytics beforeSend={event=>/^\/(cockpit|internal|login)(\/|$)/.test(new URL(event.url).pathname)?null:event}/> }
