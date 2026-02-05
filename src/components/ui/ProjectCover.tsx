import * as React from "react"
import Image from "next/image"
import {
  Droplet,
  Map,
  Ruler,
  Search,
  Video,
  Wrench,
  Truck,
  Trash2,
  PenTool,
  ClipboardList,
  LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { buildCoverSvg, getCoverConfig, type ProjectCategory } from "@/lib/projectCover"

export interface ProjectCoverProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  category: ProjectCategory
  label?: string
  displayIndex?: number
  priority?: boolean
  sizes?: string
  alt?: string
}

const ICONS_BY_CATEGORY: Record<ProjectCategory, LucideIcon[]> = {
  cctv: [Video, Search, ClipboardList],
  vactor: [Truck, Trash2, Wrench],
  acueducto: [Droplet, Ruler, Map],
  otro: [PenTool, ClipboardList, Map],
}

const ProjectCover = React.forwardRef<HTMLDivElement, ProjectCoverProps>(
  (
    { className, id, category, label, displayIndex, priority, sizes, alt, style, ...props },
    ref
  ) => {
    const config = React.useMemo(() => getCoverConfig(id, category), [id, category])
    const coverSrc = React.useMemo(
      () => buildCoverSvg(config, { width: 1200, height: 900 }),
      [config]
    )
    const blurSrc = React.useMemo(
      () => buildCoverSvg(config, { width: 24, height: 18 }),
      [config]
    )
    const icons = ICONS_BY_CATEGORY[category] ?? ICONS_BY_CATEGORY.otro
    const WatermarkIcon = icons[config.iconIndex % icons.length]
    const numberLabel =
      typeof displayIndex === "number"
        ? String(displayIndex).padStart(2, "0")
        : config.seededNumber

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-[var(--radius-4)]",
          "aspect-[4/3] bg-[color:var(--color-surface)]",
          className
        )}
        style={{
          backgroundImage: `linear-gradient(${config.angle}deg, ${config.gradientFrom}, ${config.gradientTo})`,
          ...style,
        }}
        {...props}
      >
        <Image
          src={coverSrc}
          alt={alt ?? ""}
          fill
          priority={priority}
          unoptimized
          placeholder="blur"
          blurDataURL={blurSrc}
          sizes={
            sizes ??
            "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          }
          className="object-cover"
          aria-hidden={!alt}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          aria-hidden="true"
        />
        <WatermarkIcon
          className="absolute -bottom-6 -right-6 h-28 w-28 text-white/18"
          aria-hidden="true"
        />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span
            className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-[0.3em] text-white/80"
            aria-hidden="true"
          >
            {numberLabel}
          </span>
          {label && (
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
              {label}
            </span>
          )}
        </div>
      </div>
    )
  }
)

ProjectCover.displayName = "ProjectCover"

export { ProjectCover }
