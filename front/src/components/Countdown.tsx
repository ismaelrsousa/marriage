import { site } from "../content"
import { useCountdown } from "../hooks/useCountdown"
import { SectionTitle } from "./SectionTitle"

const cards = [
  { key: "days", label: "dias", tone: "bg-orange text-cream rotate-[-2deg]" },
  { key: "hours", label: "horas", tone: "bg-pink text-cream rotate-[1.5deg]" },
  { key: "minutes", label: "minutos", tone: "bg-yellow text-ink rotate-[-1deg]" },
  { key: "seconds", label: "segundos", tone: "bg-peach text-ink rotate-[2deg]" },
] as const

export function Countdown() {
  const parts = useCountdown(site.date)

  return (
    <section id="contagem" className="relative scroll-mt-24 bg-cream px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionTitle kicker="O grande dia" title="Quanto falta" />

        {parts.done ? (
          <p className="mt-10 text-center font-display text-3xl text-pink">
            É hoje — ou já foi. Obrigado por celebrar com a gente.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {cards.map((card) => {
              const value = parts[card.key]
              return (
                <article
                  key={card.key}
                  className={`rounded-[2rem] px-4 py-8 text-center shadow-[0_16px_40px_-24px_rgba(61,36,24,0.45)] ${card.tone}`}
                >
                  <p className="font-display text-5xl font-semibold tabular-nums sm:text-6xl">
                    {String(value).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-[0.2em] opacity-90">
                    {card.label}
                  </p>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
