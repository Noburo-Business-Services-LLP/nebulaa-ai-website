interface Props { children: string; className?: string }
export default function SectionLabel({ children, className = '' }: Props) {
  return <span className={`font-body text-xs font-semibold tracking-widest uppercase text-brand-gold ${className}`}>{children}</span>
}
