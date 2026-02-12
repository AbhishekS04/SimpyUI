/*
 * =============================================
 *  SIMPYUI — REMOTE REGISTRY
 * =============================================
 *
 *  Fetches the component registry from GitHub at runtime.
 *  You NEVER need to republish the CLI when adding new
 *  components — just update registry.json in the repo
 *  and push.
 *
 * =============================================
 */

import { fetchFileFromGitHub, red, dim } from './utils.js'

const REGISTRY_URL =
  'https://raw.githubusercontent.com/AbhishekS04/SimpyUI/main/registry.json'

export interface RegistryComponent {
  name: string
  category: string
  description: string
  files: string[]
  dependencies: string[]
  internal: string[]
}

export interface RegistryData {
  baseUrl: string
  components: Record<string, RegistryComponent>
}

let _cache: RegistryData | null = null

/**
 * Fetch the registry from GitHub (cached for the lifetime of this process).
 */
export async function fetchRegistry(): Promise<RegistryData> {
  if (_cache) return _cache

  try {
    const raw = await fetchFileFromGitHub(REGISTRY_URL)
    const data = JSON.parse(raw) as RegistryData
    _cache = data
    return data
  } catch (err) {
    console.log(red('\n  ✗ Failed to fetch component registry from GitHub.'))
    console.log(dim(`    ${(err as Error).message}`))
    console.log(dim('    Check your internet connection and try again.\n'))
    process.exit(1)
  }
}
