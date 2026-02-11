import { motion } from 'framer-motion'

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: AvatarSize
  className?: string
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
}

export default function Avatar({
  src,
  alt = '',
  fallback,
  size = 'md',
  className = '',
}: AvatarProps) {
  if (src) {
    return (
      <motion.img
        whileHover={{ scale: 1.05 }}
        src={src}
        alt={alt}
        className={`
          ${sizeClasses[size]} rounded-full object-cover border-2 border-dark-400
          ${className}
        `}
      />
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`
        ${sizeClasses[size]} rounded-full bg-brand-600 flex items-center justify-center
        font-semibold text-white border-2 border-dark-400
        ${className}
      `}
    >
      {fallback || alt?.charAt(0)?.toUpperCase() || '?'}
    </motion.div>
  )
}
