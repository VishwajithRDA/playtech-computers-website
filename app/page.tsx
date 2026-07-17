"use client"

import { useState } from "react"
import { Truck, ShieldCheck, Headset } from "lucide-react"
import { useCatalog } from "@/hooks/use-catalog"
import type { Product } from "@/lib/catalog-data"
import { STORE_INFO } from "@/lib/catalog-data"
import { SiteHeader } from "@/components/site-header"
import { CategorySidebar } from "@/components/category-sidebar"
import { ProductGrid } from "@/components/product-grid"
import { ProductModal } from "@/components/product-modal"

export default function Page() {
  const catalog = useCatalog()
  const [selected, setSelected] = useState<Product | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        query={catalog.query}
        onQueryChange={catalog.setQuery}
        cartCount={catalog.cartCount}
        categories={catalog.categories}
        activeCategory={catalog.activeCategory}
        onSelectCategory={catalog.setActiveCategory}
        onToggleSidebar={() => setSidebarOpen(true)}
      />

      <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-6 lg:px-6">
        <CategorySidebar
          categories={catalog.categories}
          activeCategory={catalog.activeCategory}
          onSelectCategory={catalog.setActiveCategory}
          totalProducts={catalog.totalProducts}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="min-w-0 flex-1">
          {/* Hero band */}
          <div className="mb-6 overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex flex-col gap-4 p-6 sm:p-8">
              <span className="w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                {STORE_INFO.tagline}
              </span>
              <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground text-balance sm:text-4xl">
                Genuine PC Parts &amp; Systems, Priced in LKR.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                From flagship processors to complete custom builds — every product carries full
                agent warranty with island-wide delivery from {STORE_INFO.name}.
              </p>
              <div className="mt-1 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <Truck className="h-4 w-4 text-accent" /> Island-wide Delivery
                </span>
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-accent" /> Genuine Agent Warranty
                </span>
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <Headset className="h-4 w-4 text-accent" /> Expert Build Advice
                </span>
              </div>
            </div>
          </div>

          <ProductGrid
            products={catalog.products}
            activeCategory={catalog.activeCategory}
            query={catalog.query}
            sort={catalog.sort}
            onSortChange={catalog.setSort}
            onOpen={setSelected}
            onAddToCart={catalog.addToCart}
          />
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-8 border-t border-border bg-card/40">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-4 py-6 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <p className="inline-flex items-center gap-2">
            <img
              src="/brand/playtech-logo.png"
              alt={STORE_INFO.name}
              className="h-4 w-auto object-contain"
            />
            <span>— {STORE_INFO.tagline}</span>
          </p>
          <p>{STORE_INFO.address}</p>
          <p>
            {STORE_INFO.phone} · {STORE_INFO.email}
          </p>
        </div>
      </footer>

      <ProductModal
        product={selected}
        onClose={() => setSelected(null)}
        onAddToCart={catalog.addToCart}
      />
    </div>
  )
}
