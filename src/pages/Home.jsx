import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiCopy, FiCheck, FiChevronDown } from 'react-icons/fi'
import { componentRegistry } from '../registry'
import { useState, useRef, useMemo } from 'react'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Input from '../components/ui/Input'
import Toggle from '../components/ui/Toggle'
import Avatar from '../components/ui/Avatar'
import Progress from '../components/ui/Progress'
import Skeleton from '../components/ui/Skeleton'
import Tooltip from '../components/ui/Tooltip'

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
   BENTO MINI DEMOS — compact interactive previews
   ═══════════════════════════════════════════════════════ */

function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center">
      <Button variant="primary" size="sm">Primary</Button>
      <Button variant="outline" size="sm">Outline</Button>
      <Button variant="danger" size="sm">Danger</Button>
    </div>
  )
}

function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
    </div>
  )
}

function InputDemo() {
  return (
    <div className="w-full max-w-[220px] space-y-3">
      <Input label="Email" placeholder="you@example.com" />
      <Input label="Password" type="password" placeholder="••••••••" />
    </div>
  )
}

function ToggleDemo() {
  const [t1, setT1] = useState(true)
  const [t2, setT2] = useState(false)
  return (
    <div className="flex flex-col gap-4 items-center">
      <Toggle enabled={t1} onChange={setT1} label="Notifications" />
      <Toggle enabled={t2} onChange={setT2} label="Dark mode" />
    </div>
  )
}

function AvatarDemo() {
  return (
    <div className="flex items-center gap-3 justify-center">
      <Avatar alt="John" size="sm" />
      <Avatar alt="Alice" size="md" />
      <Avatar alt="Bob" size="lg" />
      <Avatar src="https://i.pravatar.cc/150?img=32" alt="User" size="lg" />
    </div>
  )
}

function ProgressDemo() {
  return (
    <div className="w-full max-w-[220px] space-y-3">
      <Progress value={75} color="brand" size="sm" />
      <Progress value={50} color="green" size="md" />
      <Progress value={30} color="red" size="lg" />
    </div>
  )
}

function AccordionMiniDemo() {
  const [open, setOpen] = useState(null)
  const items = [
    { title: 'What is SimpyUI?', content: 'A beautiful React component library.' },
    { title: 'Is it free?', content: 'Yes, completely free and open source.' },
    { title: 'How to install?', content: 'Just copy the component code.' },
  ]
  return (
    <div className="w-full max-w-[280px] space-y-1.5">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border border-white/5 bg-white/[0.03] overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium text-white/80 hover:text-white transition-colors"
          >
            {item.title}
            <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <FiChevronDown size={12} />
            </motion.div>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-3 pb-2.5 text-[11px] text-white/50">{item.content}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

function SkeletonDemo() {
  return (
    <div className="w-full max-w-[220px] space-y-2.5">
      <Skeleton width="100%" height="10px" />
      <Skeleton width="80%" height="10px" />
      <Skeleton width="60%" height="10px" />
      <div className="flex items-center gap-3 mt-3">
        <Skeleton width="36px" height="36px" rounded="full" />
        <div className="space-y-2 flex-1">
          <Skeleton width="100%" height="8px" />
          <Skeleton width="70%" height="8px" />
        </div>
      </div>
    </div>
  )
}

function TooltipDemo() {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-center">
      <Tooltip text="Top tooltip" position="top">
        <Button variant="outline" size="sm">Top</Button>
      </Tooltip>
      <Tooltip text="Bottom" position="bottom">
        <Button variant="outline" size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip text="Right" position="right">
        <Button variant="outline" size="sm">Right</Button>
      </Tooltip>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   BENTO CARD WRAPPER — interactive preview, card bg navigates
   ═══════════════════════════════════════════════════════ */

function BentoCard({ title, children, className = '', link }) {
  const navigate = useNavigate()

  const handleCardClick = (e) => {
    // If the click target is inside an interactive element, don't navigate
    const interactive = e.target.closest('button, input, a, [role="button"], label')
    if (interactive) return
    if (link) navigate(link)
  }

  return (
    <div
      className={`bento-card group ${className}`}
      onClick={handleCardClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' && link) navigate(link) }}
    >
      <div className="bento-card-title">{title}</div>
      <div className="bento-card-preview">
        {children}
      </div>
    </div>
  )
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
  // Parallax scroll — uncomment later when ready to add
  // const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  // const heroY = useTransform(scrollYProgress, [0, 0.8], [0, -60])

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


        {/* Parallax scroll effect — uncomment later:
          style={{ opacity: heroOpacity, y: heroY }} */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase text-white/50 mb-5 sm:mb-6 md:mb-8"
          >
            SimpyUI's
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase leading-[0.9] tracking-tight mb-3 sm:mb-4"
          >
            <span className="gradient-text">Un-Common</span>
            <br />
            <span className="gradient-text-blue">Components</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mt-4 sm:mt-5 md:mt-6 mb-10 sm:mb-12 md:mb-14"
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
      <section className="relative py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8 md:min-h-screen md:flex md:items-center">
        <div className="max-w-[1400px] mx-auto">

          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14 md:mb-20 space-y-3 sm:space-y-4">
            <div className="inline-block px-3 py-1.5 text-[9px] sm:text-[10px] font-medium tracking-widest uppercase bg-zinc-800/80 text-zinc-400 rounded-full border border-zinc-700/60">
              {componentRegistry.length}+ and counting
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight pt-1"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Outstanding components
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-md mx-auto leading-relaxed pt-1">
              No extra packages — just one file for each component.
              <br className="hidden sm:block" />
              Use directly with your fav CLI.
            </p>
          </div>

          {/* ── Bento Grid Container ── */}
          <div className="bento-outer">

            {/* Top area: 3-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">

              {/* Left 2 columns — 2x3 grid of small cards */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">

                <BentoCard title="Button" link="/components/button">
                  <ButtonDemo />
                </BentoCard>

                <BentoCard title="Badge" link="/components/badge">
                  <BadgeDemo />
                </BentoCard>

                <BentoCard title="Input" link="/components/input">
                  <InputDemo />
                </BentoCard>

                <BentoCard title="Toggle" link="/components/toggle">
                  <ToggleDemo />
                </BentoCard>

                <BentoCard title="Avatar" link="/components/avatar">
                  <AvatarDemo />
                </BentoCard>

                <BentoCard title="Progress" link="/components/progress">
                  <ProgressDemo />
                </BentoCard>

              </div>

              {/* Right column — 2 tall stacked cards */}
              <div className="grid grid-rows-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">

                <BentoCard title="Accordion" link="/components/accordion" className="h-full">
                  <AccordionMiniDemo />
                </BentoCard>

                <BentoCard title="Skeleton" link="/components/skeleton" className="h-full">
                  <SkeletonDemo />
                </BentoCard>

              </div>

            </div>

            {/* Bottom full-width card */}
            <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6">
              <BentoCard title="Tooltip" link="/components/tooltip">
                <TooltipDemo />
              </BentoCard>
            </div>

          </div>

          {/* Explore All Link */}
          <div className="text-center mt-10 sm:mt-14 md:mt-18 lg:mt-20">
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
      <section className="relative py-20 sm:py-24 md:py-32 lg:py-40 overflow-hidden bg-black md:min-h-screen md:flex md:flex-col md:justify-center">
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
          className="relative z-10 text-center max-w-3xl mx-auto px-4 sm:px-6"
        >
          {/* Subtitle */}
          <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-[0.35em] uppercase text-white/40 mb-4 sm:mb-5">
            Join Us
          </p>

        {/* Heading */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-10 sm:mb-14 md:mb-20 lg:mb-24">
                    Unlock your{' '}
                    <span className="gradient-text-blue">Pro badge</span>
                    <br />
                    and join the elite
                  </h2>
                </motion.div>

                {/* ── Hands + Text — full viewport width ── */}
        <div className="relative w-full select-none">
          <div className="flex items-center w-full">

            {/* Left hand — flush to left screen edge */}
            <motion.img
              initial={{ opacity: 0, x: -120 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              src="/left.png"
              alt=""
              aria-hidden="true"
              className="w-[42%] sm:w-[40%] md:w-[38%] object-contain select-none pointer-events-none flex-shrink-0"
              draggable={false}
            />

            {/* Center text */}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-1 text-center text-2xl sm:text-3xl md:text-5xl lg:text-6xl italic tracking-wide text-white/90 whitespace-nowrap z-10"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              SimpyUI
            </motion.span>

            {/* Right hand — flush to right screen edge */}
            <motion.img
              initial={{ opacity: 0, x: 120 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              src="/right.png"
              alt=""
              aria-hidden="true"
              className="w-[42%] sm:w-[40%] md:w-[38%] object-contain select-none pointer-events-none flex-shrink-0"
              draggable={false}
            />

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 bg-black border-t border-white/[0.03]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[10px] sm:text-xs text-white/25 tracking-wide">
            Design and Developed by <span className="text-white/40">@SimpyUI</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
