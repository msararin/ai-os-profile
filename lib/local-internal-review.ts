export function isLocalInternalReviewAccessEnabled() {
  return (
    process.env.NODE_ENV === "development" &&
    process.env.LOCAL_INTERNAL_REVIEW_ACCESS === "true"
  )
}

export function getInternalAllowedEmailDiagnostics() {
  const rawAllowlist = process.env.INTERNAL_ALLOWED_EMAILS
  const emails =
    rawAllowlist
      ?.split(",")
      .map((email) => email.trim())
      .filter(Boolean) ?? []

  return {
    isLoaded: Boolean(rawAllowlist),
    count: emails.length,
  }
}

export function maskEmail(email?: string | null) {
  if (!email) {
    return "not available"
  }

  const [name, domain] = email.split("@")
  if (!name || !domain) {
    return "masked"
  }

  const visibleName = name.length <= 2 ? name[0] : `${name[0]}***${name[name.length - 1]}`
  const [domainName, ...domainRest] = domain.split(".")
  const maskedDomain = domainName
    ? `${domainName[0]}***${domainRest.length ? `.${domainRest.join(".")}` : ""}`
    : "***"

  return `${visibleName}@${maskedDomain}`
}
