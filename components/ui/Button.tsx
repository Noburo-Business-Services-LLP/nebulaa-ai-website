'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

export default function Button({ children, variant = 'primary', size = 'md', onClick, className = '', type = 'button', fullWidth = false }: ButtonProps) {
  const sizeClasses = { sm: 'px-5 py-2 text-sm', md: 'px-7 py-3.5 text-sm', lg: 'px-10 py-4 text-base' }
  const base = `inline-flex items-center justify-center gap-2 font-body font-semibold rounded-full cursor-pointer transition-all duration-200 ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`

  if (variant === 'primary') {
    return (
      <motion.button type={type} onClick={onClick} className={`${base} bg-brand-gold text-brand-black hover:bg-brand-gold-dim animate-pulse-gold`} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        {children}
      </motion.button>
    )
  }
  return (
    <motion.button type={type} onClick={onClick} className={`${base} border border-brand-border text-brand-muted hover:border-brand-gold hover:text-brand-text`} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      {children}
    </motion.button>
  )
}
