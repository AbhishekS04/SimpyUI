"use client"

import { motion, type HTMLMotionProps } from 'framer-motion'
import { type ReactNode } from 'react'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export default function Card({
  children,
  className = '',
  hover = true,
  glow = false,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : {}}
      className={`
        rounded-xl border border-dark-400/50 bg-dark-700/50 backdrop-blur-sm
        p-6 transition-all duration-300
        ${hover ? 'hover:border-dark-300/50' : ''}
        ${glow ? 'glow-sm' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  )
}
