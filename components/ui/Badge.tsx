interface Props { children: React.ReactNode; variant?: 'gold' | 'muted'; className?: string }
export default function Badge({ children, variant = 'gold', className = '' }: Props) {
  const styles = variant === 'gold' ? 'bg-brand-gold-pale border border-brand-gold/20 text-brand-text' : 'bg-brand-warm-gray border border-brand-border text-brand-muted'
  return <span className={`inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 ${styles} ${className}`}>{children}</span>
}
