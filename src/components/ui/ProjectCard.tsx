"use client"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProjectCover } from "@/components/ui/ProjectCover"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { ProjectCaseStudyDialog } from "@/components/ui/ProjectCaseStudyDialog"
import type { ProjectCategory } from "@/lib/projectCover"
import type { ProjectCaseStudy } from "@/lib/projectCaseStudy"

export interface ProjectCardProps {
  project: {
    id: string
    titulo: string
    cliente: string
    ubicacion: string
    servicioId: string
    descripcion: string
    fecha: string
  }
  category: ProjectCategory
  categoryLabel: string
  caseStudy: ProjectCaseStudy
  className?: string
}

export function ProjectCard({
  project,
  category,
  categoryLabel,
  caseStudy,
  className,
}: ProjectCardProps) {
  const bulletItems =
    caseStudy.entregables.length > 0
      ? caseStudy.entregables
      : caseStudy.alcance

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[var(--radius-4)]",
        "border border-[color:var(--color-border)] bg-[color:var(--color-surface)] transition-colors",
        "shadow-[var(--shadow-2)] transition-all duration-300",
        "motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[var(--shadow-3)]",
        "hover:border-[color:var(--color-accent)]",
        "focus-within:ring-2 focus-within:ring-[color:var(--color-accent)]",
        className
      )}
    >
      <ProjectCover
        id={project.id}
        category={category}
        label={categoryLabel}
        className="transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
      />

      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="space-y-3">
          <Badge variant="editorial" size="sm">
            {project.cliente}
          </Badge>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-[color:var(--color-text)] leading-snug">
              {project.titulo}
            </h3>
            <p className="text-sm text-[color:var(--color-muted)]">
              {project.descripcion}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs text-[color:var(--color-muted)]">
          <div className="space-y-1">
            <p className="uppercase tracking-[0.2em] text-[10px]">Ubicación</p>
            <p className="text-sm text-[color:var(--color-text)]">
              {project.ubicacion}
            </p>
          </div>
          <div className="space-y-1">
            <p className="uppercase tracking-[0.2em] text-[10px]">Año</p>
            <p className="text-sm text-[color:var(--color-text)]">{project.fecha}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
            Alcance & entregables
          </p>
          <ul className="space-y-2 text-sm text-[color:var(--color-text)]">
            {bulletItems.slice(0, 2).map((item) => (
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

        <div className="mt-auto flex flex-wrap items-center gap-3">
          <ProjectCaseStudyDialog
            project={project}
            caseStudy={caseStudy}
            trigger={
              <Button variant="editorial" size="sm">
                Ver caso
              </Button>
            }
          />
          <Link
            href={`/proyectos/${project.id}`}
            className={cn(
              "inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-text)]",
              "transition-colors hover:text-[color:var(--color-accent)]"
            )}
          >
            Ir al detalle
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
