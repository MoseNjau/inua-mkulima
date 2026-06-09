'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Dashboard',    href: '/dashboard',              activePaths: ['/dashboard', '/dashboard/products', '/dashboard/summary'] },
  { label: 'Transactions', href: '/dashboard/transactions', activePaths: ['/dashboard/transactions'] },
  { label: 'Reports',      href: '/dashboard/reports',      activePaths: ['/dashboard/reports'] },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-52 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
      <nav className="flex-1 pt-6" aria-label="Sidebar navigation">
        {navItems.map(({ label, href, activePaths }) => {
          const isActive = activePaths.some(p => pathname === p || pathname.startsWith(`${p}/`))

          return (
            <Link
              key={label}
              href={href}
              id={`sidebar-${label.toLowerCase()}-link`}
              className="flex items-center text-sm transition-all duration-150 hover:bg-gray-50"
              style={{
                height:          '48px',
                paddingLeft:     isActive ? '18px' : '24px', // compensate for 6px bar
                borderLeft:      isActive ? '6px solid #E8B40A' : '6px solid transparent',
                color:           isActive ? '#272935' : '#707070',
                fontWeight:      isActive ? 700 : 400,
                textDecoration:  'none',
              }}
            >
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
