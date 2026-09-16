"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "LLM & Agent Systems", href: "/ai-operating-system" },
  { name: "ML & Decision Systems", href: "/machine-learning-decision-systems" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "How I Work", href: "/how-we-build" },
  { name: "Knowledge & Insights", href: "/knowledge-sharing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <nav className="flex min-w-0 items-center gap-1 overflow-x-auto sm:gap-3">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 whitespace-nowrap rounded px-2 py-1 text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 sm:px-3",
                pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`))
                  ? "text-primary"
                  : "text-muted-foreground"
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
