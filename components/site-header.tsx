"use client"

import Link from "next/link"
import { Search, ShoppingCart, MapPin, Phone, Clock, ChevronDown, Menu } from "lucide-react"
import { STORE_INFO, type Category } from "@/lib/catalog-data"
import { AccountControl } from "@/components/account-control"
import { NAV_LINKS } from "@/components/site-nav"
import { cn } from "@/lib/utils"

export function SiteHeader({
  query,
  onQueryChange,
  cartCount,
  categories,
  activeCategory,
  onSelectCategory,
  onToggleSidebar,
  onOpenCart,
}: {
  query: string
  onQueryChange: (v: string) => void
  cartCount: number
  categories: Category[]
  activeCategory: string | null
  onSelectCategory: (id: string | null) => void
  onToggleSidebar: () => void
  onOpenCart: () => void
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      {/* Contact / info row */}
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
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <span className="h-3.5 w-px bg-border" aria-hidden="true" />
            <a
              href={`tel:${STORE_INFO.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-primary"
            >
              <Phone className="h-3.5 w-3.5 text-accent" />
              {STORE_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-3 lg:px-6">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
          aria-label="Toggle categories"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${STORE_INFO.name} home`}>
          <img
            src="/brand/playtech-icon.png"
            alt=""
            className="h-9 w-9 shrink-0 object-contain"
          />
          <span className="hidden leading-tight sm:block">
            <img
              src="/brand/playtech-logo.png"
              alt={STORE_INFO.name}
              className="h-5 w-auto object-contain"
            />
            <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {STORE_INFO.tagline}
            </span>
          </span>
        </a>

        {/* Search */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search laptops, processors, brands..."
            className="h-11 w-full rounded-lg border border-input bg-card pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30"
            aria-label="Search products"
          />
        </div>

        {/* Cart */}
        <button
          type="button"
          onClick={onOpenCart}
          className="relative inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label={`Shopping cart, ${cartCount} items`}
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="hidden sm:inline">Cart</span>
          <span
            className={cn(
              "absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground transition-transform",
              cartCount === 0 && "scale-0",
            )}
          >
            {cartCount}
          </span>
        </button>

        <AccountControl />
      </div>

      {/* Category dropdown map row */}
      <nav className="border-t border-border/60 bg-card/30">
        <div className="mx-auto flex max-w-[1600px] items-center gap-1 overflow-x-auto px-4 py-1.5 lg:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-1 md:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <span className="mx-1 h-4 w-px shrink-0 bg-border" aria-hidden="true" />
          </div>
          <button
            type="button"
            onClick={() => onSelectCategory(null)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              activeCategory === null
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <ChevronDown className="h-4 w-4" />
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                activeCategory === cat.id
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </nav>
    </header>
  )
}
