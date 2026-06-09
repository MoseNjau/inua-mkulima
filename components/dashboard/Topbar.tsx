'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { LogoutModal } from '@/components/auth/LogoutModal'

export function Topbar() {
  const { user } = useAuth()
  const [showLogout, setShowLogout] = useState(false)

  return (
    <>
      {/*
        Spec:
          width: 1366px (full); height: 80px
          background: transparent url('header.png') 0% 0% no-repeat padding-box
          — Use header.png as the ONLY background, no color overlay
      */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-8 w-full"
        style={{
          height: '80px',
          backgroundImage: 'url(/images/header.png)',
          backgroundSize: '100% 100%',     // stretch to fill exactly
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '0% 0%',
          backgroundOrigin: 'padding-box',
        }}
      >
        {/* Left — Program title */}
        <span
          className="font-bold tracking-wide"
          style={{ color: '#FFFFFF', fontSize: '18px', fontFamily: 'Poppins, sans-serif' }}
        >
          Inua Mkulima Subsidy Program
        </span>

        {/* Right — Logged in label + Logout button */}
        <div className="flex items-center gap-4">
          <span style={{ color: '#FFFFFF', fontSize: '14px' }}>
            Logged In As:{' '}
            <span className="font-bold uppercase tracking-widest">
              {user?.firstName ?? user?.username ?? 'User'}
            </span>
          </span>

          {/* Logout button — white border, icon + text */}
          <button
            id="logout-trigger-btn"
            onClick={() => setShowLogout(true)}
            aria-label="Open logout dialog"
            className="flex items-center gap-2 font-bold transition-all duration-200 hover:bg-white/10"
            style={{
              color: '#FFFFFF',
              fontSize: '14px',
              border: '1.5px solid rgba(255,255,255,0.7)',
              borderRadius: '6px',
              padding: '6px 16px',
            }}
          >
            {/* Logout icon — inline SVG so no broken image risk */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      <LogoutModal isOpen={showLogout} onClose={() => setShowLogout(false)} />
    </>
  )
}
