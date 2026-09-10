interface Props {
  children: string
  className?: string
  /** 'onDark' is for labels sitting inside a product mockup, which stays dark in both themes. */
  tone?: 'gold' | 'muted' | 'onDark'
}

const TONE: Record<string, string> = {
  gold: 'neb-label-gold',
  muted: '',
  onDark: 'neb-label-on-dark',
}

export default function SectionLabel({ children, className = '', tone = 'gold' }: Props) {
  return (
    <span className={`neb-label ${TONE[tone]} ${className}`}>
      {children}
    </span>
  )
}
