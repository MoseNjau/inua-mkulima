'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { LogoutModal } from '@/components/auth/LogoutModal'

export function Topbar() {
  const { user } = useAuth()
  const [showLogout, setShowLogout] = useState(false)

  return (
    <>
      <header
        className="h-16 flex items-center justify-between px-6 flex-shrink-0 relative overflow-hidden"
        style={{ background: '#2C4A2E' }}
      >
        {/* Background header image */}
        <Image
          src="/images/header.png"
          alt=""
          fill
          className="object-cover opacity-60 pointer-events-none"
          aria-hidden="true"
          priority
        />

        {/* Left — Program title */}
        <span className="relative z-10 text-white font-bold text-base tracking-wide">
          Inua Mkulima Subsidy Program
        </span>

        {/* Right — Logged in + logout */}
        <div className="relative z-10 flex items-center gap-4">
          <span className="text-white text-sm">
            Logged In As:{' '}
            <span className="font-bold uppercase tracking-wide">
              {user?.firstName ?? user?.username ?? 'User'}
            </span>
          </span>
          <button
            id="logout-trigger-btn"
            onClick={() => setShowLogout(true)}
            aria-label="Logout"
            className="flex items-center gap-2 text-white text-sm font-bold px-4 py-2 rounded-md transition-all duration-200 hover:bg-white/10"
            style={{ border: '1.5px solid rgba(255,255,255,0.6)' }}
          >
            <Image src="/images/sign-out.svg" alt="" width={16} height={16} aria-hidden="true" />
            Logout
          </button>
        </div>
      </header>

      <LogoutModal isOpen={showLogout} onClose={() => setShowLogout(false)} />
    </>
  )
}
