"use client"

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion"
import { useRef, type ReactNode } from "react"

export interface DockItemProps {
  icon: ReactNode
  label: string
  onClick?: () => void
}

export interface DockProps {
  items: DockItemProps[]
  magnification?: number
  distance?: number
  baseSize?: number
  className?: string
}

function DockIcon({
  mouseX,
  item,
  baseSize,
  magnification,
  distance,
}: {
  mouseX: MotionValue<number>
  item: DockItemProps
  baseSize: number
  magnification: number
  distance: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  const distanceFromMouse = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const scaleRaw = useTransform(distanceFromMouse, [-distance, 0, distance], [1, magnification / baseSize, 1])
  const scale = useSpring(scaleRaw, { mass: 0.1, stiffness: 200, damping: 15 })

  const size = useTransform(scale, (s: number) => s * baseSize)

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      className="relative group flex items-center justify-center"
    >
      <motion.button
        onClick={item.onClick}
        className="w-full h-full rounded-2xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.15] transition-colors duration-200 shadow-lg"
        whileTap={{ scale: 0.9 }}
      >
        {item.icon}
      </motion.button>

      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-white/10 text-[11px] text-white/80 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl">
        {item.label}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1a1a] border-r border-b border-white/10 rotate-45" />
      </div>
    </motion.div>
  )
}

export default function Dock({
  items,
  magnification = 70,
  distance = 150,
  baseSize = 48,
  className = "",
}: DockProps) {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`flex items-end gap-2 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl ${className}`}
      style={{
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {items.map((item, i) => (
        <DockIcon
          key={i}
          mouseX={mouseX}
          item={item}
          baseSize={baseSize}
          magnification={magnification}
          distance={distance}
        />
      ))}
    </motion.div>
  )
}
