/**
 * Client-safe URL construction for the media bucket — split out of
 * mediaStore.ts, which imports `fs` and the AWS SDK and must never end up in
 * a browser bundle. NEXT_PUBLIC_MEDIA_DOMAIN is inlined at build time same
 * as the analytics tag IDs.
 */
export function mediaUrl(key: string): string {
  const domain = process.env.NEXT_PUBLIC_MEDIA_DOMAIN
  return domain ? `https://${domain}/${key}` : `/media/${key}`
}
