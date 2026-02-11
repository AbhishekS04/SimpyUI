import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGithub, FiCommand, FiMaximize2, FiStar } from 'react-icons/fi'

export default function Navbar() {
  const location = useLocation()

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 md:px-6"
    >
      <div className="floating-nav rounded-2xl px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 flex items-center justify-between w-full max-w-3xl">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
            <svg width="12" height="12" className="sm:w-[14px] sm:h-[14px]" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="url(#logoGrad)" />
              <path d="M12 6C12 6 8 10 8 14c0 2.2 1.8 4 4 4s4-1.8 4-4c0-4-4-8-4-8z" fill="rgba(255,255,255,0.9)" />
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="24" y2="24">
                  <stop stopColor="#00d4ff" />
                  <stop offset="1" stopColor="#0066ff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-sm font-bold tracking-wider text-white/90 uppercase hidden sm:inline">
            SimpyUI
          </span>
        </Link>

        {/* Center Nav Links */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          <Link
            to="/"
            className={`px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-[13px] rounded-lg transition-all duration-200 ${
              location.pathname === '/'
                ? 'text-white bg-white/[0.06]'
                : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Home
          </Link>
          <Link
            to="/components"
            className={`px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-[13px] rounded-lg transition-all duration-200 ${
              location.pathname.startsWith('/components')
                ? 'text-white bg-white/[0.06]'
                : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Components
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-0.5">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-200"
            title="Command"
          >
            <FiCommand size={14} />
          </button>
          <a
            href="https://github.com"
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
