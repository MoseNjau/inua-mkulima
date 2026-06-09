'use client'

interface ProductRowProps {
  name:  string
  price: number
  onAdd: () => void
}

export function ProductRow({ name, price, onAdd }: ProductRowProps) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="py-2.5 px-4 text-sm" style={{ color: '#707070' }}>{name}</td>
      <td className="py-2.5 px-4 text-sm text-right" style={{ color: '#707070' }}>
        {price.toLocaleString('en-KE')} kes
      </td>
      <td className="py-2.5 px-3 text-right w-10">
        {/* Outlined circle ⊕ matching design */}
        <button
          type="button"
          onClick={onAdd}
          aria-label={`Add ${name}`}
          className="inline-flex items-center justify-center transition-all duration-150 hover:opacity-70 active:scale-95"
          style={{
            width:  '22px',
            height: '22px',
            borderRadius: '50%',
            border: '2px solid #272935',
            background: 'transparent',
            color: '#272935',
            fontSize: '16px',
            lineHeight: 1,
            cursor: 'pointer',
          }}
        >
          +
        </button>
      </td>
    </tr>
  )
}
