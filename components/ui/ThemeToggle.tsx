'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-full flex items-center justify-center border border-brand-border dark:border-white/10 hover:border-brand-gold dark:hover:border-brand-gold transition-all bg-white dark:bg-white/5"
    >
      {theme === 'dark'
        ? <Sun size={15} className="text-brand-gold" />
        : <Moon size={15} className="text-brand-muted dark:text-brand-muted-2" />
      }
    </motion.button>
  )
}
