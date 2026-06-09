import { useQuery, keepPreviousData } from '@tanstack/react-query'
import type { ProductsResponse } from '@/types'

async function fetchProducts(skip: number, limit: number): Promise<ProductsResponse> {
  const res = await fetch(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export function useProducts(page: number, limit: number = 12) {
  const skip = (page - 1) * limit
  return useQuery({
    queryKey: ['products', page, limit],
    queryFn:  () => fetchProducts(skip, limit),
    placeholderData: keepPreviousData,
  })
}
