"use client"

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { FiAlertTriangle, FiInfo, FiCheckCircle, FiXCircle } from 'react-icons/fi'

type AlertVariant = 'info' | 'success' | 'warning' | 'error'

interface AlertStyle {
  bg: string
  icon: ReactNode
}

const alertStyles: Record<AlertVariant, AlertStyle> = {
  info: { bg: 'bg-brand-600/10 border-brand-600/30', icon: <FiInfo className="text-brand-400" /> },
  success: { bg: 'bg-green-600/10 border-green-600/30', icon: <FiCheckCircle className="text-green-400" /> },
  warning: { bg: 'bg-yellow-600/10 border-yellow-600/30', icon: <FiAlertTriangle className="text-yellow-400" /> },
  error: { bg: 'bg-red-600/10 border-red-600/30', icon: <FiXCircle className="text-red-400" /> },
}

interface AlertProps {
  variant?: AlertVariant
  title?: string
  children: ReactNode
}

export default function Alert({ variant = 'info', title, children }: AlertProps) {
  const style = alertStyles[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 p-4 rounded-xl border ${style.bg}`}
    >
      <div className="mt-0.5">{style.icon}</div>
      <div>
        {title && <h4 className="text-sm font-semibold mb-1">{title}</h4>}
        <p className="text-sm">{children}</p>
      </div>
    </motion.div>
  )
}
