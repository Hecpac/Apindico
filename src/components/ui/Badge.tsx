import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "error" | "info" | "default" | "accent" | "editorial"
  size?: "sm" | "md"
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const normalizedVariant: "success" | "warning" | "error" | "info" | "default" | "accent" =
      variant === "editorial" ? "accent" : variant

    const baseStyles = [
      "inline-flex items-center justify-center",
      "font-body font-medium",
      "rounded-full",
      "border transition-colors duration-200",
    ]

    const variants = {
      default: "bg-[color:var(--color-surface)] text-[color:var(--color-text)] border-[color:var(--color-border)]",
      success: "bg-[color:var(--color-success)]/16 text-[color:var(--color-success)] border-[color:var(--color-success)]/45",
      warning: "bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent)] border-[color:var(--color-accent)]/40",
      error: "bg-[color:var(--color-danger)]/15 text-[color:var(--color-danger)] border-[color:var(--color-danger)]/45",
      info: "bg-[color:var(--color-accent-2)]/14 text-[color:var(--color-accent-2)] border-[color:var(--color-accent-2)]/45",
      accent: "bg-[color:var(--color-accent)]/16 text-[color:var(--color-accent)] border-[color:var(--color-accent)]/45",
    }

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
    }

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[normalizedVariant], sizes[size], className)}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"

export { Badge }
