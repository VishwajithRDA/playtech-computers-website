"use client"

import { useEffect } from "react"
import Link from "next/link"
import { X, Trash2, ShoppingCart, ArrowRight } from "lucide-react"
import type { Product } from "../lib/catalog-data"
import { formatLKR } from "../lib/format"
import { cn } from "../lib/utils"

export interface CartLineItem {
  product: Product
  qty: number
}

export function CartDrawer({
  open,
  onClose,
  items,
  subtotal,
  onRemove,
}: {
  open: boolean
  onClose: () => void
  items: CartLineItem[]
  subtotal: number
  onRemove: (productId: string) => void
}) {
  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  const itemCount = items.reduce((sum, { qty }) => sum + qty, 0)
  const hasPricedItems = subtotal > 0
  const hasCallForPrice = items.some(({ product }) => product.priceLKR === null)

  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      {/* Scrim */}
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-background/70 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <ShoppingCart className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <h2 className="font-display text-base font-bold tracking-tight text-foreground">
                Your Cart
              </h2>
              <p className="text-xs text-muted-foreground">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Item list */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary/60 text-muted-foreground">
              <ShoppingCart className="h-7 w-7" />
            </span>
            <p className="font-display text-base font-bold text-foreground">Your cart is empty</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Add products from the catalog and they&apos;ll show up here.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
            >
              Continue browsing
            </button>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-border overflow-y-auto">
            {items.map(({ product, qty }) => (
              <li key={product.id} className="flex items-start gap-3 px-5 py-3.5">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary/40">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt=""
                    crossOrigin="anonymous"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-bold leading-snug text-foreground">
                    {product.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{product.shortSpec}</p>
                  <div className="mt-1.5 flex items-center gap-2 text-xs">
                    <span className="rounded border border-border bg-secondary/50 px-1.5 py-0.5 font-medium tabular-nums text-muted-foreground">
                      Qty {qty}
                    </span>
                    <span className="text-muted-foreground">×</span>
                    <span className="tabular-nums text-muted-foreground">
                      {product.priceLKR === null ? "Call for Price" : formatLKR(product.priceLKR)}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span className="font-display text-sm font-bold tabular-nums text-foreground">
                    {product.priceLKR === null
                      ? "—"
                      : formatLKR(product.priceLKR * qty)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemove(product.id)}
                    className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Footer / CTA */}
        {items.length > 0 && (
          <div className="border-t border-border bg-card px-5 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-muted-foreground">Subtotal</span>
              <span className="font-display text-lg font-extrabold tabular-nums text-primary">
                {hasPricedItems ? formatLKR(subtotal) : "Call for Price"}
              </span>
            </div>
            {hasCallForPrice && hasPricedItems && (
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                Subtotal excludes call-for-price items. Final quotation confirmed at checkout.
              </p>
            )}
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              Delivery calculated at checkout. All prices in Sri Lankan Rupees (LKR).
            </p>
            <Link
              href="/checkout"
              onClick={onClose}
              className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.01]"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </aside>
    </div>
  )
}
