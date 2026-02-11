import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowRight, FiCopy, FiCheck, FiPause, FiX, FiMessageSquare, FiMail, FiEye, FiMousePointer, FiUpload } from 'react-icons/fi'
import { componentRegistry } from '../registry'
import { useState, useRef, useMemo } from 'react'

/* ═══════════════════════════════════════════════════════
   FLAME / FIRE BACKGROUND COMPONENTS
   ═══════════════════════════════════════════════════════ */

function FlameParticle({ delay, left }) {
  return (
    <div
      className="flame-particle"
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
      }}
    />
  )
}

function FireBackground() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
    })), [])

  return (
    <div className="hero-fire">
      <div className="flame-layer-1" />
      <div className="flame-layer-2" />
      <div className="flame-layer-3" />
      {particles.map(p => (
        <FlameParticle key={p.id} left={p.left} delay={p.delay} />
      ))}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: 'linear-gradient(to top, rgba(0,120,255,0.15), transparent)' }}
      />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   COPY COMMAND BOX
   ═══════════════════════════════════════════════════════ */

function CopyCommand() {
  const [copied, setCopied] = useState(false)
  const command = 'npx simpyui add @simpy-ui/components'

  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cmd-box rounded-xl px-5 py-3 flex items-center gap-3 cursor-pointer group"
    >
      <code className="text-sm text-white/70 font-mono">
        <span className="text-white/40">npx</span>{' '}
        <span className="text-white/60">simpyui add</span>{' '}
        <span className="text-white/40">@simpy-ui/</span>
        <span className="text-cyan-400/70">components</span>
      </code>
      <div className="text-white/30 group-hover:text-white/60 transition-colors">
        {copied ? <FiCheck size={14} className="text-green-400" /> : <FiCopy size={14} />}
      </div>
    </motion.button>
  )
}

/* ═══════════════════════════════════════════════════════
   BENTO CARD DEMOS — custom previews for each card
   ═══════════════════════════════════════════════════════ */

/* Image Reveal Card */
function ImageRevealDemo() {
  return (
    <div className="w-24 h-32 bg-zinc-800 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500 border border-white/10 rounded-sm">
      <img
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=300&fit=crop&crop=face"
        alt="Portrait"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
    </div>
  )
}

/* Hover Members Card */
function HoverMembersDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center -space-x-2">
        {['#3f3f46','#52525b','#ef4444','#3f3f46','#52525b'].map((color, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full border-2 border-zinc-900 flex items-center justify-center ${
              i === 2 ? 'bg-rose-500 z-10' : 'bg-zinc-700'
            }`}
          >
            {i === 2 && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="3" fill="none" />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-end justify-center gap-1 h-20">
        {[50, 75, 100, 65, 85].map((h, i) => (
          <div
            key={i}
            className={`w-7 rounded-sm transition-all ${
              i === 2 || i === 4 ? 'bg-rose-600' : 'bg-rose-600/30'
            }`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  )
}

/* Details Sign In Card */
function DetailsSignInDemo() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex items-center text-2xl font-light text-slate-100">
        user@<span className="border-r-2 border-white h-7 ml-0.5 cursor-blink" />
      </div>
      <div className="mt-4 w-2/3 h-px bg-white/10" />
      <div className="mt-4 text-[10px] text-zinc-500 flex items-center gap-1">
        [ enter ↵ ]
      </div>
    </div>
  )
}

/* Dynamic Island Card */
function DynamicIslandDemo() {
  return (
    <div className="bg-black border border-white/5 rounded-full px-4 py-2 flex items-center gap-3 shadow-2xl">
      <div className="flex items-center gap-1.5">
        <div className="bg-orange-500 rounded-full p-1 w-6 h-6 flex items-center justify-center">
          <FiPause size={10} className="text-black" />
        </div>
        <div className="bg-zinc-800 rounded-full p-1 w-6 h-6 flex items-center justify-center">
          <FiX size={10} className="text-white/70" />
        </div>
      </div>
      <div className="text-[10px] uppercase tracking-widest text-orange-400 font-bold ml-1">Timer</div>
      <div className="text-base font-medium tabular-nums text-white">0:60</div>
    </div>
  )
}

/* Cursor Trail Card */
function CursorTrailDemo() {
  return (
    <div className="relative flex gap-4 opacity-30">
      <img
        src="https://images.unsplash.com/photo-1518173946687-a12ed66ba6c3?w=100&h=100&fit=crop"
        alt="Trail 1"
        className="w-16 h-16 rounded-lg shadow-2xl object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=100&h=100&fit=crop"
        alt="Trail 2"
        className="w-16 h-16 rounded-lg shadow-2xl object-cover"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-10 bg-white/20" />
    </div>
  )
}

/* Command Palette Card */
function CommandPaletteDemo() {
  return (
    <div className="bg-zinc-900 border border-white/10 rounded-full px-4 py-2.5 flex items-center gap-4 shadow-xl">
      <FiMessageSquare size={16} className="text-white/60" />
      <FiMail size={16} className="text-white/60" />
      <FiEye size={16} className="text-white/60" />
      <FiMousePointer size={16} className="text-white/60" />
      <FiUpload size={16} className="text-white/60" />
    </div>
  )
}

/* Image Scroller Card */
function ImageScrollerDemo() {
  const emojis = ['🍝', '🐟', '🦁']
  return (
    <div className="flex flex-col gap-4 items-center">
      {emojis.map((e, i) => (
        <div key={i} className="w-16 h-16 bg-zinc-900 rounded-xl border border-white/5 flex items-center justify-center text-3xl hover:scale-110 transition-transform shadow-lg">
          {e}
        </div>
      ))}
    </div>
  )
}

/* Item Selector Card */
function ItemSelectorDemo() {
  const emojis = ['🧴', '🗑️', '🍺']
  return (
    <div className="flex flex-col gap-4 items-center">
      {emojis.map((e, i) => (
        <div key={i} className="w-16 h-16 bg-zinc-900 rounded-xl border border-white/5 flex items-center justify-center text-3xl hover:scale-110 transition-transform shadow-lg">
          {e}
        </div>
      ))}
    </div>
  )
}

/* Token Swap Card */
function TokenSwapDemo() {
  return (
    <div className="w-full max-w-sm space-y-3 mx-auto">
      {/* From */}
      <div className="bg-zinc-900/50 border border-zinc-800 p-4 px-5 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white text-xs font-bold">
              Ξ
            </div>
            <div>
              <div className="text-sm font-semibold">Ethereum</div>
              <div className="text-[10px] text-zinc-500">111.82 ETH</div>
            </div>
          </div>
          <button className="text-[10px] font-semibold px-2.5 py-1 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors text-zinc-300">
            Use Max
          </button>
        </div>
        <div className="text-4xl font-medium text-center py-2 text-white">0</div>
        <div className="flex items-center justify-center gap-1 text-xs text-zinc-500 mt-1">
          <span>≈</span>
          <span>$0.00</span>
          <span>↕</span>
        </div>
      </div>

      {/* Swap arrow */}
      <div className="flex justify-center -my-5 relative z-10">
        <div className="bg-zinc-900 border border-zinc-800 p-1.5 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* To */}
      <div className="bg-zinc-900/50 border border-zinc-800 p-4 px-5 rounded-2xl flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-zinc-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
          <div>
            <div className="text-sm font-semibold">Aave</div>
            <div className="text-[10px] text-zinc-500">Receive AAVE</div>
          </div>
        </div>
        <div className="text-xl font-medium text-white">0</div>
      </div>

      {/* Button */}
      <button className="w-full py-3 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 font-medium rounded-xl transition-all border border-transparent hover:border-zinc-700 uppercase tracking-widest text-[10px]">
        Clear Transaction
      </button>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   BENTO CARD WRAPPER
   ═══════════════════════════════════════════════════════ */

function BentoCard({ title, children, className = '', index = 0, link }) {
  const inner = (
    <div className={`bento-card group ${className}`}>
      <div className="blue-dot" />
      <div className="bento-card-title">{title}</div>
      <div className="bento-card-preview">
        {children}
      </div>
    </div>
  )

  if (link) {
    return <Link to={link} className="block">{inner}</Link>
  }
  return inner
}

/* ═══════════════════════════════════════════════════════
   MAIN HOME PAGE
   ═══════════════════════════════════════════════════════ */

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, -60])

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: '#000' }}
      >
        <div
          className="absolute inset-0 z-0"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 40%, transparent 0%, #000 100%)' }}
        />
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full animate-smoke"
            style={{ background: 'radial-gradient(circle, rgba(0,100,255,0.08) 0%, transparent 70%)' }}
          />
          <div
            className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full animate-smoke"
            style={{ background: 'radial-gradient(circle, rgba(0,150,255,0.06) 0%, transparent 70%)', animationDelay: '2s' }}
          />
        </div>

        <FireBackground />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase text-white/50 mb-8"
          >
            SimpyUI's
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.9] tracking-tight mb-4"
          >
            <span className="gradient-text">Un-Common</span>
            <br />
            <span className="gradient-text-blue">Components</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mt-6 mb-14"
          >
            For React / Next.js
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <CopyCommand />
            <Link to="/components">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-shadow cursor-pointer"
              >
                Quick Start
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
      </section>

      {/* ═══════════════════════════════════════════
          OUTSTANDING COMPONENTS — Bento Grid
          ═══════════════════════════════════════════ */}
      <section className="relative py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">

          {/* Section Header */}
          <div className="text-center mb-12 md:mb-20 space-y-4">
            <div className="inline-block px-3 py-1 text-[10px] font-medium tracking-widest uppercase bg-zinc-800 text-zinc-400 rounded-full border border-zinc-700">
              {componentRegistry.length}+ and counting
            </div>
            <h2
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Outstanding components
            </h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed pt-1">
              No extra packages — just one file for each component.
              <br className="hidden sm:block" />
              Use directly with your fav CLI.
            </p>
          </div>

          {/* ── Bento Grid Container ── */}
          <div className="bento-outer">

            {/* Top area: 3-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

              {/* Left 2 columns — 2x3 grid of small cards */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">

                <BentoCard title="Image Reveal" index={0} link="/components/button">
                  <ImageRevealDemo />
                </BentoCard>

                <BentoCard title="Hover Members" index={1} link="/components/badge">
                  <HoverMembersDemo />
                </BentoCard>

                <BentoCard title="Details Sign In" index={2} link="/components/input">
                  <DetailsSignInDemo />
                </BentoCard>

                <BentoCard title="Dynamic Island" index={3} link="/components/toast">
                  <DynamicIslandDemo />
                </BentoCard>

                <BentoCard title="Cursor Trail" index={4} link="/components/tooltip">
                  <CursorTrailDemo />
                </BentoCard>

                <BentoCard title="Command Palette" index={5} link="/components/modal">
                  <CommandPaletteDemo />
                </BentoCard>

              </div>

              {/* Right column — 2 tall stacked cards */}
              <div className="grid grid-rows-2 gap-4 md:gap-6">

                <BentoCard title="Image Scroller" index={6} link="/components/accordion" className="h-full">
                  <ImageScrollerDemo />
                </BentoCard>

                <BentoCard title="Item Selector" index={7} link="/components/tabs" className="h-full">
                  <ItemSelectorDemo />
                </BentoCard>

              </div>

            </div>

            {/* Bottom full-width card */}
            <div className="mt-4 md:mt-6">
              <BentoCard title="Aave Token Swap" index={8} link="/components/card">
                <div className="py-4 w-full">
                  <TokenSwapDemo />
                </div>
              </BentoCard>
            </div>

          </div>

          {/* Explore All Link */}
          <div className="text-center mt-16 md:mt-20">
            <Link
              to="/components"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors group"
            >
              <span className="font-medium">Explore all components</span>
              <FiArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA SECTION — Hands reaching toward badge
          ═══════════════════════════════════════════ */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden bg-black">
        {/* Subtle radial glow behind badge */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, rgba(0,120,255,0.4), transparent 70%)' }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl mx-auto"
        >
          {/* Subtitle */}
          <p className="text-[10px] md:text-xs font-semibold tracking-[0.35em] uppercase text-white/40 mb-5">
            Join Us
          </p>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.15] mb-16 md:mb-24">
            Get your SimpyUI's{' '}
            <span className="gradient-text-blue">Pro badge</span>
            <br />
            now
          </h2>

          {/* ── Hands + Badge Composition ── */}
          <div className="relative w-full max-w-4xl mx-auto h-[280px] sm:h-[340px] md:h-[420px] select-none">

            {/* Left Hand — ASCII Art */}
            <motion.pre
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="absolute left-0 bottom-0 text-[3.5px] sm:text-[5px] md:text-[6.5px] lg:text-[8px] leading-[1.05] text-white/[0.65] pointer-events-none font-mono whitespace-pre"
              style={{ textShadow: '0 0 20px rgba(255,255,255,0.08)' }}
            >{`
                                          .:
                                        .:::.
                                       .:::::.
                                      .:::::::.
                                     .:::::::::.
                                    ::::::::::::.
                                   .:::::::::::::
                                  .::::::::::::-
                                  ::::::::::::
                                 ::::::::::::
                                .::::::::::
                               .:::::::::-
                 .::::::..    .::::::::::
                :::::::::::::::::::::::::
               .:::::::::::::::::::::::::
              .:::::::::::::::::::::::::::
             .::::::::::::::::::::::::::::.
            .:::::::::::::::::::::::::::::::
           .::::::::::::::::::::::::::::::::
          .:::::::::::::::::::::::::::::::::
          ::::::::::::::::::::::::::::::::::
         :::::::::::::::::::::::::::::::::::
         .::::::::::::::::::::::::::::::::::
          .:::::::::::::::::::::::::::::::::
           .::::::::::::::::::::::::::::::-
            :::::::::::::::::::::::::::::
             .::::::::::::::::::::::::-
              .::::::::::::::::::::::.
                .::::::::::::::::::.
                  .::::::::::::::.
                     ..::::::..`}</motion.pre>

            {/* Right Hand — ASCII Art */}
            <motion.pre
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="absolute right-0 bottom-0 text-[3.5px] sm:text-[5px] md:text-[6.5px] lg:text-[8px] leading-[1.05] text-white/[0.65] pointer-events-none font-mono whitespace-pre"
              style={{ textShadow: '0 0 20px rgba(255,255,255,0.08)' }}
            >{`
              :.
            .:::.
           .:::::.
          .:::::::.
         .:::::::::.
        .:::::::::::
        :::::::::::.
         -:::::::::.
          ::::::::.
          ::::::::.
           :::::::::
            -:::::::::.
             :::::::::::.   ..:::::::.
             ::::::::::::::::::::::::::
            .::::::::::::::::::::::::::.
           .::::::::::::::::::::::::::::
          .::::::::::::::::::::::::::::::
         ::::::::::::::::::::::::::::::::.
        .:::::::::::::::::::::::::::::::::.
        .::::::::::::::::::::::::::::::::::.
        :::::::::::::::::::::::::::::::::::
       :::::::::::::::::::::::::::::::::::.
       ::::::::::::::::::::::::::::::::::.
       ::::::::::::::::::::::::::::::::.
        -:::::::::::::::::::::::::::::.
          ::::::::::::::::::::::::::::
           .::::::::::::::::::::::::.
            .::::::::::::::::::::.
              .:::::::::::::::::
                ..:::::::::::..
                    ..:::::..`}</motion.pre>

            {/* ── Center rotating badge ── */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              {/* Rotating outer ring with text */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
              >
                <svg viewBox="0 0 120 120" className="w-full h-full">
                  {/* Gear/badge teeth */}
                  {Array.from({ length: 24 }).map((_, i) => {
                    const angle = (i * 15) * Math.PI / 180
                    const inner = 42
                    const outer = i % 2 === 0 ? 50 : 46
                    return (
                      <line
                        key={i}
                        x1={60 + inner * Math.cos(angle)}
                        y1={60 + inner * Math.sin(angle)}
                        x2={60 + outer * Math.cos(angle)}
                        y2={60 + outer * Math.sin(angle)}
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    )
                  })}
                  {/* Outer circle */}
                  <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                  <circle cx="60" cy="60" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  {/* Rotating text */}
                  <defs>
                    <path id="badgeTextPath" d="M 60, 60 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                  </defs>
                  <text fill="rgba(255,255,255,0.2)" fontSize="6" fontWeight="600" letterSpacing="3" fontFamily="monospace">
                    <textPath href="#badgeTextPath">
                      SIMPYUI · SIMPYUI · SIMPYUI ·{' '}
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Center logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-xl shadow-blue-600/30">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.15)" />
                    <path d="M12 6C12 6 8 10 8 14c0 2.2 1.8 4 4 4s4-1.8 4-4c0-4-4-8-4-8z" fill="white" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="py-8 px-6 bg-black border-t border-white/[0.03]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-white/25 tracking-wide">
            Design and Developed by <span className="text-white/40">@SimpyUI</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
