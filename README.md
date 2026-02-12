# SimpyUI

> Beautiful, animated React components for modern web applications

## About

**SimpyUI** is a curated collection of uncommon, highly-polished React components designed to elevate your web applications. Built with React, TypeScript, and Framer Motion, each component is crafted with attention to detail, offering smooth animations, modern aesthetics, and a delightful user experience.

Unlike traditional component libraries that require installing heavy dependencies, SimpyUI takes a different approach: **copy what you need**. Each component is a single file that you can integrate directly into your project, giving you full control and zero bloat.

## Key Features

- 🎨 **Beautiful Design** - Modern, dark-themed components with elegant animations
- 🚀 **Framework Agnostic** - Works seamlessly with React and Next.js
- 📦 **Zero Dependencies** - Each component is self-contained (except for Framer Motion)
- 🎭 **Smooth Animations** - Built with Framer Motion for buttery-smooth interactions
- 🎯 **TypeScript First** - Full type safety out of the box
- 💡 **Customizable** - Easy to modify and adapt to your design system
- ⚡ **Lightweight** - Copy only what you need, no bloated package installs

## Quick Start

Get started with SimpyUI in seconds:

```bash
npx simpyui@latest add button
```

This will add the Button component directly to your project. You can then import and use it:

```tsx
import Button from './components/button'

function App() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  )
}
```

## Available Components

SimpyUI includes **15+ components** across multiple categories:

### General
- **Button** - Animated button with multiple variants and sizes
- **Card** - Versatile card container with hover and glow effects
- **Badge** - Small status indicators with colorful variants
- **Avatar** - User avatar with image support and fallback initials

### Inputs
- **Input** - Styled text input with label and error states
- **Toggle** - Smooth animated toggle switch

### Data Display
- **Accordion** - Collapsible content sections with smooth animations
- **Tabs** - Animated tab navigation with smooth underline indicator
- **Progress** - Animated progress bar with multiple colors and sizes
- **Skeleton** - Animated loading placeholder with pulsing effect

### Feedback
- **Modal** - Animated dialog with backdrop blur
- **Toast** - Notification toast with animated entrance
- **Alert** - Contextual alert banners with icons

### Overlay
- **Tooltip** - Hover tooltip with multiple positions

### Animation
- **Social Stories** - Instagram/LinkedIn-style stories viewer with progress bars and swipe navigation

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe component development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **React Router** - Client-side routing

## Philosophy

SimpyUI is built on the principle that **you should own your components**. Instead of installing a massive library that updates unpredictably, you copy the component code directly into your project. This gives you:

1. **Full control** over the component behavior and styling
2. **No version conflicts** or breaking changes from updates
3. **Better understanding** of how your UI works
4. **Easier customization** to match your exact needs

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

MIT License - feel free to use SimpyUI in your projects!

---

**Designed and Developed by @SimpyUI**
