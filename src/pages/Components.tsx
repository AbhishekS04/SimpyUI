import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiSearch } from 'react-icons/fi'
import { useState } from 'react'
import { componentRegistry, type ComponentRegistryEntry } from '../registry'

/* ── Component Preview Card ── */
interface ComponentCardProps {
  comp: ComponentRegistryEntry
}

function ComponentCard({ comp }: ComponentCardProps) {
  return (
    <Link to={`/components/${comp.slug}`} className="block group">
      <div className="bg-[#0f0f0f] border border-white/[0.05] rounded-3xl overflow-hidden hover:border-white/[0.1] transition-all duration-300">
        {/* Large Preview Area */}
        <div className="relative aspect-[4/3] bg-[#000] flex items-center justify-center overflow-hidden p-8 sm:p-10">
          <div className="transform scale-[0.65] sm:scale-75 pointer-events-none select-none w-full flex items-center justify-center">
            {comp.component}
          </div>
        </div>
        {/* Content */}
        <div className="px-6 py-5 sm:px-8 sm:py-6 flex flex-col gap-2">
          <h3 className="text-lg font-bold text-white tracking-tight">
            {comp.name}
          </h3>
          <p className="text-sm text-neutral-400 leading-relaxed font-medium">
            {comp.description}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default function Components() {
  const [search, setSearch] = useState('')

  // Build categories from registry
  const categoryOrder: string[] = []
  const categoryMap: Record<string, ComponentRegistryEntry[]> = {}
  componentRegistry.forEach(comp => {
    if (!categoryMap[comp.category]) {
      categoryMap[comp.category] = []
      categoryOrder.push(comp.category)
    }
    categoryMap[comp.category].push(comp)
  })

  // Filter by search
  const hasSearch = search.trim().length > 0
  const filteredRegistry = hasSearch
    ? componentRegistry.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
    )
    : null

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 sm:pt-28 pb-16 sm:pb-20">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10">

        {/* ── Page Header ── */}
        <div className="mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.35em] uppercase text-white/25 mb-2.5 sm:mb-3">
              Components
            </p>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight mb-3 sm:mb-4 md:mb-5"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Our Collection
            </h1>
            <p className="text-white/30 text-xs sm:text-sm max-w-md leading-relaxed mb-6 sm:mb-8">
              Browse all {componentRegistry.length} components. Click any to see preview and copy the code.
            </p>

            {/* Search */}
            <div className="relative w-full max-w-xs">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" size={14} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search components..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-[11px] sm:text-xs bg-white/[0.03] border border-white/[0.06] text-white placeholder-white/20 focus:outline-none focus:border-white/15 transition-all"
              />
            </div>
          </motion.div>
        </div>

        {/* ── Search Results (flat grid) ── */}
        {hasSearch && (
          <>
            <div className="mb-4 sm:mb-6">
              <p className="text-[11px] sm:text-xs text-white/20">
                {filteredRegistry!.length} result{filteredRegistry!.length !== 1 ? 's' : ''} for "{search}"
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredRegistry!.map((comp, i) => (
                <motion.div
                  key={comp.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <ComponentCard comp={comp} />
                </motion.div>
              ))}
            </div>
            {filteredRegistry!.length === 0 && (
              <div className="text-center py-16 sm:py-24">
                <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center">
                  <FiSearch size={18} className="text-white/15" />
                </div>
                <p className="text-white/25 text-sm mb-1">No components found</p>
                <p className="text-white/12 text-xs">Try a different search term</p>
              </div>
            )}
          </>
        )}

        {/* ── Category Sections ── */}
        {!hasSearch && categoryOrder.map((category, catIdx) => {
          const comps = categoryMap[category]
          return (
            <motion.section
              key={category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: catIdx * 0.08 }}
              className="mb-10 sm:mb-14 lg:mb-16 last:mb-0"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-white/90">
                  {category}
                </h2>
                <span className="text-[10px] text-white/20 bg-white/[0.04] px-2 py-0.5 rounded-md font-medium">
                  {comps.length}
                </span>
              </div>

              {/* 3-column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {comps.map((comp, i) => (
                  <motion.div
                    key={comp.slug}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: catIdx * 0.05 + i * 0.04 }}
                  >
                    <ComponentCard comp={comp} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )
        })}

      </div>
    </div>
  )
}
