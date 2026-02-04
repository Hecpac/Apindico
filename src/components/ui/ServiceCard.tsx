"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "./Badge"

export interface ServiceCardProps {
  icon: string
  nombre: string
  descripcion: string
  slug: string
  normativa?: string | null
  className?: string
}

const ServiceCard = React.forwardRef<HTMLAnchorElement, ServiceCardProps>(
  ({ icon, nombre, descripcion, slug, normativa, className }, ref) => {
    return (
      <Link
        ref={ref}
        href={`/servicios/${slug}`}
        className={cn(
          "service-card group relative overflow-hidden rounded-[2.5rem]",
          "border border-white/5 bg-zinc-900/40 backdrop-blur-md p-8",
          "transition-all duration-500 ease-out",
          "hover:-translate-y-1 hover:border-orange-500/50",
          "hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.45)]",
          "focus:outline-none focus:ring-2 focus:ring-azul-principal focus:ring-offset-2",
          "min-h-[280px]",
          className
        )}
      >
        {/* Icon */}
        <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-500 shadow-[0_0_20px_rgba(234,88,12,0.1)] mb-5 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:text-orange-400">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.22),transparent_70%)] opacity-80" />
          <span
            className="relative text-2xl transition-transform duration-300 group-hover:scale-105"
            role="img"
            aria-hidden="true"
          >
            {icon}
          </span>
        </div>

        {/* Title - sin truncamiento */}
        <h3 className="font-heading font-bold text-xl tracking-tight text-white mb-3 transition-colors group-hover:text-orange-500" lang="es">
          {nombre}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-zinc-400 mb-4">
          {descripcion}
        </p>

        {/* Normativa Badge */}
        {normativa && (
          <div className="mb-3">
            <Badge variant="info" size="sm">
              {normativa}
            </Badge>
          </div>
        )}

        {/* CTA - aparece deslizándose hacia arriba */}
        <div className="mt-auto pt-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-500 opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0">
          <span>Saber más</span>
          <svg
            className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </Link>
    )
  }
)

ServiceCard.displayName = "ServiceCard"

export { ServiceCard }
