import { MapPin } from "lucide-react"
import { site } from "../content"
import { SectionTitle } from "./SectionTitle"

export function Venue() {
  const { venue } = site

  return (
    <section id="local" className="scroll-mt-24 bg-yellow/20 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle kicker="Cerimônia e festa" title="Onde vai ser" />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="relative overflow-hidden rounded-[2rem] bg-cream p-8 shadow-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-orange">O endereço</p>
            <h3 className="mt-3 font-display text-3xl text-ink">{venue.name}</h3>
            <p className="mt-4 flex items-start gap-2 text-muted">
              <MapPin className="mt-0.5 shrink-0 text-pink" size={18} />
              <span>
                {venue.address}
                <br />
                {venue.city}
              </span>
            </p>
            <p className="mt-5 leading-relaxed text-muted">{venue.notes}</p>
            <a
              href="https://maps.app.goo.gl/P5zV9e2UvqZksN5t9"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full bg-orange px-5 py-2.5 text-sm font-medium text-cream hover:bg-orange-deep"
            >
              Abrir no Google Maps
            </a>
          </article>

          <div className="overflow-hidden rounded-[2rem] border-4 border-cream shadow-md">
            <iframe
              title="Mapa do local da festa"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29114.035114818245!2d-46.832652254394546!3d-24.197868571529494!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d02ab447dabaa3%3A0x4c9ebcb5b4e0f02d!2sR.%20Rio%20de%20Janeiro%2C%20627%20-%20Balneario%20Gaivotas%2C%20Itanha%C3%A9m%20-%20SP%2C%2011740-000%2C%20Brasil!5e0!3m2!1spt-BR!2sus!4v1787840559473!5m2!1spt-BR!2sus"
              className="h-[340px] w-full lg:h-full min-h-[340px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          {venue.photos.map((photo) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              className="h-100 w-full rounded-[1.6rem] object-cover object-bottom shadow-sm"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
