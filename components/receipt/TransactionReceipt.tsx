'use client'

import Image from 'next/image'
import type { TransactionReceipt } from '@/types'

interface TransactionReceiptProps {
  receipt: TransactionReceipt
}

export function TransactionReceiptCard({ receipt }: TransactionReceiptProps) {
  const handlePrint = () => window.print()

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden" id="receipt-card">
      {/* Header */}
      <div className="bg-brand-green px-6 py-4 flex items-center justify-between">
        <h2 className="text-white text-lg font-bold tracking-wide">Transaction Receipt</h2>
        <div className="flex items-center gap-4">
          <Image src="/images/small-header.png" alt="Header logos" width={120} height={36} className="object-contain" />
        </div>
      </div>

      <div className="px-6 py-1 bg-gray-50 border-b border-brand-border">
        <span className="text-xs font-semibold text-brand-muted">PAGE 1 OF 1</span>
      </div>

      <div className="p-6">
        {/* Metadata grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-6">
          <div className="space-y-3">
            <MetaRow label="Date"          value={receipt.date} />
            <MetaRow label="Reference No." value={receipt.referenceNumber} />
            <MetaRow label="Wallet"        value={receipt.walletName} />
            <MetaRow label="Farmer Name"   value={receipt.farmerName} />
            <MetaRow label="Farmer ID"     value={receipt.farmerId} />
            <MetaRow label="Farmer Phone"  value={receipt.farmerPhone} />
          </div>
          <div className="space-y-3">
            <MetaRow label="Agro-dealer Name" value={receipt.agroDealerName} />
            <MetaRow label="Merchant ID"      value={receipt.merchantId} />
            <MetaRow label="Phone Number"     value={receipt.phoneNumber} />
          </div>
        </div>

        {/* Products table */}
        <div className="overflow-x-auto rounded-lg border border-brand-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-green text-white">
                {['Product Code', 'Qty', 'Price', 'Total Amount', 'Deduction'].map(h => (
                  <th key={h} className="py-2 px-4 text-left text-xs font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {receipt.items.map((item, i) => (
                <tr key={i} className="border-b border-brand-border hover:bg-gray-50">
                  <td className="py-3 px-4 text-xs">{item.productCode}</td>
                  <td className="py-3 px-4 text-xs text-center">{item.quantity}</td>
                  <td className="py-3 px-4 text-xs text-right">{item.price.toFixed(2)}</td>
                  <td className="py-3 px-4 text-xs text-right font-semibold">{item.totalAmount.toFixed(2)}</td>
                  <td className="py-3 px-4 text-xs text-right text-brand-green font-semibold">
                    -{item.deduction.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold">
                <td colSpan={3} className="py-3 px-4 text-sm text-right">TOTAL</td>
                <td className="py-3 px-4 text-sm text-right text-brand-ink">{receipt.total.toFixed(2)}</td>
                <td className="py-3 px-4 text-sm text-right text-brand-green">
                  -{receipt.items.reduce((s, i) => s + i.deduction, 0).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-6 pb-6 flex gap-3 print:hidden">
        <button
          onClick={handlePrint}
          id="print-receipt-btn"
          className="px-6 py-2.5 bg-brand-green text-white text-sm font-semibold rounded-md hover:bg-green-700 transition-colors"
        >
          Print / Download
        </button>
      </div>
    </div>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-brand-muted font-semibold">{label}</span>
      <span className="text-sm text-brand-ink font-medium">{value}</span>
    </div>
  )
}
