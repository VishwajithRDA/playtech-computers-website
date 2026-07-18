"use client"

import { SearchX } from "lucide-react"
import { CATEGORIES, type Product } from "../lib/catalog-data"
import type { SortOption } from "../hooks/use-catalog"
import { ProductCard } from "../components/product-card"

const SORT_LABELS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A–Z" },
]

export function ProductGrid({
  products,
  activeCategory,
  query,
  sort,
  onSortChange,
  onOpen,
  onAddToCart,
}: {
  products: Product[]
  activeCategory: string | null
  query: string
  sort: SortOption
  onSortChange: (v: SortOption) => void
  onOpen: (p: Product) => void
  onAddToCart: (p: Product) => void
}) {
  const heading = activeCategory
    ? CATEGORIES.find((c) => c.id === activeCategory)?.name ?? "Products"
    : "All Products"

  return (
    <section className="flex-1">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground text-balance">
            {heading}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {products.length} {products.length === 1 ? "product" : "products"}
            {query && (
              <>
                {" "}
                matching <span className="text-foreground">&ldquo;{query}&rdquo;</span>
              </>
            )}
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Sort by</span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="h-9 rounded-md border border-input bg-card px-3 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
          >
            {SORT_LABELS.map((o) => (
              <option key={o.value} value={o.value} className="bg-card text-foreground">
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
          <SearchX className="h-10 w-10 text-muted-foreground" />
          <p className="mt-4 font-display text-lg font-bold text-foreground">No products found</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Try a different category or search term. Can&apos;t find what you need? Message us on
            WhatsApp and we&apos;ll source it for you.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpen} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </section>
  )
}
