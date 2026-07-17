"use client"

import { useEffect, useState } from "react"
import { X, ShieldCheck, Truck, Tag } from "lucide-react"
import { STORE_INFO } from "@/lib/catalog-data"
import { useAuth } from "@/components/auth-provider"
import { GoogleIcon } from "@/components/google-icon"

/**
 * Global, dismissible sign-in prompt. Renders on top of any page for anonymous
 * visitors shortly after load. It never blocks browsing — the user can close it
 * and keep exploring the catalog.
 */
export function AuthModal() {
  const { isAuthenticated, ready, signInWithGoogle, signingIn } = useAuth()
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Gently invite anonymous visitors after the session state is known.
  useEffect(() => {
    if (!ready || isAuthenticated || dismissed) return
    const t = setTimeout(() => setOpen(true), 1200)
    return () => clearTimeout(t)
  }, [ready, isAuthenticated, dismissed])

  // Close automatically once the visitor signs in.
  useEffect(() => {
    if (isAuthenticated) setOpen(false)
  }, [isAuthenticated])

  // Lock background scroll while open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  const close = () => {
    setOpen(false)
    setDismissed(true)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Dismiss sign-in prompt"
        onClick={close}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />

      {/* Panel */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col gap-5 p-6 sm:p-8">
          <div className="flex flex-col gap-2">
            <span className="w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">
              {STORE_INFO.name} Account
            </span>
            <h2
              id="auth-modal-title"
              className="font-display text-2xl font-bold leading-tight tracking-tight text-foreground text-balance"
            >
              Sign in for a faster, smarter build.
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Save quotations, track your custom builds and check out in seconds. It only takes a
              moment with your Google account.
            </p>
          </div>

          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-center gap-3 text-muted-foreground">
              <Tag className="h-4 w-4 shrink-0 text-accent" />
              Save carts and request quotations instantly.
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <ShieldCheck className="h-4 w-4 shrink-0 text-accent" />
              Faster warranty registration on genuine hardware.
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <Truck className="h-4 w-4 shrink-0 text-accent" />
              Track island-wide delivery on your orders.
            </li>
          </ul>

          <button
            type="button"
            onClick={() => void signInWithGoogle()}
            disabled={signingIn}
            className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-foreground px-4 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {signingIn ? (
              "Signing in..."
            ) : (
              <>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-background">
                  <GoogleIcon />
                </span>
                Sign in with Google
              </>
            )}
          </button>

          <button
            type="button"
            onClick={close}
            className="text-center text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Continue browsing as a guest
          </button>
        </div>
      </div>
    </div>
  )
}
