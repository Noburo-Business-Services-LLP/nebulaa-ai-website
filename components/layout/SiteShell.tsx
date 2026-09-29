'use client'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppBar from './WhatsAppBar'
import EditBar from './EditBar'

// Pages that manage their own layout (no global navbar/footer)
const NO_SHELL_PREFIXES = ['/admin']

/** Navbar and footer around every non-admin route. */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const noShell = NO_SHELL_PREFIXES.some(p => pathname.startsWith(p))

  if (noShell) return <>{children}</>

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppBar />
      <EditBar />
    </>
  )
}
