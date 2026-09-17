'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Wand2, RefreshCw } from 'lucide-react'

export interface ToolField {
  key: string
  label: string
  type: 'textarea' | 'text' | 'select'
  placeholder?: string
  options?: string[]
  rows?: number
}

interface Props {
  fields: ToolField[]
  templates: ((v: Record<string, string>) => string)[]
  outputLabel: string
  buttonLabel?: string
  tip?: string
}

export default function GenericTool({ fields, templates, outputLabel, buttonLabel = 'Generate', tip }: Props) {
  const initValues: Record<string, string> = {}
  for (const f of fields) initValues[f.key] = f.options?.[0] ?? ''
  const [values, setValues] = useState<Record<string, string>>(initValues)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [variantIdx, setVariantIdx] = useState(0)

  const primaryField = fields.find(f => f.type !== 'select')
  const canGenerate = primaryField ? (values[primaryField.key]?.trim().length ?? 0) > 0 : false

  const generate = () => {
    if (!canGenerate) return
    const idx = Math.floor(Math.random() * templates.length)
    setVariantIdx(idx)
    setOutput(templates[idx](values))
    setGenerated(true)
  }

  const regenerate = () => {
    if (!canGenerate) return
    const next = (variantIdx + 1) % templates.length
    setVariantIdx(next)
    setOutput(templates[next](values))
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const set = (key: string, val: string) => setValues(p => ({ ...p, [key]: val }))

  return (
    <div className="space-y-6">
      <div className="bg-surface-2 rounded-2xl p-6 border border-rule">
        <div className="space-y-4">
          {fields.map(f => (
            <div key={f.key}>
              <label className="font-body text-sm font-semibold text-ink block mb-2">{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea
                  value={values[f.key]}
                  onChange={e => set(f.key, e.target.value)}
                  rows={f.rows ?? 3}
                  placeholder={f.placeholder}
                  className="w-full border border-rule bg-surface-2 text-ink rounded-xl px-4 py-3 font-body text-sm resize-none outline-none focus:border-gold transition-colors placeholder:text-muted"
                />
              ) : f.type === 'select' ? (
                <select
                  value={values[f.key]}
                  onChange={e => set(f.key, e.target.value)}
                  className="w-full border border-rule bg-surface-2 text-ink rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-gold transition-colors"
                >
                  {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  type="text"
                  value={values[f.key]}
                  onChange={e => set(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full border border-rule bg-surface-2 text-ink rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-gold transition-colors placeholder:text-muted"
                />
              )}
            </div>
          ))}
          <button
            onClick={generate}
            disabled={!canGenerate}
            className="flex items-center gap-2 bg-gold text-[#1A1208] font-body font-semibold rounded-full px-6 py-3 hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
          >
            <Wand2 size={16} />
            {buttonLabel}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {generated && output && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-surface rounded-2xl border border-rule overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-rule">
              <span className="font-body text-sm font-semibold text-ink">{outputLabel}</span>
              <div className="flex items-center gap-3">
                {templates.length > 1 && (
                  <button onClick={regenerate} className="flex items-center gap-1.5 font-body text-xs font-semibold text-muted hover:text-ink transition-colors">
                    <RefreshCw size={12} />
                    Try another
                  </button>
                )}
                <button onClick={copy} className="flex items-center gap-1.5 font-body text-xs font-semibold text-gold-text hover:text-gold-text-dim transition-colors">
                  {copied ? <><Check size={12} />Copied!</> : <><Copy size={12} />Copy</>}
                </button>
              </div>
            </div>
            <div className="p-5">
              <pre className="font-body text-sm text-ink whitespace-pre-wrap leading-relaxed">{output}</pre>
            </div>
            {tip && (
              <div className="px-5 py-3 bg-gold/5 border-t border-rule">
                <p className="font-body text-xs text-muted">
                  💡 {tip}{' '}
                  <a href="/pricing" className="text-gold-text hover:underline">Try Gravity →</a>
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
