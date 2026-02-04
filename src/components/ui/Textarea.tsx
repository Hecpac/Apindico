"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  errorMessage?: string
  label?: string
  helperText?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error = false,
      errorMessage,
      label,
      helperText,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const textareaId = id ?? generatedId

    const baseStyles = [
      "flex min-h-[120px] w-full rounded-lg",
      "border-2 border-gris-200 bg-white",
      "px-4 py-3 text-base font-body text-gris-900",
      "placeholder:text-gris-400",
      "transition-all duration-200 ease-out",
      "focus:outline-none focus:border-azul-principal focus:ring-2 focus:ring-azul-bg",
      "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gris-100",
      "resize-vertical",
    ]

    const errorStyles = error
      ? "border-rojo-error focus:border-rojo-error focus:ring-red-100"
      : ""

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gris-800 font-body"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(baseStyles, errorStyles, className)}
          ref={ref}
          aria-invalid={error}
          aria-describedby={
            error && errorMessage
              ? `${textareaId}-error`
              : helperText
                ? `${textareaId}-helper`
                : undefined
          }
          {...props}
        />
        {error && errorMessage && (
          <p
            id={`${textareaId}-error`}
            className="text-sm text-rojo-error font-body"
          >
            {errorMessage}
          </p>
        )}
        {!error && helperText && (
          <p
            id={`${textareaId}-helper`}
            className="text-sm text-gris-600 font-body"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }
