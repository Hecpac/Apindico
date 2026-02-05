import * as React from "react"
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
import {
  buildPatternSvg,
  getCoverConfig,
  type ProjectCategory,
} from "@/lib/projectCover"

export interface ProjectCoverProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  category: ProjectCategory
  label?: string
  displayIndex?: number
}

const ICONS_BY_CATEGORY: Record<ProjectCategory, LucideIcon[]> = {
  cctv: [Video, Search, ClipboardList],
  vactor: [Truck, Trash2, Wrench],
  acueducto: [Droplet, Ruler, Map],
  otro: [PenTool, ClipboardList, Map],
}

const ProjectCover = React.forwardRef<HTMLDivElement, ProjectCoverProps>(
  ({ className, id, category, label, displayIndex, ...props }, ref) => {
    const config = React.useMemo(() => getCoverConfig(id, category), [id, category])
    const pattern = React.useMemo(() => buildPatternSvg(config), [config])
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
        }}
        {...props}
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{ backgroundImage: `url(${pattern})` }}
          aria-hidden="true"
        />
        <div
          className="absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl"
          style={{ background: config.accent, opacity: 0.25 }}
          aria-hidden="true"
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
