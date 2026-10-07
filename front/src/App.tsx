import { About } from "./components/About"
import { Countdown } from "./components/Countdown"
import { DressCode } from "./components/DressCode"
import { Footer } from "./components/Footer"
import { Gallery } from "./components/Gallery"
import { Gifts } from "./components/Gifts"
import { Hero } from "./components/Hero"
import { Nav } from "./components/Nav"
import { Ceremony } from "./components/Ceremony"
import { Venue } from "./components/Venue"

export default function App() {
  return (
    <div className="paper-grain">
      <Nav />
      <main>
        <Hero />
        <Countdown />
        <About />
        <Gallery />
        <Venue />
        <DressCode />
        <Gifts />
        <Ceremony />
      </main>
      <Footer />
    </div>
  )
}
