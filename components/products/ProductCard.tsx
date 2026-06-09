'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import type { Product } from '@/types'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product:  Product
  onClick?: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { title, thumbnail, category, price, rating } = product

  return (
    <button
      type="button"
      onClick={onClick}
      id={`product-card-${product.id}`}
      className={cn(
        'group bg-white rounded-2xl shadow-panel border border-brand-border overflow-hidden',
        'flex flex-col text-left transition-all duration-200',
        'hover:shadow-card hover:-translate-y-1 hover:border-brand-green/40',
        'focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2',
      )}
    >
      <div className="relative h-44 bg-gray-50 overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="inline-block bg-green-50 text-brand-green text-xs font-semibold px-2 py-0.5 rounded-full capitalize">
          {category}
        </span>
        <h3 className="text-brand-ink font-semibold text-sm leading-snug line-clamp-2">
          {title}
        </h3>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-brand-green font-bold text-base">
            KES {price.toFixed(2)}
          </span>
          <span className="flex items-center gap-1 text-yellow-500 text-xs font-semibold">
            <Star className="w-3 h-3 fill-yellow-500" />
            {rating.toFixed(1)}
          </span>
        </div>
      </div>
    </button>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-panel border border-brand-border overflow-hidden flex flex-col animate-pulse">
      <div className="h-44 bg-gray-200" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 bg-gray-200 rounded w-20" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="flex justify-between mt-auto">
          <div className="h-5 bg-gray-200 rounded w-16" />
          <div className="h-4 bg-gray-200 rounded w-10" />
        </div>
      </div>
    </div>
  )
}
