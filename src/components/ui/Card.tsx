import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "editorial"
  hoverable?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hoverable = false, ...props }, ref) => {
    const baseStyles = [
      "rounded-xl",
      "transition-all duration-300 ease-standard",
    ]

    const variants = {
      default: "bg-white shadow-md",
      elevated: "bg-white shadow-lg hover:shadow-xl",
      outlined: "bg-white border-2 border-gris-200",
      editorial:
        "bg-[color:var(--color-surface)] border border-[color:var(--color-border)] shadow-[var(--shadow-2)]",
    }

    const hoverStyles = hoverable
      ? "hover:-translate-y-1 hover:shadow-xl cursor-pointer"
      : ""

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], hoverStyles, className)}
        {...props}
      />
    )
  }
)

Card.displayName = "Card"

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
)

CardHeader.displayName = "CardHeader"

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "font-heading text-xl font-semibold text-gris-900 leading-tight",
        className
      )}
      {...props}
    />
  )
)

CardTitle.displayName = "CardTitle"

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gris-600 font-body", className)}
    {...props}
  />
))

CardDescription.displayName = "CardDescription"

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)

CardContent.displayName = "CardContent"

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
)

CardFooter.displayName = "CardFooter"

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
}
