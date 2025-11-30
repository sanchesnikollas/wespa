'use client'

// ============================================
// WESPA Website - Auth Context
// Manages user authentication state
// ============================================

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'

// ============================================
// Types
// ============================================
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  company?: string
  phone?: string
  avatar?: string
  membershipType: 'flydesk' | 'owndesk' | 'officedesk'
  memberSince: string
  location: 'business' | 'lounge'
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  company?: string
  phone?: string
}

// ============================================
// Context
// ============================================
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ============================================
// Mock user for demo purposes
// ============================================
const MOCK_USER: User = {
  id: '1',
  email: 'demo@wespa.hr',
  firstName: 'John',
  lastName: 'Doe',
  company: 'Tech Startup',
  phone: '+385 1 234 5678',
  membershipType: 'owndesk',
  memberSince: '2024-01-15',
  location: 'business',
}

// ============================================
// Provider
// ============================================
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('wespa_user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo, accept any email/password
      const loggedInUser = {
        ...MOCK_USER,
        email,
        firstName: email.split('@')[0],
      }

      setUser(loggedInUser)
      localStorage.setItem('wespa_user', JSON.stringify(loggedInUser))
      router.push('/dashboard')
    } catch (error) {
      throw new Error('Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        company: data.company,
        phone: data.phone,
        membershipType: 'flydesk',
        memberSince: new Date().toISOString().split('T')[0],
        location: 'business',
      }

      setUser(newUser)
      localStorage.setItem('wespa_user', JSON.stringify(newUser))
      router.push('/dashboard')
    } catch (error) {
      throw new Error('Registration failed')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('wespa_user')
    router.push('/')
  }, [router])

  const updateProfile = useCallback(async (data: Partial<User>) => {
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem('wespa_user', JSON.stringify(updatedUser))
    } catch (error) {
      throw new Error('Profile update failed')
    } finally {
      setIsLoading(false)
    }
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ============================================
// Hook
// ============================================
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
