import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { componentRegistry } from '../registry'
import Sidebar from '../components/layout/Sidebar'
import ComponentShowcase from '../components/layout/ComponentShowcase'

export default function ComponentDetail() {
  const { slug } = useParams()

  const index = componentRegistry.findIndex(c => c.slug === slug)
  const comp = componentRegistry[index]

  if (!comp) {
    return (
      <div className="flex min-h-screen pt-16">
        <Sidebar />
        <main className="flex-1 lg:ml-64 p-8">
          <div className="max-w-4xl mx-auto text-center py-20">
            <h1 className="text-2xl font-bold mb-3">Component Not Found</h1>
            <p className="text-dark-100 mb-6">The component you're looking for doesn't exist.</p>
            <Link to="/components" className="text-brand-400 hover:underline">
              ← Back to Components
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const prev = index > 0 ? componentRegistry[index - 1] : null
  const next = index < componentRegistry.length - 1 ? componentRegistry[index + 1] : null

  return (
    <div className="flex min-h-screen pt-16">
      <Sidebar />

      <main className="flex-1 lg:ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-dark-200 mb-6"
          >
            <Link to="/components" className="hover:text-white transition-colors">
              Components
            </Link>
            <span>/</span>
            <span className="text-white">{comp.name}</span>
          </motion.div>

          {/* Title & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl font-bold">{comp.name}</h1>
              <span className="text-xs text-dark-200 bg-dark-600 px-2.5 py-1 rounded-lg">
                {comp.category}
              </span>
            </div>
            <p className="text-dark-100 text-lg">{comp.description}</p>
          </motion.div>

          {/* Preview + Code */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
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
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10"
          >
            <h2 className="text-2xl font-bold mb-4">Usage</h2>
            <div className="rounded-xl border border-dark-400/50 bg-dark-700/30 p-6">
              <p className="text-sm text-dark-100 mb-3">
                Copy the component code and paste it into your project. Make sure you have the required dependencies:
              </p>
              <div className="bg-dark-800 rounded-lg px-4 py-3 font-mono text-sm text-brand-300">
                npm install framer-motion react-icons
              </div>
              <p className="text-sm text-dark-200 mt-3">
                Then import and use the component in your React app. All components use Tailwind CSS for styling.
              </p>
            </div>
          </motion.div>

          {/* Prev / Next Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-dark-400/30">
            {prev ? (
              <Link
                to={`/components/${prev.slug}`}
                className="flex items-center gap-2 text-sm text-dark-100 hover:text-white transition-colors group"
              >
                <FiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-xs text-dark-200">Previous</div>
                  <div className="font-medium">{prev.name}</div>
                </div>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                to={`/components/${next.slug}`}
                className="flex items-center gap-2 text-sm text-dark-100 hover:text-white transition-colors group text-right"
              >
                <div>
                  <div className="text-xs text-dark-200">Next</div>
                  <div className="font-medium">{next.name}</div>
                </div>
                <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </main>
    </div>
  )
}
