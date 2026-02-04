import * as React from "react"
import { cn } from "@/lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "card" | "avatar" | "button" | "cover" | "chip"
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "text", ...props }, ref) => {
    const baseStyles = "animate-pulse bg-gris-200 rounded"

    const variants = {
      text: "h-4 w-full rounded",
      card: "h-48 w-full rounded-xl",
      avatar: "h-12 w-12 rounded-full",
      button: "h-11 w-32 rounded-lg",
      cover: "aspect-[4/3] w-full rounded-2xl",
      chip: "h-9 w-24 rounded-full",
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    )
  }
)

Skeleton.displayName = "Skeleton"

export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number
}

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ className, lines = 3, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            className={index === lines - 1 ? "w-3/4" : "w-full"}
          />
        ))}
      </div>
    )
  }
)

SkeletonText.displayName = "SkeletonText"

export interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  showImage?: boolean
  showFooter?: boolean
}

const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ className, showImage = true, showFooter = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white rounded-xl shadow-md overflow-hidden",
          className
        )}
        {...props}
      >
        {showImage && <Skeleton variant="card" className="rounded-none" />}
        <div className="p-6 space-y-4">
          <Skeleton variant="text" className="h-6 w-3/4" />
          <SkeletonText lines={2} />
          {showFooter && (
            <div className="flex items-center gap-4 pt-2">
              <Skeleton variant="avatar" className="h-8 w-8" />
              <Skeleton variant="text" className="h-4 w-24" />
            </div>
          )}
        </div>
      </div>
    )
  }
)

SkeletonCard.displayName = "SkeletonCard"

export type SkeletonServiceCardProps = React.HTMLAttributes<HTMLDivElement>

const SkeletonServiceCard = React.forwardRef<
  HTMLDivElement,
  SkeletonServiceCardProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("bg-white rounded-xl shadow-md p-6", className)}
      {...props}
    >
      <Skeleton variant="avatar" className="w-[60px] h-[60px] mb-4" />
      <Skeleton variant="text" className="h-5 w-3/4 mb-2" />
      <SkeletonText lines={2} />
      <Skeleton variant="button" className="mt-4 w-20 h-6" />
    </div>
  )
})

SkeletonServiceCard.displayName = "SkeletonServiceCard"

export { Skeleton, SkeletonText, SkeletonCard, SkeletonServiceCard }
