import { Check } from "lucide-react"
import { SectionTitle } from "./SectionTitle"
import { FlowerSVG } from "./Icons"

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
            src={`${import.meta.env.BASE_URL}images/dress-terno.png`}
            title="Homens"
            caption="Terno completo, sapato social. Gravata é bem-vinda, não obrigatória."
          />
          <LookCard
            src={`${import.meta.env.BASE_URL}images/dress-vestido.png`}
            title="Mulheres"
            caption="Vestido longo. Tons claros, florais e as cores da festa combinam."
          />
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-muted">
          Caso queira entrar nas cores do tema da festa, pode optar por usar uma das cores a seguir:
        </p>

        <div className="flex gap-5 mt-12 justify-center">
          <div className="flex min-w-25 flex-col items-center">
            <FlowerSVG fill="#F75004" />
            <p className="font-medium text-lg mt-2">Tangerine</p>
          </div>

          <div className="flex min-w-25 flex-col items-center">
            <FlowerSVG fill="#FA8457" />
            <p className="font-medium text-lg mt-2">Apricot</p>
          </div>

          <div className="flex min-w-25 flex-col items-center">
            <FlowerSVG fill="#FB7FA0" />
            <p className="font-medium text-lg mt-2">Blush</p>
          </div>

          <div className="flex min-w-25 flex-col items-center">
            <FlowerSVG fill="#F40E5E" />
            <p className="font-medium text-lg mt-2">Strawberry</p>
          </div>

          <div className="flex min-w-25 flex-col items-center">
            <FlowerSVG fill="#F9BB50" />
            <p className="font-medium text-lg mt-2">Lemonade</p>
          </div>
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
