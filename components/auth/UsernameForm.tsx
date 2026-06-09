'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

export function UsernameForm() {
  const router  = useRouter()
  const [username, setUsername] = useState('')
  const [error, setError]       = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!username.trim()) {
      setError('Username is required')
      return
    }
    setError('')
    router.push(`/login/password?username=${encodeURIComponent(username.trim())}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      <Input
        id="username"
        label="Username"
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={e => { setUsername(e.target.value); setError('') }}
        error={error}
        autoComplete="username"
        autoFocus
      />
      <Button type="submit" variant="primary" size="lg" className="w-full" iconRight={<ArrowRight className="w-4 h-4" />}>
        Continue
      </Button>
    </form>
  )
}
