/**
 * Paying clients, shown as a running strip on the homepage, Our work and the
 * managed services page. Logos live in public/images/clients. Add a client by
 * adding a line here.
 */
export interface Client {
  name: string
  logo: string
  place: string
}

export const clients: Client[] = [
  { name: 'New Ganthimathi Jewellery', logo: '/images/clients/new-ganthimathi-jewellery.webp', place: 'Panruti' },
  { name: 'JKR Tex', logo: '/images/clients/jkr-tex.webp', place: 'Neyveli + 5 more branches' },
  { name: 'TNV Chit Funds', logo: '/images/clients/tnv-chit-funds.webp', place: 'Neyveli + 6 more branches' },
  { name: 'Casita Inn', logo: '/images/clients/casita-inn-yercaud.webp', place: 'Yercaud' },
  { name: 'T.R.M Santhi Agencies', logo: '/images/clients/trm-santhi.webp', place: 'Vadalur' },
  { name: 'Cuddalore Essence Mart', logo: '/images/clients/cuddalore-essence-mart.webp', place: 'Cuddalore' },
  { name: 'Neyveli Srinivasa Properties', logo: '/images/clients/neyveli-srinivasa-properties.webp', place: 'Neyveli' },
  { name: 'Skanda Enterprises', logo: '/images/clients/skanda-enterprises.webp', place: 'Chidambaram' },
  { name: 'e-Royce', logo: '/images/clients/e-royce.webp', place: 'Chidambaram' },
]
