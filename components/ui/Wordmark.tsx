/**
 * The horizontal Nebulaa lockup, drawn rather than shipped as a bitmap so it
 * stays sharp at any size and inherits theme colour.
 *
 * The mark keeps the old logo's idea — three interlocking forms — but states
 * it geometrically: three nodes on one orbit around a core. That is literally
 * the product architecture (Gravity, Orbit and Pulsar around Nebulaa Core),
 * so the mark says what the system is instead of decorating it.
 */
export default function Wordmark({
  className = '',
  showText = true,
}: {
  className?: string
  showText?: boolean
}) {
  return (
    <span className={`inline-flex items-center gap-[10px] ${className}`}>
      <svg
        viewBox="0 0 32 32"
        className="w-[26px] h-[26px] flex-shrink-0 overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        {/* orbit */}
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.25" opacity="0.32" />
        {/* core */}
        <circle cx="16" cy="16" r="3.1" fill="currentColor" />
        {/* three engines, 120° apart — the top one lit */}
        <circle cx="16" cy="5" r="2.5" fill="currentColor" />
        <circle cx="25.53" cy="21.5" r="2.5" fill="currentColor" opacity="0.62" />
        <circle cx="6.47" cy="21.5" r="2.5" fill="currentColor" opacity="0.62" />
      </svg>

      {showText && (
        <span
          className="font-heading font-semibold leading-none"
          style={{ letterSpacing: '0.2em', fontSize: '17px' }}
        >
          NEBULAA
        </span>
      )}
    </span>
  )
}
