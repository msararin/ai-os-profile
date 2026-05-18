"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ViewToggle } from "./view-toggle"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Architecture", href: "/architecture" },
  { name: "LVT", href: "/lean-value-tree" },
  { name: "Principles", href: "/principles" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1 sm:gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-2 py-1 text-sm font-medium transition-colors hover:text-primary sm:px-3",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <ViewToggle prominent={pathname === "/"} />
      </div>
    </header>
  )
}
