export function enhanceExperiment3DefaultView(scope: HTMLElement) {
  const trail = scope.querySelector<HTMLDetailsElement>("[data-experiment3-investigation-trail]")
  if (trail && trail.dataset.defaultOpenApplied !== "true") {
    trail.open = true
    trail.dataset.defaultOpenApplied = "true"
  }
}
