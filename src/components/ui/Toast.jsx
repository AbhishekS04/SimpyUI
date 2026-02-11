import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi'

const toastVariants = {
  success: {
    bg: 'bg-green-600/10 border-green-600/30',
    icon: <FiCheckCircle className="text-green-400" size={18} />,
  },
  error: {
    bg: 'bg-red-600/10 border-red-600/30',
    icon: <FiAlertCircle className="text-red-400" size={18} />,
  },
  info: {
    bg: 'bg-brand-600/10 border-brand-600/30',
    icon: <FiInfo className="text-brand-400" size={18} />,
  },
}

export default function Toast({ show, onClose, message, variant = 'info' }) {
  const style = toastVariants[variant]

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className={`
            inline-flex items-center gap-3 px-4 py-3 rounded-xl border
            ${style.bg} backdrop-blur-sm shadow-xl
          `}
        >
          {style.icon}
          <span className="text-sm text-white">{message}</span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-dark-100 hover:text-white hover:bg-dark-500/50 transition-colors cursor-pointer"
          >
            <FiX size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
