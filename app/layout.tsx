import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/providers/QueryProvider'
import { AuthProvider } from '@/providers/AuthProvider'

const poppins = Poppins({
  subsets:  ['latin'],
  weight:   ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display:  'swap',
})

export const metadata: Metadata = {
  title:       'Inua Mkulima – Subsidy Program',
  description: 'Co-op Bank Inua Mkulima Subsidy Program portal for agro-dealers to process farmer subsidies.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins bg-brand-surface text-brand-ink antialiased min-h-screen">
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
