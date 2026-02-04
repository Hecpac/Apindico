"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string
  onChange: (value: string) => void
  onClear?: () => void
  label?: string
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      value,
      onChange,
      onClear,
      label = "Buscar proyectos",
      placeholder = "Buscar por título, cliente o ubicación",
      ...props
    },
    ref
  ) => {
    const inputId = React.useId()

    return (
      <div className="w-full">
        <label htmlFor={inputId} className="sr-only">
          {label}
        </label>
        <div
          className={cn(
            "relative flex items-center gap-2 rounded-full border",
            "bg-[color:var(--color-surface)] text-[color:var(--color-text)]",
            "border-[color:var(--color-border)] shadow-[var(--shadow-1)]",
            "transition-all duration-300",
            "focus-within:border-[color:var(--color-accent)] focus-within:ring-2 focus-within:ring-[color:var(--color-accent)]",
            className
          )}
        >
          <Search className="ml-4 h-4 w-4 text-[color:var(--color-muted)]" aria-hidden="true" />
          <input
            id={inputId}
            ref={ref}
            type="search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className={cn(
              "h-11 w-full bg-transparent pr-12 text-sm font-medium",
              "placeholder:text-[color:var(--color-muted)]",
              "focus:outline-none"
            )}
            aria-label={label}
            {...props}
          />
          {value.length > 0 && (
            <button
              type="button"
              onClick={() => {
                onClear?.()
                onChange("")
              }}
              className="absolute right-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-[color:var(--color-muted)] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    )
  }
)

SearchInput.displayName = "SearchInput"

export { SearchInput }
