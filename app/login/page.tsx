import type { Metadata } from 'next'
import { UsernameForm } from '@/components/auth/UsernameForm'

export const metadata: Metadata = {
  title: 'Sign In – Inua Mkulima Subsidy Program',
}

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        {/* "WELCOME TO" — small, grey, uppercase */}
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

        {/* Heading — Futura Bold, green, 2 exact lines forced with block spans */}
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

        <p
          style={{
            fontSize:   '14px',
            color:      '#707070',
            marginTop:  '8px',
          }}
        >
          Enter your username to continue
        </p>
      </div>

      <UsernameForm />
    </div>
  )
}
