import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import { site } from "../content"
import { SectionTitle } from "./SectionTitle"

const frames = [
  "border-orange rotate-[-1.5deg]",
  "border-pink rotate-[1.2deg]",
  "border-yellow rotate-[-0.8deg]",
  "border-orange rotate-[1.6deg]",
  "border-pink rotate-[-1.1deg]",
  "border-yellow rotate-[0.9deg]",
]

export function Gallery() {
  const scroller = useRef<HTMLDivElement>(null)

  const move = (dir: -1 | 1) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.72), behavior: "smooth" })
  }

  return (
    <section id="fotos" className="scroll-mt-24 bg-cream px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <SectionTitle kicker="Memórias" title="Alguns momentos" align="left" />
          <div className="mb-2 flex gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              className="rounded-full border border-cream-deep bg-white p-3 text-ink shadow-sm hover:bg-peach"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="rounded-full border border-cream-deep bg-white p-3 text-ink shadow-sm hover:bg-peach"
              aria-label="Próxima foto"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 pt-4"
        >
          {site.gallery.map((photo, i) => (
            <figure
              key={photo.src}
              className={`w-[78vw] shrink-0 snap-center overflow-hidden rounded-[1.6rem] border-[10px] bg-white shadow-lg sm:w-[420px] ${frames[i % frames.length]}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-72 w-full object-cover sm:h-80"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
