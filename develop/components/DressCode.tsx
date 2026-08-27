import { Ban, Check } from "lucide-react"
import { SectionTitle } from "./SectionTitle"

export function DressCode() {
  return (
    <section id="traje" className="scroll-mt-24 bg-cream px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle kicker="O que vestir" title="Dress code social" />
        <p className="mx-auto mt-6 max-w-2xl text-center text-muted">
          O clima é de festa social: terno para os homens, vestido longo para as
          mulheres. Cheguem confortáveis, mas com a elegância do dia.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <LookCard
            src="/images/dress-terno.png"
            title="Homens"
            caption="Terno completo, sapato social. Gravata é bem-vinda, não obrigatória."
          />
          <LookCard
            src="/images/dress-vestido.png"
            title="Mulheres"
            caption="Vestido longo. Tons claros, florais e as cores da festa combinam."
          />
        </div>
      </div>
    </section>
  )
}

function LookCard({
  src,
  title,
  caption,
}: {
  src: string
  title: string
  caption: string
}) {
  return (
    <article className="overflow-hidden rounded-[2rem] bg-peach/60">
      <img src={src} alt={title} className="h-[420px] w-full object-cover object-top" loading="lazy" />
      <div className="p-6">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-orange">
          <Check size={16} />
          Pode — e combina
        </p>
        <h3 className="mt-2 font-display text-2xl">{title}</h3>
        <p className="mt-2 text-muted">{caption}</p>
      </div>
    </article>
  )
}
