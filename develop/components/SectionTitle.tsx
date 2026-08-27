import { FloralRule } from "./Flowers"

type Props = {
  kicker: string
  title: string
  align?: "left" | "center"
}

export function SectionTitle({ kicker, title, align = "center" }: Props) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-orange">
        {kicker}
      </p>
      <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {title}
      </h2>
      <FloralRule className={align === "center" ? "mt-4" : "mt-4 justify-start"} />
    </div>
  )
}
