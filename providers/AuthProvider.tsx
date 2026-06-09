'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@/types'

interface AuthContextValue {
  user: User | null
  token: string | null
  login: (userData: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('auth_user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const login = useCallback((userData: User) => {
    setUser(userData)
    sessionStorage.setItem('auth_user', JSON.stringify(userData))
    sessionStorage.setItem('auth_token', userData.token)
    // Set cookie for middleware
    document.cookie = `auth_token=${userData.token}; path=/; samesite=lax`
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    sessionStorage.removeItem('auth_user')
    sessionStorage.removeItem('auth_token')
    sessionStorage.removeItem('cart')
    // Clear cookie
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/login')
  }, [router])

  return (
    <AuthContext.Provider value={{
      user,
      token: user?.token ?? null,
      login,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
