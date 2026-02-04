export type ProjectCategory = "cctv" | "vactor" | "acueducto" | "otro"

type PatternType = "grid" | "dots" | "lines"

const GRADIENTS = [
  { from: "#0B1324", to: "#1B2A43" },
  { from: "#111827", to: "#0F172A" },
  { from: "#13203A", to: "#1F2C4F" },
  { from: "#0F172A", to: "#1E293B" },
]

const ACCENTS = ["#F97316", "#38BDF8", "#14B8A6", "#F59E0B"]

const PATTERNS: PatternType[] = ["grid", "dots", "lines"]

const CATEGORY_SEEDS: Record<ProjectCategory, number> = {
  cctv: 11,
  vactor: 29,
  acueducto: 47,
  otro: 73,
}

const hashString = (value: string) => {
  let hash = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

const mulberry32 = (seed: number) => {
  let t = seed
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), t | 1)
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

const svgToDataUri = (svg: string) => {
  const encoded = encodeURIComponent(svg)
    .replace(/%0A/g, "")
    .replace(/%20/g, " ")
    .replace(/%3D/g, "=")
    .replace(/%3A/g, ":")
    .replace(/%2F/g, "/")
    .replace(/%22/g, "'")
  return `data:image/svg+xml,${encoded}`
}

export type CoverConfig = {
  gradientFrom: string
  gradientTo: string
  accent: string
  angle: number
  pattern: PatternType
  patternSize: number
  patternOpacity: number
  iconIndex: number
  seededNumber: string
  seed: number
}

export const getCoverConfig = (id: string, category: ProjectCategory): CoverConfig => {
  const seed = hashString(`${id}-${category}`) + CATEGORY_SEEDS[category]
  const rand = mulberry32(seed)
  const gradient = GRADIENTS[Math.floor(rand() * GRADIENTS.length)]
  const accent = ACCENTS[Math.floor(rand() * ACCENTS.length)]
  const pattern = PATTERNS[Math.floor(rand() * PATTERNS.length)]
  const angle = Math.floor(rand() * 80) + 150
  const patternSize = Math.floor(rand() * 64) + 40
  const patternOpacity = 0.12 + rand() * 0.12
  const iconIndex = Math.floor(rand() * 3)
  const numberValue = (seed % 90) + 10

  return {
    gradientFrom: gradient.from,
    gradientTo: gradient.to,
    accent,
    angle,
    pattern,
    patternSize,
    patternOpacity,
    iconIndex,
    seededNumber: String(numberValue).padStart(2, "0"),
    seed,
  }
}

export const buildPatternSvg = (config: CoverConfig) => {
  const size = config.patternSize
  const stroke = "#FFFFFF"
  const opacity = config.patternOpacity.toFixed(2)

  let patternShape = ""
  switch (config.pattern) {
    case "grid":
      patternShape = `<path d="M ${size} 0 L 0 0 0 ${size}" stroke="${stroke}" stroke-opacity="${opacity}" stroke-width="1" />`
      break
    case "dots":
      patternShape = `<circle cx="${size / 2}" cy="${size / 2}" r="${Math.max(
        1.5,
        size * 0.08
      )}" fill="${stroke}" fill-opacity="${opacity}" />`
      break
    case "lines":
    default:
      patternShape = `<path d="M 0 ${size * 0.2} H ${size} M 0 ${size * 0.6} H ${size} M 0 ${size} H ${size}" stroke="${stroke}" stroke-opacity="${opacity}" stroke-width="1" />`
      break
  }

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <pattern id="p" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
      ${patternShape}
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#p)" />
</svg>`

  return svgToDataUri(svg)
}

export const buildPatternDataUri = buildPatternSvg
