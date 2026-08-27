import { site } from "../content"
import { FloralRule } from "./Flowers"

export function Footer() {
  return (
    <footer className="bg-ink px-5 py-12 text-center text-cream">
      <p className="font-display text-3xl">
        {site.partnerA} <span className="text-yellow">&</span> {site.partnerB}
      </p>
      <FloralRule className="mt-4" />
      <p className="mt-4 text-sm text-cream/70">{site.dateLabel}</p>
    </footer>
  )
}
