import { useEffect, useState } from "react"

type Parts = {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

function split(target: Date, now: number): Parts {
  const diff = target.getTime() - now
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
    done: false,
  }
}

export function useCountdown(target: Date) {
  const [parts, setParts] = useState<Parts>(() => split(target, Date.now()))

  useEffect(() => {
    const id = window.setInterval(() => {
      setParts(split(target, Date.now()))
    }, 1000)
    return () => window.clearInterval(id)
  }, [target])

  return parts
}
