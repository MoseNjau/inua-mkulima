'use client'

import { useRouter } from 'next/navigation'
import { useProducts } from '@/hooks/useProducts'
import { useProductSelection } from '@/hooks/useProductSelection'
import { ProductRow } from '@/components/products/ProductRow'
import { SelectedProductRow } from '@/components/products/SelectedProductRow'
import { Spinner } from '@/components/ui/Spinner'
import { WALLET_BALANCE } from '@/lib/constants'
import { useState } from 'react'
import { ChevronLeft, Search } from 'lucide-react'

export default function ProductsPage() {
  const router  = useRouter()
  const [query, setQuery] = useState('')

  const { data, isLoading } = useProducts()
  const { items, addItem, removeItem, totalDeduction, totalAmount } = useProductSelection()

  const filtered = data?.products.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase())
  ) ?? []

  return (
    <div className="flex flex-col gap-3 h-full">

      {/* Page heading */}
      <h2 className="text-base font-bold" style={{ color: '#272935' }}>Product Details</h2>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <button
          id="back-to-dashboard-btn"
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-1 px-3 py-1 rounded text-white text-xs font-semibold"
          style={{ background: '#E8B40A' }}
        >
          <ChevronLeft className="w-3 h-3" />
          Back
        </button>
        <span className="text-xs" style={{ color: '#272935' }}>Product Details</span>
      </div>

      {/* Wallet balance */}
      <p className="text-sm" style={{ color: '#272935' }}>
        <strong>Inua mkulima wallet</strong> balance:{' '}
        <strong>Kes {WALLET_BALANCE.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</strong>
      </p>

      {/* Two-panel layout — flex-1 so it fills remaining space; panels scroll internally */}
      <div className="flex gap-6 flex-1 min-h-0">

        {/* ── Left: Products ── */}
        <div className="flex-1 flex flex-col min-h-0" style={{ minWidth: 0 }}>
          <p className="text-sm font-semibold mb-2 flex-shrink-0" style={{ color: '#272935' }}>Products</p>
          <div className="flex flex-col flex-1 min-h-0" style={{ border: '1px solid #CCCCCC', borderRadius: '4px', overflow: 'hidden' }}>

            {/* Search — inside panel, minimal */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200">
              <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Filter products…"
                className="flex-1 text-xs bg-transparent focus:outline-none"
                style={{ color: '#272935' }}
              />
            </div>

            {/* Scrollable tbody area */}
            <div className="overflow-y-auto flex-1">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="py-2 px-4 text-left text-xs font-semibold" style={{ color: '#272935' }}>Product name</th>
                  <th className="py-2 px-4 text-right text-xs font-semibold" style={{ color: '#272935' }}>Price</th>
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={3} className="py-8 text-center"><Spinner /></td></tr>
                ) : (
                  filtered.map(product => (
                    <ProductRow
                      key={product.id}
                      name={product.title}
                      price={product.price}
                      onAdd={() => addItem(product)}
                    />
                  ))
                )}
              </tbody>
            </table>
            </div>
          </div>
        </div>

        {/* ── Right: Selected Products ── */}
        <div className="flex-1 flex flex-col min-h-0" style={{ minWidth: 0 }}>
          <p className="text-sm font-semibold mb-2 flex-shrink-0" style={{ color: '#272935' }}>Selected Products</p>
          <div className="flex flex-col flex-1 min-h-0 overflow-y-auto" style={{ border: '1px solid #CCCCCC', borderRadius: '4px', overflow: 'hidden' }}>
            {items.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-14 gap-1"
                style={{ background: '#F5F5DC', minHeight: '160px' }}
              >
                <p className="text-xs italic text-center" style={{ color: '#707070' }}>
                  Please select a products from<br />the products panel first
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="py-2 px-3 text-left text-xs font-semibold" style={{ color: '#272935' }}>Product name</th>
                    <th className="py-2 px-3 text-center text-xs font-semibold" style={{ color: '#272935' }}>Qty</th>
                    <th className="py-2 px-3 text-right text-xs font-semibold" style={{ color: '#272935' }}>Price</th>
                    <th className="py-2 px-3 text-right text-xs font-semibold" style={{ color: '#272935' }}>Total</th>
                    <th className="py-2 px-3 text-right text-xs font-semibold" style={{ color: '#272935' }}>Deduction</th>
                    <th className="w-8" />
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
                  <tr className="border-t border-gray-200">
                    <td className="py-2 px-3 text-xs font-bold" style={{ color: '#272935' }} colSpan={4}>Total</td>
                    <td className="py-2 px-3 text-xs font-bold text-right underline" style={{ color: '#272935' }}>
                      {totalDeduction.toLocaleString('en-KE', { minimumFractionDigits: 2 })} kes
                    </td>
                    <td />
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex items-center justify-between mt-2">
        <button
          id="products-back-btn"
          onClick={() => router.push('/dashboard')}
          className="px-12 py-2 text-sm font-semibold transition-colors hover:bg-gray-50"
          style={{
            border: '1.5px solid #272935',
            borderRadius: '4px',
            background: '#FFFFFF',
            color: '#272935',
          }}
        >
          Back
        </button>
        <button
          id="products-deduct-btn"
          onClick={() => items.length > 0 && router.push('/dashboard/summary')}
          disabled={items.length === 0}
          className="px-8 py-2 text-sm font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: '#272935', borderRadius: '4px', border: 'none' }}
        >
          Deduct {totalDeduction.toLocaleString('en-KE', { minimumFractionDigits: 2 })} KES
        </button>
      </div>

      {/* Warning note */}
      {items.length > 0 && (
        <p className="text-xs italic text-center font-semibold" style={{ color: '#CC0000' }}>
          You will receive {totalDeduction.toLocaleString('en-KE', { minimumFractionDigits: 2 })} kes from the subsidy program.
          {' '}If this does not cover the total cost of the purchase ensure you get the balance from the customer.
        </p>
      )}
    </div>
  )
}
