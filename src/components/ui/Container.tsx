import * as React from "react"
import { cn } from "@/lib/utils"

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full"
  as?: React.ElementType
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", as: Component = "div", ...props }, ref) => {
    const baseStyles = [
      "w-full mx-auto",
      "px-4 sm:px-6 lg:px-8",
    ]

    const sizes = {
      sm: "max-w-3xl",      // 768px
      md: "max-w-5xl",      // 1024px
      lg: "max-w-6xl",      // 1152px
      xl: "max-w-7xl",      // 1280px
      full: "max-w-full",
    }

    return (
      <Component
        ref={ref}
        className={cn(baseStyles, sizes[size], className)}
        {...props}
      />
    )
  }
)

Container.displayName = "Container"

export { Container }
