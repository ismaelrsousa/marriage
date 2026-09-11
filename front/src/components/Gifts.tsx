import { useState } from "react"
import { Check, CircleHelp, Copy, ExternalLink, Gift } from "lucide-react"
import { site } from "../content"
import { GiftHowToDialog, type GiftHowToTab } from "./GiftHowToDialog"
import { Blossom } from "./Flowers"

export function Gifts() {
  const [copied, setCopied] = useState(false)
  const [howTo, setHowTo] = useState<GiftHowToTab | null>(null)

  const copyPix = () => {
    const code = site.gifts.pix.copyPaste
    void navigator.clipboard?.writeText(code).catch(() => {
      const field = document.createElement("textarea")
      field.value = code
      field.setAttribute("readonly", "")
      field.style.position = "fixed"
      field.style.left = "-9999px"
      document.body.appendChild(field)
      field.select()
      document.execCommand("copy")
      document.body.removeChild(field)
    })
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section id="presentes" className="scroll-mt-24 px-5 py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-stretch gap-6 lg:flex-row">
        <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-orange via-pink to-yellow p-10 text-center text-cream shadow-lg sm:p-16">
          <Blossom className="absolute -left-4 -top-4 h-20 w-20 opacity-40" tone="yellow" />
          <Blossom className="absolute -bottom-6 -right-2 h-24 w-24 opacity-40" tone="orange" />
          <Gift className="mx-auto mb-4" />
          <p className="text-xs uppercase tracking-[0.28em]">Lista de presentes</p>
          <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
            Um presente, se quiserem
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/90">
            A presença de vocês já é o que mais importa. Se tiverem vontade de nos
            presentear, montamos uma lista com o que faz sentido para a casa nova.
          </p>
          <div
            rel="noreferrer"
            onClick={() => setHowTo("lista")}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 font-medium text-ink hover:bg-white cursor-pointer"
          >
            {site.gifts.label}
            <ExternalLink size={16} />
          </div>
          <button
            type="button"
            onClick={() => setHowTo("lista")}
            className="mt-5 inline-flex items-center gap-2 text-sm text-cream/90 hover:text-white cursor-pointer"
          >
            <CircleHelp size={16} />
            Como comprar na lista
          </button>
        </div>

        <div className="flex items-center gap-4 lg:flex-col lg:px-1">
          <div className="h-px flex-1 bg-cream-deep lg:h-auto lg:w-0.5" />
          <p className="font-display text-lg text-muted">ou</p>
          <div className="h-px flex-1 bg-cream-deep lg:h-auto lg:w-0.5" />
        </div>

        <div className="relative mx-auto flex w-full flex-1 flex-col items-center overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-pink via-orange to-pink p-10 text-center text-cream shadow-lg sm:p-12">
          <Blossom className="absolute -left-4 -top-4 h-20 w-20 opacity-40" tone="orange" />
          <Blossom className="absolute -bottom-6 -right-2 h-24 w-24 opacity-40" tone="orange" />
          <Gift className="mx-auto mb-4" />
          <p className="text-xs uppercase tracking-[0.28em]">Presenteie com</p>
          <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Pix</h2>
          <p className="mx-auto mt-3 max-w-sm text-cream/90">
            Escaneie o QR Code ou copie o código e cole no app do banco.
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl bg-cream p-3">
            <img
              src={site.gifts.pix.qrCode}
              alt="QR Code Pix para presentear Nayara e Ismael"
              className="h-auto w-52"
            />
          </div>

          <div className="relative z-10 mt-4 w-full max-w-sm rounded-2xl bg-cream p-4 text-left text-ink">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Pix copia e cola</p>
            <p className="mt-3 max-h-24 overflow-y-auto break-all font-mono text-xs leading-relaxed text-ink/80">
              {site.gifts.pix.copyPaste}
            </p>
            <button
              type="button"
              onClick={copyPix}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange py-3 font-medium text-cream hover:bg-orange-deep"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Código copiado" : "Copiar código"}
            </button>
          </div>
        </div>
      </div>

      {howTo ? (
        <GiftHowToDialog
          tab={howTo}
          onClose={() => setHowTo(null)}
        />
      ) : null}
    </section>
  )
}
