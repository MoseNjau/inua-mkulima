'use client'

import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  value:       string
  onChange:    (value: string) => void
  placeholder?: string
  className?:  string
}

export function SearchBar({ value, onChange, placeholder = 'Search products…', className }: SearchBarProps) {
  return (
    <div className={cn('relative flex items-center', className)}>
      <Search className="absolute left-3 w-5 h-5 text-brand-muted pointer-events-none" />
      <input
        id="product-search"
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className={cn(
          'w-full pl-10 pr-10 py-2.5 rounded-lg border border-brand-border bg-white',
          'text-brand-ink text-sm placeholder:text-gray-400',
          'focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-green-100 transition-all duration-200',
        )}
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange('')}
          className="absolute right-3 text-brand-muted hover:text-brand-ink transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
