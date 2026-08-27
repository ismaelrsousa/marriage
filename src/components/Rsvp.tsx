import { Plus, X } from "lucide-react"
import { useState, type FormEvent } from "react"
import { site } from "../content"
import { SectionTitle } from "./SectionTitle"

const storageKey = "rsvp-casamento"

export function Rsvp() {
  const [names, setNames] = useState<string[]>([""])
  const [contact, setContact] = useState("")
  const [note, setNote] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const updateName = (index: number, value: string) => {
    setNames((prev) => prev.map((n, i) => (i === index ? value : n)))
  }

  const addName = () => setNames((prev) => [...prev, ""])

  const removeName = (index: number) => {
    setNames((prev) => (prev.length === 1 ? [""] : prev.filter((_, i) => i !== index)))
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const guests = names.map((n) => n.trim()).filter(Boolean)
    if (guests.length === 0) {
      setError("Digite pelo menos o nome de quem vai.")
      return
    }
    const payload = {
      guests,
      contact: contact.trim(),
      note: note.trim(),
      at: new Date().toISOString(),
    }
    let previous: unknown[] = []
    try {
      const raw = localStorage.getItem(storageKey)
      previous = raw ? (JSON.parse(raw) as unknown[]) : []
      if (!Array.isArray(previous)) previous = []
    } catch {
      previous = []
    }
    localStorage.setItem(storageKey, JSON.stringify([...previous, payload]))
    if (site.rsvpWebhook) {
      void fetch(site.rsvpWebhook, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    }
    setSent(true)
    setError("")
  }

  return (
    <section id="confirmar" className="scroll-mt-24 bg-pink/10 px-5 py-24">
      <div className="mx-auto max-w-2xl">
        <SectionTitle kicker="RSVP" title="Confirme sua presença" />
        <p className="mt-5 text-center text-muted">
          Digite o nome de cada pessoa da família que vai à festa.
        </p>

        {sent ? (
          <div className="mt-10 rounded-[2rem] bg-cream p-10 text-center shadow-sm">
            <p className="font-display text-3xl text-orange">Presença anotada</p>
            <p className="mt-3 text-muted">
              Obrigado. Mal podemos esperar para celebrar com vocês no dia 14.
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-10 space-y-5 rounded-[2rem] bg-cream p-6 shadow-sm sm:p-10"
          >
            <div className="space-y-3">
              <p className="text-sm font-medium text-ink">Quem vai</p>
              {names.map((name, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    value={name}
                    onChange={(e) => updateName(index, e.target.value)}
                    placeholder={`Nome ${index + 1}`}
                    className="w-full rounded-2xl border border-cream-deep bg-white px-4 py-3 outline-none ring-orange/30 placeholder:text-muted/50 focus:ring-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeName(index)}
                    className="rounded-2xl px-3 text-muted hover:bg-peach hover:text-ink"
                    aria-label="Remover nome"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addName}
                className="inline-flex items-center gap-2 text-sm font-medium text-pink hover:text-orange"
              >
                <Plus size={16} />
                Adicionar pessoa
              </button>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-ink">WhatsApp ou e-mail</span>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Para falarmos com vocês se precisar"
                className="mt-2 w-full rounded-2xl border border-cream-deep bg-white px-4 py-3 outline-none ring-orange/30 placeholder:text-muted/50 focus:ring-2"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-ink">Recado (opcional)</span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="mt-2 w-full resize-none rounded-2xl border border-cream-deep bg-white px-4 py-3 outline-none ring-orange/30 focus:ring-2"
              />
            </label>

            {error ? <p className="text-sm text-pink">{error}</p> : null}

            <button
              type="submit"
              className="w-full rounded-full bg-orange py-3.5 font-medium text-cream hover:bg-orange-deep"
            >
              Confirmar presença
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
