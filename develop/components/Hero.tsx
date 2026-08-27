import { site } from "../content"
import { CornerBloom } from "./Flowers"
import { Petals } from "./Petals"

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-svh overflow-hidden">
      <img
        src={site.heroPhoto}
        alt={`${site.partnerA} e ${site.partnerB}`}
        className="absolute inset-0 h-full w-full object-cover object-[center_22%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-ink/10 to-cream" />
      <Petals />
      <CornerBloom className="absolute -left-10 -top-6 w-52 opacity-80 sm:w-72" />
      <CornerBloom className="absolute -right-8 top-16 w-44 rotate-90 opacity-70 sm:w-60" />

      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-end px-5 pb-28 pt-28 sm:pb-32">
        <p className="rise text-sm font-medium uppercase tracking-[0.35em] text-cream">
          Vamos casar
        </p>
        <h1 className="rise font-display mt-3 max-w-3xl text-6xl font-semibold leading-[0.95] text-cream sm:text-8xl">
          {site.partnerA}
          <span className="block italic text-[#67152c]">
            & {site.partnerB}
          </span>
        </h1>
        <p className="rise mt-6 inline-flex w-fit items-center gap-3 rounded-full bg-cream/90 px-5 py-2 font-display text-lg text-ink shadow-sm">
          <span className="h-2 w-2 rounded-full bg-pink" />
          {site.dateLabel}
          <span className="text-muted">·</span>
          {site.ceremonyTime}
        </p>
      </div>

      <p
        className="pointer-events-none absolute right-4 top-1/3 hidden font-display text-sm tracking-[0.4em] text-cream/90 sm:block"
        style={{ writingMode: "vertical-rl" }}
      >
        {site.dateShort}
      </p>

      <svg
        className="absolute bottom-0 left-0 w-full text-cream"
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0 70C180 110 360 20 540 48C720 76 900 120 1080 78C1260 36 1350 20 1440 40V110H0Z"
        />
      </svg>
    </section>
  )
}
