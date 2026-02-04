"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
  errorMessage?: string
  label?: string
  helperText?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      error = false,
      errorMessage,
      label,
      helperText,
      id,
      options,
      placeholder = "Seleccione una opción",
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const selectId = id ?? generatedId

    const baseStyles = [
      "flex h-11 w-full rounded-lg appearance-none",
      "border-2 border-gris-200 bg-white",
      "px-4 py-2 pr-10 text-base font-body text-gris-900",
      "transition-all duration-200 ease-out",
      "focus:outline-none focus:border-azul-principal focus:ring-2 focus:ring-azul-bg",
      "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gris-100",
    ]

    const errorStyles = error
      ? "border-rojo-error focus:border-rojo-error focus:ring-red-100"
      : ""

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gris-800 font-body"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            className={cn(baseStyles, errorStyles, className)}
            ref={ref}
            aria-invalid={error}
            aria-describedby={
              error && errorMessage
                ? `${selectId}-error`
                : helperText
                  ? `${selectId}-helper`
                  : undefined
            }
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gris-400 pointer-events-none" />
        </div>
        {error && errorMessage && (
          <p
            id={`${selectId}-error`}
            className="text-sm text-rojo-error font-body"
          >
            {errorMessage}
          </p>
        )}
        {!error && helperText && (
          <p
            id={`${selectId}-helper`}
            className="text-sm text-gris-600 font-body"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = "Select"

export { Select }
