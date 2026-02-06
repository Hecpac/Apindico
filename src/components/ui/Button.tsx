"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "cta"
    | "outline"
    | "accent"
    | "ghost"
    | "editorial"
    | "editorial-outline"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  loadingLabel?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingLabel = "Cargando...",
      leftIcon,
      rightIcon,
      disabled,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const normalizedVariant: "primary" | "secondary" | "cta" | "outline" =
      variant === "accent" || variant === "editorial"
        ? "cta"
        : variant === "ghost" || variant === "editorial-outline"
          ? "outline"
          : variant

    const baseStyles = [
      "inline-flex items-center justify-center gap-2",
      "font-heading font-semibold",
      "rounded-[var(--radius-lg)]",
      "transition-all duration-200 ease-standard",
      "focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent-2)] focus:ring-offset-2 focus:ring-offset-transparent",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none",
    ]

    const variants = {
      primary:
        "bg-[color:var(--color-surface-2)] text-[color:var(--color-text)] border border-[color:var(--color-border)] hover:bg-[color:var(--color-surface-3)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]",
      secondary:
        "border border-[color:var(--color-accent-2)]/45 text-[color:var(--color-accent-2)] bg-transparent hover:bg-[color:var(--color-accent-2)]/10 hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)]",
      cta: "bg-[color:var(--color-accent)] text-white border border-transparent hover:brightness-105 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]",
      outline:
        "border border-[color:var(--color-border)] text-[color:var(--color-text)] bg-transparent hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-text)] hover:bg-[color:var(--color-surface)]/50 motion-safe:hover:-translate-y-0.5",
    }

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    }

    const Comp = asChild ? Slot : "button"

    if (asChild) {
      return (
        <Comp
          ref={ref}
          className={cn(baseStyles, variants[normalizedVariant], sizes[size], className)}
          {...props}
        >
          {children}
        </Comp>
      )
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[normalizedVariant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="animate-pulse">{loadingLabel}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
