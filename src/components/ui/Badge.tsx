import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: 'bg-dark-500 text-dark-50',
  primary: 'bg-brand-600/20 text-brand-300 border border-brand-600/30',
  success: 'bg-green-600/20 text-green-300 border border-green-600/30',
  warning: 'bg-yellow-600/20 text-yellow-300 border border-yellow-600/30',
  danger: 'bg-red-600/20 text-red-300 border border-red-600/30',
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${badgeVariants[variant]} ${className}
      `}
    >
      {children}
    </motion.span>
  )
}
