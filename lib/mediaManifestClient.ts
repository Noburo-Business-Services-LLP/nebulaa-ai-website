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

/**
 * Files uploaded or removed in this browser tab. The server's file list is
 * cached for a few seconds, so right after an upload it would still be missing
 * the new file; merging these in makes an upload show up instantly.
 */
const addedKeys = new Set<string>()
const removedKeys = new Set<string>()

export function rememberUpload(key: string) {
  addedKeys.add(key)
  removedKeys.delete(key)
  manifestPromise = null
}

export function rememberRemoval(key: string) {
  removedKeys.add(key)
  addedKeys.delete(key)
  manifestPromise = null
}

async function fetchManifest(): Promise<Set<string>> {
  let keys = new Set<string>()
  try {
    const res = await fetch('/api/media/manifest', { cache: 'no-store' })
    if (res.ok) {
      const data: { keys: string[] } = await res.json()
      keys = new Set(data.keys)
    }
  } catch {}
  addedKeys.forEach(k => keys.add(k))
  removedKeys.forEach(k => keys.delete(k))
  return keys
}

export function getMediaManifest(): Promise<Set<string>> {
  if (!manifestPromise) manifestPromise = fetchManifest()
  return manifestPromise
}

/** Called after an admin upload/delete so the next render reflects it without a page reload. */
export function invalidateMediaManifest() {
  manifestPromise = null
}
