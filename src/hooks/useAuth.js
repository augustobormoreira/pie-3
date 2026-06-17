import { useState } from 'react'
import { findUserByCredentials, createUser } from '../data/users'

export function useAuth() {
  const [loading, setLoading] = useState(false)

  const login = async (email, password) => {
    setLoading(true)
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
    return true
  }

  return { login, register, forgotPassword, loading }
}
