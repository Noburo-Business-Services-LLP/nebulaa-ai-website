/**
 * The CMS media store — the public `Media` bucket from sst.config.ts.
 *
 * Uploads never pass through the Lambda function: the admin browser asks
 * this module for a presigned PUT URL, then uploads the file directly to
 * S3. That keeps large video assets out of the 6MB Lambda payload limit and
 * off the app's compute bill entirely. Reads are just as direct — objects
 * are public, so a page renders `https://${domain}/${key}` straight from
 * the bucket with no server involved.
 *
 * Locally (no MEDIA_BUCKET configured) this falls back to public/media on
 * disk, matching the old file-drop workflow, so `npm run dev` keeps working
 * without AWS credentials.
 */
import fs from 'fs'
import path from 'path'
import { mediaUrl } from '@/lib/mediaUrl'

const bucket = () => process.env.MEDIA_BUCKET
const region = () => process.env.AWS_REGION || 'ap-south-1'
const localDir = path.join(process.cwd(), 'public', 'media')

let s3Client: import('@aws-sdk/client-s3').S3Client | null = null
async function s3() {
  if (!s3Client) {
    const { S3Client } = await import('@aws-sdk/client-s3')
    s3Client = new S3Client({ region: region() })
  }
  return s3Client
}

export interface MediaObject {
  key: string
  url: string
  size: number
  lastModified: string
}

/** Every object currently in the bucket (or public/media locally). */
export async function listMedia(): Promise<MediaObject[]> {
  const b = bucket()

  if (!b) {
    if (!fs.existsSync(localDir)) return []
    return fs
      .readdirSync(localDir)
      .filter(f => !f.startsWith('.') && f !== 'README.md')
      .map(f => {
        const stat = fs.statSync(path.join(localDir, f))
        return { key: f, url: `/media/${f}`, size: stat.size, lastModified: stat.mtime.toISOString() }
      })
  }

  const { ListObjectsV2Command } = await import('@aws-sdk/client-s3')
  const client = await s3()
  const objects: MediaObject[] = []
  let continuationToken: string | undefined

  do {
    const res = await client.send(
      new ListObjectsV2Command({ Bucket: b, ContinuationToken: continuationToken }),
    )
    for (const obj of res.Contents ?? []) {
      if (!obj.Key) continue
      objects.push({
        key: obj.Key,
        url: mediaUrl(obj.Key),
        size: obj.Size ?? 0,
        lastModified: (obj.LastModified ?? new Date()).toISOString(),
      })
    }
    continuationToken = res.IsTruncated ? res.NextContinuationToken : undefined
  } while (continuationToken)

  return objects.sort((a, b2) => b2.lastModified.localeCompare(a.lastModified))
}

/**
 * A presigned URL the browser can PUT the file to directly. Expires in 5
 * minutes — long enough for a slow upload to start, short enough that a
 * leaked URL is useless shortly after.
 */
export async function createUploadUrl(key: string, contentType: string): Promise<string | null> {
  const b = bucket()
  if (!b) return null // local dev: caller falls back to writing the file directly

  const { PutObjectCommand } = await import('@aws-sdk/client-s3')
  const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner')
  const client = await s3()
  const command = new PutObjectCommand({ Bucket: b, Key: key, ContentType: contentType })
  return getSignedUrl(client, command, { expiresIn: 300 })
}

/** Used only in local dev, where there is no S3 bucket to presign against. */
export function writeLocalMedia(key: string, buffer: Buffer) {
  if (!fs.existsSync(localDir)) fs.mkdirSync(localDir, { recursive: true })
  fs.writeFileSync(path.join(localDir, key), buffer)
}

export async function deleteMedia(key: string): Promise<void> {
  const b = bucket()

  if (!b) {
    const target = path.join(localDir, key)
    if (fs.existsSync(target)) fs.unlinkSync(target)
    return
  }

  const { DeleteObjectCommand } = await import('@aws-sdk/client-s3')
  const client = await s3()
  await client.send(new DeleteObjectCommand({ Bucket: b, Key: key }))
}
