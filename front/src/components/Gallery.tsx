import { site, asset } from "../content"
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
  return (
    <section id="fotos" className="scroll-mt-24 bg-cream px-5 py-24 relative">
      
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-[min(22rem,92vw)] -translate-x-1/2 opacity-30"
            style={{
              backgroundImage: `url("${asset("images/caminho-seamless.png")}")`,
              backgroundRepeat: "repeat-y",
              backgroundPosition: "center top",
              backgroundSize: "100% auto",
            }}
          />
      <div className="mx-auto max-w-6xl">
        <SectionTitle kicker="Memórias" title="Alguns momentos" align="left" />

        <div className="relative mt-12">

          <div className="relative z-10 flex flex-col gap-14 pb-6 pt-4">
            {site.gallery.map((photo, i) => (
              <figure
                key={photo.src}
                className={`w-[78vw] max-w-[420px] overflow-hidden rounded-[1.6rem] border-[10px] bg-white shadow-lg ${frames[i % frames.length]} ${i % 2 === 0 ? "ml-auto" : ""}`}
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
      </div>
    </section>
  )
}
