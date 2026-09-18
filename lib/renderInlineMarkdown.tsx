import type { ReactNode } from 'react'

/**
 * Inline markdown within a single line — **bold**, *italic*, `code`, and
 * [text](url) links. The blog post renderer (app/blog/[slug]/page.tsx) only
 * ever checked whether a whole line started and ended with `**`, so any bold
 * or italic mixed into a sentence or bullet — which is most of it — rendered
 * with the literal asterisks left in the text instead of styling.
 */
export function renderInlineMarkdown(text: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  const parts: ReactNode[] = []
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
    const token = match[0]

    if (token.startsWith('**')) {
      parts.push(
        <strong key={key++} className="font-semibold text-ink">
          {token.slice(2, -2)}
        </strong>,
      )
    } else if (token.startsWith('`')) {
      parts.push(
        <code key={key++} className="font-mono text-[0.9em] bg-surface-2 px-1.5 py-0.5 rounded">
          {token.slice(1, -1)}
        </code>,
      )
    } else if (token.startsWith('[')) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (linkMatch) {
        parts.push(
          <a key={key++} href={linkMatch[2]} className="text-gold-text underline underline-offset-2">
            {linkMatch[1]}
          </a>,
        )
      } else {
        parts.push(token)
      }
    } else {
      parts.push(<em key={key++}>{token.slice(1, -1)}</em>)
    }

    lastIndex = match.index + token.length
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts
}
