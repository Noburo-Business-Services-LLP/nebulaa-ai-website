'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LTVCalculator() {
  const [avgRevenue, setAvgRevenue] = useState('')
  const [purchaseFreq, setPurchaseFreq] = useState('')
  const [avgLifespan, setAvgLifespan] = useState('')
  const [cac, setCAC] = useState('')
  const [showResult, setShowResult] = useState(false)

  const rev = parseFloat(avgRevenue.replace(/,/g, '')) || 0
  const freq = parseFloat(purchaseFreq) || 0
  const life = parseFloat(avgLifespan) || 0
  const cacVal = parseFloat(cac.replace(/,/g, '')) || 0

  const ltv = rev * freq * life
  const ltvCacRatio = cacVal > 0 ? ltv / cacVal : 0
  const annualRevPerCustomer = rev * freq

  const fmt = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

  const ratioHealth = () => {
    if (ltvCacRatio >= 5) return { label: '🔥 Excellent — highly profitable', color: 'text-green-500' }
    if (ltvCacRatio >= 3) return { label: '✅ Healthy — sustainable growth', color: 'text-green-500' }
    if (ltvCacRatio >= 1) return { label: '⚠️ Low — improve retention or reduce CAC', color: 'text-yellow-500' }
    return { label: '❌ Unsustainable — major optimization needed', color: 'text-red-400' }
  }

  const calculate = () => {
    if (rev > 0 && freq > 0 && life > 0) setShowResult(true)
  }

  const health = ratioHealth()

  return (
    <div className="space-y-6">
      <div className="bg-surface-2 rounded-2xl p-6 border border-rule">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-body text-sm font-semibold text-ink block mb-2">Avg Revenue per Purchase (₹)</label>
            <input type="text" value={avgRevenue} onChange={e => setAvgRevenue(e.target.value)} placeholder="e.g. 5000"
              className="w-full border border-rule bg-surface-2 text-ink rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-gold transition-colors placeholder:text-muted" />
            <p className="font-body text-xs text-faint mt-1">Average order / subscription value</p>
          </div>
          <div>
            <label className="font-body text-sm font-semibold text-ink block mb-2">Purchase Frequency (per year)</label>
            <input type="number" value={purchaseFreq} onChange={e => setPurchaseFreq(e.target.value)} placeholder="e.g. 12 (monthly)"
              className="w-full border border-rule bg-surface-2 text-ink rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-gold transition-colors placeholder:text-muted" />
            <p className="font-body text-xs text-faint mt-1">How many times/year do they buy?</p>
          </div>
          <div>
            <label className="font-body text-sm font-semibold text-ink block mb-2">Avg Customer Lifespan (years)</label>
            <input type="number" value={avgLifespan} onChange={e => setAvgLifespan(e.target.value)} placeholder="e.g. 2"
              className="w-full border border-rule bg-surface-2 text-ink rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-gold transition-colors placeholder:text-muted" />
            <p className="font-body text-xs text-faint mt-1">How long do customers stay on average?</p>
          </div>
          <div>
            <label className="font-body text-sm font-semibold text-ink block mb-2">Your CAC (₹) — optional</label>
            <input type="text" value={cac} onChange={e => setCAC(e.target.value)} placeholder="e.g. 8000"
              className="w-full border border-rule bg-surface-2 text-ink rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-gold transition-colors placeholder:text-muted" />
            <p className="font-body text-xs text-faint mt-1">Use our CAC calculator if unsure</p>
          </div>
        </div>
        <button onClick={calculate} disabled={!avgRevenue || !purchaseFreq || !avgLifespan}
          className="mt-4 flex items-center gap-2 bg-gold text-[#1A1208] font-body font-semibold rounded-full px-6 py-3 hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]">
          ♾️ Calculate LTV
        </button>
      </div>

      <AnimatePresence>
        {showResult && ltv > 0 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Customer LTV', value: fmt(ltv), sub: 'total lifetime value', color: 'text-gold-text' },
                { label: 'Annual Revenue/Customer', value: fmt(annualRevPerCustomer), sub: 'per year', color: 'text-blue-500' },
                ...(cacVal > 0 ? [{ label: 'LTV:CAC Ratio', value: `${ltvCacRatio.toFixed(1)}:1`, sub: health.label.split(' — ')[0], color: health.color }] : []),
              ].map(c => (
                <div key={c.label} className="bg-surface rounded-2xl p-4 border border-rule text-center">
                  <p className={`font-heading font-bold text-2xl ${c.color}`}>{c.value}</p>
                  <p className="font-body text-xs font-semibold text-ink mt-1">{c.label}</p>
                  <p className="font-body text-xs text-muted mt-0.5">{c.sub}</p>
                </div>
              ))}
            </div>
            {cacVal > 0 && (
              <div className="bg-surface rounded-2xl p-5 border border-rule">
                <p className={`font-body text-sm font-semibold mb-3 ${health.color}`}>{health.label}</p>
                <div className="space-y-1.5 font-body text-sm text-ink-2">
                  <p>→ You spend {fmt(cacVal)} to acquire a customer worth {fmt(ltv)}</p>
                  <p>→ For every ₹1 spent on acquisition, you get ₹{ltvCacRatio.toFixed(1)} back</p>
                  <p>→ Target: {fmt(cacVal * 3)} LTV minimum for sustainable growth (3:1 ratio)</p>
                </div>
              </div>
            )}
            <div className="bg-gold/5 rounded-2xl p-4 border border-gold/20">
              <p className="font-body text-xs text-muted">
                💡 Increasing retention by just 5% can increase LTV by 25-95%. Focus on keeping customers longer, not just acquiring new ones.{' '}
                <a href="/pricing" className="text-gold-text hover:underline">Try Gravity →</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
