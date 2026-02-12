"use client"

import { useState } from "react"
import TextAnimate, { type AnimationType, type SplitBy } from "./text-animate"

const animations: AnimationType[] = [
  "fadeUp", "fadeDown", "fadeIn", "blur", "wave", "scale", "slideLeft", "slideRight"
]

export default function TextAnimateDemo() {
  const [activeType, setActiveType] = useState<AnimationType>("blur")
  const [splitBy, setSplitBy] = useState<SplitBy>("character")
  const [key, setKey] = useState(0)

  function handleChange(type: AnimationType) {
    setActiveType(type)
    setKey((k) => k + 1)
  }

  function toggleSplit() {
    setSplitBy((s) => (s === "character" ? "word" : "character"))
    setKey((k) => k + 1)
  }

  return (
    <div className="flex flex-col items-center gap-10 w-full px-4">
      <div className="min-h-[80px] flex items-center justify-center">
        <TextAnimate
          key={key}
          text="Beautiful Text Animations"
          type={activeType}
          splitBy={splitBy}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight"
          stagger={splitBy === "word" ? 0.1 : 0.03}
          once={false}
        />
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-wrap justify-center gap-2">
          {animations.map((type) => (
            <button
              key={type}
              onClick={() => handleChange(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeType === type
                  ? "bg-white text-black"
                  : "bg-white/[0.05] text-white/40 hover:bg-white/[0.08] hover:text-white/60"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <button
          onClick={toggleSplit}
          className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/[0.03] text-white/30 border border-white/[0.06] hover:bg-white/[0.06] hover:text-white/50 transition-all duration-200"
        >
          Split by: {splitBy}
        </button>
      </div>
    </div>
  )
}
