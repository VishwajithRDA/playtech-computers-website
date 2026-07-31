"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

export interface AuthUser {
  name: string
  email: string
  avatarInitial: string
  pictureUrl?: string
}

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  ready: boolean
  verifyGoogleToken: (token: string) => Promise<void>
  signOut: () => void
  signingIn: boolean
}

const STORAGE_KEY = "playtech.auth.user"
const TOKEN_KEY = "playtech.auth.token"

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [ready, setReady] = useState(false)
  const [signingIn, setSigningIn] = useState(false)

  // Auto-login: Restores the persisted session on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw) as AuthUser)
    } catch {
      // Ignore malformed/unavailable storage.
    }
    setReady(true)
  }, [])

  const verifyGoogleToken = useCallback(async (token: string) => {
    setSigningIn(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/google_user_login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      const data = await res.json()

      // Ensure the backend returned a successful authentication
      if (res.ok && data.isauth) {
        // Map the specific response from your Node.js backend
        const loggedInUser: AuthUser = {
          name: data.username || "User",
          email: "", // Backend currently doesn't return email, so leave empty
          pictureUrl: data.picture_url,
          avatarInitial: data.username ? data.username.charAt(0).toUpperCase() : "U",
        }

        setUser(loggedInUser)

        // Save user profile and JWT to localStorage for auto-login
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser))
        if (data.token) {
          localStorage.setItem(TOKEN_KEY, data.token)
        }
      } else {
        console.error("Server authentication failed:", data)
      }
    } catch (error) {
      console.error("Login Error:", error)
    } finally {
      setSigningIn(false)
    }
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(TOKEN_KEY)
    } catch {
      // Ignore storage failures.
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      ready,
      verifyGoogleToken,
      signOut,
      signingIn,
    }),
    [user, ready, verifyGoogleToken, signOut, signingIn],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an <AuthProvider>")
  return ctx
}