type FlowerProps = {
  className?: string
  tone?: "orange" | "pink" | "yellow"
}

const fills = {
  orange: "#E86A2A",
  pink: "#E45C7A",
  yellow: "#F0C14A",
}

export function Blossom({ className = "", tone = "orange" }: FlowerProps) {
  const fill = fills[tone]
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <g transform="translate(32 32)">
        {Array.from({ length: 5 }, (_, i) => (
          <ellipse
            key={i}
            rx="8"
            ry="16"
            fill={fill}
            opacity="0.92"
            transform={`rotate(${i * 72})`}
          />
        ))}
        <circle r="7" fill="#F7D774" />
        <circle r="3" fill="#C44E16" />
      </g>
    </svg>
  )
}

export function FloralRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-10 bg-orange/40" />
      <Blossom className="h-7 w-7" tone="orange" />
      <Blossom className="h-5 w-5" tone="pink" />
      <Blossom className="h-6 w-6" tone="yellow" />
      <span className="h-px w-10 bg-pink/40" />
    </div>
  )
}

export function CornerBloom({
  className = "",
}: {
  className?: string
}) {
  return (
    <img
      src="/images/floral-canto.png"
      alt=""
      className={`pointer-events-none select-none mix-blend-multiply ${className}`}
    />
  )
}
