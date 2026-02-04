"use client"

import * as React from "react"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

type ToastVariant = "success" | "error" | "warning" | "info"

interface Toast {
  id: string
  message: string
  variant: ToastVariant
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (message: string, variant: ToastVariant, duration?: number) => void
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

interface ToastProviderProps {
  children: React.ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback(
    (message: string, variant: ToastVariant, duration = 5000) => {
      const id = Math.random().toString(36).substring(2, 9)
      const newToast: Toast = { id, message, variant, duration }

      setToasts((prev) => [...prev, newToast])

      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id))
        }, duration)
      }
    },
    []
  )

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div
      className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2"
      role="region"
      aria-label="Notificaciones"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

interface ToastItemProps {
  toast: Toast
  onRemove: (id: string) => void
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const variants = {
    success: "bg-green-50 border-verde-exito text-verde-exito",
    error: "bg-red-50 border-rojo-error text-rojo-error",
    warning: "bg-orange-50 border-naranja-warning text-naranja-warning",
    info: "bg-azul-bg border-azul-principal text-azul-principal",
  }

  const iconColors = {
    success: "text-verde-exito",
    error: "text-rojo-error",
    warning: "text-naranja-warning",
    info: "text-azul-principal",
  }

  const Icon = icons[toast.variant]

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border shadow-lg",
        "min-w-[300px] max-w-[400px]",
        "animate-in slide-in-from-right-full fade-in duration-300",
        variants[toast.variant]
      )}
      role="alert"
    >
      <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", iconColors[toast.variant])} />
      <p className="flex-1 text-sm font-medium text-gris-900">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 p-1 hover:bg-black/5 rounded transition-colors"
        aria-label="Cerrar notificación"
      >
        <X className="w-4 h-4 text-gris-600" />
      </button>
    </div>
  )
}

export { ToastContext }
export type { Toast, ToastVariant, ToastContextType }
