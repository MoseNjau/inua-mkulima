'use client'

import { useState, useCallback, useEffect } from 'react'
import type { Product, SelectedProduct } from '@/types'
import { getSubsidyDeduction } from '@/lib/constants'

interface UseProductSelectionReturn {
  items:          SelectedProduct[]
  addItem:        (product: Product) => void
  removeItem:     (productId: number) => void
  updateQty:      (productId: number, qty: number) => void
  totalDeduction: number
  totalAmount:    number
  clearCart:      () => void
  isHydrated:     boolean
}

export function useProductSelection(): UseProductSelectionReturn {
  // Start with empty array — hydration-safe (no sessionStorage on server)
  const [items, setItems] = useState<SelectedProduct[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Rehydrate from sessionStorage only on client after mount
  useEffect(() => {
    const stored = sessionStorage.getItem('cart')
    if (stored) {
      try { setItems(JSON.parse(stored)) } catch (_) {}
    }
    setHydrated(true)
  }, [])

  // Persist to sessionStorage whenever items change (after hydration)
  useEffect(() => {
    if (!hydrated) return
    sessionStorage.setItem('cart', JSON.stringify(items))
  }, [items, hydrated])

  const addItem = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      const deduction = getSubsidyDeduction(product.price)
      return [...prev, { product, quantity: 1, deduction }]
    })
  }, [])

  const removeItem = useCallback((productId: number) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === productId)
      if (!existing) return prev
      if (existing.quantity <= 1) return prev.filter(i => i.product.id !== productId)
      return prev.map(i =>
        i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i
      )
    })
  }, [])

  const updateQty = useCallback((productId: number, qty: number) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.product.id !== productId))
      return
    }
    setItems(prev =>
      prev.map(i => i.product.id === productId ? { ...i, quantity: qty } : i)
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    sessionStorage.removeItem('cart')
  }, [])

  const totalDeduction = items.reduce((sum, i) => sum + i.deduction * i.quantity, 0)
  const totalAmount    = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return { items, addItem, removeItem, updateQty, totalDeduction, totalAmount, clearCart, isHydrated: hydrated }
}
