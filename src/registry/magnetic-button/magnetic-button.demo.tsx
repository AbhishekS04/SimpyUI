"use client"

import MagneticButton from "./magnetic-button"
import { FiArrowRight, FiZap, FiStar } from "react-icons/fi"

export default function MagneticButtonDemo() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full min-h-[200px]">
      <MagneticButton strength={0.35}>
        <span className="flex items-center gap-2">
          Get Started <FiArrowRight size={14} />
        </span>
      </MagneticButton>

      <MagneticButton
        strength={0.4}
        className="bg-transparent border border-white/20 text-white hover:border-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)]"
      >
        <span className="flex items-center gap-2">
          <FiZap size={14} /> Quick Action
        </span>
      </MagneticButton>

      <MagneticButton
        strength={0.3}
        className="bg-gradient-to-r from-brand-600 to-brand-500 text-white border-none hover:shadow-[0_0_40px_rgba(92,124,250,0.3)]"
      >
        <span className="flex items-center gap-2">
          <FiStar size={14} /> Star
        </span>
      </MagneticButton>
    </div>
  )
}
