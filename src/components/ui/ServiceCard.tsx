"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "./Badge"
import { SERVICE_ICON_MAP } from "@/lib/serviceIcons"
import { getServiceIncludes } from "@/lib/serviceIncludes"
import { Button } from "@/components/ui/Button"

export interface ServiceCardProps {
  icon: string
  nombre: string
  descripcion: string
  slug: string
  normativa?: string | null
  includes?: string[]
  showQuoteCta?: boolean
  displayIndex?: number
  className?: string
}

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  (
    {
      icon,
      nombre,
      descripcion,
      slug,
      normativa,
      includes,
      showQuoteCta = false,
      displayIndex,
      className,
    },
    ref
  ) => {
    const IconComponent = SERVICE_ICON_MAP[icon]
    const resolvedIncludes = (includes?.length ? includes : getServiceIncludes(slug)).slice(
      0,
      2
    )
    const displayNumber =
      typeof displayIndex === "number"
        ? String(displayIndex).padStart(2, "0")
        : null

    return (
      <article
        ref={ref}
        className={cn(
          "service-card group relative overflow-hidden rounded-[32px]",
          "border border-white/10 bg-zinc-900/40 backdrop-blur-3xl p-8",
          "transition-all duration-500 ease-out shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)]",
          "motion-safe:hover:-translate-y-1",
          "hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.45)]",
          "hover:ring-1 hover:ring-[color:var(--color-accent)]/25",
          "min-h-[320px] h-[450px] md:h-auto flex flex-col",
          className
        )}
      >
        {displayNumber && (
          <span className="pointer-events-none absolute -right-4 -bottom-4 font-mono text-[120px] font-bold text-white/[0.03]">
            {displayNumber}
          </span>
        )}
        {/* Icon */}
        <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-zinc-950/60 text-[color:var(--color-accent)] shadow-[0_0_20px_rgba(234,88,12,0.1)] mb-5 transition-all duration-300 ease-out group-hover:-translate-y-1">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.22),transparent_70%)] opacity-60" />
          {IconComponent ? (
            <IconComponent
              className="relative h-7 w-7 transition-transform duration-300 group-hover:scale-105"
              strokeWidth={1.75}
              aria-hidden="true"
              focusable="false"
            />
          ) : null}
        </div>

        {/* Title - sin truncamiento */}
        <div className="space-y-2">
          <h3 className="font-heading font-bold text-xl tracking-tight text-white transition-colors group-hover:text-[color:var(--color-accent)]" lang="es">
            {nombre}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-300">
            {descripcion}
          </p>
        </div>

        {/* Normativa Badge */}
        {normativa && (
          <div className="mb-3">
            <Badge variant="info" size="sm">
              {normativa}
            </Badge>
          </div>
        )}

        <div className="mt-4 space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Qué incluye
          </p>
          <ul className="space-y-2 text-sm text-zinc-200">
            {resolvedIncludes.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span
                  className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-4 flex flex-wrap items-center gap-3">
          <Link
            href={`/servicios/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-accent)] motion-safe:hover:translate-x-0.5 transition-transform"
          >
            Ver detalle
          </Link>
          {showQuoteCta && (
            <Button variant="secondary" size="sm" asChild>
              <Link href="/cotizador">Cotizar</Link>
            </Button>
          )}
        </div>
      </article>
    )
  }
)

ServiceCard.displayName = "ServiceCard"

export { ServiceCard }
