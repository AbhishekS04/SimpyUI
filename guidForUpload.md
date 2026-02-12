# SimpyUI — Complete Guide to Adding a Component

> **TL;DR:** Create 2 files → add to `registry.json` → add to website registry → `git push`. No npm publish needed.

---

## Prerequisites

- Your repo: `github.com/AbhishekS04/SimpyUI`
- Website auto-deploys on Vercel on every push
- CLI (`npx simpyui`) fetches `registry.json` from GitHub at runtime — **never needs republishing**

---

## Step 1: Create the Component Folder

Create a new folder inside `src/registry/` with your component slug:

```
src/registry/<slug>/
├── <slug>.tsx          ← the actual component
└── <slug>.demo.tsx     ← interactive demo for the website
```

**Example:** For a component called "Spotlight Card":
```
src/registry/spotlight-card/
├── spotlight-card.tsx
└── spotlight-card.demo.tsx
```

---

## Step 2: Write the Component (`<slug>.tsx`)

```tsx
"use client"

import { motion } from "framer-motion"

// Export types if needed by demos
export interface SpotlightCardProps {
  // ...
}

// Must be a default export
export default function SpotlightCard({ ...props }: SpotlightCardProps) {
  return (
    // Your component JSX
  )
}
```

**Rules:**
- `"use client"` at the very top
- `export default function ComponentName()` — always default export
- Self-contained: all sub-components in the same file
- Use `framer-motion` for animations
- Use Tailwind with custom colors: `brand-50` to `brand-900` (blue), `dark-50` to `dark-900` (gray)
- Import from npm packages only (e.g., `framer-motion`, `lucide-react`) — never `@/` paths

---

## Step 3: Write the Demo (`<slug>.demo.tsx`)

```tsx
"use client"

import SpotlightCard from './spotlight-card'  // ← relative import

export default function SpotlightCardDemo() {
  return (
    // Your demo JSX — interactive, shows all variants
  )
}
```

**Rules:**
- Import component via **relative path**: `'./spotlight-card'`
- `export default function ComponentNameDemo()`
- **NO extra card/background wrapper** — the website preview card already provides the dark background + rounded corners
- If your component uses `absolute` positioning, wrap it in `<div className="relative w-full h-full min-h-[400px]">`
- Make it interactive — buttons to toggle modes, show variants, etc.

---

## Step 4: Add to `registry.json` (repo root)

Open `registry.json` and add your component inside the `"components"` object:

```json
"spotlight-card": {
  "name": "Spotlight Card",
  "category": "Animation",
  "description": "Card with a spotlight glow effect that follows the cursor.",
  "files": ["spotlight-card/spotlight-card.tsx"],
  "dependencies": ["framer-motion"],
  "internal": []
}
```

**Fields:**
| Field | What it does |
|---|---|
| `name` | Display name shown in CLI and website |
| `category` | One of: `General`, `Inputs`, `Data Display`, `Feedback`, `Overlay`, `Animation` |
| `description` | One-line description |
| `files` | Array of file paths relative to `src/registry/` (usually just one file) |
| `dependencies` | npm packages the component needs (e.g., `framer-motion`, `lucide-react`) |
| `internal` | Other SimpyUI components this depends on (usually empty `[]`) |

> **This is the only file the CLI reads.** Once pushed, `npx simpyui add spotlight-card` works instantly.

---

## Step 5: Add to Website Registry (`src/registry/index.tsx`)

Add **3 imports** and **1 array entry**:

### 5a. Add raw source import (top section)

```tsx
import SpotlightCardCode from './spotlight-card/spotlight-card.tsx?raw'
```

### 5b. Add raw demo code import (second section)

```tsx
import SpotlightCardDemoCode from './spotlight-card/spotlight-card.demo.tsx?raw'
```

### 5c. Add lazy demo import (third section)

```tsx
const SpotlightCardDemo = lazy(() => import('./spotlight-card/spotlight-card.demo'))
```

### 5d. Add to the `componentRegistry` array (bottom section)

```tsx
{ name: 'Spotlight Card', slug: 'spotlight-card', category: 'Animation', description: 'Card with a spotlight glow effect that follows the cursor.', component: demo(SpotlightCardDemo), code: SpotlightCardCode, demoCode: SpotlightCardDemoCode },
```

Place it under the correct category comment (e.g., `// ─── ANIMATION ────`).

---

## Step 6: Test Locally

```bash
# Build the website to check for errors
npm run build

# Or run dev server to see it live
npm run dev
```

Visit `http://localhost:5173/components/spotlight-card` to verify.

---

## Step 7: Push to GitHub

```bash
git add .
git commit -m "feat: add spotlight-card component"
git push
```

**That's it!** After pushing:

| What | How |
|---|---|
| **Website** | Auto-deploys via Vercel in ~30 seconds |
| **CLI** | Fetches `registry.json` from GitHub — works immediately |
| **Users install via** | `npx simpyui@latest add spotlight-card` |

---

## Quick Reference: File Checklist

For a new component `<slug>`, you touch exactly **3 files**:

```
✅ src/registry/<slug>/<slug>.tsx          ← CREATE (the component)
✅ src/registry/<slug>/<slug>.demo.tsx     ← CREATE (the demo)
✅ registry.json                           ← EDIT   (add entry for CLI)
✅ src/registry/index.tsx                  ← EDIT   (add imports + array entry for website)
```

**You do NOT touch:**
- ❌ `packages/cli/` — CLI code never changes
- ❌ `npm publish` — never needed again
- ❌ Any other config files

---

## Color System

The CLI auto-injects these into the user's `tailwind.config` when they install a component:

```
brand-50  #f0f4ff     brand-500 #5c7cfa     brand-900 #364fc7
dark-50   #C1C2C5     dark-500  #2C2E33     dark-900  #101113
```

Use `.glow-sm` for subtle glow effects (auto-injected into user's CSS).

---

## Common Mistakes to Avoid

| ❌ Don't | ✅ Do |
|---|---|
| Add a card/background in demo | Let the preview card handle it |
| Use `fixed` positioning | Use `absolute` inside a `relative` parent |
| Use random hex colors | Use `brand-*` / `dark-*` / `white` / `black` |
| Import from `@/` paths | Use bare npm imports or relative `./` |
| Import from `react` in files outside components | Keep components self-contained |
| Forget `"use client"` | Always add it at line 1 |
