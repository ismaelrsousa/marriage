export function Petals() {
  const petals = [
    { left: "8%", delay: "0s", duration: "14s", color: "#E86A2A" },
    { left: "22%", delay: "3s", duration: "16s", color: "#E45C7A" },
    { left: "41%", delay: "1.5s", duration: "18s", color: "#F0C14A" },
    { left: "63%", delay: "5s", duration: "15s", color: "#E86A2A" },
    { left: "78%", delay: "2s", duration: "17s", color: "#F4A5B8" },
    { left: "91%", delay: "7s", duration: "19s", color: "#F0C14A" },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <span
          key={p.left}
          className="petal"
          style={{
            left: p.left,
            background: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  )
}
