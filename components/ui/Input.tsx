'use client'

import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import { InputHTMLAttributes, useState } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?:      string
  error?:      string
  showToggle?: boolean
}

export function Input({ label, error, showToggle, className, type, id, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const inputType = showToggle
    ? (showPassword ? 'text' : 'password')
    : type

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="text-label text-brand-muted font-semibold">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={id}
          type={inputType}
          className={cn(
            'w-full bg-transparent border-0 border-b-2 border-gray-300 py-2 px-0',
            'text-brand-ink text-body placeholder:text-gray-300',
            'focus:outline-none focus:border-brand-green transition-colors duration-200',
            error && 'border-red-500 focus:border-red-500',
            showToggle && 'pr-8',
            className,
          )}
          {...props}
        />
        {showToggle && (
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-0 text-brand-muted hover:text-brand-ink transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
