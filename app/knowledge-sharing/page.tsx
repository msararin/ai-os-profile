import { PageLayout } from "@/components/page-layout"

const linkedInPosts = [
  {
    urn: "urn:li:share:7472888667322089474",
    height: 1867,
    title: "LinkedIn Post - Jun 17, 2026",
    date: "Jun 17, 2026",
  },
  {
    urn: "urn:li:share:7472847987178799107",
    height: 1062,
    title: "LinkedIn Post - Jun 17, 2026",
    date: "Jun 17, 2026",
  },
  {
    urn: "urn:li:share:7471151721398968320",
    height: 2148,
    title: "LinkedIn Post - Jun 12, 2026",
    date: "Jun 12, 2026",
  },
  {
    urn: "urn:li:share:7470734606036750338",
    height: 1833,
    title: "LinkedIn Post - Jun 11, 2026",
    date: "Jun 11, 2026",
  },
  {
    urn: "urn:li:share:7470732769804021760",
    height: 2253,
    title: "LinkedIn Post - Jun 11, 2026",
    date: "Jun 11, 2026",
  },
  {
    urn: "urn:li:share:7470728034589929472",
    height: 1867,
    title: "LinkedIn Post - Jun 11, 2026",
    date: "Jun 11, 2026",
  },
  {
    urn: "urn:li:share:7470439972764987393",
    height: 2316,
    title: "LinkedIn Post - Jun 11, 2026",
    date: "Jun 11, 2026",
  },
  {
    urn: "urn:li:share:7470436211799576576",
    height: 2106,
    title: "LinkedIn Post - Jun 10, 2026",
    date: "Jun 10, 2026",
  },
  {
    urn: "urn:li:share:7470431486580654080",
    height: 2085,
    title: "LinkedIn Post - Jun 10, 2026",
    date: "Jun 10, 2026",
  },
  {
    urn: "urn:li:share:7470341129100496896",
    height: 1804,
    title: "LinkedIn Post - Jun 10, 2026",
    date: "Jun 10, 2026",
  },
  {
    urn: "urn:li:share:7470012081212387330",
    height: 2295,
    title: "LinkedIn Post - Jun 9, 2026",
    date: "Jun 9, 2026",
  },
  {
    urn: "urn:li:share:7469935881093775360",
    height: 1833,
    title: "LinkedIn Post - Jun 9, 2026",
    date: "Jun 9, 2026",
  },
  {
    urn: "urn:li:share:7469344047623680001",
    height: 1195,
    title: "LinkedIn Post - Jun 7, 2026",
    date: "Jun 7, 2026",
  },
  {
    urn: "urn:li:share:7469284376804122624",
    height: 2203,
    title: "LinkedIn Post - Jun 7, 2026",
    date: "Jun 7, 2026",
  },
  {
    urn: "urn:li:share:7468299616384393216",
    height: 2413,
    title: "LinkedIn Post - Jun 4, 2026",
    date: "Jun 4, 2026",
  },
  {
    urn: "urn:li:share:7468158408316276736",
    height: 2308,
    title: "LinkedIn Post - Jun 4, 2026",
    date: "Jun 4, 2026",
  },
  {
    urn: "urn:li:share:7467215931073654784",
    height: 1980,
    title: "LinkedIn Post - Jun 2, 2026",
    date: "Jun 2, 2026",
  },
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

        <section className="mb-8 rounded-lg border bg-muted/30 p-4">
          <h2 className="text-lg font-semibold">LinkedIn knowledge sharing archive</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Embedded LinkedIn posts are shown below. If an embed is blocked by the local browser,
            privacy settings, or network restrictions, this archive still preserves the intended
            public Knowledge Sharing area and each card identifies the post date.
          </p>
          <p className="mt-3 text-sm font-medium text-muted-foreground">
            Archive status: public LinkedIn posts through 17 Jun 2026. Drafts and learning
            records are not exposed on this public page.
          </p>
        </section>

        <div className="grid gap-8">
          {linkedInPosts.map((post) => (
            <article key={post.urn} className="border rounded-lg p-4 bg-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-muted-foreground">
                  {post.date}
                </h2>
                <a
                  href={`https://www.linkedin.com/feed/update/${post.urn}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Open on LinkedIn
                </a>
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
