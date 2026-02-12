"use client"

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiArrowRight, FiCommand } from 'react-icons/fi'
import { componentRegistry } from '../../registry'

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    if (!query.trim()) return componentRegistry
    const q = query.toLowerCase()
    return componentRegistry.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    )
  }, [query])

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [filtered])

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return
    const items = listRef.current.querySelectorAll('[data-cmd-item]')
    items[selectedIndex]?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  function handleSelect(slug: string) {
    setOpen(false)
    navigate(`/components/${slug}`)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex].slug)
      }
    }
  }

  // Group by category
  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {}
    for (const comp of filtered) {
      if (!groups[comp.category]) groups[comp.category] = []
      groups[comp.category].push(comp)
    }
    return groups
  }, [filtered])

  // Flat index mapping for keyboard nav
  const flatItems = useMemo(() => {
    const items: { slug: string; name: string; category: string; description: string }[] = []
    for (const comps of Object.values(grouped)) {
      for (const c of comps) items.push(c)
    }
    return items
  }, [grouped])

  return (
    <>
      {/* Trigger button in navbar */}
      <button
        onClick={() => setOpen(true)}
        className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-200"
        title="Search (⌘K)"
      >
        <FiCommand size={14} />
      </button>

      {/* Palette overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.25, ease: smoothEase }}
              className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[101] w-[90vw] max-w-[560px]"
            >
              <div className="bg-[#141414] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">
                {/* Search input */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
                  <FiSearch size={16} className="text-white/25 flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search components..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-[15px] text-white placeholder-white/25 outline-none"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-[10px] text-white/25 font-mono">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div
                  ref={listRef}
                  className="max-h-[50vh] overflow-y-auto py-2 scrollbar-hidden"
                  data-lenis-prevent
                >
                  {filtered.length === 0 ? (
                    <div className="px-5 py-12 text-center">
                      <p className="text-white/25 text-sm">No components found</p>
                      <p className="text-white/15 text-xs mt-2">Try a different search term</p>
                    </div>
                  ) : (
                    <>
                      {Object.entries(grouped).map(([category, comps]) => (
                        <div key={category}>
                          <div className="px-5 pt-3 pb-1.5">
                            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/15">
                              {category}
                            </span>
                          </div>
                          {comps.map((comp) => {
                            const flatIdx = flatItems.findIndex((f) => f.slug === comp.slug)
                            const isSelected = flatIdx === selectedIndex
                            return (
                              <button
                                key={comp.slug}
                                data-cmd-item
                                onClick={() => handleSelect(comp.slug)}
                                onMouseEnter={() => setSelectedIndex(flatIdx)}
                                className={`w-full flex items-center justify-between px-5 py-3 text-left transition-all duration-150 group ${
                                  isSelected
                                    ? 'bg-white/[0.06]'
                                    : 'hover:bg-white/[0.03]'
                                }`}
                              >
                                <div className="flex flex-col gap-0.5 min-w-0">
                                  <span
                                    className={`text-[14px] font-medium truncate transition-colors duration-150 ${
                                      isSelected ? 'text-white' : 'text-white/50'
                                    }`}
                                  >
                                    {comp.name}
                                  </span>
                                  <span className="text-[12px] text-white/20 truncate">
                                    {comp.description}
                                  </span>
                                </div>
                                <FiArrowRight
                                  size={14}
                                  className={`flex-shrink-0 ml-3 transition-all duration-150 ${
                                    isSelected
                                      ? 'text-white/40 translate-x-0'
                                      : 'text-transparent -translate-x-2'
                                  }`}
                                />
                              </button>
                            )
                          })}
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06] bg-white/[0.01]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-[11px] text-white/20">
                      <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-[10px] font-mono">↑↓</kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-white/20">
                      <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-[10px] font-mono">↵</kbd>
                      Open
                    </span>
                  </div>
                  <span className="text-[11px] text-white/15">
                    {filtered.length} component{filtered.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
