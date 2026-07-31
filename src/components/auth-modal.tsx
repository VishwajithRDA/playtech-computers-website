"use client"

import { useEffect, useState } from "react"
import { X, ShieldCheck, Truck, Tag } from "lucide-react"
import { GoogleLogin } from "@react-oauth/google"
import { STORE_INFO } from "../lib/catalog-data"
import { useAuth } from "../components/auth-provider"

export function AuthModal() {
  const { isAuthenticated, ready, verifyGoogleToken, signingIn } = useAuth()
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!ready || isAuthenticated || dismissed) return
    const t = setTimeout(() => setOpen(true), 1200)
    return () => clearTimeout(t)
  }, [ready, isAuthenticated, dismissed])

  useEffect(() => {
    if (isAuthenticated) setOpen(false)
  }, [isAuthenticated])

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
      <button
        type="button"
        aria-label="Dismiss sign-in prompt"
        onClick={close}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />

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

          {signingIn ? (
            <div className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-foreground text-sm font-semibold text-background opacity-60">
              Authenticating...
            </div>
          ) : (
            <div className="flex w-full justify-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  if (credentialResponse.credential) {
                    void verifyGoogleToken(credentialResponse.credential)
                  }
                }}
                onError={() => console.error("Google Login Failed")}
                size="large"
                width="100%"
                theme="filled_black"
              />
            </div>
          )}

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