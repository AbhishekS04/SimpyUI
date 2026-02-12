"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, type ReactNode, type MouseEvent } from "react"

export interface TiltCardProps {
  children: ReactNode
  tiltAmount?: number
  glare?: boolean
  className?: string
  perspective?: number
}

export default function TiltCard({
  children,
  tiltAmount = 15,
  glare = true,
  className = "",
  perspective = 1000,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltAmount, -tiltAmount]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltAmount, tiltAmount]), {
    stiffness: 200,
    damping: 20,
  })

  const glareX = useTransform(x, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100])
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 20 })

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const normalX = (e.clientX - rect.left) / rect.width - 0.5
    const normalY = (e.clientY - rect.top) / rect.height - 0.5
    x.set(normalX)
    y.set(normalY)
    glareOpacity.set(0.15)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
    glareOpacity.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective,
      }}
      className={`relative rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden ${className}`}
    >
      {/* Content */}
      <div style={{ transform: "translateZ(40px)" }}>
        {children}
      </div>

      {/* Glare overlay */}
      {glare && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            opacity: glareOpacity,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.25), transparent 60%)`
            ),
          }}
        />
      )}
    </motion.div>
  )
}
