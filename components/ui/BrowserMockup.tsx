import { ReactNode } from 'react'

interface Props { children: ReactNode; url?: string; className?: string }

export default function BrowserMockup({ children, url = 'nebulaa.ai', className = '' }: Props) {
  return (
    <div className={`rounded-2xl border border-brand-border dark:border-white/10 overflow-hidden shadow-card dark:shadow-none bg-white dark:bg-[#1A1815] ${className}`}>
      {/* Browser chrome */}
      <div className="bg-brand-warm-gray dark:bg-white/5 border-b border-brand-border dark:border-white/10 px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
          <div className="w-3 h-3 rounded-full bg-green-400/60" />
        </div>
        <div className="flex-1 bg-white dark:bg-white/5 rounded-md px-3 py-1.5 text-xs text-brand-muted dark:text-white/40 border border-brand-border dark:border-white/10 text-center">
          {url}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}
