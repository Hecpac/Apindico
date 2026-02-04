import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  kicker?: string
  title: string
  subtitle?: string
  align?: "left" | "center"
  size?: "md" | "lg"
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      className,
      kicker,
      title,
      subtitle,
      align = "left",
      size = "lg",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "space-y-4",
          align === "center" ? "text-center" : "text-left",
          className
        )}
        {...props}
      >
        {kicker && (
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--color-muted)]">
            {kicker}
          </span>
        )}
        <div className="space-y-3">
          <h2
            className={cn(
              "font-heading font-semibold text-[color:var(--color-text)]",
              size === "lg"
                ? "text-3xl sm:text-4xl md:text-5xl"
                : "text-2xl sm:text-3xl"
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-[color:var(--color-muted)] max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    )
  }
)

SectionHeader.displayName = "SectionHeader"

export { SectionHeader }
