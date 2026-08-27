export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`

export const site = {
  partnerA: "Nayara",
  partnerB: "Ismael",
  date: new Date("2026-11-14T15:00:00-03:00"),
  dateLabel: "14 de novembro de 2026",
  dateShort: "14.11.2026",
  ceremonyTime: "15h",
  about: {
    photo: asset("images/sobre-casal.png"),
    text: `
    Nossa história, agora para sempre. </br></br>

    Duas histórias que se encontraram, dois caminhos que decidiram seguir juntos e um amor que escolheu se transformar em uma vida compartilhada. </br></br>

    Ao longo da nossa caminhada, descobrimos que amar também é escolher um ao outro todos os dias: nos momentos felizes, nos desafios, nos sonhos e em tudo aquilo que ainda está por vir. </br></br>

    Agora, damos um dos passos mais importantes das nossas vidas: <strong>vamos nos casar! 💍</strong></br></br>

    Queremos celebrar esse momento ao lado das pessoas que amamos e que fazem parte da nossa história. Será um dia para agradecer, sorrir, abraçar e, acima de tudo, celebrar o amor que nos trouxe até aqui.</br></br>

    Como está escrito em Eclesiastes 4:12b</br></br>

    <strong>"...Um cordão tríplice não pode ser facilmente rompido.”</strong></br></br>

    Acreditamos que o nosso amor é fortalecido quando caminhamos juntos — e que Jeová é o terceiro elo desse tríplice cordão que nos une.</br></br>

    É com muita alegria que anunciamos: vamos nos casar!</br></br>

    E queremos viver esse dia inesquecível junto de vocês. ❤️</br></br>

    Sejam muito bem-vindos à nossa história e à celebração do início de um novo capítulo das nossas vidas.`,
  },
  venue: {
    name: "Casa Cordeiro",
    address: "Rua Rio de Janeiro, 627",
    city: "Cibratel II, Itanhaém - SP",
    notes: "Cerimônia no jardim às 15h. A festa segue no pavilhão ao lado.",
    mapsQuery: "Rua Rio de Janeiro, 627, Itanhaém - SP",
    photos: [
      { src: asset("images/local-fachada.png"), alt: "Fachada da quinta" },
      { src: asset("images/local-cerimonia.png"), alt: "Jardim da cerimônia" },
      { src: asset("images/local-festa.png"), alt: "Salão da festa" },
    ],
  },
  gallery: [
    { src: asset("images/hero-casal.png"), alt: "Ensaio ao entardecer" },
    { src: asset("images/galeria-1.jpg"), alt: "Caminhando pelo jardim" },
    { src: asset("images/galeria-2.png"), alt: "Mãos dadas" },
    { src: asset("images/galeria-3.png"), alt: "Jantar ao ar livre" },
    { src: asset("images/galeria-danca.png"), alt: "Dança no jardim" },
    { src: asset("images/galeria-campo.png"), alt: "Campo de flores" },
  ],
  gifts: {
    url: "https://www.querodecasamento.com.br",
    label: "Abrir lista de presentes",
  },
  heroPhoto: asset("images/hero-casal.png"),
}

export const navItems = [
  { href: "#inicio", label: "Início" },
  { href: "#contagem", label: "Contagem" },
  { href: "#casal", label: "O casal" },
  { href: "#fotos", label: "Fotos" },
  { href: "#local", label: "Local" },
  { href: "#traje", label: "Traje" },
  { href: "#presentes", label: "Presentes" },
  { href: "#confirmar", label: "Confirmar" },
] as const
