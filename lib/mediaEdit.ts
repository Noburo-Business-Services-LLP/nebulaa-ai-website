'use client'

import { useEffect, useState } from 'react'
import { rememberUpload, rememberRemoval } from '@/lib/mediaManifestClient'

/**
 * Edit mode: with the admin password entered in this tab and ?edit=1 on any
 * page, every photo and video spot on the real site becomes click-or-drop to
 * upload. The password never leaves the browser tab except as the header on
 * the upload request, exactly like the admin pages.
 */
const SESSION_KEY = 'admin_secret'
const EDIT_KEY = 'neb_edit'
const CHANGE_EVENT = 'neb-edit-change'
export const MEDIA_UPDATED_EVENT = 'neb-media-updated'

const bust = new Map<string, number>()
/** Cache-busting suffix for a file uploaded in this session, so a replacement shows immediately. */
export function bustFor(file: string): string {
  const v = bust.get(file)
  return v ? `?v=${v}` : ''
}

export function getAdminSecret(): string | null {
  try {
    return sessionStorage.getItem(SESSION_KEY)
  } catch {
    return null
  }
}

export function setEditMode(on: boolean) {
  try {
    if (on) sessionStorage.setItem(EDIT_KEY, '1')
    else sessionStorage.removeItem(EDIT_KEY)
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function useEditMode(): { editing: boolean; secret: string | null } {
  const [state, setState] = useState<{ editing: boolean; secret: string | null }>({ editing: false, secret: null })

  useEffect(() => {
    const read = () => {
      const secret = getAdminSecret()
      let flag = false
      try {
        flag = sessionStorage.getItem(EDIT_KEY) === '1'
      } catch {}
      setState({ editing: Boolean(secret) && flag, secret })
    }
    const q = new URLSearchParams(window.location.search).get('edit')
    if (q === '1') {
      try { sessionStorage.setItem(EDIT_KEY, '1') } catch {}
    } else if (q === '0') {
      try { sessionStorage.removeItem(EDIT_KEY) } catch {}
    }
    read()
    window.addEventListener(CHANGE_EVENT, read)
    window.addEventListener('storage', read)
    return () => {
      window.removeEventListener(CHANGE_EVENT, read)
      window.removeEventListener('storage', read)
    }
  }, [])

  return state
}

/**
 * Uploads one file under a storage key: asks the API for a presigned URL (or,
 * locally, has the API write the bytes), sends the file, then tells every
 * MediaSlot on the page to look again.
 */
export async function uploadMedia(file: File, key: string, secret: string): Promise<void> {
  const contentType = file.type || 'application/octet-stream'
  const headers = { 'x-admin-secret': secret, 'x-media-key': key, 'Content-Type': contentType }

  // Step 1: ask for an upload link. No file goes in this request, so a large
  // video never has to pass through the server (which caps out near 6MB).
  const initRes = await fetch('/api/admin/media', { method: 'POST', headers })
  if (initRes.status === 401) throw new Error('Admin password not accepted. Sign in again at /admin/media.')
  const initData = await initRes.json().catch(() => ({}))
  if (!initRes.ok || initData.error) throw new Error(initData.error || `Could not start the upload (error ${initRes.status})`)

  if (initData.uploadUrl) {
    // Step 2 (live site): the file goes straight from this browser to storage.
    let putRes: Response
    try {
      putRes = await fetch(initData.uploadUrl, { method: 'PUT', headers: { 'Content-Type': contentType }, body: file })
    } catch {
      throw new Error('The file could not reach storage. Check your connection and try again.')
    }
    if (!putRes.ok) throw new Error(`Storage refused the file (error ${putRes.status}).`)
  } else if (initData.needsBody) {
    // Local development only: there is no storage bucket, so the server writes the file.
    const localRes = await fetch('/api/admin/media', { method: 'POST', headers, body: file })
    const localData = await localRes.json().catch(() => ({}))
    if (!localRes.ok || localData.error) throw new Error(localData.error || `Upload failed (error ${localRes.status})`)
  }

  bust.set(key, Date.now())
  rememberUpload(key)
  window.dispatchEvent(new Event(MEDIA_UPDATED_EVENT))
}

export async function deleteMedia(key: string, secret: string): Promise<void> {
  const res = await fetch('/api/admin/media', {
    method: 'DELETE',
    headers: { 'x-admin-secret': secret, 'Content-Type': 'application/json' },
    body: JSON.stringify({ key }),
  })
  if (!res.ok) throw new Error('Could not remove the file')
  rememberRemoval(key)
  window.dispatchEvent(new Event(MEDIA_UPDATED_EVENT))
}
