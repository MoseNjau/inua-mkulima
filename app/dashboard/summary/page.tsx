'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { useProductSelection } from '@/hooks/useProductSelection'
import { useAuth } from '@/hooks/useAuth'
import { SelectedProductRow } from '@/components/products/SelectedProductRow'
import { OtpInput } from '@/components/ui/OtpInput'
import type { TransactionReceipt } from '@/types'

const OTP_COUNTDOWN = 90

function generateRef(): string {
  return Math.random().toString(36).substring(2, 12).toUpperCase()
}

function todayFormatted(): string {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function SummaryPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { items, removeItem, totalDeduction, totalAmount } = useProductSelection()

  const [farmerName,  setFarmerName]  = useState('')
  const [farmerId,    setFarmerId]    = useState('')
  const [farmerPhone, setFarmerPhone] = useState('')
  const [otp,     setOtp]     = useState('')
  const [otpErr,  setOtpErr]  = useState('')
  const [formErr, setFormErr] = useState('')
  const [seconds, setSeconds] = useState(OTP_COUNTDOWN)
  const [paying,  setPaying]  = useState(false)

  useEffect(() => {
    if (seconds <= 0) return
    const t = setTimeout(() => setSeconds(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds])

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}min ${String(s % 60).padStart(2, '0')}sec`

  const handlePay = () => {
    if (!farmerName.trim() || !farmerId.trim() || !farmerPhone.trim()) {
      setFormErr('Please fill in all farmer details before proceeding.')
      return
    }
    if (otp.length < 6) {
      setOtpErr('Please enter the complete 6-digit OTP')
      return
    }
    setFormErr('')
    setOtpErr('')
    setPaying(true)

    // Build receipt from real data — no hardcoding
    const receipt: TransactionReceipt = {
      referenceNumber: generateRef(),
      date:            todayFormatted(),
      walletName:      'Inua Mkulima Wallet',
      farmerName:      farmerName.trim(),
      farmerId:        farmerId.trim(),
      farmerPhone:     farmerPhone.trim(),
      agroDealerName:  user ? `${user.firstName} ${user.lastName}` : 'Agro-dealer',
      merchantId:      user ? user.username.toUpperCase() : '—',
      phoneNumber:     user?.phone ?? '—',
      items: items.map(({ product, quantity, deduction }) => ({
        productCode: product.title,
        quantity,
        price:       product.price,
        totalAmount: product.price * quantity,
        deduction:   deduction * quantity,
      })),
      total: totalDeduction, // total subsidy deducted
    }

    // Persist receipt so the dashboard modal can read it
    sessionStorage.setItem('pending_receipt', JSON.stringify(receipt))

    setTimeout(() => {
      setPaying(false)
      router.push('/dashboard?payment=success')
    }, 1200)
  }

  if (items.length === 0) {
    router.replace('/dashboard/products')
    return null
  }

  return (
    <div className="flex flex-col gap-5 max-w-4xl">

      {/* Heading + breadcrumb */}
      <div>
        <h2 className="text-lg font-bold text-brand-ink">Summary</h2>
        <div className="flex items-center gap-2 mt-1">
          <button
            id="summary-back-breadcrumb"
            onClick={() => router.push('/dashboard/products')}
            className="flex items-center gap-1 px-3 py-1 rounded-md text-white text-xs font-bold"
            style={{ background: '#E8B40A' }}
          >
            <ChevronLeft className="w-3 h-3" />
            Back
          </button>
          <button
            onClick={() => router.push('/dashboard/products')}
            className="text-xs font-semibold hover:underline"
            style={{ color: '#E8B40A' }}
          >
            Product Details
          </button>
          <span className="text-brand-muted text-xs">&rsaquo; Summary</span>
        </div>
      </div>

      {/* Farmer Details */}
      <div className="bg-white border border-brand-border rounded-lg px-5 py-4 shadow-panel">
        <p className="text-sm font-bold text-brand-ink mb-3">Farmer Details</p>
        {formErr && <p className="text-red-500 text-xs mb-2">{formErr}</p>}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-brand-muted font-medium">Farmer Name</label>
            <input
              id="farmer-name-input"
              type="text"
              value={farmerName}
              onChange={e => setFarmerName(e.target.value)}
              placeholder="e.g. Gladys Kivuva"
              className="border-b border-brand-border bg-transparent text-sm text-brand-ink focus:outline-none focus:border-brand-green pb-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-brand-muted font-medium">Farmer ID</label>
            <input
              id="farmer-id-input"
              type="text"
              value={farmerId}
              onChange={e => setFarmerId(e.target.value)}
              placeholder="e.g. 30123456"
              className="border-b border-brand-border bg-transparent text-sm text-brand-ink focus:outline-none focus:border-brand-green pb-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-brand-muted font-medium">Farmer Phone</label>
            <input
              id="farmer-phone-input"
              type="tel"
              value={farmerPhone}
              onChange={e => setFarmerPhone(e.target.value)}
              placeholder="e.g. 0712345678"
              className="border-b border-brand-border bg-transparent text-sm text-brand-ink focus:outline-none focus:border-brand-green pb-1"
            />
          </div>
        </div>
      </div>

      {/* Selected Products table */}
      <p className="text-sm font-semibold text-brand-ink -mb-3">Selected Products</p>
      <div className="bg-white border border-brand-border rounded-lg overflow-hidden shadow-panel">
        <table className="w-full">
          <thead>
            <tr className="border-b border-brand-border bg-gray-50 text-brand-muted">
              <th className="py-2 px-4 text-left text-xs font-semibold">Product name</th>
              <th className="py-2 px-4 text-center text-xs font-semibold">Quantity</th>
              <th className="py-2 px-4 text-right text-xs font-semibold">Price</th>
              <th className="py-2 px-4 text-right text-xs font-semibold">Total</th>
              <th className="py-2 px-4 text-right text-xs font-semibold">Deduction</th>
              <th className="py-2 px-4 w-8" />
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
            <tr className="border-t border-brand-border">
              <td className="py-2 px-4 text-xs font-bold" colSpan={3}>Total</td>
              <td className="py-2 px-4 text-xs font-bold text-right">{totalAmount.toFixed(2)}</td>
              <td className="py-2 px-4 text-xs font-bold text-right underline" style={{ color: '#009438' }}>
                {totalDeduction.toFixed(2)} kes
              </td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      {/* OTP Box */}
      <div className="border border-blue-400 rounded-lg p-5 flex flex-col items-center gap-4 bg-white">
        <p className="text-sm text-center text-brand-ink">
          Enter the <strong>verification code</strong> sent to the parent at{' '}
          <strong>{farmerPhone ? `${farmerPhone.slice(0,3)}*****${farmerPhone.slice(-3)}` : '07X*****XXX'}</strong> via SMS.
        </p>
        <OtpInput value={otp} onChange={v => { setOtp(v); setOtpErr('') }} />
        {otpErr && <p className="text-red-500 text-xs">{otpErr}</p>}
        <p className="text-xs text-brand-muted">
          Didn&apos;t receive OTP? Resend in{' '}
          {seconds > 0
            ? <span className="font-bold" style={{ color: '#E8B40A' }}>{formatTime(seconds)}</span>
            : <button id="resend-otp-btn" onClick={() => setSeconds(OTP_COUNTDOWN)}
                className="font-bold text-brand-green hover:underline">Resend OTP</button>
          }
        </p>

        <div className="flex gap-4 w-full mt-1">
          <button
            id="summary-back-btn"
            onClick={() => router.push('/dashboard/products')}
            className="flex-1 py-2.5 border-2 border-brand-ink rounded-md text-sm font-bold text-brand-ink bg-white hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            id="summary-pay-btn"
            onClick={handlePay}
            disabled={paying}
            className="flex-1 py-2.5 rounded-md text-sm font-bold text-white transition-all disabled:opacity-60"
            style={{ background: '#272935' }}
          >
            {paying ? 'Processing…' : `Pay ${totalDeduction.toFixed(2)} Kes`}
          </button>
        </div>
      </div>

      {/* Warning */}
      <p className="text-red-600 text-xs italic text-center">
        You will receive {totalDeduction.toFixed(2)} kes from the subsidy program. If this does not cover the total
        cost of the purchase ensure you get the balance from the customer.
      </p>
    </div>
  )
}
