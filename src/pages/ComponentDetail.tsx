import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo, useRef, useEffect, type ReactNode } from 'react'
import {
  FiArrowLeft,
  FiArrowRight,
  FiCopy,
  FiCheck,
  FiSidebar,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi'
import { SiFramer, SiReact, SiTailwindcss } from 'react-icons/si'
import { TbPalette, TbPencil, TbRulerMeasure } from 'react-icons/tb'
import { componentRegistry } from '../registry'

/* ═══════════════════════════════════════════════════
   ANIMATION CONFIG — cinematic stagger system
   ═══════════════════════════════════════════════════ */
const spring = { type: 'spring' as const, stiffness: 80, damping: 20, mass: 0.8 }
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const stagger = {
  container: {
    initial: {},
    animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  },
  item: {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: smoothEase },
    },
  },
  itemSlow: {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: smoothEase },
    },
  },
}

const panelVariants = {
  open: {
    width: '50%',
    opacity: 1,
    transition: { duration: 0.5, ease: smoothEase },
  },
  closed: {
    width: 0,
    opacity: 0,
    transition: { duration: 0.4, ease: smoothEase },
  },
}

const previewCardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: smoothEase, delay: 0.15 },
  },
}

// Lightweight code colorizer — subtle tints, not full syntax highlighting
function colorizeCode(code: string): ReactNode[] {
  const lines = code.split('\n')
  return lines.map((line, i) => {
    const segments: ReactNode[] = []
    let key = 0

    const patterns = [
      { regex: /(^\/\/.*|\/\/.*$)/, cls: 'text-white/20 italic' },
      { regex: /(\/\*[\s\S]*?\*\/)/, cls: 'text-white/20 italic' },
      { regex: /(`[^`]*`|'[^']*'|"[^"]*")/, cls: 'text-emerald-400/60' },
      { regex: /(<\/?[A-Z][a-zA-Z0-9.]*)/, cls: 'text-cyan-400/70' },
      { regex: /(<\/?[a-z][a-zA-Z0-9-]*)/, cls: 'text-red-400/50' },
      {
        regex: /\b(import|from|export|default|const|let|var|function|return|if|else|switch|case|break|new|class|extends|typeof|instanceof|async|await|try|catch|throw|for|while|do|in|of|null|undefined|true|false)\b/,
        cls: 'text-purple-400/70',
      },
      { regex: /(=>|===|!==|&&|\|\||\?\.|\.\.\.|\.\?)/, cls: 'text-amber-400/50' },
      { regex: /\b(\d+\.?\d*)\b/, cls: 'text-amber-400/60' },
      { regex: /([{}()\[\]])/, cls: 'text-white/25' },
    ]

    function tokenize(text: string) {
      if (!text) return
      let earliest: (typeof patterns)[number] | null = null
      let earliestIdx = Infinity
      let matchResult: RegExpMatchArray | null = null

      for (const p of patterns) {
        const m = text.match(p.regex)
        if (m && m.index !== undefined && m.index < earliestIdx) {
          earliest = p
          earliestIdx = m.index
          matchResult = m
        }
      }

      if (!earliest || !matchResult) {
        segments.push(
          <span key={key++} className="text-white/45">
            {text}
          </span>
        )
        return
      }

      if (earliestIdx > 0) {
        segments.push(
          <span key={key++} className="text-white/45">
            {text.slice(0, earliestIdx)}
          </span>
        )
      }

      segments.push(
        <span key={key++} className={earliest.cls}>
          {matchResult[0]}
        </span>
      )

      tokenize(text.slice(earliestIdx + matchResult[0].length))
    }

    tokenize(line)

    return (
      <div key={i} className="leading-relaxed whitespace-pre">
        {segments.length > 0 ? segments : '\u00A0'}
      </div>
    )
  })
}

interface DepInfo {
  name: string
  icon: ReactNode
}

/* ── Props parser — extracts props from raw TypeScript source ── */

interface PropInfo {
  name: string
  type: string
  required: boolean
  defaultVal?: string
}

function parsePropsFromCode(code: string): PropInfo[] {
  const props: PropInfo[] = []
  // Match exported interfaces that end with "Props"
  const interfaceRegex = /(?:export\s+)?interface\s+\w*Props\s*\{([^}]*)\}/gs
  let match: RegExpExecArray | null

  while ((match = interfaceRegex.exec(code)) !== null) {
    const body = match[1]
    const lines = body.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//') && !l.startsWith('/*'))

    for (const line of lines) {
      // Match: propName?: Type  or  propName: Type
      const propMatch = line.match(/^(\w+)(\??):\s*(.+?)(?:\s*\/\/.*)?[;,]?\s*$/)
      if (propMatch) {
        const [, name, optional, rawType] = propMatch
        // Try to find default value from destructuring in the component function
        const defaultRegex = new RegExp(`${name}\\s*=\\s*([^,}]+)`)
        const defaultMatch = code.match(defaultRegex)
        let defaultVal = defaultMatch ? defaultMatch[1].trim().replace(/['"`]/g, '') : undefined
        if (defaultVal && defaultVal.length > 30) defaultVal = defaultVal.slice(0, 30) + '…'

        props.push({
          name,
          type: rawType.replace(/;$/, '').trim(),
          required: !optional,
          defaultVal,
        })
      }
    }
  }

  return props
}

export default function ComponentDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [panelOpen, setPanelOpen] = useState(true)
  const [copied, setCopied] = useState(false)
  const [depsCopied, setDepsCopied] = useState(false)
  const [npxCopied, setNpxCopied] = useState(false)
  const [codeExpanded, setCodeExpanded] = useState(false)
  const CODE_COLLAPSE_LINES = 15
  const codeContentRef = useRef<HTMLDivElement>(null)
  const mobileCodeContentRef = useRef<HTMLDivElement>(null)
  const [codeHeight, setCodeHeight] = useState(0)
  const [mobileCodeHeight, setMobileCodeHeight] = useState(0)
  const COLLAPSED_HEIGHT = 280
  const MOBILE_COLLAPSED_HEIGHT = 200

  const index = componentRegistry.findIndex((c) => c.slug === slug)
  const comp = componentRegistry[index]

  const colorizedCode = useMemo(
    () => (comp ? colorizeCode(comp.demoCode) : null),
    [comp?.demoCode]
  )

  useEffect(() => {
    if (codeContentRef.current) {
      setCodeHeight(codeContentRef.current.scrollHeight)
    }
    if (mobileCodeContentRef.current) {
      setMobileCodeHeight(mobileCodeContentRef.current.scrollHeight)
    }
  }, [comp?.demoCode])

  if (!comp) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-20">
        <div className="max-w-4xl mx-auto px-6 text-center py-20">
          <h1 className="text-2xl font-bold mb-3">Component Not Found</h1>
          <p className="text-white/40 mb-6">
            The component you're looking for doesn't exist.
          </p>
          <Link
            to="/components"
            className="text-cyan-400 hover:underline text-sm"
          >
            ← Back to Components
          </Link>
        </div>
      </div>
    )
  }

  const prev = index > 0 ? componentRegistry[index - 1] : null
  const next =
    index < componentRegistry.length - 1 ? componentRegistry[index + 1] : null

  const handleCopy = () => {
    navigator.clipboard.writeText(comp.demoCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const deps: DepInfo[] = []
  if (comp.code.includes('framer-motion'))
    deps.push({ name: 'framer-motion', icon: <SiFramer size={11} className="text-[#e846ff]" /> })
  if (comp.code.includes('react-icons'))
    deps.push({ name: 'react-icons', icon: <TbPalette size={13} className="text-red-400" /> })
  if (comp.code.includes('lucide-react'))
    deps.push({ name: 'lucide-react', icon: <TbPencil size={13} className="text-orange-400" /> })
  if (comp.code.includes('react-use-measure'))
    deps.push({ name: 'react-use-measure', icon: <TbRulerMeasure size={13} className="text-rose-400" /> })
  if (comp.code.includes('gsap'))
    deps.push({ name: 'gsap', icon: <TbPalette size={13} className="text-green-400" /> })
  deps.push({ name: 'react', icon: <SiReact size={12} className="text-[#61dafb]" /> })

  const uniqueDeps = [...new Map(deps.map((d) => [d.name, d])).values()]

  const parsedProps = useMemo(() => comp ? parsePropsFromCode(comp.code) : [], [comp?.code])

  const installableDeps = uniqueDeps.filter((d) => d.name !== 'react').map((d) => d.name)
  const depsString = installableDeps.length > 0
    ? `npm install ${installableDeps.join(' ')}`
    : 'No extra dependencies needed'

  const handleDepsCopy = () => {
    navigator.clipboard.writeText(depsString)
    setDepsCopied(true)
    setTimeout(() => setDepsCopied(false), 2000)
  }

  const npxCommand = `npx simpyui@latest add ${comp?.slug ?? ''}`
  const handleNpxCopy = () => {
    navigator.clipboard.writeText(npxCommand)
    setNpxCopied(true)
    setTimeout(() => setNpxCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16 sm:pt-20">
      {/* ── Desktop split layout ── */}
      <div className="hidden md:flex h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)]">
        {/* ═══════════════════════════════════════════
            LEFT PANEL — Info & Details (collapsible)
            ═══════════════════════════════════════════ */}
        <AnimatePresence initial={false}>
          {panelOpen && (
            <motion.aside
              variants={panelVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col overflow-hidden flex-shrink-0"
            >
              <motion.div
                variants={stagger.container}
                initial="initial"
                animate="animate"
                className="flex-1 overflow-y-auto p-8 lg:p-12 xl:p-16 scrollbar-hidden"
                data-lenis-prevent
              >
                <motion.span
                  variants={stagger.item}
                  className="inline-block text-[10px] font-mono tracking-[0.3em] uppercase text-white/20 mb-6"
                >
                  Component
                </motion.span>

                <motion.h1
                  variants={stagger.itemSlow}
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-[-0.03em] leading-[1.05] mb-8"
                >
                  {comp.name}
                </motion.h1>

                <motion.div
                  variants={stagger.item}
                  className="w-12 h-[1.5px] bg-gradient-to-r from-white/20 to-transparent mb-10"
                />

                <motion.p
                  variants={stagger.item}
                  className="text-base sm:text-lg lg:text-xl text-white/40 leading-[1.8] mb-16 max-w-md font-light"
                >
                  {comp.description}
                </motion.p>

                {/* Dependencies */}
                <motion.div variants={stagger.item} className="mb-16">
                  <h3 className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/15 font-mono mb-6">
                    Dependencies
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {uniqueDeps.map((dep, i) => (
                      <motion.span
                        key={dep.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: smoothEase }}
                        className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.02] border border-white/[0.05] text-[13px] text-white/45 hover:text-white/70 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500 cursor-default"
                      >
                        {dep.icon}
                        {dep.name}
                      </motion.span>
                    ))}
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + uniqueDeps.length * 0.06, duration: 0.5, ease: smoothEase }}
                      className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.02] border border-white/[0.05] text-[13px] text-white/45 hover:text-white/70 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500 cursor-default"
                    >
                      <SiTailwindcss size={12} className="text-[#06b6d4]" />
                      tailwindcss
                    </motion.span>
                  </div>
                </motion.div>

                {/* Props Table */}
                {parsedProps.length > 0 && (
                  <motion.div variants={stagger.item} className="mb-16">
                    <h3 className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/15 font-mono mb-5">
                      Props
                    </h3>
                    <div className="rounded-2xl border border-white/[0.05] overflow-hidden bg-white/[0.01]">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-white/[0.05]">
                            <th className="px-5 py-3 text-[10px] font-mono tracking-wider uppercase text-white/20">Prop</th>
                            <th className="px-5 py-3 text-[10px] font-mono tracking-wider uppercase text-white/20">Type</th>
                            <th className="px-5 py-3 text-[10px] font-mono tracking-wider uppercase text-white/20 hidden sm:table-cell">Default</th>
                          </tr>
                        </thead>
                        <tbody>
                          {parsedProps.map((prop, i) => (
                            <tr
                              key={prop.name}
                              className={`border-b border-white/[0.03] last:border-none hover:bg-white/[0.02] transition-colors duration-200 ${
                                i % 2 === 0 ? '' : 'bg-white/[0.005]'
                              }`}
                            >
                              <td className="px-5 py-3">
                                <code className="text-[12px] font-mono text-brand-400/80">{prop.name}</code>
                                {prop.required && (
                                  <span className="ml-1.5 text-[9px] text-amber-500/60">*</span>
                                )}
                              </td>
                              <td className="px-5 py-3">
                                <code className="text-[11px] font-mono text-white/30">{prop.type}</code>
                              </td>
                              <td className="px-5 py-3 hidden sm:table-cell">
                                <code className="text-[11px] font-mono text-white/20">
                                  {prop.defaultVal || '—'}
                                </code>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {/* Install */}
                <motion.div variants={stagger.item} className="mb-16">
                  <h3 className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/15 font-mono mb-5">
                    Quick Install
                  </h3>
                  <motion.div
                    onClick={handleNpxCopy}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="group flex items-center justify-between bg-white/[0.015] border border-white/[0.05] rounded-2xl px-6 py-4 cursor-pointer hover:border-white/[0.1] hover:bg-white/[0.03] transition-all duration-500 mb-3"
                  >
                    <code className="text-[13px] text-white/30 font-mono group-hover:text-white/50 transition-colors duration-500">
                      {npxCommand}
                    </code>
                    <span className="text-white/10 group-hover:text-white/40 transition-all duration-500">
                      {npxCopied ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={spring}
                        >
                          <FiCheck size={15} className="text-emerald-400" />
                        </motion.span>
                      ) : (
                        <FiCopy size={15} />
                      )}
                    </span>
                  </motion.div>
                  <p className="text-[10px] font-mono tracking-wide uppercase text-white/10 mb-3 mt-5">
                    Or install dependencies manually
                  </p>
                  <motion.div
                    onClick={handleDepsCopy}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="group flex items-center justify-between bg-white/[0.015] border border-white/[0.05] rounded-2xl px-6 py-4 cursor-pointer hover:border-white/[0.1] hover:bg-white/[0.03] transition-all duration-500"
                  >
                    <code className="text-[13px] text-white/30 font-mono group-hover:text-white/50 transition-colors duration-500">
                      {depsString}
                    </code>
                    <span className="text-white/10 group-hover:text-white/40 transition-all duration-500">
                      {depsCopied ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={spring}
                        >
                          <FiCheck size={15} className="text-emerald-400" />
                        </motion.span>
                      ) : (
                        <FiCopy size={15} />
                      )}
                    </span>
                  </motion.div>
                </motion.div>

                {/* Code Section */}
                <motion.div variants={stagger.item} className="mb-16">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/15 font-mono">
                      Usage Example
                    </h3>
                    <motion.button
                      onClick={handleCopy}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-medium text-white/20 hover:text-white/70 hover:bg-white/[0.04] border border-transparent hover:border-white/[0.08] transition-all duration-500"
                    >
                      {copied ? (
                        <FiCheck size={12} className="text-emerald-400" />
                      ) : (
                        <FiCopy size={12} />
                      )}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </motion.button>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden border border-white/[0.05] bg-[#0b0b0b]">
                    <motion.div
                      animate={{
                        height: codeExpanded
                          ? codeHeight || 'auto'
                          : Math.min(COLLAPSED_HEIGHT, codeHeight || COLLAPSED_HEIGHT),
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div ref={codeContentRef} className="p-6 text-[12px] font-mono overflow-x-auto leading-relaxed">
                        {colorizedCode}
                      </div>
                    </motion.div>
                    {comp.demoCode.split('\n').length > CODE_COLLAPSE_LINES && (
                      <>
                        <AnimatePresence>
                          {!codeExpanded && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="absolute bottom-12 left-0 right-0 h-24 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/80 to-transparent pointer-events-none"
                            />
                          )}
                        </AnimatePresence>
                        <motion.button
                          onClick={() => setCodeExpanded(!codeExpanded)}
                          whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                          className="w-full py-3.5 text-[11px] font-semibold text-white/30 hover:text-white/60 bg-[#0b0b0b] border-t border-white/[0.04] transition-colors duration-500 flex items-center justify-center gap-2"
                        >
                          {codeExpanded ? (
                            <><FiChevronUp size={13} /> Collapse</>
                          ) : (
                            <><FiChevronDown size={13} /> Expand  ·  {comp.demoCode.split('\n').length} lines</>
                          )}
                        </motion.button>
                      </>
                    )}
                  </div>
                </motion.div>

                {/* Prev / Next */}
                <motion.div
                  variants={stagger.item}
                  className="grid grid-cols-2 gap-3 pt-10 border-t border-white/[0.03]"
                >
                  {prev ? (
                    <Link to={`/components/${prev.slug}`}>
                      <motion.div
                        whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.03)' }}
                        whileTap={{ scale: 0.98 }}
                        className="flex flex-col p-5 rounded-2xl border border-white/[0.04] hover:border-white/[0.08] transition-all duration-500 group"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <FiArrowLeft
                            size={12}
                            className="text-white/15 group-hover:text-white/50 group-hover:-translate-x-1 transition-all duration-500"
                          />
                          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/15 group-hover:text-white/30 transition-colors duration-500">
                            Previous
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-white/30 group-hover:text-white/80 transition-colors duration-500">
                          {prev.name}
                        </span>
                      </motion.div>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {next ? (
                    <Link to={`/components/${next.slug}`}>
                      <motion.div
                        whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.03)' }}
                        whileTap={{ scale: 0.98 }}
                        className="flex flex-col items-end p-5 rounded-2xl border border-white/[0.04] hover:border-white/[0.08] transition-all duration-500 group text-right"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/15 group-hover:text-white/30 transition-colors duration-500">
                            Next
                          </span>
                          <FiArrowRight
                            size={12}
                            className="text-white/15 group-hover:text-white/50 group-hover:translate-x-1 transition-all duration-500"
                          />
                        </div>
                        <span className="text-sm font-semibold text-white/30 group-hover:text-white/80 transition-colors duration-500">
                          {next.name}
                        </span>
                      </motion.div>
                    </Link>
                  ) : (
                    <div />
                  )}
                </motion.div>
              </motion.div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════
            RIGHT PANEL — Preview card
            ═══════════════════════════════════════════ */}
        <div className="flex-1 flex flex-col min-w-0 p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: smoothEase }}
            className="flex items-center justify-between mb-4 flex-shrink-0"
          >
            <motion.button
              onClick={() => setPanelOpen(!panelOpen)}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.06)' }}
              whileTap={{ scale: 0.9 }}
              className="flex w-9 h-9 items-center justify-center rounded-xl text-white/15 hover:text-white/60 transition-all duration-500"
              title={panelOpen ? 'Collapse panel' : 'Expand panel'}
            >
              <FiSidebar size={16} />
            </motion.button>
            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-medium text-white/15 hover:text-white/60 hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06] transition-all duration-500"
            >
              {copied ? (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={spring}>
                  <FiCheck size={13} className="text-emerald-400" />
                </motion.span>
              ) : (
                <FiCopy size={13} />
              )}
              <span>{copied ? 'Copied!' : 'Copy code'}</span>
            </motion.button>
          </motion.div>

          <motion.div
            variants={previewCardVariants}
            initial="initial"
            animate="animate"
            className="flex-1 rounded-3xl bg-[#0f0f0f] border border-white/[0.05] overflow-hidden relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute inset-0 flex items-center justify-center overflow-auto"
              data-lenis-prevent
            >
              <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-16">
                {comp.component}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MOBILE LAYOUT — stacked (shown on small screens)
          ═══════════════════════════════════════════ */}
      <motion.div
        variants={stagger.container}
        initial="initial"
        animate="animate"
        className="md:hidden pb-16"
      >
        <motion.div
          variants={previewCardVariants}
          className="mx-4 sm:mx-5 rounded-3xl bg-[#0f0f0f] border border-white/[0.05] relative mb-10 mt-2"
          style={{
            boxShadow: '0 0 60px -15px rgba(255,255,255,0.02), inset 0 1px 0 0 rgba(255,255,255,0.03)',
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          <div className="p-4 sm:p-6 flex flex-col items-center justify-center min-h-[320px] sm:min-h-[380px] overflow-hidden">
            <div className="flex flex-col items-center gap-4 w-full max-w-full overflow-hidden">
              {comp.component}
            </div>
          </div>
        </motion.div>

        <div className="px-5 sm:px-6">
          <motion.h1
            variants={stagger.itemSlow}
            className="text-2xl sm:text-3xl font-bold text-white tracking-[-0.02em] leading-[1.1] mb-3"
          >
            {comp.name}
          </motion.h1>

          <motion.div
            variants={stagger.item}
            className="w-10 h-[1.5px] bg-gradient-to-r from-white/20 to-transparent mb-5"
          />

          <motion.p
            variants={stagger.item}
            className="text-sm sm:text-base text-white/35 leading-[1.8] mb-10 font-light"
          >
            {comp.description}
          </motion.p>

          {/* Dependencies */}
          <motion.div variants={stagger.item} className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[9px] font-semibold tracking-[0.25em] uppercase text-white/15 font-mono">
                Dependencies
              </h3>
              <motion.button
                onClick={handleDepsCopy}
                whileTap={{ scale: 0.9 }}
                className="text-white/10 hover:text-white/40 transition-all duration-500"
              >
                {depsCopied ? (
                  <FiCheck size={13} className="text-emerald-400" />
                ) : (
                  <FiCopy size={13} />
                )}
              </motion.button>
            </div>
            <div className="flex flex-wrap gap-2 mb-0">
              {uniqueDeps.map((dep) => (
                <span
                  key={dep.name}
                  className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/[0.02] border border-white/[0.05] text-[12px] text-white/40"
                >
                  {dep.icon}
                  {dep.name}
                </span>
              ))}
              <span className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/[0.02] border border-white/[0.05] text-[12px] text-white/40">
                <SiTailwindcss size={11} className="text-[#06b6d4]" />
                tailwindcss
              </span>
            </div>
          </motion.div>

          {/* Props Table (mobile) */}
          {parsedProps.length > 0 && (
            <motion.div variants={stagger.item} className="mb-10">
              <h3 className="text-[9px] font-semibold tracking-[0.25em] uppercase text-white/15 font-mono mb-4">
                Props
              </h3>
              <div className="rounded-2xl border border-white/[0.05] overflow-hidden bg-white/[0.01] overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/[0.05]">
                      <th className="px-4 py-2.5 text-[9px] font-mono tracking-wider uppercase text-white/20">Prop</th>
                      <th className="px-4 py-2.5 text-[9px] font-mono tracking-wider uppercase text-white/20">Type</th>
                      <th className="px-4 py-2.5 text-[9px] font-mono tracking-wider uppercase text-white/20">Default</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedProps.map((prop, i) => (
                      <tr
                        key={prop.name}
                        className={`border-b border-white/[0.03] last:border-none ${i % 2 === 0 ? '' : 'bg-white/[0.005]'}`}
                      >
                        <td className="px-4 py-2.5">
                          <code className="text-[11px] font-mono text-brand-400/80">{prop.name}</code>
                          {prop.required && <span className="ml-1 text-[8px] text-amber-500/60">*</span>}
                        </td>
                        <td className="px-4 py-2.5">
                          <code className="text-[10px] font-mono text-white/30">{prop.type}</code>
                        </td>
                        <td className="px-4 py-2.5">
                          <code className="text-[10px] font-mono text-white/20">{prop.defaultVal || '—'}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Install */}
          <motion.div variants={stagger.item} className="mb-10">
            <h3 className="text-[9px] font-semibold tracking-[0.25em] uppercase text-white/15 font-mono mb-4">
              Quick Install
            </h3>
            <motion.div
              onClick={handleNpxCopy}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-between bg-white/[0.015] border border-white/[0.05] rounded-2xl px-5 py-3.5 cursor-pointer hover:border-white/[0.1] transition-all duration-500 mb-2.5"
            >
              <code className="text-[11px] text-white/25 font-mono">
                {npxCommand}
              </code>
              <span className="text-white/10 group-hover:text-white/40 transition-all duration-500">
                {npxCopied ? (
                  <FiCheck size={13} className="text-emerald-400" />
                ) : (
                  <FiCopy size={13} />
                )}
              </span>
            </motion.div>
            <p className="text-[9px] font-mono tracking-wide uppercase text-white/10 mb-2.5 mt-4">
              Or install dependencies manually
            </p>
            <motion.div
              onClick={handleDepsCopy}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-between bg-white/[0.015] border border-white/[0.05] rounded-2xl px-5 py-3.5 cursor-pointer hover:border-white/[0.1] transition-all duration-500"
            >
              <code className="text-[11px] text-white/25 font-mono">
                {depsString}
              </code>
              <span className="text-white/10 group-hover:text-white/40 transition-all duration-500">
                {depsCopied ? (
                  <FiCheck size={13} className="text-emerald-400" />
                ) : (
                  <FiCopy size={13} />
                )}
              </span>
            </motion.div>
          </motion.div>

          {/* Code Section (mobile) */}
          <motion.div variants={stagger.item} className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[9px] font-semibold tracking-[0.25em] uppercase text-white/15 font-mono">
                Usage Example
              </h3>
              <motion.button
                onClick={handleCopy}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-[11px] font-medium text-white/20 hover:text-white/60 hover:bg-white/[0.04] transition-all duration-500"
              >
                {copied ? (
                  <FiCheck size={11} className="text-emerald-400" />
                ) : (
                  <FiCopy size={11} />
                )}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </motion.button>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.05] bg-[#0b0b0b]">
              <motion.div
                animate={{
                  height: codeExpanded
                    ? mobileCodeHeight || 'auto'
                    : Math.min(MOBILE_COLLAPSED_HEIGHT, mobileCodeHeight || MOBILE_COLLAPSED_HEIGHT),
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div ref={mobileCodeContentRef} className="p-5 text-[11px] font-mono overflow-x-auto leading-relaxed">
                  {colorizedCode}
                </div>
              </motion.div>
              {comp.demoCode.split('\n').length > CODE_COLLAPSE_LINES && (
                <>
                  <AnimatePresence>
                    {!codeExpanded && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-12 left-0 right-0 h-20 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/80 to-transparent pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                  <button
                    onClick={() => setCodeExpanded(!codeExpanded)}
                    className="w-full py-3.5 text-[11px] font-semibold text-white/30 hover:text-white/60 bg-[#0b0b0b] border-t border-white/[0.04] transition-colors duration-500 flex items-center justify-center gap-2"
                  >
                    {codeExpanded ? (
                      <><FiChevronUp size={13} /> Collapse</>
                    ) : (
                      <><FiChevronDown size={13} /> Expand  ·  {comp.demoCode.split('\n').length} lines</>
                    )}
                  </button>
                </>
              )}
            </div>
          </motion.div>

          {/* Prev / Next */}
          <motion.div
            variants={stagger.item}
            className="flex items-center justify-between pt-8 border-t border-white/[0.03]"
          >
            {prev ? (
              <Link to={`/components/${prev.slug}`} className="group flex items-center gap-2">
                <FiArrowLeft size={14} className="text-white/15 group-hover:text-white/50 group-hover:-translate-x-1 transition-all duration-500" />
                <span className="text-[13px] text-white/25 group-hover:text-white/70 transition-colors duration-500">Previous</span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link to={`/components/${next.slug}`} className="group flex items-center gap-2">
                <span className="text-[13px] text-white/25 group-hover:text-white/70 transition-colors duration-500">Next</span>
                <FiArrowRight size={14} className="text-white/15 group-hover:text-white/50 group-hover:translate-x-1 transition-all duration-500" />
              </Link>
            ) : (
              <div />
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
