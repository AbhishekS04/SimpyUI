import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join, dirname } from 'node:path'

/* ── Colors (no deps needed) ── */

const bold = (s: string) => `\x1b[1m${s}\x1b[0m`
const green = (s: string) => `\x1b[32m${s}\x1b[0m`
const cyan = (s: string) => `\x1b[36m${s}\x1b[0m`
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`
const red = (s: string) => `\x1b[31m${s}\x1b[0m`
const dim = (s: string) => `\x1b[2m${s}\x1b[0m`

export { bold, green, cyan, yellow, red, dim }

/* ── Config ── */

export interface SimpyConfig {
  componentDir: string
  utilsDir: string
  typescript: boolean
}

const CONFIG_FILE = 'components.json'

/* ── Project Detection ── */

export type ProjectType = 'nextjs' | 'vite' | 'unknown'

export function detectProject(): ProjectType {
  const cwd = process.cwd()
  if (
    existsSync(join(cwd, 'next.config.js')) ||
    existsSync(join(cwd, 'next.config.mjs')) ||
    existsSync(join(cwd, 'next.config.ts'))
  ) return 'nextjs'
  if (
    existsSync(join(cwd, 'vite.config.js')) ||
    existsSync(join(cwd, 'vite.config.ts')) ||
    existsSync(join(cwd, 'vite.config.mjs'))
  ) return 'vite'
  return 'unknown'
}

export function getDefaultConfig(): SimpyConfig {
  const project = detectProject()
  switch (project) {
    case 'nextjs':
      return { componentDir: 'src/components/ui', utilsDir: 'src/lib', typescript: true }
    case 'vite':
      return { componentDir: 'src/components/ui', utilsDir: 'src/lib', typescript: true }
    default:
      return { componentDir: 'src/components/ui', utilsDir: 'src/lib', typescript: true }
  }
}

export function loadConfig(): SimpyConfig | null {
  const configPath = join(process.cwd(), CONFIG_FILE)
  if (!existsSync(configPath)) return null
  try {
    const raw = JSON.parse(readFileSync(configPath, 'utf-8'))
    // Backfill utilsDir for old configs
    if (!raw.utilsDir) {
      const project = detectProject()
      raw.utilsDir = project === 'nextjs' ? 'src/lib' : 'src/lib'
    }
    return raw
  } catch {
    return null
  }
}

export function saveConfig(config: SimpyConfig): void {
  const configPath = join(process.cwd(), CONFIG_FILE)
  writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n')
}

export function hasPackageJson(): boolean {
  return existsSync(join(process.cwd(), 'package.json'))
}

export function getConfigOrExit(): SimpyConfig {
  if (!hasPackageJson()) {
    console.log(red('  ✗ No package.json found in current directory.'))
    console.log()
    console.log(dim('  Run this inside a React project:'))
    console.log(cyan('    npx create-next-app@latest my-app'))
    console.log(dim('    or'))
    console.log(cyan('    npm create vite@latest my-app'))
    console.log()
    process.exit(1)
  }

  const config = loadConfig()
  if (!config) {
    const project = detectProject()
    const defaults = getDefaultConfig()
    const projectLabel = project === 'nextjs' ? 'Next.js' : project === 'vite' ? 'Vite' : 'React'

    console.log(dim(`  Detected ${projectLabel} project`))
    console.log(dim('  Creating components.json with defaults:'))
    console.log(dim(`    components → ${defaults.componentDir}`))
    console.log(dim(`    utils      → ${defaults.utilsDir}`))
    console.log(dim(`    typescript → ${defaults.typescript}`))
    console.log()
    saveConfig(defaults)
    return defaults
  }
  return config
}

/* ── Utils file creation ── */

const UTILS_TS = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

const UTILS_JS = `import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
`

export function ensureUtils(config: SimpyConfig): string[] {
  const ext = config.typescript ? 'ts' : 'js'
  const utilsPath = join(process.cwd(), config.utilsDir, `utils.${ext}`)
  const depsNeeded: string[] = []

  if (!existsSync(utilsPath)) {
    mkdirSync(dirname(utilsPath), { recursive: true })
    writeFileSync(utilsPath, config.typescript ? UTILS_TS : UTILS_JS)
    console.log(green('  ✓ Created ') + dim(`${config.utilsDir}/utils.${ext}`))

    const installed = getInstalledDeps()
    if (!installed.has('clsx')) depsNeeded.push('clsx')
    if (!installed.has('tailwind-merge')) depsNeeded.push('tailwind-merge')
  }

  return depsNeeded
}

/* ── Tailwind config color injection ── */

const SIMPYUI_COLORS = {
  brand: {
    50: '#f0f4ff', 100: '#dbe4ff', 200: '#bac8ff', 300: '#91a7ff', 400: '#748ffc',
    500: '#5c7cfa', 600: '#4c6ef5', 700: '#4263eb', 800: '#3b5bdb', 900: '#364fc7',
  },
  dark: {
    50: '#C1C2C5', 100: '#A6A7AB', 200: '#909296', 300: '#5C5F66', 400: '#373A40',
    500: '#2C2E33', 600: '#25262B', 700: '#1A1B1E', 800: '#141517', 900: '#101113',
  },
}

export function ensureTailwindColors(): void {
  const cwd = process.cwd()
  const candidates = [
    'tailwind.config.js', 'tailwind.config.ts', 'tailwind.config.mjs', 'tailwind.config.cjs',
  ]

  let configFile = ''
  for (const f of candidates) {
    if (existsSync(join(cwd, f))) { configFile = f; break }
  }

  if (!configFile) {
    console.log(yellow('  ⚠ No tailwind.config found — skipping color injection'))
    console.log(dim('    Add brand & dark color scales manually (see docs)'))
    return
  }

  const fullPath = join(cwd, configFile)
  const content = readFileSync(fullPath, 'utf-8')

  // Check if colors already injected
  if (content.includes("brand:") && content.includes("dark:")) {
    return // already present
  }

  const missing: string[] = []
  if (!content.includes("brand:")) missing.push('brand')
  if (!content.includes("dark:")) missing.push('dark')

  // Build the color block to inject
  let colorBlock = ''
  for (const key of missing) {
    const colors = SIMPYUI_COLORS[key as keyof typeof SIMPYUI_COLORS]
    const entries = Object.entries(colors).map(([k, v]) => `          ${k}: '${v}'`).join(',\n')
    colorBlock += `        ${key}: {\n${entries},\n        },\n`
  }

  // Strategy: find "colors:" in extend block and inject after it, or find extend and inject colors block
  if (content.includes('colors:') && content.includes('extend:')) {
    // Inject inside existing colors object
    const injected = content.replace(
      /(colors\s*:\s*\{)/,
      `$1\n${colorBlock}`
    )
    writeFileSync(fullPath, injected)
    console.log(green('  ✓ Added ') + dim(`${missing.join(' & ')} colors → ${configFile}`))
  } else if (content.includes('extend:')) {
    // No colors key yet — inject colors block inside extend
    const injected = content.replace(
      /(extend\s*:\s*\{)/,
      `$1\n      colors: {\n${colorBlock}      },`
    )
    writeFileSync(fullPath, injected)
    console.log(green('  ✓ Added ') + dim(`${missing.join(' & ')} colors → ${configFile}`))
  } else {
    console.log(yellow('  ⚠ Could not auto-inject colors into ' + configFile))
    console.log(dim('    Add brand & dark color scales manually (see docs)'))
  }
}

/* ── Global CSS injection (glow classes) ── */

const SIMPYUI_CSS = `
/* ============ SimpyUI Glow Effects ============ */
.glow {
  box-shadow: 0 0 60px rgba(0, 150, 255, 0.15);
}

.glow-sm {
  box-shadow: 0 0 30px rgba(0, 150, 255, 0.1);
}
`

export function ensureGlobalCSS(): void {
  const cwd = process.cwd()
  const candidates = [
    'src/index.css', 'src/globals.css', 'src/app/globals.css',
    'app/globals.css', 'styles/globals.css', 'src/styles/globals.css',
  ]

  let cssFile = ''
  for (const f of candidates) {
    if (existsSync(join(cwd, f))) { cssFile = f; break }
  }

  if (!cssFile) return // No global CSS found — silently skip

  const fullPath = join(cwd, cssFile)
  const content = readFileSync(fullPath, 'utf-8')

  // Check if already added
  if (content.includes('.glow-sm') || content.includes('SimpyUI Glow Effects')) {
    return
  }

  writeFileSync(fullPath, content + SIMPYUI_CSS)
  console.log(green('  ✓ Added ') + dim(`glow utilities → ${cssFile}`))
}

/* ── Package Manager Detection ── */

export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun'

export function detectPackageManager(): PackageManager {
  const cwd = process.cwd()
  if (existsSync(join(cwd, 'bun.lockb')) || existsSync(join(cwd, 'bun.lock'))) return 'bun'
  if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm'
  if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn'
  return 'npm'
}

export function getInstallCommand(pm: PackageManager, packages: string[]): string {
  const pkgs = packages.join(' ')
  switch (pm) {
    case 'bun':  return `bun add ${pkgs}`
    case 'pnpm': return `pnpm add ${pkgs}`
    case 'yarn': return `yarn add ${pkgs}`
    default:     return `npm install ${pkgs}`
  }
}

export function installPackages(packages: string[]): void {
  if (packages.length === 0) return

  const pm = detectPackageManager()
  const cmd = getInstallCommand(pm, packages)

  console.log(dim(`  $ ${cmd}`))
  try {
    execSync(cmd, { stdio: 'pipe', cwd: process.cwd() })
  } catch (err) {
    console.log(yellow(`  ⚠ Failed to install. Run manually: ${cmd}`))
  }
}

/* ── Installed Deps Check ── */

export function getInstalledDeps(): Set<string> {
  const pkgPath = join(process.cwd(), 'package.json')
  if (!existsSync(pkgPath)) return new Set()
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
    return new Set([
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ])
  } catch {
    return new Set()
  }
}

/* ── Fetch File from GitHub ── */

export async function fetchFileFromGitHub(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url} (${res.status})`)
  }
  return res.text()
}

/* ── Spinner ── */

export function spinner(text: string) {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
  let i = 0
  const id = setInterval(() => {
    process.stdout.write(`\r${cyan(frames[i++ % frames.length])} ${text}`)
  }, 80)
  return {
    stop(finalText?: string) {
      clearInterval(id)
      process.stdout.write(`\r${finalText || ''}\n`)
    },
  }
}

/* ── Simple stdin prompt ── */

export async function prompt(question: string, defaultValue = ''): Promise<string> {
  const suffix = defaultValue ? ` ${dim(`(${defaultValue})`)}` : ''
  process.stdout.write(`${question}${suffix}: `)

  return new Promise((resolve) => {
    let data = ''
    process.stdin.setEncoding('utf-8')
    process.stdin.resume()
    process.stdin.once('data', (chunk: string) => {
      data = chunk.trim()
      process.stdin.pause()
      resolve(data || defaultValue)
    })
  })
}

export async function confirm(question: string, defaultYes = true): Promise<boolean> {
  const hint = defaultYes ? 'Y/n' : 'y/N'
  const answer = await prompt(`${question} ${dim(`[${hint}]`)}`)
  if (!answer) return defaultYes
  return answer.toLowerCase().startsWith('y')
}
