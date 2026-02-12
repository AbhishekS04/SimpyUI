"use client"

import TiltCard from "./tilt-card"

export default function TiltCardDemo() {
  return (
    <div className="flex items-center justify-center w-full">
      <TiltCard className="w-full max-w-[320px] cursor-pointer">
        <div className="p-8 flex flex-col gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-lg font-bold">
            S
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Tilt Card</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              Hover over this card to see the 3D tilt effect with a glare spotlight.
            </p>
          </div>
          <div className="flex gap-2 mt-2">
            <span className="px-3 py-1 rounded-full bg-white/[0.05] text-[11px] text-white/40">3D</span>
            <span className="px-3 py-1 rounded-full bg-white/[0.05] text-[11px] text-white/40">Interactive</span>
            <span className="px-3 py-1 rounded-full bg-white/[0.05] text-[11px] text-white/40">Glare</span>
          </div>
        </div>
      </TiltCard>
    </div>
  )
}
