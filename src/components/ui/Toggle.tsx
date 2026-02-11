import { motion } from 'framer-motion'

interface ToggleProps {
  enabled: boolean
  onChange: (value: boolean) => void
  label?: string
}

export default function Toggle({ enabled, onChange, label }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className="flex items-center gap-3 cursor-pointer group"
    >
      <div
        className={`
          relative w-11 h-6 rounded-full transition-colors duration-300
          ${enabled ? 'bg-brand-600' : 'bg-dark-400'}
        `}
      >
        <motion.div
          animate={{ x: enabled ? 20 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
        />
      </div>
      {label && (
        <span className="text-sm text-dark-50 group-hover:text-white transition-colors">
          {label}
        </span>
      )}
    </button>
  )
}
