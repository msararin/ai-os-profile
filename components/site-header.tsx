"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "AI Operating System", href: "/ai-operating-system" },
  { name: "Knowledge Sharing", href: "/knowledge-sharing" },
  { name: "Achievements", href: "/achievements" },
  { name: "System Health", href: "/architecture/system-health" },
  { name: "About Sararin", href: "/about" },
]

const internalNavigation = [
  { name: "Internal Access", href: "/internal/dashboard" },
  { name: "Internal: Signal Studio Drafts", href: "/internal/knowledge-sharing-drafts" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const showInternalNavigation = pathname.startsWith("/internal")

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <nav className="flex min-w-0 items-center gap-1 overflow-x-auto sm:gap-3">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded px-2 py-1 text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 sm:px-3",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
          {internalNavigation
            .filter((item) => item.href === "/internal/dashboard" || showInternalNavigation)
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded border border-yellow-500/30 bg-yellow-500/10 px-2 py-1 text-sm font-medium text-yellow-700 transition-colors hover:bg-yellow-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-1 dark:text-yellow-400 sm:px-3",
                  pathname === item.href && "bg-yellow-500/20"
                )}
              >
                {item.name}
              </Link>
            ))}
        </nav>
      </div>
    </header>
  )
}
