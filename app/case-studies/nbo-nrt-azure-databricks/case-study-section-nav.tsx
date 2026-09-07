import { cn } from "@/lib/utils"

const sections = [
  { id: "case-study-overview", label: "Overview" },
  { id: "governance-runtime-proof", label: "Runtime proof" },
  { id: "cockpit-lenses", label: "Review lenses" },
  { id: "business-decisions", label: "Business & Decisions" },
  { id: "models-experiments", label: "Models & Experiments" },
  { id: "engineering-evidence", label: "Engineering & Evidence" },
  { id: "legacy-experiment-evidence", label: "Experiment evidence" },
]

const baseLinkClass =
  "block rounded border-l-2 px-2 py-2 text-sm leading-5 transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
const activeLinkClass = "border-primary bg-muted font-semibold text-primary"
const inactiveLinkClass = "border-transparent text-muted-foreground"

const scrollSpyScript = `
(() => {
  const nav = document.querySelector("[data-case-study-section-nav]");
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll("[data-section-link]"));
  const updateActiveSection = () => {
    const readingLine = window.scrollY + window.innerHeight * 0.35;
    let activeId = links[0]?.getAttribute("href")?.slice(1);

    for (const link of links) {
      const sectionId = link.getAttribute("href")?.slice(1);
      const section = sectionId ? document.getElementById(sectionId) : null;
      if (!section) continue;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      if (sectionTop <= readingLine) activeId = sectionId;
    }

    for (const link of links) {
      const isActive = link.getAttribute("href") === "#" + activeId;
      link.className = [link.dataset.baseClass, isActive ? link.dataset.activeClass : link.dataset.inactiveClass].join(" ");
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  };

  updateActiveSection();
  requestAnimationFrame(updateActiveSection);
  window.addEventListener("load", updateActiveSection);
  window.addEventListener("scroll", updateActiveSection, { passive: true });
  window.addEventListener("resize", updateActiveSection);
  window.addEventListener("hashchange", updateActiveSection);
})();
`

export function CaseStudySectionNav() {
  return (
    <>
      <nav
        aria-label="Case study sections"
        data-case-study-section-nav
        className="hidden xl:fixed xl:left-6 xl:top-24 xl:z-40 xl:block xl:w-56"
      >
        <div className="rounded-lg border border-border bg-background/95 p-3 shadow-sm backdrop-blur">
          <p className="px-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            On this page
          </p>
          <div className="mt-3 space-y-1">
            {sections.map((section, index) => {
              const isActive = index === 0

              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={isActive ? "location" : undefined}
                  data-section-link
                  data-base-class={baseLinkClass}
                  data-active-class={activeLinkClass}
                  data-inactive-class={inactiveLinkClass}
                  className={cn(baseLinkClass, isActive ? activeLinkClass : inactiveLinkClass)}
                >
                  {section.label}
                </a>
              )
            })}
          </div>
        </div>
      </nav>
      <script dangerouslySetInnerHTML={{ __html: scrollSpyScript }} />
    </>
  )
}
