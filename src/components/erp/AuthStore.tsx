"use client"
import { createContext, useContext, useMemo, useState } from "react"

type AuthUser = {
  name: string
  email: string
  role: string
}

type AuthState = {
  user: AuthUser | null
  error: string
  signIn: (email: string, password: string) => void
  signOut: () => void
}

const AuthContext = createContext<AuthState | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [error, setError] = useState("")

  const value = useMemo<AuthState>(() => ({
    user,
    error,
    signIn: (email, password) => {
      if (!email.trim() || !password.trim()) {
        setError("Enter a work email and password to open the demo workspace.")
        return
      }

      setUser({ name: "Mustafa Waiz", email, role: "Managing Director" })
      setError("")
    },
    signOut: () => {
      setUser(null)
      setError("")
    },
  }), [error, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}
