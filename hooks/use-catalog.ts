"use client"

import { useMemo, useState, useCallback } from "react"
import { PRODUCTS, CATEGORIES, type Product } from "@/lib/catalog-data"

export type SortOption = "featured" | "price-asc" | "price-desc" | "name"

/**
 * Central mock-state hook for the catalog. Everything the UI needs (products,
 * filters, cart) flows through here. Swap the in-memory PRODUCTS/CATEGORIES
 * source for real database queries later without changing components.
 */
export function useCatalog() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [sort, setSort] = useState<SortOption>("featured")
  const [cart, setCart] = useState<Record<string, number>>({})

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = PRODUCTS.filter((p) => {
      const matchesCategory = !activeCategory || p.categoryId === activeCategory
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.shortSpec.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return (a.priceLKR ?? Infinity) - (b.priceLKR ?? Infinity)
        case "price-desc":
          return (b.priceLKR ?? -Infinity) - (a.priceLKR ?? -Infinity)
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return Number(b.isNew ?? false) - Number(a.isNew ?? false)
      }
    })
    return list
  }, [query, activeCategory, sort])

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => ({ ...prev, [product.id]: (prev[product.id] ?? 0) + 1 }))
  }, [])

  const cartCount = useMemo(
    () => Object.values(cart).reduce((sum, n) => sum + n, 0),
    [cart],
  )

  return {
    categories: CATEGORIES,
    products: filtered,
    totalProducts: PRODUCTS.length,
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    sort,
    setSort,
    cart,
    cartCount,
    addToCart,
  }
}
