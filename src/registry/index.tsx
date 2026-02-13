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
import DockCode from './dock/dock.tsx?raw'
import MarqueeCode from './marquee/marquee.tsx?raw'
import TextAnimateCode from './text-animate/text-animate.tsx?raw'
import TiltCardCode from './tilt-card/tilt-card.tsx?raw'
import MagneticButtonCode from './magnetic-button/magnetic-button.tsx?raw'
import FileUploadCode from './file-upload/file-upload.tsx?raw'
import DitherShaderCode from './DitherShader/dither-shader.tsx?raw'
import Compare from './Compare/compare.tsx?raw'
import KeyboardCode from './keyboard/keyboard.tsx?raw'
import BackgroundGradientCode from './background-gradient/background-gradient.tsx?raw'

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
import DynamicIslandCode from './dynamic-island/dynamic-island.tsx?raw'
import DynamicIslandDemoCode from './dynamic-island/dynamic-island.demo.tsx?raw'
import DockDemoCode from './dock/dock.demo.tsx?raw'
import MarqueeDemoCode from './marquee/marquee.demo.tsx?raw'
import TextAnimateDemoCode from './text-animate/text-animate.demo.tsx?raw'
import TiltCardDemoCode from './tilt-card/tilt-card.demo.tsx?raw'
import MagneticButtonDemoCode from './magnetic-button/magnetic-button.demo.tsx?raw'
import FileUploadDemoCode from './file-upload/file-upload.demo.tsx?raw'
import DitherShaderDemoCode from './DitherShader/dither-shader.demo.tsx?raw'
import CompareDemoCode from './Compare/compare.demo.tsx?raw'
import KeyboardDemoCode from './keyboard/keyboard.demo.tsx?raw'
import BackgroundGradientDemoCode from './background-gradient/background-gradient.demo.tsx?raw'

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
const DynamicIslandDemo = lazy(() => import('./dynamic-island/dynamic-island.demo'))
const DockDemo = lazy(() => import('./dock/dock.demo'))
const MarqueeDemo = lazy(() => import('./marquee/marquee.demo'))
const TextAnimateDemo = lazy(() => import('./text-animate/text-animate.demo'))
const TiltCardDemo = lazy(() => import('./tilt-card/tilt-card.demo'))
const MagneticButtonDemo = lazy(() => import('./magnetic-button/magnetic-button.demo'))
const FileUploadDemo = lazy(() => import('./file-upload/file-upload.demo'))
const DitherShaderDemo = lazy(() => import('./DitherShader/dither-shader.demo'))
const CompareDemo = lazy(() => import('./Compare/compare.demo'))
const KeyboardDemo = lazy(() => import('./keyboard/keyboard.demo'))
const BackgroundGradientDemo = lazy(() => import('./background-gradient/background-gradient.demo'))

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
  { name: 'Button', slug: 'button', category: 'General', description: 'Animated button with multiple variants and sizes.', component: demo(ButtonDemo), code: ButtonCode, demoCode: ButtonDemoCode },
  { name: 'Card', slug: 'card', category: 'General', description: 'Versatile card container with hover and glow effects.', component: demo(CardDemo), code: CardCode, demoCode: CardDemoCode },
  { name: 'Badge', slug: 'badge', category: 'General', description: 'Small status indicators with colorful variants.', component: demo(BadgeDemo), code: BadgeCode, demoCode: BadgeDemoCode },
  { name: 'Avatar', slug: 'avatar', category: 'General', description: 'User avatar with image support and fallback initials.', component: demo(AvatarDemo), code: AvatarCode, demoCode: AvatarDemoCode },

  // ─── INPUTS ───────────────────────────────────
  { name: 'Input', slug: 'input', category: 'Inputs', description: 'Styled text input with label and error states.', component: demo(InputDemo), code: InputCode, demoCode: InputDemoCode },
  { name: 'Toggle', slug: 'toggle', category: 'Inputs', description: 'Smooth animated toggle switch.', component: demo(ToggleDemo), code: ToggleCode, demoCode: ToggleDemoCode },
  { name: 'File Upload', slug: 'file-upload', category: 'Inputs', description: 'Drag-and-drop file upload with preview and animation.', component: demo(FileUploadDemo), code: FileUploadCode, demoCode: FileUploadDemoCode },

  // ─── DATA DISPLAY ─────────────────────────────
  { name: 'Accordion', slug: 'accordion', category: 'Data Display', description: 'Collapsible content sections with smooth animations.', component: demo(AccordionDemo), code: AccordionCode, demoCode: AccordionDemoCode },
  { name: 'Tabs', slug: 'tabs', category: 'Data Display', description: 'Animated tab navigation with smooth underline indicator.', component: demo(TabsDemo), code: TabsCode, demoCode: TabsDemoCode },
  { name: 'Progress', slug: 'progress', category: 'Data Display', description: 'Animated progress bar with multiple colors and sizes.', component: demo(ProgressDemo), code: ProgressCode, demoCode: ProgressDemoCode },
  { name: 'Skeleton', slug: 'skeleton', category: 'Data Display', description: 'Animated loading placeholder with pulsing effect.', component: demo(SkeletonDemo), code: SkeletonCode, demoCode: SkeletonDemoCode },

  // ─── FEEDBACK ─────────────────────────────────
  { name: 'Modal', slug: 'modal', category: 'Feedback', description: 'Animated dialog with backdrop blur.', component: demo(ModalDemo), code: ModalCode, demoCode: ModalDemoCode },
  { name: 'Toast', slug: 'toast', category: 'Feedback', description: 'Notification toast with animated entrance.', component: demo(ToastDemo), code: ToastCode, demoCode: ToastDemoCode },
  { name: 'Alert', slug: 'alert', category: 'Feedback', description: 'Contextual alert banners with icons.', component: demo(AlertDemo), code: AlertCode, demoCode: AlertDemoCode },

  // ─── OVERLAY ──────────────────────────────────
  { name: 'Tooltip', slug: 'tooltip', category: 'Overlay', description: 'Hover tooltip with multiple positions.', component: demo(TooltipDemo), code: TooltipCode, demoCode: TooltipDemoCode },

  // ─── ANIMATION ────────────────────────────────
  { name: 'Social Stories', slug: 'social-stories', category: 'Animation', description: 'Instagram/LinkedIn-style stories viewer with progress bars, video support, and swipe navigation.', component: demo(SocialStoriesDemo), code: SocialStoriesCode, demoCode: SocialStoriesDemoCode },
  { name: 'Dynamic Island', slug: 'dynamic-island', category: 'Animation', description: 'Apple-style Dynamic Island with ring, timer, music, call, screen record, and battery modes.', component: demo(DynamicIslandDemo), code: DynamicIslandCode, demoCode: DynamicIslandDemoCode },
  { name: 'Dock', slug: 'dock', category: 'Animation', description: 'macOS-style dock with magnification effect on hover.', component: demo(DockDemo), code: DockCode, demoCode: DockDemoCode },
  { name: 'Marquee', slug: 'marquee', category: 'Animation', description: 'Infinite scrolling ticker with pause on hover.', component: demo(MarqueeDemo), code: MarqueeCode, demoCode: MarqueeDemoCode },
  { name: 'Text Animate', slug: 'text-animate', category: 'Animation', description: 'Letter-by-letter and word-by-word text reveal animations.', component: demo(TextAnimateDemo), code: TextAnimateCode, demoCode: TextAnimateDemoCode },
  { name: 'Tilt Card', slug: 'tilt-card', category: 'Animation', description: '3D perspective tilt card with glare spotlight on hover.', component: demo(TiltCardDemo), code: TiltCardCode, demoCode: TiltCardDemoCode },
  { name: 'Magnetic Button', slug: 'magnetic-button', category: 'Animation', description: 'Button that magnetically follows the cursor when nearby.', component: demo(MagneticButtonDemo), code: MagneticButtonCode, demoCode: MagneticButtonDemoCode },
  { name: 'Dither Shader', slug: 'dither-shader', category: 'Animation', description: 'Image dithering effect with multiple modes and color options.', component: demo(DitherShaderDemo), code: DitherShaderCode, demoCode: DitherShaderDemoCode },
  { name: 'Keyboard', slug: 'keyboard', category: 'Animation', description: 'A mac style keyboard component with mechanical keys sound effects.', component: demo(KeyboardDemo), code: KeyboardCode, demoCode: KeyboardDemoCode },
  { name: 'Background Gradient', slug: 'background-gradient', category: 'Animation', description: 'Animated radial gradient background effect.', component: demo(BackgroundGradientDemo), code: BackgroundGradientCode, demoCode: BackgroundGradientDemoCode },

  // ─── UTILITY ──────────────────────────────────
  { name: 'Compare', slug: 'compare', category: 'Utility', description: 'Image comparison slider component.', component: demo(CompareDemo), code: Compare, demoCode: CompareDemoCode },
]
