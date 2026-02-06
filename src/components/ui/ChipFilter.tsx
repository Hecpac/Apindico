import * as React from "react"
import { cn } from "@/lib/utils"

export interface ChipFilterProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  count?: number
  active?: boolean
}

const ChipFilter = React.forwardRef<HTMLButtonElement, ChipFilterProps>(
  ({ className, label, count, active = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={active}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
          "border transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent-2)]",
          "motion-safe:hover:-translate-y-0.5",
          active
            ? "bg-[color:var(--color-accent)] text-white border-[color:var(--color-accent)] shadow-[var(--shadow-sm)]"
            : "bg-[color:var(--color-surface)] text-[color:var(--color-text)] border-[color:var(--color-border)] hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-2)]",
          className
        )}
        {...props}
      >
        <span>{label}</span>
        {typeof count === "number" && (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-semibold",
              active
                ? "bg-black/20 text-white"
                : "bg-[color:var(--color-surface-2)] text-[color:var(--color-muted)]"
            )}
            aria-hidden="true"
          >
            {count}
          </span>
        )}
      </button>
    )
  }
)

ChipFilter.displayName = "ChipFilter"

export { ChipFilter }
