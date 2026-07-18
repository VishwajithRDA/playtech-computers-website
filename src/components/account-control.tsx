"use client"

import { useState } from "react"
import { LogOut } from "lucide-react"
import { useAuth } from "../components/auth-provider"
import { GoogleIcon } from "../components/google-icon"
import { cn } from "../lib/utils"

/** Header account widget: Google sign-in button or signed-in avatar menu. */
export function AccountControl({ className }: { className?: string }) {
  const { user, isAuthenticated, signInWithGoogle, signOut, signingIn } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!isAuthenticated) {
    return (
      <button
        type="button"
        onClick={() => void signInWithGoogle()}
        disabled={signingIn}
        className={cn(
          "inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-foreground px-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
      >
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-background">
          <GoogleIcon className="h-4 w-4" />
        </span>
        <span className="hidden sm:inline">{signingIn ? "Signing in..." : "Sign In"}</span>
      </button>
    )
  }

  return (
    <div className={cn("relative shrink-0", className)}>
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-2 pr-3 text-sm font-medium text-foreground transition-colors hover:border-primary"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {user?.avatarInitial}
        </span>
        <span className="hidden max-w-[9rem] truncate sm:inline">{user?.name}</span>
      </button>

      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div
            role="menu"
            className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-60 overflow-hidden rounded-xl border border-border bg-popover shadow-xl"
          >
            <div className="border-b border-border px-4 py-3">
              <p className="truncate text-sm font-semibold text-foreground">{user?.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                signOut()
                setMenuOpen(false)
              }}
              className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-foreground transition-colors hover:bg-secondary"
            >
              <LogOut className="h-4 w-4 text-muted-foreground" />
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  )
}
