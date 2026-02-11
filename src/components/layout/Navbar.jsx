import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGithub, FiBox } from 'react-icons/fi'

export default function Navbar() {
  const location = useLocation()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/components', label: 'Components' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-dark-400/50 bg-dark-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center font-bold text-sm group-hover:bg-brand-500 transition-colors">
            S
          </div>
          <span className="text-lg font-bold tracking-tight">
            Simpy<span className="text-brand-400">UI</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {links.map(link => {
            const isActive = location.pathname === link.to ||
              (link.to === '/components' && location.pathname.startsWith('/components'))
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-dark-100 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-dark-500 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            )
          })}

          <div className="w-px h-6 bg-dark-400 mx-2" />

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-dark-100 hover:text-white transition-colors rounded-lg hover:bg-dark-500"
          >
            <FiGithub size={18} />
          </a>
        </div>
      </div>
    </nav>
  )
}
