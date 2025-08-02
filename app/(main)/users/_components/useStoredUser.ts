import { User } from '@/components/types/user'
import { useCallback, useState } from 'react'

const STORAGE_KEY = 'userDetail'

function parseStoredUser(): User | null {
  if (typeof window === 'undefined') return null

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as User
  } catch {
    console.warn('Invalid user object in localStorage, clearing it')
    window.localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function useStoredUser(): {
  storedUser: User | null
  store: (user: User) => void
  remove: () => void
} {
  const [storedUser, setStoredUser] = useState<User | null>(() =>
    parseStoredUser()
  )

  const store = useCallback((user: User) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      setStoredUser(user)
    } catch (err) {
      console.error('Failed to store user in localStorage', err)
    }
  }, [])

  const remove = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY)
    setStoredUser(null)
  }, [])

  return { storedUser, store, remove }
}
