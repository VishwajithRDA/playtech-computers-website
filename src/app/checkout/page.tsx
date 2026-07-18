"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { CheckCircle2, ShieldCheck, Lock, PartyPopper } from "lucide-react"
import { PRODUCTS, STORE_INFO } from "../../lib/catalog-data"
import { formatLKR } from "../../lib/format"
import { SiteNav, SiteFooter } from "../../components/site-nav"
import { useAuth } from "../../components/auth-provider"
import { GoogleIcon } from "../../components/google-icon"

// Demo order — in a real app these line items would come from the shared cart.
const ORDER_ITEMS = [
  { product: PRODUCTS.find((p) => p.id === "desk-playtech-titan")!, qty: 1 },
  { product: PRODUCTS.find((p) => p.id === "ram-tridentz-32")!, qty: 2 },
  { product: PRODUCTS.find((p) => p.id === "ssd-990pro-2tb")!, qty: 1 },
].filter((item) => item.product && item.product.priceLKR !== null)

const DELIVERY_FEE = 2500

export default function CheckoutPage() {
  const { isAuthenticated, user, signInWithGoogle, signingIn } = useAuth()
  const [confirmed, setConfirmed] = useState(false)

  const { subtotal, total } = useMemo(() => {
    const subtotal = ORDER_ITEMS.reduce(
      (sum, item) => sum + (item.product.priceLKR ?? 0) * item.qty,
      0,
    )
    return { subtotal, total: subtotal + DELIVERY_FEE }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <main className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
        <section className="flex flex-col gap-2">
          <span className="w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">
            Checkout
          </span>
          <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground text-balance sm:text-4xl">
            Review &amp; confirm your order
          </h1>
          <p className="text-sm text-muted-foreground">
            All prices are shown in Sri Lankan Rupees (LKR) inclusive of applicable taxes.
          </p>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Order summary */}
          <section className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-6 py-4">
              <h2 className="font-display text-lg font-bold tracking-tight text-foreground">
                Order Summary
              </h2>
            </div>

            <ul className="divide-y divide-border">
              {ORDER_ITEMS.map(({ product, qty }) => (
                <li key={product.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary/40">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      crossOrigin="anonymous"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-bold text-foreground">
                      {product.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">{product.shortSpec}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Qty: {qty} × {formatLKR(product.priceLKR ?? 0)}
                    </p>
                  </div>
                  <p className="shrink-0 font-display text-sm font-bold tabular-nums text-foreground">
                    {formatLKR((product.priceLKR ?? 0) * qty)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2 border-t border-border px-6 py-4 text-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="tabular-nums text-foreground">{formatLKR(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Island-wide Delivery</span>
                <span className="tabular-nums text-foreground">{formatLKR(DELIVERY_FEE)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
                <span className="font-display text-base font-bold text-foreground">Total</span>
                <span className="font-display text-xl font-extrabold tabular-nums text-primary">
                  {formatLKR(total)}
                </span>
              </div>
            </div>
          </section>

          {/* Auth-gated action panel */}
          <aside className="flex flex-col gap-4">
            {confirmed ? (
              <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <PartyPopper className="h-7 w-7" />
                </span>
                <h2 className="font-display text-lg font-bold text-foreground">
                  Quotation requested!
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Thanks {user?.name}. Our team will email your confirmed quotation to{" "}
                  <span className="font-medium text-foreground">{user?.email}</span> shortly.
                </p>
                <Link
                  href="/#catalog"
                  className="mt-1 text-sm font-medium text-primary transition-opacity hover:opacity-80"
                >
                  Continue shopping
                </Link>
              </div>
            ) : isAuthenticated ? (
              <>
                {/* Authenticated success chip */}
                <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                  <p className="text-sm font-medium text-green-400">
                    Authenticated as: {user?.email}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="font-display text-base font-bold text-foreground">
                    Confirm your request
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    We&apos;ll prepare a formal quotation with current stock and delivery timelines
                    for your review — no payment is taken now.
                  </p>
                  <button
                    type="button"
                    onClick={() => setConfirmed(true)}
                    className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.01]"
                  >
                    Confirm Order &amp; Request Quotation
                  </button>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                    Backed by genuine agent warranty
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Unauthenticated sign-in gate */}
                <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-4 py-3">
                  <Lock className="h-5 w-5 shrink-0 text-muted-foreground" />
                  <p className="text-sm font-medium text-muted-foreground">
                    Sign in to complete your checkout
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 text-center">
                  <h2 className="font-display text-base font-bold text-foreground">
                    Verify it&apos;s you
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    For your security, please sign in with Google before we finalize your order and
                    quotation request.
                  </p>
                  <button
                    type="button"
                    onClick={() => void signInWithGoogle()}
                    disabled={signingIn}
                    className="mt-4 inline-flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-foreground px-4 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {signingIn ? (
                      "Signing in..."
                    ) : (
                      <>
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-background">
                          <GoogleIcon />
                        </span>
                        Sign In with Google
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-xs text-muted-foreground">
                    We never post anything or share your details.
                  </p>
                </div>
              </>
            )}
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
