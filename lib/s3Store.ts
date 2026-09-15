import fs from 'fs'
import path from 'path'

/**
 * Small JSON store that reads and writes S3 in production and the local
 * `data/` directory in development.
 *
 * The site used to write `data/*.json` with `fs.writeFileSync`. That works on
 * a laptop and on a VM, and throws EROFS on Lambda, where everything outside
 * /tmp is read-only. Rather than scatter try/catch around every call site,
 * every piece of mutable state now goes through here.
 *
 * Selection is by environment, not by guesswork: if DATA_BUCKET is set we are
 * on AWS and use S3; otherwise we are local and use the filesystem.
 */

const bucket = () => process.env.DATA_BUCKET
const region = () => process.env.AWS_REGION || 'ap-south-1'

const localPath = (key: string) => path.join(process.cwd(), 'data', key)

// The SDK client is created lazily so local dev never constructs one and the
// dependency stays out of the path when there is no bucket configured.
let client: import('@aws-sdk/client-s3').S3Client | null = null
async function s3() {
  if (!client) {
    const { S3Client } = await import('@aws-sdk/client-s3')
    client = new S3Client({ region: region() })
  }
  return client
}

export async function readJson<T>(key: string, fallback: T): Promise<T> {
  const b = bucket()

  if (!b) {
    try {
      return JSON.parse(fs.readFileSync(localPath(key), 'utf8')) as T
    } catch {
      return fallback
    }
  }

  try {
    const { GetObjectCommand } = await import('@aws-sdk/client-s3')
    const res = await (await s3()).send(new GetObjectCommand({ Bucket: b, Key: key }))
    const body = await res.Body?.transformToString()
    return body ? (JSON.parse(body) as T) : fallback
  } catch {
    // A missing key is the normal state before anything has been written.
    return fallback
  }
}

export async function writeJson(key: string, value: unknown): Promise<boolean> {
  const b = bucket()
  const body = JSON.stringify(value, null, 2)

  if (!b) {
    try {
      fs.mkdirSync(path.dirname(localPath(key)), { recursive: true })
      fs.writeFileSync(localPath(key), body)
      return true
    } catch {
      return false
    }
  }

  try {
    const { PutObjectCommand } = await import('@aws-sdk/client-s3')
    await (await s3()).send(
      new PutObjectCommand({
        Bucket: b,
        Key: key,
        Body: body,
        ContentType: 'application/json',
      }),
    )
    return true
  } catch {
    return false
  }
}

/** Keys under a prefix. Used where state is many small objects, not one file. */
export async function listKeys(prefix: string, limit = 1000): Promise<string[]> {
  const b = bucket()

  if (!b) {
    try {
      const dir = localPath(prefix)
      return fs.readdirSync(dir).map(f => `${prefix}/${f}`).slice(0, limit)
    } catch {
      return []
    }
  }

  try {
    const { ListObjectsV2Command } = await import('@aws-sdk/client-s3')
    const keys: string[] = []
    let token: string | undefined

    do {
      const res = await (await s3()).send(
        new ListObjectsV2Command({ Bucket: b, Prefix: prefix, ContinuationToken: token }),
      )
      for (const o of res.Contents || []) if (o.Key) keys.push(o.Key)
      token = res.IsTruncated ? res.NextContinuationToken : undefined
    } while (token && keys.length < limit)

    return keys.slice(0, limit)
  } catch {
    return []
  }
}

export const isRemote = () => Boolean(bucket())
