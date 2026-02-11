import { useState } from 'react'
import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface Tab {
  label: string
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
}

export default function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex border-b border-dark-400/50">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`relative px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === index ? 'text-brand-400' : 'text-dark-100 hover:text-white'
            }`}
          >
            {tab.label}
            {activeTab === index && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="pt-4"
      >
        {tabs[activeTab].content}
      </motion.div>
    </div>
  )
}
