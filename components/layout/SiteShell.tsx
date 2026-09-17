'use client'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import SiteBackground from '@/components/ui/SiteBackground'

// Pages that manage their own layout (no global navbar/footer)
const NO_SHELL_PREFIXES = ['/admin']

/**
 * The particle/grid environment is rendered once, here, so every route sits
 * inside the same "operating system" backdrop rather than the homepage
 * having one and every other page falling back to flat black.
 */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const noShell = NO_SHELL_PREFIXES.some(p => pathname.startsWith(p))

  if (noShell) return <>{children}</>

  return (
    <>
      <SiteBackground />
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
