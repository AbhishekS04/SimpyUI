import { motion } from 'framer-motion'

interface SkeletonProps {
  width?: string
  height?: string
  rounded?: string
  className?: string
}

export default function Skeleton({ width = '100%', height = '20px', rounded = 'lg', className = '' }: SkeletonProps) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className={`bg-dark-500 rounded-${rounded} ${className}`}
      style={{ width, height }}
    />
  )
}
