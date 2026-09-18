import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'
import { listMedia, createUploadUrl, deleteMedia, writeLocalMedia } from '@/lib/mediaStore'

const MAX_LOCAL_UPLOAD_BYTES = 8 * 1024 * 1024 // matches the video-size guidance in mediaSlots.ts

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(await listMedia())
}

/**
 * Two shapes depending on environment:
 *  - On AWS (MEDIA_BUCKET set): body is {key, contentType} → returns a
 *    presigned URL the browser PUTs the file to directly.
 *  - Local dev (no bucket): body is the raw file bytes with the key and
 *    content type in headers, written straight to public/media — there is
 *    no S3 to presign against, and a round-trip through the same shape
 *    would just mean standing up MinIO for no benefit.
 */
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const key = req.headers.get('x-media-key')
  const contentType = req.headers.get('content-type') || 'application/octet-stream'

  if (!key) return NextResponse.json({ error: 'x-media-key header required' }, { status: 400 })
  if (!/^[a-zA-Z0-9._-]+$/.test(key)) {
    return NextResponse.json({ error: 'Key must be a plain filename — no slashes or spaces' }, { status: 400 })
  }

  const uploadUrl = await createUploadUrl(key, contentType)
  if (uploadUrl) {
    // AWS path — the client uploads to this URL itself.
    return NextResponse.json({ uploadUrl })
  }

  // Local dev path — write the body directly.
  const buffer = Buffer.from(await req.arrayBuffer())
  if (buffer.byteLength > MAX_LOCAL_UPLOAD_BYTES) {
    return NextResponse.json({ error: 'File too large for local dev upload (8MB limit)' }, { status: 413 })
  }
  writeLocalMedia(key, buffer)
  return NextResponse.json({ uploadUrl: null, written: true })
}

export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { key } = await req.json()
  if (!key) return NextResponse.json({ error: 'key required' }, { status: 400 })
  await deleteMedia(key)
  return NextResponse.json({ success: true })
}
