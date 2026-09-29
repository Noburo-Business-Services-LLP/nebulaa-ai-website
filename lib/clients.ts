/**
 * Paying clients, shown as a running strip on the homepage and Our work.
 * Logos live in public/images/clients. Add a client by adding a line here.
 */
export interface Client {
  name: string
  logo: string
  place?: string
}

export const clients: Client[] = [
  { name: 'New Ganthimathi Jewellery', logo: '/images/clients/new-ganthimathi-jewellery.webp', place: 'Panruti' },
  { name: 'JKR Tex', logo: '/images/clients/jkr-tex.webp' },
  { name: 'TNV Chit Funds', logo: '/images/clients/tnv-chit-funds.webp' },
  { name: 'Casita Inn', logo: '/images/clients/casita-inn-yercaud.webp', place: 'Yercaud' },
  { name: 'T.R.M Santhi', logo: '/images/clients/trm-santhi.webp' },
  { name: 'Cuddalore Essence Mart', logo: '/images/clients/cuddalore-essence-mart.webp', place: 'Cuddalore' },
  { name: 'Neyveli Srinivasa Properties', logo: '/images/clients/neyveli-srinivasa-properties.webp', place: 'Neyveli' },
  { name: 'Skanda Enterprises', logo: '/images/clients/skanda-enterprises.webp' },
  { name: 'e-Royce', logo: '/images/clients/e-royce.webp' },
]
