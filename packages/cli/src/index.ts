/*
 * =============================================
 *  SIMPYUI CLI
 * =============================================
 *
 *  Usage:
 *    npx simpyui init           → configure component directory
 *    npx simpyui add <name>     → add a component + install deps
 *    npx simpyui add --all      → add all components
 *    npx simpyui list           → list available components
 *
 * =============================================
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import {
  bold, green, cyan, yellow, red, dim,
  loadConfig, saveConfig, getConfigOrExit,
  getInstalledDeps, installPackages, ensureUtils,
  detectProject, getDefaultConfig,
  fetchFileFromGitHub, spinner,
  prompt, confirm,
  type SimpyConfig,
} from './utils.js'
import {
  registry, allComponentNames, GITHUB_RAW_BASE,
  type RegistryComponent,
} from './registry.js'

/* ── Header ── */

function printHeader() {
  console.log()
  console.log(bold(cyan('  ╭─────────────────────────────╮')))
  console.log(bold(cyan('  │        SimpyUI CLI          │')))
  console.log(bold(cyan('  ╰─────────────────────────────╯')))
  console.log()
}

/* ── INIT command ── */

async function cmdInit() {
  printHeader()

  const existing = loadConfig()
  if (existing) {
    const overwrite = await confirm(yellow('  simpyui.json already exists. Overwrite?'), false)
    if (!overwrite) {
      console.log(dim('  Cancelled.'))
      process.exit(0)
    }
  }

  const project = detectProject()
  const defaults = getDefaultConfig()
  const projectLabel = project === 'nextjs' ? 'Next.js' : project === 'vite' ? 'Vite' : 'React'

  console.log(dim(`  Detected ${bold(projectLabel)} project\n`))

  const componentDir = await prompt(
    `  ${bold('Component directory')}`,
    defaults.componentDir
  )

  const utilsDir = await prompt(
    `  ${bold('Utils directory')}`,
    defaults.utilsDir
  )

  const useTs = await confirm(`  ${bold('Use TypeScript?')}`, true)

  const config: SimpyConfig = {
    componentDir,
    utilsDir,
    typescript: useTs,
  }

  saveConfig(config)

  console.log()
  console.log(green('  ✓ Created simpyui.json'))
  console.log(dim(`    Components → ${componentDir}/`))
  console.log(dim(`    Utils      → ${utilsDir}/`))
  console.log()
  console.log(`  ${bold('Next step:')} Run ${cyan('npx simpyui@latest add button')} to add your first component.`)
  console.log()
}

/* ── LIST command ── */

function cmdList() {
  printHeader()

  console.log(`  ${bold('Available components:')}\n`)

  // Group by category
  const categories: Record<string, RegistryComponent[]> = {}
  for (const comp of Object.values(registry)) {
    const cat = getCategoryForComponent(comp.slug)
    if (!categories[cat]) categories[cat] = []
    categories[cat].push(comp)
  }

  for (const [cat, comps] of Object.entries(categories)) {
    console.log(`  ${bold(cyan(cat))}`)
    for (const comp of comps) {
      const deps = comp.dependencies.length
        ? dim(` → ${comp.dependencies.join(', ')}`)
        : ''
      console.log(`    ${green('•')} ${bold(comp.slug.padEnd(16))} ${dim(comp.description)}${deps}`)
    }
    console.log()
  }

  console.log(dim(`  Total: ${allComponentNames.length} components`))
  console.log()
  console.log(`  ${dim('Usage:')} ${cyan('npx simpyui add <name>')}`)
  console.log()
}

function getCategoryForComponent(slug: string): string {
  const map: Record<string, string> = {
    button: 'General', card: 'General', badge: 'General', avatar: 'General',
    input: 'Inputs', toggle: 'Inputs',
    accordion: 'Data Display', tabs: 'Data Display', progress: 'Data Display', skeleton: 'Data Display',
    modal: 'Feedback', toast: 'Feedback', alert: 'Feedback',
    tooltip: 'Overlay',
    'social-stories': 'Animation',
  }
  return map[slug] || 'Other'
}

/* ── ADD command ── */

async function cmdAdd(args: string[]) {
  printHeader()

  const config = getConfigOrExit()

  // Parse flags
  const addAll = args.includes('--all')
  const componentArgs = args.filter(a => !a.startsWith('-'))

  let componentsToAdd: string[] = []

  if (addAll) {
    componentsToAdd = [...allComponentNames]
    console.log(`  Adding ${bold('all')} ${cyan(String(componentsToAdd.length))} components...\n`)
  } else if (componentArgs.length === 0) {
    console.log(red('  ✗ Please specify component name(s).'))
    console.log()
    console.log(`  ${dim('Usage:')} ${cyan('npx simpyui add button card modal')}`)
    console.log(`  ${dim('       ')} ${cyan('npx simpyui add --all')}`)
    console.log()
    console.log(`  ${dim('Run')} ${cyan('npx simpyui list')} ${dim('to see all available components.')}`)
    console.log()
    process.exit(1)
  } else {
    // Validate names
    const invalid = componentArgs.filter(n => !registry[n])
    if (invalid.length > 0) {
      console.log(red(`  ✗ Unknown component(s): ${invalid.join(', ')}`))
      console.log()
      console.log(`  ${dim('Run')} ${cyan('npx simpyui list')} ${dim('to see all available components.')}`)
      console.log()
      process.exit(1)
    }
    componentsToAdd = componentArgs
  }

  // Resolve internal dependencies
  const resolved = new Set<string>()
  function resolve(slug: string) {
    if (resolved.has(slug)) return
    const comp = registry[slug]
    if (!comp) return
    for (const dep of comp.internal) {
      resolve(dep)
    }
    resolved.add(slug)
  }
  for (const slug of componentsToAdd) resolve(slug)
  componentsToAdd = [...resolved]

  // Collect all npm dependencies
  const allDeps = new Set<string>()
  for (const slug of componentsToAdd) {
    for (const dep of registry[slug].dependencies) {
      allDeps.add(dep)
    }
  }

  // Create lib/utils.ts if it doesn't exist
  const utilsDeps = ensureUtils(config)
  for (const d of utilsDeps) allDeps.add(d)

  // Check which are already installed
  const installed = getInstalledDeps()
  const toInstall = [...allDeps].filter(d => !installed.has(d))

  // ─── Download files ───
  const s = spinner('Downloading components...')

  let downloaded = 0
  let skipped = 0

  for (const slug of componentsToAdd) {
    const comp = registry[slug]

    for (const file of comp.files) {
      const url = `${GITHUB_RAW_BASE}/${file}`
      const filename = file.split('/').pop()!
      const ext = config.typescript ? '' : filename.replace('.tsx', '.jsx')
      const finalName = config.typescript ? filename : filename.replace('.tsx', '.jsx')
      const targetPath = join(process.cwd(), config.componentDir, finalName)

      // Check if file already exists
      if (existsSync(targetPath)) {
        skipped++
        continue
      }

      try {
        let code = await fetchFileFromGitHub(url)

        // If not typescript, strip type annotations (basic)
        if (!config.typescript) {
          code = stripTypes(code)
        }

        // Ensure directory exists
        mkdirSync(dirname(targetPath), { recursive: true })

        // Write file
        writeFileSync(targetPath, code)
        downloaded++
      } catch (err) {
        s.stop(red(`  ✗ Failed to download ${file}`))
        console.log(dim(`    ${(err as Error).message}`))
      }
    }
  }

  s.stop(green(`  ✓ Downloaded ${downloaded} file(s)`) + (skipped ? dim(` (${skipped} already existed)`) : ''))

  // ─── Install dependencies ───
  if (toInstall.length > 0) {
    console.log()
    console.log(`  ${bold('Installing dependencies:')} ${cyan(toInstall.join(', '))}`)
    installPackages(toInstall)
    console.log(green('  ✓ Dependencies installed'))
  } else if (allDeps.size > 0) {
    console.log(dim('  ✓ All dependencies already installed'))
  }

  // ─── Summary ───
  console.log()
  console.log(green('  Done! ') + dim('Components added:'))
  for (const slug of componentsToAdd) {
    const comp = registry[slug]
    const file = comp.files[0].split('/').pop()
    console.log(`    ${green('•')} ${bold(comp.name)} → ${dim(`${config.componentDir}/${file}`)}`)
  }
  console.log()

  // Usage hint
  if (componentsToAdd.includes('button')) {
    console.log(dim('  Import example:'))
    console.log(cyan(`    import Button from './${config.componentDir}/button'`))
    console.log()
  }
}

/* ── Basic type stripping for JS users ── */

function stripTypes(code: string): string {
  return code
    .replace(/: string/g, '')
    .replace(/: number/g, '')
    .replace(/: boolean/g, '')
    .replace(/: ReactNode/g, '')
    .replace(/: React\.ReactNode/g, '')
    .replace(/<[A-Z]\w+Props>/g, '')
    .replace(/interface \w+ \{[^}]*\}/gs, '')
    .replace(/type \w+ = [^;\n]+;?/g, '')
    .replace(/export type \w+ = [^;\n]+;?/g, '')
    .replace(/export interface \w+ \{[^}]*\}/gs, '')
    .replace(/import \{ type \w+[\s\S]*?\} from/g, 'import {')
    .replace(/import type \{[^}]*\} from '[^']+'\n?/g, '')
    .replace(/, type \w+/g, '')
    .replace(/as const/g, '')
    .replace(/<HTMLMotionProps<'[^']*'>>/g, '')
    .replace(/Omit<\w+<'[^']*'>,\s*'[^']*'>/g, '')
    .replace(/Record<\w+,\s*\w+>/g, '')
    .replace(/\.tsx/g, '.jsx')
    .replace(/\n{3,}/g, '\n\n')
}

/* ── DIFF command (bonus: show what would be added) ── */

function cmdDiff(args: string[]) {
  printHeader()
  const config = getConfigOrExit()
  const componentArgs = args.filter(a => !a.startsWith('-'))

  if (componentArgs.length === 0) {
    console.log(red('  ✗ Specify a component name.'))
    process.exit(1)
  }

  for (const slug of componentArgs) {
    const comp = registry[slug]
    if (!comp) {
      console.log(red(`  ✗ Unknown component: ${slug}`))
      continue
    }

    const file = comp.files[0].split('/').pop()!
    const targetPath = join(process.cwd(), config.componentDir, file)

    if (existsSync(targetPath)) {
      console.log(yellow(`  ● ${comp.name}`), dim('— already exists'))
    } else {
      console.log(green(`  + ${comp.name}`), dim(`→ ${config.componentDir}/${file}`))
    }

    if (comp.dependencies.length > 0) {
      const installed = getInstalledDeps()
      for (const dep of comp.dependencies) {
        if (installed.has(dep)) {
          console.log(dim(`    ✓ ${dep} (installed)`))
        } else {
          console.log(cyan(`    + ${dep} (will install)`))
        }
      }
    }
    console.log()
  }
}

/* ── HELP ── */

function cmdHelp() {
  printHeader()
  console.log(`  ${bold('Usage:')} simpyui ${cyan('<command>')} ${dim('[options]')}`)
  console.log()
  console.log(`  ${bold('Commands:')}`)
  console.log(`    ${cyan('init')}           Configure SimpyUI for your project`)
  console.log(`    ${cyan('add')} ${dim('<name>')}    Add component(s) to your project`)
  console.log(`    ${cyan('add --all')}      Add all components at once`)
  console.log(`    ${cyan('list')}           List all available components`)
  console.log(`    ${cyan('diff')} ${dim('<name>')}   Preview what would be added`)
  console.log(`    ${cyan('help')}           Show this help message`)
  console.log()
  console.log(`  ${bold('Examples:')}`)
  console.log(dim('    $ npx simpyui init'))
  console.log(dim('    $ npx simpyui add button'))
  console.log(dim('    $ npx simpyui add button card modal toast'))
  console.log(dim('    $ npx simpyui add --all'))
  console.log()
}

/* ── Main ── */

async function main() {
  const args = process.argv.slice(2)
  const command = args[0]

  switch (command) {
    case 'init':
      await cmdInit()
      break
    case 'add':
      await cmdAdd(args.slice(1))
      break
    case 'list':
    case 'ls':
      cmdList()
      break
    case 'diff':
      cmdDiff(args.slice(1))
      break
    case 'help':
    case '--help':
    case '-h':
    case undefined:
      cmdHelp()
      break
    default:
      // Maybe they typed a component name directly: `npx simpyui button`
      if (registry[command]) {
        await cmdAdd(args)
      } else {
        console.log(red(`\n  Unknown command: ${command}\n`))
        cmdHelp()
      }
  }
}

main().catch((err) => {
  console.error(red(`\n  Error: ${err.message}\n`))
  process.exit(1)
})
