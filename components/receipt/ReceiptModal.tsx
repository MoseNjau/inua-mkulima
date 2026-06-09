'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { X, Printer } from 'lucide-react'
import type { TransactionReceipt } from '@/types'

interface ReceiptModalProps {
  receipt:  TransactionReceipt
  onClose:  () => void
  onDone:   () => void
}

export function ReceiptModal({ receipt, onClose, onDone }: ReceiptModalProps) {
  const receiptRef = useRef<HTMLDivElement>(null)
  const totalDeduction = receipt.items.reduce((s, i) => s + i.deduction, 0)

  const handlePrint = () => window.print()

  return (
    <>
      {/* Print-only styles */}
      <style>{`
        @media print {
          body > * { display: none !important; }
          #receipt-print-root { display: block !important; }
          #receipt-print-root .no-print { display: none !important; }
        }
      `}</style>

      {/* Full-screen overlay */}
      <div
        id="receipt-print-root"
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-6"
        style={{ background: 'rgba(0,0,0,0.50)' }}
      >
        {/* Inner wrapper */}
        <div className="relative w-full flex flex-col items-center gap-3">

          {/* Action bar — hidden on print */}
          <div className="no-print flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2 rounded-md text-sm font-bold text-white transition-colors"
              style={{ background: '#016527' }}
            >
              <Printer className="w-4 h-4" />
              Print / Download PDF
            </button>
            <button
              onClick={onDone}
              className="px-5 py-2 rounded-md text-sm font-bold text-white hover:bg-gray-700 transition-colors"
              style={{ background: '#272935' }}
            >
              Done
            </button>
            <button
              onClick={onClose}
              aria-label="Close receipt"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ── A4 Receipt Card ── */}
          <div
            ref={receiptRef}
            id="receipt-card"
            className="bg-white"
            style={{
              width:     '842px',
              minHeight: '1190px',
              boxShadow: '0px 4px 24px #00000029',
              border:    '1px solid #77BA9D',
              display:   'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ background: '#016527' }}
            >
              <div
                className="px-4 py-1.5 text-white text-sm font-bold"
                style={{ border: '2px solid #E8B40A', borderRadius: '2px' }}
              >
                Transaction Receipt
              </div>
              <div className="flex items-center gap-4">
                <Image src="/images/Logo.svg"   alt="Co-op Bank"     width={70} height={35} className="object-contain" />
                <Image src="/images/group2.png"  alt="Muranga County" width={45} height={40} className="object-contain" />
              </div>
            </div>

            {/* Green → Gold gradient line */}
            <div style={{ height: '3px', background: 'linear-gradient(to right, #016527 75%, #E8B40A 100%)' }} />

            {/* PAGE 1 OF 1 */}
            <div className="flex justify-end px-6 pt-2 pb-1">
              <span className="text-xs font-semibold" style={{ color: '#3E3E3E' }}>PAGE 1 OF 1</span>
            </div>

            {/* Metadata */}
            <div className="px-6 py-3 grid grid-cols-2 gap-x-10 gap-y-1.5">
              <div className="space-y-1.5">
                <MetaRow label="Date:"             value={receipt.date} />
                <MetaRow label="Reference Number:" value={receipt.referenceNumber} />
                <MetaRow label="Wallet:"           value={receipt.walletName} />
                <MetaRow label="Farmer Name/ID:"   value={`${receipt.farmerName} - ${receipt.farmerId}`} />
                <MetaRow label="Farmer Phone No:"  value={receipt.farmerPhone} />
              </div>
              <div className="space-y-1.5">
                <MetaRow label="Agro-dealer Name:" value={receipt.agroDealerName} />
                <MetaRow label="Merchant ID:"      value={receipt.merchantId} />
                <MetaRow label="Phone Number:"     value={receipt.phoneNumber} />
              </div>
            </div>

            {/* Products Table */}
            <div className="px-6 py-4">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr style={{ background: '#00513A' }}>
                    {['Product Code','Quantity','Price','Total Amount','Deduction'].map(h => (
                      <th key={h} className="py-2.5 px-4 text-left font-semibold text-white"
                        style={{ border: '1px solid #00513B' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {receipt.items.map((item, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#E8B40A1A', borderBottom: '1px solid #F5F6F6' }}>
                      <td className="py-2.5 px-4" style={{ color: '#232323' }}>{item.productCode}</td>
                      <td className="py-2.5 px-4 text-center" style={{ color: '#3E3E3E' }}>{item.quantity}</td>
                      <td className="py-2.5 px-4 text-right" style={{ color: '#3E3E3E' }}>{item.price.toFixed(2)}</td>
                      <td className="py-2.5 px-4 text-right" style={{ color: '#232323' }}>{item.totalAmount.toFixed(2)}</td>
                      <td className="py-2.5 px-4 text-right" style={{ color: '#232323' }}>{item.deduction.toFixed(2)}</td>
                    </tr>
                  ))}
                  {/* TOTAL row */}
                  <tr style={{ background: '#016527' }}>
                    <td colSpan={3} className="py-2.5 px-4 text-right font-bold text-white text-sm">TOTAL</td>
                    <td className="py-2.5 px-4 text-right font-bold text-sm"
                      style={{ background: '#FFFFFF', color: '#000000', border: '2px solid #77BA9D' }}>
                      {receipt.total.toFixed(2)}
                    </td>
                    <td style={{ background: '#016527' }} />
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Spacer pushes footer down */}
            <div className="flex-1" />

            {/* Thank you */}
            <div className="text-center py-4">
              <p className="text-sm italic font-medium" style={{ color: '#00513A' }}>
                Thank you for banking with us.
              </p>
            </div>

            {/* Dashed separator */}
            <div className="mx-6 border-t border-dashed" style={{ borderColor: '#77BA9D' }} />

            {/* Note box */}
            <div className="mx-6 my-4 flex gap-3 px-4 py-3 rounded-sm" style={{ background: '#FBFFF7', borderLeft: '4px solid #016527' }}>
              <div>
                <p className="text-xs font-bold" style={{ color: '#016527' }}>Note:</p>
                <p className="text-xs" style={{ color: '#3E3E3E' }}>
                  This document is computer generated and therefore not signed.
                </p>
              </div>
            </div>

            {/* Bottom stripe — green + gold */}
            <div className="flex" style={{ height: '8px' }}>
              <div className="flex-1" style={{ background: '#016527' }} />
              <div style={{ width: '80px', background: '#E8B40A' }} />
            </div>
          </div>
          {/* end receipt card */}

        </div>
      </div>
    </>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-xs items-baseline">
      <span className="font-medium whitespace-nowrap" style={{ color: '#232323' }}>{label}</span>
      <span className="font-bold" style={{ color: '#00513A' }}>{value}</span>
    </div>
  )
}
