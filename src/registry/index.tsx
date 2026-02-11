/*
 * =============================================
 *  SIMPY UI - COMPONENT REGISTRY
 * =============================================
 *
 *  HOW TO ADD A NEW COMPONENT:
 *  1. Create your component in  src/components/ui/YourComponent.tsx
 *  2. Add an entry below in the `componentRegistry` array
 *  3. That's it! It will auto-appear in the sidebar & components page.
 *
 *  Each entry needs:
 *    - name:        Display name
 *    - slug:        URL-friendly name (lowercase, hyphens)
 *    - category:    Group it belongs to (e.g. "Inputs", "Feedback")
 *    - description: Short one-liner
 *    - component:   A React element that renders the DEMO / PREVIEW
 *    - code:        The source code string (shown in the code tab)
 *
 * =============================================
 */

import { useState, useMemo, type ReactNode } from 'react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Toggle from '../components/ui/Toggle'
import Modal, { useModal } from '../components/ui/Modal'
import Badge from '../components/ui/Badge'
import Accordion from '../components/ui/Accordion'
import Tabs from '../components/ui/Tabs'
import Toast from '../components/ui/Toast'
import Skeleton from '../components/ui/Skeleton'
import Avatar from '../components/ui/Avatar'
import Alert from '../components/ui/Alert'
import Tooltip from '../components/ui/Tooltip'
import Progress from '../components/ui/Progress'
import { SocialStories } from '../components/ui/SocialStories'

/* ── Registry entry type ── */

export interface ComponentRegistryEntry {
  name: string
  slug: string
  category: string
  description: string
  component: ReactNode
  code: string
}

/* ── Demo wrapper components (for stateful previews) ── */

function ToggleDemo() {
  const [on, setOn] = useState(false)
  return <Toggle enabled={on} onChange={setOn} label="Enable notifications" />
}

function ModalDemo() {
  const modal = useModal()
  return (
    <>
      <Button onClick={modal.open}>Open Modal</Button>
      <Modal isOpen={modal.isOpen} onClose={modal.close} title="Example Modal">
        <p className="text-sm text-dark-100">
          This is a beautifully animated modal component. You can put any content here.
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" onClick={modal.close}>Cancel</Button>
          <Button onClick={modal.close}>Confirm</Button>
        </div>
      </Modal>
    </>
  )
}

function ToastDemo() {
  const [show, setShow] = useState(false)
  return (
    <div className="space-y-4">
      <Button onClick={() => setShow(true)}>Show Toast</Button>
      <Toast
        show={show}
        onClose={() => setShow(false)}
        message="Action completed successfully!"
        variant="success"
      />
    </div>
  )
}

function SocialStoriesDemo() {
  const stories = useMemo(() => [
    {
      id: '1',
      platform: 'instagram' as const,
      mediaUrl: 'https://rdxqqgntmtzvqsmepmls.supabase.co/storage/v1/object/public/assets/videos/original/d5521455-f668-481c-85a4-2ab10f49d580.mp4',
      linkUrl: 'https://instagram.com',
      caption: '',
      duration: 5,
    },
    {
      id: '2',
      platform: 'instagram' as const,
      mediaUrl: 'https://rdxqqgntmtzvqsmepmls.supabase.co/storage/v1/object/public/assets/videos/original/8a98fec1-5439-4cb3-8eb2-f0d605204397.mp4',
      linkUrl: 'https://instagram.com',
      caption: '',
      duration: 7,
    },
    {
      id: '3',
      platform: 'instagram' as const,
      mediaUrl: 'https://rdxqqgntmtzvqsmepmls.supabase.co/storage/v1/object/public/assets/videos/original/44fe63af-47e0-4df6-8fc3-0a984c7337da.mp4',
      linkUrl: 'https://instagram.com',
      caption: '',
      duration: 6,
    },
  ], [])

  const profile = useMemo(() => ({
    name: 'Abhishek Singh',
    avatarUrl: 'https://rdxqqgntmtzvqsmepmls.supabase.co/storage/v1/object/public/assets/original/68e0efce-84a4-42ae-9bd7-a2be6aca73d8.jpg',
  }), [])

  return <SocialStories stories={stories} profile={profile} />
}

/* ── THE REGISTRY ── */

export const componentRegistry: ComponentRegistryEntry[] = [
  // ─── GENERAL ──────────────────────────────────
  {
    name: 'Button',
    slug: 'button',
    category: 'General',
    description: 'Animated button with multiple variants and sizes.',
    component: (
      <div className="flex flex-wrap gap-3 items-center">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
    ),
    code: `import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/25',
  secondary: 'bg-dark-500 hover:bg-dark-400 text-white',
  outline: 'border border-dark-300 hover:border-brand-500 text-white hover:bg-brand-600/10',
  ghost: 'text-dark-50 hover:text-white hover:bg-dark-500',
  danger: 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/25',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({ children, variant = 'primary', size = 'md', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={\`inline-flex items-center justify-center gap-2 rounded-lg font-medium
        transition-colors \${variants[variant]} \${sizes[size]}\`}
      {...props}
    >
      {children}
    </motion.button>
  )
}`,
  },

  {
    name: 'Card',
    slug: 'card',
    category: 'General',
    description: 'Versatile card container with hover and glow effects.',
    component: (
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Card className="w-full sm:w-64">
          <h3 className="font-semibold mb-2">Default Card</h3>
          <p className="text-sm text-dark-100">A simple card with hover effect.</p>
        </Card>
        <Card className="w-full sm:w-64" glow>
          <h3 className="font-semibold mb-2">Glow Card</h3>
          <p className="text-sm text-dark-100">This card has a subtle glow.</p>
        </Card>
      </div>
    ),
    code: `import { motion } from 'framer-motion'

export default function Card({ children, hover = true, glow = false, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : {}}
      className={\`rounded-xl border border-dark-400/50 bg-dark-700/50 backdrop-blur-sm
        p-6 transition-all \${glow ? 'glow-sm' : ''}\`}
      {...props}
    >
      {children}
    </motion.div>
  )
}`,
  },

  {
    name: 'Badge',
    slug: 'badge',
    category: 'General',
    description: 'Small status indicators with colorful variants.',
    component: (
      <div className="flex flex-wrap gap-3 items-center">
        <Badge>Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
      </div>
    ),
    code: `import { motion } from 'framer-motion'

const badgeVariants = {
  default: 'bg-dark-500 text-dark-50',
  primary: 'bg-brand-600/20 text-brand-300 border border-brand-600/30',
  success: 'bg-green-600/20 text-green-300 border border-green-600/30',
  warning: 'bg-yellow-600/20 text-yellow-300 border border-yellow-600/30',
  danger: 'bg-red-600/20 text-red-300 border border-red-600/30',
}

export default function Badge({ children, variant = 'default' }) {
  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={\`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        \${badgeVariants[variant]}\`}
    >
      {children}
    </motion.span>
  )
}`,
  },

  {
    name: 'Avatar',
    slug: 'avatar',
    category: 'General',
    description: 'User avatar with image support and fallback initials.',
    component: (
      <div className="flex items-center gap-4">
        <Avatar alt="John" size="sm" />
        <Avatar alt="Alice" size="md" />
        <Avatar alt="Bob" size="lg" />
        <Avatar
          src="https://i.pravatar.cc/150?img=32"
          alt="User"
          size="lg"
        />
      </div>
    ),
    code: `import { motion } from 'framer-motion'

export default function Avatar({ src, alt = '', fallback, size = 'md' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' }

  if (src) {
    return (
      <motion.img whileHover={{ scale: 1.05 }} src={src} alt={alt}
        className={\`\${sizes[size]} rounded-full object-cover border-2 border-dark-400\`} />
    )
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }}
      className={\`\${sizes[size]} rounded-full bg-brand-600 flex items-center justify-center
        font-semibold text-white border-2 border-dark-400\`}>
      {fallback || alt?.charAt(0)?.toUpperCase() || '?'}
    </motion.div>
  )
}`,
  },

  // ─── INPUTS ───────────────────────────────────
  {
    name: 'Input',
    slug: 'input',
    category: 'Inputs',
    description: 'Styled text input with label and error states.',
    component: (
      <div className="w-full max-w-72 space-y-4">
        <Input label="Email" placeholder="you@example.com" />
        <Input label="Password" type="password" placeholder="••••••••" error="Password is required" />
      </div>
    ),
    code: `export default function Input({ label, error, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-dark-50">{label}</label>}
      <input
        className={\`w-full px-4 py-2.5 rounded-lg text-sm bg-dark-700
          border border-dark-400/50 focus:outline-none focus:border-brand-500
          focus:ring-1 focus:ring-brand-500/50 transition-all
          \${error ? 'border-red-500' : ''}\`}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}`,
  },

  {
    name: 'Toggle',
    slug: 'toggle',
    category: 'Inputs',
    description: 'Smooth animated toggle switch.',
    component: <ToggleDemo />,
    code: `import { motion } from 'framer-motion'

export default function Toggle({ enabled, onChange, label }) {
  return (
    <button onClick={() => onChange(!enabled)} className="flex items-center gap-3 cursor-pointer">
      <div className={\`relative w-11 h-6 rounded-full transition-colors
        \${enabled ? 'bg-brand-600' : 'bg-dark-400'}\`}>
        <motion.div
          animate={{ x: enabled ? 20 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
        />
      </div>
      {label && <span className="text-sm text-dark-50">{label}</span>}
    </button>
  )
}`,
  },

  // ─── DATA DISPLAY ─────────────────────────────
  {
    name: 'Accordion',
    slug: 'accordion',
    category: 'Data Display',
    description: 'Collapsible content sections with smooth animations.',
    component: (
      <div className="w-full max-w-96">
        <Accordion
          items={[
            { title: 'What is SimpyUI?', content: 'A beautiful React component library with animations.' },
            { title: 'Is it free?', content: 'Yes, it is completely free and open source.' },
            { title: 'How do I install it?', content: 'Just copy the component code into your project.' },
          ]}
        />
      </div>
    ),
    code: `import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="space-y-2 w-full">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={index} className="rounded-lg border border-dark-400/50 bg-dark-700/50 overflow-hidden">
            <button onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium">
              {item.title}
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                <FiChevronDown size={16} />
              </motion.div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}>
                  <div className="px-4 pb-3 text-sm text-dark-100">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}`,
  },

  {
    name: 'Tabs',
    slug: 'tabs',
    category: 'Data Display',
    description: 'Animated tab navigation with smooth underline indicator.',
    component: (
      <div className="w-full max-w-96">
        <Tabs
          tabs={[
            { label: 'Overview', content: <p className="text-sm text-dark-100">This is the overview tab content.</p> },
            { label: 'Features', content: <p className="text-sm text-dark-100">Check out all the amazing features.</p> },
            { label: 'Pricing', content: <p className="text-sm text-dark-100">Simple and transparent pricing.</p> },
          ]}
        />
      </div>
    ),
    code: `import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="w-full">
      <div className="flex border-b border-dark-400/50">
        {tabs.map((tab, i) => (
          <button key={i} onClick={() => setActiveTab(i)}
            className={\`relative px-4 py-2.5 text-sm font-medium
              \${activeTab === i ? 'text-brand-400' : 'text-dark-100 hover:text-white'}\`}>
            {tab.label}
            {activeTab === i && (
              <motion.div layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />
            )}
          </button>
        ))}
      </div>
      <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4">
        {tabs[activeTab].content}
      </motion.div>
    </div>
  )
}`,
  },

  {
    name: 'Progress',
    slug: 'progress',
    category: 'Data Display',
    description: 'Animated progress bar with multiple colors and sizes.',
    component: (
      <div className="w-full max-w-80 space-y-4">
        <Progress value={75} color="brand" size="sm" />
        <Progress value={50} color="green" size="md" />
        <Progress value={30} color="red" size="lg" />
        <Progress value={90} color="yellow" size="md" />
      </div>
    ),
    code: `import { motion } from 'framer-motion'

export default function Progress({ value = 0, max = 100, size = 'md', color = 'brand' }) {
  const percentage = Math.min((value / max) * 100, 100)
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' }
  const colors = { brand: 'bg-brand-500', green: 'bg-green-500', red: 'bg-red-500', yellow: 'bg-yellow-500' }

  return (
    <div className={\`w-full \${heights[size]} bg-dark-500 rounded-full overflow-hidden\`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: \`\${percentage}%\` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={\`h-full \${colors[color]} rounded-full\`}
      />
    </div>
  )
}`,
  },

  {
    name: 'Skeleton',
    slug: 'skeleton',
    category: 'Data Display',
    description: 'Animated loading placeholder with pulsing effect.',
    component: (
      <div className="w-full max-w-72 space-y-3">
        <Skeleton width="100%" height="12px" />
        <Skeleton width="80%" height="12px" />
        <Skeleton width="60%" height="12px" />
        <div className="flex items-center gap-3 mt-4">
          <Skeleton width="40px" height="40px" rounded="full" />
          <div className="space-y-2 flex-1">
            <Skeleton width="100%" height="10px" />
            <Skeleton width="70%" height="10px" />
          </div>
        </div>
      </div>
    ),
    code: `import { motion } from 'framer-motion'

export default function Skeleton({ width = '100%', height = '20px', rounded = 'lg' }) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className={\`bg-dark-500 rounded-\${rounded}\`}
      style={{ width, height }}
    />
  )
}`,
  },

  // ─── FEEDBACK ─────────────────────────────────
  {
    name: 'Modal',
    slug: 'modal',
    category: 'Feedback',
    description: 'Animated dialog with backdrop blur.',
    component: <ModalDemo />,
    code: `import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  return { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }
}

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-xl border border-dark-400/50 bg-dark-700 shadow-2xl">
              <div className="flex items-center justify-between p-5 border-b border-dark-400/50">
                <h3 className="text-lg font-semibold">{title}</h3>
                <button onClick={onClose}><FiX size={18} /></button>
              </div>
              <div className="p-5">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}`,
  },

  {
    name: 'Toast',
    slug: 'toast',
    category: 'Feedback',
    description: 'Notification toast with animated entrance.',
    component: <ToastDemo />,
    code: `import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi'

const toastVariants = {
  success: { bg: 'bg-green-600/10 border-green-600/30', icon: <FiCheckCircle className="text-green-400" /> },
  error:   { bg: 'bg-red-600/10 border-red-600/30',     icon: <FiAlertCircle className="text-red-400" /> },
  info:    { bg: 'bg-brand-600/10 border-brand-600/30',  icon: <FiInfo className="text-brand-400" /> },
}

export default function Toast({ show, onClose, message, variant = 'info' }) {
  const style = toastVariants[variant]
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          className={\`inline-flex items-center gap-3 px-4 py-3 rounded-xl border \${style.bg}\`}>
          {style.icon}
          <span className="text-sm">{message}</span>
          <button onClick={onClose}><FiX size={14} /></button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}`,
  },

  {
    name: 'Alert',
    slug: 'alert',
    category: 'Feedback',
    description: 'Contextual alert banners with icons.',
    component: (
      <div className="w-full max-w-96 space-y-3">
        <Alert variant="info" title="Info">This is an informational alert.</Alert>
        <Alert variant="success" title="Success">Operation completed!</Alert>
        <Alert variant="warning" title="Warning">Please check your input.</Alert>
        <Alert variant="error" title="Error">Something went wrong.</Alert>
      </div>
    ),
    code: `import { motion } from 'framer-motion'
import { FiAlertTriangle, FiInfo, FiCheckCircle, FiXCircle } from 'react-icons/fi'

const alertStyles = {
  info:    { bg: 'bg-brand-600/10 border-brand-600/30',  icon: <FiInfo className="text-brand-400" /> },
  success: { bg: 'bg-green-600/10 border-green-600/30',  icon: <FiCheckCircle className="text-green-400" /> },
  warning: { bg: 'bg-yellow-600/10 border-yellow-600/30', icon: <FiAlertTriangle className="text-yellow-400" /> },
  error:   { bg: 'bg-red-600/10 border-red-600/30',      icon: <FiXCircle className="text-red-400" /> },
}

export default function Alert({ variant = 'info', title, children }) {
  const style = alertStyles[variant]
  return (
    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
      className={\`flex gap-3 p-4 rounded-xl border \${style.bg}\`}>
      <div className="mt-0.5">{style.icon}</div>
      <div>
        {title && <h4 className="text-sm font-semibold mb-1">{title}</h4>}
        <p className="text-sm">{children}</p>
      </div>
    </motion.div>
  )
}`,
  },

  // ─── OVERLAY ──────────────────────────────────
  {
    name: 'Tooltip',
    slug: 'tooltip',
    category: 'Overlay',
    description: 'Hover tooltip with multiple positions.',
    component: (
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <Tooltip text="Top tooltip" position="top">
          <Button variant="outline" size="sm">Top</Button>
        </Tooltip>
        <Tooltip text="Bottom tooltip" position="bottom">
          <Button variant="outline" size="sm">Bottom</Button>
        </Tooltip>
        <Tooltip text="Right tooltip" position="right">
          <Button variant="outline" size="sm">Right</Button>
        </Tooltip>
      </div>
    ),
    code: `export default function Tooltip({ children, text, position = 'top' }) {
  const positions = {
    top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left:   'right-full top-1/2 -translate-y-1/2 mr-2',
    right:  'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div className="relative inline-block group">
      {children}
      <div className={\`absolute \${positions[position]} z-50
        pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity\`}>
        <div className="px-3 py-1.5 rounded-lg bg-dark-500 border border-dark-400/50
          text-xs text-white font-medium whitespace-nowrap shadow-xl">
          {text}
        </div>
      </div>
    </div>
  )
}`,
  },

  // ─── ANIMATION ─────────────────────────────────
  {
    name: 'Social Stories',
    slug: 'social-stories',
    category: 'Animation',
    description: 'Instagram/LinkedIn-style stories viewer with progress bars, video support, and swipe navigation.',
    component: <SocialStoriesDemo />,
    code: `"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ArrowUpRight, X, Loader2 } from "lucide-react"

export type SocialPlatform = "linkedin" | "instagram"

export interface Story {
  id: string
  platform: SocialPlatform
  mediaUrl: string
  linkUrl: string
  caption?: string
  duration?: number
}

interface SocialStoriesProps {
  stories: Story[]
  profile: {
    name: string
    avatarUrl: string
  }
  defaultDuration?: number
}

const isVideo = (url: string) =>
  /\\.(mp4|webm|ogg)$/i.test(url) || url.includes("/video/")

export function SocialStories({
  stories = [],
  profile,
  defaultDuration = 5,
}: SocialStoriesProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMediaReady, setIsMediaReady] = useState(false)
  const [mounted, setMounted] = useState(false)

  const activeProgressBarRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const pausedAtRef = useRef<number | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const lastProgressRef = useRef<number>(0)

  const currentStory = stories[currentIndex]
  const currentIsVideo = isVideo(currentStory?.mediaUrl ?? "")
  const durationMs = ((currentStory?.duration ?? defaultDuration) as number) * 1000

  useEffect(() => { setMounted(true) }, [])

  const setProgress = (value: number) => {
    lastProgressRef.current = Math.max(0, Math.min(1, value))
    if (activeProgressBarRef.current) {
      activeProgressBarRef.current.style.transform = \\\`scaleX(\\\${lastProgressRef.current})\\\`
    }
  }

  const stopAnimation = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  const resetTiming = useCallback((clearProgress = true) => {
    startTimeRef.current = null
    pausedAtRef.current = null
    if (clearProgress) setProgress(0)
    setIsMediaReady(false)
  }, [])

  const goNext = useCallback(() => {
    stopAnimation()
    resetTiming()
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      setIsOpen(false)
      setCurrentIndex(0)
    }
  }, [currentIndex, stories.length, resetTiming])

  const goPrev = useCallback(() => {
    if (currentIndex === 0) return
    stopAnimation()
    resetTiming()
    setCurrentIndex((i) => i - 1)
  }, [currentIndex, resetTiming])

  useEffect(() => {
    if (!isOpen || !isMediaReady || currentIsVideo) return
    const animate = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now
      if (!isPaused) {
        const elapsed = now - startTimeRef.current
        const progress = Math.min(elapsed / durationMs, 1)
        setProgress(progress)
        if (progress >= 1) { stopAnimation(); requestAnimationFrame(goNext); return }
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    stopAnimation()
    rafRef.current = requestAnimationFrame(animate)
    return () => stopAnimation()
  }, [isOpen, isPaused, isMediaReady, durationMs, goNext, currentIsVideo])

  useEffect(() => {
    if (!currentIsVideo || !isOpen) return
    const video = videoRef.current
    const sync = () => {
      if (!video || !video.duration) { rafRef.current = requestAnimationFrame(sync); return }
      setProgress(video.currentTime / video.duration)
      rafRef.current = requestAnimationFrame(sync)
    }
    if (isMediaReady && !isPaused) { stopAnimation(); rafRef.current = requestAnimationFrame(sync) }
    return () => stopAnimation()
  }, [currentIsVideo, isPaused, isOpen, isMediaReady])

  useEffect(() => {
    if (isPaused) {
      if (pausedAtRef.current === null) pausedAtRef.current = performance.now()
      videoRef.current?.pause()
      stopAnimation()
    } else {
      if (pausedAtRef.current !== null && startTimeRef.current !== null) {
        startTimeRef.current += performance.now() - pausedAtRef.current
        pausedAtRef.current = null
      }
      if (currentIsVideo) videoRef.current?.play().catch(() => {})
    }
  }, [isPaused, currentIsVideo])

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button, a")) return
    const { width } = e.currentTarget.getBoundingClientRect()
    e.nativeEvent.offsetX < width / 3 ? goPrev() : goNext()
  }

  if (!mounted) return null

  return (
    <>
      <div className="relative w-12 h-12 sm:w-16 sm:h-16 cursor-pointer z-10">
        {!isOpen && (
          <motion.div layoutId="story-trigger" onClick={() => setIsOpen(true)}
            className="absolute inset-0 rounded-full p-[4px]"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <div className="absolute inset-0 rounded-full border-[3px] border-yellow-500
              shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
            <div className="absolute inset-[6px] rounded-full overflow-hidden bg-zinc-800 ring-2 ring-black">
              <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
            </div>
          </motion.div>
        )}
      </div>

      {createPortal(
        <AnimatePresence>
          {isOpen && currentStory && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto">
              <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }} />
              <motion.div layoutId="story-card-modal"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="relative w-[90vw] h-auto aspect-[9/16] max-h-[85vh] max-w-[420px]
                  bg-black rounded-[20px] md:rounded-[30px] overflow-hidden shadow-2xl
                  border border-white/10 flex flex-col">
                <div className="relative w-full h-full flex-1"
                  onMouseDown={() => setIsPaused(true)} onMouseUp={handleTap}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={() => setIsPaused(true)} onTouchEnd={() => setIsPaused(false)}>
                  {!isMediaReady && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900">
                      <Loader2 className="w-8 h-8 animate-spin text-white/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-zinc-900">
                    {currentIsVideo ? (
                      <video ref={videoRef} src={currentStory.mediaUrl} playsInline autoPlay
                        className="w-full h-full object-cover"
                        onLoadedData={() => { setIsMediaReady(true); if (!isPaused) videoRef.current?.play().catch(() => {}) }}
                        onEnded={goNext} />
                    ) : (
                      <img src={currentStory.mediaUrl} alt="Story"
                        className="absolute inset-0 w-full h-full object-cover"
                        onLoad={() => setIsMediaReady(true)} />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />
                  <div className="absolute top-4 left-4 right-4 flex gap-1.5 z-20">
                    {stories.map((_, i) => (
                      <div key={i} className="h-[2px] flex-1 bg-white/30 rounded-full overflow-hidden">
                        <div ref={i === currentIndex ? activeProgressBarRef : null}
                          className="h-full bg-white origin-left"
                          style={{ transform: i < currentIndex ? "scaleX(1)" : "scaleX(0)" }} />
                      </div>
                    ))}
                  </div>
                  <div className="absolute top-8 left-4 right-4 flex justify-between items-center z-20">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/20">
                        <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white text-sm font-semibold leading-none drop-shadow-sm">{profile.name}</span>
                        <span className="text-white/70 text-[10px] uppercase tracking-wider mt-0.5">{currentStory.platform}</span>
                      </div>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setIsOpen(false) }}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors">
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-6 left-5 right-5 flex items-end justify-between gap-4 z-20">
                    <div className="flex-1">
                      <p className="text-white text-[15px] font-medium leading-relaxed drop-shadow-md line-clamp-2">{currentStory.caption}</p>
                    </div>
                    {currentStory.linkUrl && (
                      <a href={currentStory.linkUrl} target="_blank" rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-white/20
                          hover:bg-white/30 backdrop-blur-md border border-white/10 transition-all hover:scale-105">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}`,
  },
]
