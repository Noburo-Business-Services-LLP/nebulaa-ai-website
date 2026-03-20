'use client'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

// Pages that manage their own layout (no global navbar/footer)
const NO_SHELL_PREFIXES = ['/admin']

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const noShell = NO_SHELL_PREFIXES.some(p => pathname.startsWith(p))

  if (noShell) return <>{children}</>

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
