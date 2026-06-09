'use client'

import { useState, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { loginUser } from '@/lib/auth'
import { ArrowRight } from 'lucide-react'

export function PasswordForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const username     = searchParams.get('username') ?? ''
  const { login }    = useAuth()

  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')

  const loginMutation = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      loginUser(username, password),
    onSuccess: (user) => {
      login(user)
      router.push('/dashboard')
    },
    onError: (err: Error) => {
      setError(err.message || 'Invalid username or password')
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!password.trim()) {
      setError('Password is required')
      return
    }
    setError('')
    loginMutation.mutate({ username, password })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      <Input
        id="password"
        label="Password"
        showToggle
        placeholder="Enter your password"
        value={password}
        onChange={e => { setPassword(e.target.value); setError('') }}
        error={error}
        autoComplete="current-password"
        autoFocus
      />
      {loginMutation.isError && !error && (
        <p className="text-red-500 text-sm -mt-4">Invalid username or password</p>
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={loginMutation.isPending}
        iconRight={!loginMutation.isPending ? <ArrowRight className="w-4 h-4" /> : undefined}
      >
        {loginMutation.isPending ? 'Signing in…' : 'Sign In'}
      </Button>
    </form>
  )
}
