"use client"

import {
  Laptop,
  Monitor,
  Cpu,
  CircuitBoard,
  MemoryStick,
  HardDrive,
  Box,
  Fan,
  LayoutGrid,
  MessageCircle,
  X,
  type LucideIcon,
} from "lucide-react"
import { STORE_INFO, type Category } from "../lib/catalog-data"
import { cn } from "../lib/utils"

const ICONS: Record<string, LucideIcon> = {
  Laptop,
  Monitor,
  Cpu,
  CircuitBoard,
  MemoryStick,
  HardDrive,
  Box,
  Fan,
}

export function CategorySidebar({
  categories,
  activeCategory,
  onSelectCategory,
  totalProducts,
  open,
  onClose,
}: {
  categories: Category[]
  activeCategory: string | null
  onSelectCategory: (id: string | null) => void
  totalProducts: number
  open: boolean
  onClose: () => void
}) {
  const handleSelect = (id: string | null) => {
    onSelectCategory(id)
    onClose()
  }

  const whatsappHref = `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(
    "Hi Playtech, I'd like a custom PC build quote.",
  )}`

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 shrink-0 overflow-y-auto border-r border-border bg-sidebar p-4 transition-transform lg:sticky lg:top-[7.5rem] lg:z-0 lg:h-[calc(100vh-7.5rem)] lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-3 flex items-center justify-between lg:hidden">
          <span className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
            Categories
          </span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground"
            aria-label="Close categories"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mb-2 hidden px-2 font-display text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground lg:block">
          Browse Categories
        </p>

        <nav className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => handleSelect(null)}
            className={cn(
              "group flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
              activeCategory === null
                ? "bg-primary/15 text-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground",
            )}
          >
            <span className="flex items-center gap-3">
              <LayoutGrid className="h-4 w-4" />
              All Products
            </span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs tabular-nums",
                activeCategory === null
                  ? "bg-primary/20 text-primary"
                  : "bg-secondary text-muted-foreground",
              )}
            >
              {totalProducts}
            </span>
          </button>

          {categories.map((cat) => {
            const Icon = ICONS[cat.icon] ?? Box
            const active = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelect(cat.id)}
                className={cn(
                  "group flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground",
                )}
              >
                <span className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      active ? "text-primary" : "text-muted-foreground group-hover:text-accent",
                    )}
                  />
                  {cat.name}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs tabular-nums",
                    active ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground",
                  )}
                >
                  {cat.count}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Custom build promo */}
        <div className="mt-6 rounded-lg border border-primary/25 bg-primary/5 p-4">
          <p className="font-display text-sm font-bold text-foreground">Need a Custom Build?</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Our engineers assemble &amp; stress-test every rig in-house. Chat with us for a
            tailored quote.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>
      </aside>
    </>
  )
}
