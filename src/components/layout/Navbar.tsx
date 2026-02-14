import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGithub, FiStar } from 'react-icons/fi'
import CommandPalette from './CommandPalette'
import { useRef, useLayoutEffect, useState } from 'react'

export default function Navbar() {
  const location = useLocation()
  const homeRef = useRef(null)
  const componentsRef = useRef(null)
  const containerRef = useRef(null)
  const [highlight, setHighlight] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    let activeRef = null
    if (location.pathname === '/') {
      activeRef = homeRef
    } else if (location.pathname.startsWith('/components')) {
      activeRef = componentsRef
    }
    if (activeRef && activeRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const activeRect = activeRef.current.getBoundingClientRect()
      setHighlight({
        left: activeRect.left - containerRect.left,
        width: activeRect.width
      })
    }
  }, [location.pathname])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 md:px-6"
    >
      <div className="floating-nav rounded-2xl px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 flex items-center justify-between w-full max-w-3xl">
        {/* Logo */}
        <Link to="/" className="flex items-center group flex-shrink-0">
          <span className="text-sm font-bold tracking-wider text-white/90 uppercase">
            SimpyUI
          </span>
        </Link>

        {/* Center Nav Links */}
        <div
          className="relative flex items-center gap-0.5 sm:gap-1"
          ref={containerRef}
          style={{ minWidth: 120 }}
        >
          {/* Animated highlight */}
          <motion.div
            className="absolute top-0 left-0 h-full rounded-lg bg-white/20 z-0 pointer-events-none"
            animate={{
              left: highlight.left,
              width: highlight.width
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 28, mass: 0.7 }}
            style={{ height: '100%' }}
          />
          <Link
            to="/"
            ref={homeRef}
            className={`relative z-10 px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-[13px] rounded-lg transition-all duration-200 ${
              location.pathname === '/'
                ? 'text-white'
                : 'text-white/50 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            to="/components"
            ref={componentsRef}
            className={`relative z-10 px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-[13px] rounded-lg transition-all duration-200 ${
              location.pathname.startsWith('/components')
                ? 'text-white'
                : 'text-white/50 hover:text-white'
            }`}
          >
            Components
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-0.5">
          <CommandPalette />
          <a
            href="https://github.com/AbhishekS04/SimpyUI"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-200"
            title="GitHub"
          >
            <FiStar size={14} />
          </a>
        </div>
      </div>
    </motion.nav>
  )
}
