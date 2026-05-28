"use client";

import { PageLayout } from "@/components/page-layout";
import { signalStudioDrafts } from "@/content/signal-studio-drafts";
import {
  exportDraftToMarkdown,
  exportAllDraftsToMarkdown,
  downloadMarkdown,
} from "@/content/export-drafts";

export default function InternalKnowledgeSharingDraftsPage() {
  const documentedRecords = signalStudioDrafts.length;
  const pendingReview = signalStudioDrafts.filter((draft) =>
    ["captured", "draft", "needs_review"].includes(draft.status)
  ).length;
  const publicSafeCandidates = signalStudioDrafts.filter(
    (draft) =>
      draft.publicRiskLevel === "low" &&
      draft.recommendedChannel.some((channel) =>
        ["linkedin", "knowledge_sharing", "thai_social"].includes(channel)
      )
  ).length;

  const handleExportDraft = (draft: typeof signalStudioDrafts[0]) => {
    const markdown = exportDraftToMarkdown(draft);
    downloadMarkdown(markdown, `${draft.id}-draft.md`);
  };

  const handleExportAll = () => {
    const markdown = exportAllDraftsToMarkdown(signalStudioDrafts);
    downloadMarkdown(markdown, `signal-studio-drafts-all.md`);
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/internal/dashboard"
            className="mb-4 inline-flex text-sm font-medium text-primary hover:underline"
          >
            Back to Internal Dashboard
          </a>
          <h1 className="text-4xl font-bold mb-4">
            Signal Studio — Draft Content Packages
          </h1>
          <p className="text-muted-foreground text-lg">
            Internal learning pipeline for AIOS lessons → reviewed public-safe content candidates
          </p>
          <p className="text-sm text-yellow-600 dark:text-yellow-500 mt-2">
            🔒 Internal only — Drafts under review
          </p>
          <p className="text-sm text-muted-foreground mt-3">
            Draft bank baseline: 2026-05-24. Review surface updated: 2026-05-28. 28 May production release learning is captured as status and pending draft migration.
          </p>
          <div className="mt-4 rounded border border-yellow-500/30 bg-yellow-50 p-3 text-sm text-yellow-900 dark:bg-yellow-950 dark:text-yellow-100">
            <strong>Current separation rule:</strong> Achievements records external proof and impact. Signal Studio captures internal learning patterns, reusable insights, and claims-safety review before anything becomes public.
          </div>
        </div>

        {/* Learning status */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm">
              <strong>Learning records identified:</strong> {signalStudioDrafts.length}
            </p>
            <button
              onClick={handleExportAll}
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              📥 Export All to Markdown
            </button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <div className="rounded bg-white/70 p-3 text-xs text-blue-950 dark:bg-black/20 dark:text-blue-100">
              <div className="font-semibold">Documented records</div>
              <div className="mt-1 text-lg font-bold">{documentedRecords}</div>
            </div>
            <div className="rounded bg-white/70 p-3 text-xs text-blue-950 dark:bg-black/20 dark:text-blue-100">
              <div className="font-semibold">Pending review</div>
              <div className="mt-1 text-lg font-bold">{pendingReview}</div>
            </div>
            <div className="rounded bg-white/70 p-3 text-xs text-blue-950 dark:bg-black/20 dark:text-blue-100">
              <div className="font-semibold">Public-safe candidates</div>
              <div className="mt-1 text-lg font-bold">{publicSafeCandidates}</div>
            </div>
            <div className="rounded bg-white/70 p-3 text-xs text-blue-950 dark:bg-black/20 dark:text-blue-100">
              <div className="font-semibold">Pending migration</div>
              <div className="mt-1 text-lg font-bold">1</div>
            </div>
          </div>
          <p className="mt-3 text-xs text-blue-900 dark:text-blue-100">
            Pending migration: convert the 28 May production release proof into reusable learning patterns after Lyn/Robert review. Markdown export controls remain internal review tooling.
          </p>
        </div>

        <div className="mb-8 rounded-lg border bg-muted/30 p-4">
          <h2 className="text-base font-semibold">End-of-day freshness habit</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>What proof was created today?</li>
            <li>What changed externally?</li>
            <li>What learning should go to Signal Studio?</li>
            <li>What is public-safe?</li>
            <li>What remains internal?</li>
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Update Achievements only for proof-backed external impact. Keep reusable patterns,
            draft angles, and unreviewed lessons in Signal Studio until claims are reviewed.
          </p>
        </div>

        {/* Draft cards */}
        {signalStudioDrafts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No draft packages yet. Phase 2 will populate content.
          </div>
        ) : (
          <div className="space-y-8">
            {signalStudioDrafts.map((draft) => (
              <article
                key={draft.id}
                className="border rounded-lg p-6 bg-card space-y-6"
              >
                {/* Title + Status */}
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-semibold flex-1">{draft.title}</h2>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded ${
                        draft.status === "draft"
                          ? "bg-gray-100 text-gray-800"
                          : draft.status === "needs_review"
                          ? "bg-yellow-100 text-yellow-800"
                          : draft.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : draft.status === "published_external"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {draft.status.replace(/_/g, " ").toUpperCase()}
                    </span>
                    <button
                      onClick={() => handleExportDraft(draft)}
                      className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded transition-colors"
                      title="Export this draft to Markdown"
                    >
                      📥
                    </button>
                  </div>
                </div>

                {/* Learning Summary */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Learning Summary
                  </h3>
                  <p className="text-sm">{draft.learningSummary}</p>
                </div>

                {/* English Professional Draft */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    🇬🇧 English (Professional / LinkedIn)
                  </h3>
                  <div className="bg-muted/30 p-4 rounded-lg text-sm whitespace-pre-wrap">
                    {draft.englishProfessionalDraft}
                  </div>
                </div>

                {/* Thai Casual Draft */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    🇹🇭 Thai (Casual / Social)
                  </h3>
                  <div className="bg-muted/30 p-4 rounded-lg text-sm whitespace-pre-wrap">
                    {draft.thaiCasualDraft}
                  </div>
                </div>

                {/* LinkedIn Angle */}
                {draft.linkedInAngle && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      LinkedIn Angle
                    </h3>
                    <p className="text-sm italic">{draft.linkedInAngle}</p>
                  </div>
                )}

                {/* Evidence Note */}
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded text-xs">
                  <strong>Evidence:</strong> {draft.evidenceNote}
                </div>

                {/* Claims Safety */}
                {(draft.needsCaveat.length > 0 || draft.doNotUse.length > 0) && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded text-xs space-y-2">
                    {draft.needsCaveat.length > 0 && (
                      <div>
                        <strong>Needs Caveat:</strong>
                        <ul className="list-disc list-inside mt-1">
                          {draft.needsCaveat.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {draft.doNotUse.length > 0 && (
                      <div>
                        <strong>Do NOT Use:</strong>
                        <ul className="list-disc list-inside mt-1">
                          {draft.doNotUse.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Signal Studio Review Layer */}
                {(draft.signalArchitectReview ||
                  draft.signalPublisherReview ||
                  draft.evidenceReviewerReview) && (
                  <div className="border-t pt-4 space-y-3">
                    <h3 className="text-sm font-medium">Signal Studio Review</h3>
                    
                    {draft.signalArchitectReview && (
                      <div className="text-xs p-3 bg-blue-50 dark:bg-blue-950 rounded">
                        <div className="font-semibold text-blue-700 dark:text-blue-400 mb-1">
                          📐 Signal Architect
                        </div>
                        <p>{draft.signalArchitectReview}</p>
                      </div>
                    )}
                    
                    {draft.signalPublisherReview && (
                      <div className="text-xs p-3 bg-green-50 dark:bg-green-950 rounded">
                        <div className="font-semibold text-green-700 dark:text-green-400 mb-1">
                          ✍️ Signal Publisher
                        </div>
                        <p>{draft.signalPublisherReview}</p>
                      </div>
                    )}
                    
                    {draft.evidenceReviewerReview && (
                      <div className="text-xs p-3 bg-purple-50 dark:bg-purple-950 rounded">
                        <div className="font-semibold text-purple-700 dark:text-purple-400 mb-1">
                          🔍 Evidence Reviewer
                        </div>
                        <p>{draft.evidenceReviewerReview}</p>
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground">
                      <strong>Review responsibilities:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-0.5">
                        <li>Signal Architect: positioning, channel fit, publishability</li>
                        <li>Signal Publisher: tone, bilingual quality, copy readiness</li>
                        <li>Evidence Reviewer: claims safety, evidence integrity, public/private boundary</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Visual Gemini Handoff */}
                {draft.infographicPrompt && (
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium mb-3 text-purple-700 dark:text-purple-400">
                      🎨 Visual Gemini Handoff
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded">
                        <div className="text-xs font-semibold mb-1">Infographic Prompt</div>
                        <p className="text-xs whitespace-pre-wrap">{draft.infographicPrompt}</p>
                      </div>
                      
                      {draft.visualBrief && (
                        <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded">
                          <div className="text-xs font-semibold mb-1">Visual Brief</div>
                          <p className="text-xs whitespace-pre-wrap">{draft.visualBrief}</p>
                        </div>
                      )}
                      
                      <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded">
                        <div className="text-xs font-semibold mb-1">Visual Status</div>
                        <span className="text-xs font-mono px-2 py-1 bg-white dark:bg-gray-900 rounded">
                          {draft.visualStatus}
                        </span>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        <strong>Handoff guidelines:</strong>
                        <ul className="list-disc list-inside mt-1 space-y-0.5">
                          <li>Target platform: LinkedIn, Thai social media</li>
                          <li>Allowed text: Keep minimal, use in image only if critical</li>
                          <li>What NOT to show: Internal metrics, private paths, unverified claims</li>
                          <li>Visual generation: Only after claims-safety passed and Lyn approval</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className="text-xs text-muted-foreground border-t pt-3">
                  <div>ID: {draft.id}</div>
                  <div>Risk Level: {draft.publicRiskLevel}</div>
                  <div>Recommended Channel: {draft.recommendedChannel.join(", ")}</div>
                  {draft.lastReviewedBy && (
                    <div>
                      Last reviewed by {draft.lastReviewedBy} at{" "}
                      {draft.lastReviewedAt}
                    </div>
                  )}
                </div>

                {/* Review Feedback */}
                {(draft.revisionNotes || (draft.requestedChanges && draft.requestedChanges.length > 0)) && (
                  <div className="border-t pt-4 space-y-3">
                    <h3 className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                      Review Feedback
                    </h3>
                    {draft.revisionNotes && (
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded text-xs">
                        <strong>Revision Notes:</strong>
                        <p className="mt-1 whitespace-pre-wrap">{draft.revisionNotes}</p>
                      </div>
                    )}
                    {draft.requestedChanges && draft.requestedChanges.length > 0 && (
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded text-xs">
                        <strong>Requested Changes:</strong>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          {draft.requestedChanges.map((change, i) => (
                            <li key={i}>{change}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground italic">
                      💡 To apply changes: Edit content/signal-studio-drafts.ts and commit via Git
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
