import { ReactNode } from 'react'

interface Props { children: ReactNode; className?: string }

export default function PhoneMockup({ children, className = '' }: Props) {
  return (
    <div className={`relative mx-auto w-64 ${className}`}>
      <div className="rounded-[2.5rem] border-[6px] border-brand-text dark:border-white/20 overflow-hidden shadow-card-hover dark:shadow-none bg-white dark:bg-[#1A1815]">
        {/* Notch */}
        <div className="bg-brand-text dark:bg-white/10 h-7 flex items-center justify-center">
          <div className="w-20 h-4 bg-black/40 dark:bg-white/20 rounded-full" />
        </div>
        <div className="overflow-y-auto max-h-[480px]">{children}</div>
        {/* Home bar */}
        <div className="bg-white dark:bg-[#1A1815] h-6 flex items-center justify-center">
          <div className="w-24 h-1 bg-brand-border dark:bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  )
}
