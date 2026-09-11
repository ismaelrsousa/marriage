import { useEffect } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import pix1 from "../assets/howto/pix-1.svg?url"
import pix2 from "../assets/howto/pix-2.svg?url"
import pix3 from "../assets/howto/pix-3.svg?url"
import pix4 from "../assets/howto/pix-4.svg?url"
import lista1 from "../assets/howto/lista-1.png"
import lista2 from "../assets/howto/lista-2.png"
import lista3 from "../assets/howto/lista-3.png"
import lista4 from "../assets/howto/lista-4.png"
import lista5 from "../assets/howto/lista-4.svg"
import { site } from "../content"

export type GiftHowToTab = "pix" | "lista"

type Step = {
  title: string
  text: string
  image: string
}

const pixSteps: Step[] = [
  {
    title: "Abra o app do banco",
    text: "Entre no aplicativo do seu banco ou carteira digital, com o celular em mãos.",
    image: pix1,
  },
  {
    title: "Escolha Pix e toque em Pagar",
    text: "Na área Pix, selecione Pagar. Dá para seguir com QR Code ou com o código copia e cola.",
    image: pix2,
  },
  {
    title: "Escaneie ou cole o código",
    text: "Aponte a câmera para o QR Code desta página, ou copie o código e cole no campo Pix copia e cola.",
    image: pix3,
  },
  {
    title: "Confirme o pagamento",
    text: `Confira se o destino é ${site.gifts.pix.recipient}, escolha o valor que quiser e confirme. Qualquer quantia é um carinho.`,
    image: pix4,
  },
]

const listaSteps: Step[] = [
  {
    title: "Acesse o site e escolha um item",
    text: "Clique no botão \"Abrir lista de presentes\" e navegue pelas sugestões, escolha o que fizer sentido. Não precisa ser o presente mais caro.",
    image: lista1,
  },
  {
    title: "Finalize a compra",
    text: "Agora que você já escolheu o item, é só finalizar a compra clicando no botão \"Finalizar compra\"",
    image: lista2,
  },
  {
    title: "Preencha com seus dados",
    text: "Preencha com seu nome e se quiser nos deixe uma mensagem diretamente pelo site.",
    image: lista3,
  },
  {
    title: "Seleciona como deseja pagar",
    text: "Agora é só escolher como você deseja realizar o pagamento, via Pix, Cartão de Crédito ou Boleto Bancário.",
    image: lista4,
  },
  {
    title: "Pronto, presente enviado",
    text: "O site avisa a gente assim que for finalizado o pagamento. Muito obrigado por celebrar esse casamento com a gente.",
    image: lista5,
  },
]

type Props = {
  tab: GiftHowToTab
  onClose: () => void
}

export function GiftHowToDialog({ tab, onClose }: Props) {
  const steps = tab === "pix" ? pixSteps : listaSteps

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gift-howto-title"
        className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[2rem] bg-cream shadow-2xl sm:rounded-[2rem]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-cream-deep px-5 py-4 sm:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-orange">
              Como presentear
            </p>
            <h3 id="gift-howto-title" className="mt-1 font-display text-2xl text-ink sm:text-3xl">
              Passo a passo
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-muted hover:bg-peach hover:text-ink"
            aria-label="Fechar passo a passo"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-4 space-y-6 overflow-y-auto px-5 pb-6 sm:px-8 sm:pb-8">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="overflow-hidden rounded-[1.6rem] bg-white shadow-sm sm:items-center flex flex-col md:flex-row"
            >
              <div className="md:max-w-[400px] w-full h-auto md:border-r-2 border-gray-300 shrink-0">
                <img
                  src={step.image}
                  alt=""
                  className="w-auto h-full object-contain"
                />

              </div>
              <div className="flex gap-4 p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange font-display text-sm text-cream">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-display text-xl text-ink">{step.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

          {tab === "lista" ? (
            <div className="p-4">
              <a
                href={site.gifts.url}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center rounded-full bg-orange py-3.5 font-medium text-cream hover:bg-orange-deep"
              >
                {site.gifts.label}
              </a>
            </div>
          ) : null}
      </div>
    </div>,
    document.body,
  )
}
