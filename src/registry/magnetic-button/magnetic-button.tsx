"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useRef, type ReactNode, type MouseEvent } from "react"

export interface MagneticButtonProps {
  children: ReactNode
  strength?: number
  radius?: number
  className?: string
  onClick?: () => void
}

export default function MagneticButton({
  children,
  strength = 0.35,
  radius = 200,
  className = "",
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const x = useSpring(0, { stiffness: 200, damping: 15 })
  const y = useSpring(0, { stiffness: 200, damping: 15 })

  function handleMouseMove(e: MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distX = e.clientX - centerX
    const distY = e.clientY - centerY
    const distance = Math.sqrt(distX * distX + distY * distY)

    if (distance < radius) {
      const pull = (1 - distance / radius) * strength
      x.set(distX * pull)
      y.set(distY * pull)
    }
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`relative px-8 py-4 rounded-2xl bg-white text-black font-semibold text-sm transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] ${className}`}
    >
      {children}
    </motion.button>
  )
}
