'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ROICalculator() {
  const [investment, setInvestment] = useState('')
  const [gains, setGains] = useState('')
  const [period, setPeriod] = useState('12')
  const [showResult, setShowResult] = useState(false)

  const inv = parseFloat(investment.replace(/,/g, '')) || 0
  const gain = parseFloat(gains.replace(/,/g, '')) || 0
  const netProfit = gain - inv
  const roi = inv > 0 ? ((netProfit / inv) * 100) : 0
  const annualROI = parseFloat(period) > 0 ? (roi / parseFloat(period)) * 12 : 0
  const paybackMonths = gain > 0 ? (inv / (gain / parseFloat(period))) : 0

  const fmt = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

  const calculate = () => {
    if (inv > 0 && gain > 0) setShowResult(true)
  }

  const roiLabel = roi >= 300 ? '🔥 Exceptional' : roi >= 100 ? '✅ Strong' : roi >= 0 ? '⚠️ Positive' : '❌ Negative'

  return (
    <div className="space-y-6">
      <div className="bg-surface-2 rounded-2xl p-6 border border-rule">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-body text-sm font-semibold text-ink block mb-2">
              Total Investment (₹)
            </label>
            <input
              type="text"
              value={investment}
              onChange={e => setInvestment(e.target.value)}
              placeholder="e.g. 50000"
              className="w-full border border-rule bg-surface-2 text-ink rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-gold transition-colors placeholder:text-muted"
            />
            <p className="font-body text-xs text-faint mt-1">All costs: tools, ads, team, time</p>
          </div>
          <div>
            <label className="font-body text-sm font-semibold text-ink block mb-2">
              Total Returns / Revenue (₹)
            </label>
            <input
              type="text"
              value={gains}
              onChange={e => setGains(e.target.value)}
              placeholder="e.g. 200000"
              className="w-full border border-rule bg-surface-2 text-ink rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-gold transition-colors placeholder:text-muted"
            />
            <p className="font-body text-xs text-faint mt-1">Revenue attributable to this investment</p>
          </div>
          <div>
            <label className="font-body text-sm font-semibold text-ink block mb-2">Time period</label>
            <select
              value={period}
              onChange={e => setPeriod(e.target.value)}
              className="w-full border border-rule bg-surface-2 text-ink rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-gold transition-colors"
            >
              <option value="1">1 month</option>
              <option value="3">3 months</option>
              <option value="6">6 months</option>
              <option value="12">12 months</option>
            </select>
          </div>
        </div>
        <button
          onClick={calculate}
          disabled={!investment || !gains}
          className="mt-4 flex items-center gap-2 bg-gold text-[#1A1208] font-body font-semibold rounded-full px-6 py-3 hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
        >
          📈 Calculate ROI
        </button>
      </div>

      <AnimatePresence>
        {showResult && inv > 0 && gain > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'ROI', value: `${roi.toFixed(1)}%`, sub: roiLabel, color: roi >= 0 ? 'text-green-500' : 'text-red-400' },
                { label: 'Net Profit', value: fmt(netProfit), sub: 'gain after costs', color: netProfit >= 0 ? 'text-green-500' : 'text-red-400' },
                { label: 'Annual ROI', value: `${annualROI.toFixed(1)}%`, sub: 'annualized return', color: 'text-gold-text' },
                { label: 'Payback Period', value: `${paybackMonths.toFixed(1)} mo`, sub: 'to recover investment', color: 'text-blue-500' },
              ].map(card => (
                <div key={card.label} className="bg-surface rounded-2xl p-4 border border-rule text-center">
                  <p className={`font-heading font-bold text-2xl ${card.color}`}>{card.value}</p>
                  <p className="font-body text-xs font-semibold text-ink mt-1">{card.label}</p>
                  <p className="font-body text-xs text-muted mt-0.5">{card.sub}</p>
                </div>
              ))}
            </div>

            <div className="bg-surface rounded-2xl p-5 border border-rule">
              <p className="font-body text-sm font-semibold text-ink mb-3">Your ROI Narrative</p>
              <p className="font-body text-sm text-ink-2 leading-relaxed">
                {"\""}We invested {fmt(inv)} over {period} month{parseInt(period) > 1 ? 's' : ''} and generated {fmt(gain)} in returns —
                a {roi.toFixed(0)}% ROI and net profit of {fmt(netProfit)}.
                At this rate, we recover our investment in {paybackMonths.toFixed(1)} months,
                with an annualized return of {annualROI.toFixed(0)}%.{"\""}
              </p>
            </div>

            <div className="bg-gold/5 rounded-2xl p-4 border border-gold/20">
              <p className="font-body text-xs text-muted">
                💡 Industry benchmark: B2B marketing typically targets 3-5x ROI (300-500%). Automate your highest-ROI activities to scale returns.{' '}
                <a href="/pricing" className="text-gold-text hover:underline">Try Gravity →</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
