/*
 * =============================================
 *  SIMPY UI - COMPONENT REGISTRY
 * =============================================
 *
 *  HOW TO ADD A NEW COMPONENT:
 *  1. Create a folder:  src/registry/<slug>/
 *  2. Add two files:    <slug>.tsx  (component)  +  <slug>.demo.tsx  (demo)
 *  3. Import the raw code + demo below and add a registry entry.
 *  That's it! It auto-appears in the sidebar & components page.
 *
 * =============================================
 */

import { type ReactNode, lazy, Suspense } from 'react'

/* ── Raw source code (Vite ?raw imports) ── */

import ButtonCode from './button/button.tsx?raw'
import CardCode from './card/card.tsx?raw'
import BadgeCode from './badge/badge.tsx?raw'
import AvatarCode from './avatar/avatar.tsx?raw'
import InputCode from './input/input.tsx?raw'
import ToggleCode from './toggle/toggle.tsx?raw'
import AccordionCode from './accordion/accordion.tsx?raw'
import TabsCode from './tabs/tabs.tsx?raw'
import ProgressCode from './progress/progress.tsx?raw'
import SkeletonCode from './skeleton/skeleton.tsx?raw'
import ModalCode from './modal/modal.tsx?raw'
import ToastCode from './toast/toast.tsx?raw'
import AlertCode from './alert/alert.tsx?raw'
import TooltipCode from './tooltip/tooltip.tsx?raw'
import SocialStoriesCode from './social-stories/social-stories.tsx?raw'

/* ── Raw demo code (Vite ?raw imports) ── */

import ButtonDemoCode from './button/button.demo.tsx?raw'
import CardDemoCode from './card/card.demo.tsx?raw'
import BadgeDemoCode from './badge/badge.demo.tsx?raw'
import AvatarDemoCode from './avatar/avatar.demo.tsx?raw'
import InputDemoCode from './input/input.demo.tsx?raw'
import ToggleDemoCode from './toggle/toggle.demo.tsx?raw'
import AccordionDemoCode from './accordion/accordion.demo.tsx?raw'
import TabsDemoCode from './tabs/tabs.demo.tsx?raw'
import ProgressDemoCode from './progress/progress.demo.tsx?raw'
import SkeletonDemoCode from './skeleton/skeleton.demo.tsx?raw'
import ModalDemoCode from './modal/modal.demo.tsx?raw'
import ToastDemoCode from './toast/toast.demo.tsx?raw'
import AlertDemoCode from './alert/alert.demo.tsx?raw'
import TooltipDemoCode from './tooltip/tooltip.demo.tsx?raw'
import SocialStoriesDemoCode from './social-stories/social-stories.demo.tsx?raw'

/* ── Lazy-loaded demos ── */

const ButtonDemo = lazy(() => import('./button/button.demo'))
const CardDemo = lazy(() => import('./card/card.demo'))
const BadgeDemo = lazy(() => import('./badge/badge.demo'))
const AvatarDemo = lazy(() => import('./avatar/avatar.demo'))
const InputDemo = lazy(() => import('./input/input.demo'))
const ToggleDemo = lazy(() => import('./toggle/toggle.demo'))
const AccordionDemo = lazy(() => import('./accordion/accordion.demo'))
const TabsDemo = lazy(() => import('./tabs/tabs.demo'))
const ProgressDemo = lazy(() => import('./progress/progress.demo'))
const SkeletonDemo = lazy(() => import('./skeleton/skeleton.demo'))
const ModalDemo = lazy(() => import('./modal/modal.demo'))
const ToastDemo = lazy(() => import('./toast/toast.demo'))
const AlertDemo = lazy(() => import('./alert/alert.demo'))
const TooltipDemo = lazy(() => import('./tooltip/tooltip.demo'))
const SocialStoriesDemo = lazy(() => import('./social-stories/social-stories.demo'))

/* ── Registry entry type ── */

export interface ComponentRegistryEntry {
  name: string
  slug: string
  category: string
  description: string
  component: ReactNode
  code: string
  demoCode: string
}

/* ── Helper: wrap lazy demo in Suspense ── */

function demo(Component: React.LazyExoticComponent<React.ComponentType>) {
  return (
    <Suspense fallback={<div className="animate-pulse h-16 bg-dark-500/30 rounded-lg" />}>
      <Component />
    </Suspense>
  )
}

/* ── THE REGISTRY ── */

export const componentRegistry: ComponentRegistryEntry[] = [
  // ─── GENERAL ──────────────────────────────────
  { name: 'Button',    slug: 'button',    category: 'General',      description: 'Animated button with multiple variants and sizes.',     component: demo(ButtonDemo),    code: ButtonCode, demoCode: ButtonDemoCode },
  { name: 'Card',      slug: 'card',      category: 'General',      description: 'Versatile card container with hover and glow effects.', component: demo(CardDemo),      code: CardCode, demoCode: CardDemoCode },
  { name: 'Badge',     slug: 'badge',     category: 'General',      description: 'Small status indicators with colorful variants.',       component: demo(BadgeDemo),     code: BadgeCode, demoCode: BadgeDemoCode },
  { name: 'Avatar',    slug: 'avatar',    category: 'General',      description: 'User avatar with image support and fallback initials.', component: demo(AvatarDemo),    code: AvatarCode, demoCode: AvatarDemoCode },

  // ─── INPUTS ───────────────────────────────────
  { name: 'Input',     slug: 'input',     category: 'Inputs',       description: 'Styled text input with label and error states.',        component: demo(InputDemo),     code: InputCode, demoCode: InputDemoCode },
  { name: 'Toggle',    slug: 'toggle',    category: 'Inputs',       description: 'Smooth animated toggle switch.',                       component: demo(ToggleDemo),    code: ToggleCode, demoCode: ToggleDemoCode },

  // ─── DATA DISPLAY ─────────────────────────────
  { name: 'Accordion', slug: 'accordion', category: 'Data Display', description: 'Collapsible content sections with smooth animations.',  component: demo(AccordionDemo), code: AccordionCode, demoCode: AccordionDemoCode },
  { name: 'Tabs',      slug: 'tabs',      category: 'Data Display', description: 'Animated tab navigation with smooth underline indicator.', component: demo(TabsDemo),  code: TabsCode, demoCode: TabsDemoCode },
  { name: 'Progress',  slug: 'progress',  category: 'Data Display', description: 'Animated progress bar with multiple colors and sizes.', component: demo(ProgressDemo),  code: ProgressCode, demoCode: ProgressDemoCode },
  { name: 'Skeleton',  slug: 'skeleton',  category: 'Data Display', description: 'Animated loading placeholder with pulsing effect.',     component: demo(SkeletonDemo),  code: SkeletonCode, demoCode: SkeletonDemoCode },

  // ─── FEEDBACK ─────────────────────────────────
  { name: 'Modal',     slug: 'modal',     category: 'Feedback',     description: 'Animated dialog with backdrop blur.',                  component: demo(ModalDemo),     code: ModalCode, demoCode: ModalDemoCode },
  { name: 'Toast',     slug: 'toast',     category: 'Feedback',     description: 'Notification toast with animated entrance.',            component: demo(ToastDemo),     code: ToastCode, demoCode: ToastDemoCode },
  { name: 'Alert',     slug: 'alert',     category: 'Feedback',     description: 'Contextual alert banners with icons.',                 component: demo(AlertDemo),     code: AlertCode, demoCode: AlertDemoCode },

  // ─── OVERLAY ──────────────────────────────────
  { name: 'Tooltip',   slug: 'tooltip',   category: 'Overlay',      description: 'Hover tooltip with multiple positions.',               component: demo(TooltipDemo),   code: TooltipCode, demoCode: TooltipDemoCode },

  // ─── ANIMATION ────────────────────────────────
  { name: 'Social Stories', slug: 'social-stories', category: 'Animation', description: 'Instagram/LinkedIn-style stories viewer with progress bars, video support, and swipe navigation.', component: demo(SocialStoriesDemo), code: SocialStoriesCode, demoCode: SocialStoriesDemoCode },
]
