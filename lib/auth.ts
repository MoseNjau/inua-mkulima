import type { User } from '@/types'

export async function loginUser(username: string, password: string): Promise<User> {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ username, password }),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message ?? 'Invalid credentials')
  }

  return res.json()
}
