"use client"

import { motion } from 'framer-motion'

type ProgressSize = 'sm' | 'md' | 'lg'
type ProgressColor = 'brand' | 'green' | 'red' | 'yellow'

interface ProgressProps {
  value?: number
  max?: number
  size?: ProgressSize
  color?: ProgressColor
}

const heights: Record<ProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
}

const colors: Record<ProgressColor, string> = {
  brand: 'bg-brand-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-500',
}

export default function Progress({ value = 0, max = 100, size = 'md', color = 'brand' }: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={`w-full ${heights[size]} bg-dark-500 rounded-full overflow-hidden`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`h-full ${colors[color]} rounded-full`}
      />
    </div>
  )
}
