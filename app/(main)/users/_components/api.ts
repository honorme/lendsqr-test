import { API_URL } from '@/components/constants'
import { User } from '@/components/types/user'
import { useQuery } from '@tanstack/react-query'

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch(API_URL)
  if (!res.ok) {
    throw new Error(`Network error: ${res.status}`)
  }
  return res.json()
}

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    retry: 2,
  })
}
