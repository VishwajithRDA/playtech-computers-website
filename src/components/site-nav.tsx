"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MapPin, Clock, Phone } from "lucide-react"
import { STORE_INFO } from "../lib/catalog-data"
import { AccountControl } from "../components/account-control"
import { cn } from "../lib/utils"

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/checkout", label: "Checkout" },
] as const

/** Shared top navigation used by the About, Contact and Checkout pages. */
export function SiteNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      {/* Info strip */}
      <div className="hidden border-b border-border/60 bg-card/40 md:block">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-1.5 text-xs text-muted-foreground lg:px-6">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              {STORE_INFO.address}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-accent" />
              {STORE_INFO.hours}
            </span>
          </div>
          <a
            href={`tel:${STORE_INFO.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-primary"
          >
            <Phone className="h-3.5 w-3.5 text-accent" />
            {STORE_INFO.phone}
          </a>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-4 py-3 lg:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${STORE_INFO.name} home`}>
          <img src="/brand/playtech-icon.png" alt="" className="h-9 w-9 shrink-0 object-contain" />
          <span className="hidden leading-tight sm:block">
            <img src="/brand/playtech-logo.png" alt={STORE_INFO.name} className="h-5 w-auto object-contain" />
            <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {STORE_INFO.tagline}
            </span>
          </span>
        </Link>

        <nav className="flex flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <AccountControl />
      </div>
    </header>
  )
}

/** Shared footer used across pages. */
export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border bg-card/40">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-4 py-6 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <p className="inline-flex items-center gap-2">
          <img src="/brand/playtech-logo.png" alt={STORE_INFO.name} className="h-4 w-auto object-contain" />
          <span>— {STORE_INFO.tagline}</span>
        </p>
        <p>{STORE_INFO.address}</p>
        <p>
          {STORE_INFO.phone} · {STORE_INFO.email}
        </p>
      </div>
    </footer>
  )
}
