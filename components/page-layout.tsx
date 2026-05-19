"use client"

import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"
import { PageMetadata } from "./page-metadata"

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      {/* Top-right metadata block */}
      <div className="mx-auto w-full max-w-5xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex justify-end">
          <PageMetadata />
        </div>
      </div>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
