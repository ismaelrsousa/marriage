import { ExternalLink, Gift } from "lucide-react"
import { site } from "../content"
import { Blossom } from "./Flowers"

export function Gifts() {
  return (
    <section id="presentes" className="scroll-mt-24 px-5 py-24">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-orange via-pink to-yellow p-10 text-center text-cream shadow-lg sm:p-16">
        <Blossom className="absolute -left-4 -top-4 h-20 w-20 opacity-40" tone="yellow" />
        <Blossom className="absolute -bottom-6 -right-2 h-24 w-24 opacity-40" tone="orange" />
        <Gift className="mx-auto mb-4" />
        <p className="text-xs uppercase tracking-[0.28em]">Lista de presentes</p>
        <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
          Um presente, se quiserem
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/90">
          A presença de vocês já é o que mais importa. Se tiverem vontade de nos
          presentear, montamos uma lista com o que faz sentido para a casa nova.
        </p>
        <a
          href={site.gifts.url}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 font-medium text-ink hover:bg-white"
        >
          {site.gifts.label}
          <ExternalLink size={16} />
        </a>
      </div>
    </section>
  )
}
