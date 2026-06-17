import { useState } from 'react'
import { findUserByCredentials, createUser } from '../data/users'

// Simulates async API calls to POST /api/auth/login and POST /api/auth/register
export function useAuth() {
  const [loading, setLoading] = useState(false)

  const login = async (email, password) => {
    setLoading(true)
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 400))
    setLoading(false)
    const user = findUserByCredentials(email, password)
    if (!user) throw new Error('E-mail ou senha incorretos.')
    return user
  }

  const register = async ({ name, email, password }) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    setLoading(false)
    return createUser({ name, email, password })
  }

  const forgotPassword = async (email) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    setLoading(false)
    // In production: POST /api/auth/forgot-password { email }
    return true
  }

  return { login, register, forgotPassword, loading }
}
