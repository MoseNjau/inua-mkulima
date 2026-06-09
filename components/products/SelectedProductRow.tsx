'use client'

import { Minus } from 'lucide-react'

interface SelectedProductRowProps {
  name:      string
  quantity:  number
  price:     number
  total:     number
  deduction: number
  onRemove:  () => void
}

export function SelectedProductRow({ name, quantity, price, total, deduction, onRemove }: SelectedProductRowProps) {
  return (
    <tr className="border-b border-brand-border hover:bg-green-50/30 transition-colors">
      <td className="py-3 px-3 text-xs text-brand-ink font-medium leading-snug">{name}</td>
      <td className="py-3 px-3 text-xs text-center text-brand-muted">{quantity}</td>
      <td className="py-3 px-3 text-xs text-right text-brand-muted">{price.toFixed(2)}</td>
      <td className="py-3 px-3 text-xs text-right text-brand-ink font-semibold">{total.toFixed(2)}</td>
      <td className="py-3 px-3 text-xs text-right text-brand-green font-semibold">-{deduction.toFixed(2)}</td>
      <td className="py-3 px-3 text-right">
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${name}`}
          className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-150 active:scale-95"
        >
          <Minus className="w-3 h-3" />
        </button>
      </td>
    </tr>
  )
}
