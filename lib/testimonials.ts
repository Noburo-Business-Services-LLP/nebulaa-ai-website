/**
 * Real owners only go in `testimonials`. Add an entry only when the person said
 * it and gave permission to use their name, business and town.
 *
 * `sampleTestimonials` exist so the layout can be reviewed. The names and
 * quotes are made up, every card is tagged "Sample", and they are hidden on
 * the live site. Do not present them as real customers.
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
  sample?: boolean
}

export const testimonials: Testimonial[] = []

export const sampleTestimonials: Testimonial[] = [
  {
    name: 'Karthikeyan R.',
    business: 'Hotel owner',
    town: 'Pondicherry',
    quote: 'Our page used to go quiet for weeks. Now it posts every day, and guests message us on WhatsApp before I have finished my morning coffee.',
    result: 'More WhatsApp enquiries',
    sample: true,
  },
  {
    name: 'Lakshmi Priya S.',
    business: 'Silk saree showroom',
    town: 'Kanchipuram',
    quote: 'I do not have time to think about posts. The team plans the month and I just approve on my phone. Customers now say they saw us on Instagram.',
    result: 'Steady weekly posting',
    sample: true,
  },
  {
    name: 'Murugan P.',
    business: 'Jewellery shop',
    town: 'Coimbatore',
    quote: 'Enquiries used to sit unanswered till evening. Now they get a reply in minutes, and I only speak to the people who are ready to visit.',
    result: 'Faster replies',
    sample: true,
  },
]
