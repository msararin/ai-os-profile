import type { ReactNode } from "react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function NboNrtPrivacyContainmentLayout({
  children: _children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              NBO–NRT Telco on Azure Databricks
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Evidence reference temporarily removed
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
              This case-study page is temporarily unavailable while its public evidence references are reviewed and privacy-safe publication boundaries are restored.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
