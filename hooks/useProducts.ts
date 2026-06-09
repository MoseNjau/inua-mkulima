import { useQuery } from '@tanstack/react-query'
import type { ProductsResponse } from '@/types'

const PRODUCTS_URL = 'https://dummyjson.com/products?limit=100'

async function fetchProducts(): Promise<ProductsResponse> {
  const res = await fetch(PRODUCTS_URL)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn:  fetchProducts,
  })
}
