'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import type { TransactionReceipt } from '@/types'
import { ReceiptModal } from './ReceiptModal'

interface SuccessModalProps {
  receipt: TransactionReceipt
  onDone:  () => void
}

export function SuccessModal({ receipt, onDone }: SuccessModalProps) {
  const [showReceipt, setShowReceipt] = useState(false)

  return (
    <>
      {/* Grey overlay */}
      <div
        className="fixed inset-0 z-40 flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.20)' }}
      >
        {/* White card */}
        <div
          className="bg-white flex flex-col items-center text-center px-12 py-10 gap-4"
          style={{ width: '470px', borderRadius: '8px', boxShadow: '0px 5px 20px rgba(0,0,0,0.15)' }}
        >
          <h2 className="text-xl font-bold text-brand-ink">Payment Successful</h2>

          <div className="text-xs text-brand-muted space-y-0.5">
            <p>Ref Number: <strong>{receipt.referenceNumber}</strong></p>
            <p>Date: <strong>{receipt.date}</strong></p>
          </div>

          {/* Checkmark with radiate lines */}
          <div className="relative flex items-center justify-center my-2" style={{ width: 64, height: 64 }}>
            {[0,45,90,135,180,225,270,315].map((deg, i) => (
              <div
                key={i}
                className="absolute bg-brand-ink rounded-full"
                style={{ width: 2, height: 10, transformOrigin: 'center 38px', transform: `rotate(${deg}deg)` }}
              />
            ))}
            <div
              className="relative z-10 flex items-center justify-center border-2 border-brand-ink rounded-full bg-white"
              style={{ width: 44, height: 44 }}
            >
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                <path d="M1 7L7 13L19 1" stroke="#272935" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <p className="text-2xl font-bold text-brand-ink">
            {receipt.total.toFixed(2)} <span className="text-lg">KES</span>
          </p>

          <div className="text-sm text-brand-muted -mt-1">
            <p>Agrovet product purchase for</p>
            <p className="font-bold text-brand-ink">{receipt.farmerName} – {receipt.farmerId}</p>
          </div>

          <div className="flex gap-4 w-full mt-2">
            <button
              id="success-download-btn"
              onClick={() => setShowReceipt(true)}
              className="flex-1 py-2.5 border-2 border-brand-ink rounded-md text-sm font-bold text-brand-ink bg-white hover:bg-gray-50 transition-colors"
            >
              Download Receipt
            </button>
            <button
              id="success-done-btn"
              onClick={onDone}
              className="flex-1 py-2.5 rounded-md text-sm font-bold text-white hover:bg-gray-800 transition-colors"
              style={{ background: '#272935' }}
            >
              Done
            </button>
          </div>
        </div>
      </div>

      {/* Receipt modal on top */}
      {showReceipt && (
        <ReceiptModal
          receipt={receipt}
          onClose={() => setShowReceipt(false)}
          onDone={onDone}
        />
      )}
    </>
  )
}
