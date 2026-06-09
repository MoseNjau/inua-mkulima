'use client'

interface SelectedProductRowProps {
  name:      string
  quantity:  number
  price:     number
  total:     number
  deduction: number
  onRemove:  () => void
}

export function SelectedProductRow({
  name, quantity, price, total, deduction, onRemove,
}: SelectedProductRowProps) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Product name */}
      <td className="py-2.5 px-3 text-xs" style={{ color: '#707070' }}>{name}</td>

      {/* Qty — small bordered box like design */}
      <td className="py-2.5 px-3 text-center">
        <span
          className="inline-flex items-center justify-center text-xs font-medium"
          style={{
            minWidth: '28px',
            height:   '22px',
            border:   '1px solid #CCCCCC',
            borderRadius: '3px',
            color: '#272935',
            padding: '0 4px',
          }}
        >
          {quantity}
        </span>
      </td>

      {/* Price */}
      <td className="py-2.5 px-3 text-xs text-right" style={{ color: '#707070' }}>
        {price.toLocaleString('en-KE')} kes
      </td>

      {/* Total */}
      <td className="py-2.5 px-3 text-xs text-right" style={{ color: '#707070' }}>
        {total.toLocaleString('en-KE')} kes
      </td>

      {/* Deduction — bordered box like design */}
      <td className="py-2.5 px-3 text-right">
        <span
          className="inline-flex items-center justify-center text-xs font-medium"
          style={{
            minWidth:     '48px',
            height:       '22px',
            border:       '1px solid #CCCCCC',
            borderRadius: '3px',
            color:        '#272935',
            padding:      '0 6px',
          }}
        >
          {deduction.toFixed(0)}
        </span>
      </td>

      {/* ⊖ remove button — outlined circle */}
      <td className="py-2.5 px-2 text-right">
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${name}`}
          className="inline-flex items-center justify-center transition-all duration-150 hover:opacity-60 active:scale-95"
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
          −
        </button>
      </td>
    </tr>
  )
}
