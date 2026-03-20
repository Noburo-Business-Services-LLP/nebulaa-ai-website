interface SectionBadgeProps {
  children: string
  className?: string
}

export default function SectionBadge({ children, className = '' }: SectionBadgeProps) {
  return (
    <span
      className={`
        inline-block font-sans text-xs font-semibold tracking-widest uppercase
        text-brand-gold mb-4 ${className}
      `}
    >
      {children}
    </span>
  )
}
