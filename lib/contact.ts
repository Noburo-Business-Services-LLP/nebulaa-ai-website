/**
 * The one place the WhatsApp number lives. Every "WhatsApp us" button on the
 * site goes through waLink(), so changing the number, or the message a page
 * pre-types for the visitor, never means hunting through components.
 */
export const WHATSAPP_NUMBER = '919384801049'
export const WHATSAPP_DISPLAY = '+91 93848 01049'

export const DEFAULT_WA_MESSAGE = "Hi, I'd like to know more about Nebulaa."

export function waLink(message: string = DEFAULT_WA_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
