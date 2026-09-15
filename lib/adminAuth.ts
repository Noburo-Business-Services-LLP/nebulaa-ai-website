import { timingSafeEqual } from 'crypto'
import type { NextRequest } from 'next/server'

/**
 * Admin route authentication.
 *
 * The previous per-route implementation was:
 *
 *   secret?.trim() === process.env.ADMIN_SECRET?.trim()
 *
 * which grants access to an unauthenticated request whenever ADMIN_SECRET is
 * unset: `null?.trim()` and `undefined?.trim()` are both `undefined`, so the
 * comparison is `undefined === undefined`, which is true. A missing
 * environment variable turned every admin route — including the one that
 * returns the full lead list — into an open endpoint.
 *
 * This version fails closed: no configured secret means no access, ever.
 */
export function isAdmin(req: NextRequest): boolean {
  const expected = process.env.ADMIN_SECRET?.trim()

  // Refuse rather than fall open. An unconfigured deployment is locked, not public.
  if (!expected) return false

  const provided = req.headers.get('x-admin-secret')?.trim()
  if (!provided) return false

  const a = Buffer.from(provided)
  const b = Buffer.from(expected)

  // timingSafeEqual throws on a length mismatch, which would itself leak the
  // length, so compare sizes first and always run the constant-time check.
  if (a.length !== b.length) return false

  return timingSafeEqual(a, b)
}
