"use client"

import Marquee from "./marquee"

const logos = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Framer", color: "#E846FF" },
  { name: "Vercel", color: "#ffffff" },
  { name: "Vite", color: "#646CFF" },
  { name: "Node.js", color: "#339933" },
]

function LogoCard({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300">
      <div
        className="w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm text-white/60 font-medium whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

export default function MarqueeDemo() {
  return (
    <div className="w-full flex flex-col gap-4 overflow-hidden">
      <Marquee speed={25} direction="left">
        {logos.map((logo) => (
          <LogoCard key={logo.name} {...logo} />
        ))}
      </Marquee>
      <Marquee speed={30} direction="right">
        {logos.map((logo) => (
          <LogoCard key={logo.name + "-2"} {...logo} />
        ))}
      </Marquee>
    </div>
  )
}
