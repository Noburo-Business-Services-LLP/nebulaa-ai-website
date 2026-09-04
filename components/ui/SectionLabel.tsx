interface Props {
  children: string
  className?: string
  tone?: 'gold' | 'muted'
}

export default function SectionLabel({ children, className = '', tone = 'gold' }: Props) {
  return (
    <span className={`neb-label ${tone === 'gold' ? 'neb-label-gold' : ''} ${className}`}>
      {children}
    </span>
  )
}
