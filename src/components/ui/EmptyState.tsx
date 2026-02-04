import * as React from "react"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: React.ReactNode
  icon?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, title, description, action, icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center gap-4 rounded-[var(--radius-4)] border border-dashed border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-6 py-10 text-center",
          className
        )}
        role="status"
        {...props}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-white/5 text-[color:var(--color-accent)]">
          {icon ?? <Sparkles className="h-6 w-6" />}
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[color:var(--color-text)]">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-[color:var(--color-muted)] max-w-md">
              {description}
            </p>
          )}
        </div>
        {action && <div className="pt-2">{action}</div>}
      </div>
    )
  }
)

EmptyState.displayName = "EmptyState"

export { EmptyState }
