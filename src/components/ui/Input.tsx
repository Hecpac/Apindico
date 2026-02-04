"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  errorMessage?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  label?: string
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      error = false,
      errorMessage,
      leftIcon,
      rightIcon,
      label,
      helperText,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId

    const baseStyles = [
      "flex h-11 w-full rounded-lg",
      "border-2 border-gris-200 bg-white",
      "px-4 py-2 text-base font-body text-gris-900",
      "placeholder:text-gris-400",
      "transition-all duration-200 ease-out",
      "focus:outline-none focus:border-azul-principal focus:ring-2 focus:ring-azul-bg",
      "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gris-100",
    ]

    const errorStyles = error
      ? "border-rojo-error focus:border-rojo-error focus:ring-red-100"
      : ""

    const iconPaddingLeft = leftIcon ? "pl-11" : ""
    const iconPaddingRight = rightIcon ? "pr-11" : ""

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gris-800 font-body"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gris-400">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            className={cn(
              baseStyles,
              errorStyles,
              iconPaddingLeft,
              iconPaddingRight,
              className
            )}
            ref={ref}
            aria-invalid={error}
            aria-describedby={
              error && errorMessage
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gris-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && errorMessage && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-rojo-error font-body"
          >
            {errorMessage}
          </p>
        )}
        {!error && helperText && (
          <p
            id={`${inputId}-helper`}
            className="text-sm text-gris-600 font-body"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
