import { site } from "../content"
import { CornerBloom } from "./Flowers"
import { SectionTitle } from "./SectionTitle"

export function About() {
  return (
    <section id="casal" className="relative scroll-mt-24 overflow-hidden bg-peach/50 px-5 py-24">
      <CornerBloom className="absolute -right-16 -top-10 w-64 opacity-50" />
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-[2.5rem] bg-yellow/70" />
          <img
            src={site.about.photo}
            alt={`${site.partnerA} e ${site.partnerB}`}
            className="relative z-10 w-full rounded-[2.5rem] object-cover shadow-xl"
            loading="lazy"
          />
          <CornerBloom className="absolute -bottom-8 -left-8 z-20 w-40" />
        </div>
        <div>
          <SectionTitle kicker="Nós dois" title="O casal" align="left" />
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted"  dangerouslySetInnerHTML={
                { __html: site.about.text }
             }>
          </p>
        </div>
      </div>
    </section>
  )
}
