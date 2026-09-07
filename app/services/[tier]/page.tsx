import { redirect } from 'next/navigation'

export function generateStaticParams() {
  return [{ tier: 'enterprise' }, { tier: 'msme' }]
}

export default function LegacyServiceTierRedirect() {
  redirect('/services')
}
