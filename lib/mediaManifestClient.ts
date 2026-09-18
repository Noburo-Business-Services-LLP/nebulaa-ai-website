'use client'

/**
 * Fetch-once, share-everywhere cache for /api/media/manifest.
 *
 * A page can carry a dozen MediaSlot instances; without this each one would
 * fire its own request on mount. The promise is created on the first call
 * and every subsequent call — from any component, anywhere on the page —
 * awaits the same one.
 */
let manifestPromise: Promise<Set<string>> | null = null

async function fetchManifest(): Promise<Set<string>> {
  try {
    const res = await fetch('/api/media/manifest')
    if (!res.ok) return new Set()
    const data: { keys: string[] } = await res.json()
    return new Set(data.keys)
  } catch {
    return new Set()
  }
}

export function getMediaManifest(): Promise<Set<string>> {
  if (!manifestPromise) manifestPromise = fetchManifest()
  return manifestPromise
}

/** Called after an admin upload/delete so the next render reflects it without a page reload. */
export function invalidateMediaManifest() {
  manifestPromise = null
}
