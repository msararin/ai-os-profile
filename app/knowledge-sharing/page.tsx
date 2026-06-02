import { PageLayout } from "@/components/page-layout"

const linkedInPosts = [
  {
    urn: "urn:li:share:7465996088735604736",
    height: 1558,
    title: "LinkedIn Post - May 29, 2026",
    date: "May 29, 2026",
  },
  {
    urn: "urn:li:share:7465789008669782016",
    height: 1867,
    title: "LinkedIn Post - May 28, 2026",
    date: "May 28, 2026",
  },
  {
    urn: "urn:li:share:7463991112739827712",
    height: 1825,
    title: "LinkedIn Post - May 24, 2026",
    date: "May 24, 2026",
  },
  {
    urn: "urn:li:share:7463988818816229376",
    height: 1468,
    title: "LinkedIn Post - May 24, 2026",
    date: "May 24, 2026",
  },
  {
    urn: "urn:li:share:7463986941903118337",
    height: 1497,
    title: "LinkedIn Post - May 24, 2026",
    date: "May 24, 2026",
  },
  {
    urn: "urn:li:share:7463096505944461312",
    height: 1573,
    title: "LinkedIn Post - May 23, 2026",
    date: "May 23, 2026",
  },
  {
    urn: "urn:li:share:7461728358209339392",
    height: 1993,
    title: "LinkedIn Post - May 20, 2026",
    date: "May 20, 2026",
  },
  {
    urn: "urn:li:share:7461722849179975680",
    height: 2182,
    title: "LinkedIn Post - May 20, 2026",
    date: "May 20, 2026",
  },
  {
    urn: "urn:li:share:7461716842416361472",
    height: 2518,
    title: "LinkedIn Post - May 20, 2026",
    date: "May 20, 2026",
  },
  {
    urn: "urn:li:share:7460177481652699136",
    height: 2161,
    title: "LinkedIn Post - May 18, 2026",
    date: "May 18, 2026",
  },
  {
    urn: "urn:li:share:7459959526771838976",
    height: 873,
    title: "LinkedIn Post - May 17, 2026",
    date: "May 17, 2026",
  },
]

export default function KnowledgeSharingPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Knowledge Sharing</h1>
          <p className="text-muted-foreground text-lg">
            Insights, learnings, and thoughts shared on LinkedIn
          </p>
        </div>

        <section className="mb-8 rounded-lg border border-[#1F3A60]/20 bg-[#1F3A60]/5 p-5">
          <h2 className="text-xl font-semibold text-[#1F3A60]">
            Featured lesson: Observability is evidence, not a claim
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            AIOS observability work now shows what the data proves, what it does not prove, and what must
            improve next. That means the team can say what it knows, what it does not know yet, and how to
            get better without turning the page into a benchmark dashboard or a fake live-monitoring story.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-md border bg-background p-4">
              <h3 className="font-medium text-foreground">What we have</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A public-safe evidence surface, explicit under-construction status, and a clearer distinction between
                evidence, observation, and decision proof.
              </p>
            </div>
            <div className="rounded-md border bg-background p-4">
              <h3 className="font-medium text-foreground">What we know we do not know</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The data is not yet benchmark-ready, comparison-ready, or production-observability proof.
                Join, routing, provenance, and decision metadata are still incomplete.
              </p>
            </div>
            <div className="rounded-md border bg-background p-4">
              <h3 className="font-medium text-foreground">What to do better</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Keep improving joinability, provenance, and decision mapping, then use those records to explain
                value before expanding any dashboard or comparison surface.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-lg border bg-muted/30 p-4">
          <h2 className="text-lg font-semibold">LinkedIn knowledge sharing archive</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Embedded LinkedIn posts are shown below. If an embed is blocked by the local browser,
            privacy settings, or network restrictions, this archive still preserves the intended
            public Knowledge Sharing area and each card identifies the post date.
          </p>
          <p className="mt-3 text-sm font-medium text-muted-foreground">
            Archive freshness: public LinkedIn posts through 29 May 2026. Internal Signal Studio
            drafts and learning records are not exposed on this public page.
          </p>
        </section>

        <div className="grid gap-8">
          {linkedInPosts.map((post) => (
            <article key={post.urn} className="border rounded-lg p-4 bg-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-muted-foreground">
                  {post.date}
                </h2>
              </div>
              <div className="flex justify-center">
                <iframe
                  src={`https://www.linkedin.com/embed/feed/update/${post.urn}`}
                  height={post.height}
                  width={504}
                  frameBorder="0"
                  allowFullScreen
                  title={post.title}
                  className="max-w-full"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
