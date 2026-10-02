import { SectionTitle } from "./SectionTitle";

export function Rsvp() {
  return (
    <section id="confirmar" className="scroll-mt-24 bg-pink/10 px-5 py-24">
      <div className="mx-auto max-w-2xl">
        <SectionTitle kicker="" title="Confirme sua presença" />

        <div className="mt-10 rounded-[2rem] bg-cream p-10 text-center shadow-sm">
          <p className="font-display text-3xl text-orange">O período de confirmação do casamento já se encerrou</p>
          <p className="mt-3 text-muted">Mas você ainda pode acompanhar a nossa cerimônia de forma remota, em breve será disponibilizado um link.</p>

          {/* <a href="#" target="_blank" className="block mt-4">
            https://youtube.com/live
          </a> */}
        </div>
      </div>
    </section>
  );
}
