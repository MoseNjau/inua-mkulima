'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchBar } from '@/components/dashboard/SearchBar'
import { ProductCard, ProductCardSkeleton } from '@/components/products/ProductCard'
import { useProducts } from '@/hooks/useProducts'
import { useProductSelection } from '@/hooks/useProductSelection'
import { SuccessModal } from '@/components/receipt/SuccessModal'
import { Search, AlertCircle, ShoppingBasket, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Product, TransactionReceipt } from '@/types'

// Must be wrapped in Suspense because it uses useSearchParams
function DashboardInner() {
  const router              = useRouter()
  const searchParams        = useSearchParams()
  const [query, setQuery]   = useState('')
  const [page, setPage]     = useState(1)
  const [receipt, setReceipt] = useState<TransactionReceipt | null>(null)

  const LIMIT = 12
  const { data, isLoading, isError, refetch, isPlaceholderData } = useProducts(page, LIMIT)
  const { clearCart } = useProductSelection()

  // Detect ?payment=success → load receipt from sessionStorage and show modal
  useEffect(() => {
    if (searchParams.get('payment') === 'success') {
      const stored = sessionStorage.getItem('pending_receipt')
      if (stored) {
        try { setReceipt(JSON.parse(stored)) } catch (_) {}
      }
      // Clean URL without reload
      window.history.replaceState({}, '', '/dashboard')
    }
  }, [searchParams])

  const handleDone = () => {
    clearCart()
    sessionStorage.removeItem('pending_receipt')
    setReceipt(null)
    router.push('/dashboard')
  }

  const filtered = data?.products.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase())
  ) ?? []

  const handleProductClick = (product: Product) => {
    sessionStorage.setItem('selected_product_id', String(product.id))
    router.push('/dashboard/products')
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Header row */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-brand-ink">Product Catalogue</h2>
            <p className="text-sm text-brand-muted">Browse approved subsidy products</p>
          </div>
          <SearchBar value={query} onChange={setQuery} className="w-full max-w-sm" />
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 12 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        )}

        {/* Error state */}
        {isError && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <AlertCircle className="w-12 h-12 text-red-400" />
            <p className="text-brand-muted text-sm">Failed to load products</p>
            <button
              id="retry-products-btn"
              onClick={() => refetch()}
              className="px-4 py-2 text-white rounded-md text-sm font-semibold hover:bg-green-700 transition-colors"
              style={{ background: '#009438' }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty search state */}
        {!isLoading && !isError && filtered.length === 0 && query && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-brand-muted">
            <Search className="w-12 h-12 opacity-40" />
            <p className="text-base font-semibold">No products found for &quot;{query}&quot;</p>
            <p className="text-sm">Try a different search term</p>
          </div>
        )}

        {/* Product grid */}
        {!isLoading && !isError && filtered.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
            
            {/* Pagination and Footer Actions */}
            <div className="flex items-center justify-between text-xs text-brand-muted pb-4">
              <div className="flex items-center gap-6">
                <span>{filtered.length} products on page{query ? ` matching "${query}"` : ''}</span>
                
                {/* Pagination Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1 || isPlaceholderData}
                    className="p-1 rounded border border-gray-200 bg-white disabled:opacity-40 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-semibold" style={{ color: '#272935' }}>
                    Page {page} of {Math.ceil((data?.total ?? 0) / LIMIT) || 1}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(Math.ceil((data?.total ?? 0) / LIMIT), p + 1))}
                    disabled={page >= Math.ceil((data?.total ?? 0) / LIMIT) || isPlaceholderData}
                    className="p-1 rounded border border-gray-200 bg-white disabled:opacity-40 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Success modal — true overlay on the dashboard ── */}
      {receipt && (
        <SuccessModal receipt={receipt} onDone={handleDone} />
      )}
    </>
  )
}

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardInner />
    </Suspense>
  )
}
