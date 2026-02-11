import { motion, AnimatePresence } from 'framer-motion'
import { FiAlertTriangle, FiInfo, FiCheckCircle, FiXCircle } from 'react-icons/fi'

const alertStyles = {
  info: {
    bg: 'bg-brand-600/10 border-brand-600/30',
    icon: <FiInfo className="text-brand-400 flex-shrink-0" size={18} />,
    text: 'text-brand-200',
  },
  success: {
    bg: 'bg-green-600/10 border-green-600/30',
    icon: <FiCheckCircle className="text-green-400 flex-shrink-0" size={18} />,
    text: 'text-green-200',
  },
  warning: {
    bg: 'bg-yellow-600/10 border-yellow-600/30',
    icon: <FiAlertTriangle className="text-yellow-400 flex-shrink-0" size={18} />,
    text: 'text-yellow-200',
  },
  error: {
    bg: 'bg-red-600/10 border-red-600/30',
    icon: <FiXCircle className="text-red-400 flex-shrink-0" size={18} />,
    text: 'text-red-200',
  },
}

export default function Alert({ variant = 'info', title, children }) {
  const style = alertStyles[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 p-4 rounded-xl border ${style.bg}`}
    >
      <div className="mt-0.5">{style.icon}</div>
      <div>
        {title && (
          <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
        )}
        <p className={`text-sm ${style.text}`}>{children}</p>
      </div>
    </motion.div>
  )
}
