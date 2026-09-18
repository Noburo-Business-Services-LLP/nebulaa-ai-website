import Image from 'next/image'

/**
 * The official Nebulaa lockup — icon, wordmark and "Founder OS" tagline
 * baked into one horizontal image, supplied in two colourways. The site is
 * dark-mode-only today (see the `dark` class hardcoded on <html> in
 * app/layout.tsx), so only the yellow version ever renders in practice —
 * the light-mode swap via `dark:` is wired in ready for whenever a theme
 * toggle exists, not dead code.
 */
export default function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src="/images/brand/logo-horizontal-light.png"
        alt="Nebulaa — Founder OS"
        width={420}
        height={126}
        className="block dark:hidden h-7 w-auto"
        priority
      />
      <Image
        src="/images/brand/logo-horizontal-dark.png"
        alt="Nebulaa — Founder OS"
        width={420}
        height={126}
        className="hidden dark:block h-7 w-auto"
        priority
      />
    </span>
  )
}
