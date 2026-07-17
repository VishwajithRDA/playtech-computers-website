"use client"

import { MessageCircle, Star, Plus } from "lucide-react"
import { STORE_INFO, type Product } from "@/lib/catalog-data"
import { CATEGORIES } from "@/lib/catalog-data"
import { formatLKR } from "@/lib/format"
import { StockBadge } from "@/components/stock-badge"

function whatsappHref(product: Product) {
  const msg = `Hi ${STORE_INFO.name}, I'd like to inquire about the *${product.name}* (${product.shortSpec}). Is it available?`
  return `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(msg)}`
}

export function ProductCard({
  product,
  onOpen,
  onAddToCart,
}: {
  product: Product
  onOpen: (p: Product) => void
  onAddToCart: (p: Product) => void
}) {
  const category = CATEGORIES.find((c) => c.id === product.categoryId)
  const disabled = product.stock === "out-of-stock"

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-primary/50 hover:shadow-[0_0_0_1px_var(--color-primary),0_8px_30px_-12px_rgba(0,0,0,0.6)]">
      {/* Image */}
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-secondary/40 text-left"
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          crossOrigin="anonymous"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          <span className="inline-flex w-fit items-center rounded-md border border-border bg-background/80 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground backdrop-blur">
            {category?.name}
          </span>
          {product.isNew && (
            <span className="inline-flex w-fit items-center rounded-md bg-accent px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-accent-foreground">
              New
            </span>
          )}
        </div>
        <div className="absolute right-3 top-3">
          <StockBadge status={product.stock} />
        </div>
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-accent">
            {product.brand}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onOpen(product)}
          className="text-left font-display text-base font-bold leading-snug text-foreground transition-colors hover:text-primary"
        >
          {product.name}
        </button>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.shortSpec}</p>

        {/* Price */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            {product.priceLKR !== null ? (
              <>
                <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">
                  Price
                </span>
                <span className="font-display text-xl font-bold tabular-nums text-foreground">
                  {formatLKR(product.priceLKR)}
                </span>
              </>
            ) : (
              <span className="font-display text-lg font-bold text-primary">Call for Price</span>
            )}
          </div>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={disabled}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Inquire */}
        <a
          href={whatsappHref(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-3 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" />
          Inquire via WhatsApp
        </a>
      </div>
    </article>
  )
}
