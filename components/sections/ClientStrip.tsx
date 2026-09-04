import SectionLabel from '@/components/ui/SectionLabel'

const clients = [
  { name: 'Gandhimathi Jewellers', inProgress: false },
  { name: 'JKR Tex', inProgress: false },
  { name: 'TNV Chits', inProgress: false },
  { name: 'Bosch', inProgress: true },
  { name: "Rajaram's", inProgress: true },
]

export default function ClientStrip() {
  return (
    <div className="border-y border-white/[0.06] py-12 px-6 md:px-12 lg:px-[120px] flex items-center gap-11 flex-wrap">
      <SectionLabel tone="muted" className="flex-shrink-0">
        Working with
      </SectionLabel>
      <div className="flex items-center gap-9 flex-wrap">
        {clients.map((client) => (
          <span
            key={client.name}
            className={`font-heading text-xl ${client.inProgress ? 'text-white/30' : 'text-white/[0.62]'}`}
          >
            {client.name}
            {client.inProgress && (
              <span className="font-body text-[11px] tracking-[0.08em] uppercase"> · in progress</span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
