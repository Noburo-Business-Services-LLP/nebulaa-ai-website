import { readJson, writeJson } from '@/lib/s3Store'

export interface PageView {
  page: string
  date: string
  referrer: string
  ua: string
}

/**
 * Page views are kept one file per day rather than in a single growing file.
 *
 * The previous shape read a 10,000-entry array, appended to it and rewrote the
 * whole thing on every single page load. That is slow, re-uploads the entire
 * file per view, and under concurrent Lambdas two overlapping requests read the
 * same array and the second write silently discards the first.
 *
 * Splitting by day bounds each file to one day of traffic, makes the dashboard
 * a fixed 30 reads instead of one ever-growing one, and shrinks the write
 * window to the point where a collision costs a handful of views on a single
 * day. It does not eliminate the race — S3 has no read-modify-write primitive.
 * That is an accepted trade for vanity metrics; anything that needs to be
 * exact should go to a real analytics product.
 */
const dayKey = (date: string) => `analytics/${date}.json`

export const today = () => new Date().toISOString().split('T')[0]

export async function appendPageView(view: PageView): Promise<boolean> {
  const key = dayKey(view.date)
  const existing = await readJson<PageView[]>(key, [])
  existing.push(view)
  // A single day over 20k views is a bot, not an audience worth charting.
  return writeJson(key, existing.slice(-20000))
}

/** Every view in the last `days` days, oldest first. */
export async function readPageViews(days = 60): Promise<PageView[]> {
  const now = new Date()
  const keys: string[] = []

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    keys.push(d.toISOString().split('T')[0])
  }

  const perDay = await Promise.all(keys.map(date => readJson<PageView[]>(dayKey(date), [])))
  return perDay.flat()
}
