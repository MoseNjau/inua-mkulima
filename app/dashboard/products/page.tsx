'use client'

import { useRouter } from 'next/navigation'
import { useProducts } from '@/hooks/useProducts'
import { useProductSelection } from '@/hooks/useProductSelection'
import { ProductRow } from '@/components/products/ProductRow'
import { SelectedProductRow } from '@/components/products/SelectedProductRow'
import { Spinner } from '@/components/ui/Spinner'
import { WALLET_BALANCE } from '@/lib/constants'
import { useState } from 'react'
import { SearchBar } from '@/components/dashboard/SearchBar'
import { ChevronLeft } from 'lucide-react'

export default function ProductsPage() {
  const router  = useRouter()
  const [query, setQuery] = useState('')

  const { data, isLoading } = useProducts()
  const { items, addItem, removeItem, totalDeduction } = useProductSelection()

  const filteredProducts = data?.products.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase())
  ) ?? []

  const totalSelected = items.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const grandTotal    = items.reduce((s, i) => s + i.deduction * i.quantity, 0)

  const handleDeduct = () => {
    if (items.length === 0) return
    router.push('/dashboard/summary')
  }

  return (
    <div className="flex flex-col gap-4 h-full">

      {/* Page heading + breadcrumb */}
      <div>
        <h2 className="text-lg font-bold text-brand-ink">Product Details</h2>
        <div className="flex items-center gap-2 mt-1">
          {/* Gold "Back" pill button */}
          <button
            id="back-to-dashboard-btn"
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-1 px-3 py-1 rounded-md text-white text-xs font-bold"
            style={{ background: '#E8B40A' }}
          >
            <ChevronLeft className="w-3 h-3" />
            Back
          </button>
          <span className="text-brand-muted text-xs">Product Details</span>
        </div>
      </div>

      {/* Wallet balance */}
      <p className="text-sm font-medium text-brand-ink">
        <span className="font-bold">Inua mkulima wallet</span> balance:{' '}
        <span className="font-bold">Kes {WALLET_BALANCE.toLocaleString('en-KE', { minimumFractionDigits: 2 })}.00</span>
      </p>

      {/* Two-panel layout */}
      <div className="flex gap-5 flex-1 min-h-0">

        {/* Left — Available Products */}
        <div className="flex-1 flex flex-col" style={{ minWidth: 0 }}>
          <p className="text-sm font-semibold text-brand-ink mb-2">Products</p>
          <div className="flex-1 bg-white border border-brand-border rounded-lg overflow-hidden flex flex-col shadow-panel">
            <div className="px-3 py-2 border-b border-brand-border">
              <SearchBar value={query} onChange={setQuery} placeholder="Filter products…" className="w-full" />
            </div>
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center py-10"><Spinner /></div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-brand-border text-brand-muted bg-gray-50">
                      <th className="py-2 px-4 text-left text-xs font-semibold">Product name</th>
                      <th className="py-2 px-4 text-right text-xs font-semibold">Price</th>
                      <th className="py-2 px-4 w-10" />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(product => (
                      <ProductRow
                        key={product.id}
                        name={product.title}
                        price={product.price}
                        onAdd={() => addItem(product)}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Right — Selected Products */}
        <div className="flex-1 flex flex-col" style={{ minWidth: 0 }}>
          <p className="text-sm font-semibold text-brand-ink mb-2">Selected Products</p>
          <div className="flex-1 bg-white border border-brand-border rounded-lg overflow-hidden flex flex-col shadow-panel">
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center h-full py-10 gap-2"
                  style={{ background: '#F5F5DC', color: '#707070' }}
                >
                  <p className="text-sm italic">Please select a products from</p>
                  <p className="text-sm italic">the products panel first</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-brand-border bg-gray-50 text-brand-muted">
                      <th className="py-2 px-3 text-left text-xs font-semibold">Product name</th>
                      <th className="py-2 px-3 text-center text-xs font-semibold">Qty</th>
                      <th className="py-2 px-3 text-right text-xs font-semibold">Price</th>
                      <th className="py-2 px-3 text-right text-xs font-semibold">Total</th>
                      <th className="py-2 px-3 text-right text-xs font-semibold">Deduction</th>
                      <th className="py-2 px-3 w-8" />
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(({ product, quantity, deduction }) => (
                      <SelectedProductRow
                        key={product.id}
                        name={product.title}
                        quantity={quantity}
                        price={product.price}
                        total={product.price * quantity}
                        deduction={deduction * quantity}
                        onRemove={() => removeItem(product.id)}
                      />
                    ))}
                    {/* Total row */}
                    <tr className="border-t border-brand-border">
                      <td className="py-2 px-3 text-xs font-bold text-brand-ink" colSpan={3}>Total</td>
                      <td className="py-2 px-3 text-xs font-bold text-right text-brand-ink">{totalSelected.toFixed(2)}</td>
                      <td className="py-2 px-3 text-xs font-bold text-right text-brand-green">{grandTotal.toFixed(2)} kes</td>
                      <td />
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <button
          id="products-back-btn"
          onClick={() => router.push('/dashboard')}
          className="px-10 py-2.5 border-2 border-brand-ink rounded-md text-sm font-bold text-brand-ink bg-white hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          id="products-deduct-btn"
          onClick={handleDeduct}
          disabled={items.length === 0}
          className="px-10 py-2.5 rounded-md text-sm font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: items.length > 0 ? '#272935' : '#707070' }}
        >
          Deduct {grandTotal > 0 ? `${grandTotal.toFixed(2)} KES` : '0.00 KES'}
        </button>
      </div>

      {/* Warning note */}
      {items.length > 0 && (
        <p className="text-red-600 text-xs italic text-center">
          You will receive {grandTotal.toFixed(2)} kes from the subsidy program. If this does not cover the total
          cost of the purchase ensure you get the balance from the customer.
        </p>
      )}
    </div>
  )
}
