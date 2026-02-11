import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { componentRegistry } from '../registry'
import ComponentShowcase from '../components/layout/ComponentShowcase'

export default function ComponentDetail() {
  const { slug } = useParams()

  const index = componentRegistry.findIndex(c => c.slug === slug)
  const comp = componentRegistry[index]

  if (!comp) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-20">
        <div className="max-w-4xl mx-auto px-6 text-center py-20">
          <h1 className="text-2xl font-bold mb-3">Component Not Found</h1>
          <p className="text-white/40 mb-6">The component you're looking for doesn't exist.</p>
          <Link to="/components" className="text-cyan-400 hover:underline text-sm">
            ← Back to Components
          </Link>
        </div>
      </div>
    )
  }

  const prev = index > 0 ? componentRegistry[index - 1] : null
  const next = index < componentRegistry.length - 1 ? componentRegistry[index + 1] : null

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 sm:pt-28 pb-12 sm:pb-16">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-[11px] sm:text-xs text-white/30 mb-6 sm:mb-8"
        >
          <Link to="/components" className="hover:text-white transition-colors">
            Components
          </Link>
          <span className="text-white/15">/</span>
          <span className="text-white/70">{comp.name}</span>
        </motion.div>

        {/* Title & Description */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{comp.name}</h1>
            <span className="text-[9px] sm:text-[10px] text-white/40 bg-white/[0.04] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-white/[0.06] uppercase tracking-wider font-medium">
              {comp.category}
            </span>
          </div>
          <p className="text-white/40 text-xs sm:text-sm md:text-base leading-relaxed">{comp.description}</p>
        </motion.div>

        {/* Preview + Code */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ComponentShowcase
            title={comp.name}
            description={comp.description}
            code={comp.code}
          >
            {comp.component}
          </ComponentShowcase>
        </motion.div>

        {/* Usage Section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 sm:mt-10"
        >
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 tracking-tight">Usage</h2>
          <div className="rounded-xl sm:rounded-2xl border border-white/[0.06] bg-[#111] p-4 sm:p-5 md:p-6">
            <p className="text-xs sm:text-sm text-white/40 mb-2.5 sm:mb-3 leading-relaxed">
              Copy the component code and paste it into your project. Required dependencies:
            </p>
            <div className="bg-black/60 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-[11px] sm:text-xs md:text-sm text-cyan-400/80 border border-white/[0.04] overflow-x-auto">
              npm install framer-motion react-icons
            </div>
            <p className="text-[10px] sm:text-xs text-white/25 mt-2.5 sm:mt-3 leading-relaxed">
              Import and use in your React app. All components use Tailwind CSS for styling.
            </p>
          </div>
        </motion.div>

        {/* Prev / Next Navigation */}
        <div className="flex items-center justify-between mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/[0.04]">
          {prev ? (
            <Link
              to={`/components/${prev.slug}`}
              className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-white/35 hover:text-white transition-colors group"
            >
              <FiArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform flex-shrink-0" />
              <div>
                <div className="text-[9px] sm:text-[10px] text-white/20 uppercase tracking-wider">Previous</div>
                <div className="font-medium text-xs sm:text-sm">{prev.name}</div>
              </div>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              to={`/components/${next.slug}`}
              className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-white/35 hover:text-white transition-colors group text-right"
            >
              <div>
                <div className="text-[9px] sm:text-[10px] text-white/20 uppercase tracking-wider">Next</div>
                <div className="font-medium text-xs sm:text-sm">{next.name}</div>
              </div>
              <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  )
}
