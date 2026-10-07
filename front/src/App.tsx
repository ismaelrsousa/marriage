import { useLayoutEffect } from "react"
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

function scrollToHash() {
  const id = decodeURIComponent(window.location.hash.replace(/^#/, ""))
  if (!id) return
  document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" })
}

export default function App() {
  useLayoutEffect(() => {
    if (!window.location.hash) return

    let userMoved = false
    const stop = () => {
      userMoved = true
    }
    const scroll = () => {
      if (!userMoved) scrollToHash()
    }

    scroll()
    const observer = new ResizeObserver(scroll)
    observer.observe(document.body)
    const stopTimer = window.setTimeout(() => observer.disconnect(), 2500)

    window.addEventListener("wheel", stop, { passive: true })
    window.addEventListener("touchmove", stop, { passive: true })
    window.addEventListener("keydown", stop)

    return () => {
      observer.disconnect()
      window.clearTimeout(stopTimer)
      window.removeEventListener("wheel", stop)
      window.removeEventListener("touchmove", stop)
      window.removeEventListener("keydown", stop)
    }
  }, [])

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
