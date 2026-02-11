import { motion } from 'framer-motion'

export default function Tooltip({ children, text, position = 'top' }) {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div className="relative inline-block group">
      {children}
      <div
        className={`
          absolute ${positionClasses[position]} z-50
          pointer-events-none opacity-0 group-hover:opacity-100
          transition-opacity duration-200
        `}
      >
        <div className="px-3 py-1.5 rounded-lg bg-dark-500 border border-dark-400/50 text-xs text-white font-medium whitespace-nowrap shadow-xl">
          {text}
        </div>
      </div>
    </div>
  )
}
