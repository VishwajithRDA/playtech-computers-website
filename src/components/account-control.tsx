"use client"

import { useState } from "react"
import { LogOut } from "lucide-react"
import { GoogleLogin } from "@react-oauth/google"
import { useAuth } from "../components/auth-provider"
import { cn } from "../lib/utils"

export function AccountControl({ className }: { className?: string }) {
  const { user, isAuthenticated, verifyGoogleToken, signOut, signingIn } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!isAuthenticated) {
    return (
      <div className={cn("shrink-0 items-center overflow-hidden rounded-lg", className)}>
        {signingIn ? (
          <span className="inline-flex h-11 items-center justify-center px-4 rounded-lg bg-foreground text-sm font-semibold text-background opacity-60">
            Signing in...
          </span>
        ) : (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                void verifyGoogleToken(credentialResponse.credential)
              }
            }}
            onError={() => {
              console.error('Google Login Failed')
            }}
            type="standard"
            theme="filled_black"
            shape="rectangular"
          />
        )}
      </div>
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
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground overflow-hidden">
          {user?.pictureUrl ? (
            <img src={user.pictureUrl} alt={user.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            user?.avatarInitial
          )}
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
              {/* Optional: Only render email if it exists */}
              {user?.email && <p className="truncate text-xs text-muted-foreground">{user.email}</p>}
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