'use client'

import { Plus } from 'lucide-react'

interface ProductRowProps {
  name:  string
  price: number
  onAdd: () => void
}

export function ProductRow({ name, price, onAdd }: ProductRowProps) {
  return (
    <tr className="border-b border-brand-border hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4 text-sm text-brand-ink font-medium">{name}</td>
      <td className="py-3 px-4 text-sm text-brand-muted text-right">
        KES {price.toFixed(2)}
      </td>
      <td className="py-3 px-4 text-right">
        <button
          type="button"
          onClick={onAdd}
          aria-label={`Add ${name}`}
          className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-green text-white hover:bg-green-700 transition-all duration-150 active:scale-95"
        >
          <Plus className="w-4 h-4" />
        </button>
      </td>
    </tr>
  )
}
