import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Extend twMerge so it knows text-{hero|title|body|label|small|btn}
// are font-size utilities, NOT color utilities — prevents them stripping text-white etc.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['hero', 'title', 'body', 'label', 'small', 'btn'] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
