"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Building2, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { PROYECTOS } from "@/lib/constants"
import { Button } from "@/components/ui/Button"
import { AnimatedSection } from "@/components/motion/AnimatedSection"
import { StaggerContainer } from "@/components/motion/StaggerContainer"

interface ProjectsSectionProps {
  title?: string
  subtitle?: string
  limit?: number
  showAllLink?: boolean
  ctaLabel?: string
  className?: string
}

export function ProjectsSection({
  title = "Proyectos destacados",
  subtitle = "Conozca algunos de nuestros trabajos más representativos",
  limit = 5,
  showAllLink = true,
  ctaLabel = "Ver todos",
  className,
}: ProjectsSectionProps) {
  const displayedProjects = PROYECTOS.slice(0, limit)

  if (displayedProjects.length === 0) return null

  return (
    <section
      id="proyectos"
      className={cn(
        "relative overflow-hidden bg-[color:var(--color-bg)] py-20 text-[color:var(--color-text)] md:py-24",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,28,46,0.2),rgba(7,26,45,1))]" />
        <div className="absolute -left-24 top-28 h-72 w-72 rounded-full bg-[color:var(--color-accent)]/18 blur-3xl" />
        <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-[color:var(--color-accent-2)]/14 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 xl:px-[100px]">
        <AnimatedSection>
          <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-heading text-3xl font-bold text-[color:var(--color-text)] md:text-5xl">{title}</h2>
              <p className="mt-4 text-base text-[color:var(--color-muted)] md:text-lg">{subtitle}</p>
            </div>
            {showAllLink && PROYECTOS.length > limit && (
              <Button variant="outline" size="md" asChild>
                <Link href="/proyectos">
                  {ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </AnimatedSection>

        <StaggerContainer className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:gap-6">
          {displayedProjects.map((proyecto, index) => (
            <article
              key={proyecto.id}
              className="group min-w-[86vw] snap-center overflow-hidden rounded-[28px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80 shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.8)] md:min-w-[62vw] md:shadow-[var(--shadow-2)] lg:min-w-[44vw]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {proyecto.imagen ? (
                  <Image
                    src={proyecto.imagen}
                    alt={proyecto.titulo}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={index === 0}
                    sizes="(max-width: 768px) 86vw, (max-width: 1200px) 62vw, 44vw"
                  />
                ) : (
                  <div className="h-full w-full bg-[linear-gradient(140deg,#0a2642_0%,#0e3559_50%,#123f63_100%)]" />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,13,22,0)_20%,rgba(4,13,22,0.9)_100%)]" />
                <span className="absolute left-4 top-4 rounded-full border border-[color:var(--color-accent)]/35 bg-[color:var(--color-accent)]/15 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--color-accent)]">
                  Proyecto {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="space-y-5 p-6">
                <h3 className="font-heading text-2xl font-bold leading-tight text-[color:var(--color-text)]">{proyecto.titulo}</h3>

                <div className="flex flex-wrap items-center gap-4 text-sm text-[color:var(--color-muted)]">
                  <span className="inline-flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-[color:var(--color-accent-2)]" />
                    {proyecto.cliente}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[color:var(--color-accent-2)]" />
                    {proyecto.ubicacion}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-[color:var(--color-muted)] md:text-base">{proyecto.descripcion}</p>

                <Link
                  href={`/proyectos/${proyecto.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-accent)]/35 px-4 py-2 text-sm font-semibold text-[color:var(--color-accent)] transition-colors hover:bg-[color:var(--color-accent)]/12"
                >
                  Ver detalles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
