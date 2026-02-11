import { motion } from 'framer-motion'

export default function Skeleton({
  width = '100%',
  height = '20px',
  rounded = 'lg',
  className = '',
}) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className={`bg-dark-500 rounded-${rounded} ${className}`}
      style={{ width, height }}
    />
  )
}
