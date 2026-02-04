"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "cta" | "ghost"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
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
      leftIcon,
      rightIcon,
      disabled,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      "inline-flex items-center justify-center gap-2",
      "font-heading font-semibold",
      "rounded-lg",
      "transition-all duration-200 ease-standard",
      "focus:outline-none focus:ring-2 focus:ring-azul-principal focus:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none",
    ]

    const variants = {
      primary: "bg-azul-principal text-white hover:bg-azul-oscuro hover:-translate-y-0.5 hover:shadow-lg",
      secondary:
        "border-2 border-azul-principal text-azul-principal bg-transparent hover:bg-azul-bg hover:-translate-y-0.5 hover:shadow-lg",
      accent: "bg-amarillo text-gris-900 hover:bg-amarillo-oscuro hover:-translate-y-0.5 hover:shadow-lg",
      cta: "bg-[#FF6B35] text-white hover:bg-[#E5612F] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#FF6B35]/30",
      ghost: "text-azul-principal bg-transparent hover:bg-azul-bg",
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
          className={cn(baseStyles, variants[variant], sizes[size], className)}
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
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="animate-pulse">Cargando...</span>
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
