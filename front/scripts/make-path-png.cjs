const fs = require("fs")
const zlib = require("zlib")
const path = require("path")

const W = 400
const H = 800
const CX = W / 2
const AMP = 118
const RADIUS = 3.6
const DASH = 16
const GAP = 15

function crc32(buf) {
  let c = ~0
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i]
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1))
  }
  return (~c) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}

function writePng(file, width, height, rgba) {
  const raw = Buffer.alloc((width * 4 + 1) * height)
  for (let y = 0; y < height; y++) {
    const row = y * (width * 4 + 1)
    raw[row] = 0
    rgba.copy(raw, row + 1, y * width * 4, (y + 1) * width * 4)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  const out = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ])
  fs.writeFileSync(file, out)
}

function xAt(y) {
  return CX - AMP * Math.sin((2 * Math.PI * y) / H)
}

const pts = []
for (let y = 0; y <= H; y += 0.35) {
  pts.push({ x: xAt(y), y })
}

const dist = [0]
for (let i = 1; i < pts.length; i++) {
  dist.push(dist[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y))
}
const L = dist[dist.length - 1]
const period = DASH + GAP
const cycles = Math.round(L / period)
const periodAdj = L / cycles
const dashAdj = periodAdj * (DASH / (DASH + GAP))

const rgba = Buffer.alloc(W * H * 4)
const R = 158
const G = 158
const B = 158

function blend(px, py, alpha) {
  if (alpha <= 0) return
  let y = ((py % H) + H) % H
  if (px < 0 || px >= W) return
  const x0 = Math.floor(px)
  const y0 = Math.floor(y)
  const fx = px - x0
  const fy = y - y0
  const corners = [
    [x0, y0, (1 - fx) * (1 - fy)],
    [x0 + 1, y0, fx * (1 - fy)],
    [x0, y0 + 1, (1 - fx) * fy],
    [x0 + 1, y0 + 1, fx * fy],
  ]
  for (const [cx, cy, w] of corners) {
    if (cx < 0 || cx >= W) continue
    const yy = ((cy % H) + H) % H
    const i = (Math.floor(yy) * W + cx) * 4
    const a = Math.min(1, alpha * w)
    const outA = a + (rgba[i + 3] / 255) * (1 - a)
    if (outA <= 0) continue
    rgba[i] = Math.round((R * a + rgba[i] * (rgba[i + 3] / 255) * (1 - a)) / outA)
    rgba[i + 1] = Math.round((G * a + rgba[i + 1] * (rgba[i + 3] / 255) * (1 - a)) / outA)
    rgba[i + 2] = Math.round((B * a + rgba[i + 2] * (rgba[i + 3] / 255) * (1 - a)) / outA)
    rgba[i + 3] = Math.round(outA * 255)
  }
}

function stamp(x, y, radius) {
  const pad = radius + 1.5
  const x0 = Math.floor(x - pad)
  const x1 = Math.ceil(x + pad)
  const y0 = Math.floor(y - pad)
  const y1 = Math.ceil(y + pad)
  for (let py = y0; py <= y1; py++) {
    for (let px = x0; px <= x1; px++) {
      const d = Math.hypot(px + 0.5 - x, py + 0.5 - y)
      const a = Math.max(0, Math.min(1, radius + 0.55 - d))
      if (a > 0) blend(px + 0.5, py + 0.5, a)
    }
  }
}

function pointAt(s) {
  let lo = 0
  let hi = pts.length - 1
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1
    if (dist[mid] < s) lo = mid
    else hi = mid
  }
  const span = dist[hi] - dist[lo] || 1
  const t = (s - dist[lo]) / span
  return {
    x: pts[lo].x + (pts[hi].x - pts[lo].x) * t,
    y: pts[lo].y + (pts[hi].y - pts[lo].y) * t,
  }
}

const step = 0.7
for (let s = 0; s < L; s += step) {
  const phase = s % periodAdj
  if (phase < dashAdj) {
    const p = pointAt(s)
    stamp(p.x, p.y, RADIUS)
  }
}

const outDir = path.join("C:", "www", "casamento", "front", "public", "images")
fs.mkdirSync(outDir, { recursive: true })
const tilePath = path.join(outDir, "caminho-seamless.png")
writePng(tilePath, W, H, rgba)

const tiles = 3
const preview = Buffer.alloc(W * H * tiles * 4)
for (let t = 0; t < tiles; t++) {
  rgba.copy(preview, t * W * H * 4)
}
writePng(path.join(outDir, "caminho-seamless-preview.png"), W, H * tiles, preview)

console.log("tile", tilePath)
console.log("pathLength", L.toFixed(2), "cycles", cycles, "dash", dashAdj.toFixed(2))
