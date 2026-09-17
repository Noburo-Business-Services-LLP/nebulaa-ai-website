'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CACCalculator() {
  const [marketingSpend, setMarketingSpend] = useState('')
  const [salesSpend, setSalesSpend] = useState('')
  const [newCustomers, setNewCustomers] = useState('')
  const [period, setPeriod] = useState('Monthly')
  const [showResult, setShowResult] = useState(false)

  const mkt = parseFloat(marketingSpend.replace(/,/g, '')) || 0
  const sal = parseFloat(salesSpend.replace(/,/g, '')) || 0
  const cust = parseFloat(newCustomers) || 0
  const totalSpend = mkt + sal
  const cac = cust > 0 ? totalSpend / cust : 0
  const mktCAC = cust > 0 ? mkt / cust : 0
  const salCAC = cust > 0 ? sal / cust : 0

  const fmt = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

  const cacBenchmark = () => {
    if (cac < 5000) return { label: '✅ Below average — great efficiency', color: 'text-green-500' }
    if (cac < 25000) return { label: '⚠️ Average — room for improvement', color: 'text-yellow-500' }
    return { label: '🔴 High — needs optimization', color: 'text-red-400' }
  }

  const calculate = () => {
    if (totalSpend > 0 && cust > 0) setShowResult(true)
  }

  const bench = cacBenchmark()

  return (
    <div className="space-y-6">
      <div className="bg-brand-off-white dark:bg-[#111110] rounded-2xl p-6 border border-brand-border dark:border-white/8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">Marketing Spend (₹)</label>
            <input type="text" value={marketingSpend} onChange={e => setMarketingSpend(e.target.value)} placeholder="e.g. 50000"
              className="w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30" />
            <p className="font-body text-xs text-brand-muted dark:text-white/30 mt-1">Ads, content, events, tools</p>
          </div>
          <div>
            <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">Sales Spend (₹)</label>
            <input type="text" value={salesSpend} onChange={e => setSalesSpend(e.target.value)} placeholder="e.g. 30000"
              className="w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30" />
            <p className="font-body text-xs text-brand-muted dark:text-white/30 mt-1">Sales team salary + commissions</p>
          </div>
          <div>
            <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">New Customers Acquired</label>
            <input type="number" value={newCustomers} onChange={e => setNewCustomers(e.target.value)} placeholder="e.g. 8"
              className="w-full border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-muted dark:placeholder:text-white/30" />
          </div>
          <div>
            <label className="font-body text-sm font-semibold text-brand-text dark:text-white block mb-2">Period</label>
            <select value={period} onChange={e => setPeriod(e.target.value)}
              className="w-full border border-brand-border dark:border-white/10 dark:bg-[#1A1815] dark:text-white rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-brand-gold transition-colors">
              <option>Monthly</option><option>Quarterly</option><option>Annually</option>
            </select>
          </div>
        </div>
        <button onClick={calculate} disabled={!newCustomers || totalSpend === 0}
          className="mt-4 flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-6 py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]">
          💰 Calculate CAC
        </button>
      </div>

      <AnimatePresence>
        {showResult && cac > 0 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Blended CAC', value: fmt(cac), sub: 'total cost per customer', color: 'text-brand-gold' },
                { label: 'Marketing CAC', value: fmt(mktCAC), sub: 'from marketing only', color: 'text-ink' },
                { label: 'Sales CAC', value: fmt(salCAC), sub: 'from sales only', color: 'text-ink' },
              ].map(c => (
                <div key={c.label} className="bg-white dark:bg-[#1A1815] rounded-2xl p-4 border border-brand-border dark:border-white/8 text-center">
                  <p className={`font-heading font-bold text-2xl ${c.color}`}>{c.value}</p>
                  <p className="font-body text-xs font-semibold text-brand-text dark:text-white mt-1">{c.label}</p>
                  <p className="font-body text-xs text-brand-muted dark:text-white/40 mt-0.5">{c.sub}</p>
                </div>
              ))}
            </div>
            <div className="bg-white dark:bg-[#1A1815] rounded-2xl p-5 border border-brand-border dark:border-white/8">
              <p className={`font-body text-sm font-semibold mb-2 ${bench.color}`}>{bench.label}</p>
              <div className="space-y-2 font-body text-sm text-brand-muted dark:text-white/60">
                <p>→ Total spend: {fmt(totalSpend)} {period.toLowerCase()}</p>
                <p>→ Customers acquired: {cust}</p>
                <p>→ To break even, your LTV must be &gt; {fmt(cac * 3)} (3:1 LTV:CAC ratio)</p>
              </div>
            </div>
            <div className="bg-brand-gold/5 dark:bg-brand-gold/10 rounded-2xl p-4 border border-brand-gold/20">
              <p className="font-body text-xs text-brand-muted dark:text-white/50">
                💡 Target LTV:CAC ratio of 3:1 or higher for sustainable growth. Use our Free LTV Calculator to check your ratio.{' '}
                <a href="/pricing" className="text-brand-gold hover:underline">Try Gravity →</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
