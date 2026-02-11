import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiBox, FiZap, FiCode, FiCopy, FiLayers } from 'react-icons/fi'
import { componentRegistry } from '../registry'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
}

export default function Home() {
  const features = [
    {
      icon: <FiZap size={24} />,
      title: 'Animated',
      description: 'Every component uses Framer Motion for smooth, delightful animations.',
    },
    {
      icon: <FiCopy size={24} />,
      title: 'Copy & Paste',
      description: 'No npm install needed. Just copy the code into your project.',
    },
    {
      icon: <FiCode size={24} />,
      title: 'Customizable',
      description: 'Built with Tailwind CSS. Tweak colors, sizes, and styles easily.',
    },
    {
      icon: <FiLayers size={24} />,
      title: 'Composable',
      description: 'Small, focused components that compose together naturally.',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* ─── HERO ──────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 grid-bg overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-brand-600/10 text-brand-400 border border-brand-600/20 mb-6">
              <FiBox size={12} />
              {componentRegistry.length} Components Available
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6"
          >
            Beautiful UI,{' '}
            <span className="gradient-text">Simply Built</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-dark-100 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            A collection of beautifully crafted, animated React components.
            Copy, paste, and customize. No complex setup required.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          >
            <Link to="/components">
              <Button size="lg" className="gap-2">
                Browse Components
                <FiArrowRight size={18} />
              </Button>
            </Link>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Button variant="outline" size="lg">
                GitHub
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FEATURES ──────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why <span className="gradient-text">SimpyUI</span>?
            </h2>
            <p className="text-dark-100 text-lg max-w-xl mx-auto">
              Built for developers who want beautiful components without the complexity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full text-center">
                  <div className="w-12 h-12 rounded-xl bg-brand-600/10 text-brand-400 flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-dark-100">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPONENT PREVIEW GRID ────────────────── */}
      <section className="py-20 px-6 border-t border-dark-400/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Component <span className="gradient-text">Gallery</span>
            </h2>
            <p className="text-dark-100 text-lg max-w-xl mx-auto">
              Explore all available components. Click any card to see the details.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {componentRegistry.slice(0, 6).map((comp, i) => (
              <motion.div
                key={comp.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link to={`/components/${comp.slug}`}>
                  <Card className="group cursor-pointer h-full">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold group-hover:text-brand-400 transition-colors">
                        {comp.name}
                      </h3>
                      <span className="text-xs text-dark-200 bg-dark-600 px-2 py-0.5 rounded-md">
                        {comp.category}
                      </span>
                    </div>
                    <p className="text-sm text-dark-100">{comp.description}</p>
                    <div className="mt-4 text-brand-400 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Component <FiArrowRight size={14} />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/components">
              <Button variant="outline" size="lg" className="gap-2">
                View All Components
                <FiArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────── */}
      <footer className="border-t border-dark-400/30 py-10 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center font-bold text-xs">
              S
            </div>
            <span className="text-sm font-semibold">
              Simpy<span className="text-brand-400">UI</span>
            </span>
          </div>
          <p className="text-sm text-dark-200">
            Built with React, Tailwind CSS & Framer Motion
          </p>
        </div>
      </footer>
    </div>
  )
}
