'use client'

import { useEffect, useState } from 'react'
import { invalidateMediaManifest } from '@/lib/mediaManifestClient'

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
  const initRes = await fetch('/api/admin/media', {
    method: 'POST',
    headers: {
      'x-admin-secret': secret,
      'x-media-key': key,
      'Content-Type': file.type || 'application/octet-stream',
    },
    body: file,
  })
  if (initRes.status === 401) throw new Error('Admin password not accepted. Sign in again at /admin/media.')
  const initData = await initRes.json()
  if (initData.error) throw new Error(initData.error)

  if (initData.uploadUrl) {
    const putRes = await fetch(initData.uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type || 'application/octet-stream' },
      body: file,
    })
    if (!putRes.ok) throw new Error('Upload to storage failed')
  }

  bust.set(key, Date.now())
  invalidateMediaManifest()
  window.dispatchEvent(new Event(MEDIA_UPDATED_EVENT))
}

export async function deleteMedia(key: string, secret: string): Promise<void> {
  const res = await fetch('/api/admin/media', {
    method: 'DELETE',
    headers: { 'x-admin-secret': secret, 'Content-Type': 'application/json' },
    body: JSON.stringify({ key }),
  })
  if (!res.ok) throw new Error('Could not remove the file')
  invalidateMediaManifest()
  window.dispatchEvent(new Event(MEDIA_UPDATED_EVENT))
}
