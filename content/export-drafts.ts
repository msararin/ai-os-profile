/**
 * Export Signal Studio draft packages to Markdown for review
 */

import { SignalStudioDraft } from "./signal-studio-drafts";

export function exportDraftToMarkdown(draft: SignalStudioDraft): string {
  const sections: string[] = [];

  // Header
  sections.push(`# ${draft.title}`);
  sections.push(`**Status:** ${draft.status}`);
  sections.push(`**Topic:** ${draft.topic}`);
  sections.push(`**Risk Level:** ${draft.publicRiskLevel}`);
  sections.push("");

  // Learning Summary
  sections.push(`## Learning Summary`);
  sections.push(draft.learningSummary);
  sections.push("");

  // Why It Matters
  sections.push(`## Why It Matters`);
  sections.push(draft.whyItMatters);
  sections.push("");

  // English Professional Draft
  sections.push(`## English Professional Draft (LinkedIn / Portfolio)`);
  sections.push(draft.englishProfessionalDraft);
  sections.push("");

  // Thai Casual Draft
  sections.push(`## Thai Casual Draft (Social Media)`);
  sections.push(draft.thaiCasualDraft);
  sections.push("");

  // Angles
  sections.push(`## Content Angles`);
  sections.push(`**LinkedIn Angle:** ${draft.linkedInAngle}`);
  sections.push(`**Thai Social Angle:** ${draft.thaiSocialAngle}`);
  sections.push(`**Recommended Channels:** ${draft.recommendedChannel.join(", ")}`);
  sections.push("");

  // Visual Gemini Handoff
  sections.push(`## Visual Gemini Handoff`);
  sections.push(`**Infographic Prompt:**`);
  sections.push(draft.infographicPrompt);
  sections.push("");
  sections.push(`**Visual Brief:**`);
  sections.push(draft.visualBrief);
  sections.push(`**Visual Status:** ${draft.visualStatus}`);
  sections.push("");

  // Evidence & Claims Safety
  sections.push(`## Evidence & Claims Safety`);
  sections.push(`**Evidence Note:**`);
  sections.push(draft.evidenceNote);
  sections.push("");
  sections.push(`**Public-Safe Claims:**`);
  draft.publicSafeClaim.forEach((claim) => sections.push(`- ${claim}`));
  sections.push("");
  sections.push(`**Needs Caveat:**`);
  draft.needsCaveat.forEach((item) => sections.push(`- ${item}`));
  sections.push("");
  sections.push(`**Do NOT Use:**`);
  draft.doNotUse.forEach((item) => sections.push(`- ${item}`));
  sections.push("");

  // Signal Studio Reviews
  sections.push(`## Signal Studio Reviews`);
  if (draft.signalArchitectReview) {
    sections.push(`**📐 Signal Architect:**`);
    sections.push(draft.signalArchitectReview);
    sections.push("");
  }
  if (draft.signalPublisherReview) {
    sections.push(`**✍️ Signal Publisher:**`);
    sections.push(draft.signalPublisherReview);
    sections.push("");
  }
  if (draft.evidenceReviewerReview) {
    sections.push(`**🔍 Evidence Reviewer:**`);
    sections.push(draft.evidenceReviewerReview);
    sections.push("");
  }

  // Review Feedback (if present)
  if (draft.revisionNotes || (draft.requestedChanges && draft.requestedChanges.length > 0)) {
    sections.push(`## Review Feedback`);
    if (draft.revisionNotes) {
      sections.push(`**Revision Notes:**`);
      sections.push(draft.revisionNotes);
      sections.push("");
    }
    if (draft.requestedChanges && draft.requestedChanges.length > 0) {
      sections.push(`**Requested Changes:**`);
      draft.requestedChanges.forEach((change) => sections.push(`- ${change}`));
      sections.push("");
    }
  }

  // Metadata
  sections.push(`---`);
  sections.push(`**ID:** ${draft.id}`);
  sections.push(`**Last Reviewed By:** ${draft.lastReviewedBy || "Not reviewed"}`);
  sections.push(`**Last Reviewed At:** ${draft.lastReviewedAt || "N/A"}`);
  sections.push("");
  sections.push(`*Source file: content/signal-studio-drafts.ts*`);

  return sections.join("\n");
}

export function exportAllDraftsToMarkdown(drafts: SignalStudioDraft[]): string {
  const sections: string[] = [];
  
  sections.push(`# Signal Studio Draft Content Packages`);
  sections.push(`**Total Drafts:** ${drafts.length}`);
  sections.push(`**Generated:** ${new Date().toISOString()}`);
  sections.push("");
  sections.push(`---`);
  sections.push("");

  drafts.forEach((draft, index) => {
    sections.push(exportDraftToMarkdown(draft));
    if (index < drafts.length - 1) {
      sections.push("");
      sections.push(`---`);
      sections.push("");
    }
  });

  return sections.join("\n");
}

export function downloadMarkdown(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
