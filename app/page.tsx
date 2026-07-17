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
import { CartDrawer } from "@/components/cart-drawer"

export default function Page() {
  const catalog = useCatalog()
  const [selected, setSelected] = useState<Product | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

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
        onOpenCart={() => setCartOpen(true)}
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
          <div className="relative mb-6 overflow-hidden rounded-xl border border-border bg-card">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(60% 120% at 85% 0%, color-mix(in oklch, var(--primary) 30%, transparent) 0%, transparent 60%)",
              }}
              aria-hidden="true"
            />
            <div className="relative flex flex-col gap-5 p-6 sm:p-10">
              <span className="w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                {STORE_INFO.tagline}
              </span>
              <div className="flex flex-col gap-2">
                <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground text-balance sm:text-6xl">
                  {STORE_INFO.name}
                </h1>
                <p className="font-display text-lg font-semibold tracking-tight text-primary sm:text-2xl">
                  {STORE_INFO.tagline}
                </p>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                From flagship processors to complete custom builds — every product carries full
                agent warranty with island-wide delivery from {STORE_INFO.name}.
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <a
                  href="#catalog"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02]"
                >
                  Shop the Catalog
                </a>
                <a
                  href="/about"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  Why Playtech
                </a>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm">
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

          <section id="catalog" className="scroll-mt-28">
            <ProductGrid
              products={catalog.products}
              activeCategory={catalog.activeCategory}
              query={catalog.query}
              sort={catalog.sort}
              onSortChange={catalog.setSort}
              onOpen={setSelected}
              onAddToCart={catalog.addToCart}
            />
          </section>
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

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={catalog.cartItems}
        subtotal={catalog.cartSubtotal}
        onRemove={catalog.removeFromCart}
      />
    </div>
  )
}
