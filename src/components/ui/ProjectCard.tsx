"use client"
import Link from "next/link"
import { ArrowUpRight, Building2, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProjectCover } from "@/components/ui/ProjectCover"
import { Badge } from "@/components/ui/Badge"
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
  displayIndex?: number
  featured?: boolean
  className?: string
}

export function ProjectCard({
  project,
  category,
  categoryLabel,
  caseStudy,
  displayIndex,
  featured = false,
  className,
}: ProjectCardProps) {
  const bulletItems =
    caseStudy.entregables.length > 0
      ? caseStudy.entregables
      : caseStudy.alcance

  const year = Number.parseInt(project.fecha, 10)
  const structuredData: Record<string, string | Record<string, string>> = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.titulo,
    description: project.descripcion,
    about: categoryLabel,
    provider: {
      "@type": "Organization",
      name: "APINDICO S.A.S.",
    },
  }

  if (Number.isFinite(year)) {
    structuredData.dateCreated = `${year}-01-01`
  }
  if (project.ubicacion) {
    structuredData.locationCreated = {
      "@type": "Place",
      name: project.ubicacion,
    }
  }

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[32px]",
        "border border-white/10 bg-zinc-950/40 backdrop-blur-xl transition-all duration-300",
        "shadow-[0_30px_60px_-50px_rgba(0,0,0,0.8)]",
        "motion-safe:hover:-translate-y-1",
        "hover:border-orange-500/30 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.35),0_20px_50px_-30px_rgba(249,115,22,0.5)]",
        "focus-within:ring-2 focus-within:ring-[color:var(--color-accent)]",
        className
      )}
    >
      <div className="flex flex-col gap-4 p-5 pb-0">
        <div className="relative">
          <ProjectCover
            id={project.id}
            category={category}
            displayIndex={displayIndex}
            className={cn(
              "transition-transform duration-700 motion-safe:group-hover:scale-105",
              featured ? "aspect-[16/10]" : "aspect-[4/3]"
            )}
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 70%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
            }}
            priority={Boolean(displayIndex && displayIndex <= 2)}
            sizes={
              featured
                ? "(min-width: 1024px) 66vw, (min-width: 768px) 100vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            }
            alt={`Cover técnico del proyecto ${project.titulo}`}
          />
          <span className="absolute left-4 top-4 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-[0.3em] text-orange-500">
            {`ID-${project.id} // ${project.fecha}`}
          </span>
        </div>
        <Badge variant="editorial" size="sm" className="self-start bg-white/10">
          {categoryLabel}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl font-semibold tracking-tight text-white leading-snug">
              {project.titulo}
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-zinc-500" strokeWidth={1.5} />
              <span className="text-zinc-300">{project.cliente}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-zinc-500" strokeWidth={1.5} />
              <span className="text-zinc-300">{project.ubicacion}</span>
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Alcance & entregables
          </p>
          <ul className="space-y-2 text-sm text-zinc-200">
            {bulletItems.slice(0, 2).map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span
                  className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-500"
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
              <button
                type="button"
                className="group/cta inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/30 text-orange-400 transition-all hover:border-orange-500/60 hover:text-orange-300"
                aria-label="Ver caso"
              >
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 group-hover/cta:rotate-45" />
              </button>
            }
          />
          <Link
            href={`/proyectos/${project.id}`}
            className={cn(
              "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400",
              "transition-colors hover:text-orange-400"
            )}
          >
            Ver detalle
          </Link>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </article>
  )
}
