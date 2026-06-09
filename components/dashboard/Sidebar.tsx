'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard',    href: '/dashboard' },
  { label: 'Transactions', href: '/dashboard/transactions' },
  { label: 'Reports',      href: '/dashboard/reports' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-52 bg-white border-r border-brand-border flex flex-col flex-shrink-0">
      <nav className="flex-1 pt-6" aria-label="Sidebar navigation">
        {navItems.map(({ label, href }) => {
          const isActive =
            href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(href)

          return (
            <Link
              key={label}
              href={href}
              id={`sidebar-${label.toLowerCase()}-link`}
              className={cn(
                'flex items-center px-6 py-3 text-sm transition-all duration-150',
                isActive
                  ? 'text-brand-ink font-bold border-l-4 border-brand-gold bg-gray-50'
                  : 'text-brand-muted font-medium border-l-4 border-transparent hover:bg-gray-50 hover:text-brand-ink',
              )}
            >
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
