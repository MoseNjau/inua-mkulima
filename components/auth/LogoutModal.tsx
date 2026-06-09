'use client'

import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'

interface LogoutModalProps {
  isOpen:  boolean
  onClose: () => void
}

export function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const { logout } = useAuth()

  if (!isOpen) return null

  return (
    /* Overlay — grey as per design */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.32)', backdropFilter: 'blur(4px)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Logout confirmation"
    >
      {/* Card — 802×379, shadow #16450026, radius 8px */}
      <div
        className="bg-white flex flex-col items-center gap-5 text-center px-16 py-10"
        style={{
          width:     '802px',
          minHeight: '379px',
          borderRadius: '8px',
          boxShadow: '0px 5px 15px #16450026',
        }}
      >
        <h2 className="text-2xl font-bold text-brand-ink">Log Out?</h2>

        <Image
          src="/images/logout-icon.svg"
          alt="Logout"
          width={80}
          height={80}
        />

        <p style={{ color: '#272935', fontSize: '16px' }}>
          Are you sure you want to log out?
        </p>

        <div className="flex gap-6 w-full mt-2 justify-center">
          <button
            id="logout-cancel-btn"
            onClick={onClose}
            style={{
              width: '150px',
              height: '44px',
              border: '2px solid #272935',
              borderRadius: '6px',
              background: '#FFFFFF',
              color: '#272935',
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: 'Poppins, sans-serif',
              cursor: 'pointer',
            }}
          >
            Back
          </button>
          <button
            id="logout-confirm-btn"
            onClick={logout}
            style={{
              width: '150px',
              height: '44px',
              border: 'none',
              borderRadius: '6px',
              background: '#272935',
              color: '#FFFFFF',
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: 'Poppins, sans-serif',
              cursor: 'pointer',
            }}
          >
            Yes, log out
          </button>
        </div>
      </div>
    </div>
  )
}
