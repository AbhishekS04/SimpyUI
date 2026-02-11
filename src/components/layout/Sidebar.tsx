import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { componentRegistry } from '../../registry'

export default function Sidebar() {
  const location = useLocation()

  // Group components by category
  const categories: Record<string, typeof componentRegistry> = {}
  componentRegistry.forEach(comp => {
    if (!categories[comp.category]) {
      categories[comp.category] = []
    }
    categories[comp.category].push(comp)
  })

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 border-r border-white/5 bg-black/90 backdrop-blur-xl overflow-y-auto hidden lg:block" data-lenis-prevent>
      <div className="p-4 space-y-6">
        {/* Getting Started */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-dark-100 mb-2 px-3">
            Getting Started
          </h3>
          <Link
            to="/components"
            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
              location.pathname === '/components'
                ? 'bg-blue-600/10 text-cyan-400 font-medium'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            All Components
          </Link>
        </div>

        {/* Component Categories */}
        {Object.entries(categories).map(([category, components]) => (
          <div key={category}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-dark-100 mb-2 px-3">
              {category}
            </h3>
            <div className="space-y-0.5">
              {components.map(comp => {
                const isActive = location.pathname === `/components/${comp.slug}`
                return (
                  <Link
                    key={comp.slug}
                    to={`/components/${comp.slug}`}
                    className={`relative block px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-blue-600/10 text-cyan-400 font-medium'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-cyan-400 rounded-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    {comp.name}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
