import Image from 'next/image'

/**
 * The Nebulaa logo: navy wordmark with the warm sun behind it. One transparent
 * file that sits on the cream page, in the menu and in the footer.
 */
export default function Wordmark({ className = '', size = 'md' }: { className?: string; size?: 'md' | 'lg' }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src="/images/brand/logo-nebulaa.png"
        alt="Nebulaa"
        width={784}
        height={360}
        className={`block w-auto ${size === 'lg' ? 'h-[72px]' : 'h-[52px]'}`}
        priority
      />
    </span>
  )
}
