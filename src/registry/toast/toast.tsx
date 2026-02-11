"use client"

import { type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi'

type ToastVariant = 'success' | 'error' | 'info'

interface ToastStyle {
  bg: string
  icon: ReactNode
}

const toastVariants: Record<ToastVariant, ToastStyle> = {
  success: { bg: 'bg-green-600/10 border-green-600/30', icon: <FiCheckCircle className="text-green-400" /> },
  error: { bg: 'bg-red-600/10 border-red-600/30', icon: <FiAlertCircle className="text-red-400" /> },
  info: { bg: 'bg-brand-600/10 border-brand-600/30', icon: <FiInfo className="text-brand-400" /> },
}

interface ToastProps {
  show: boolean
  onClose: () => void
  message: string
  variant?: ToastVariant
}

export default function Toast({ show, onClose, message, variant = 'info' }: ToastProps) {
  const style = toastVariants[variant]

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`inline-flex items-center gap-3 px-4 py-3 rounded-xl border ${style.bg}`}
        >
          {style.icon}
          <span className="text-sm">{message}</span>
          <button onClick={onClose} className="cursor-pointer">
            <FiX size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
