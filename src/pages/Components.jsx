import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiSearch } from 'react-icons/fi'
import { useState } from 'react'
import { componentRegistry } from '../registry'
import Card from '../components/ui/Card'
import Sidebar from '../components/layout/Sidebar'

export default function Components() {
  const [search, setSearch] = useState('')

  // Group by category
  const categories = {}
  componentRegistry
    .filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
    )
    .forEach(comp => {
      if (!categories[comp.category]) {
        categories[comp.category] = []
      }
      categories[comp.category].push(comp)
    })

  return (
    <div className="flex min-h-screen pt-16">
      <Sidebar />

      <main className="flex-1 lg:ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-4xl font-bold mb-3">Components</h1>
            <p className="text-dark-100 text-lg mb-6">
              Browse all {componentRegistry.length} components. Click any to see preview and code.
            </p>

            {/* Search */}
            <div className="relative max-w-md">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-200" size={16} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search components..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-dark-700 border border-dark-400/50 text-white placeholder-dark-200 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 transition-all"
              />
            </div>
          </motion.div>

          {/* Component Grid by Category */}
          {Object.entries(categories).map(([category, comps]) => (
            <div key={category} className="mb-12">
              <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-500 rounded-full" />
                {category}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {comps.map((comp, i) => (
                  <motion.div
                    key={comp.slug}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link to={`/components/${comp.slug}`}>
                      <Card className="group cursor-pointer h-full">
                        <h3 className="font-semibold mb-1.5 group-hover:text-brand-400 transition-colors">
                          {comp.name}
                        </h3>
                        <p className="text-sm text-dark-100 mb-3">{comp.description}</p>
                        <span className="text-brand-400 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          View <FiArrowRight size={13} />
                        </span>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {Object.keys(categories).length === 0 && (
            <div className="text-center py-20">
              <p className="text-dark-200 text-lg">No components found matching "{search}"</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
