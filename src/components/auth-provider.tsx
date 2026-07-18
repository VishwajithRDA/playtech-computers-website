"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

/**
 * Lightweight mock authentication.
 *
 * This simulates a Google OAuth session entirely on the client so the catalog
 * can demonstrate auth-gated flows (e.g. checkout) without a backend. The shape
 * of `AuthUser` mirrors what a real OAuth provider would return, so this can be
 * swapped for a real auth integration later without touching the UI.
 */
export interface AuthUser {
  name: string
  email: string
  avatarInitial: string
}

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  /** True until the persisted session has been read on mount. */
  ready: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => void
  /** Whether an async sign-in is currently in flight. */
  signingIn: boolean
}

const STORAGE_KEY = "playtech.auth.user"
const MOCK_USER: AuthUser = {
  name: "Nimal Perera",
  email: "customer@email.com",
  avatarInitial: "N",
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [ready, setReady] = useState(false)
  const [signingIn, setSigningIn] = useState(false)

  // Restore any persisted mock session on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw) as AuthUser)
    } catch {
      // Ignore malformed/unavailable storage.
    }
    setReady(true)
  }, [])

  const signInWithGoogle = useCallback(async () => {
    setSigningIn(true)
    // Simulate the round-trip of an OAuth popup handshake.
    await new Promise((resolve) => setTimeout(resolve, 900))
    setUser(MOCK_USER)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_USER))
    } catch {
      // Ignore storage write failures.
    }
    setSigningIn(false)
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore storage failures.
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      ready,
      signInWithGoogle,
      signOut,
      signingIn,
    }),
    [user, ready, signInWithGoogle, signOut, signingIn],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an <AuthProvider>")
  return ctx
}
