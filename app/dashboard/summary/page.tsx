'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { useProductSelection } from '@/hooks/useProductSelection'
import { useAuth } from '@/hooks/useAuth'
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
  const { items, removeItem, totalDeduction, totalAmount, isHydrated } = useProductSelection()

  const [otp,     setOtp]     = useState('')
  const [otpErr,  setOtpErr]  = useState('')
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
    if (otp.length < 6) {
      setOtpErr('Please enter the complete 6-digit OTP')
      return
    }
    setOtpErr('')
    setPaying(true)

    const receipt: TransactionReceipt = {
      referenceNumber: generateRef(),
      date:            todayFormatted(),
      walletName:      'Inua Mkulima Wallet',
      farmerName:      'Gladys Kivuva', // Hardcoded for prototype as per removed form
      farmerId:        '30123456',
      farmerPhone:     '0721234715',
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
      total: totalDeduction,
    }

    sessionStorage.setItem('pending_receipt', JSON.stringify(receipt))

    setTimeout(() => {
      setPaying(false)
      router.push('/dashboard?payment=success')
    }, 1200)
  }

  useEffect(() => {
    if (isHydrated && items.length === 0) {
      router.replace('/dashboard/products')
    }
  }, [items.length, isHydrated, router])

  if (!isHydrated || items.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-6 max-w-[700px]">

      {/* Heading + breadcrumb */}
      <div>
        <h2 className="text-base font-bold" style={{ color: '#272935' }}>Summary</h2>
        <div className="flex items-center gap-2 mt-2">
          <button
            id="summary-back-breadcrumb"
            onClick={() => router.push('/dashboard/products')}
            className="flex items-center gap-1 px-3 py-1 rounded text-white text-xs font-semibold"
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
          <span className="text-xs" style={{ color: '#707070' }}>&rsaquo; Summary</span>
        </div>
      </div>

      {/* Selected Products Area */}
      <div>
        <p className="text-sm font-semibold mb-2" style={{ color: '#272935' }}>Selected Products</p>
        <div style={{ border: '1px solid #CCCCCC', borderRadius: '4px', overflow: 'hidden' }}>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="py-2 px-4 text-left text-xs font-semibold" style={{ color: '#272935' }}>Product name</th>
                <th className="py-2 px-4 text-center text-xs font-semibold" style={{ color: '#272935' }}>Quantity</th>
                <th className="py-2 px-4 text-center text-xs font-semibold" style={{ color: '#272935' }}>Price</th>
                <th className="py-2 px-4 text-center text-xs font-semibold" style={{ color: '#272935' }}>Total</th>
                <th className="py-2 px-4 text-right text-xs font-semibold" style={{ color: '#272935' }}>Deduction</th>
                <th className="w-10" />
              </tr>
            </thead>
            <tbody>
              {items.map(({ product, quantity, deduction }) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-2.5 px-4 text-xs" style={{ color: '#707070' }}>{product.title}</td>
                  <td className="py-2.5 px-4 text-xs text-center" style={{ color: '#707070' }}>{quantity}</td>
                  <td className="py-2.5 px-4 text-xs text-center" style={{ color: '#707070' }}>
                    {product.price.toLocaleString('en-KE')} kes
                  </td>
                  <td className="py-2.5 px-4 text-xs text-center" style={{ color: '#707070' }}>
                    {(product.price * quantity).toLocaleString('en-KE')} kes
                  </td>
                  <td className="py-2.5 px-4 text-xs font-bold text-right" style={{ color: '#272935' }}>
                    {(deduction * quantity).toLocaleString('en-KE')} kes
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="inline-flex items-center justify-center transition-opacity hover:opacity-60 active:scale-95"
                      style={{
                        width: '20px', height: '20px',
                        borderRadius: '50%',
                        border: '2px solid #272935',
                        background: 'transparent',
                        color: '#272935',
                        fontSize: '14px', lineHeight: 1, cursor: 'pointer',
                      }}
                    >
                      −
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-2.5 px-4 text-xs font-bold" style={{ color: '#272935' }}>Total</td>
                <td colSpan={3} />
                <td className="py-2.5 px-4 text-xs font-bold text-right underline" style={{ color: '#272935' }}>
                  {totalDeduction.toLocaleString('en-KE', { minimumFractionDigits: 2 })} kes
                </td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* OTP Area */}
      <div className="flex flex-col items-center mt-2 gap-4">
        <p className="text-xs" style={{ color: '#707070' }}>
          Enter the <strong>verification code</strong> sent to the parent at <strong>072******715</strong> via SMS.
        </p>
        
        <OtpInput value={otp} onChange={v => { setOtp(v); setOtpErr('') }} />
        {otpErr && <p className="text-red-500 text-xs">{otpErr}</p>}
        
        <p className="text-xs" style={{ color: '#707070' }}>
          Didn&apos;t receive OTP? Resend in{' '}
          {seconds > 0
            ? <span className="font-bold" style={{ color: '#E8B40A' }}>{formatTime(seconds)}</span>
            : <button onClick={() => setSeconds(OTP_COUNTDOWN)} className="font-bold text-[#E8B40A] hover:underline">Resend OTP</button>
          }
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-8 w-full max-w-[500px] mt-2">
          <button
            onClick={() => router.push('/dashboard/products')}
            className="flex-1 py-2 text-sm font-semibold transition-colors hover:bg-gray-50"
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
            onClick={handlePay}
            disabled={paying}
            className="flex-1 py-2 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
            style={{
              background: '#000000',
              borderRadius: '4px',
            }}
          >
            {paying ? 'Processing…' : `Pay ${totalDeduction.toLocaleString('en-KE')} Kes`}
          </button>
        </div>
      </div>

      {/* Warning text */}
      <p className="text-xs italic text-center font-semibold mt-4" style={{ color: '#CC0000' }}>
        You will receive {totalDeduction.toLocaleString('en-KE', { minimumFractionDigits: 2 })} kes from the subsidy program. 
        If this does not cover the total<br />cost of the purchase ensure you get the balance from the customer.
      </p>

    </div>
  )
}
