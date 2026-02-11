# SimpyUI — Component Roadmap

> **Last updated:** 2026-02-12
> **Stack:** React 18 · Framer Motion · Tailwind CSS · Vite
> **Optional deps:** GSAP (for scroll/timeline-heavy components), Lenis (already installed), lucide-react (installed)

---

## How to Add a New Component

```
1.  Create the file        →  src/components/ui/YourComponent.jsx
2.  Register it            →  src/registry/index.jsx  (add entry to componentRegistry[])
3.  Done!                  →  Auto-appears in Sidebar, Components page & /components/:slug
```

### Registry Entry Template

```jsx
{
  name: 'ComponentName',
  slug: 'component-name',
  category: 'Category',          // General | Inputs | Data Display | Feedback | Overlay | Layout | Navigation | Animation
  description: 'One-liner.',
  component: (
    <ComponentName /* demo props */ />
  ),
  code: `// paste full source code string here`,
},
```

---

## Existing Components (14)

| #  | Component     | Category      | File                        | Animation Lib   | Status |
|----|---------------|---------------|-----------------------------|-----------------|--------|
| 1  | Button        | General       | `ui/Button.jsx`             | Framer Motion   | ✅ Done |
| 2  | Card          | General       | `ui/Card.jsx`               | Framer Motion   | ✅ Done |
| 3  | Badge         | General       | `ui/Badge.jsx`              | Framer Motion   | ✅ Done |
| 4  | Avatar        | General       | `ui/Avatar.jsx`             | Framer Motion   | ✅ Done |
| 5  | Input         | Inputs        | `ui/Input.jsx`              | CSS             | ✅ Done |
| 6  | Toggle        | Inputs        | `ui/Toggle.jsx`             | Framer Motion   | ✅ Done |
| 7  | Accordion     | Data Display  | `ui/Accordion.jsx`          | Framer Motion   | ✅ Done |
| 8  | Tabs          | Data Display  | `ui/Tabs.jsx`               | Framer Motion   | ✅ Done |
| 9  | Progress      | Data Display  | `ui/Progress.jsx`           | Framer Motion   | ✅ Done |
| 10 | Skeleton      | Data Display  | `ui/Skeleton.jsx`           | Framer Motion   | ✅ Done |
| 11 | Modal         | Feedback      | `ui/Modal.jsx`              | Framer Motion   | ✅ Done |
| 12 | Toast         | Feedback      | `ui/Toast.jsx`              | Framer Motion   | ✅ Done |
| 13 | Alert         | Feedback      | `ui/Alert.jsx`              | Framer Motion   | ✅ Done |
| 14 | Tooltip       | Overlay       | `ui/Tooltip.jsx`            | CSS             | ✅ Done |
| 15 | Social Stories | Animation     | `ui/SocialStories.jsx`      | Framer Motion + lucide-react | ✅ Done |

---

## Planned Components

> **Priority:** 🔴 High  🟡 Medium  🟢 Low
> **Status:** 📋 Planned · 🚧 WIP · ✅ Done

---

### 15 · Dropdown Menu
| Key | Value |
|-----|-------|
| **Slug** | `dropdown-menu` |
| **Category** | Navigation |
| **Priority** | 🔴 High |
| **Animation** | Framer Motion |
| **Status** | 📋 Planned |
| **Dependencies** | `framer-motion` |
| **File** | `ui/DropdownMenu.jsx` |

**Description:** Animated dropdown menu triggered by a button. Supports icon items, dividers, and keyboard navigation.

**Mockup / Preview Idea:**
```
┌──────────────┐
│  Actions  ▾  │  ← trigger button
└──────────────┘
  ┌──────────────────┐
  │ ✏️  Edit          │  ← menu items with icons
  │ 📋  Duplicate     │
  │ ───────────────  │  ← divider
  │ 🗑️  Delete        │  ← danger item (red)
  └──────────────────┘
```

**Props:**
```ts
trigger: ReactNode       // button/element that opens dropdown
items: { label, icon?, onClick, variant? }[]
align?: 'left' | 'right'  // default 'left'
```

**Animation Spec:**
- Enter: `opacity 0→1`, `y: -8→0`, `scale: 0.95→1` — spring, 300ms
- Exit: `opacity 1→0`, `scale: 1→0.95` — ease-out, 150ms
- Stagger children items 30ms each

---

### 16 · Select / Combobox
| Key | Value |
|-----|-------|
| **Slug** | `select` |
| **Category** | Inputs |
| **Priority** | 🔴 High |
| **Animation** | Framer Motion |
| **Status** | 📋 Planned |
| **Dependencies** | `framer-motion` |
| **File** | `ui/Select.jsx` |

**Description:** Custom styled select dropdown with search/filter, multi-select option, and smooth open/close animation.

**Mockup / Preview Idea:**
```
  Label: Framework
  ┌─────────────────────────┐
  │  React              ▾   │  ← styled trigger
  └─────────────────────────┘
    ┌─────────────────────────┐
    │ 🔍 Search...            │
    │ ─────────────────────── │
    │ ● React                 │  ← selected
    │   Vue                   │
    │   Angular               │
    │   Svelte                │
    └─────────────────────────┘
```

**Props:**
```ts
options: { value, label, icon? }[]
value: string | string[]
onChange: (value) => void
placeholder?: string
searchable?: boolean       // default false
multiple?: boolean         // default false
label?: string
error?: string
```

---

### 17 · Slider / Range
| Key | Value |
|-----|-------|
| **Slug** | `slider` |
| **Category** | Inputs |
| **Priority** | 🟡 Medium |
| **Animation** | Framer Motion (drag) |
| **Status** | 📋 Planned |
| **Dependencies** | `framer-motion` |
| **File** | `ui/Slider.jsx` |

**Description:** Draggable range slider with smooth thumb animation, value tooltip, and optional range mode (two thumbs).

**Mockup / Preview Idea:**
```
  Volume: 72
  ──────────●━━━━━━━━━━━
            ↑ draggable thumb with hover tooltip showing value
  
  Price Range: $20 – $80
  ━━━━━●──────────●━━━━━
       $20        $80    ← dual thumb range mode
```

**Props:**
```ts
min?: number              // default 0
max?: number              // default 100
value: number | [number, number]
onChange: (value) => void
step?: number             // default 1
showTooltip?: boolean     // default true
label?: string
color?: 'brand' | 'green' | 'red'
```

**Animation Spec:**
- Thumb: `whileHover={{ scale: 1.3 }}`, `whileTap={{ scale: 1.1 }}`
- Track fill: `layout` transition, spring
- Tooltip: fade in on hover/drag

---

### 18 · Breadcrumb
| Key | Value |
|-----|-------|
| **Slug** | `breadcrumb` |
| **Category** | Navigation |
| **Priority** | 🟡 Medium |
| **Animation** | Framer Motion |
| **Status** | 📋 Planned |
| **Dependencies** | `framer-motion` |
| **File** | `ui/Breadcrumb.jsx` |

**Description:** Navigation breadcrumb trail with animated separators and hover effects.

**Mockup / Preview Idea:**
```
  Home  /  Components  /  Button
  ↑ each segment clickable, last one is active (white, bold)
  separators fade in with stagger
```

**Props:**
```ts
items: { label, href? }[]
separator?: ReactNode      // default '/'
```

---

### 19 · Drawer / Sheet
| Key | Value |
|-----|-------|
| **Slug** | `drawer` |
| **Category** | Overlay |
| **Priority** | 🔴 High |
| **Animation** | Framer Motion |
| **Status** | 📋 Planned |
| **Dependencies** | `framer-motion` |
| **File** | `ui/Drawer.jsx` |

**Description:** Slide-in panel from left/right/bottom with backdrop blur. Great for mobile menus, filters, or detail views.

**Mockup / Preview Idea:**
```
  ┌────────────────────────────────────┐
  │                          ┌────────┐│
  │   backdrop (blur + dim)  │ Drawer ││  ← slides in from right
  │                          │        ││
  │                          │ content││
  │                          │        ││
  │                          │ [Close]││
  │                          └────────┘│
  └────────────────────────────────────┘
```

**Props:**
```ts
isOpen: boolean
onClose: () => void
side?: 'left' | 'right' | 'bottom'  // default 'right'
title?: string
children: ReactNode
width?: string             // default '320px'
```

**Animation Spec:**
- Slide `x: 100%→0` (right) or `x: -100%→0` (left) or `y: 100%→0` (bottom)
- Backdrop: `opacity 0→1`
- Spring transition: `stiffness: 300, damping: 30`

---

### 20 · Popover
| Key | Value |
|-----|-------|
| **Slug** | `popover` |
| **Category** | Overlay |
| **Priority** | 🟡 Medium |
| **Animation** | Framer Motion |
| **Status** | 📋 Planned |
| **Dependencies** | `framer-motion` |
| **File** | `ui/Popover.jsx` |

**Description:** Click-triggered floating content panel with arrow, positioned relative to trigger element.

**Mockup / Preview Idea:**
```
      ┌─────────────────────┐
      │  Popover Content     │
      │  Any JSX goes here   │
      └────────▽────────────┘
          [Trigger Button]
```

**Props:**
```ts
trigger: ReactNode
children: ReactNode
position?: 'top' | 'bottom' | 'left' | 'right'
```

---

### 21 · Marquee / Infinite Scroll
| Key | Value |
|-----|-------|
| **Slug** | `marquee` |
| **Category** | Animation |
| **Priority** | 🟡 Medium |
| **Animation** | CSS / GSAP |
| **Status** | 📋 Planned |
| **Dependencies** | CSS keyframes (or optional `gsap`) |
| **File** | `ui/Marquee.jsx` |

**Description:** Smooth infinite horizontal scroll of logos, testimonials, or any content. Pauses on hover.

**Mockup / Preview Idea:**
```
  ←  Logo1   Logo2   Logo3   Logo4   Logo5   Logo1   Logo2  ←
      continuous scroll, duplicated children for seamless loop
      hover → pause
```

**Props:**
```ts
children: ReactNode
speed?: number             // default 30 (px/s)
direction?: 'left' | 'right'
pauseOnHover?: boolean     // default true
gap?: string               // default '2rem'
```

**Animation Spec (CSS approach):**
```css
@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```
Duplicate children → animate entire strip → `animation-play-state: paused` on hover.

**Animation Spec (GSAP approach):**
- `gsap.to(track, { xPercent: -50, duration, ease: 'none', repeat: -1 })`
- On hover: `tween.pause()` / `tween.resume()`
- Install: `npm i gsap`

---

### 22 · Magnetic Button
| Key | Value |
|-----|-------|
| **Slug** | `magnetic-button` |
| **Category** | Animation |
| **Priority** | 🟢 Low |
| **Animation** | GSAP or Framer Motion |
| **Status** | 📋 Planned |
| **Dependencies** | `framer-motion` (or `gsap`) |
| **File** | `ui/MagneticButton.jsx` |

**Description:** Button that magnetically follows the cursor when hovering nearby, with elastic snap-back.

**Mockup / Preview Idea:**
```
                 🖱️ cursor nearby
                ↙
          [ Hover Me ]  ← button subtly shifts toward cursor
          
  cursor leaves → button springs back to center
```

**Props:**
```ts
children: ReactNode
strength?: number          // default 0.3 (how much it follows)
radius?: number            // default 150 (px, activation zone)
```

**Animation Spec (Framer Motion):**
- Track `onMouseMove` within parent div
- `useMotionValue` for x, y offset
- `useSpring(motionValue, { stiffness: 150, damping: 15 })`
- Reset on `onMouseLeave`

**Animation Spec (GSAP):**
- `gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.4, ease: 'power3.out' })`
- `gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' })` on leave

---

### 23 · Text Reveal / Typewriter
| Key | Value |
|-----|-------|
| **Slug** | `text-reveal` |
| **Category** | Animation |
| **Priority** | 🟡 Medium |
| **Animation** | Framer Motion / GSAP |
| **Status** | 📋 Planned |
| **Dependencies** | `framer-motion` |
| **File** | `ui/TextReveal.jsx` |

**Description:** Animated text that reveals character-by-character or word-by-word on scroll or mount. Multiple modes: typewriter, blur-in, slide-up.

**Mockup / Preview Idea:**
```
  Mode: typewriter
  "Build beautiful|"  ← cursor blinks, chars appear one by one

  Mode: word-by-word blur
  "Build"  →  "Build beautiful"  →  "Build beautiful interfaces"
   each word blurs in from below

  Mode: letter slide-up
  B u i l d   b e a u t i f u l
  ↑ each letter slides up with stagger
```

**Props:**
```ts
text: string
mode?: 'typewriter' | 'blur' | 'slide'   // default 'typewriter'
speed?: number             // ms per character/word
trigger?: 'mount' | 'inView'
cursor?: boolean           // typewriter mode only
```

**Animation Spec (Framer Motion — slide mode):**
- Split text into chars → wrap each in `<motion.span>`
- `initial={{ y: 20, opacity: 0 }}`, `animate={{ y: 0, opacity: 1 }}`
- `staggerChildren: 0.03`
- Use `whileInView` if `trigger === 'inView'`

---

### 24 · Scroll Progress
| Key | Value |
|-----|-------|
| **Slug** | `scroll-progress` |
| **Category** | Animation |
| **Priority** | 🟢 Low |
| **Animation** | Framer Motion |
| **Status** | 📋 Planned |
| **Dependencies** | `framer-motion` |
| **File** | `ui/ScrollProgress.jsx` |

**Description:** Thin progress bar fixed to top of page that fills based on scroll position.

**Mockup / Preview Idea:**
```
  ████████████░░░░░░░░░░░░░░░  ← fixed top bar, 45% scrolled
  ─────────────────────────────
  │        page content        │
```

**Props:**
```ts
color?: string             // default 'brand-500'
height?: string            // default '3px'
position?: 'top' | 'bottom'
```

**Animation Spec:**
- `useScroll()` → `scrollYProgress` (0–1)
- `<motion.div style={{ scaleX: scrollYProgress, transformOrigin: '0%' }} />`

---

### 25 · Spotlight Card
| Key | Value |
|-----|-------|
| **Slug** | `spotlight-card` |
| **Category** | Animation |
| **Priority** | 🟡 Medium |
| **Animation** | CSS + JS (mousemove) |
| **Status** | 📋 Planned |
| **Dependencies** | None (pure CSS radial gradient) |
| **File** | `ui/SpotlightCard.jsx` |

**Description:** Card with a radial gradient spotlight that follows the cursor. Creates a premium hover effect.

**Mockup / Preview Idea:**
```
  ┌──────────────────────────┐
  │              ○            │  ← radial gradient glow follows cursor
  │         ╱    ╲           │
  │        ╱ bright ╲        │
  │       ╱  center  ╲      │
  │   Card content here      │
  └──────────────────────────┘
```

**Props:**
```ts
children: ReactNode
color?: string             // spotlight color, default 'rgba(255,255,255,0.06)'
size?: number              // gradient radius, default 300
```

**Implementation Hint:**
```jsx
onMouseMove={(e) => {
  const rect = ref.current.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  ref.current.style.background = `radial-gradient(${size}px circle at ${x}px ${y}px, ${color}, transparent)`
}}
```

---

### 26 · Number Counter / Animate Number
| Key | Value |
|-----|-------|
| **Slug** | `number-counter` |
| **Category** | Animation |
| **Priority** | 🟡 Medium |
| **Animation** | Framer Motion |
| **Status** | 📋 Planned |
| **Dependencies** | `framer-motion` |
| **File** | `ui/NumberCounter.jsx` |

**Description:** Animated number that counts up/down to a target value. Triggers on scroll into view.

**Mockup / Preview Idea:**
```
  Users          Revenue        Uptime
  0 → 12,847    $0 → $1.2M     0% → 99.9%
  ↑ rolls up smoothly when in viewport
```

**Props:**
```ts
from?: number              // default 0
to: number
duration?: number          // default 2 (seconds)
prefix?: string            // e.g. '$'
suffix?: string            // e.g. '%'
separator?: boolean        // thousand separators, default true
decimals?: number          // default 0
trigger?: 'mount' | 'inView'
```

**Animation Spec:**
- `useMotionValue(from)` + `useTransform` + `animate(motionValue, to, { duration })`
- Format with `Intl.NumberFormat` in `useTransform`
- `whileInView` or `useInView` to trigger

---

### 27 · Dock (macOS-style)
| Key | Value |
|-----|-------|
| **Slug** | `dock` |
| **Category** | Navigation |
| **Priority** | 🟢 Low |
| **Animation** | Framer Motion |
| **Status** | 📋 Planned |
| **Dependencies** | `framer-motion` |
| **File** | `ui/Dock.jsx` |

**Description:** macOS-style dock bar where icons magnify on hover based on proximity to cursor.

**Mockup / Preview Idea:**
```
                    🖱️
  ┌─────────────────────────────────┐
  │  📁  📷  🎵  🎮  🔧  📧  ⚙️   │
  │        ↑    ↑    ↑              │
  │       sm   LG   sm             │  ← icons near cursor grow
  └─────────────────────────────────┘
```

**Props:**
```ts
items: { icon: ReactNode, label: string, onClick? }[]
magnification?: number     // default 1.5 (scale multiplier)
distance?: number          // default 100 (px, falloff range)
```

**Animation Spec:**
- Track `mouseX` with `useMotionValue`
- Each icon calculates distance from cursor → `useTransform(mouseX, [distRange], [minSize, maxSize, minSize])`
- `useSpring` for smooth interpolation

---

### 28 · Command Palette (⌘K)
| Key | Value |
|-----|-------|
| **Slug** | `command-palette` |
| **Category** | Overlay |
| **Priority** | 🟢 Low |
| **Animation** | Framer Motion |
| **Status** | 📋 Planned |
| **Dependencies** | `framer-motion` |
| **File** | `ui/CommandPalette.jsx` |

**Description:** VS Code / Raycast style command palette with fuzzy search, keyboard nav, and grouped results.

**Mockup / Preview Idea:**
```
  ┌──────────────────────────────────────┐
  │ 🔍  Type a command...                │
  ├──────────────────────────────────────┤
  │  Navigation                          │
  │   → Home                             │
  │   → Components                 ⌘ 1   │
  │  Actions                             │
  │   → Toggle theme              ⌘ T   │
  │   → Copy link                 ⌘ L   │
  └──────────────────────────────────────┘
```

**Props:**
```ts
isOpen: boolean
onClose: () => void
commands: { group, items: { label, icon?, shortcut?, onSelect }[] }[]
placeholder?: string
```

---

### 29 · Ripple Effect
| Key | Value |
|-----|-------|
| **Slug** | `ripple` |
| **Category** | Animation |
| **Priority** | 🟢 Low |
| **Animation** | CSS / Framer Motion |
| **Status** | 📋 Planned |
| **Dependencies** | None |
| **File** | `ui/Ripple.jsx` |

**Description:** Material-style click ripple effect wrapper. Wrap any element to add a ripple on click.

**Mockup / Preview Idea:**
```
  ┌──────────────┐
  │    Click!     │
  │      ◎──→     │  ← expanding circle from click point
  │               │
  └──────────────┘
```

**Props:**
```ts
children: ReactNode
color?: string             // default 'rgba(255,255,255,0.3)'
duration?: number          // default 600 (ms)
```

---

### 30 · Tilt Card (3D)
| Key | Value |
|-----|-------|
| **Slug** | `tilt-card` |
| **Category** | Animation |
| **Priority** | 🟡 Medium |
| **Animation** | Framer Motion / Vanilla JS |
| **Status** | 📋 Planned |
| **Dependencies** | `framer-motion` |
| **File** | `ui/TiltCard.jsx` |

**Description:** Card that tilts in 3D based on cursor position, with optional glare/shine overlay.

**Mockup / Preview Idea:**
```
        ╱──────────╲
       ╱            ╲       ← perspective tilt following cursor
      │   Content    │
      │              │
       ╲            ╱
        ╲──────────╱
```

**Props:**
```ts
children: ReactNode
maxTilt?: number           // default 15 (degrees)
glare?: boolean            // default false
scale?: number             // default 1.02 (hover scale)
perspective?: number       // default 1000
```

**Animation Spec:**
- `onMouseMove`: calculate `rotateX`, `rotateY` from cursor position
- `useSpring` for smooth interpolation
- `transform: perspective(${p}px) rotateX(${ry}deg) rotateY(${rx}deg)`
- Optional glare: overlay div with linear gradient, angle follows cursor

---

## Category Summary

| Category      | Done | Planned | Total |
|---------------|------|---------|-------|
| General       | 4    | 0       | 4     |
| Inputs        | 2    | 2       | 4     |
| Data Display  | 4    | 0       | 4     |
| Feedback      | 3    | 0       | 3     |
| Overlay       | 1    | 2       | 3     |
| Navigation    | 0    | 3       | 3     |
| Animation     | 1    | 7       | 8     |
| Layout        | 0    | 0       | 0     |
| **Total**     | **15** | **14** | **29** |

---

## Dependency Reference

| Package | Used For | Install |
|---------|----------|---------|
| `framer-motion` | Most component animations | Already installed |
| `react-icons` | Icon sets (fi, si, tb) | Already installed |
| `gsap` | Scroll-driven & timeline animations (Marquee, Magnetic) | `npm i gsap` |
| `lenis` | Smooth page scroll | Already installed |
| `lucide-react` | Icons (ArrowUpRight, X, Loader2) | Already installed |

---

## File Structure

```
src/
  components/
    ui/
      Button.jsx          ✅
      Card.jsx            ✅
      Badge.jsx           ✅
      Avatar.jsx          ✅
      Input.jsx           ✅
      Toggle.jsx          ✅
      Accordion.jsx       ✅
      Tabs.jsx            ✅
      Progress.jsx        ✅
      Skeleton.jsx        ✅
      Modal.jsx           ✅
      Toast.jsx           ✅
      Alert.jsx           ✅
      Tooltip.jsx         ✅
      SocialStories.jsx   ✅
      DropdownMenu.jsx    📋
      Select.jsx          📋
      Slider.jsx          📋
      Breadcrumb.jsx      📋
      Drawer.jsx          📋
      Popover.jsx         📋
      Marquee.jsx         📋
      MagneticButton.jsx  📋
      TextReveal.jsx      📋
      ScrollProgress.jsx  📋
      SpotlightCard.jsx   📋
      NumberCounter.jsx   📋
      Dock.jsx            📋
      CommandPalette.jsx  📋
      Ripple.jsx          📋
      TiltCard.jsx        📋
  registry/
    index.jsx             ← register each new component here
```

---

*Mark items as ✅ Done in this file as you build them. Update the "Last updated" date at the top.*
