/*
 * =============================================
 *  SIMPYUI COMPONENT REGISTRY
 * =============================================
 *
 *  Maps every component to:
 *   - files:        which files to download
 *   - dependencies: npm packages the component needs
 *   - internal:     other SimpyUI components this depends on
 *
 *  GitHub raw base:
 *    https://raw.githubusercontent.com/AbhishekS04/SimpyUI/main/src/registry
 *
 * =============================================
 */

export interface RegistryComponent {
  name: string
  slug: string
  files: string[]           // paths relative to registry root on GitHub
  dependencies: string[]    // npm packages to install
  internal: string[]        // other simpyui components this requires
  description: string
}

export const GITHUB_RAW_BASE =
  'https://raw.githubusercontent.com/AbhishekS04/SimpyUI/main/src/registry'

export const registry: Record<string, RegistryComponent> = {
  button: {
    name: 'Button',
    slug: 'button',
    files: ['button/button.tsx'],
    dependencies: ['framer-motion'],
    internal: [],
    description: 'Animated button with multiple variants and sizes.',
  },
  card: {
    name: 'Card',
    slug: 'card',
    files: ['card/card.tsx'],
    dependencies: ['framer-motion'],
    internal: [],
    description: 'Versatile card container with hover and glow effects.',
  },
  badge: {
    name: 'Badge',
    slug: 'badge',
    files: ['badge/badge.tsx'],
    dependencies: ['framer-motion'],
    internal: [],
    description: 'Small status indicators with colorful variants.',
  },
  avatar: {
    name: 'Avatar',
    slug: 'avatar',
    files: ['avatar/avatar.tsx'],
    dependencies: ['framer-motion'],
    internal: [],
    description: 'User avatar with image support and fallback initials.',
  },
  input: {
    name: 'Input',
    slug: 'input',
    files: ['input/input.tsx'],
    dependencies: [],
    internal: [],
    description: 'Styled text input with label and error states.',
  },
  toggle: {
    name: 'Toggle',
    slug: 'toggle',
    files: ['toggle/toggle.tsx'],
    dependencies: ['framer-motion'],
    internal: [],
    description: 'Smooth animated toggle switch.',
  },
  accordion: {
    name: 'Accordion',
    slug: 'accordion',
    files: ['accordion/accordion.tsx'],
    dependencies: ['framer-motion', 'react-icons'],
    internal: [],
    description: 'Collapsible content sections with smooth animations.',
  },
  tabs: {
    name: 'Tabs',
    slug: 'tabs',
    files: ['tabs/tabs.tsx'],
    dependencies: ['framer-motion'],
    internal: [],
    description: 'Animated tab navigation with smooth underline indicator.',
  },
  progress: {
    name: 'Progress',
    slug: 'progress',
    files: ['progress/progress.tsx'],
    dependencies: ['framer-motion'],
    internal: [],
    description: 'Animated progress bar with multiple colors and sizes.',
  },
  skeleton: {
    name: 'Skeleton',
    slug: 'skeleton',
    files: ['skeleton/skeleton.tsx'],
    dependencies: ['framer-motion'],
    internal: [],
    description: 'Animated loading placeholder with pulsing effect.',
  },
  modal: {
    name: 'Modal',
    slug: 'modal',
    files: ['modal/modal.tsx'],
    dependencies: ['framer-motion', 'react-icons'],
    internal: [],
    description: 'Animated dialog with backdrop blur.',
  },
  toast: {
    name: 'Toast',
    slug: 'toast',
    files: ['toast/toast.tsx'],
    dependencies: ['framer-motion', 'react-icons'],
    internal: [],
    description: 'Notification toast with animated entrance.',
  },
  alert: {
    name: 'Alert',
    slug: 'alert',
    files: ['alert/alert.tsx'],
    dependencies: ['framer-motion', 'react-icons'],
    internal: [],
    description: 'Contextual alert banners with icons.',
  },
  tooltip: {
    name: 'Tooltip',
    slug: 'tooltip',
    files: ['tooltip/tooltip.tsx'],
    dependencies: [],
    internal: [],
    description: 'Hover tooltip with multiple positions.',
  },
  'social-stories': {
    name: 'Social Stories',
    slug: 'social-stories',
    files: ['social-stories/social-stories.tsx'],
    dependencies: ['framer-motion', 'lucide-react'],
    internal: [],
    description: 'Instagram/LinkedIn-style stories viewer with progress bars and video support.',
  },
}

export const allComponentNames = Object.keys(registry)
