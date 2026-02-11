import { motion } from 'framer-motion'

export default function Progress({ value = 0, max = 100, size = 'md', color = 'brand' }) {
  const percentage = Math.min((value / max) * 100, 100)

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  const colors = {
    brand: 'bg-brand-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
  }

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
