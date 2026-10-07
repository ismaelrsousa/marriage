import { site } from "../content"
import { SectionTitle } from "./SectionTitle"

export function Ceremony() {
  return (
    <section id="cerimonia" className="scroll-mt-24 bg-pink/10 px-5 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionTitle kicker="De onde você estiver" title="Assista à cerimônia" />

        <div className="mt-10 overflow-hidden rounded-[2rem] bg-ink shadow-lg">
          <iframe
            className="aspect-video w-full"
            src={`https://www.youtube.com/embed/${site.ceremony.youtubeId}`}
            title="Cerimônia de Nayara e Ismael ao vivo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <p className="mt-5 text-center text-sm text-muted">
          <a
            href={site.ceremony.url}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-pink/60 underline-offset-4 hover:text-ink"
          >
            Abrir a live no YouTube
          </a>
        </p>
      </div>
    </section>
  )
}
