import { Topbar } from '@/components/dashboard/Topbar'
import { Sidebar } from '@/components/dashboard/Sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard – Inua Mkulima Subsidy Program',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    /*
      Full-screen column:
        1. Topbar — full width, 80px, header.png background
        2. Row below: Sidebar (left) + Content (right)
    */
    <div className="flex flex-col h-screen overflow-hidden bg-brand-surface">

      {/* ── Header — full width ── */}
      <Topbar />

      {/* ── Body row ── */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

    </div>
  )
}
