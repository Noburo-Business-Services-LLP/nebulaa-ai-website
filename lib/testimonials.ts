/**
 * Real owners only. Do not add an entry unless the person said it and gave
 * permission to use their name, business and town. While this list is empty
 * the homepage section stays hidden rather than showing invented quotes.
 */
export interface Testimonial {
  name: string
  business: string
  town: string
  quote: string
  /** A short real result, e.g. "6 WhatsApp enquiries overnight". */
  result?: string
  /** Path or URL of a real photo of the person. */
  photo?: string
}

export const testimonials: Testimonial[] = []
