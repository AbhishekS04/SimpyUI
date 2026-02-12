"use client"

import { motion, type Variants } from "framer-motion"
import { type ReactNode } from "react"

export type MarqueeDirection = "left" | "right"

export interface MarqueeProps {
  children: ReactNode
  speed?: number
  direction?: MarqueeDirection
  pauseOnHover?: boolean
  className?: string
  gap?: number
}

export default function Marquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className = "",
  gap = 16,
}: MarqueeProps) {
  const directionMultiplier = direction === "left" ? -1 : 1

  return (
    <div
      className={`overflow-hidden flex ${className}`}
      style={{ gap }}
    >
      {[0, 1].map((copy) => (
        <motion.div
          key={copy}
          className="flex flex-shrink-0"
          style={{ gap }}
          animate={{
            x: [
              directionMultiplier > 0 ? "-50%" : "0%",
              directionMultiplier > 0 ? "0%" : "-50%",
            ],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
            },
          }}
          {...(pauseOnHover && {
            whileHover: { animationPlayState: "paused" } as any,
          })}
        >
          {children}
        </motion.div>
      ))}
    </div>
  )
}
