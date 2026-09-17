'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Question {
  id: string
  category: string
  text: string
  options: { label: string; score: number }[]
}

const questions: Question[] = [
  // Budget (25 pts)
  {
    id: 'budget_allocated',
    category: 'Budget',
    text: 'Do they have budget allocated for this?',
    options: [
      { label: 'Yes — confirmed budget', score: 25 },
      { label: 'Maybe — exploring options', score: 15 },
      { label: 'Unknown — not discussed', score: 8 },
      { label: 'No — no budget right now', score: 0 },
    ],
  },
  // Authority (25 pts)
  {
    id: 'decision_maker',
    category: 'Authority',
    text: 'Are you talking to the decision maker?',
    options: [
      { label: 'Yes — they sign the cheques', score: 25 },
      { label: 'Partly — influencer, not final decision', score: 15 },
      { label: 'No — need to get to the right person', score: 5 },
      { label: "Unknown — haven't asked", score: 3 },
    ],
  },
  // Need (25 pts)
  {
    id: 'pain_strength',
    category: 'Need',
    text: 'How strong is their pain or need?',
    options: [
      { label: 'Very strong — actively looking for solutions', score: 25 },
      { label: 'Moderate — aware of the problem', score: 17 },
      { label: 'Mild — nice to have, not urgent', score: 8 },
      { label: "None — can't see the need yet", score: 0 },
    ],
  },
  {
    id: 'solution_fit',
    category: 'Need',
    text: "Does your solution match their problem?",
    options: [
      { label: 'Strong fit — solves their #1 problem', score: 25 },
      { label: 'Partial fit — solves part of the problem', score: 15 },
      { label: 'Weak fit — tangentially relevant', score: 5 },
      { label: 'No fit — wrong product for them', score: 0 },
    ],
  },
  // Timeline (25 pts)
  {
    id: 'timeline',
    category: 'Timeline',
    text: 'When do they need a solution?',
    options: [
      { label: 'Immediately — within 30 days', score: 25 },
      { label: 'Soon — 1–3 months', score: 18 },
      { label: 'Later — 3–6 months', score: 10 },
      { label: 'No timeline — just exploring', score: 3 },
    ],
  },
  {
    id: 'urgency',
    category: 'Timeline',
    text: 'Is there a business event driving urgency?',
    options: [
      { label: 'Yes — funding round, launch, quarter end', score: 25 },
      { label: 'Somewhat — general growth pressure', score: 15 },
      { label: 'Not really — business as usual', score: 5 },
      { label: "Unknown — haven't discussed", score: 3 },
    ],
  },
  // Bonus
  {
    id: 'competition',
    category: 'Competition',
    text: 'Are they evaluating other solutions?',
    options: [
      { label: "We're the only option they're considering", score: 15 },
      { label: 'Comparing 2–3 options including us', score: 10 },
      { label: 'We came in late, heavy competition', score: 5 },
      { label: "Unknown — haven't asked", score: 3 },
    ],
  },
  {
    id: 'relationship',
    category: 'Relationship',
    text: 'How warm is the relationship?',
    options: [
      { label: 'Referral or warm intro — they know us', score: 15 },
      { label: 'Had a good conversation, responsive', score: 10 },
      { label: 'Cold outreach, first interaction', score: 5 },
      { label: 'Ghosted or unresponsive previously', score: 0 },
    ],
  },
]

const maxScore = 160 // sum of max scores across all questions

function getLabel(score: number): { label: string; emoji: string; color: string; description: string; action: string } {
  const pct = (score / maxScore) * 100
  if (pct >= 75) return {
    label: 'Hot Lead',
    emoji: '🔥',
    color: 'text-red-500 dark:text-red-400',
    description: 'This prospect is ready to move. High intent, right person, clear budget.',
    action: 'Call or email within 24 hours. Offer a demo or proposal.',
  }
  if (pct >= 55) return {
    label: 'Warm Lead',
    emoji: '♨️',
    color: 'text-orange-500 dark:text-orange-400',
    description: 'Strong potential but needs nurturing. A few qualification gaps to close.',
    action: 'Schedule a discovery call. Address the missing qualification criteria.',
  }
  if (pct >= 35) return {
    label: 'Nurturing Lead',
    emoji: '🌱',
    color: 'text-yellow-500 dark:text-yellow-400',
    description: 'Early stage. Interested but not ready. Keep them warm.',
    action: 'Add to email sequence. Share case studies and educational content monthly.',
  }
  return {
    label: 'Cold Lead',
    emoji: '❄️',
    color: 'text-blue-400 dark:text-blue-400',
    description: 'Not the right time or fit. Park this one for now.',
    action: 'Move to long-term nurture list. Revisit in 90 days.',
  }
}

export default function LeadQualificationCalculator() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [calculated, setCalculated] = useState(false)

  const totalAnswered = Object.keys(answers).length
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0)
  const pct = Math.round((totalScore / maxScore) * 100)
  const result = getLabel(totalScore)
  const allAnswered = totalAnswered === questions.length

  const reset = () => {
    setAnswers({})
    setCalculated(false)
  }

  return (
    <div className="space-y-6">
      {/* Questions */}
      <div className="space-y-4">
        {questions.map((q, qi) => (
          <div
            key={q.id}
            className="bg-surface-2 rounded-2xl p-5 border border-rule"
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold/15 text-gold-text font-body text-xs font-bold flex items-center justify-center mt-0.5">
                {qi + 1}
              </span>
              <div>
                <p className="font-body text-[10px] font-bold uppercase tracking-widest text-muted mb-1">{q.category}</p>
                <p className="font-body text-sm font-semibold text-ink">{q.text}</p>
              </div>
            </div>
            <div className="space-y-2 pl-9">
              {q.options.map(opt => (
                <label
                  key={opt.label}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                    answers[q.id] === opt.score
                      ? 'border-gold bg-gold/10'
                      : 'border-transparent hover:bg-white dark:hover:bg-white/5 hover:border-rule'
                  }`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={opt.score}
                    checked={answers[q.id] === opt.score}
                    onChange={() => setAnswers(prev => ({ ...prev, [q.id]: opt.score }))}
                    className="accent-gold"
                  />
                  <span className="font-body text-sm text-ink">{opt.label}</span>
                  <span className="ml-auto font-body text-xs font-bold text-faint">
                    +{opt.score}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-surface-2 rounded-full h-1.5">
          <div
            className="bg-gold h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${(totalAnswered / questions.length) * 100}%` }}
          />
        </div>
        <span className="font-body text-xs text-muted">{totalAnswered}/{questions.length} answered</span>
      </div>

      {/* Calculate button */}
      <button
        onClick={() => setCalculated(true)}
        disabled={!allAnswered}
        className="w-full flex items-center justify-center gap-2 bg-gold text-[#1A1208] font-body font-semibold rounded-full px-6 py-3.5 hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01]"
      >
        Calculate Lead Score
      </button>

      {/* Results */}
      <AnimatePresence>
        {calculated && allAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-surface rounded-2xl border border-rule overflow-hidden"
          >
            <div className="p-6">
              {/* Score */}
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">{result.emoji}</div>
                <h3 className={`font-heading font-bold text-2xl mb-1 ${result.color}`}>{result.label}</h3>
                <p className="font-body text-4xl font-bold text-ink">{pct}<span className="text-lg font-normal text-muted">/100</span></p>
              </div>

              {/* Score bar */}
              <div className="mb-6">
                <div className="bg-surface-2 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className="bg-gold h-3 rounded-full"
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="font-body text-[10px] text-faint">Cold</span>
                  <span className="font-body text-[10px] text-faint">Hot</span>
                </div>
              </div>

              {/* Category breakdown */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {['Budget', 'Authority', 'Need', 'Timeline'].map(cat => {
                  const catQuestions = questions.filter(q => q.category === cat)
                  const catScore = catQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0)
                  const catMax = catQuestions.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.score)), 0)
                  const catPct = catMax > 0 ? Math.round((catScore / catMax) * 100) : 0
                  return (
                    <div key={cat} className="bg-surface-2 rounded-xl p-3">
                      <p className="font-body text-xs font-bold text-muted uppercase tracking-widest mb-2">{cat}</p>
                      <div className="bg-surface-2 rounded-full h-1.5 mb-1.5">
                        <div
                          className="bg-gold h-1.5 rounded-full"
                          style={{ width: `${catPct}%` }}
                        />
                      </div>
                      <p className="font-body text-xs font-bold text-ink">{catPct}%</p>
                    </div>
                  )
                })}
              </div>

              {/* Summary */}
              <div className="bg-surface-2 rounded-xl p-4 mb-4">
                <p className="font-body text-sm text-ink mb-2">{result.description}</p>
                <p className="font-body text-sm font-semibold text-gold-text">Next step: {result.action}</p>
              </div>

              <button
                onClick={reset}
                className="w-full font-body text-sm text-muted hover:text-ink transition-colors py-2"
              >
                Score another lead →
              </button>
            </div>

            <div className="px-5 py-3 bg-gold/5 border-t border-rule">
              <p className="font-body text-xs text-muted">
                💡 Pulsar by Nebulaa automatically qualifies your leads and routes hot ones to you in real-time.{' '}
                <a href="/pricing" className="text-gold-text hover:underline">Try it free →</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
