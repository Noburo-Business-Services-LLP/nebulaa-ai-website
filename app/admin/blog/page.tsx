'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Sparkles, Upload, ExternalLink, FileEdit, X, Wand2 } from 'lucide-react'
import { adminFetch, AuthGate, useAdminAuth } from '@/lib/adminClient'
import { invalidateMediaManifest } from '@/lib/mediaManifestClient'
import { mediaUrl } from '@/lib/mediaUrl'
import { SUGGESTED_TAGS } from '@/lib/blogTags'

interface PostSummary {
  slug: string
  title: string
  tags: string[]
  date: string
  source: 'repo' | 'edited' | 'published'
}

interface PostDraft {
  slug: string
  title: string
  tags: string[]
  excerpt: string
  content: string
  heroImage?: string
  isRepoPost?: boolean
}

const EMPTY_DRAFT: PostDraft = { slug: '', title: '', tags: [], excerpt: '', content: '' }

const SOURCE_LABEL: Record<PostSummary['source'], string> = {
  repo: 'Original',
  edited: 'Edited',
  published: 'Published',
}

/**
 * Copying an AI chat answer by dragging over the rendered bubble (rather
 * than using its own "Copy" button) frequently collapses every paragraph,
 * heading and list item into one flattened line — the breaks only ever
 * existed as CSS spacing in the chat UI, not as real newline characters, so
 * a plain paste loses them entirely. This can't be told apart from a
 * genuinely one-line paste with certainty, so it only kicks in when the
 * clipboard text is long with next to no line breaks — the unambiguous
 * signature of a flattened chat answer — and only re-inserts breaks before
 * markdown block markers (headings, list items) it can identify with
 * confidence, never mid-sentence.
 */
function looksFlattened(text: string): boolean {
  return text.length > 300 && (text.match(/\n/g)?.length ?? 0) < 2
}

function reflowFlattenedMarkdown(text: string): string {
  return text
    .replace(/([.!?:])\s+(#{1,6}\s)/g, '$1\n\n$2')
    .replace(/([.!?])\s+(-\s+(?:\*\*|[A-Za-z]))/g, '$1\n\n$2')
    .replace(/([.!?])\s+(\d+\.\s+(?:\*\*|[A-Za-z]))/g, '$1\n\n$2')
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function PostList({
  posts,
  activeSlug,
  onSelect,
  onNew,
}: {
  posts: PostSummary[] | null
  activeSlug: string | null
  onSelect: (slug: string) => void
  onNew: () => void
}) {
  return (
    <div className="w-full lg:w-[300px] flex-shrink-0">
      <button
        onClick={onNew}
        className="w-full mb-4 inline-flex items-center justify-center gap-2 bg-gold text-[#1A1208] font-semibold text-[14px] rounded-full px-4 py-2.5 hover:brightness-110 transition"
      >
        <FileEdit size={15} /> New post
      </button>
      <div className="flex flex-col gap-1.5 max-h-[70vh] overflow-y-auto pr-1">
        {!posts && <p className="text-muted text-sm">Loading…</p>}
        {posts?.map(p => (
          <button
            key={p.slug}
            onClick={() => onSelect(p.slug)}
            className={`text-left rounded-[10px] px-3.5 py-2.5 border transition ${
              activeSlug === p.slug ? 'border-gold/40 bg-gold/[0.06]' : 'border-rule hover:border-rule-2'
            }`}
          >
            <p className="text-[13.5px] font-medium text-ink leading-snug line-clamp-1">{p.title}</p>
            <p className="text-[11.5px] text-faint mt-0.5">
              {p.tags.length ? p.tags.join(', ') : 'No tags'} · {SOURCE_LABEL[p.source]}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

function Editor({ secret, draft, setDraft, onSaved }: {
  secret: string
  draft: PostDraft
  setDraft: (d: PostDraft) => void
  onSaved: () => void
}) {
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [aiTopic, setAiTopic] = useState('')
  const [generating, setGenerating] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [suggesting, setSuggesting] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const isNew = !draft.slug

  const addTag = (raw: string) => {
    const tag = raw.trim()
    if (!tag || draft.tags.includes(tag)) return
    setDraft({ ...draft, tags: [...draft.tags, tag] })
  }
  const removeTag = (tag: string) => setDraft({ ...draft, tags: draft.tags.filter(t => t !== tag) })

  const suggestTags = async () => {
    if (!draft.title.trim() || !draft.content.trim()) {
      setError('Write a title and some content first — there\'s nothing to read yet')
      return
    }
    setSuggesting(true)
    setError('')
    try {
      const res = await adminFetch<{ tags: string[] }>('/api/admin/suggest-tags', secret, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: draft.title, excerpt: draft.excerpt, content: draft.content }),
      })
      if (res) {
        const merged = Array.from(new Set([...draft.tags, ...res.tags]))
        setDraft({ ...draft, tags: merged })
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not suggest tags')
    }
    setSuggesting(false)
  }

  const save = async () => {
    if (!draft.title.trim() || !draft.content.trim()) {
      setError('Title and content are required')
      return
    }
    const slug = draft.slug || slugify(draft.title)
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const res = await adminFetch<{ url: string; message: string }>('/api/admin/publish-blog', secret, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...draft, slug }),
      })
      if (res) {
        setMessage(res.message)
        setDraft({ ...draft, slug })
        onSaved()
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed')
    }
    setSaving(false)
  }

  const uploadHero = async (file: File | undefined) => {
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const key = `blog-${draft.slug || slugify(draft.title) || Date.now()}-hero.${file.name.split('.').pop()}`
      const initRes = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'x-admin-secret': secret, 'x-media-key': key, 'Content-Type': file.type },
        body: file,
      })
      const initData = await initRes.json()
      if (initData.error) throw new Error(initData.error)
      if (initData.uploadUrl) {
        const putRes = await fetch(initData.uploadUrl, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file })
        if (!putRes.ok) throw new Error('Upload to storage failed')
      }
      invalidateMediaManifest()
      setDraft({ ...draft, heroImage: key })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    }
    setUploading(false)
  }

  const generateDraft = async () => {
    if (!aiTopic.trim()) return
    setGenerating(true)
    setError('')
    try {
      const res = await adminFetch<{ content: string; title: string; slug: string }>('/api/admin/generate-blog', secret, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopic }),
      })
      if (res) {
        setDraft({ ...draft, title: draft.title || res.title, content: res.content })
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Generation failed')
    }
    setGenerating(false)
  }

  return (
    <div className="flex-1 min-w-0">
      {draft.isRepoPost && (
        <p className="text-[12.5px] text-gold-text bg-gold/[0.08] border border-gold/20 rounded-lg px-3.5 py-2.5 mb-4">
          This is an original repo post. Saving creates a live override — the site will show your edited
          version immediately, no redeploy needed.
        </p>
      )}

      {isNew && (
        <div className="hud-card rounded-[14px] p-4 mb-5 flex flex-col sm:flex-row gap-2.5">
          <input
            value={aiTopic}
            onChange={e => setAiTopic(e.target.value)}
            placeholder="Topic for an AI-drafted starting point (optional)"
            className="flex-1 bg-surface-2 border border-rule rounded-lg px-3.5 py-2.5 text-[13.5px] outline-none focus:border-gold"
          />
          <button
            onClick={generateDraft}
            disabled={generating || !aiTopic.trim()}
            className="inline-flex items-center justify-center gap-1.5 text-[13px] font-semibold border border-rule-2 rounded-lg px-4 py-2.5 hover:border-gold transition disabled:opacity-50 whitespace-nowrap"
          >
            <Sparkles size={13} /> {generating ? 'Writing…' : 'Draft with AI'}
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <input
          value={draft.title}
          onChange={e => setDraft({ ...draft, title: e.target.value })}
          placeholder="Post title"
          className="w-full bg-surface-2 border border-rule rounded-xl px-4 py-3 text-[16px] font-medium outline-none focus:border-gold"
        />

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[12px] text-muted">Tags</p>
            <button
              onClick={suggestTags}
              disabled={suggesting}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-gold-text hover:gap-2 transition-all disabled:opacity-50"
            >
              <Wand2 size={12} /> {suggesting ? 'Reading the post…' : 'Suggest tags'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-2.5">
            {draft.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 bg-gold-wash border border-gold/25 text-gold-text text-[12.5px] rounded-full pl-3 pr-1.5 py-1"
              >
                #{tag}
                <button onClick={() => removeTag(tag)} className="hover:text-red-400 transition">
                  <X size={11} />
                </button>
              </span>
            ))}
            {draft.tags.length === 0 && <span className="text-[12.5px] text-faint">No tags yet</span>}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <input
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ',') {
                  e.preventDefault()
                  addTag(tagInput)
                  setTagInput('')
                }
              }}
              placeholder="Type a tag, press Enter"
              className="flex-1 min-w-[160px] bg-surface-2 border border-rule rounded-lg px-3 py-1.5 text-[12.5px] outline-none focus:border-gold"
            />
            {SUGGESTED_TAGS.filter(t => !draft.tags.includes(t)).slice(0, 6).map(t => (
              <button
                key={t}
                onClick={() => addTag(t)}
                className="text-[11.5px] text-muted border border-rule rounded-full px-2.5 py-1 hover:border-gold hover:text-gold-text transition"
              >
                + {t}
              </button>
            ))}
          </div>
          {draft.slug && (
            <span className="text-[13px] text-faint mt-2 block">/blog/{draft.slug}</span>
          )}
        </div>

        <textarea
          value={draft.excerpt}
          onChange={e => setDraft({ ...draft, excerpt: e.target.value })}
          placeholder="Excerpt (shown on the blog index — leave blank to derive from the title)"
          rows={2}
          className="w-full bg-surface-2 border border-rule rounded-xl px-4 py-3 text-[13.5px] outline-none focus:border-gold resize-none"
        />

        <div>
          <p className="text-[12px] text-muted mb-2">Hero image</p>
          <div className="flex items-center gap-3">
            {draft.heroImage && (
              <a href={mediaUrl(draft.heroImage)} target="_blank" rel="noreferrer" className="relative w-24 h-14 rounded-lg overflow-hidden border border-rule flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element -- admin-only preview thumbnail, not a page asset */}
                <img src={mediaUrl(draft.heroImage)} alt="" className="w-full h-full object-cover" />
              </a>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => uploadHero(e.target.files?.[0])} />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold border border-rule-2 rounded-full px-4 py-2 hover:border-gold transition disabled:opacity-50"
            >
              <Upload size={13} /> {uploading ? 'Uploading…' : draft.heroImage ? 'Replace' : 'Upload'}
            </button>
            {!draft.heroImage && <span className="text-[12px] text-faint">No image — falls back to the gradient bar</span>}
          </div>
        </div>

        <textarea
          value={draft.content}
          onChange={e => setDraft({ ...draft, content: e.target.value })}
          onPaste={e => {
            const text = e.clipboardData.getData('text/plain')
            if (!looksFlattened(text)) return // real newlines already — don't touch a normal paste
            e.preventDefault()
            document.execCommand('insertText', false, reflowFlattenedMarkdown(text))
          }}
          placeholder="Post content (Markdown)"
          rows={20}
          className="w-full bg-surface-2 border border-rule rounded-xl px-4 py-3 text-[13.5px] font-mono leading-relaxed outline-none focus:border-gold resize-y"
        />

        <div className="flex items-center gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-gold text-[#1A1208] font-semibold text-[14px] rounded-full px-6 py-2.5 hover:brightness-110 transition disabled:opacity-50"
          >
            <Save size={14} /> {saving ? 'Saving…' : 'Save & publish'}
          </button>
          {draft.slug && (
            <a href={`/blog/${draft.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[13px] text-ink-2 hover:text-gold-text transition">
              <ExternalLink size={13} /> View live
            </a>
          )}
          {message && <span className="text-[13px] text-gold-text">{message}</span>}
          {error && <span className="text-[13px] text-red-400">{error}</span>}
        </div>
      </div>
    </div>
  )
}

function BlogEditorPage({ secret }: { secret: string }) {
  const [posts, setPosts] = useState<PostSummary[] | null>(null)
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [draft, setDraft] = useState<PostDraft>(EMPTY_DRAFT)

  const refreshList = useCallback(() => {
    adminFetch<PostSummary[]>('/api/admin/blog', secret).then(setPosts)
  }, [secret])

  useEffect(() => { refreshList() }, [refreshList])

  const selectPost = async (slug: string) => {
    setActiveSlug(slug)
    const post = await adminFetch<PostDraft>(`/api/admin/blog/${slug}`, secret)
    if (post) setDraft(post)
  }

  const newPost = () => {
    setActiveSlug(null)
    setDraft(EMPTY_DRAFT)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <PostList posts={posts} activeSlug={activeSlug} onSelect={selectPost} onNew={newPost} />
      <Editor
        secret={secret}
        draft={draft}
        setDraft={setDraft}
        onSaved={() => {
          refreshList()
          setActiveSlug(draft.slug || null)
        }}
      />
    </div>
  )
}

export default function AdminBlogPage() {
  const { secret, setSecret, verifying } = useAdminAuth()

  if (verifying) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <p className="text-white/40 font-body text-sm">Authenticating…</p>
      </div>
    )
  }

  if (!secret) return <AuthGate onAuth={setSecret} />

  return (
    <main className="bg-ground text-ink min-h-screen px-6 md:px-12 lg:px-[80px] py-[70px]">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-ink mb-8">
        <ArrowLeft size={14} /> Admin
      </Link>
      <h1 className="neb-display text-[30px] md:text-[38px] mb-8">Blog editor</h1>
      <BlogEditorPage secret={secret} />
    </main>
  )
}
