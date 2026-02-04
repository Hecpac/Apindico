import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "error" | "info" | "default" | "editorial"
  size?: "sm" | "md"
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const baseStyles = [
      "inline-flex items-center justify-center",
      "font-body font-medium",
      "rounded-full",
      "transition-colors duration-200",
    ]

    const variants = {
      default: "bg-gris-100 text-gris-800",
      success: "bg-green-100 text-verde-exito",
      warning: "bg-orange-100 text-naranja-warning",
      error: "bg-red-100 text-rojo-error",
      info: "bg-azul-bg text-azul-principal",
      editorial:
        "border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] text-[color:var(--color-text)]",
    }

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
    }

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"

export { Badge }
