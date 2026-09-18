import { NextResponse } from 'next/server'
import { listMedia } from '@/lib/mediaStore'

/**
 * Public — just "which slot files currently have an asset," nothing
 * sensitive. This is what replaces the old build-time `media:scan` script:
 * MediaSlot fetches this once per page load instead of importing a manifest
 * baked into the JS bundle at the last deploy, so an upload from /admin/media
 * shows up on the live site immediately, no rebuild required.
 */
export async function GET() {
  const objects = await listMedia()
  return NextResponse.json(
    { keys: objects.map(o => o.key) },
    { headers: { 'Cache-Control': 'public, max-age=30, stale-while-revalidate=120' } },
  )
}
