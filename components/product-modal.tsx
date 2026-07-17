"use client"

import { useEffect } from "react"
import { X, MessageCircle, Star, ShieldCheck, MapPin, Plus } from "lucide-react"
import { STORE_INFO, CATEGORIES, type Product } from "@/lib/catalog-data"
import { formatLKR } from "@/lib/format"
import { StockBadge } from "@/components/stock-badge"

function whatsappHref(product: Product) {
  const msg = `Hi ${STORE_INFO.name}, I'd like to inquire about the *${product.name}* (${product.shortSpec}). Is it available?`
  return `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(msg)}`
}

export function ProductModal({
  product,
  onClose,
  onAddToCart,
}: {
  product: Product | null
  onClose: () => void
  onAddToCart: (p: Product) => void
}) {
  useEffect(() => {
    if (!product) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [product, onClose])

  if (!product) return null

  const category = CATEGORIES.find((c) => c.id === product.categoryId)
  const disabled = product.stock === "out-of-stock"

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl border border-border bg-card sm:rounded-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid gap-0 overflow-y-auto md:grid-cols-2">
          {/* Image */}
          <div className="relative flex items-center justify-center bg-secondary/40 p-6">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              crossOrigin="anonymous"
              className="h-full max-h-72 w-full object-contain md:max-h-none"
            />
            <div className="absolute left-4 top-4">
              <StockBadge status={product.stock} />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col p-6">
            <div className="mb-1 flex items-center gap-2 text-xs">
              <span className="rounded-md border border-border px-2 py-0.5 font-medium uppercase tracking-wide text-muted-foreground">
                {category?.name}
              </span>
              <span className="font-medium uppercase tracking-wide text-accent">
                {product.brand}
              </span>
              <span className="ml-auto inline-flex items-center gap-1 text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                {product.rating.toFixed(1)}
              </span>
            </div>

            <h2
              id="product-modal-title"
              className="font-display text-2xl font-bold leading-tight text-foreground text-balance"
            >
              {product.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-4">
              {product.priceLKR !== null ? (
                <span className="font-display text-3xl font-bold tabular-nums text-foreground">
                  {formatLKR(product.priceLKR)}
                </span>
              ) : (
                <span className="font-display text-2xl font-bold text-primary">
                  Call for Price
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <a
                href={whatsappHref(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" />
                Inquire via WhatsApp
              </a>
              <button
                type="button"
                onClick={() => onAddToCart(product)}
                disabled={disabled}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Lower detail sections */}
        <div className="grid gap-px overflow-y-auto border-t border-border bg-border md:grid-cols-2">
          {/* Specs */}
          <div className="bg-card p-6">
            <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-foreground">
              Specifications
            </h3>
            <dl className="divide-y divide-border/60">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex items-start justify-between gap-4 py-2">
                  <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                  <dd className="text-right text-sm font-medium text-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Warranty + locations */}
          <div className="bg-card p-6">
            <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-foreground">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Warranty
            </h3>
            <p className="rounded-md border border-border bg-secondary/40 p-3 text-sm text-muted-foreground">
              {product.warranty}
            </p>

            <h3 className="mb-3 mt-5 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-foreground">
              <MapPin className="h-4 w-4 text-accent" />
              Stock Locations
            </h3>
            <ul className="flex flex-col gap-2">
              {product.locations.map((loc) => (
                <li
                  key={loc.branch}
                  className="flex items-center justify-between rounded-md border border-border bg-secondary/30 px-3 py-2 text-sm"
                >
                  <span className="text-foreground">{loc.branch}</span>
                  <span
                    className={
                      loc.quantity > 0
                        ? "font-semibold text-accent"
                        : "font-medium text-destructive"
                    }
                  >
                    {loc.quantity > 0 ? `${loc.quantity} in stock` : "Unavailable"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
