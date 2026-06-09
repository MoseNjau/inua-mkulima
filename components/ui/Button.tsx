'use client'

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize    = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant
  size?:      ButtonSize
  isLoading?: boolean
  iconRight?: React.ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:   'bg-brand-gold text-white hover:bg-yellow-500 focus:ring-yellow-400',
  secondary: 'bg-brand-ink text-white hover:bg-gray-800 focus:ring-gray-600',
  ghost:     'bg-white text-brand-ink border border-brand-ink hover:bg-gray-50 focus:ring-gray-300',
  danger:    'bg-white text-red-600 border border-red-400 hover:bg-red-50 focus:ring-red-300',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-btn',
  lg: 'px-8 py-4 text-btn',
}

export function Button({
  variant   = 'primary',
  size      = 'md',
  isLoading = false,
  iconRight,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-bold transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
      {!isLoading && iconRight}
    </button>
  )
}
