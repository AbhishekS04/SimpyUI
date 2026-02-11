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
        <Link to="/" className="flex items-center group flex-shrink-0">
          <span className="text-sm font-bold tracking-wider text-white/90 uppercase">
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
