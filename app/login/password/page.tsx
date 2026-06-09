import { Suspense } from 'react'
import type { Metadata } from 'next'
import { PasswordForm } from '@/components/auth/PasswordForm'
import { Spinner } from '@/components/ui/Spinner'

export const metadata: Metadata = {
  title: 'Sign In – Inua Mkulima Subsidy Program',
}

export default function PasswordPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <p
          style={{
            fontSize:      '13px',
            fontWeight:    600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color:         '#707070',
          }}
        >
          WELCOME TO
        </p>

        <h1
          style={{
            fontFamily: 'Futura, "Trebuchet MS", "Century Gothic", sans-serif',
            fontWeight: 700,
            color:      '#009438',
            lineHeight: 1.2,
          }}
        >
          <span style={{ display: 'block', fontSize: '34px' }}>Inua Mkulima -</span>
          <span style={{ display: 'block', fontSize: '34px' }}>Subsidy Program</span>
        </h1>

        <p style={{ fontSize: '14px', color: '#707070', marginTop: '8px' }}>
          Enter your password to continue
        </p>
      </div>

      <Suspense fallback={<Spinner />}>
        <PasswordForm />
      </Suspense>
    </div>
  )
}
