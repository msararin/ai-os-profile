import { PageLayout } from "@/components/page-layout"

export default function KnowledgeSharingPage() {
  const linkedInPosts = [
    {
      urn: "urn:li:share:7463991112739827712",
      height: 1825,
      title: "LinkedIn Post 1"
    },
    {
      urn: "urn:li:share:7463988818816229376",
      height: 1468,
      title: "LinkedIn Post 2"
    },
    {
      urn: "urn:li:share:7463986941903118337",
      height: 1497,
      title: "LinkedIn Post 3"
    },
    {
      urn: "urn:li:share:7463096505944461312",
      height: 1573,
      title: "LinkedIn Post 4"
    },
    {
      urn: "urn:li:share:7461728358209339392",
      height: 1993,
      title: "LinkedIn Post 5"
    },
    {
      urn: "urn:li:share:7461722849179975680",
      height: 2182,
      title: "LinkedIn Post 6"
    },
    {
      urn: "urn:li:share:7461716842416361472",
      height: 2518,
      title: "LinkedIn Post 7"
    },
    {
      urn: "urn:li:share:7460177481652699136",
      height: 2161,
      title: "LinkedIn Post 8"
    },
    {
      urn: "urn:li:share:7459959526771838976",
      height: 873,
      title: "LinkedIn Post 9"
    }
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Knowledge Sharing</h1>
          <p className="text-muted-foreground text-lg">
            Insights, learnings, and thoughts shared on LinkedIn
          </p>
        </div>

        <div className="grid gap-8">
          {linkedInPosts.map((post, index) => (
            <div key={post.urn} className="border rounded-lg p-4 bg-card">
              <h2 className="text-xl font-semibold mb-4">
                Post {index + 1}
              </h2>
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
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
