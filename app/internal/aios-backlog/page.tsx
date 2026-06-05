import { readFile } from "node:fs/promises"
import Link from "next/link"
import { connection } from "next/server"
import { PageLayout } from "@/components/page-layout"

const BACKLOG_SOURCE_PATH =
  "/Users/apple/robert-knowledge-base/03_ai_skill_lab/aios-team/backlog-distillation-v0.1.md"

type BacklogSource =
  | {
      status: "live"
      markdown: string
      loadedAt: string
    }
  | {
      status: "unavailable"
      loadedAt: string
    }

async function loadBacklogSource(): Promise<BacklogSource> {
  await connection()
  const loadedAt = new Date().toISOString()

  try {
    const markdown = await readFile(BACKLOG_SOURCE_PATH, "utf8")

    return {
      status: "live",
      markdown,
      loadedAt,
    }
  } catch {
    return {
      status: "unavailable",
      loadedAt,
    }
  }
}

export default async function AIOSBacklogPage() {
  const source = await loadBacklogSource()

  return (
    <PageLayout>
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/internal/dashboard"
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Back to Internal Dashboard
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Internal review only
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            AIOS Backlog Distillation
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Read-only review surface for the current bounded backlog
            classification proposal.
          </p>
        </div>

        <div className="mt-8 grid gap-4 rounded-xl border bg-card p-5 text-sm shadow-sm md:grid-cols-2">
          <div>
            <p className="font-semibold text-foreground">Source reference</p>
            <p className="mt-1 break-all font-mono text-xs text-muted-foreground">
              Local-only allowlisted Robert(GPT) KB backlog-distillation markdown file
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Source status</p>
            <p className="mt-1 text-muted-foreground">
              {source.status === "live"
                ? "Local-only live KB markdown loaded at request time."
                : "Local-only source unavailable by design in this deployed runtime."}
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Last loaded</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {source.loadedAt}
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Boundary</p>
            <p className="mt-1 text-muted-foreground">
              Read-only. This page has no write-back capability.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm text-foreground">
          <p className="font-semibold">Read-only warning</p>
          <p className="mt-1">
            Robert(GPT) KB markdown + Git remain source of truth.
          </p>
        </div>

        {source.status === "live" ? (
          <article className="mt-6 overflow-x-auto rounded-xl border bg-card p-5 shadow-sm">
            <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-6 text-foreground">
              {source.markdown}
            </pre>
          </article>
        ) : (
          <div className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 p-5 text-sm text-foreground">
            <p className="font-semibold">Local-only source unavailable by design.</p>
            <p className="mt-2 text-muted-foreground">
              The deployed Vercel runtime cannot access Lyn&apos;s local Robert(GPT) KB filesystem path.
              Live KB read is local-only unless a safe export/sync layer is implemented.
            </p>
          </div>
        )}
      </section>
    </PageLayout>
  )
}
