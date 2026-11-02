import { redirect } from "next/navigation"

export default function LegacyRuntimeAuthoritySnapshotRoute() {
  redirect("/cockpit/aios/architecture/system-health/runtime-authority-evidence")
}
