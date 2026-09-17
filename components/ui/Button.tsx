'use client'

import Link from 'next/link'
import type { ReactNode, ButtonHTMLAttributes } from 'react'
import { soundEngine } from '@/lib/soundEngine'

/**
 * The one button on this site.
 *
 * Before this there were ~100 distinct CTA class strings in two dialects —
 * marketing pages used the semantic gold token with brightness-105, tool
 * components used the legacy brand-gold literal with a separate dim shade —
 * so the same action looked different depending on which page you were on.
 * Variants and sizes are fixed here so a call site chooses meaning, not
 * styling.
 *
 * Sound is built in rather than remembered per call site: the HUD tick was
 * on about 9% of clickable elements, which read as broken rather than as
 * restraint. Pass `silent` for buttons inside an already-noisy interaction.
 */

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const VARIANT: Record<Variant, string> = {
  // Amber as energy: the one action the page wants.
  primary:
    'bg-gold text-[#1A1208] font-semibold shadow-[0_4px_20px_rgba(245,166,35,0.22)] hover:brightness-110 active:scale-[0.98]',
  // The considered alternative — present, not competing.
  secondary:
    'border border-rule-2 text-ink-2 font-medium hover:border-gold hover:text-gold-text',
  // Tertiary, for dense interfaces where a filled button would shout.
  ghost: 'text-ink-2 font-medium hover:text-gold-text',
}

const SIZE: Record<Size, string> = {
  sm: 'text-[13.5px] px-[18px] py-[9px] gap-1.5',
  md: 'text-[14.5px] px-[26px] py-[13px] gap-2',
  lg: 'text-[15px] px-[30px] py-[15px] gap-2',
}

const BASE =
  'inline-flex items-center justify-center rounded-full transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ground'

interface CommonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  /** Skip the HUD tick — for buttons inside an interaction that already makes noise. */
  silent?: boolean
  /** Fills the width of its container, for stacked mobile CTAs. */
  block?: boolean
}

function classes({ variant = 'primary', size = 'md', block, className = '' }: CommonProps) {
  return `${BASE} ${VARIANT[variant]} ${SIZE[size]} ${block ? 'w-full' : ''} ${className}`
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined
  }

type LinkProps = CommonProps & {
  href: string
  onClick?: () => void
  /** Set for mailto:, tel: and anything off-site — Link would swallow these. */
  external?: boolean
  download?: boolean
  target?: string
  rel?: string
}

/** Styling props are consumed here and must never reach the DOM. */
const STYLE_PROPS = ['variant', 'size', 'className', 'block', 'silent', 'children', 'external'] as const

function domProps(props: Record<string, unknown>) {
  const out: Record<string, unknown> = {}
  for (const key of Object.keys(props)) {
    if (!(STYLE_PROPS as readonly string[]).includes(key)) out[key] = props[key]
  }
  return out
}

export default function Button(props: ButtonProps | LinkProps) {
  const { children, silent } = props
  const cls = classes(props)
  const rest = domProps(props as unknown as Record<string, unknown>)

  const play = () => {
    if (!silent) soundEngine.playClick()
  }

  if ('href' in props && props.href !== undefined) {
    const { href, onClick, external, download } = props as LinkProps
    delete rest.onClick
    delete rest.href

    const handle = () => {
      play()
      onClick?.()
    }

    // mailto:, tel:, downloads and absolute URLs must stay plain anchors —
    // next/link would intercept the navigation.
    const isPlainAnchor = external || download || /^(mailto:|tel:|https?:\/\/)/.test(href)

    if (isPlainAnchor) {
      return (
        <a href={href} className={cls} onClick={handle} {...rest}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={cls} onClick={handle} {...rest}>
        {children}
      </Link>
    )
  }

  const { onClick } = props as ButtonProps
  delete rest.onClick

  return (
    <button
      className={cls}
      onClick={e => {
        play()
        onClick?.(e)
      }}
      onMouseEnter={silent ? undefined : () => soundEngine.playHudHover()}
      {...rest}
    >
      {children}
    </button>
  )
}
